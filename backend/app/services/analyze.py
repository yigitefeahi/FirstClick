from typing import Literal

from app.schemas.analysis import AnalysisFormData, AnalysisResult
from app.services.mock_analyzer import generate_mock_analysis
from app.services.openai_analyzer import analyze_with_openai


async def run_analysis(form: AnalysisFormData) -> tuple[AnalysisResult, Literal["openai", "mock"]]:
    if settings_openai_available():
        ai_result = await analyze_with_openai(form)
        if ai_result:
            return ai_result, "openai"

    return generate_mock_analysis(form), "mock"


def settings_openai_available() -> bool:
    from app.config import settings

    return bool(settings.openai_api_key)
