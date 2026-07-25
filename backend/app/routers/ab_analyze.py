from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from app.auth import AuthUser, get_current_user
from app.constants import VALID_PERSONA_IDS
from app.schemas.analysis import AbAnalyzeRequest, AbAnalyzeResponse, AnalysisFormData
from app.services.analyze import chunks_to_rag_sources, persist_analysis, run_analysis

router = APIRouter(prefix="/analyze", tags=["analyze"])


@router.post("/ab", response_model=AbAnalyzeResponse)
async def analyze_ab(
    body: AbAnalyzeRequest,
    user: Annotated[AuthUser, Depends(get_current_user)],
) -> AbAnalyzeResponse:
    invalid = [
        p for p in body.selected_personas if p not in VALID_PERSONA_IDS and not p.startswith("custom:")
    ]
    if invalid:
        raise HTTPException(status_code=400, detail="Geçersiz persona seçimi.")

    locale = body.locale if body.locale in ("tr", "en") else "tr"
    form_a = AnalysisFormData(
        productName=body.product_name,
        productDescription=body.pitch_a,
        targetAudience=body.target_audience,
        coreFeatures=body.core_features,
        differentiator=body.differentiator,
        selectedPersonas=body.selected_personas,
        productId=body.product_id,
        locale=locale,
    )
    form_b = AnalysisFormData(
        productName=body.product_name,
        productDescription=body.pitch_b,
        targetAudience=body.target_audience,
        coreFeatures=body.core_features,
        differentiator=body.differentiator,
        selectedPersonas=body.selected_personas,
        productId=body.product_id,
        locale=locale,
    )

    result_a, source_a, rag_chunks_a = await run_analysis(form_a, user_id=user.id)
    result_b, source_b, rag_chunks_b = await run_analysis(form_b, user_id=user.id)
    source = "openai" if source_a == "openai" or source_b == "openai" else "mock"

    rag_sources_a = chunks_to_rag_sources(rag_chunks_a)
    rag_sources_b = chunks_to_rag_sources(rag_chunks_b)

    id_a = await persist_analysis(
        user_id=user.id,
        form=form_a,
        result=result_a,
        source=source_a,
        rag_sources=rag_sources_a,
    )
    id_b = await persist_analysis(
        user_id=user.id,
        form=form_b,
        result=result_b,
        source=source_b,
        rag_sources=rag_sources_b,
    )

    if result_a.overall_score > result_b.overall_score + 2:
        winner = "A"
    elif result_b.overall_score > result_a.overall_score + 2:
        winner = "B"
    else:
        winner = "tie"

    return AbAnalyzeResponse(
        result_a=result_a,
        result_b=result_b,
        label_a=body.label_a,
        label_b=body.label_b,
        winner=winner,
        source=source,
        analysis_id_a=id_a,
        analysis_id_b=id_b,
    )
