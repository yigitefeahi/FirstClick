"""Hybrid RAG retrieval: vector + keyword, user corpus + global knowledge, RRF fusion."""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass

from app.rag.embed import embed_query
from app.rag.knowledge import filter_kb_rows_by_locale, knowledge_file_fallback, normalize_kb_locale
from app.schemas.analysis import AnalysisFormData
from app.services.supabase_client import get_supabase

logger = logging.getLogger(__name__)


@dataclass
class RetrievedChunk:
    id: str
    content: str
    source_type: str
    citation: str
    score: float
    metadata: dict
    scope: str = "user"


_TOPIC_BIAS = {
    "tr": "onboarding dönüşüm fiyatlandırma güven netlik aktivasyon bırakma",
    "en": "onboarding conversion pricing trust clarity drop-off activation",
}


def build_search_query(form: AnalysisFormData, persona_id: str | None = None) -> str:
    locale = normalize_kb_locale(getattr(form, "locale", None))
    parts = [
        form.product_name,
        form.product_description,
        form.target_audience,
        form.core_features,
        form.differentiator,
        # Locale-matched topic bias so EN embeddings don't dominate TR retrieval
        _TOPIC_BIAS[locale],
    ]
    if persona_id:
        parts.append(persona_id.replace("-", " "))
    return " ".join(p for p in parts if p and p.strip())[:2200]


def _rrf_fuse(
    ranked_lists: list[list[dict]],
    *,
    k: int = 60,
) -> list[dict]:
    scores: dict[str, float] = {}
    items: dict[str, dict] = {}
    for ranked in ranked_lists:
        for rank, item in enumerate(ranked):
            item_id = str(item["id"])
            scores[item_id] = scores.get(item_id, 0.0) + 1.0 / (k + rank + 1)
            items[item_id] = item
    ordered = sorted(scores.items(), key=lambda pair: pair[1], reverse=True)
    return [{**items[item_id], "_rrf": score} for item_id, score in ordered]


