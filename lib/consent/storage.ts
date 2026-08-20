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

let cachedRaw: string | null | undefined
let cachedState: ConsentState = DEFAULT_STATE

function remember(raw: string | null, state: ConsentState): ConsentState {
  cachedRaw = raw
  cachedState = state
  return state
}

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_STATE

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (raw === cachedRaw) return cachedState
    if (!raw) return remember(raw, DEFAULT_STATE)

    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return remember(raw, DEFAULT_STATE)
    return remember(raw, parsed)
  } catch {
    return remember(null, DEFAULT_STATE)
  }
}

export function setConsentState(analytics: Exclude<ConsentChoice, null>): ConsentState {
  const state: ConsentState = {
    analytics,
    version: CONSENT_VERSION,
    updatedAt: Date.now(),
  }

  if (typeof window !== "undefined") {
    const raw = JSON.stringify(state)
    localStorage.setItem(CONSENT_STORAGE_KEY, raw)
    remember(raw, state)
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
    remember(null, DEFAULT_STATE)
    window.dispatchEvent(new CustomEvent("consent-change", { detail: DEFAULT_STATE }))
  }
}
