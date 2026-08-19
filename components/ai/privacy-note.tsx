"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import { localizedPath } from "@/lib/i18n/config"
import type { AIProvider } from "@/lib/ai/types"

interface PrivacyNoteProps {
  provider: AIProvider | null
  variant?: "hero" | "default"
}

export function PrivacyNote({ provider, variant = "default" }: PrivacyNoteProps) {
  const { language, t } = useLanguage()
  const isHero = variant === "hero"

  if (!provider?.runsLocally || !provider.isGenerative) {
    return (
      <p className={cn("text-xs", isHero ? "text-slate-muted" : "text-muted-foreground")}>
        {t("assistant.privacy.fallback")}
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
        <strong className={isHero ? "text-amber" : undefined}>
          {language === "es" ? "IA privada." : "Private AI."}
        </strong>{" "}
        {t("assistant.privacy.detail")}{" "}
        <Link
          href={localizedPath("/legal/privacy", language)}
          className={cn("underline", isHero ? "text-amber" : "text-emerald-800")}
        >
          {t("legal.privacy")}
        </Link>
      </p>
    </div>
  )
}
