import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { HomeChatHero } from "@/components/home/home-chat-hero"
import { ProofStrip } from "@/components/home/proof-strip"
import { SiteFooter } from "@/components/site-footer"
import { buildPageMetadata } from "@/lib/i18n/metadata"
import { resolveLocale } from "@/lib/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata(resolveLocale(lang), "home", "/")
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
