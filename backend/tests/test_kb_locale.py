"""Locale routing for FirstClick global knowledge RAG."""

from __future__ import annotations

from app.rag.knowledge import (
    filter_kb_rows_by_locale,
    infer_content_locale,
    knowledge_dir_for_locale,
    knowledge_file_fallback,
    list_knowledge_files,
    normalize_kb_locale,
)
from app.rag.retrieve import build_search_query
from app.schemas.analysis import AnalysisFormData


def test_normalize_and_dirs():
    assert normalize_kb_locale("TR") == "tr"
    assert normalize_kb_locale("en") == "en"
    assert normalize_kb_locale(None) == "tr"
    tr_dir = knowledge_dir_for_locale("tr")
    en_dir = knowledge_dir_for_locale("en")
    assert tr_dir.name == "knowledge"
    assert en_dir.name == "en"
    assert en_dir != tr_dir


def test_infer_unlabeled_english_not_turkish():
    assert infer_content_locale("First impression and clarity for onboarding") == "en"
    assert infer_content_locale("İlk izlenim ve netlik onboarding için") == "tr"


def test_filter_kb_rows_by_locale_explicit_and_inferred():
    rows = [
        {"id": "1", "content": "hello", "metadata": {"language": "en", "title": "EN"}},
        {"id": "2", "content": "merhaba dünya", "metadata": {"language": "tr", "title": "TR"}},
        # Unlabeled English must NOT pass TR filter (root cause of TR→EN leak)
        {"id": "3", "content": "Pricing psychology and conversion", "metadata": {}},
        {"id": "4", "content": "Fiyat psikolojisi ve dönüşüm", "metadata": {}},
    ]
    tr = filter_kb_rows_by_locale(rows, "tr")
    en = filter_kb_rows_by_locale(rows, "en")
    assert {r["id"] for r in tr} == {"2", "4"}
    assert {r["id"] for r in en} == {"1", "3"}


def test_file_fallback_respects_locale():
    tr_files = list_knowledge_files("tr")
    en_files = list_knowledge_files("en")
    assert tr_files
    assert en_files
    assert all(p.parent.name != "en" for p in tr_files)
    assert all(p.parent.name == "en" for p in en_files)

    tr_rows = knowledge_file_fallback("onboarding pricing trust", top_k=4, locale="tr")
    en_rows = knowledge_file_fallback("onboarding pricing trust", top_k=4, locale="en")
    assert tr_rows and en_rows
    assert all((r.get("metadata") or {}).get("language") == "tr" for r in tr_rows)
    assert all((r.get("metadata") or {}).get("language") == "en" for r in en_rows)
    # Titles should differ (Turkish vs English H1) for the same slug when both exist
    tr_titles = {(r.get("metadata") or {}).get("title") for r in tr_rows}
    en_titles = {(r.get("metadata") or {}).get("title") for r in en_rows}
    assert tr_titles != en_titles or not (tr_titles & en_titles)


def test_build_search_query_locale_bias():
    form_tr = AnalysisFormData(
        productName="X",
        productDescription="desc",
        selectedPersonas=["skeptical"],
        locale="tr",
    )
    form_en = AnalysisFormData(
        productName="X",
        productDescription="desc",
        selectedPersonas=["skeptical"],
        locale="en",
    )
    q_tr = build_search_query(form_tr)
    q_en = build_search_query(form_en)
    assert "dönüşüm" in q_tr or "netlik" in q_tr
    assert "conversion" in q_en or "clarity" in q_en
    assert "conversion" not in q_tr
