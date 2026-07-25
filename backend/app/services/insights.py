"""Compare two analyses and persona follow-up Q&A."""

from __future__ import annotations

import json
import logging
import re

import httpx

from app.config import settings
from app.rag.retrieve import format_rag_context, hybrid_retrieve
from app.schemas.analysis import (
    AnalysisFormData,
    CompareResponse,
    FollowupRequest,
    FollowupResponse,
    ScoreDelta,
)

logger = logging.getLogger(__name__)

SCORE_KEYS_TR = [
    ("overallScore", "Genel skor"),
    ("clarityScore", "Anlaşılabilirlik"),
    ("adoptionScore", "Kullanma isteği"),
    ("onboardingRiskScore", "Onboarding riski"),
    ("targetFitScore", "Hedef kitle uyumu"),
]

SCORE_KEYS_EN = [
    ("overallScore", "Overall score"),
    ("clarityScore", "Clarity"),
    ("adoptionScore", "Adoption intent"),
    ("onboardingRiskScore", "Onboarding risk"),
    ("targetFitScore", "Target fit"),
]

SCORE_KEYS = SCORE_KEYS_TR


def _strip_json_fences(raw: str) -> str:
    cleaned = re.sub(r"```json\n?", "", raw)
    cleaned = re.sub(r"```\n?", "", cleaned).strip()
    return cleaned


async def _chat_json(
    prompt: str,
    *,
    max_tokens: int = 700,
    model: str | None = None,
    temperature: float = 0.5,
    locale: str = "tr",
) -> dict | None:
    if not settings.openai_api_key:
        return None
    system = (
        "You are a product UX analyst. Reply with valid JSON only. "
        "Write all user-facing string values in English."
        if locale == "en"
        else "Ürün UX analisti olarak geçerli JSON yanıt ver."
    )
    async with httpx.AsyncClient(timeout=90.0) as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.openai_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model or settings.openai_model,
                "temperature": temperature,
                "response_format": {"type": "json_object"},
                "max_tokens": max_tokens,
                "messages": [
                    {
                        "role": "system",
                        "content": system,
                    },
                    {"role": "user", "content": prompt},
                ],
            },
        )
    if response.status_code != 200:
        logger.error("OpenAI compare/followup error: %s %s", response.status_code, response.text)
        return None
    content = response.json().get("choices", [{}])[0].get("message", {}).get("content")
    if not content:
        return None
    try:
        return json.loads(_strip_json_fences(content))
    except Exception:
        return None


def compute_score_deltas(before: dict, after: dict, locale: str = "tr") -> list[ScoreDelta]:
    keys = SCORE_KEYS_EN if locale == "en" else SCORE_KEYS_TR
    deltas: list[ScoreDelta] = []
    for key, label in keys:
        b = int(before.get(key) or 0)
        a = int(after.get(key) or 0)
        # Onboarding risk: lower is better — flip delta sign for "improvement"
        delta = b - a if key == "onboardingRiskScore" else a - b
        deltas.append(ScoreDelta(key=key, label=label, before=b, after=a, delta=delta))
    return deltas


