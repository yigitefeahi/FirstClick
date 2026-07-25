import { PERSONA_OPTIONS } from "@/lib/constants";
import {
  localizedPersonaDisplayName,
  resolvePersonaIdFromDisplayName,
} from "@/lib/i18n/persona-labels";
import type { Locale } from "@/lib/i18n/dictionaries";
import { stripCitationTags } from "@/lib/presence/safe-text";
import type { AnalysisResult, PersonaAnalysis } from "@/types/analysis";

export type PersonaId =
  | "non-technical"
  | "student"
  | "busy-professional"
  | "price-sensitive"
  | "skeptical"
  | "first-timer";

/** OpenAI gpt-4o-mini-tts voices — gender-matched per persona. */
export type TtsVoice =
  | "coral"
  | "shimmer"
  | "cedar"
  | "sage"
  | "ash"
  | "marin"
  | "onyx"
  | "nova"
  | "echo"
  | "alloy"
  | "fable";

export type PersonaAvatarConfig = {
  id: PersonaId;
  label: string;
  glbUrl: string;
  /** Talk-room backdrop image behind the 3D avatar. */
  backgroundUrl: string;
  body: "F" | "M";
  mood: "neutral" | "happy" | "sad" | "angry";
  ttsVoice: TtsVoice;
  /** Style instructions for gpt-4o-mini-tts (locale-resolved delivery). */
  accent: string;
  /** Speech rate 0.8–1.4; slightly above 1 avoids slow “Siri” feel. */
  ttsSpeed: number;
  tagline: string;
};

type PersonaAvatarBase = Omit<PersonaAvatarConfig, "accent"> & {
  accentTr: string;
  accentEn: string;
};

/** Free TalkingHead-compatible GLBs (met4citizen/TalkingHead, MIT). */
const PERSONA_AVATAR_BASE: Record<PersonaId, PersonaAvatarBase> = {
  "non-technical": {
    id: "non-technical",
    label: "Teknik bilmeyen kullanıcı",
    glbUrl: "/avatars/non-technical.glb",
    backgroundUrl: "/avatars/backgrounds/non-technical.jpg",
    body: "F",
    mood: "happy",
    ttsVoice: "coral",
    ttsSpeed: 1.12,
    accentTr:
      "Kadın sesi. Sıcak, samimi, günlük konuşma temposunda Türkiye Türkçesi. " +
      "Robotik veya aşırı yavaş okuma yok; doğal sohbet gibi konuş.",
    accentEn:
      "Female voice. Warm, friendly, everyday conversational English. " +
      "No robotic or overly slow reading; speak like a natural chat.",
    tagline: "Basit anlatım ve net fayda arıyorum.",
  },
  student: {
    id: "student",
    label: "Üniversite öğrencisi",
    glbUrl: "/avatars/student.glb",
    backgroundUrl: "/avatars/backgrounds/student.jpg",
    body: "F",
    mood: "happy",
    ttsVoice: "shimmer",
    ttsSpeed: 1.18,
    accentTr:
      "Genç kadın sesi. Enerjik, meraklı, biraz hızlı ama anlaşılır İstanbul Türkçesi. " +
      "Arkadaşça ve canlı konuş; resmi spiker tonu kullanma.",
    accentEn:
      "Young female voice. Energetic, curious, slightly fast but clear conversational English. " +
      "Friendly and lively; avoid a formal announcer tone.",
    tagline: "Bütçe dostu ve hızlı değer arıyorum.",
  },
  "busy-professional": {
    id: "busy-professional",
    label: "Yoğun çalışan profesyonel",
    glbUrl: "/avatars/busy-professional.glb",
    backgroundUrl: "/avatars/backgrounds/busy-professional.jpg",
    body: "F",
    mood: "neutral",
    ttsVoice: "marin",
    ttsSpeed: 1.2,
    accentTr:
      "Kadın sesi. Net, kısa, iş odaklı Türkiye Türkçesi. " +
      "Tempo dinamik; gereksiz uzatma yok, kararlı ve profesyonel konuş.",
    accentEn:
      "Female voice. Clear, concise, work-focused English. " +
      "Brisk pace; no unnecessary padding — decisive and professional.",
    tagline: "Zamanım kısıtlı — hemen sonuç istiyorum.",
  },
  "price-sensitive": {
    id: "price-sensitive",
    label: "Fiyat hassasiyeti olan kullanıcı",
    glbUrl: "/avatars/price-sensitive.glb",
    backgroundUrl: "/avatars/backgrounds/price-sensitive.jpg",
    body: "F",
    mood: "neutral",
    ttsVoice: "sage",
    ttsSpeed: 1.14,
    accentTr:
      "Kadın sesi. Pratik, net, karşılaştırmacı bir ton. " +
      "Günlük Türkiye Türkçesi; sakin ama sıkıcı veya yavaş değil.",
    accentEn:
      "Female voice. Practical, clear, comparison-minded tone. " +
      "Everyday English; calm but not dull or slow.",
    tagline: "Fiyat ve limitler net olmalı.",
  },
  skeptical: {
    id: "skeptical",
    label: "Şüpheci kullanıcı",
    glbUrl: "/avatars/skeptical.glb",
    backgroundUrl: "/avatars/backgrounds/skeptical.jpg",
    body: "M",
    mood: "neutral",
    ttsVoice: "ash",
    ttsSpeed: 1.1,
    accentTr:
      "Erkek sesi. Temkinli, düşünceli ama doğal konuşma hızında. " +
      "Türkiye Türkçesi; şüpheci ama robotik veya monoton olma.",
    accentEn:
      "Male voice. Cautious, thoughtful, at a natural speaking pace. " +
      "Skeptical English delivery — not robotic or monotone.",
    tagline: "Vaat değil kanıt görmek istiyorum.",
  },
  "first-timer": {
    id: "first-timer",
    label: "İlk kez deneyen kullanıcı",
    glbUrl: "/avatars/first-timer.glb",
    backgroundUrl: "/avatars/backgrounds/first-timer.jpg",
    body: "M",
    mood: "happy",
    ttsVoice: "cedar",
    ttsSpeed: 1.12,
    accentTr:
      "Erkek sesi. Destekleyici, rehber gibi, yumuşak ama canlı. " +
      "Türkiye Türkçesi; adım adım anlatırken doğal ve anlaşılır konuş.",
    accentEn:
      "Male voice. Supportive, guide-like, soft but lively. " +
      "Natural clear English while explaining step by step.",
    tagline: "Yeni başlıyorum — adım adım anlatın.",
  },
};

