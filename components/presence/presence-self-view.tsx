"use client";

import { Mic, MicOff, VideoOff } from "lucide-react";
import { useT } from "@/lib/i18n/preferences-context";

type PresenceSelfViewProps = {
  videoRef: (node: HTMLVideoElement | null) => void;
  cameraReady: boolean;
  cameraError: string | null;
  active: boolean;
  listening: boolean;
};

export function PresenceSelfView({
  videoRef,
  cameraReady,
  cameraError,
  active,
  listening,
}: PresenceSelfViewProps) {
  const t = useT();

  return (
    <div
      className={`presence-pip absolute bottom-4 right-4 z-30 w-[min(28vw,220px)] overflow-hidden rounded-xl border-2 bg-[#0d0d0d] shadow-2xl transition-colors duration-200 ${
        active ? "border-emerald-400 shadow-emerald-500/20" : "border-white/15"
      }`}
    >
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full scale-x-[-1] object-cover ${
            cameraReady ? "opacity-100" : "opacity-0"
          }`}
          playsInline
          muted
          autoPlay
          aria-label={t("presence.self.cameraAria")}
        />

        {!cameraReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#161616] px-3 text-center">
            <VideoOff size={22} className="text-slate-500" />
            <span className="text-[11px] leading-snug text-slate-400">
              {cameraError || t("presence.self.cameraStarting")}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2 pt-6">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-medium text-white">{t("presence.self.you")}</span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                listening
                  ? "bg-emerald-500/25 text-emerald-200"
                  : "bg-white/10 text-slate-300"
              }`}
            >
              {listening ? (
                <>
                  <Mic size={10} className={active ? "animate-pulse" : ""} />
                  {t("presence.self.live")}
                </>
              ) : (
                <>
                  <MicOff size={10} />
                  {t("presence.self.ready")}
                </>
              )}
            </span>
          </div>
        </div>

        {listening && active && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-1 overflow-hidden bg-black/30">
            <div className="presence-mic-bar h-full w-1/3 bg-emerald-400/90" />
          </div>
        )}
      </div>
    </div>
  );
}