async def compare_analyses(
    *,
    before_id: str,
    after_id: str,
    before_row: dict,
    after_row: dict,
    locale: str = "tr",
) -> CompareResponse:
    locale = locale if locale in ("tr", "en") else "tr"
    before_result = before_row.get("result") or {}
    after_result = after_row.get("result") or {}
    before_form = before_row.get("form_data") or {}
    after_form = after_row.get("form_data") or {}

    deltas = compute_score_deltas(before_result, after_result, locale=locale)
    if locale == "en":
        before_label = (
            f"{before_form.get('productName') or 'Before'} · "
            f"{(before_row.get('created_at') or '')[:10]}"
        )
        after_label = (
            f"{after_form.get('productName') or 'After'} · "
            f"{(after_row.get('created_at') or '')[:10]}"
        )
        prompt = f"""
Compare two FirstClick user-simulation results. Answer "what changed?" clearly for a product team.

BEFORE ({before_label}):
Scores: overall={before_result.get('overallScore')}, clarity={before_result.get('clarityScore')},
adoption={before_result.get('adoptionScore')}, onboardingRisk={before_result.get('onboardingRiskScore')},
targetFit={before_result.get('targetFitScore')}
Blind spots: {before_result.get('blindSpots')}
Drop-offs: {before_result.get('dropOffPoints')}
Actions: {before_result.get('actionPlan')}

AFTER ({after_label}):
Scores: overall={after_result.get('overallScore')}, clarity={after_result.get('clarityScore')},
adoption={after_result.get('adoptionScore')}, onboardingRisk={after_result.get('onboardingRiskScore')},
targetFit={after_result.get('targetFitScore')}
Blind spots: {after_result.get('blindSpots')}
Drop-offs: {after_result.get('dropOffPoints')}
Actions: {after_result.get('actionPlan')}

Reply with JSON ONLY:
{{
  "improved": string[] (concrete improvements, max 5),
  "regressed": string[] (regressions, max 5),
  "unchangedRisks": string[] (remaining risks, max 5),
  "narrative": string (3-5 sentences, English),
  "recommendation": string (1-2 sentences for the next sprint, English)
}}
"""
    else:
        before_label = (
            f"{before_form.get('productName') or 'Önce'} · "
            f"{(before_row.get('created_at') or '')[:10]}"
        )
        after_label = (
            f"{after_form.get('productName') or 'Sonra'} · "
            f"{(after_row.get('created_at') or '')[:10]}"
        )
        prompt = f"""
İki FirstClick kullanıcı simülasyonu sonucunu karşılaştır. "Ne değişti?" sorusuna ürün ekibi için net cevap ver.

ÖNCE ({before_label}):
Skorlar: overall={before_result.get('overallScore')}, clarity={before_result.get('clarityScore')},
adoption={before_result.get('adoptionScore')}, onboardingRisk={before_result.get('onboardingRiskScore')},
targetFit={before_result.get('targetFitScore')}
Kör noktalar: {before_result.get('blindSpots')}
Çıkış noktaları: {before_result.get('dropOffPoints')}
Aksiyon: {before_result.get('actionPlan')}

SONRA ({after_label}):
Skorlar: overall={after_result.get('overallScore')}, clarity={after_result.get('clarityScore')},
adoption={after_result.get('adoptionScore')}, onboardingRisk={after_result.get('onboardingRiskScore')},
targetFit={after_result.get('targetFitScore')}
Kör noktalar: {after_result.get('blindSpots')}
Çıkış noktaları: {after_result.get('dropOffPoints')}
Aksiyon: {after_result.get('actionPlan')}

Yanıt SADECE JSON:
{{
  "improved": string[] (düzelen somut noktalar, max 5),
  "regressed": string[] (kötüleşen noktalar, max 5),
  "unchangedRisks": string[] (hâlâ duran riskler, max 5),
  "narrative": string (3-5 cümle, Türkçe),
  "recommendation": string (bir sonraki sprint için 1-2 cümle)
}}
"""
    data = await _chat_json(
        prompt,
        model=settings.openai_synthesis_model,
        max_tokens=800,
        temperature=0.4,
        locale=locale,
    )
    if not data:
        improved = [d.label for d in deltas if d.delta > 3]
        regressed = [d.label for d in deltas if d.delta < -3]
        if locale == "en":
            data = {
                "improved": improved or ["No clear score improvement"],
                "regressed": regressed or [],
                "unchangedRisks": (after_result.get("blindSpots") or [])[:3],
                "narrative": (
                    f"Overall score {before_result.get('overallScore')} → {after_result.get('overallScore')}. "
                    "Detailed AI narrative requires OPENAI_API_KEY."
                ),
                "recommendation": "Focus on the weakest score area and run another iteration.",
            }
        else:
            data = {
                "improved": improved or ["Belirgin skor iyileşmesi yok"],
                "regressed": regressed or [],
                "unchangedRisks": (after_result.get("blindSpots") or [])[:3],
                "narrative": (
                    f"Genel skor {before_result.get('overallScore')} → {after_result.get('overallScore')}. "
                    "Detaylı AI anlatımı için OPENAI_API_KEY gerekir."
                ),
                "recommendation": "Zayıf skor alanına odaklanıp bir iterasyon daha test edin.",
            }

    return CompareResponse(
        before_id=before_id,
        after_id=after_id,
        before_label=before_label,
        after_label=after_label,
        score_deltas=deltas,
        improved=list(data.get("improved") or []),
        regressed=list(data.get("regressed") or []),
        unchanged_risks=list(data.get("unchangedRisks") or data.get("unchanged_risks") or []),
        narrative=str(data.get("narrative") or ""),
        recommendation=str(data.get("recommendation") or ""),
    )


