import type { AnalysisFormData, AnalysisResult, RagSource } from "@/types/analysis";

export const DEMO_FORM: AnalysisFormData = {
  productName: "TaskFlow",
  productDescription:
    "Küçük ekipler için görev ve sprint yönetimi. Tek ekranda backlog ve check-in.",
  targetAudience: "5–20 kişilik startup ekipleri",
  coreFeatures: "Kanban, tek tıkla sprint, Slack, 14 gün deneme",
  differentiator: "2 dakikada kurulum; Jira kadar ağır değil",
  selectedPersonas: [
    "non-technical",
    "student",
    "busy-professional",
    "price-sensitive",
    "skeptical",
    "first-timer",
  ],
};

export const DEMO_RAG_SOURCES: RagSource[] = [
  {
    citation: "kb:onboarding-activation",
    sourceType: "knowledge",
    scope: "global",
    title: "Onboarding ve aktivasyon",
    category: "foundation",
    excerpt:
      "İlk oturumda tek net sonuç, boş durumda örnek veri ve aktivasyon olayı tanımı adoption için kritik sinyallerdir.",
  },
  {
    citation: "kb:pricing-packaging",
    sourceType: "knowledge",
    scope: "global",
    title: "Fiyatlandırma ve paketleme",
    category: "growth-trust",
    excerpt:
      "Limitler, deneme süresi ve kart isteme anı fiyat hassas persona için drop-off tetikleyicisidir; net tablo güven artırır.",
  },
  {
    citation: "doc:guide:demo01",
    sourceType: "document",
    scope: "user",
    title: "Ürün kılavuzu",
    excerpt: "Tek tıkla kurulum — 2 dakikada sprint panosu.",
  },
];

