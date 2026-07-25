import asyncio
import json
import logging
import re
from collections.abc import AsyncIterator, Awaitable, Callable

import httpx

from app.config import settings
from app.constants import persona_label_for_locale
from app.rag.retrieve import RetrievedChunk, format_rag_context
from app.schemas.analysis import AnalysisFormData, AnalysisResult, PersonaAnalysis

logger = logging.getLogger(__name__)


PERSONA_SCHEMA_TR = """{
  "firstImpression": string (alıntı varsa metinde [doc:...] / [web:...] / [past:...] / [kb:...] etiketi kullan),
  "understood": string,
  "confusion": string,
  "likelihood": "Yüksek" | "Orta" | "Düşük",
  "dropOffReason": string,
  "suggestion": string,
  "citations": string[] (kullandığın citation etiketleri; kb = FirstClick uzmanlık bilgisi),
  "dropOffTimeline": [
    {"step": "Landing"|"CTA"|"Kurulum"|"Fiyat"|"Dashboard", "moment": string, "friction": "low"|"med"|"high"}
  ] (tam 4 adım; session replay hissi)
}"""

PERSONA_SCHEMA_EN = """{
  "firstImpression": string (if citing evidence, include [doc:...] / [web:...] / [past:...] / [kb:...] tags in the text),
  "understood": string,
  "confusion": string,
  "likelihood": "High" | "Medium" | "Low",
  "dropOffReason": string,
  "suggestion": string,
  "citations": string[] (citation tags you used; kb = FirstClick expertise),
  "dropOffTimeline": [
    {"step": "Landing"|"CTA"|"Setup"|"Pricing"|"Dashboard", "moment": string, "friction": "low"|"med"|"high"}
  ] (exactly 4 steps; session-replay feel)
}"""


PERSONA_TRAITS_TR: dict[str, str] = {
    "non-technical": "Teknik terimlere aşina değilsin, karmaşık arayüzler veya jargon seni hemen ürkütür. Bir şeyi kullanmak için önce birinin sana adım adım anlatması gerekir.",
    "student": "Bütçen çok kısıtlı, zamanının çoğu ders ve sınavlarla geçiyor. Fiyat/performans senin için her şeyden önce gelir. Karmaşık veya pahalı görünen şeylere hemen kapanırsın.",
    "busy-professional": "Zamanın son derece kısıtlı, dikkatin dağınık. Bir ürünü ilk 10 saniyede anlamazsan direkt çıkarsın. Verimlilik dışında hiçbir şey seni ikna etmez.",
    "price-sensitive": "Her harcamayı gözden geçirirsin, ücretsiz alternatifleri hep aklında tutarsın. Fiyat/değer dengesini net göremezsen vazgeçersin.",
    "skeptical": "Pazarlama diline ve abartılı vaatlere güvenmezsin. 'Bu gerçekten işe yarıyor mu' diye sorgularsın, somut kanıt ve detay istersin, boş sloganlardan rahatsız olursun.",
    "first-timer": "Bu kategoriden bir ürünü ilk kez deniyorsun, hiç önceki deneyimin yok. Basit ve yönlendirici olmayan her şey seni kaybeder.",
}

PERSONA_TRAITS_EN: dict[str, str] = {
    "non-technical": "You are not familiar with technical terms; complex UIs or jargon scare you off immediately. You need someone to walk you through a product step by step before you can use it.",
    "student": "Your budget is very tight and most of your time goes to classes and exams. Value for money comes first. You shut down quickly on anything that looks complex or expensive.",
    "busy-professional": "Your time is extremely limited and your attention is fragmented. If you don't get a product in the first 10 seconds, you leave. Nothing but efficiency will convince you.",
    "price-sensitive": "You scrutinize every expense and always keep free alternatives in mind. If you cannot clearly see price/value balance, you walk away.",
    "skeptical": "You distrust marketing language and exaggerated claims. You ask 'does this actually work?', want concrete proof and detail, and hate empty slogans.",
    "first-timer": "You are trying a product in this category for the first time with no prior experience. Anything that is not simple and guided loses you.",
}

DEFAULT_TRAIT_TEMPLATE_TR = (
    "'{persona}' profiline uygun tipik davranış, öncelik ve endişelere sahip bir kullanıcısın."
)
DEFAULT_TRAIT_TEMPLATE_EN = (
    "You are a user with typical behaviors, priorities, and concerns matching the '{persona}' profile."
)


