import { describe, expect, it, vi } from "vitest"
import { AIProviderManager } from "@/lib/ai/provider-manager"
import type { AIProvider, ProviderProgress } from "@/lib/ai/types"

function createMockProvider(
  id: AIProvider["id"],
  available: boolean,
  shouldFailInit = false,
): AIProvider {
  return {
    id,
    label: id,
    isGenerative: id !== "fallback",
    runsLocally: true,
    privacyLabel: id,
    isAvailable: vi.fn(async () => available),
    initialize: vi.fn(async (_onProgress?: (p: ProviderProgress) => void) => {
      if (shouldFailInit) throw new Error("init failed")
    }),
    generate: vi.fn(async () => `response from ${id}`),
    stream: vi.fn(async function* () {
      yield `response from ${id}`
    }),
  }
}

describe("AIProviderManager", () => {
  it("selects first available provider by priority", async () => {
    const manager = new AIProviderManager([
      createMockProvider("chrome-ai", false),
      createMockProvider("webllm", true),
      createMockProvider("fallback", true),
    ])

    const provider = await manager.selectBestProvider()
    expect(provider.id).toBe("webllm")
  })

  it("falls back when all generative providers fail init", async () => {
    const manager = new AIProviderManager([
      createMockProvider("chrome-ai", true, true),
      createMockProvider("webllm", true, true),
      createMockProvider("fallback", true),
    ])

    const provider = await manager.selectBestProvider()
    expect(provider.id).toBe("fallback")
  })

  it("uses forced provider when set", async () => {
    const fallback = createMockProvider("fallback", true)
    const manager = new AIProviderManager([
      createMockProvider("chrome-ai", true),
      createMockProvider("webllm", true),
      fallback,
    ])

    manager.setForcedProvider("fallback")
    const provider = await manager.selectBestProvider()
    expect(provider.id).toBe("fallback")
  })
})
