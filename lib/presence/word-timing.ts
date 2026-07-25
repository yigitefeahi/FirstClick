export type WordTiming = {
  words: string[];
  wtimes: number[];
  wdurations: number[];
};

export function buildWordTiming(text: string, durationMs: number): WordTiming {
  const cleaned = text.trim();
  const words = cleaned.match(/\S+/g) || [];
  if (!words.length) {
    return { words: ["."], wtimes: [0], wdurations: [Math.max(400, durationMs)] };
  }

  const weights = words.map((word) => Math.max(1, word.replace(/[^\w']/g, "").length || 1));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const safeDuration = Math.max(500, durationMs);

  let cursor = 0;
  const wtimes: number[] = [];
  const wdurations: number[] = [];

  for (let i = 0; i < words.length; i += 1) {
    const slice = (weights[i] / totalWeight) * safeDuration;
    wtimes.push(Math.round(cursor));
    wdurations.push(Math.max(80, Math.round(slice)));
    cursor += slice;
  }

  return { words, wtimes, wdurations };
}
