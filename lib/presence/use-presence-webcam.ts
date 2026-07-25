"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UsePresenceWebcamOptions = {
  /** When true, attach/preview the provided stream (or request one as fallback). */
  enabled: boolean;
  /** Prefer stream acquired under a user gesture (Join click). */
  stream?: MediaStream | null;
};

export function usePresenceWebcam({ enabled, stream: externalStream = null }: UsePresenceWebcamOptions) {
  const streamRef = useRef<MediaStream | null>(null);
  const ownedStreamRef = useRef(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tryAttach = useCallback(async () => {
    const video = videoElementRef.current;
    const stream = streamRef.current;
    if (!video || !stream) return;

    try {
      video.srcObject = stream;
      video.muted = true;
      video.setAttribute("playsinline", "true");
      await video.play();
      setReady(true);
      setError(null);
    } catch {
      setReady(false);
      setError("Kamera önizlemesi başlatılamadı.");
    }
  }, []);

  const videoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoElementRef.current = node;
      if (node) {
        void tryAttach();
      }
    },
    [tryAttach]
  );

  useEffect(() => {
    if (!enabled) {
      if (ownedStreamRef.current) {
        streamRef.current?.getTracks().forEach((track) => track.stop());
      }
      streamRef.current = null;
      ownedStreamRef.current = false;
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = null;
      }
      setReady(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const start = async () => {
      // Prefer stream from Join-click permission request (Chrome user-gesture).
      if (externalStream) {
        if (ownedStreamRef.current && streamRef.current && streamRef.current !== externalStream) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        streamRef.current = externalStream;
        ownedStreamRef.current = false;
        if (!cancelled) await tryAttach();
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Bu tarayıcıda kamera desteklenmiyor.");
        setReady(false);
        return;
      }

      if (!window.isSecureContext) {
        setError("Kamera için localhost veya https gerekir.");
        setReady(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 360 },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        ownedStreamRef.current = true;
        await tryAttach();
      } catch {
        streamRef.current = null;
        ownedStreamRef.current = false;
        setReady(false);
        setError(
          "Kamera kullanılamıyor. Adres çubuğundan Kamera → İzin ver yapın (Chrome/Edge, localhost)."
        );
      }
    };

    void start();

    return () => {
      cancelled = true;
      if (ownedStreamRef.current) {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        ownedStreamRef.current = false;
        streamRef.current = null;
      }
    };
  }, [enabled, externalStream, tryAttach]);

  return { videoRef, ready, error };
}
