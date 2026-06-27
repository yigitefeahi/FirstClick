import { PERSONA_OPTIONS } from "./constants";
import type { AnalysisFormData, AnalysisResult, PersonaAnalysis } from "@/types/analysis";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function scoreFromInput(input: string, min: number, max: number, offset = 0): number {
  const hash = hashString(input + offset);
  return min + (hash % (max - min + 1));
}

function truncate(text: string, max = 80): string {
  const cleaned = text.trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max)}…`;
}

function getLikelihood(score: number): PersonaAnalysis["likelihood"] {
  if (score >= 70) return "Yüksek";
  if (score >= 45) return "Orta";
  return "Düşük";
}

const PERSONA_TEMPLATES: Record<
  string,
  Omit<PersonaAnalysis, "name" | "likelihood"> & { likelihoodBias: number }
> = {
  "non-technical": {
    likelihoodBias: -8,
    firstImpression: "Bu ürün ne işe yarıyor anlamak biraz zaman aldı.",
    understood: "Temel faydayı kavradım ama teknik terimler kafamı karıştırdı.",
    confusion: "İlk ekranda çok fazla seçenek var; nereden başlayacağımı bilemedim.",
    dropOffReason: "Kurulum adımları karmaşık gelirse hemen bırakırım.",
    suggestion: "İlk 30 saniyede tek cümlelik değer önerisi ve görsel rehber ekleyin.",
  },
  student: {
    likelihoodBias: 5,
    firstImpression: "Fikir ilginç; ücretsiz plan veya öğrenci indirimi var mı diye bakarım.",
    understood: "Ana problemi çözdüğünü anladım, özellikle hızlı sonuç vaadi dikkat çekici.",
    confusion: "Premium özelliklerin sınırı net değil; sonradan ücret çıkar mı emin değilim.",
    dropOffReason: "Kredi kartı istenirse veya fiyat yüksekse alternatif ararım.",
    suggestion: "Öğrenci paketi, referans programı ve sosyal kanıt (kullanıcı sayısı) ekleyin.",
  },
  "busy-professional": {
    likelihoodBias: 3,
    firstImpression: "Zaman kazandırıyorsa denemeye değer; hemen değer görmek isterim.",
    understood: "Temel iş akışını ve entegrasyon potansiyelini kavradım.",
    confusion: "Onboarding kaç adım sürecek ve günlük rutinime nasıl oturacak belirsiz.",
    dropOffReason: "İlk hafta somut sonuç alamazsam abonelik iptal ederim.",
    suggestion: "5 dakikalık hızlı kurulum ve 'ilk gün checklist'i sunun.",
  },
  "price-sensitive": {
    likelihoodBias: -5,
    firstImpression: "Fiyat-performans oranını hemen hesaplamaya çalışırım.",
    understood: "Rakiplere göre farkını kısmen anladım ama net fiyat göremedim.",
    confusion: "Gizli maliyet, ek modül veya kullanım limiti olup olmadığı belirsiz.",
    dropOffReason: "Şeffaf fiyatlandırma yoksa veya sürpriz ücret çıkarsa vazgeçerim.",
    suggestion: "Karşılaştırma tablosu, ücretsiz katman limitleri ve ROI hesaplayıcı ekleyin.",
  },
  skeptical: {
    likelihoodBias: -12,
    firstImpression: "Vaatler güzel ama kanıt görene kadar temkinliyim.",
    understood: "Ne yaptığınızı anladım fakat gerçekten çalıştığına dair güçlü kanıt göremedim.",
    confusion: "Başarı hikayeleri ve bağımsız değerlendirmeler eksik.",
    dropOffReason: "Abartılı pazarlama dili veya belirsiz garanti politikası güvenimi kırar.",
    suggestion: "Case study, demo video ve para iade garantisi gibi güven sinyalleri ekleyin.",
  },
  "first-timer": {
    likelihoodBias: -3,
    firstImpression: "Bu kategoride ilk kez bir ürün deniyorum; rehberlik arıyorum.",
    understood: "Genel amacı anladım ama benzer ürünlerle farkını tam oturtamadım.",
    confusion: "Terimler ve kategori jargonu yeni kullanıcı için ağır.",
    dropOffReason: "Yalnız bırakılırsam veya hata alırsam motivasyonum düşer.",
    suggestion: "İnteraktif tur, sözlük ve 'yeni başlayanlar için' onboarding akışı ekleyin.",
  },
};

export function generateMockAnalysis(form: AnalysisFormData): AnalysisResult {
  const { productName, productDescription, targetAudience, coreFeatures, differentiator, selectedPersonas } =
    form;

  const seed = hashString(productName + productDescription);
  const descLen = productDescription.trim().length;
  const featureCount = coreFeatures.split(/[,;\n]/).filter(Boolean).length;
  const hasDifferentiator = differentiator.trim().length > 20;

  const clarityBase = scoreFromInput(productDescription, 55, 88, 1);
  const clarityPenalty = descLen < 50 ? 12 : descLen > 300 ? 5 : 0;
  const clarityScore = Math.min(95, Math.max(35, clarityBase - clarityPenalty));

  const adoptionBase = scoreFromInput(coreFeatures, 50, 85, 2);
  const adoptionBonus = featureCount >= 3 ? 8 : -5;
  const adoptionScore = Math.min(92, Math.max(30, adoptionBase + adoptionBonus));

  const onboardingRiskBase = scoreFromInput(targetAudience, 25, 75, 3);
  const onboardingRiskScore = Math.min(
    90,
    Math.max(15, onboardingRiskBase + (featureCount > 5 ? 10 : 0))
  );

  const targetFitBase = scoreFromInput(targetAudience + differentiator, 45, 90, 4);
  const targetFitScore = Math.min(
    95,
    Math.max(35, targetFitBase + (hasDifferentiator ? 10 : -8))
  );

  const overallScore = Math.round(
    (clarityScore + adoptionScore + (100 - onboardingRiskScore) + targetFitScore) / 4
  );

  const personas: PersonaAnalysis[] = selectedPersonas.map((personaId) => {
    const option = PERSONA_OPTIONS.find((p) => p.id === personaId);
    const template = PERSONA_TEMPLATES[personaId] ?? PERSONA_TEMPLATES["first-timer"];
    const personaScore =
      overallScore +
      template.likelihoodBias +
      (seed % 10) -
      5 +
      scoreFromInput(personaId + productName, -5, 5, 6);

    return {
      name: option?.label ?? personaId,
      firstImpression: `"${productName}" için ilk bakışta: ${template.firstImpression}`,
      understood: `${truncate(productDescription, 60)} bağlamında ${template.understood}`,
      confusion: template.confusion,
      likelihood: getLikelihood(personaScore),
      dropOffReason: template.dropOffReason,
      suggestion: template.suggestion,
    };
  });

  const blindSpots = [
    `"${productName}" değer önerisi ilk 10 saniyede net iletilmiyor; kullanıcı ne kazandığını hemen göremiyor.`,
    `Hedef kitle (${truncate(targetAudience, 40)}) ile ürün anlatımı arasında ton uyumsuzluğu riski var.`,
    `Temel özellikler (${truncate(coreFeatures, 50)}) listelenmiş ama öncelik sırası belirsiz.`,
    hasDifferentiator
      ? `"${truncate(differentiator, 50)}" farkı var ama kanıtlanmış örneklerle desteklenmiyor.`
      : "Rakiplerden fark net tanımlanmamış; kullanıcı 'neden bu?' sorusuna yanıt bulamıyor.",
    "İlk kullanım anında başarı hissi (quick win) tasarımı zayıf görünüyor.",
  ];

  const dropOffPoints = [
    "Kayıt / giriş ekranında fazla alan istenmesi",
    "Ürün açıklamasındaki jargon nedeniyle değerin geç anlaşılması",
    "Fiyatlandırma veya plan seçimi net olmadığında karar erteleme",
    "İlk adımda boş ekran veya rehbersiz dashboard",
    "Güven sinyali (referans, güvenlik, destek) eksikliği",
  ];

  const actionPlan = [
    `Landing'de "${productName}" için tek cümlelik değer önerisi ve 30 saniyelik demo ekleyin.`,
    "İlk oturumda tamamlanabilir bir 'ilk başarı' görevi tanımlayın (quick win).",
    "Hedef kitle diline uygun, jargonsuz onboarding metinleri yazın.",
    hasDifferentiator
      ? "Rakip karşılaştırma tablosu ile farkınızı görselleştirin."
      : "Rakiplerden farkınızı netleştirin ve kanıtlayın (metrik, testimonial).",
    "Fiyatlandırma sayfasında şeffaf plan karşılaştırması ve SSS bölümü ekleyin.",
  ];

  const improvedPitch = `"${productName}", ${truncate(targetAudience, 60)} için tasarlandı. ${truncate(productDescription, 120)} Temel özellikler: ${truncate(coreFeatures, 100)}. ${hasDifferentiator ? `Rakiplerden farkımız: ${truncate(differentiator, 80)}.` : "Rakiplerden farkımızı netleştirmek bir sonraki adımımız."} İlk kullanımda 5 dakikada somut sonuç almanızı hedefliyoruz.`;

  const toughQuestions = [
    `"${productName}" mevcut çözümlere göre kullanıcıya gerçekten ne kazandırıyor?`,
    "İlk hafta kullanıcı tutma (retention) stratejiniz nedir?",
    "En zayıf persona profiliniz kim ve onları nasıl kazanacaksınız?",
    "Ücretsiz kullanıcıyı ücretli plana dönüştürme huniniz nasıl çalışıyor?",
    "Ürün büyüdükçe onboarding karmaşıklığını nasıl kontrol altında tutacaksınız?",
  ];

  return {
    overallScore,
    clarityScore,
    adoptionScore,
    onboardingRiskScore,
    targetFitScore,
    personas,
    blindSpots,
    dropOffPoints,
    actionPlan,
    improvedPitch,
    toughQuestions,
  };
}
