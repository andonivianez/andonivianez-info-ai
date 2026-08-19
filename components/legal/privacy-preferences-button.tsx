"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { resetConsent } from "@/lib/consent/storage"

export function PrivacyPreferencesButton() {
  const { t } = useLanguage()

  return (
    <Button
      variant="link"
      className="text-muted-foreground h-auto p-0 text-xs"
      onClick={() => {
        resetConsent()
        window.location.reload()
      }}
    >
      {t("legal.preferences")}
    </Button>
  )
}
