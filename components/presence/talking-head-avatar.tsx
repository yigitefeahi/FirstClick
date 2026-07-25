"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  clearAudioDrivenMouth,
  tickAudioDrivenMouth,
  type MouthDriverHead,
} from "@/lib/presence/avatar-mouth-driver";
import { buildLipsyncVisemePayload } from "@/lib/presence/build-lipsync-payload";
import { buildWordTiming } from "@/lib/presence/word-timing";
import { fetchOpenAiTtsArrayBuffer, speakWithBrowserTts } from "@/lib/presence/openai-tts-audio";
import { speakableText } from "@/lib/presence/safe-text";
import {
  attachEnglishLipsync,
  loadTalkingHeadClass,
  type LipsyncProcessor,
  type TalkingHeadInstance,
} from "@/lib/presence/load-talkinghead";
import type { Locale } from "@/lib/i18n/dictionaries";
import { useT } from "@/lib/i18n/preferences-context";
import type { PersonaAvatarConfig } from "@/lib/persona-avatars";

export type TalkingHeadAvatarHandle = {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  isReady: () => boolean;
  waitUntilReady: (timeoutMs?: number) => Promise<boolean>;
};

type TalkingHeadAvatarProps = {
  persona: PersonaAvatarConfig;
  token?: string | null;
  locale?: Locale;
  onReady?: () => void;
  onSpeakingChange?: (speaking: boolean) => void;
  onError?: (message: string) => void;
  variant?: "card" | "tile";
  className?: string;
};

type TalkingHeadInternal = TalkingHeadInstance &
  MouthDriverHead & {
    audioCtx: AudioContext;
    isSpeaking?: boolean;
    isAudioPlaying?: boolean;
    lipsync?: Record<string, LipsyncProcessor>;
  };

