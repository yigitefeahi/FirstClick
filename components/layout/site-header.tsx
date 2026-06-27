import Link from "next/link";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 shadow-md shadow-brand-500/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">FirstClick</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/analyze"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
          >
            Analiz
          </Link>
          <Link
            href="/analyze"
            className="rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
          >
            Analize Başla
          </Link>
        </nav>
      </div>
    </header>
  );
}
