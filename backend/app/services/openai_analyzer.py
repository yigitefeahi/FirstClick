import asyncio
import json
import logging
import re

import httpx

from app.config import settings
from app.constants import PERSONA_LABELS
from app.schemas.analysis import AnalysisFormData, AnalysisResult, PersonaAnalysis

logger = logging.getLogger(__name__)


PERSONA_SCHEMA = """{
  "firstImpression": string,
  "understood": string,
  "confusion": string,
  "likelihood": "Yüksek" | "Orta" | "Düşük",
  "dropOffReason": string,
  "suggestion": string
}"""


PERSONA_TRAITS: dict[str, str] = {
    "non-technical": "Teknik terimlere aşina değilsin, karmaşık arayüzler veya jargon seni hemen ürkütür. Bir şeyi kullanmak için önce birinin sana adım adım anlatması gerekir.",
    "student": "Bütçen çok kısıtlı, zamanının çoğu ders ve sınavlarla geçiyor. Fiyat/performans senin için her şeyden önce gelir. Karmaşık veya pahalı görünen şeylere hemen kapanırsın.",
    "busy-professional": "Zamanın son derece kısıtlı, dikkatin dağınık. Bir ürünü ilk 10 saniyede anlamazsan direkt çıkarsın. Verimlilik dışında hiçbir şey seni ikna etmez.",
    "price-sensitive": "Her harcamayı gözden geçirirsin, ücretsiz alternatifleri hep aklında tutarsın. Fiyat/değer dengesini net göremezsen vazgeçersin.",
    "skeptical": "Pazarlama diline ve abartılı vaatlere güvenmezsin. 'Bu gerçekten işe yarıyor mu' diye sorgularsın, somut kanıt ve detay istersin, boş sloganlardan rahatsız olursun.",
    "first-timer": "Bu kategoriden bir ürünü ilk kez deniyorsun, hiç önceki deneyimin yok. Basit ve yönlendirici olmayan her şey seni kaybeder.",
}

DEFAULT_TRAIT_TEMPLATE = (
    "'{persona}' profiline uygun tipik davranış, öncelik ve endişelere sahip bir kullanıcısın."
)


def _persona_label(persona_id: str) -> str:
    """Prompt'ta ve sonuçta gösterilecek okunabilir isim (örn. 'busy-professional' -> 'Yoğun çalışan profesyonel')."""
    return PERSONA_LABELS.get(persona_id, persona_id)


def _persona_trait(persona_id: str) -> str:
    return PERSONA_TRAITS.get(
        persona_id.strip().lower(),
        DEFAULT_TRAIT_TEMPLATE.format(persona=_persona_label(persona_id)),
    )


def _build_persona_prompt(persona_id: str, form: AnalysisFormData) -> str:
    label = _persona_label(persona_id)
    trait = _persona_trait(persona_id)
    return f"""
Sen FirstClick adlı ürün simülasyon platformunda tek bir kullanıcı personasısın: "{label}".

Karakterin:
{trait}

Kurallar:
- SADECE bu personanın bakış açısıyla konuş, genel/nötr bir "kullanıcı" gibi değil
- "Ben" dili kullan, ilk kişi ağzından gerçek bir iç ses gibi yaz
- Genel geçer, klişe ifadeler YASAK ("kullanıcı dostu", "harika bir fikir" gibi boş yorumlar yazma)
- Spesifik ol: ürünün hangi cümlesi/özelliği seni ikna etti ya da caydırdı, onu belirt
- Kısa ve yoğun yaz, laf kalabalığı yapma

Ürün bilgileri:
- Ürün adı: {form.product_name}
- Ürün açıklaması: {form.product_description}
- Hedef kitle: {form.target_audience}
- Temel özellikler: {form.core_features}
- Rakiplerden farkı: {form.differentiator}

Bu ürünle ilk karşılaştığında "{label}" olarak ne düşünürsün, nerede tereddüt edersin, seni neyin ikna edeceğini yaz.

Yanıtı SADECE geçerli JSON olarak döndür, açıklama ekleme.

Şema:
{PERSONA_SCHEMA}
"""


SYNTHESIS_SCHEMA = """{
  "overallScore": number (0-100),
  "clarityScore": number (0-100),
  "adoptionScore": number (0-100),
  "onboardingRiskScore": number (0-100, higher = more risk),
  "targetFitScore": number (0-100),
  "blindSpots": string[] (exactly 5 items),
  "dropOffPoints": string[],
  "actionPlan": string[],
  "improvedPitch": string,
  "toughQuestions": string[] (exactly 5 items)
}"""


