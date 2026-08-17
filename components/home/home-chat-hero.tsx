"use client"

import dynamic from "next/dynamic"
import { useLanguage } from "@/components/language-provider"
import { getProfile } from "@/lib/portfolio"

const AIChat = dynamic(() => import("@/components/ai/ai-chat").then((mod) => mod.AIChat), {
  ssr: false,
  loading: () => (
    <div className="border-line bg-ink-muted text-slate-muted flex h-[min(100svh-7rem,680px)] items-center justify-center rounded-xl border font-mono text-sm sm:h-[min(78vh,680px)]">
      …
    </div>
  ),
})

export function HomeChatHero() {
  const { language } = useLanguage()
  const profile = getProfile(language)

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col px-4 pt-16 pb-4 sm:px-6 sm:pt-24 sm:pb-8">
      <div className="mb-4 shrink-0 text-center sm:mb-6">
        {profile.tagline && (
          <p className="text-amber mb-1 font-mono text-xs tracking-[0.2em] uppercase sm:mb-2">
            {profile.tagline}
          </p>
        )}
        <h1 className="font-display text-text-on-ink text-2xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="text-slate-muted mt-1 text-sm sm:text-lg">{profile.role}</p>
        <p className="text-slate-muted/80 mt-0.5 hidden text-sm sm:block">{profile.subtitle}</p>
      </div>

      <AIChat variant="hero" />
    </section>
  )
}
