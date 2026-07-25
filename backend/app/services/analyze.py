import asyncio
import logging
import uuid
from collections.abc import AsyncIterator, Awaitable, Callable
from typing import Any, Literal

from app.config import settings
from app.constants import persona_label_for_locale
from app.rag.ingest import ingest_analysis_result
from app.rag.knowledge import kb_title_for_slug
from app.rag.retrieve import RetrievedChunk, hybrid_retrieve
from app.schemas.analysis import AnalysisFormData, AnalysisResult, AnalyzeResponse, RagSource
from app.services.mock_analyzer import generate_mock_analysis
from app.services.openai_analyzer import analyze_with_openai
from app.services.supabase_client import get_supabase

logger = logging.getLogger(__name__)

ProgressCallback = Callable[[dict[str, Any]], Awaitable[None]]


def settings_openai_available() -> bool:
    return bool(settings.openai_api_key)


async def _load_custom_personas(user_id: str, form: AnalysisFormData) -> dict[str, dict[str, str]]:
    custom_ids = [
        p.removeprefix("custom:")
        for p in form.selected_personas
        if p.startswith("custom:")
    ]
    if not custom_ids:
        return {}
    client = get_supabase()
    if client is None:
        return {}
    response = (
        client.table("custom_personas")
        .select("id, name, traits")
        .eq("user_id", user_id)
        .in_("id", custom_ids)
        .execute()
    )
    locale = (form.locale or "tr").lower()
    default_name = "Custom persona" if locale == "en" else "Özel persona"
    return {
        row["id"]: {"name": row.get("name") or default_name, "traits": row.get("traits") or ""}
        for row in (response.data or [])
    }


async def run_analysis(
    form: AnalysisFormData,
    *,
    user_id: str | None = None,
    on_progress: ProgressCallback | None = None,
) -> tuple[AnalysisResult, Literal["openai", "mock"], list[RetrievedChunk]]:
    async def emit(event: dict[str, Any]) -> None:
        if on_progress:
            await on_progress(event)

    rag_chunks: list[RetrievedChunk] = []
    custom_personas: dict[str, dict[str, str]] = {}
    if user_id and settings.supabase_configured:
        try:
            custom_personas = await _load_custom_personas(user_id, form)
        except Exception as exc:
            logger.warning("custom personas load failed: %s", exc)

    locale = (form.locale or "tr").lower()
    if locale not in ("tr", "en"):
        locale = "tr"

    # Machine keys only for UI chrome — FE must t(key); message is legacy fallback
    await emit({"type": "stage", "key": "scanning"})

    if user_id and settings.supabase_configured and settings_openai_available():
        try:
            rag_chunks = await hybrid_retrieve(
                user_id=user_id,
                form=form,
                product_id=form.product_id,
                top_k=10,
            )
        except Exception as exc:
            logger.warning("RAG retrieve failed: %s", exc)

    titles: list[str] = []
    slugs: list[str] = []
    for chunk in rag_chunks:
        meta = chunk.metadata or {}
        slug = meta.get("slug")
        raw_title = meta.get("title") or meta.get("slug") or chunk.citation
        if slug:
            slug_s = str(slug)
            if slug_s not in slugs:
                slugs.append(slug_s)
            # Evidence titles always TR (UI chrome may still remap elsewhere)
            title = kb_title_for_slug(slug_s, "tr", str(raw_title) if raw_title else None)
        else:
            title = str(raw_title) if raw_title else None
        if title and title not in titles:
            titles.append(title)
    await emit(
        {
            "type": "rag",
            "count": len(rag_chunks),
            "titles": titles[:8],
            "slugs": slugs[:8],
        }
    )
    await emit({"type": "stage", "key": "simulating"})

    if settings_openai_available():
        ai_result = await analyze_with_openai(
            form,
            rag_chunks=rag_chunks,
            custom_personas=custom_personas,
            on_progress=on_progress,
        )
        if ai_result:
            return ai_result, "openai", rag_chunks

    personas = form.selected_personas[:6]
    total = len(personas)
    for index, persona_id in enumerate(personas, start=1):
        name = persona_label_for_locale(persona_id, locale)
        if persona_id.startswith("custom:"):
            info = custom_personas.get(persona_id.removeprefix("custom:"))
            name = (info or {}).get("name") or name
        await emit(
            {
                "type": "persona",
                "status": "running",
                "index": index,
                "total": total,
                "name": name,
                "personaId": persona_id,
            }
        )
        await emit(
            {
                "type": "persona",
                "status": "done",
                "index": index,
                "total": total,
                "name": name,
                "personaId": persona_id,
                "ok": True,
            }
        )
    await emit({"type": "synthesis", "status": "running"})
    mock = generate_mock_analysis(form)
    await emit({"type": "synthesis", "status": "done"})
    return mock, "mock", rag_chunks


