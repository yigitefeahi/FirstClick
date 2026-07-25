"""Ingest FirstClick global knowledge markdown into chunks (scope=global)."""

from __future__ import annotations

import logging
import re
import uuid
from pathlib import Path

from app.rag.chunking import chunk_text
from app.rag.embed import embed_texts
from app.services.supabase_client import get_supabase

logger = logging.getLogger(__name__)

KNOWLEDGE_DIR = Path(__file__).resolve().parents[2] / "knowledge"
SUPPORTED_LOCALES = ("tr", "en")


def _slug_from_filename(name: str) -> str:
    base = Path(name).stem
    # 01-first-impression-10s -> first-impression-10s
    return re.sub(r"^\d+-", "", base)


def _category_from_filename(name: str) -> str:
    match = re.match(r"^(\d+)-", name)
    number = int(match.group(1)) if match else 0
    if number <= 50:
        return "foundation"
    if number <= 65:
        return "ux-product"
    if number <= 80:
        return "sector"
    if number <= 95:
        return "persona-research"
    return "growth-trust"


def normalize_kb_locale(locale: str | None) -> str:
    loc = (locale or "tr").lower()
    return loc if loc in SUPPORTED_LOCALES else "tr"


def knowledge_dir_for_locale(locale: str | None, *, root: Path | None = None) -> Path:
    """Return directory of expertise markdown for locale.

    TR: backend/knowledge/*.md
    EN: backend/knowledge/en/*.md (falls back to TR dir if EN corpus missing)
    """
    base = root or KNOWLEDGE_DIR
    loc = normalize_kb_locale(locale)
    if loc == "en":
        en_dir = base / "en"
        if en_dir.is_dir() and any(en_dir.glob("*.md")):
            return en_dir
    return base


def list_knowledge_files(locale: str | None = "tr", *, root: Path | None = None) -> list[Path]:
    """List expertise markdown files for a locale (non-recursive; EN uses knowledge/en/)."""
    directory = knowledge_dir_for_locale(locale, root=root)
    base = root or KNOWLEDGE_DIR
    files = sorted(p for p in directory.glob("*.md") if p.is_file())
    # Never mix EN sibling folder into TR listing when scanning the root
    if directory == base:
        files = [p for p in files if p.parent == base]
    return files


