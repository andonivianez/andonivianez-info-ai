"use client"

import { Analytics } from "@vercel/analytics/next"
import { useConsent } from "@/lib/consent/use-consent"

export function AnalyticsGate() {
  const { hasAnalyticsConsent } = useConsent()

  if (!hasAnalyticsConsent) return null

  return (
    <Analytics
      beforeSend={(event) => {
        if (event.url.includes("/ai-lab")) {
          return event
        }
        return event
      }}
    />
  )
}
