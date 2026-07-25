import { API_BASE } from "@/lib/api";
import type { Locale } from "@/lib/i18n/dictionaries";
import { speakableText } from "@/lib/presence/safe-text";

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export type TtsRequestOptions = {
  voice?: string;
  accent?: string;
  speed?: number;
  gender?: "F" | "M";
  locale?: Locale;
};

export async function fetchOpenAiTtsArrayBuffer(
  text: string,
  token: string,
  options: TtsRequestOptions = {}
): Promise<ArrayBuffer> {
  const plain = speakableText(text);
  const locale = options.locale ?? "tr";
  const response = await fetch(`${API_BASE}/api/v1/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: plain.slice(0, 4000),
      voice: options.voice ?? "coral",
      accent: options.accent,
      speed: options.speed ?? 1.12,
      locale,
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS request failed (${response.status})`);
  }

  const data = (await response.json()) as {
    audioBase64?: string;
    audio_base64?: string;
    fallback?: boolean;
  };
  const b64 = data.audioBase64 ?? data.audio_base64;
  if (!b64) {
    throw new Error("No audio in TTS response");
  }

  return base64ToArrayBuffer(b64);
}

export function speakWithBrowserTts(
  text: string,
  lang = "tr-TR",
  gender: "F" | "M" = "F"
): Promise<number> {
  const plain = speakableText(text);
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      reject(new Error("Browser TTS not supported"));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(plain);
    utterance.lang = lang;
    utterance.rate = 1.08;
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = lang.toLowerCase().slice(0, 2);
    const matched = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
    const preferFemale = gender === "F";
    const named = matched.find((v) => {
      const n = v.name.toLowerCase();
      if (preferFemale) return /female|kadın|yeld|filiz|carm|zira|samantha|karen|moira/i.test(n);
      return /male|erkek|tolg|cem|arda|daniel|alex|david/i.test(n);
    });
    utterance.voice = named ?? matched[0] ?? null;
    utterance.onend = () => resolve(Math.max(1000, plain.split(/\s+/).length * 280));
    utterance.onerror = () => reject(new Error("Browser TTS failed"));
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
}