def _build_synthesis_prompt(form: AnalysisFormData, personas: list[PersonaAnalysis]) -> str:
    persona_summary = "\n".join(
        f"- {p.name}: izlenim=\"{p.first_impression}\" | kafa karışıklığı=\"{p.confusion}\" "
        f"| olasılık={p.likelihood} | çıkış nedeni=\"{p.drop_off_reason}\""
        for p in personas
    )
    return f"""
Sen FirstClick adlı ürün simülasyon platformunun kıdemli analiz motorusun.
Aşağıda farklı kullanıcı personalarından bağımsız olarak toplanmış gerçek tepkiler var.
Bu tepkileri sentezleyerek ürünün genelini değerlendir.

Ürün bilgileri:
- Ürün adı: {form.product_name}
- Ürün açıklaması: {form.product_description}
- Hedef kitle: {form.target_audience}
- Temel özellikler: {form.core_features}
- Rakiplerden farkı: {form.differentiator}

Persona tepkileri:
{persona_summary}

Kurallar:
- Genel ve klişe ifadeler YASAK
- Skorları persona tepkilerindeki gerçek sinyallere dayandır (uydurma sayı verme)
- blindSpots, dropOffPoints ve toughQuestions persona tepkilerinden çıkan somut örüntülere dayansın
- Kısa ama yoğun yaz

Yanıtı SADECE geçerli JSON olarak döndür, açıklama ekleme.

Şema:
{SYNTHESIS_SCHEMA}
"""


def _strip_json_fences(raw: str) -> str:
    cleaned = re.sub(r"```json\n?", "", raw)
    cleaned = re.sub(r"```\n?", "", cleaned).strip()
    return cleaned


async def _call_openai(
    client: httpx.AsyncClient,
    prompt: str,
    *,
    max_tokens: int | None = None,
) -> dict | None:
    payload = {
        "model": settings.openai_model,
        "temperature": 0.8,
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": (
                    "Sen ürün stratejisi ve UX analizi uzmanısın. "
                    "Yanıtlarını her zaman geçerli JSON formatında ver."
                ),
            },
            {"role": "user", "content": prompt},
        ],
    }
    if max_tokens:
        payload["max_tokens"] = max_tokens

    try:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {settings.openai_api_key}",
            },
            json=payload,
        )
    except Exception as exc:
        logger.exception("OpenAI request failed: %s", exc)
        return None

    if response.status_code != 200:
        logger.error("OpenAI API error: %s %s", response.status_code, response.text)
        return None

    content = response.json().get("choices", [{}])[0].get("message", {}).get("content")
    if not content:
        return None

    try:
        return json.loads(_strip_json_fences(content))
    except Exception:
        logger.warning("OpenAI response JSON parse edilemedi: %s", content[:300])
        return None


async def _analyze_persona(
    client: httpx.AsyncClient, persona_id: str, form: AnalysisFormData
) -> PersonaAnalysis | None:
    prompt = _build_persona_prompt(persona_id, form)
    data = await _call_openai(client, prompt, max_tokens=350)
    if not data:
        return None
    try:
        return PersonaAnalysis.model_validate({**data, "name": _persona_label(persona_id)})
    except Exception:
        logger.warning("Persona '%s' için sonuç şemaya uymuyor: %s", persona_id, data)
        return None


async def analyze_with_openai(form: AnalysisFormData) -> AnalysisResult | None:
    if not settings.openai_api_key:
        return None

    personas = form.selected_personas[:6]

    async with httpx.AsyncClient(timeout=60.0) as client:
        persona_tasks = [_analyze_persona(client, persona, form) for persona in personas]
        persona_results = await asyncio.gather(*persona_tasks)

        valid_personas = [p for p in persona_results if p is not None]
        if not valid_personas:
            return None

        synthesis_prompt = _build_synthesis_prompt(form, valid_personas)
        synthesis_data = await _call_openai(client, synthesis_prompt, max_tokens=800)
        if not synthesis_data:
            return None

    try:
        return AnalysisResult.model_validate({**synthesis_data, "personas": valid_personas})
    except Exception:
        logger.warning("Sentez sonucu şemaya uymuyor: %s", synthesis_data)
        return None