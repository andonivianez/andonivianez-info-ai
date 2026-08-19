import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useAIRuntime } from "@/hooks/use-ai-runtime"
import type { AIProvider } from "@/lib/ai/types"

const selectBestProvider = vi.fn()
const detectAvailability = vi.fn()
const dispose = vi.fn()
const setForcedProvider = vi.fn()
const getProviders = vi.fn()

vi.mock("@/lib/ai/provider-manager", () => ({
  createProviderManager: () => ({
    selectBestProvider,
    detectAvailability,
    dispose,
    setForcedProvider,
    getProviders,
  }),
}))

vi.mock("@/lib/metrics/environment", () => ({
  detectRuntimeEnvironment: vi.fn(async () => ({
    browser: "Chrome",
    userAgent: "test",
    webgpu: false,
    chromeAI: false,
    webllm: false,
    platform: "test",
    language: "es",
  })),
}))

const fallback: AIProvider = {
  id: "fallback",
  label: "fallback",
  isGenerative: false,
  runsLocally: true,
  privacyLabel: "fallback",
  isAvailable: async () => true,
  initialize: async () => undefined,
  generate: async () => "ok",
}

describe("useAIRuntime", () => {
  beforeEach(() => {
    selectBestProvider.mockReset()
    detectAvailability.mockResolvedValue({ fallback: true, webllm: false, "chrome-ai": false })
    getProviders.mockReturnValue([fallback])
    selectBestProvider.mockResolvedValue(fallback)
  })

  it("initializes and exposes the active provider", async () => {
    const { result } = renderHook(() => useAIRuntime())
    await waitFor(() => expect(detectAvailability).toHaveBeenCalled())

    await act(async () => {
      await result.current.initialize()
    })

    expect(result.current.initialized).toBe(true)
    expect(result.current.activeProviderId).toBe("fallback")
    expect(result.current.activeProvider?.id).toBe("fallback")
  })

  it("captures initialization errors", async () => {
    selectBestProvider.mockRejectedValueOnce(new Error("boom"))
    const { result } = renderHook(() => useAIRuntime())

    await act(async () => {
      await result.current.initialize()
    })

    expect(result.current.error).toBe("boom")
    expect(result.current.initialized).toBe(false)
  })

  it("switches provider and reports switch errors", async () => {
    const { result } = renderHook(() => useAIRuntime())

    await act(async () => {
      await result.current.switchProvider("fallback")
    })
    expect(result.current.activeProviderId).toBe("fallback")

    selectBestProvider.mockRejectedValueOnce("fail")
    await act(async () => {
      await result.current.switchProvider("webllm")
    })
    expect(result.current.error).toBe("Error switching provider")
  })
})
