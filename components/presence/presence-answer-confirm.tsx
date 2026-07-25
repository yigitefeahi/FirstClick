"use client";

import { Mic, Send } from "lucide-react";
import { useT } from "@/lib/i18n/preferences-context";

type PresenceAnswerConfirmProps = {
  open: boolean;
  transcript: string;
  onSubmit: () => void;
  onContinue: () => void;
};

export function PresenceAnswerConfirm({
  open,
  transcript,
  onSubmit,
  onContinue,
}: PresenceAnswerConfirmProps) {
  const t = useT();

  if (!open) return null;

  const preview = transcript.trim();
  const truncated = preview.length > 220 ? `${preview.slice(0, 220).trim()}…` : preview;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[88px] z-[60] mx-auto max-w-lg px-4 sm:bottom-[92px]">
      <div
        className="presence-answer-confirm pointer-events-auto rounded-2xl border border-[#0b5cff]/45 bg-[#141414]/98 p-4 shadow-2xl backdrop-blur-md sm:p-5"
        role="dialog"
        aria-labelledby="presence-answer-confirm-title"
      >
        <p id="presence-answer-confirm-title" className="presence-answer-confirm-title text-base font-semibold">
          {t("presence.confirmTitle")}
        </p>
        <p className="presence-answer-confirm-desc mt-1.5 text-sm leading-relaxed">
          {t("presence.confirmDesc")}
        </p>

        {truncated ? (
          <p className="presence-answer-confirm-preview mt-3 max-h-24 overflow-y-auto rounded-xl border px-3 py-2.5 text-sm leading-relaxed">
            {truncated}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onContinue}
            className="presence-answer-confirm-secondary inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:brightness-110"
          >
            <Mic size={16} aria-hidden />
            {t("presence.confirmContinue")}
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="presence-answer-confirm-primary inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:brightness-110"
          >
            <Send size={16} aria-hidden />
            {t("presence.confirmSubmit")}
          </button>
        </div>
      </div>
    </div>
  );
}
