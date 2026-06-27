import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnalysisForm } from "@/components/analyze/analysis-form";

export default function AnalyzePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-slate-50/50">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana sayfa
          </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ürün Analizi</h1>
            <p className="mt-2 text-slate-500">
              Ürün fikrinizi girin, farklı kullanıcı profilleriyle simüle edelim.
            </p>
          </div>
          <AnalysisForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
