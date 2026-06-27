import { NextRequest, NextResponse } from "next/server";
import { runAnalysis } from "@/lib/analyze";
import { PERSONA_OPTIONS } from "@/lib/constants";
import type { AnalysisFormData } from "@/types/analysis";

function validateForm(body: unknown): { valid: true; data: AnalysisFormData } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Geçersiz istek gövdesi." };
  }

  const data = body as Record<string, unknown>;

  const productName = typeof data.productName === "string" ? data.productName.trim() : "";
  const productDescription =
    typeof data.productDescription === "string" ? data.productDescription.trim() : "";

  if (!productName || !productDescription) {
    return { valid: false, error: "Ürün adı ve açıklaması zorunludur." };
  }

  const validPersonaIds = new Set<string>(PERSONA_OPTIONS.map((p) => p.id));
  const selectedPersonas = Array.isArray(data.selectedPersonas)
    ? data.selectedPersonas.filter(
        (p): p is string => typeof p === "string" && validPersonaIds.has(p)
      )
    : [];

  if (selectedPersonas.length === 0) {
    return { valid: false, error: "En az bir geçerli persona seçilmelidir." };
  }

  return {
    valid: true,
    data: {
      productName,
      productDescription,
      targetAudience: typeof data.targetAudience === "string" ? data.targetAudience.trim() : "",
      coreFeatures: typeof data.coreFeatures === "string" ? data.coreFeatures.trim() : "",
      differentiator: typeof data.differentiator === "string" ? data.differentiator.trim() : "",
      selectedPersonas,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateForm(body);

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    const { result, source } = await runAnalysis(validation.data);

    return NextResponse.json({
      success: true,
      data: result,
      source,
    });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { success: false, error: "Analiz sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