export const TalkingHeadAvatar = forwardRef<TalkingHeadAvatarHandle, TalkingHeadAvatarProps>(
  function TalkingHeadAvatar(
    {
      persona,
      token,
      locale = "tr",
      onReady,
      onSpeakingChange,
      onError,
      variant = "card",
      className = "",
    },
    ref
  ) {
    const t = useT();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const headRef = useRef<TalkingHeadInternal | null>(null);
    const readyRef = useRef(false);
    const readyWaitersRef = useRef<Array<(ok: boolean) => void>>([]);
    const onReadyRef = useRef(onReady);
    const onErrorRef = useRef(onError);
    const tokenRef = useRef(token);
    const localeRef = useRef(locale);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    onReadyRef.current = onReady;
    onErrorRef.current = onError;
    tokenRef.current = token;
    localeRef.current = locale;

    const markReady = () => {
      readyRef.current = true;
      setLoading(false);
      onReadyRef.current?.();
      const waiters = readyWaitersRef.current.splice(0);
      waiters.forEach((resolve) => resolve(true));
    };

    const markFailed = (message: string) => {
      readyRef.current = false;
      setLoadError(message);
      setLoading(false);
      onErrorRef.current?.(message);
      const waiters = readyWaitersRef.current.splice(0);
      waiters.forEach((resolve) => resolve(false));
    };

    useEffect(() => {
      let cancelled = false;

      const init = async () => {
        if (!containerRef.current) return;

        // Wait a frame so flex layout gives the container real size
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        if (cancelled || !containerRef.current) return;

        // Clear any leftover canvas from a previous TalkingHead instance
        containerRef.current.replaceChildren();

        // If still zero-sized, wait briefly for layout
        for (let i = 0; i < 10; i += 1) {
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          if (w > 40 && h > 40) break;
          await new Promise<void>((resolve) => window.setTimeout(resolve, 50));
          if (cancelled || !containerRef.current) return;
        }

        try {
          const TalkingHead = await loadTalkingHeadClass();
          if (cancelled || !containerRef.current) return;

          const head = new TalkingHead(containerRef.current, {
            lipsyncModules: ["en"],
            lipsyncLang: "en",
            cameraView: "upper",
            cameraDistance: 0,
            cameraY: 0,
            cameraRotateEnable: false,
            cameraPanEnable: false,
            cameraZoomEnable: false,
            modelFPS: 30,
            avatarSpeakingEyeContact: 0.75,
            avatarIdleEyeContact: 0.35,
            mixerGainSpeech: 1,
            update: () => {
              const current = headRef.current;
              if (!current) return;
              if (current.isSpeaking || current.isAudioPlaying) {
                tickAudioDrivenMouth(current);
              } else {
                clearAudioDrivenMouth(current);
              }
            },
          }) as TalkingHeadInternal;

          headRef.current = head;

          // Keep WebGL clear transparent so CSS persona backdrop shows through
          try {
            const anyHead = head as TalkingHeadInternal & {
              renderer?: { setClearColor?: (c: number, a: number) => void };
              scene?: { background: unknown };
            };
            anyHead.renderer?.setClearColor?.(0x000000, 0);
            if (anyHead.scene) anyHead.scene.background = null;
          } catch {
            /* optional */
          }

          await head.showAvatar({
            url: `${persona.glbUrl}?v=20260721k`,
            body: persona.body,
            avatarMood: persona.mood,
            lipsyncLang: "en",
          });

          if (cancelled) return;

          try {
            await attachEnglishLipsync(head);
          } catch {
            /* lipsync optional — avatar can still speak with audio-driven mouth */
          }

          // Wider upper framing so head/shoulders aren't cropped on large GLBs
          head.setView("upper", { cameraDistance: 0.55, cameraY: -0.02 });

          // Nudge resize after avatar mount (Safari flex layout)
          window.dispatchEvent(new Event("resize"));
          await new Promise<void>((resolve) => window.setTimeout(resolve, 80));

          if (cancelled) return;
          markReady();
        } catch (error) {
          if (cancelled) return;
          const message =
            error instanceof Error ? error.message : t("talk.errorAvatarLoadFailed");
          markFailed(message);
        }
      };

      readyRef.current = false;
      setLoading(true);
      setLoadError(null);
      void init();

      return () => {
        cancelled = true;
        readyRef.current = false;
        if (headRef.current) clearAudioDrivenMouth(headRef.current);
        try {
          headRef.current?.stopSpeaking();
        } catch {
          /* ignore */
        }
        headRef.current = null;
        const waiters = readyWaitersRef.current.splice(0);
        waiters.forEach((resolve) => resolve(false));
      };
    }, [persona.glbUrl, persona.body, persona.mood, persona.backgroundUrl, t]);

    const speakWithAvatar = async (text: string) => {
      const head = headRef.current;
      if (!head || !readyRef.current) {
        throw new Error(t("talk.errorAvatarNotReady"));
      }

      const plain = speakableText(text);
      onSpeakingChange?.(true);

      try {
        if (head.audioCtx.state === "suspended") {
          await head.audioCtx.resume();
        }

        const authToken = tokenRef.current;
        if (!authToken) {
          throw new Error(t("talk.errorTtsSession"));
        }

        const speechLocale = localeRef.current;
        const arrayBuffer = await fetchOpenAiTtsArrayBuffer(plain, authToken, {
          voice: persona.ttsVoice,
          accent: persona.accent,
          speed: persona.ttsSpeed,
          gender: persona.body,
          locale: speechLocale,
        });
        const audioBuffer = await head.audioCtx.decodeAudioData(arrayBuffer.slice(0));
        const durationMs = Math.max(400, Math.round(audioBuffer.duration * 1000));
        const wordTiming = buildWordTiming(plain, durationMs);

        const lipsync = head.lipsync?.en;
        const visemePayload =
          lipsync && lipsync.wordsToVisemes
            ? buildLipsyncVisemePayload(plain, durationMs, lipsync)
            : { visemes: [] as string[], vtimes: [] as number[], vdurations: [] as number[] };

        head.stopSpeaking();

        await new Promise<void>((resolve) => {
          head.speakAudio(
            {
              audio: audioBuffer,
              words: wordTiming.words,
              wtimes: wordTiming.wtimes,
              wdurations: wordTiming.wdurations,
              ...(visemePayload.visemes.length
                ? {
                    visemes: visemePayload.visemes,
                    vtimes: visemePayload.vtimes,
                    vdurations: visemePayload.vdurations,
                  }
                : {}),
            },
            { lipsyncLang: "en" }
          );
          head.speakMarker(() => resolve());
        });
      } catch {
        head.stopSpeaking();
        clearAudioDrivenMouth(head);
        const browserLang = localeRef.current === "en" ? "en-US" : "tr-TR";
        await speakWithBrowserTts(plain, browserLang, persona.body);
      } finally {
        clearAudioDrivenMouth(head);
        onSpeakingChange?.(false);
      }
    };

    useImperativeHandle(ref, () => ({
      speak: speakWithAvatar,
      stop: () => {
        try {
          headRef.current?.stopSpeaking();
        } catch {
          /* ignore */
        }
        if (headRef.current) clearAudioDrivenMouth(headRef.current);
        onSpeakingChange?.(false);
      },
      isReady: () => readyRef.current,
      waitUntilReady: (timeoutMs = 20000) =>
        new Promise<boolean>((resolve) => {
          if (readyRef.current) {
            resolve(true);
            return;
          }
          let settled = false;
          const onDone = (ok: boolean) => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timer);
            readyWaitersRef.current = readyWaitersRef.current.filter((w) => w !== onDone);
            resolve(ok);
          };
          const timer = window.setTimeout(() => onDone(false), timeoutMs);
          readyWaitersRef.current.push(onDone);
        }),
    }));

    const isTile = variant === "tile";
    const shellClass = isTile
      ? `relative h-full min-h-[320px] w-full ${className}`
      : `relative mx-auto w-full max-w-xl ${className}`;
    const canvasClass = isTile
      ? "h-full min-h-[320px] w-full overflow-hidden bg-[#161616]"
      : "h-[min(52vh,460px)] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-[0_24px_80px_rgba(8,47,73,0.35)]";

    return (
      <div
        className={`${shellClass}${isTile ? " overflow-hidden" : ""}`}
        style={
          isTile
            ? ({
                ["--presence-avatar-bg" as string]: `url("${persona.backgroundUrl}?v=20260721bg4")`,
              } as CSSProperties)
            : undefined
        }
      >
        {isTile && <div className="presence-avatar-office-bg" aria-hidden />}
        <div
          ref={containerRef}
          className={
            isTile
              ? "relative z-[1] h-full min-h-[320px] w-full overflow-hidden bg-transparent"
              : canvasClass
          }
          aria-label={`${persona.label} 3D avatar`}
        />
        {loading && (
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center bg-slate-950/70 text-sm text-slate-300 ${
              isTile ? "" : "rounded-3xl"
            }`}
          >
            {t("talk.avatarLoading")}
          </div>
        )}
        {loadError && (
          <div className="absolute inset-x-4 bottom-4 z-10 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            {loadError}
          </div>
        )}
      </div>
    );
  }
);