/** Resolved configs with Turkish accent by default (legacy consumers). */
export const PERSONA_AVATARS: Record<PersonaId, PersonaAvatarConfig> = Object.fromEntries(
  (Object.keys(PERSONA_AVATAR_BASE) as PersonaId[]).map((id) => {
    const base = PERSONA_AVATAR_BASE[id];
    const { accentTr, accentEn: _accentEn, ...rest } = base;
    return [id, { ...rest, accent: accentTr }];
  })
) as Record<PersonaId, PersonaAvatarConfig>;

export function resolvePersonaAccent(id: PersonaId, locale: Locale = "tr"): string {
  const base = PERSONA_AVATAR_BASE[id];
  return locale === "en" ? base.accentEn : base.accentTr;
}

export function isPersonaId(value: string): value is PersonaId {
  return value in PERSONA_AVATAR_BASE;
}

export function resolvePersonaIdFromName(name: string): PersonaId | null {
  const id = resolvePersonaIdFromDisplayName(name);
  if (id && isPersonaId(id)) return id;
  return isPersonaId(name) ? name : null;
}

export function getAvatarConfigForPersona(
  name: string,
  locale: Locale = "tr"
): PersonaAvatarConfig {
  const id = resolvePersonaIdFromName(name);
  const resolvedId = id ?? "non-technical";
  const base = PERSONA_AVATAR_BASE[resolvedId];
  const { accentTr, accentEn, ...rest } = base;
  return {
    ...rest,
    accent: locale === "en" ? accentEn : accentTr,
  };
}

export function personaOpeningLine(
  persona: PersonaAnalysis,
  productName?: string,
  t?: (key: string) => string
): string {
  const impression = stripCitationTags(persona.firstImpression);
  const understood = stripCitationTags(persona.understood);
  const confusion = stripCitationTags(persona.confusion);

  if (t) {
    const displayName = localizedPersonaDisplayName(t, persona.name);
    const forProduct = productName
      ? t("talk.opening.forProduct").replace("{product}", productName)
      : t("talk.opening.forThisProduct");
    return t("talk.opening.template")
      .replace("{name}", displayName)
      .replace("{forProduct}", forProduct)
      .replace("{impression}", impression)
      .replace("{understood}", understood)
      .replace("{confusion}", confusion);
  }

  const name = productName ? `${productName} için` : "Bu ürün için";
  return (
    `Merhaba, ben ${persona.name}. ${name} ilk izlenimim: ${impression} ` +
    `Anladığım: ${understood} Kafamı karıştıran: ${confusion}`
  );
}

/** Always return 6 talk-room personas; fill gaps from avatar taglines when analysis omitted some. */
export function buildTalkPersonas(result: AnalysisResult, t?: (key: string) => string): PersonaAnalysis[] {
  return PERSONA_OPTIONS.map((opt) => {
    const fromResult = result.personas.find((p) => {
      const id = resolvePersonaIdFromName(p.name);
      return id === opt.id || p.name === opt.label;
    });
    if (fromResult) {
      if (!t) return fromResult;
      return { ...fromResult, name: t(`persona.${opt.id}.label`) };
    }

    const cfg = PERSONA_AVATARS[opt.id as PersonaId];
    const label = t ? t(`persona.${opt.id}.label`) : opt.label;
    const tagline = t ? t(`persona.${opt.id}.tagline`) : cfg.tagline;
    if (t) {
      return {
        name: label,
        firstImpression: tagline,
        understood: t("talk.fill.understood"),
        confusion: t("talk.fill.confusion"),
        likelihood: "Orta" as const,
        dropOffReason: t("talk.fill.dropOff"),
        suggestion: t("talk.fill.suggestion"),
      };
    }
    return {
      name: label,
      firstImpression: tagline,
      understood: "Ürünün temel vaadini genel hatlarıyla kavradım.",
      confusion: "Detaylar ve güven sinyalleri henüz net değil.",
      likelihood: "Orta" as const,
      dropOffReason: "Rehberlik ve net adımlar olmazsa vazgeçebilirim.",
      suggestion: "Basit onboarding ve net fayda cümlesi ekleyin.",
    };
  });
}
