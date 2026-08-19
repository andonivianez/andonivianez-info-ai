import { describe, expect, it, beforeEach } from "vitest"
import {
  CONSENT_STORAGE_KEY,
  getConsentState,
  hasAnalyticsConsent,
  setConsentState,
} from "@/lib/consent/storage"

describe("consent storage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("defaults to no choice", () => {
    expect(getConsentState().analytics).toBeNull()
    expect(hasAnalyticsConsent()).toBe(false)
  })

  it("persists accepted analytics consent", () => {
    setConsentState("accepted")
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeTruthy()
    expect(hasAnalyticsConsent()).toBe(true)
  })

  it("persists rejected analytics consent", () => {
    setConsentState("rejected")
    expect(hasAnalyticsConsent()).toBe(false)
  })
})
