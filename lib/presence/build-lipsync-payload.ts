import { buildWordTiming } from "@/lib/presence/word-timing";
import type { LipsyncProcessor } from "@/lib/presence/load-talkinghead";

type VisemeWordResult = {
  visemes?: string[];
  times?: number[];
  durations?: number[];
};

export type LipsyncVisemePayload = {
  visemes: string[];
  vtimes: number[];
  vdurations: number[];
};

function cleanWord(word: string): string {
  return word.replace(/^[^\w']+|[^\w']+$/g, "").trim();
}

export function buildLipsyncVisemePayload(
  text: string,
  durationMs: number,
  lipsync: LipsyncProcessor
): LipsyncVisemePayload {
  const timing = buildWordTiming(text, durationMs);
  const visemes: string[] = [];
  const vtimes: number[] = [];
  const vdurations: number[] = [];

  if (!lipsync.preProcessText || !lipsync.wordsToVisemes) {
    return { visemes, vtimes, vdurations };
  }

  for (let i = 0; i < timing.words.length; i += 1) {
    const rawWord = timing.words[i];
    const cleaned = cleanWord(rawWord);
    if (!cleaned) continue;

    const wordStart = timing.wtimes[i];
    const wordDuration = Math.max(120, timing.wdurations[i]);
    const processed = lipsync.preProcessText(cleaned, "en");
    const val = lipsync.wordsToVisemes(processed) as VisemeWordResult;
    if (!val?.visemes?.length || !val.times?.length || !val.durations?.length) continue;

    const dTotal = val.times[val.visemes.length - 1] + val.durations[val.durations.length - 1];
    if (dTotal <= 0) continue;

    for (let j = 0; j < val.visemes.length; j += 1) {
      const relStart = val.times[j] / dTotal;
      const relDur = val.durations[j] / dTotal;
      visemes.push(val.visemes[j]);
      vtimes.push(Math.round(wordStart + relStart * wordDuration));
      vdurations.push(Math.max(50, Math.round(relDur * wordDuration)));
    }
  }

  return { visemes, vtimes, vdurations };
}
