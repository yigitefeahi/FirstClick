#!/usr/bin/env python3
"""Check English KB mirrors exist and are depth-parity with Turkish.

Usage (from backend/):
  .venv/bin/python -m scripts.check_en_knowledge
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TR_DIR = ROOT / "knowledge"
EN_DIR = TR_DIR / "en"


def words(text: str) -> int:
    return len(re.findall(r"[0-9A-Za-zÇĞİÖŞÜçğıöşü'-]+", text))


def main() -> int:
    tr_files = sorted(TR_DIR.glob("*.md"))
    if not EN_DIR.is_dir():
        print(f"FAIL: missing {EN_DIR}")
        return 1

    en_files = {p.name: p for p in EN_DIR.glob("*.md")}
    missing = [p.name for p in tr_files if p.name not in en_files]
    thin: list[str] = []
    stubby: list[str] = []
    tr_words = 0
    en_words = 0

    for path in tr_files:
        tr_text = path.read_text(encoding="utf-8")
        tw = words(tr_text)
        tr_words += tw
        en_path = en_files.get(path.name)
        if not en_path:
            continue
        en_text = en_path.read_text(encoding="utf-8")
        ew = words(en_text)
        en_words += ew
        ratio = ew / tw if tw else 0
        if ratio < 0.75:
            thin.append(f"{path.name}: ratio={ratio:.2f} TR={tw} EN={ew}")
        if en_text.count("### Depth note") >= 5 and ratio < 0.95:
            stubby.append(path.name)

    print(f"English KB files: {len(en_files)} in {EN_DIR}")
    print(f"Turkish KB files: {len(tr_files)}")
    print(f"TR words: {tr_words:,} | EN words: {en_words:,} | ratio: {en_words / tr_words if tr_words else 0:.2f}")
    if tr_files:
        sample = (EN_DIR / "01-first-impression-10s.md").read_text(encoding="utf-8").splitlines()[0]
        print(f"Sample H1: {sample}")

    failures = 0
    if missing:
        failures += 1
        print(f"FAIL: missing EN files ({len(missing)}): {', '.join(missing[:8])}")
    if thin:
        failures += 1
        print(f"FAIL: thin EN files ({len(thin)}):")
        for row in thin[:15]:
            print(f"  - {row}")
        if len(thin) > 15:
            print(f"  … +{len(thin) - 15} more")
    if stubby:
        failures += 1
        print(f"FAIL: stub-padded EN files ({len(stubby)})")
    if failures:
        return 1
    print("PASS: EN corpus filename + depth parity OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