def _diversify(chunks: list[RetrievedChunk], limit: int) -> list[RetrievedChunk]:
    """Keep mix of global kb + user sources; drop near-duplicate prefixes."""
    selected: list[RetrievedChunk] = []
    seen_prefixes: list[str] = []
    global_count = 0
    user_count = 0
    # Aim ~40% global knowledge, 60% user corpus when both exist
    max_global = max(2, limit // 2)

    for chunk in chunks:
        prefix = chunk.content[:120].lower()
        if any(prefix[:80] == seen[:80] for seen in seen_prefixes):
            continue
        if chunk.scope == "global" or chunk.source_type == "knowledge":
            if global_count >= max_global:
                continue
            global_count += 1
        else:
            user_count += 1
        selected.append(chunk)
        seen_prefixes.append(prefix)
        if len(selected) >= limit:
            break

    # If we under-filled because of caps, backfill
    if len(selected) < limit:
        selected_ids = {c.id for c in selected}
        for chunk in chunks:
            if chunk.id in selected_ids:
                continue
            prefix = chunk.content[:120].lower()
            if any(prefix[:80] == seen[:80] for seen in seen_prefixes):
                continue
            selected.append(chunk)
            seen_prefixes.append(prefix)
            if len(selected) >= limit:
                break
    return selected


def _to_retrieved(row: dict, rrf_score: float) -> RetrievedChunk:
    source_type = row.get("source_type") or "document"
    meta = row.get("metadata") or {}
    scope = row.get("scope") or ("global" if source_type == "knowledge" else "user")
    if source_type == "knowledge" or scope == "global":
        slug = meta.get("slug") or row.get("knowledge_slug") or meta.get("title") or "kb"
        citation = f"kb:{slug}"
    elif source_type == "analysis":
        citation = f"past:{(row.get('analysis_id') or row.get('id') or '')[:8]}"
    elif source_type == "web":
        host = (meta.get("url") or meta.get("title") or "web")[:40]
        citation = f"web:{host}:{str(row.get('id', ''))[:8]}"
    else:
        title = meta.get("title") or "doc"
        citation = f"doc:{title}:{str(row.get('id', ''))[:8]}"
    return RetrievedChunk(
        id=str(row["id"]),
        content=row.get("content") or "",
        source_type=source_type,
        citation=citation,
        score=float(rrf_score),
        metadata=meta,
        scope=scope,
    )


def _split_ranks(rows: list[dict]) -> tuple[list[dict], list[dict]]:
    vector_ranked = sorted(
        [r for r in rows if float(r.get("vector_score") or 0) > 0],
        key=lambda r: float(r.get("vector_score") or 0),
        reverse=True,
    )
    text_ranked = sorted(
        [r for r in rows if float(r.get("text_score") or 0) > 0],
        key=lambda r: float(r.get("text_score") or 0),
        reverse=True,
    )
    return vector_ranked, text_ranked


def _tokenize(text: str) -> set[str]:
    return {w for w in re.findall(r"[a-zA-ZçğıöşüÇĞİÖŞÜ0-9]{3,}", (text or "").lower())}


def _keyword_score(content: str, query_tokens: set[str]) -> float:
    if not query_tokens or not content:
        return 0.0
    tokens = _tokenize(content)
    if not tokens:
        return 0.0
    return float(len(query_tokens & tokens))


def _keyword_fetch_user_rows(
    client,
    *,
    user_id: str,
    product_id: str | None,
    source_type: str,
    query_text: str,
    count: int,
) -> list[dict]:
    """Fallback when embeddings/RPC unavailable: scan product chunks and rank by keywords."""
    try:
        query = (
            client.table("chunks")
            .select("id, content, source_type, product_id, document_id, analysis_id, metadata, scope")
            .eq("user_id", user_id)
            .eq("scope", "user")
            .eq("source_type", source_type)
            .limit(120)
        )
        if product_id:
            query = query.eq("product_id", product_id)
        response = query.execute()
    except Exception as exc:
        logger.warning("keyword chunk fetch failed (%s): %s", source_type, exc)
        return []

    query_tokens = _tokenize(query_text)
    ranked: list[tuple[float, dict]] = []
    for row in response.data or []:
        content = row.get("content") or ""
        score = _keyword_score(content, query_tokens)
        if score <= 0:
            # Prefer surfacing uploaded product docs/web even without lexical overlap
            if source_type in ("document", "web"):
                score = 0.1
            else:
                continue
        ranked.append(
            (
                score,
                {
                    **row,
                    "vector_score": 0.0,
                    "text_score": score,
                    "scope": row.get("scope") or "user",
                },
            )
        )
    ranked.sort(key=lambda item: item[0], reverse=True)
    return [row for _, row in ranked[:count]]


async def hybrid_retrieve(
    *,
    user_id: str,
    form: AnalysisFormData,
    product_id: str | None = None,
    persona_id: str | None = None,
    top_k: int = 10,
) -> list[RetrievedChunk]:
    client = get_supabase()
    # Always retrieve Turkish KB for evidence; product docs stay as uploaded.
    locale = "tr"
    form_for_query = form.model_copy(update={"locale": "tr"})
    query_text = build_search_query(form_for_query, persona_id)
    if not query_text.strip():
        return []

    embedding: list[float] | None = None
    try:
        embedding = await embed_query(query_text)
    except Exception as exc:
        logger.warning("RAG embed failed, using keyword/file fallback: %s", exc)

    def fetch(*, scope: str, source_type: str | None, count: int) -> list[dict]:
        if client is None or embedding is None:
            return []
        try:
            params = {
                "query_embedding": embedding,
                "query_text": query_text,
                "match_user_id": user_id,
                "match_product_id": product_id if scope == "user" else None,
                "match_source_type": source_type,
                "match_count": count,
                "match_scope": scope,
            }
            response = client.rpc("match_chunks", params).execute()
            return list(response.data or [])
        except Exception as exc:
            logger.warning("match_chunks failed (scope=%s type=%s): %s", scope, source_type, exc)
            return []

    # User corpus (vector+keyword RPC when possible) — language left as uploaded
    doc_rows = fetch(scope="user", source_type="document", count=top_k)
    web_rows = fetch(scope="user", source_type="web", count=top_k)
    analysis_rows = fetch(scope="user", source_type="analysis", count=top_k)
    # FirstClick expertise — over-fetch then filter (RPC has no language arg)
    kb_rows = filter_kb_rows_by_locale(
        fetch(scope="global", source_type="knowledge", count=max(top_k * 6, 24)),
        locale,
    )

    # Keyword fallback for user corpus when RPC/embed returned nothing
    if client is not None:
        if not doc_rows:
            doc_rows = _keyword_fetch_user_rows(
                client,
                user_id=user_id,
                product_id=product_id,
                source_type="document",
                query_text=query_text,
                count=top_k,
            )
        if not web_rows:
            web_rows = _keyword_fetch_user_rows(
                client,
                user_id=user_id,
                product_id=product_id,
                source_type="web",
                query_text=query_text,
                count=top_k,
            )
        if not analysis_rows:
            analysis_rows = _keyword_fetch_user_rows(
                client,
                user_id=user_id,
                product_id=product_id,
                source_type="analysis",
                query_text=query_text,
                count=min(top_k, 4),
            )

    # File-based KB when global table empty / wrong-locale / thin after filter
    min_kb = max(3, top_k // 2)
    if len(kb_rows) < min_kb:
        file_rows = knowledge_file_fallback(
            query_text,
            top_k=min_kb,
            locale=locale,
        )
        seen_ids = {str(r.get("id")) for r in kb_rows}
        for row in file_rows:
            rid = str(row.get("id"))
            if rid in seen_ids:
                continue
            kb_rows.append(row)
            seen_ids.add(rid)
            if len(kb_rows) >= min_kb:
                break

    lists: list[list[dict]] = []
    for rows in (doc_rows, web_rows, analysis_rows, kb_rows):
        v, t = _split_ranks(rows)
        if v:
            lists.append(v)
        if t:
            lists.append(t)
        # File/keyword rows may only have text_score; keep raw list if split empty
        if not v and not t and rows:
            lists.append(rows)

    if not lists:
        return []

    fused = _rrf_fuse(lists)
    retrieved = [_to_retrieved(row, float(row.get("_rrf") or 0)) for row in fused if row.get("content")]
    return _diversify(retrieved, top_k)


def format_rag_context(chunks: list[RetrievedChunk], *, locale: str | None = "tr") -> str:
    if not chunks:
        return ""
    loc = normalize_kb_locale(locale)
    if loc == "en":
        lines = [
            "Retrieved Context (ground claims in these excerpts; do not invent sources):",
            "- [kb:…] = FirstClick expertise (our global corpus)",
            "- [doc:…]/[web:…]/[past:…] = user's product corpus",
        ]
    else:
        lines = [
            "Retrieved Context (alıntılara dayan, uydurma):",
            "- [kb:…] = FirstClick uzmanlık bilgisi (bizim corpus)",
            "- [doc:…]/[web:…]/[past:…] = kullanıcının ürün corpus’u",
        ]
    for chunk in chunks:
        scope_label = "global-kb" if chunk.scope == "global" or chunk.source_type == "knowledge" else "user"
        lines.append(f"[{chunk.citation}] ({chunk.source_type}/{scope_label})\n{chunk.content}")
    return "\n\n".join(lines)