async def answer_followup(
    *,
    user_id: str,
    body: FollowupRequest,
) -> FollowupResponse:
    # Talk/follow-up replies are always Turkish regardless of UI language.
    locale = "tr"
    form = AnalysisFormData(
        productName=body.product_name or "Ürün",
        productDescription=body.product_description or body.question,
        selectedPersonas=["skeptical"],
        productId=body.product_id,
        locale=locale,
    )
    chunks = []
    try:
        chunks = await hybrid_retrieve(
            user_id=user_id,
            form=form,
            product_id=body.product_id,
            top_k=6,
        )
    except Exception as exc:
        logger.warning("followup retrieve failed: %s", exc)

    rag = format_rag_context(chunks, locale=locale)
    prior = body.prior_persona or {}
    history_lines = []
    for turn in body.history[-8:]:
        if locale == "en":
            who = "User" if turn.role == "user" else body.persona_name
        else:
            who = "Kullanıcı" if turn.role == "user" else body.persona_name
        history_lines.append(f"{who}: {turn.content}")
    if history_lines:
        history_block = "\n".join(history_lines)
    else:
        history_block = "(no prior turns)" if locale == "en" else "(önceki tur yok)"

    impression = prior.get("firstImpression") or prior.get("first_impression") or "-"
    confusion = prior.get("confusion") or "-"
    drop_off = prior.get("dropOffReason") or prior.get("drop_off_reason") or "-"

    if locale == "en":
        prompt = f"""
You are in a FirstClick persona simulation. Your persona name is: "{body.persona_name}".
Your earlier reaction (summary):
- impression: {impression}
- confusion: {confusion}
- drop-off: {drop_off}

Prior chat:
{history_block}

{rag}

User follow-up question: {body.question}

Rules:
- Answer in first person as this persona
- Reply in natural English
- Base answers on product docs / web / past-test context; do not invent facts
- Remember prior chat; do not contradict it
- Add [doc:…] / [web:…] / [past:…] / [kb:…] tags for sources you use
- Use [kb:…] for general UX rules; use user-corpus tags for product claims

JSON:
{{
  "answer": string,
  "citations": string[]
}}
"""
        mock_answer = (
            f"(as {body.persona_name}) I need more product context to answer this clearly. "
            "Add documents or a web page to the corpus and try again."
        )
    else:
        prompt = f"""
Sen FirstClick persona simülasyonundasın. Persona adın: "{body.persona_name}".
Önceki tepkin (özet):
- izlenim: {impression}
- kafa karışıklığı: {confusion}
- vazgeçme: {drop_off}

Önceki sohbet:
{history_block}

{rag}

Kullanıcının follow-up sorusu: {body.question}

Kurallar:
- Bu persona olarak "ben" diliyle cevapla
- Türkçe cevapla
- Ürün dokümanı / web / geçmiş test bağlamına dayan; uydurma
- Önceki sohbeti hatırla; çelişme
- Metinde kullandığın kaynaklara [doc:…] / [web:…] / [past:…] / [kb:…] etiketi ekle
- Genel UX kuralı için [kb:…], ürün iddiası için kullanıcı corpus etiketleri kullan

JSON:
{{
  "answer": string,
  "citations": string[]
}}
"""
        mock_answer = (
            f"({body.persona_name} olarak) Bu soruyu net cevaplamak için daha fazla ürün bağlamı lazım. "
            "Doküman veya web sayfası corpus’una ekleyip tekrar dene."
        )

    data = await _chat_json(prompt, max_tokens=400, locale=locale)
    if not data:
        return FollowupResponse(
            answer=mock_answer,
            persona_name=body.persona_name,
            citations=[],
            source="mock",
        )

    return FollowupResponse(
        answer=str(data.get("answer") or ""),
        persona_name=body.persona_name,
        citations=list(data.get("citations") or []),
        source="openai",
    )
