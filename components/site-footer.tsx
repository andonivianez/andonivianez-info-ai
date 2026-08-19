"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { localizedPath } from "@/lib/i18n/config"

export function SiteFooter({ variant = "ink" }: { variant?: "ink" | "light" }) {
  const { language, t } = useLanguage()
  const isInk = variant === "ink"

  return (
    <footer
      className={
        isInk
          ? "border-line/30 text-slate-muted border-t px-4 py-8 text-center text-xs"
          : "border-border text-muted-foreground border-t px-4 py-8 text-center text-xs"
      }
    >
      <p>
        © {new Date().getFullYear()} Andoni Vianez Ulloa ·{" "}
        <Link
          href={localizedPath("/about", language)}
          className={isInk ? "hover:text-amber transition-colors" : "hover:underline"}
        >
          {t("nav.profile")}
        </Link>
        {" · "}
        <Link
          href={localizedPath("/ai-lab", language)}
          className={isInk ? "hover:text-amber transition-colors" : "hover:underline"}
        >
          {t("nav.ailab")}
        </Link>
      </p>
    </footer>
  )
}
