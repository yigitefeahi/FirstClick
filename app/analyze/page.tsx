import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnalysisForm } from "@/components/analyze/analysis-form";
import { AnalyzeFormLoading } from "@/components/analyze/analyze-form-loading";
import { AnalyzePageHeader } from "@/components/analyze/analyze-page-header";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function AnalyzePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <AnalyzePageHeader />
          <AuthGuard>
            <Suspense fallback={<AnalyzeFormLoading />}>
              <AnalysisForm />
            </Suspense>
          </AuthGuard>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
