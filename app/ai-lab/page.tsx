import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AILabDashboard } from "@/components/ai-lab/ai-lab-dashboard"

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "Demostración técnica y métricas del portfolio inteligente con IA local — TFM Andoni Vianez.",
  alternates: { canonical: "/ai-lab" },
  openGraph: {
    title: "AI Lab — Portfolio IA local",
    url: "https://www.andonivianez.info/ai-lab",
  },
}

export default function AILabPage() {
  return (
    <main className="theme-ink bg-ink min-h-screen">
      <SiteHeader variant="ink" />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-text-on-ink mb-2 text-3xl font-bold sm:text-4xl">
          AI Lab
        </h1>
        <p className="text-slate-muted mb-8 text-sm">
          Métricas experimentales del runtime de IA local — Chrome AI, WebLLM y fallback extractivo.
        </p>
        <AILabDashboard />
      </div>
      <SiteFooter variant="ink" />
    </main>
  )
}
