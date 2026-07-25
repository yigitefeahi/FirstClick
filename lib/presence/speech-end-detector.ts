import { formatSpeechRecognitionError } from "@/lib/presence/request-media-access";

type SpeechResultEventLike = {
  results: ArrayLike<ArrayLike<{ transcript?: string }>>;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtorLike = new () => SpeechRecognitionLike;

export type SpeechEndDetectorOptions = {
  onTranscript?: (text: string) => void;
  onSpeechEnd: (text: string) => void;
  onSilenceDetected?: (text: string) => void;
  onSpeechResumed?: () => void;
  onError?: (message: string) => void;
  silenceMs?: number;
  minChars?: number;
  lang?: string;
  /** Used for localized SpeechRecognition error messages. */
  locale?: "tr" | "en";
  requireConfirmation?: boolean;
};

export type SpeechEndDetector = {
  start: () => void;
  stop: () => void;
  isActive: () => boolean;
  getTranscript: () => string;
  resumeListening: () => void;
  submitNow: () => void;
};

export function createSpeechEndDetector(options: SpeechEndDetectorOptions): SpeechEndDetector {
  const silenceMs = options.silenceMs ?? 2200;
  const minChars = options.minChars ?? 8;
  const lang = options.lang ?? "tr-TR";

  let recognition: SpeechRecognitionLike | null = null;
  let pollId: number | null = null;
  let active = false;
  let transcript = "";
  let lastHeardAt = 0;
  let ended = false;
  let silencePromptShown = false;

  const getCtor = (): SpeechRecognitionCtorLike | null => {
    if (typeof window === "undefined") return null;
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionCtorLike;
      webkitSpeechRecognition?: SpeechRecognitionCtorLike;
    };
    return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
  };

  const clearPoll = () => {
    if (pollId != null) {
      window.clearInterval(pollId);
      pollId = null;
    }
  };

  const finish = () => {
    if (ended) return;
    ended = true;
    const finalText = transcript.trim();
    stop();
    if (finalText.length >= minChars) {
      options.onSpeechEnd(finalText);
    }
  };

  const start = () => {
    if (active) return;
    const Ctor = getCtor();
    if (!Ctor) {
      options.onError?.("Bu tarayıcıda ses tanıma desteklenmiyor. Metin kutusunu kullanın.");
      return;
    }

    ended = false;
    transcript = "";
    lastHeardAt = Date.now();
    silencePromptShown = false;
    active = true;

    recognition = new Ctor();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechResultEventLike) => {
      let text = "";
      for (let i = 0; i < event.results.length; i += 1) {
        text += event.results[i][0]?.transcript || "";
        text += " ";
      }
      transcript = text.trim();
      lastHeardAt = Date.now();
      if (silencePromptShown) {
        silencePromptShown = false;
        options.onSpeechResumed?.();
      }
      options.onTranscript?.(transcript);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      options.onError?.(formatSpeechRecognitionError(event.error, options.locale ?? "tr"));
    };

    recognition.onend = () => {
      if (!active || ended) return;
      try {
        recognition?.start();
      } catch {
        /* ignore restart race */
      }
    };

    try {
      recognition.start();
    } catch (error) {
      active = false;
      options.onError?.(
        error instanceof Error ? error.message : "Ses tanıma başlatılamadı."
      );
      return;
    }

    clearPoll();
    pollId = window.setInterval(() => {
      if (!active || ended) return;
      if (transcript.length < minChars) return;
      if (Date.now() - lastHeardAt < silenceMs) return;

      if (options.requireConfirmation) {
        if (silencePromptShown) return;
        silencePromptShown = true;
        options.onSilenceDetected?.(transcript.trim());
        return;
      }

      finish();
    }, 200);
  };

  const resumeListening = () => {
    if (!active || ended) return;
    silencePromptShown = false;
    lastHeardAt = Date.now();
  };

  const submitNow = () => {
    if (!active || ended) return;
    finish();
  };

  const stop = () => {
    active = false;
    clearPoll();
    try {
      recognition?.stop();
    } catch {
      /* ignore */
    }
    recognition = null;
  };

  return {
    start,
    stop,
    isActive: () => active,
    getTranscript: () => transcript,
    resumeListening,
    submitNow,
  };
}