def _form_locale(form: AnalysisFormData) -> str:
    loc = (form.locale or "tr").lower()
    return loc if loc in ("tr", "en") else "tr"


def _persona_label(
    persona_id: str,
    locale: str = "tr",
    custom: dict[str, dict[str, str]] | None = None,
) -> str:
    if persona_id.startswith("custom:") and custom:
        info = custom.get(persona_id.removeprefix("custom:"))
        if info:
            return info.get("name") or persona_id
    return persona_label_for_locale(persona_id, locale)


def _persona_trait(
    persona_id: str,
    locale: str = "tr",
    custom: dict[str, dict[str, str]] | None = None,
) -> str:
    traits_map = PERSONA_TRAITS_EN if locale == "en" else PERSONA_TRAITS_TR
    default_tmpl = DEFAULT_TRAIT_TEMPLATE_EN if locale == "en" else DEFAULT_TRAIT_TEMPLATE_TR
    if persona_id.startswith("custom:") and custom:
        info = custom.get(persona_id.removeprefix("custom:"))
        if info:
            traits = (info.get("traits") or "").strip()
            name = info.get("name") or ("Custom persona" if locale == "en" else "Özel persona")
            if traits:
                return f"{name}: {traits}"
            return default_tmpl.format(persona=name)
    return traits_map.get(
        persona_id.strip().lower(),
        default_tmpl.format(persona=_persona_label(persona_id, locale, custom)),
    )


def _build_persona_prompt(
    persona_id: str,
    form: AnalysisFormData,
    rag_context: str = "",
    custom: dict[str, dict[str, str]] | None = None,
) -> str:
    locale = _form_locale(form)
    label = _persona_label(persona_id, locale, custom)
    trait = _persona_trait(persona_id, locale, custom)
    has_rag = bool((rag_context or "").strip())
    rag_block = f"\n{rag_context}\n" if has_rag else ""

    if locale == "en":
        citation_rules = (
            """- Retrieved Context is provided below — ground claims in those excerpts only
- Use [doc:…]/[web:…]/[past:…] for product-specific claims; [kb:…] for FirstClick expertise from Retrieved Context
- When reacting to a Retrieved Context sentence/feature, quote briefly then add a [citation] tag using the EXACT citation id from context
  e.g. The doc says "one-click setup" [doc:…] but onboarding best practice says stay under 3 steps [kb:onboarding-activation].
- Put every citation tag you used into the citations array (empty array if none)
- Do NOT invent citation ids that are not in Retrieved Context"""
            if has_rag
            else """- No Retrieved Context was provided for this run
- Do NOT invent [doc:…]/[web:…]/[past:…]/[kb:…] tags or citation ids
- citations must be an empty array []
- Ground your reaction only in the product fields below (name, description, features, differentiator)"""
        )
        return f"""
You are a single user persona on the FirstClick product simulation platform: "{label}".

Your character:
{trait}

Rules:
- Speak ONLY from this persona's point of view, not as a generic/neutral "user"
- Use first-person "I" language, like a real inner monologue
- Ban clichés: "user-friendly", "great idea", "innovative solution", "high market potential", "unclear value proposition", etc.
- Be specific: name the product, cite concrete features/copy/pricing/CTA or competitor differences; say what convinced or deterred you
- Write short and dense; do not invent features
{citation_rules}
- Write ALL user-facing string fields in English
{rag_block}
Product info:
- Product name: {form.product_name}
- Product description: {form.product_description}
- Target audience: {form.target_audience}
- Core features: {form.core_features}
- Differentiator: {form.differentiator}

As "{label}", write what you think on first encounter, where you hesitate, and what would convince you.

Return ONLY valid JSON, no explanation.

Schema:
{PERSONA_SCHEMA_EN}
"""

    citation_rules_tr = (
        """- Aşağıda Retrieved Context var — iddialarını YALNIZCA bu parçalara dayandır
- Ürüne özel iddia için [doc:…]/[web:…]/[past:…]; FirstClick uzmanlık için [kb:…] kullan (yalnızca context'teki birebir citation id)
- Retrieved Context'ten bir cümleye/özelliğe tepki verirken kısa alıntı yap ve hemen ardından [citation] etiketi koy
  Örn: Dokümanda "tek tıkla kurulum" yazıyor [doc:…] ama onboarding best-practice'ine göre 3 adımdan fazla olmamalı [kb:onboarding-activation].
- Kullandığın tüm citation etiketlerini citations dizisine de yaz (yoksa boş dizi)
- Retrieved Context'te olmayan citation id uydurma"""
        if has_rag
        else """- Bu çalışmada Retrieved Context yok
- [doc:…]/[web:…]/[past:…]/[kb:…] etiketi veya citation id UYDURMA
- citations dizisi boş [] olmalı
- Tepkini yalnızca aşağıdaki ürün alanlarına (ad, açıklama, özellikler, fark) dayandır"""
    )
    return f"""
Sen FirstClick adlı ürün simülasyon platformunda tek bir kullanıcı personasısın: "{label}".

Karakterin:
{trait}

Kurallar:
- SADECE bu personanın bakış açısıyla konuş, genel/nötr bir "kullanıcı" gibi değil
- "Ben" dili kullan, ilk kişi ağzından gerçek bir iç ses gibi yaz
- Genel geçer, klişe ifadeler KESİNLİKLE YASAK: "kullanıcı dostu", "harika bir fikir", "innovatif çözüm", "pazar potansiyeli yüksek", "değer önerisi net değil" gibi boş şablonlar yazma
- Spesifik ol: ürün adını, somut özellik/cümle/fiyat/CTA veya rakip farkını doğrudan an; hangi detay seni ikna etti ya da caydırdı, onu belirt
- Kısa ve yoğun yaz, laf kalabalığı yapma; ama somut ürün detayı eksik bırakma
{citation_rules_tr}
- Tüm kullanıcıya dönük metin alanlarını Türkçe yaz
{rag_block}
Ürün bilgileri:
- Ürün adı: {form.product_name}
- Ürün açıklaması: {form.product_description}
- Hedef kitle: {form.target_audience}
- Temel özellikler: {form.core_features}
- Rakiplerden farkı: {form.differentiator}

Bu ürünle ilk karşılaştığında "{label}" olarak ne düşünürsün, nerede tereddüt edersin, seni neyin ikna edeceğini yaz.

Yanıtı SADECE geçerli JSON olarak döndür, açıklama ekleme.

Şema:
{PERSONA_SCHEMA_TR}
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


def _build_synthesis_prompt(
    form: AnalysisFormData,
    personas: list[PersonaAnalysis],
    rag_context: str = "",
) -> str:
    locale = _form_locale(form)
    rag_block = f"\n{rag_context}\n" if rag_context else ""

    if locale == "en":
        persona_summary = "\n".join(
            f'- {p.name}: impression="{p.first_impression}" | confusion="{p.confusion}" '
            f"| likelihood={p.likelihood} | drop-off=\"{p.drop_off_reason}\""
            for p in personas
        )
        return f"""
