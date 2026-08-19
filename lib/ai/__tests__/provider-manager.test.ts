import { describe, expect, it, vi } from "vitest"
import { AIProviderManager, createProviderManager } from "@/lib/ai/provider-manager"
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
  it("creates the default manager", () => {
    expect(
      createProviderManager()
        .getProviders()
        .map((p) => p.id),
    ).toEqual(["chrome-ai", "webllm", "fallback"])
  })

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

  it("detects availability and generates through the active provider", async () => {
    const webllm = createMockProvider("webllm", true)
    const manager = new AIProviderManager([
      createMockProvider("chrome-ai", false),
      webllm,
      createMockProvider("fallback", true),
    ])

    expect(await manager.detectAvailability()).toMatchObject({
      "chrome-ai": false,
      webllm: true,
      fallback: true,
    })

    expect(await manager.generate("hola")).toBe("response from webllm")
    const chunks: string[] = []
    for await (const chunk of manager.stream("hola")) chunks.push(chunk)
    expect(chunks.join("")).toBe("response from webllm")
    expect(manager.getActiveProvider()?.id).toBe("webllm")
    await manager.dispose()
    expect(manager.getActiveProvider()).toBeNull()
  })

  it("streams via generate when stream is missing", async () => {
    const fallback = createMockProvider("fallback", true)
    delete (fallback as { stream?: unknown }).stream
    const manager = new AIProviderManager([fallback])
    const chunks: string[] = []
    for await (const chunk of manager.stream("q")) chunks.push(chunk)
    expect(chunks.join("")).toBe("response from fallback")
  })

  it("throws when a forced provider is missing or unavailable", async () => {
    const manager = new AIProviderManager([createMockProvider("fallback", true)])
    manager.setForcedProvider("webllm")
    await expect(manager.selectBestProvider()).rejects.toThrow("not found")

    const unavailable = new AIProviderManager([createMockProvider("fallback", false)])
    unavailable.setForcedProvider("fallback")
    await expect(unavailable.selectBestProvider()).rejects.toThrow("not available")
  })

  it("throws when no fallback is configured", async () => {
    const manager = new AIProviderManager([createMockProvider("chrome-ai", false)])
    await expect(manager.selectBestProvider()).rejects.toThrow("No fallback provider configured")
  })
})
