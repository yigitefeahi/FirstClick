export type TalkingHeadConstructor = new (
  node: HTMLElement,
  options?: Record<string, unknown>
) => TalkingHeadInstance;

export type TalkingHeadInstance = {
  showAvatar: (avatar: Record<string, unknown>) => Promise<void>;
  speakAudio: (audio: Record<string, unknown>, opt?: Record<string, unknown>) => void;
  speakMarker: (fn: () => void) => void;
  stopSpeaking: () => void;
  setView: (view: string, opt?: Record<string, unknown>) => void;
  isSpeaking?: boolean;
};

const THREE_VERSION = "0.180.0";
const IMPORT_MAP_ID = "talkinghead-importmap";

function ensureImportMap() {
  if (typeof document === "undefined") return;
  if (document.getElementById(IMPORT_MAP_ID)) return;

  const base = `https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}`;
  const map = document.createElement("script");
  map.type = "importmap";
  map.id = IMPORT_MAP_ID;
  map.textContent = JSON.stringify({
    imports: {
      three: `${base}/build/three.module.js`,
      "three/addons/": `${base}/examples/jsm/`,
    },
  });
  document.head.prepend(map);
}

let loadPromise: Promise<TalkingHeadConstructor> | null = null;

export type LipsyncProcessor = {
  preProcessText?: (s: string, lang?: string) => string;
  wordsToVisemes?: (w: string, lang?: string) => unknown;
};

type LipsyncHost = {
  lipsync?: Record<string, LipsyncProcessor>;
};

export async function attachEnglishLipsync(head: unknown): Promise<void> {
  const host = head as LipsyncHost;
  if (host.lipsync?.en?.wordsToVisemes) return;

  const moduleUrl = `${window.location.origin}/talkinghead/lipsync-en.mjs?v=20260721c`;
  const dynamicImport = new Function("url", "return import(url)") as (
    url: string
  ) => Promise<{ LipsyncEn?: new () => LipsyncProcessor }>;
  const mod = await dynamicImport(moduleUrl);
  if (!mod?.LipsyncEn) {
    throw new Error("Failed to load English lipsync module.");
  }

  if (!host.lipsync) {
    host.lipsync = {};
  }
  host.lipsync.en = new mod.LipsyncEn();
}

export function loadTalkingHeadClass(): Promise<TalkingHeadConstructor> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("TalkingHead can only load in the browser."));
  }

  if (!loadPromise) {
    loadPromise = (async () => {
      ensureImportMap();
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      const moduleUrl = `${window.location.origin}/talkinghead/talkinghead.mjs?v=20260721c`;
      const dynamicImport = new Function("url", "return import(url)") as (
        url: string
      ) => Promise<{ TalkingHead: TalkingHeadConstructor }>;
      const mod = await dynamicImport(moduleUrl);
      if (!mod?.TalkingHead) {
        throw new Error("TalkingHead module did not export TalkingHead.");
      }
      return mod.TalkingHead;
    })().catch((error) => {
      loadPromise = null;
      throw error;
    });
  }

  return loadPromise;
}
