import Link from "next/link";
import { Users, Eye, ListChecks } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "Farklı kullanıcı profilleriyle test",
    description:
      "Teknik bilmeyen kullanıcıdan şüpheci profile kadar farklı persona'lar ürününüzü değerlendirir.",
  },
  {
    icon: Eye,
    title: "Kör nokta ve UX risk analizi",
    description:
      "Anlaşılmayan noktalar, vazgeçme riskleri ve onboarding sürtünmeleri erken tespit edilir.",
  },
  {
    icon: ListChecks,
    title: "Aksiyon odaklı geliştirme önerileri",
    description:
      "Öncelikli aksiyon planı ve geliştirilmiş ürün anlatımı önerileriyle hemen harekete geçin.",
  },
];

export function FeatureCards() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="group transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10"
        >
          <CardHeader>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
              <feature.icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-100/60 via-violet-50/40 to-transparent blur-3xl" />
      </div>
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-sm font-medium text-brand-700">
          AI destekli kullanıcı simülasyonu
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          First<span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Click</span>
        </h1>
        <p className="mt-4 text-xl font-medium text-slate-600 sm:text-2xl">
          Ürününü kullanıcı gözünden test et.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Gerçek kullanıcıya çıkmadan önce ürün fikrini farklı persona profilleriyle simüle edin.
          Nerede anlaşılmadığını, neden kullanılmayabileceğini ve hangi noktaların geliştirilmesi
          gerektiğini görün.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/analyze">
            <Button size="lg">Analize Başla</Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg">
              Özellikleri Keşfet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