async def iter_analysis_events(
    form: AnalysisFormData,
    *,
    user_id: str,
) -> AsyncIterator[dict[str, Any]]:
    """Yield NDJSON orchestration events, ending with complete payload."""
    queue: asyncio.Queue[dict[str, Any] | None] = asyncio.Queue()

    async def on_progress(event: dict[str, Any]) -> None:
        await queue.put(event)

    async def runner() -> None:
        try:
            result, source, rag_chunks = await run_analysis(
                form, user_id=user_id, on_progress=on_progress
            )
            rag_sources = chunks_to_rag_sources(rag_chunks)
            analysis_id = await persist_analysis(
                user_id=user_id,
                form=form,
                result=result,
                source=source,
                rag_sources=rag_sources,
            )
            payload = AnalyzeResponse(
                success=True,
                data=result,
                source=source,
                analysis_id=analysis_id,
                rag_sources=rag_sources,
            ).model_dump(by_alias=True)
            await queue.put({"type": "complete", "payload": payload})
        except Exception as exc:
            logger.exception("stream analysis failed: %s", exc)
            await queue.put(
                {
                    "type": "complete",
                    "payload": {
                        "success": False,
                        "source": "mock",
                        "error": str(exc) or "Analiz başarısız.",
                    },
                }
            )
        finally:
            await queue.put(None)

    task = asyncio.create_task(runner())
    while True:
        item = await queue.get()
        if item is None:
            break
        yield item
    await task


def chunks_to_rag_sources(chunks: list[RetrievedChunk]) -> list[RagSource]:
    sources: list[RagSource] = []
    for chunk in chunks:
        meta = chunk.metadata or {}
        raw_title = meta.get("title") or meta.get("slug")
        slug = meta.get("slug")
        is_kb = chunk.source_type == "knowledge" or chunk.scope == "global"
        if is_kb and slug:
            title = kb_title_for_slug(str(slug), "tr", str(raw_title) if raw_title else None)
        else:
            title = raw_title
        sources.append(
            RagSource(
                citation=chunk.citation,
                source_type=chunk.source_type,
                excerpt=(chunk.content[:280] + "…") if len(chunk.content) > 280 else chunk.content,
                scope=chunk.scope,
                title=title,
                category=meta.get("category"),
                score=round(float(chunk.score), 4) if chunk.score else None,
            )
        )
    return sources


async def persist_analysis(
    *,
    user_id: str,
    form: AnalysisFormData,
    result: AnalysisResult,
    source: str,
    rag_sources: list[RagSource],
) -> str | None:
    client = get_supabase()
    if client is None:
        return None

    analysis_id = str(uuid.uuid4())
    product_id = form.product_id

    if not product_id:
        try:
            created = (
                client.table("products")
                .insert(
                    {
                        "user_id": user_id,
                        "name": form.product_name,
                        "description": form.product_description,
                    }
                )
                .execute()
            )
            if created.data:
                product_id = created.data[0]["id"]
                form.product_id = product_id
        except Exception as exc:
            logger.warning("Product auto-create failed: %s", exc)

    row = {
        "id": analysis_id,
        "user_id": user_id,
        "product_id": product_id,
        "form_data": form.model_dump(by_alias=True),
        "result": result.model_dump(by_alias=True),
        "source": source,
        "rag_sources": [s.model_dump(by_alias=True) for s in rag_sources],
    }

    try:
        client.table("analyses").insert(row).execute()
    except Exception as exc:
        logger.exception("Analysis persist failed: %s", exc)
        return None

    if product_id:
        try:
            import hashlib
            from datetime import datetime, timezone

            fingerprint = hashlib.sha256(
                (form.product_description + form.core_features + form.differentiator).encode()
            ).hexdigest()[:16]
            client.table("products").update(
                {
                    "last_tested_at": datetime.now(timezone.utc).isoformat(),
                    "pitch_fingerprint": fingerprint,
                }
            ).eq("id", product_id).eq("user_id", user_id).execute()
        except Exception as exc:
            logger.warning("product last_tested update failed: %s", exc)

    try:
        await ingest_analysis_result(
            user_id=user_id,
            product_id=product_id,
            analysis_id=analysis_id,
            form=form,
            result=result,
        )
    except Exception as exc:
        logger.warning("Analysis RAG ingest failed: %s", exc)

    return analysis_id
