export interface AnalysisFormData {
  productName: string;
  productDescription: string;
  targetAudience: string;
  coreFeatures: string;
  differentiator: string;
  selectedPersonas: string[];
  productId?: string | null;
}

export interface PersonaAnalysis {
  name: string;
  firstImpression: string;
  understood: string;
  confusion: string;
  likelihood: "Yüksek" | "Orta" | "Düşük";
  dropOffReason: string;
  suggestion: string;
  citations?: string[];
  dropOffTimeline?: DropOffStep[];
}

export interface DropOffStep {
  step: string;
  moment: string;
  friction: "low" | "med" | "high";
}

export interface AnalysisResult {
  overallScore: number;
  clarityScore: number;
  adoptionScore: number;
  onboardingRiskScore: number;
  targetFitScore: number;
  personas: PersonaAnalysis[];
  blindSpots: string[];
  dropOffPoints: string[];
  actionPlan: string[];
  improvedPitch: string;
  toughQuestions: string[];
}

export interface RagSource {
  citation: string;
  sourceType: string;
  excerpt: string;
  scope?: "global" | "user" | string | null;
  title?: string | null;
  category?: string | null;
}

export interface AnalyzeApiResponse {
  success: boolean;
  data?: AnalysisResult;
  source: "openai" | "mock";
  error?: string;
  analysisId?: string | null;
  ragSources?: RagSource[];
}

export interface ScoreDelta {
  key: string;
  label: string;
  before: number;
  after: number;
  delta: number;
}

export interface CompareResult {
  beforeId: string;
  afterId: string;
  beforeLabel: string;
  afterLabel: string;
  scoreDeltas: ScoreDelta[];
  improved: string[];
  regressed: string[];
  unchangedRisks: string[];
  narrative: string;
  recommendation: string;
}

export interface FollowupResult {
  answer: string;
  personaName: string;
  citations: string[];
  source: "openai" | "mock";
}
