import { generateMockAnalysis } from "./mock-analyzer";
import { analyzeWithOpenAI } from "./openai-analyzer";
import type { AnalysisFormData, AnalysisResult } from "@/types/analysis";

export type AnalysisSource = "openai" | "mock";

export interface AnalyzeOutput {
  result: AnalysisResult;
  source: AnalysisSource;
}

export async function runAnalysis(form: AnalysisFormData): Promise<AnalyzeOutput> {
  if (process.env.OPENAI_API_KEY) {
    try {
      const aiResult = await analyzeWithOpenAI(form);
      if (aiResult) {
        return { result: aiResult, source: "openai" };
      }
    } catch (error) {
      console.error("OpenAI analysis failed, falling back to mock:", error);
    }
  }

  return {
    result: generateMockAnalysis(form),
    source: "mock",
  };
}
