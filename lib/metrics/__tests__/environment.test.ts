import { afterEach, describe, expect, it, vi } from "vitest"
import { detectRuntimeEnvironment } from "@/lib/metrics/environment"

describe("detectRuntimeEnvironment", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("detects Chrome with WebGPU and Chrome AI", async () => {
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 Chrome/120.0",
      platform: "MacIntel",
      language: "es-ES",
      gpu: { requestAdapter: vi.fn(async () => ({})) },
    })
    vi.stubGlobal("LanguageModel", { availability: vi.fn(async () => "available") })

    const env = await detectRuntimeEnvironment()
    expect(env.browser).toBe("Chrome")
    expect(env.webgpu).toBe(true)
    expect(env.chromeAI).toBe(true)
    expect(env.webllm).toBe(true)
  })

  it("detects Firefox, Safari and Edge", async () => {
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 Firefox/128.0",
      platform: "Linux",
      language: "en",
    })
    expect((await detectRuntimeEnvironment()).browser).toBe("Firefox")

    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 Safari/605.1.15",
      platform: "iPhone",
      language: "en",
    })
    expect((await detectRuntimeEnvironment()).browser).toBe("Safari")

    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 Edg/120.0 Chrome/120.0",
      platform: "Win32",
      language: "en",
    })
    expect((await detectRuntimeEnvironment()).browser).toBe("Edge")
  })

  it("handles adapter and LanguageModel failures", async () => {
    vi.stubGlobal("navigator", {
      userAgent: "Custom",
      platform: "unknown",
      language: "es",
      gpu: {
        requestAdapter: vi.fn(async () => {
          throw new Error("no gpu")
        }),
      },
    })
    vi.stubGlobal("LanguageModel", {
      availability: vi.fn(async () => {
        throw new Error("no ai")
      }),
    })
    const env = await detectRuntimeEnvironment()
    expect(env.browser).toBe("unknown")
    expect(env.webgpu).toBe(false)
    expect(env.chromeAI).toBe(false)
  })
})
