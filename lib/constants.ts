export const PERSONA_OPTIONS = [
  {
    id: "non-technical",
    label: "Teknik bilmeyen kullanıcı",
    description: "Teknolojiyle arası iyi değil, basit ve net anlatım bekler.",
  },
  {
    id: "student",
    label: "Üniversite öğrencisi",
    description: "Bütçe sınırlı, hızlı değer ve sosyal kanıt arar.",
  },
  {
    id: "busy-professional",
    label: "Yoğun çalışan profesyonel",
    description: "Zamanı kısıtlı, hızlı sonuç ve minimum sürtünme ister.",
  },
  {
    id: "price-sensitive",
    label: "Fiyat hassasiyeti olan kullanıcı",
    description: "Ücretsiz deneme ve net fiyatlandırma bekler.",
  },
  {
    id: "skeptical",
    label: "Şüpheci kullanıcı",
    description: "Abartılı vaatlere karşı temkinli, kanıt ister.",
  },
  {
    id: "first-timer",
    label: "İlk kez deneyen kullanıcı",
    description: "Kategori yeni, rehberlik ve güven sinyalleri arar.",
  },
] as const;

export const DEFAULT_PERSONA_IDS = PERSONA_OPTIONS.slice(0, 4).map((p) => p.id);

export const STORAGE_KEYS = {
  formData: "firstclick-form-data",
  analysisResult: "firstclick-analysis-result",
} as const;
