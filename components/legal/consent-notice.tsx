"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { useConsent } from "@/lib/consent/use-consent"
import { localizedPath } from "@/lib/i18n/config"

export function ConsentNotice() {
  const { language, t } = useLanguage()
  const { hydrated, hasChoice, accept, reject } = useConsent()

  // No renderizar hasta hidratar: el servidor no tiene localStorage.
  if (!hydrated || hasChoice) return null

  return (
    <div className="fixed right-0 bottom-16 left-0 z-40 px-4 pb-2 md:bottom-4 md:left-auto md:max-w-md">
      <Card className="border-border shadow-lg">
        <CardContent className="space-y-3 p-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{t("consent.message")}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={accept}>
              {t("consent.accept")}
            </Button>
            <Button size="sm" variant="outline" onClick={reject}>
              {t("consent.reject")}
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link href={localizedPath("/legal/cookies", language)}>{t("consent.learnMore")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
