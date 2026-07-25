/**
 * Chrome (esp. Windows) often denies cam/mic with `NotAllowedError` and no
 * permission dialog if getUserMedia / SpeechRecognition start outside a user
 * gesture or after long awaits. Call this first from the Join click handler.
 */

import { translate, type Locale } from "@/lib/i18n/dictionaries";

export type MediaAccessResult = {
  stream: MediaStream | null;
  cameraOk: boolean;
  micOk: boolean;
  error: string | null;
};

function isNotAllowed(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const name = "name" in error ? String((error as { name?: string }).name) : "";
  const message = "message" in error ? String((error as { message?: string }).message) : "";
  return (
    name === "NotAllowedError" ||
    name === "PermissionDeniedError" ||
    /not allowed|permission denied/i.test(message)
  );
}

function permissionHelpMessage(locale: Locale): string {
  return translate(locale, "media.error.permissionHelp");
}

export async function requestCameraAndMic(
  locale: Locale = "tr"
): Promise<MediaAccessResult> {
  if (typeof window === "undefined") {
    return {
      stream: null,
      cameraOk: false,
      micOk: false,
      error: translate(locale, "media.error.browserOnly"),
    };
  }

  if (!window.isSecureContext) {
    return {
      stream: null,
      cameraOk: false,
      micOk: false,
      error: translate(locale, "media.error.secureContext"),
    };
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    return {
      stream: null,
      cameraOk: false,
      micOk: false,
      error: translate(locale, "media.error.unsupported"),
    };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 360 },
      },
      audio: true,
    });

    // Keep video for preview; drop live audio tracks — SpeechRecognition uses its own capture
    // after permission is granted under this user gesture.
    stream.getAudioTracks().forEach((track) => track.stop());

    return { stream, cameraOk: true, micOk: true, error: null };
  } catch (error) {
    // Partial: try video-only then audio-only so one device can still work
    let videoStream: MediaStream | null = null;
    let cameraOk = false;
    let micOk = false;

    try {
      videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 360 } },
        audio: false,
      });
      cameraOk = true;
    } catch {
      cameraOk = false;
    }

    try {
      const audioOnly = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
      audioOnly.getTracks().forEach((track) => track.stop());
      micOk = true;
    } catch {
      micOk = false;
    }

    if (cameraOk || micOk) {
      const parts: string[] = [];
      if (!cameraOk) parts.push(translate(locale, "media.device.camera"));
      if (!micOk) parts.push(translate(locale, "media.device.mic"));
      return {
        stream: videoStream,
        cameraOk,
        micOk,
        error: parts.length
          ? translate(locale, "media.error.partialDenied")
              .replace("{devices}", parts.join(translate(locale, "media.device.join")))
              .replace("{help}", permissionHelpMessage(locale))
          : null,
      };
    }

    return {
      stream: null,
      cameraOk: false,
      micOk: false,
      error: isNotAllowed(error) ? permissionHelpMessage(locale) : permissionHelpMessage(locale),
    };
  }
}

export function formatSpeechRecognitionError(
  code: string | undefined,
  locale: Locale = "tr"
): string {
  const key = (code || "").toLowerCase();
  if (key === "not-allowed" || key === "service-not-allowed") {
    return permissionHelpMessage(locale);
  }
  if (key === "audio-capture") {
    return translate(locale, "media.error.audioCapture");
  }
  if (key === "network") {
    return translate(locale, "media.error.network");
  }
  if (key === "language-not-supported") {
    return translate(locale, "media.error.languageNotSupported");
  }
  return translate(locale, "media.error.generic").replace("{code}", code || translate(locale, "media.error.unknown"));
}
