"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createProviderManager, type AIProviderManager } from "@/lib/ai/provider-manager"
import type { ProviderId, ProviderProgress } from "@/lib/ai/types"
import { detectRuntimeEnvironment, type RuntimeEnvironment } from "@/lib/metrics/environment"

export function useAIRuntime() {
  const [manager] = useState<AIProviderManager>(() => createProviderManager())
  const [activeProviderId, setActiveProviderId] = useState<ProviderId | null>(null)
  const [progress, setProgress] = useState<ProviderProgress | null>(null)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availability, setAvailability] = useState<Record<ProviderId, boolean>>({
    "chrome-ai": false,
    webllm: false,
    fallback: true,
  })
  const [environment, setEnvironment] = useState<RuntimeEnvironment | null>(null)
  const [forcedProvider, setForcedProvider] = useState<ProviderId | null>(null)

  useEffect(() => {
    void detectRuntimeEnvironment().then(setEnvironment)
    void manager.detectAvailability().then(setAvailability)
    return () => {
      void manager.dispose()
    }
  }, [manager])

  const initialize = useCallback(async () => {
    setError(null)
    setProgress({ state: "checking", detail: "Preparando IA local..." })
    try {
      manager.setForcedProvider(forcedProvider)
      const provider = await manager.selectBestProvider(setProgress)
      setActiveProviderId(provider.id)
      setInitialized(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error initializing AI")
      setInitialized(false)
    }
  }, [manager, forcedProvider])

  const switchProvider = useCallback(
    async (providerId: ProviderId) => {
      setForcedProvider(providerId)
      manager.setForcedProvider(providerId)
      setInitialized(false)
      setError(null)
      try {
        const provider = await manager.selectBestProvider(setProgress)
        setActiveProviderId(provider.id)
        setInitialized(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error switching provider")
      }
    },
    [manager],
  )

  const activeProvider = useMemo(
    () => manager.getProviders().find((p) => p.id === activeProviderId) ?? null,
    [manager, activeProviderId],
  )

  return {
    manager,
    activeProvider,
    activeProviderId,
    progress,
    initialized,
    error,
    availability,
    environment,
    forcedProvider,
    initialize,
    switchProvider,
    setForcedProvider,
  }
}
