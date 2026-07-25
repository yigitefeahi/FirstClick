"use client";

import { Keyboard, LogOut, Mic, Phone, Volume2 } from "lucide-react";
import Link from "next/link";
import { useT } from "@/lib/i18n/preferences-context";

type PresenceCallControlsProps = {
  conversationStarted: boolean;
  avatarReady: boolean;
  loading: boolean;
  isSpeaking: boolean;
  phase: string;
  showManualInput: boolean;
  leaveHref: string;
  onJoin: () => void;
  onReplayOpening: () => void;
  onToggleManualInput: () => void;
};

export function PresenceCallControls({
  conversationStarted,
  avatarReady,
  loading,
  isSpeaking,
  phase,
  showManualInput,
  leaveHref,
  onJoin,
  onReplayOpening,
  onToggleManualInput,
}: PresenceCallControlsProps) {
  const t = useT();

  return (
    <footer className="presence-controls z-30 shrink-0 border-t border-white/10 bg-[#111111]/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
        {!conversationStarted ? (
          <>
            <button
              type="button"
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-[#0b5cff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a4fe0] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!avatarReady}
              onClick={onJoin}
            >
              <Phone size={16} />
              {avatarReady ? t("presence.joinReady") : t("presence.avatarLoading")}
            </button>
            <Link
              href={leaveHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              <LogOut size={16} />
              {t("presence.exit")}
            </Link>
          </>
        ) : (
          <>
            <ControlButton
              label={phase === "listening" ? t("presence.micOpen") : t("presence.mic")}
              active={phase === "listening"}
              statusOnly
              icon={<Mic size={18} />}
            />
            <ControlButton
              label={t("presence.replay")}
              disabled={loading || isSpeaking || phase === "processing"}
              onClick={onReplayOpening}
              icon={<Volume2 size={18} />}
            />
            <ControlButton
              label={showManualInput ? t("presence.hideKeyboard") : t("presence.typeQuestion")}
              active={showManualInput}
              onClick={onToggleManualInput}
              icon={<Keyboard size={18} />}
            />
            <Link
              href={leaveHref}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/15 px-4 py-2.5 text-sm font-medium text-rose-100 transition hover:bg-rose-500/25"
            >
              <LogOut size={16} />
              {t("presence.leave")}
            </Link>
          </>
        )}
      </div>
    </footer>
  );
}

function ControlButton({
  label,
  icon,
  active = false,
  disabled = false,
  statusOnly = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  statusOnly?: boolean;
  onClick?: () => void;
}) {
  const isDisabled = disabled && !statusOnly;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      aria-disabled={statusOnly ? true : undefined}
      className={`presence-control-btn inline-flex flex-col items-center gap-1.5 rounded-xl px-3 py-2 transition ${
        isDisabled ? "cursor-not-allowed" : statusOnly ? "cursor-default" : ""
      } ${active ? "is-active" : ""}`}
    >
      <span
        className={`presence-control-icon flex h-10 w-10 items-center justify-center rounded-full ${
          isDisabled ? "is-disabled" : ""
        }`}
      >
        {icon}
      </span>
      <span
        className={`presence-control-label text-xs font-semibold leading-tight ${
          active ? "is-active" : ""
        } ${isDisabled ? "is-disabled" : ""}`}
      >
        {label}
      </span>
    </button>
  );
}
