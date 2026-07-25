from typing import Literal

from pydantic import BaseModel, Field


class AnalysisFormData(BaseModel):
    product_name: str = Field(..., alias="productName", min_length=1)
    product_description: str = Field(..., alias="productDescription", min_length=1)
    target_audience: str = Field(default="", alias="targetAudience")
    core_features: str = Field(default="", alias="coreFeatures")
    differentiator: str = Field(default="", alias="differentiator")
    selected_personas: list[str] = Field(..., alias="selectedPersonas", min_length=1)
    product_id: str | None = Field(default=None, alias="productId")
    locale: Literal["tr", "en"] = "tr"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class DropOffStep(BaseModel):
    step: str
    moment: str
    friction: Literal["low", "med", "high"] = "med"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class PersonaAnalysis(BaseModel):
    name: str
    first_impression: str = Field(..., alias="firstImpression")
    understood: str
    confusion: str
    likelihood: Literal["Yüksek", "Orta", "Düşük", "High", "Medium", "Low"]
    drop_off_reason: str = Field(..., alias="dropOffReason")
    suggestion: str
    citations: list[str] = Field(default_factory=list)
    drop_off_timeline: list[DropOffStep] = Field(default_factory=list, alias="dropOffTimeline")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


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

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class RagSource(BaseModel):
    citation: str
    source_type: str = Field(..., alias="sourceType")
    excerpt: str
    scope: str | None = None
    title: str | None = None
    category: str | None = None
    score: float | None = None

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class AnalyzeResponse(BaseModel):
    success: bool
    data: AnalysisResult | None = None
    source: Literal["openai", "mock"]
    error: str | None = None
    analysis_id: str | None = Field(default=None, alias="analysisId")
    rag_sources: list[RagSource] = Field(default_factory=list, alias="ragSources")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1)
    description: str = ""
    workspace_id: str | None = Field(default=None, alias="workspaceId")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class ProductOut(BaseModel):
    id: str
    name: str
    description: str
    created_at: str | None = Field(default=None, alias="createdAt")
    workspace_id: str | None = Field(default=None, alias="workspaceId")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class ProductLinkRequest(BaseModel):
    product_id: str = Field(..., alias="productId")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class DocumentOut(BaseModel):
    id: str
    title: str
    product_id: str = Field(..., alias="productId")
    created_at: str | None = Field(default=None, alias="createdAt")
    byte_size: int | None = Field(default=None, alias="byteSize")
    source_kind: str = Field(default="upload", alias="sourceKind")
    source_url: str | None = Field(default=None, alias="sourceUrl")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class WebIngestRequest(BaseModel):
    product_id: str = Field(..., alias="productId")
    url: str = Field(..., min_length=8)

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class AnalysisSummary(BaseModel):
    id: str
    product_name: str = Field(..., alias="productName")
    overall_score: int | None = Field(default=None, alias="overallScore")
    source: str
    created_at: str | None = Field(default=None, alias="createdAt")
    product_id: str | None = Field(default=None, alias="productId")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class AnalysisDetail(BaseModel):
    id: str
    form_data: dict = Field(..., alias="formData")
    result: dict
    source: str
    rag_sources: list = Field(default_factory=list, alias="ragSources")
    created_at: str | None = Field(default=None, alias="createdAt")
    product_id: str | None = Field(default=None, alias="productId")
    share_role: str | None = Field(default=None, alias="shareRole")
    read_only: bool = Field(default=False, alias="readOnly")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class CompareRequest(BaseModel):
    before_id: str = Field(..., alias="beforeId")
    after_id: str = Field(..., alias="afterId")
    locale: Literal["tr", "en"] = "tr"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class ScoreDelta(BaseModel):
    key: str
    label: str
    before: int
    after: int
    delta: int


class CompareResponse(BaseModel):
    before_id: str = Field(..., alias="beforeId")
    after_id: str = Field(..., alias="afterId")
    before_label: str = Field(..., alias="beforeLabel")
    after_label: str = Field(..., alias="afterLabel")
    score_deltas: list[ScoreDelta] = Field(..., alias="scoreDeltas")
    improved: list[str]
    regressed: list[str]
    unchanged_risks: list[str] = Field(..., alias="unchangedRisks")
    narrative: str
    recommendation: str

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class FollowupTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1)


