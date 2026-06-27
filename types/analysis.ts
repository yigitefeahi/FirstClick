export interface AnalysisFormData {
  productName: string;
  productDescription: string;
  targetAudience: string;
  coreFeatures: string;
  differentiator: string;
  selectedPersonas: string[];
}

export interface PersonaAnalysis {
  name: string;
  firstImpression: string;
  understood: string;
  confusion: string;
  likelihood: "Yüksek" | "Orta" | "Düşük";
  dropOffReason: string;
  suggestion: string;
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

export interface AnalyzeApiResponse {
  success: boolean;
  data?: AnalysisResult;
  source: "openai" | "mock";
  error?: string;
}