export const DEMO_ANALYSIS: AnalysisResult = {
  overallScore: 58,
  clarityScore: 62,
  adoptionScore: 55,
  onboardingRiskScore: 64,
  targetFitScore: 70,
  personas: [
    {
      name: "Teknik bilmeyen kullanıcı",
      firstImpression:
        "Tek tıkla kurulum yazıyor [doc:guide:demo01] ama adımlar yok — orada kayboldum.",
      understood: "Görev panosu fikrini anladım.",
      confusion: "İlk ekranda çok seçenek; nereden başlayacağım belirsiz.",
      likelihood: "Orta",
      dropOffReason: "Kurulum videosu veya checklist yoksa bırakırım.",
      suggestion: "3 adımlık görsel onboarding ekleyin.",
      citations: ["[doc:guide:demo01]", "[kb:onboarding-activation]"],
      dropOffTimeline: [
        { step: "Landing", moment: "Hero’yu okudum", friction: "low" },
        { step: "CTA", moment: "‘Ücretsiz dene’ye tıkladım", friction: "med" },
        { step: "Kurulum", moment: "Adım listesi yok — takıldım", friction: "high" },
        { step: "Fiyat", moment: "Henüz bakmadım", friction: "low" },
      ],
    },
    {
      name: "Yoğun çalışan profesyonel",
      firstImpression: "Zaman kazandırıyorsa değer; 10 saniyede netleşmeli.",
      understood: "Sprint + Slack entegrasyonu mantıklı.",
      confusion: "İlk gün değeri net değil.",
      likelihood: "Orta",
      dropOffReason: "İlk hafta somut kazanım görmezsem iptal.",
      suggestion: "‘5 dakikalık kurulum’ checklist’i.",
      citations: ["[kb:onboarding-activation]"],
      dropOffTimeline: [
        { step: "Landing", moment: "Değer cümlesini taradım", friction: "med" },
        { step: "CTA", moment: "Hızlı kaydoldum", friction: "low" },
        { step: "Kurulum", moment: "Entegrasyon ayarı uzun", friction: "high" },
        { step: "Fiyat", moment: "Takım fiyatı belirsiz", friction: "med" },
      ],
    },
    {
      name: "Şüpheci kullanıcı",
      firstImpression: "Vaatler güzel; kanıt arıyorum.",
      understood: "Ne yaptığınızı anladım.",
      confusion: "Case study ve bağımsız kanıt yok.",
      likelihood: "Düşük",
      dropOffReason: "Abartılı dil güvenimi kırar.",
      suggestion: "Kısa case study + demo video.",
      citations: ["[kb:social-proof]"],
      dropOffTimeline: [
        { step: "Landing", moment: "Sloganı sorguladım", friction: "high" },
        { step: "CTA", moment: "Hemen tıklamadım", friction: "med" },
        { step: "Kurulum", moment: "Demo istiyorum", friction: "high" },
        { step: "Fiyat", moment: "Gizli maliyet endişesi", friction: "high" },
      ],
    },
    {
      name: "Fiyat hassasiyeti olan kullanıcı",
      firstImpression: "14 gün deneme iyi; limitler net mi?",
      understood: "Ücretsiz katman vaadi var.",
      confusion: "Premium sınırı belirsiz.",
      likelihood: "Orta",
      dropOffReason: "Kart isterse veya sürpriz ücret çıkarsa vazgeçerim.",
      suggestion: "Karşılaştırma tablosu + net limitler.",
      citations: ["[kb:pricing-packaging]"],
      dropOffTimeline: [
        { step: "Landing", moment: "Fiyat bölümünü aradım", friction: "med" },
        { step: "CTA", moment: "Denemeye açığım", friction: "low" },
        { step: "Kurulum", moment: "Kart sordular — durdum", friction: "high" },
        { step: "Fiyat", moment: "Takım başına maliyet belirsiz", friction: "high" },
      ],
    },
    {
      name: "Üniversite öğrencisi",
      firstImpression: "Ücretsiz katman ve hızlı kurulum arıyorum; bütçem kısıtlı.",
      understood: "Kanban + sprint fikrini kavradım.",
      confusion: "Öğrenci indirimi veya ucuz plan net değil.",
      likelihood: "Orta",
      dropOffReason: "Aylık ücret yüksek gelirse bırakırım.",
      suggestion: "Öğrenci planı veya net ücretsiz limit tablosu.",
      citations: ["[kb:pricing-packaging]"],
      dropOffTimeline: [
        { step: "Landing", moment: "Fiyatı kontrol ettim", friction: "med" },
        { step: "CTA", moment: "Denemeye tıkladım", friction: "low" },
        { step: "Kurulum", moment: "Hızlı kurulum iyi", friction: "low" },
        { step: "Fiyat", moment: "Öğrenci planı yok", friction: "high" },
      ],
    },
    {
      name: "İlk kez deneyen kullanıcı",
      firstImpression: "Bu kategori bana yeni — adım adım rehber lazım.",
      understood: "Görev yönetimi aracı olduğunu anladım.",
      confusion: "İlk ekranda ne yapacağım belirsiz.",
      likelihood: "Orta",
      dropOffReason: "Rehberlik olmazsa kaybolurum.",
      suggestion: "İlk oturum sihirbazı + örnek proje.",
      citations: ["[kb:onboarding-activation]"],
      dropOffTimeline: [
        { step: "Landing", moment: "Ne olduğunu okudum", friction: "low" },
        { step: "CTA", moment: "Denemeye başladım", friction: "med" },
        { step: "Kurulum", moment: "Boş ekran — ne yapacağım?", friction: "high" },
        { step: "Fiyat", moment: "Henüz bakmadım", friction: "low" },
      ],
    },
  ],
  blindSpots: [
    "Kurulum adımları vaatle uyuşmuyor",
    "İlk gün checklist yok",
    "Fiyat limitleri gizli",
    "Sosyal kanıt zayıf",
    "Şüpheci persona için kanıt eksik",
  ],
  dropOffPoints: ["Kurulum ekranı", "Kart isteme anı", "Fiyat sayfası belirsizliği"],
  actionPlan: [
    "3 adımlık görsel onboarding ekleyin",
    "Kart istemeden 14 gün deneme",
    "Landing’de 1 case study + skor",
    "Fiyat tablosunu hero altına taşıyın",
    "Slack kurulumunu 1 tık yapın",
  ],
  improvedPitch:
    "TaskFlow: 2 dakikada sprint panosu. Kart istemeden deneyin — küçük ekipler için hafif Jira alternatifi.",
  toughQuestions: [
    "Kart olmadan gerçekten denenebilir mi?",
    "5 kişilik ekip için aylık maliyet net mi?",
    "Jira’dan migrasyon ne kadar sürer?",
    "Veri nerede tutuluyor?",
    "İlk hafta ROI nasıl ölçülür?",
  ],
};

export function getLocalDemoPayload() {
  return {
    success: true,
    source: "demo",
    formData: DEMO_FORM,
    data: DEMO_ANALYSIS,
    ragSources: DEMO_RAG_SOURCES,
    analysisId: "demo-public",
  };
}
