import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AILabDashboard } from "@/components/ai-lab/ai-lab-dashboard"
import { buildPageMetadata } from "@/lib/i18n/metadata"
import { resolveLocale } from "@/lib/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata(resolveLocale(lang), "aiLab", "/ai-lab")
}

const intro = {
  es: "Métricas experimentales del runtime de IA local — Chrome AI, WebLLM y fallback extractivo.",
  en: "Experimental metrics for the local AI runtime — Chrome AI, WebLLM and extractive fallback.",
} as const

export default async function AILabPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = resolveLocale(lang)

  return (
    <main className="theme-ink bg-ink min-h-screen">
      <SiteHeader variant="ink" />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-text-on-ink mb-2 text-3xl font-bold sm:text-4xl">
          AI Lab
        </h1>
        <p className="text-slate-muted mb-8 text-sm">{intro[locale]}</p>
        <AILabDashboard />
      </div>
      <SiteFooter variant="ink" />
    </main>
  )
}
