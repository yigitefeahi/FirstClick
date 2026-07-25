from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from app.auth import AuthUser, get_current_user
from app.schemas.analysis import (
    AnalysisDetail,
    AnalysisSummary,
    CompareRequest,
    CompareResponse,
)
from app.services.insights import compare_analyses
from app.services.supabase_client import get_supabase
from app.services.workspace_access import list_accessible_analyses, load_accessible_analysis

router = APIRouter(prefix="/analyses", tags=["analyses"])


@router.get("", response_model=list[AnalysisSummary])
async def list_analyses(user: Annotated[AuthUser, Depends(get_current_user)]) -> list[AnalysisSummary]:
    client = get_supabase()
    if client is None:
        raise HTTPException(status_code=503, detail="Supabase yapılandırılmamış.")

    rows = list_accessible_analyses(client, user.id)

    summaries: list[AnalysisSummary] = []
    for row in rows:
        form_data = row.get("form_data") or {}
        result = row.get("result") or {}
        summaries.append(
            AnalysisSummary(
                id=row["id"],
                product_name=form_data.get("productName") or "İsimsiz ürün",
                overall_score=result.get("overallScore"),
                source=row.get("source") or "mock",
                created_at=row.get("created_at"),
                product_id=row.get("product_id"),
            )
        )
    return summaries


@router.post("/compare", response_model=CompareResponse)
async def compare(
    body: CompareRequest,
    user: Annotated[AuthUser, Depends(get_current_user)],
) -> CompareResponse:
    if body.before_id == body.after_id:
        raise HTTPException(status_code=400, detail="İki farklı analiz seçin.")

    client = get_supabase()
    if client is None:
        raise HTTPException(status_code=503, detail="Supabase yapılandırılmamış.")

    before_row = load_accessible_analysis(client, user.id, body.before_id)
    if not before_row:
        raise HTTPException(status_code=404, detail=f"Analiz bulunamadı: {body.before_id}")
    after_row = load_accessible_analysis(client, user.id, body.after_id)
    if not after_row:
        raise HTTPException(status_code=404, detail=f"Analiz bulunamadı: {body.after_id}")

    return await compare_analyses(
        before_id=body.before_id,
        after_id=body.after_id,
        before_row=before_row,
        after_row=after_row,
        locale=body.locale if body.locale in ("tr", "en") else "tr",
    )


@router.get("/{analysis_id}", response_model=AnalysisDetail)
async def get_analysis(
    analysis_id: str,
    user: Annotated[AuthUser, Depends(get_current_user)],
) -> AnalysisDetail:
    client = get_supabase()
    if client is None:
        raise HTTPException(status_code=503, detail="Supabase yapılandırılmamış.")

    row = load_accessible_analysis(client, user.id, analysis_id)
    if not row:
        raise HTTPException(status_code=404, detail="Analiz bulunamadı.")

    return AnalysisDetail(
        id=row["id"],
        form_data=row.get("form_data") or {},
        result=row.get("result") or {},
        source=row.get("source") or "mock",
        rag_sources=row.get("rag_sources") or [],
        created_at=row.get("created_at"),
        product_id=row.get("product_id"),
    )


@router.delete("/{analysis_id}")
async def delete_analysis(
    analysis_id: str,
    user: Annotated[AuthUser, Depends(get_current_user)],
) -> dict[str, bool]:
    client = get_supabase()
    if client is None:
        raise HTTPException(status_code=503, detail="Supabase yapılandırılmamış.")

    response = (
        client.table("analyses")
        .delete()
        .eq("id", analysis_id)
        .eq("user_id", user.id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Analiz bulunamadı.")
    return {"ok": True}
