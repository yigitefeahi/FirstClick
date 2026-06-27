import type { AnalysisFormData, AnalysisResult } from "@/types/analysis";

const ANALYSIS_SCHEMA = `{
  "overallScore": number (0-100),
  "clarityScore": number (0-100),
  "adoptionScore": number (0-100),
  "onboardingRiskScore": number (0-100, higher = more risk),
  "targetFitScore": number (0-100),
  "personas": [{
    "name": string,
    "firstImpression": string,
    "understood": string,
    "confusion": string,
    "likelihood": "Yüksek" | "Orta" | "Düşük",
    "dropOffReason": string,
    "suggestion": string
  }],
  "blindSpots": string[] (exactly 5 items),
  "dropOffPoints": string[],
  "actionPlan": string[],
  "improvedPitch": string,
  "toughQuestions": string[] (exactly 5 items)
}`;

function buildPrompt(form: AnalysisFormData): string {
  return `Sen FirstClick adlı bir ürün simülasyon platformunun analiz motorusun.
Aşağıdaki ürün fikrini, seçilen kullanıcı profilleri (persona) gözünden değerlendir.
Tüm metinler Türkçe olsun. Gerçekçi, aksiyon odaklı ve spesifik ol.

Ürün adı: ${form.productName}
Ürün açıklaması: ${form.productDescription}
Hedef kitle: ${form.targetAudience}
Temel özellikler: ${form.coreFeatures}
Rakiplerden farkı: ${form.differentiator}
Test edilen persona profilleri: ${form.selectedPersonas.join(", ")}

Yanıtı SADECE geçerli JSON olarak döndür. Şema:
${ANALYSIS_SCHEMA}`;
}

function parseAnalysisResult(raw: string): AnalysisResult | null {
  try {
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as AnalysisResult;

    const requiredKeys: (keyof AnalysisResult)[] = [
      "overallScore",
      "clarityScore",
      "adoptionScore",
      "onboardingRiskScore",
      "targetFitScore",
      "personas",
      "blindSpots",
      "dropOffPoints",
      "actionPlan",
      "improvedPitch",
      "toughQuestions",
    ];

    for (const key of requiredKeys) {
      if (parsed[key] === undefined || parsed[key] === null) {
        return null;
      }
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function analyzeWithOpenAI(form: AnalysisFormData): Promise<AnalysisResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Sen ürün stratejisi ve UX analizi uzmanısın. Kullanıcı persona simülasyonları yaparsın. Yanıtlarını her zaman geçerli JSON formatında ver.",
        },
        { role: "user", content: buildPrompt(form) },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI API error:", response.status, await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  return parseAnalysisResult(content);
}
