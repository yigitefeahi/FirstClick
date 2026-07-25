export function safeText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value == null) return fallback;
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.detail === "string") return o.detail;
    if (typeof o.message === "string") return o.message;
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/** Strip RAG citation tags so speech/captions stay natural. */
export function stripCitationTags(text: string): string {
  return text
    .replace(/\[(?:doc|web|past|kb):[^\]]+\]/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

export function speakableText(value: unknown): string {
  const s = stripCitationTags(safeText(value, "")).trim();
  return s || "Yanıt metni alınamadı.";
}
