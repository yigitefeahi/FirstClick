import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection, FeatureCards } from "@/components/landing/hero-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <section id="features" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Neden FirstClick?
            </h2>
            <p className="mt-3 text-slate-500">
              Gerçek kullanıcıya çıkmadan önce ürün fikrinizi test edin.
            </p>
          </div>
          <FeatureCards />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
