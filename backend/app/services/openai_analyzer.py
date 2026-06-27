import json
import logging
import re

import httpx

from app.config import settings
from app.schemas.analysis import AnalysisFormData, AnalysisResult

logger = logging.getLogger(__name__)

ANALYSIS_SCHEMA = """{
  "overallScore": number (0-100),
  "clarityScore": number (0-100),
  "adoptionScore": number (0-100),
  "onboardingRiskScore": number (0-100, higher = more risk),
  "targetFitScore": number (0-100),
  "personas": [{
    "name": string,
    "firstImpression": string,
    "understood": string,
    "confusion": string,
    "likelihood": "Yüksek" | "Orta" | "Düşük",
    "dropOffReason": string,
    "suggestion": string
  }],
  "blindSpots": string[] (exactly 5 items),
  "dropOffPoints": string[],
  "actionPlan": string[],
  "improvedPitch": string,
  "toughQuestions": string[] (exactly 5 items)
}"""


def _build_prompt(form: AnalysisFormData) -> str:
    return f"""Sen FirstClick adlı bir ürün simülasyon platformunun analiz motorusun.
Aşağıdaki ürün fikrini, seçilen kullanıcı profilleri (persona) gözünden değerlendir.
Tüm metinler Türkçe olsun. Gerçekçi, aksiyon odaklı ve spesifik ol.

Ürün adı: {form.product_name}
Ürün açıklaması: {form.product_description}
Hedef kitle: {form.target_audience}
Temel özellikler: {form.core_features}
Rakiplerden farkı: {form.differentiator}
Test edilen persona profilleri: {", ".join(form.selected_personas)}

Yanıtı SADECE geçerli JSON olarak döndür. Şema:
{ANALYSIS_SCHEMA}"""


def _parse_result(raw: str) -> AnalysisResult | None:
    try:
        cleaned = re.sub(r"```json\n?", "", raw)
        cleaned = re.sub(r"```\n?", "", cleaned).strip()
        data = json.loads(cleaned)
        return AnalysisResult.model_validate(data)
    except Exception:
        return None


async def analyze_with_openai(form: AnalysisFormData) -> AnalysisResult | None:
    if not settings.openai_api_key:
        return None

    payload = {
        "model": settings.openai_model,
        "temperature": 0.7,
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": (
                    "Sen ürün stratejisi ve UX analizi uzmanısın. "
                    "Kullanıcı persona simülasyonları yaparsın. "
                    "Yanıtlarını her zaman geçerli JSON formatında ver."
                ),
            },
            {"role": "user", "content": _build_prompt(form)},
        ],
    }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {settings.openai_api_key}",
                },
                json=payload,
            )

        if response.status_code != 200:
            logger.error("OpenAI API error: %s %s", response.status_code, response.text)
            return None

        content = response.json().get("choices", [{}])[0].get("message", {}).get("content")
        if not content:
            return None

        return _parse_result(content)
    except Exception as exc:
        logger.exception("OpenAI request failed: %s", exc)
        return None