You are the senior analysis engine of the FirstClick product simulation platform.
Below are real reactions collected independently from different user personas.
Synthesize them into an overall product assessment.
{rag_block}
Product info:
- Product name: {form.product_name}
- Product description: {form.product_description}
- Target audience: {form.target_audience}
- Core features: {form.core_features}
- Differentiator: {form.differentiator}

Persona reactions:
{persona_summary}

Rules:
- Ban generic clichés
- Ground scores in real signals from persona reactions (do not invent numbers)
- blindSpots, dropOffPoints and toughQuestions must reflect concrete patterns from persona reactions
- If Retrieved Context exists, cite docs/web/past analysis and FirstClick [kb:…] expertise; use [doc:…] / [web:…] / [past:…] / [kb:…] when possible
- Write short but dense
- Write ALL user-facing string fields (blindSpots, dropOffPoints, actionPlan, improvedPitch, toughQuestions) in English

Return ONLY valid JSON, no explanation.

Schema:
{SYNTHESIS_SCHEMA}
"""

    persona_summary = "\n".join(
        f"- {p.name}: izlenim=\"{p.first_impression}\" | kafa karışıklığı=\"{p.confusion}\" "
        f"| olasılık={p.likelihood} | çıkış nedeni=\"{p.drop_off_reason}\""
        for p in personas
    )
    return f"""
