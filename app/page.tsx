import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection, WhyNotAiSection, LabPillars } from "@/components/landing/hero-section";
import { LabScoreStrip } from "@/components/landing/lab-score-strip";
import { SnapScroller } from "@/components/landing/snap-scroller";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <SnapScroller>
          <HeroSection />
          <LabScoreStrip />
          <WhyNotAiSection />
        </SnapScroller>
        <LabPillars />
      </main>
      <SiteFooter />
    </div>
  );
}
