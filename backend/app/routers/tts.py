import base64
import logging
from typing import Annotated, Literal

import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.auth import AuthUser, get_current_user
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tts", tags=["tts"])

# Prefer newer gpt-4o-mini-tts voices; keep legacy names for fallback models.
TtsVoice = Literal[
    "coral",
    "shimmer",
    "onyx",
    "sage",
    "ash",
    "marin",
    "nova",
    "echo",
    "alloy",
    "fable",
    "ballad",
    "verse",
    "cedar",
]

# Voices only available (or best) on gpt-4o-mini-tts family
_MINI_TTS_ONLY = {"coral", "ash", "sage", "marin", "ballad", "verse", "cedar"}

# Gender-aware fallbacks when falling back to tts-1 / tts-1-hd
_LEGACY_VOICE_FALLBACK: dict[str, str] = {
    "coral": "nova",
    "marin": "shimmer",
    "sage": "alloy",
    "ash": "onyx",
    "ballad": "fable",
    "verse": "echo",
    "cedar": "onyx",
}


class TtsRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=4096)
    voice: TtsVoice = "coral"
    accent: str | None = None
    speed: float = Field(default=1.12, ge=0.8, le=1.4)
    locale: Literal["tr", "en"] = "tr"


class TtsResponse(BaseModel):
    audio_base64: str | None = Field(None, alias="audioBase64")
    model: str | None = None
    fallback: bool = False
    detail: str | None = None

    model_config = {"populate_by_name": True}


def _tts_instructions(accent: str | None, locale: str = "tr") -> str:
    if locale == "en":
        style = (accent or "").strip() or (
            "Natural, fluent, everyday conversational English."
        )
        return (
            "Speak in natural English. "
            "Do not sound like a slow robotic assistant or Siri. "
            "Use a lively conversational pace — slightly brisk, clear, and human. "
            "Keep product names and technical terms natural. "
            f"Voice character: {style}"
        )
    style = (accent or "").strip() or (
        "Doğal, akıcı, günlük konuşma temposunda Türkiye Türkçesi."
    )
    return (
        "Speak in natural Turkish (Türkiye Türkçesi / Istanbul Turkish). "
        "Do not sound like a slow robotic assistant or Siri. "
        "Use a lively conversational pace — slightly brisk, clear, and human. "
        "Pronounce Turkish letters correctly (ş, ğ, ı, ç, ö, ü). "
        "Keep English product words natural inside Turkish sentences. "
        f"Voice character: {style}"
    )


def _voice_for_model(voice: str, model_name: str) -> str:
    if "mini-tts" in model_name:
        return voice
    if voice in _MINI_TTS_ONLY:
        return _LEGACY_VOICE_FALLBACK.get(voice, "nova")
    return voice


async def _create_speech(
    text: str,
    voice: str,
    accent: str | None,
    speed: float,
    locale: str = "tr",
) -> tuple[str | None, str | None, str | None]:
    if not settings.openai_api_key:
        return None, None, "OpenAI API anahtarı yapılandırılmamış."

    models_to_try: list[str] = []
    for model in (settings.tts_model, "gpt-4o-mini-tts", "tts-1-hd", "tts-1"):
        if model and model not in models_to_try:
            models_to_try.append(model)

    # Prefer mini-tts first when requested voice needs instructions / new voices
    if voice in _MINI_TTS_ONLY:
        models_to_try = ["gpt-4o-mini-tts"] + [m for m in models_to_try if m != "gpt-4o-mini-tts"]

    instructions = _tts_instructions(accent, locale)
    headers = {
        "Authorization": f"Bearer {settings.openai_api_key}",
        "Content-Type": "application/json",
    }

    last_error: str | None = None
    async with httpx.AsyncClient(timeout=60.0) as client:
        for model_name in models_to_try:
            try:
                use_voice = _voice_for_model(voice, model_name)
                payload: dict = {
                    "model": model_name,
                    "voice": use_voice,
                    "input": text[:4096],
                    "response_format": "mp3",
                    "speed": speed,
                }
                if "mini-tts" in model_name:
                    payload["instructions"] = instructions

                response = await client.post(
                    "https://api.openai.com/v1/audio/speech",
                    headers=headers,
                    json=payload,
                )
                if response.status_code != 200:
                    last_error = f"{model_name}/{use_voice}: {response.status_code} {response.text[:240]}"
                    logger.warning("TTS failed: %s", last_error)
                    continue

                b64 = base64.b64encode(response.content).decode("utf-8")
                return b64, model_name, None
            except Exception as exc:
                last_error = str(exc)
                logger.warning("TTS model %s failed: %s", model_name, exc)

    return None, None, last_error


@router.post("", response_model=TtsResponse)
async def synthesize_speech(
    body: TtsRequest,
    user: Annotated[AuthUser, Depends(get_current_user)],
) -> TtsResponse:
    clean = body.text.strip()
    if not clean:
        raise HTTPException(status_code=400, detail="Metin boş olamaz.")

    b64, model, error = await _create_speech(
        clean, body.voice, body.accent, body.speed, body.locale
    )
    if b64:
        return TtsResponse(audio_base64=b64, model=model, fallback=False)

    return TtsResponse(fallback=True, detail=error or "TTS kullanılamıyor.")
