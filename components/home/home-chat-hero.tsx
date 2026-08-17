"use client"

import dynamic from "next/dynamic"
import { useLanguage } from "@/components/language-provider"
import { getProfile } from "@/lib/portfolio"

const AIChat = dynamic(() => import("@/components/ai/ai-chat").then((mod) => mod.AIChat), {
  ssr: false,
  loading: () => (
    <div className="border-line bg-ink-muted text-slate-muted rounded-xl border p-8 text-center font-mono text-sm">
      …
    </div>
  ),
})

export function HomeChatHero() {
  const { language } = useLanguage()
  const profile = getProfile(language)

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-24 pb-8 sm:px-6">
      <div className="mb-8 text-center">
        {profile.tagline && (
          <p className="text-amber mb-2 font-mono text-xs tracking-[0.2em] uppercase">
            {profile.tagline}
          </p>
        )}
        <h1 className="font-display text-text-on-ink text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="text-slate-muted mt-2 text-base sm:text-lg">{profile.role}</p>
        <p className="text-slate-muted/80 mt-1 text-sm">{profile.subtitle}</p>
      </div>

      <AIChat variant="hero" />
    </section>
  )
}
