#!/usr/bin/env python3
"""Translate backend/knowledge/*.md → backend/knowledge/en/*.md at full depth.

Uses httpx + OpenAI Chat Completions (same stack as the app).

Usage (from backend/):
  .venv/bin/python -m scripts.translate_knowledge_en
  .venv/bin/python -m scripts.translate_knowledge_en --force
  .venv/bin/python -m scripts.translate_knowledge_en --min-ratio 0.82
"""

from __future__ import annotations

import argparse
import asyncio
import os
import re
import sys
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

TR_DIR = ROOT / "knowledge"
EN_DIR = TR_DIR / "en"

SYSTEM = """You are an expert product/UX writer translating FirstClick knowledge-base
markdown from Turkish to English.

Rules:
- Produce a FULL English translation of the entire document.
- Preserve markdown structure: headings, lists, bold, code, links, persona ids.
- Keep the same depth and approximate length — do NOT summarize or drop sections.
- Keep product/tech terms that are conventionally English when natural
  (onboarding, CTA, SSO, KPI, aha moment, drop-off, etc.).
- Keep citation-style tokens like [kb], FirstClick, persona ids unchanged.
- Output ONLY the translated markdown. No preamble or fences.
"""


def load_dotenv() -> None:
    env_path = ROOT / ".env"
    if not env_path.is_file():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        os.environ.setdefault(key.strip(), val.strip().strip('"').strip("'"))


def word_count(text: str) -> int:
    return len(re.findall(r"[0-9A-Za-zÇĞİÖŞÜçğıöşü'-]+", text))


def needs_rewrite(tr_text: str, en_path: Path, *, min_ratio: float, force: bool) -> bool:
    if force or not en_path.is_file():
        return True
    en_text = en_path.read_text(encoding="utf-8")
    tw, ew = word_count(tr_text), word_count(en_text)
    if tw == 0:
        return False
    ratio = ew / tw
    stubby = en_text.count("### Depth note") >= 5 and ratio < 0.95
    return ratio < min_ratio or stubby


async def translate_one(
    client: httpx.AsyncClient,
    *,
    api_key: str,
    model: str,
    tr_text: str,
    filename: str,
    semaphore: asyncio.Semaphore,
    max_retries: int = 8,
) -> str:
    last_exc: Exception | None = None
    for attempt in range(max_retries):
        async with semaphore:
            try:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": model,
                        "temperature": 0.2,
                        "messages": [
                            {"role": "system", "content": SYSTEM},
                            {
                                "role": "user",
                                "content": (
                                    f"Translate this FirstClick knowledge file ({filename}) "
                                    f"from Turkish to English at full depth:\n\n{tr_text}"
                                ),
                            },
                        ],
                    },
                    timeout=180.0,
                )
                if response.status_code == 429:
                    retry_after = response.headers.get("retry-after")
                    delay = float(retry_after) if retry_after else min(2 ** attempt * 2.0, 60.0)
                    print(f"RATE {filename}: waiting {delay:.0f}s (attempt {attempt + 1})", flush=True)
                    await asyncio.sleep(delay)
                    continue
                response.raise_for_status()
                payload = response.json()
                text = (payload["choices"][0]["message"]["content"] or "").strip()
                if text.startswith("```"):
                    text = re.sub(r"^```(?:markdown|md)?\n?", "", text)
                    text = re.sub(r"\n?```$", "", text).strip()
                if not text.startswith("#"):
                    raise RuntimeError(f"{filename}: translation missing H1")
                return text + ("\n" if not text.endswith("\n") else "")
            except Exception as exc:
                last_exc = exc
                if attempt + 1 >= max_retries:
                    break
                delay = min(2 ** attempt * 2.0, 45.0)
                print(f"RETRY {filename}: {exc} → sleep {delay:.0f}s", flush=True)
                await asyncio.sleep(delay)
    raise RuntimeError(f"{filename}: failed after retries: {last_exc}")


async def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--min-ratio", type=float, default=0.82)
    parser.add_argument("--concurrency", type=int, default=2)
    parser.add_argument("--only", type=str, default="")
    args = parser.parse_args()

    load_dotenv()
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("FAIL: OPENAI_API_KEY missing")
        return 1

    model = os.environ.get("OPENAI_MODEL") or "gpt-4.1"
    EN_DIR.mkdir(parents=True, exist_ok=True)
    tr_files = sorted(TR_DIR.glob("*.md"))
    if args.only:
        keys = {k.strip() for k in args.only.split(",") if k.strip()}
        tr_files = [
            p
            for p in tr_files
            if p.name in keys
            or p.stem.split("-", 1)[0] in keys
            or any(p.name.startswith(k) for k in keys)
        ]

    todo: list[Path] = []
    for path in tr_files:
        tr_text = path.read_text(encoding="utf-8")
        if needs_rewrite(tr_text, EN_DIR / path.name, min_ratio=args.min_ratio, force=args.force):
            todo.append(path)

    print(f"TR files: {len(tr_files)} | to translate: {len(todo)} | model={model}")
    if not todo:
        print("Nothing to do.")
        return 0

    semaphore = asyncio.Semaphore(args.concurrency)
    ok = 0
    failed: list[str] = []

    async with httpx.AsyncClient() as client:

        async def run_one(path: Path) -> None:
            nonlocal ok
            tr_text = path.read_text(encoding="utf-8")
            en_path = EN_DIR / path.name
            try:
                en_text = await translate_one(
                    client,
                    api_key=api_key,
                    model=model,
                    tr_text=tr_text,
                    filename=path.name,
                    semaphore=semaphore,
                )
                tw, ew = word_count(tr_text), word_count(en_text)
                ratio = ew / tw if tw else 0
                if ratio < 0.55:
                    en_text = await translate_one(
                        client,
                        api_key=api_key,
                        model=model,
                        tr_text=(
                            tr_text
                            + "\n\nIMPORTANT: Previous attempt was too short. "
                            "Translate EVERY section at full comparable length."
                        ),
                        filename=path.name,
                        semaphore=semaphore,
                    )
                    ew = word_count(en_text)
                    ratio = ew / tw if tw else 0
                en_path.write_text(en_text, encoding="utf-8")
                ok += 1
                print(f"OK  {path.name}  TR={tw} EN={ew} ratio={ratio:.2f}", flush=True)
            except Exception as exc:
                failed.append(f"{path.name}: {exc}")
                print(f"FAIL {path.name}: {exc}", flush=True)

        batch_size = max(args.concurrency, 2)
        for i in range(0, len(todo), batch_size):
            batch = todo[i : i + batch_size]
            await asyncio.gather(*(run_one(p) for p in batch))
            if i + batch_size < len(todo):
                await asyncio.sleep(1.5)

    print(f"\nDone: {ok}/{len(todo)} written")
    if failed:
        print(f"Failures ({len(failed)}):")
        for item in failed:
            print(f"  - {item}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
