import { afterEach, describe, expect, it, vi } from "vitest"
import {
  checkChromeAIAvailability,
  ChromeAIProvider,
  createChromePrompt,
} from "@/lib/ai/providers/chrome-ai"

function mockLanguageModel(overrides?: {
  availability?: string
  prompt?: (input: string) => Promise<string>
  stream?: AsyncIterable<string>
  throwOnAvailability?: boolean
}) {
  const session = {
    prompt: overrides?.prompt ?? vi.fn(async () => "nano reply"),
    promptStreaming: overrides?.stream ? () => overrides.stream : undefined,
    destroy: vi.fn(),
  }

  const languageModel = {
    availability: vi.fn(async () => {
      if (overrides?.throwOnAvailability) throw new Error("nope")
      return overrides?.availability ?? "available"
    }),
    create: vi.fn(async ({ monitor }: { monitor?: (m: EventTarget) => void }) => {
      const target = new EventTarget()
      monitor?.(target)
      target.dispatchEvent(new ProgressEvent("downloadprogress", { loaded: 0.4 }))
      return session
    }),
  }

  Object.defineProperty(window, "LanguageModel", {
    configurable: true,
    value: languageModel,
  })

  return { languageModel, session }
}

describe("ChromeAIProvider", () => {
  afterEach(() => {
    delete (window as Window & { LanguageModel?: unknown }).LanguageModel
  })

  it("is unavailable without the Prompt API", async () => {
    const provider = new ChromeAIProvider()
    expect(await provider.isAvailable()).toBe(false)
    expect(await checkChromeAIAvailability()).toBe("unavailable")
  })

  it("reports availability and handles errors", async () => {
    mockLanguageModel({ availability: "available" })
    expect(await new ChromeAIProvider().isAvailable()).toBe(true)
    expect(await checkChromeAIAvailability()).toBe("available")

    mockLanguageModel({ throwOnAvailability: true })
    expect(await new ChromeAIProvider().isAvailable()).toBe(false)
  })

  it("initializes, streams and disposes", async () => {
    const { session } = mockLanguageModel({
      stream: {
        [Symbol.asyncIterator]: async function* () {
          yield "hola"
          yield " mundo"
        },
      },
    })
    const provider = new ChromeAIProvider()
    const progress = vi.fn()
    await provider.initialize(progress)
    expect(progress).toHaveBeenCalled()

    const chunks: string[] = []
    for await (const chunk of provider.stream("pregunta", "contexto")) {
      chunks.push(chunk)
    }
    expect(chunks.join("")).toBe("hola mundo")
    expect(await provider.generate("pregunta")).toBe("hola mundo")
    expect(provider.getModelName()).toBe("Gemini Nano")

    await provider.dispose()
    expect(session.destroy).toHaveBeenCalled()
  })

  it("falls back to prompt when streaming is missing", async () => {
    mockLanguageModel({ availability: "downloadable" })
    const provider = new ChromeAIProvider()
    await provider.initialize()
    const chunks: string[] = []
    for await (const chunk of provider.stream("q")) chunks.push(chunk)
    expect(chunks.join("")).toBe("nano reply")
  })

  it("throws when session is missing or API is gone", async () => {
    const provider = new ChromeAIProvider()
    await expect(
      (async () => {
        for await (const _chunk of provider.stream("q")) {
          void _chunk
        }
      })(),
    ).rejects.toThrow("not initialized")
    await expect(provider.initialize()).rejects.toThrow("not available")

    mockLanguageModel({ availability: "unavailable" })
    await expect(new ChromeAIProvider().initialize()).rejects.toThrow("unavailable")
  })

  it("builds a chrome prompt bundle", () => {
    const bundle = createChromePrompt("¿Tiene experiencia con IA?", "es")
    expect(bundle.systemPrompt).toContain("Andoni")
  })
})
