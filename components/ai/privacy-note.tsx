"use client"

import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIProvider } from "@/lib/ai/types"

interface PrivacyNoteProps {
  provider: AIProvider | null
  variant?: "hero" | "default"
}

export function PrivacyNote({ provider, variant = "default" }: PrivacyNoteProps) {
  const isHero = variant === "hero"

  if (!provider?.runsLocally || !provider.isGenerative) {
    return (
      <p className={cn("text-xs", isHero ? "text-slate-muted" : "text-muted-foreground")}>
        Modo compatible: respuestas locales sin APIs de pago.
      </p>
    )
  }

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border p-3 text-xs",
        isHero
          ? "border-line/60 bg-ink text-slate-muted"
          : "border-emerald-200 bg-emerald-50 text-emerald-900",
      )}
    >
      <Lock className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", isHero && "text-amber")} />
      <p>
        <strong className={isHero ? "text-amber" : undefined}>IA privada.</strong> Todo se procesa
        en tu navegador. Sin OpenAI, Anthropic ni Google Cloud.
      </p>
    </div>
  )
}
