import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 text-brand-500" />
          <span>FirstClick — Ürününü kullanıcı gözünden test et.</span>
        </div>
        <p className="text-xs text-slate-400">MVP · AI destekli kullanıcı simülasyonu</p>
      </div>
    </footer>
  );
}
