from fastapi import APIRouter, HTTPException

from app.constants import VALID_PERSONA_IDS
from app.schemas.analysis import AnalysisFormData, AnalyzeResponse
from app.services.analyze import run_analysis

router = APIRouter(prefix="/analyze", tags=["analyze"])


@router.post("", response_model=AnalyzeResponse)
async def analyze_product(form: AnalysisFormData) -> AnalyzeResponse:
    invalid = [p for p in form.selected_personas if p not in VALID_PERSONA_IDS]
    if invalid:
        raise HTTPException(status_code=400, detail="Geçersiz persona seçimi.")

    result, source = await run_analysis(form)
    return AnalyzeResponse(success=True, data=result, source=source)
