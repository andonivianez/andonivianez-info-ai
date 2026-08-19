"use client"

import { useCallback, useSyncExternalStore } from "react"
import {
  getConsentState,
  resetConsent,
  setConsentState,
  type ConsentChoice,
  type ConsentState,
} from "./storage"

const EMPTY_STATE: ConsentState = {
  analytics: null,
  version: "1",
  updatedAt: 0,
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("consent-change", onStoreChange)
  return () => window.removeEventListener("consent-change", onStoreChange)
}

function getSnapshot(): ConsentState {
  return getConsentState()
}

function getServerSnapshot(): ConsentState {
  return EMPTY_STATE
}

function subscribeHydrated(onStoreChange: () => void) {
  onStoreChange()
  return () => {}
}

function getClientHydratedSnapshot(): boolean {
  return true
}

function getServerHydratedSnapshot(): boolean {
  return false
}

export function useConsent() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = useSyncExternalStore(
    subscribeHydrated,
    getClientHydratedSnapshot,
    getServerHydratedSnapshot,
  )

  const accept = useCallback(() => {
    setConsentState("accepted")
  }, [])

  const reject = useCallback(() => {
    setConsentState("rejected")
  }, [])

  const reset = useCallback(() => {
    resetConsent()
  }, [])

  return {
    hydrated,
    analytics: state.analytics as ConsentChoice,
    hasChoice: state.analytics !== null,
    hasAnalyticsConsent: hydrated && state.analytics === "accepted",
    accept,
    reject,
    reset,
  }
}
