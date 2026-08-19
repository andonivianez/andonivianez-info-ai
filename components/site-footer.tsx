"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { PrivacyPreferencesButton } from "@/components/legal/privacy-preferences-button"
import { localizedPath } from "@/lib/i18n/config"

export function SiteFooter({ variant = "ink" }: { variant?: "ink" | "light" }) {
  const { language, t } = useLanguage()
  const isInk = variant === "ink"
  const linkClass = isInk ? "hover:text-amber transition-colors" : "hover:underline"

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
        <Link href={localizedPath("/about", language)} className={linkClass}>
          {t("nav.profile")}
        </Link>
        {" · "}
        <Link href={localizedPath("/ai-lab", language)} className={linkClass}>
          {t("nav.ailab")}
        </Link>
      </p>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Link href={localizedPath("/legal/notice", language)} className={linkClass}>
          {t("legal.notice")}
        </Link>
        <span aria-hidden="true">·</span>
        <Link href={localizedPath("/legal/privacy", language)} className={linkClass}>
          {t("legal.privacy")}
        </Link>
        <span aria-hidden="true">·</span>
        <Link href={localizedPath("/legal/cookies", language)} className={linkClass}>
          {t("legal.cookies")}
        </Link>
        <span aria-hidden="true">·</span>
        <PrivacyPreferencesButton />
      </p>
    </footer>
  )
}
