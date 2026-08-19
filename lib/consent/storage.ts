export const CONSENT_STORAGE_KEY = "portfolio-consent"
export const CONSENT_VERSION = "1"

export type ConsentChoice = "accepted" | "rejected" | null

export interface ConsentState {
  analytics: ConsentChoice
  version: string
  updatedAt: number
}

const DEFAULT_STATE: ConsentState = {
  analytics: null,
  version: CONSENT_VERSION,
  updatedAt: 0,
}

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_STATE

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return DEFAULT_STATE

    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_STATE
    return parsed
  } catch {
    return DEFAULT_STATE
  }
}

export function setConsentState(analytics: Exclude<ConsentChoice, null>): ConsentState {
  const state: ConsentState = {
    analytics,
    version: CONSENT_VERSION,
    updatedAt: Date.now(),
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
    window.dispatchEvent(new CustomEvent("consent-change", { detail: state }))
  }

  return state
}

export function hasAnalyticsConsent(): boolean {
  return getConsentState().analytics === "accepted"
}

export function hasConsentChoice(): boolean {
  return getConsentState().analytics !== null
}

export function resetConsent(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
    window.dispatchEvent(new CustomEvent("consent-change", { detail: DEFAULT_STATE }))
  }
}