def _title_from_text(text: str, fallback: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


# locale -> slug -> H1 title (from knowledge/*.md or knowledge/en/*.md)
_TITLE_BY_LOCALE: dict[str, dict[str, str]] = {}


def kb_title_for_slug(slug: str, locale: str | None, fallback: str | None = None) -> str:
    """Return expertise-doc H1 for slug in the requested locale.

    Used so orchestration/RAG UI never shows TR titles when locale=en
    (and vice versa), even if a chunk's metadata.title is stale/wrong-locale.
    """
    clean = (slug or "").strip()
    if not clean:
        return (fallback or "").strip() or "kb"
    loc = normalize_kb_locale(locale)
    cache = _TITLE_BY_LOCALE.get(loc)
    if cache is None:
        cache = {}
        for path in list_knowledge_files(loc):
            s = _slug_from_filename(path.name)
            try:
                text = path.read_text(encoding="utf-8")
            except OSError:
                continue
            cache[s] = _title_from_text(text, s)
        _TITLE_BY_LOCALE[loc] = cache
    return cache.get(clean) or (fallback or "").strip() or clean


_TR_CHAR_RE = re.compile(r"[çğıöşüÇĞİÖŞÜ]")


def infer_content_locale(text: str | None) -> str:
    """Guess KB language when metadata.language is missing.

    Unlabeled Latin-only chunks are treated as English so a pre-bilingual
    English seed cannot leak into locale=tr retrieval.
    """
    sample = (text or "")[:2500]
    if _TR_CHAR_RE.search(sample):
        return "tr"
    return "en"


def _row_language(row: dict) -> str:
    meta = row.get("metadata") or {}
    if not isinstance(meta, dict):
        meta = {}
    explicit = meta.get("language") or row.get("language")
    if explicit:
        return normalize_kb_locale(str(explicit))
    return infer_content_locale(row.get("content"))


def filter_kb_rows_by_locale(rows: list[dict], locale: str | None) -> list[dict]:
    """Keep global KB chunks matching analyze locale.

    Legacy rows without metadata.language are inferred from content
    (Turkish diacritics → tr, otherwise → en) so EN corpus cannot
    masquerade as TR.
    """
    want = normalize_kb_locale(locale)
    return [row for row in rows if _row_language(row) == want]


async def ingest_global_knowledge(
    *,
    knowledge_dir: Path | None = None,
    replace_all: bool = True,
) -> dict[str, int]:
    """Embed expertise markdown (TR + EN when present) into global chunks."""
    client = get_supabase()
    if client is None:
        raise RuntimeError("Supabase yapılandırılmamış.")

    root = knowledge_dir or KNOWLEDGE_DIR
    if not root.is_dir():
        raise RuntimeError(f"Knowledge dizini yok: {root}")

    locale_files: list[tuple[str, Path]] = []
    for path in list_knowledge_files("tr", root=root):
        locale_files.append(("tr", path))
    en_files = list_knowledge_files("en", root=root)
    # Only add EN when they live under knowledge/en (avoid double-counting TR fallback)
    if knowledge_dir_for_locale("en", root=root) != root:
        for path in en_files:
            locale_files.append(("en", path))

    if not locale_files:
        raise RuntimeError(f"Knowledge markdown bulunamadı: {root}")

    if replace_all:
        client.table("chunks").delete().eq("scope", "global").eq("source_type", "knowledge").execute()

    stats: dict[str, int] = {}
    batch_contents: list[str] = []
    batch_meta: list[dict] = []

    for language, path in locale_files:
        slug = _slug_from_filename(path.name)
        category = _category_from_filename(path.name)
        text = path.read_text(encoding="utf-8")
        title = _title_from_text(text, slug)
        pieces = chunk_text(text, chunk_size=900, overlap=120)
        stat_key = f"{language}:{slug}"
        if not pieces:
            stats[stat_key] = 0
            continue
        for i, content in enumerate(pieces):
            batch_contents.append(content)
            batch_meta.append(
                {
                    "slug": slug,
                    "title": title,
                    "category": category,
                    "corpus": "firstclick-global",
                    "language": language,
                    "chunk_index": i,
                    "filename": path.name,
                }
            )
        stats[stat_key] = len(pieces)

    if not batch_contents:
        return stats

    # Embed in batches of 64
    embeddings: list[list[float]] = []
    step = 64
    for i in range(0, len(batch_contents), step):
        embeddings.extend(await embed_texts(batch_contents[i : i + step]))

    rows = []
    for content, embedding, meta in zip(batch_contents, embeddings, batch_meta):
        rows.append(
            {
                "id": str(uuid.uuid4()),
                "user_id": None,
                "product_id": None,
                "document_id": None,
                "analysis_id": None,
                "source_type": "knowledge",
                "scope": "global",
                "knowledge_slug": meta["slug"],
                "content": content,
                "embedding": embedding,
                "metadata": meta,
            }
        )

    # Insert in chunks of 100
    for i in range(0, len(rows), 100):
        client.table("chunks").insert(rows[i : i + 100]).execute()

    file_count = len({(m["language"], m["filename"]) for m in batch_meta})
    logger.info(
        "Global knowledge ingested: %s files, %s chunks (locales: %s)",
        file_count,
        len(rows),
        sorted({m["language"] for m in batch_meta}),
    )
    stats["_total_chunks"] = len(rows)
    stats["_files"] = file_count
    return stats


_STOPWORDS = {
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "your",
    "you",
    "are",
    "bir",
    "için",
    "ile",
    "olan",
    "bu",
    "da",
    "de",
    "ve",
    "veya",
    "gibi",
}


def _tokenize(text: str) -> set[str]:
    words = re.findall(r"[a-zA-ZçğıöşüÇĞİÖŞÜ0-9]{3,}", (text or "").lower())
    return {w for w in words if w not in _STOPWORDS}


def knowledge_file_fallback(
    query: str,
    *,
    top_k: int = 4,
    locale: str | None = "tr",
) -> list[dict]:
    """Keyword-rank local knowledge markdown when DB global corpus is empty/unavailable.

    Returns dicts compatible with retrieve._to_retrieved (no embeddings required).
    Uses English expertise docs when locale=en and knowledge/en/ exists.
    """
    language = normalize_kb_locale(locale)
    root = knowledge_dir_for_locale(language)
    if not root.is_dir():
        return []

    files = list_knowledge_files(language)
    if not files:
        return []

    query_tokens = _tokenize(query)
    if not query_tokens:
        query_tokens = {"onboarding", "pricing", "trust", "clarity", "activation"}

    scored: list[tuple[float, dict]] = []
    for path in files:
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        slug = _slug_from_filename(path.name)
        category = _category_from_filename(path.name)
        title = _title_from_text(text, slug)
        pieces = chunk_text(text, chunk_size=900, overlap=120) or [text[:900]]
        file_tokens = _tokenize(f"{slug} {title} {text[:4000]}")
        file_overlap = len(query_tokens & file_tokens)
        if file_overlap == 0 and len(scored) >= top_k * 3:
            continue
        for i, content in enumerate(pieces[:3]):
            piece_tokens = _tokenize(content)
            overlap = len(query_tokens & piece_tokens) + file_overlap * 0.25
            if overlap <= 0:
                continue
            scored.append(
                (
                    float(overlap),
                    {
                        "id": str(uuid.uuid5(uuid.NAMESPACE_URL, f"kb-file:{language}:{slug}:{i}")),
                        "content": content,
                        "source_type": "knowledge",
                        "scope": "global",
                        "knowledge_slug": slug,
                        "metadata": {
                            "slug": slug,
                            "title": title,
                            "category": category,
                            "corpus": "firstclick-global-file",
                            "language": language,
                            "chunk_index": i,
                            "filename": path.name,
                        },
                        "vector_score": 0.0,
                        "text_score": float(overlap),
                    },
                )
            )

    scored.sort(key=lambda item: item[0], reverse=True)
    picked: list[dict] = []
    seen_slugs: set[str] = set()
    for _, row in scored:
        slug = str(row.get("knowledge_slug") or (row.get("metadata") or {}).get("slug") or "")
        if slug and slug in seen_slugs:
            continue
        if slug:
            seen_slugs.add(slug)
        picked.append(row)
        if len(picked) >= top_k:
            return picked

    # Always surface a few foundation notes so evidence panel is never empty for OpenAI runs
    foundation = sorted(
        p for p in files if re.match(r"^0\d+-", p.name) or re.match(r"^[1-4]\d-", p.name)
    )
    for path in foundation:
        if len(picked) >= top_k:
            break
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        slug = _slug_from_filename(path.name)
        if slug in seen_slugs:
            continue
        seen_slugs.add(slug)
        category = _category_from_filename(path.name)
        title = _title_from_text(text, slug)
        content = (chunk_text(text, chunk_size=900, overlap=120) or [text[:900]])[0]
        picked.append(
            {
                "id": str(uuid.uuid5(uuid.NAMESPACE_URL, f"kb-file:{language}:{slug}:0")),
                "content": content,
                "source_type": "knowledge",
                "scope": "global",
                "knowledge_slug": slug,
                "metadata": {
                    "slug": slug,
                    "title": title,
                    "category": category,
                    "corpus": "firstclick-global-file",
                    "language": language,
                    "chunk_index": 0,
                    "filename": path.name,
                },
                "vector_score": 0.0,
                "text_score": 0.05,
            }
        )
    return picked