class FollowupRequest(BaseModel):
    analysis_id: str | None = Field(default=None, alias="analysisId")
    product_id: str | None = Field(default=None, alias="productId")
    persona_name: str = Field(..., alias="personaName", min_length=1)
    question: str = Field(..., min_length=3)
    product_name: str = Field(default="", alias="productName")
    product_description: str = Field(default="", alias="productDescription")
    prior_persona: dict | None = Field(default=None, alias="priorPersona")
    history: list[FollowupTurn] = Field(default_factory=list)
    locale: Literal["tr", "en"] = "tr"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class FollowupResponse(BaseModel):
    answer: str
    persona_name: str = Field(..., alias="personaName")
    citations: list[str] = Field(default_factory=list)
    source: Literal["openai", "mock"] = "openai"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class CustomPersonaCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    traits: str = Field(default="", max_length=800)


class CustomPersonaOut(BaseModel):
    id: str
    name: str
    traits: str
    created_at: str | None = Field(default=None, alias="createdAt")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class WorkspaceCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)


class WorkspaceOut(BaseModel):
    id: str
    name: str
    owner_id: str = Field(..., alias="ownerId")
    created_at: str | None = Field(default=None, alias="createdAt")
    role: str = "owner"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class InviteMemberRequest(BaseModel):
    email: str = Field(..., min_length=5)
    role: Literal["editor", "viewer"] = "viewer"


class MemberOut(BaseModel):
    id: str
    email: str
    role: str
    status: str
    user_id: str | None = Field(default=None, alias="userId")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class PendingInviteOut(BaseModel):
    id: str
    workspace_id: str = Field(..., alias="workspaceId")
    workspace_name: str = Field(..., alias="workspaceName")
    role: str
    email: str
    status: str = "pending"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class ShareCreateRequest(BaseModel):
    analysis_id: str = Field(..., alias="analysisId")
    role: Literal["viewer", "editor"] = "viewer"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class ShareOut(BaseModel):
    token: str
    role: str
    analysis_id: str = Field(..., alias="analysisId")
    url_path: str = Field(..., alias="urlPath")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class AbAnalyzeRequest(BaseModel):
    product_name: str = Field(..., alias="productName", min_length=1)
    target_audience: str = Field(default="", alias="targetAudience")
    core_features: str = Field(default="", alias="coreFeatures")
    differentiator: str = Field(default="", alias="differentiator")
    selected_personas: list[str] = Field(..., alias="selectedPersonas", min_length=1)
    product_id: str | None = Field(default=None, alias="productId")
    pitch_a: str = Field(..., alias="pitchA", min_length=10)
    pitch_b: str = Field(..., alias="pitchB", min_length=10)
    label_a: str = Field(default="Pitch A", alias="labelA")
    label_b: str = Field(default="Pitch B", alias="labelB")
    locale: Literal["tr", "en"] = "tr"

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class AbAnalyzeResponse(BaseModel):
    result_a: AnalysisResult = Field(..., alias="resultA")
    result_b: AnalysisResult = Field(..., alias="resultB")
    label_a: str = Field(..., alias="labelA")
    label_b: str = Field(..., alias="labelB")
    winner: Literal["A", "B", "tie"]
    source: Literal["openai", "mock"]
    analysis_id_a: str | None = Field(default=None, alias="analysisIdA")
    analysis_id_b: str | None = Field(default=None, alias="analysisIdB")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class NotificationOut(BaseModel):
    id: str
    kind: str
    title: str
    body: str
    href: str | None = None
    read: bool = False
    created_at: str | None = Field(default=None, alias="createdAt")

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}


class PublicStatsOut(BaseModel):
    tests_this_week: int = Field(..., alias="testsThisWeek")
    avg_score_this_week: float = Field(..., alias="avgScoreThisWeek")
    products_tested: int = Field(..., alias="productsTested")
    headline: str

    model_config = {"populate_by_name": True, "ser_json_by_alias": True}
