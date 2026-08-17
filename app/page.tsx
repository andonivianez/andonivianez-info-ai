import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { HomeChatHero } from "@/components/home/home-chat-hero"
import { ProofStrip } from "@/components/home/proof-strip"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Andoni Vianez — Pregúntame con IA local",
  description:
    "Portfolio inteligente con asistente IA 100% local. Senior Full Stack Engineer · React Native · 15+ años de experiencia.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Andoni Vianez — Portfolio con IA local",
    description:
      "Pregúntame sobre mi experiencia, stack y proyectos. Todo procesado en tu navegador.",
    url: "https://www.andonivianez.info",
  },
}

export default function Home() {
  return (
    <main className="theme-ink bg-ink min-h-screen">
      <SiteHeader variant="ink" />
      <HomeChatHero />
      <ProofStrip />
      <SiteFooter variant="ink" />
    </main>
  )
}