Sen FirstClick adlı ürün simülasyon platformunun kıdemli analiz motorusun.
Aşağıda farklı kullanıcı personalarından bağımsız olarak toplanmış gerçek tepkiler var.
Bu tepkileri sentezleyerek ürünün genelini değerlendir.
{rag_block}
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
- Retrieved Context varsa doküman, web, geçmiş analiz ve FirstClick [kb:…] uzmanlık bilgisine atıf ederek somutlaştır; mümkünse [doc:…] / [web:…] / [past:…] / [kb:…] etiketleri kullan
- Kısa ama yoğun yaz
- Tüm kullanıcıya dönük metin alanlarını Türkçe yaz

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
    model: str | None = None,
    temperature: float = 0.8,
    max_tokens: int | None = None,
    locale: str = "tr",
) -> dict | None:
    system = (
        "You are a product strategy and UX analysis expert. "
        "Always reply with valid JSON. Write all user-facing string values in English."
        if locale == "en"
        else (
            "Sen ürün stratejisi ve UX analizi uzmanısın. "
            "Yanıtlarını her zaman geçerli JSON formatında ver. "
            "Kullanıcıya dönük metin alanlarını Türkçe yaz."
        )
    )
    payload = {
        "model": model or settings.openai_model,
        "temperature": temperature,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": system},
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
    client: httpx.AsyncClient,
    persona_id: str,
    form: AnalysisFormData,
    rag_context: str = "",
    custom: dict[str, dict[str, str]] | None = None,
) -> PersonaAnalysis | None:
    locale = _form_locale(form)
    prompt = _build_persona_prompt(persona_id, form, rag_context=rag_context, custom=custom)
    data = await _call_openai(
        client,
        prompt,
        model=settings.openai_model,
        max_tokens=800,
        locale=locale,
    )
    if not data:
        return None
    try:
        return PersonaAnalysis.model_validate(
            {**data, "name": _persona_label(persona_id, locale, custom)}
        )
    except Exception:
        logger.warning("Persona '%s' için sonuç şemaya uymuyor: %s", persona_id, data)
        return None


async def analyze_with_openai(
    form: AnalysisFormData,
    rag_chunks: list[RetrievedChunk] | None = None,
    custom_personas: dict[str, dict[str, str]] | None = None,
    on_progress: Callable[[dict], Awaitable[None]] | None = None,
) -> AnalysisResult | None:
    if not settings.openai_api_key:
        return None

    async def emit(event: dict) -> None:
        if on_progress:
            await on_progress(event)

    locale = _form_locale(form)
    personas = form.selected_personas[:6]
    rag_context = format_rag_context(rag_chunks or [], locale=locale)
    custom = custom_personas or {}
    total = len(personas)

    async with httpx.AsyncClient(timeout=120.0) as client:
        for index, persona_id in enumerate(personas, start=1):
            await emit(
                {
                    "type": "persona",
                    "status": "running",
                    "index": index,
                    "total": total,
                    "name": _persona_label(persona_id, locale, custom),
                    "personaId": persona_id,
                }
            )

        async def run_one(index: int, persona_id: str) -> tuple[int, PersonaAnalysis | None]:
            result = await _analyze_persona(
                client, persona_id, form, rag_context=rag_context, custom=custom
            )
            return index, result

        tasks = [
            asyncio.create_task(run_one(index, persona_id))
            for index, persona_id in enumerate(personas, start=1)
        ]
        by_index: dict[int, PersonaAnalysis | None] = {}
        for finished in asyncio.as_completed(tasks):
            index, persona_result = await finished
            by_index[index] = persona_result
            pid = personas[index - 1]
            await emit(
                {
                    "type": "persona",
                    "status": "done",
                    "index": index,
                    "total": total,
                    "name": _persona_label(pid, locale, custom),
                    "personaId": pid,
                    "ok": persona_result is not None,
                }
            )

        valid_personas = [p for p in (by_index.get(i) for i in range(1, total + 1)) if p is not None]
        if not valid_personas:
            return None

        await emit({"type": "synthesis", "status": "running"})
        synthesis_prompt = _build_synthesis_prompt(form, valid_personas, rag_context=rag_context)
        synthesis_data = await _call_openai(
            client,
            synthesis_prompt,
            model=settings.openai_synthesis_model,
            temperature=0.5,
            max_tokens=1600,
            locale=locale,
        )
        await emit({"type": "synthesis", "status": "done"})
        if not synthesis_data:
            return None

    try:
        return AnalysisResult.model_validate({**synthesis_data, "personas": valid_personas})
    except Exception:
        logger.warning("Sentez sonucu şemaya uymuyor: %s", synthesis_data)
        return None
