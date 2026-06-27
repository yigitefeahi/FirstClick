from typing import Literal

from pydantic import BaseModel, Field


class AnalysisFormData(BaseModel):
    product_name: str = Field(..., alias="productName", min_length=1)
    product_description: str = Field(..., alias="productDescription", min_length=1)
    target_audience: str = Field(default="", alias="targetAudience")
    core_features: str = Field(default="", alias="coreFeatures")
    differentiator: str = Field(default="", alias="differentiator")
    selected_personas: list[str] = Field(..., alias="selectedPersonas", min_length=1)

    model_config = {"populate_by_name": True}


class PersonaAnalysis(BaseModel):
    name: str
    first_impression: str = Field(..., alias="firstImpression")
    understood: str
    confusion: str
    likelihood: Literal["Yüksek", "Orta", "Düşük"]
    drop_off_reason: str = Field(..., alias="dropOffReason")
    suggestion: str

    model_config = {"populate_by_name": True}


class AnalysisResult(BaseModel):
    overall_score: int = Field(..., alias="overallScore", ge=0, le=100)
    clarity_score: int = Field(..., alias="clarityScore", ge=0, le=100)
    adoption_score: int = Field(..., alias="adoptionScore", ge=0, le=100)
    onboarding_risk_score: int = Field(..., alias="onboardingRiskScore", ge=0, le=100)
    target_fit_score: int = Field(..., alias="targetFitScore", ge=0, le=100)
    personas: list[PersonaAnalysis]
    blind_spots: list[str] = Field(..., alias="blindSpots")
    drop_off_points: list[str] = Field(..., alias="dropOffPoints")
    action_plan: list[str] = Field(..., alias="actionPlan")
    improved_pitch: str = Field(..., alias="improvedPitch")
    tough_questions: list[str] = Field(..., alias="toughQuestions")

    model_config = {"populate_by_name": True}


class AnalyzeResponse(BaseModel):
    success: bool
    data: AnalysisResult | None = None
    source: Literal["openai", "mock"]
    error: str | None = None
