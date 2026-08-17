import { buildPromptBundle } from "./fallback"
import type { AIProvider, ProviderProgress } from "../types"

type LanguageModelSession = {
  prompt: (input: string) => Promise<string>
  promptStreaming?: (input: string) => AsyncIterable<string>
  destroy?: () => void
}

declare global {
  interface Window {
    LanguageModel?: {
      availability: (options?: Record<string, unknown>) => Promise<string>
      create: (options?: {
        systemPrompt?: string
        monitor?: (m: EventTarget) => void
      }) => Promise<LanguageModelSession>
    }
  }
}

export class ChromeAIProvider implements AIProvider {
  readonly id = "chrome-ai" as const
  readonly label = "IA local · Chrome"
  readonly isGenerative = true
  readonly runsLocally = true
  readonly privacyLabel = "IA privada · procesamiento 100% local en tu navegador"

  private session: LanguageModelSession | null = null
  private modelName = "Gemini Nano"

  async isAvailable(): Promise<boolean> {
    if (typeof window === "undefined" || !window.LanguageModel) return false
    try {
      const status = await window.LanguageModel.availability({
        expectedInputs: [{ type: "text", languages: ["es", "en"] }],
        expectedOutputs: [{ type: "text", languages: ["es", "en"] }],
      })
      return status !== "unavailable"
    } catch {
      return false
    }
  }

  async initialize(onProgress?: (progress: ProviderProgress) => void): Promise<void> {
    if (!window.LanguageModel) {
      throw new Error("LanguageModel API not available")
    }

    onProgress?.({ state: "checking", detail: "Preparando IA local..." })

    const availability = await window.LanguageModel.availability({
      expectedInputs: [{ type: "text", languages: ["es", "en"] }],
      expectedOutputs: [{ type: "text", languages: ["es", "en"] }],
    })

    if (availability === "unavailable") {
      throw new Error("Chrome Built-in AI unavailable on this device")
    }

    if (availability === "downloadable" || availability === "downloading") {
      onProgress?.({ state: "downloading", progress: 0, detail: "Descargando modelo..." })
    }

    this.session = await window.LanguageModel.create({
      monitor(m) {
        m.addEventListener("downloadprogress", ((event: Event) => {
          const progressEvent = event as ProgressEvent
          onProgress?.({
            state: "downloading",
            progress: Math.round((progressEvent.loaded ?? 0) * 100),
            detail: "Descargando modelo...",
          })
        }) as EventListener)
      },
    })

    onProgress?.({ state: "ready", progress: 100, detail: "IA lista" })
  }

  async generate(prompt: string, context?: string, signal?: AbortSignal): Promise<string> {
    const parts: string[] = []
    for await (const chunk of this.stream(prompt, context, signal)) {
      parts.push(chunk)
    }
    return parts.join("")
  }

  async *stream(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string> {
    if (!this.session) {
      throw new Error("Chrome AI session not initialized")
    }

    const input = context ? `${context}\n\n${prompt}` : prompt
    signal?.throwIfAborted()

    if (this.session.promptStreaming) {
      for await (const chunk of this.session.promptStreaming(input)) {
        signal?.throwIfAborted()
        yield chunk
      }
      return
    }

    const result = await this.session.prompt(input)
    yield result
  }

  getModelName(): string {
    return this.modelName
  }

  async dispose(): Promise<void> {
    this.session?.destroy?.()
    this.session = null
  }
}

export async function checkChromeAIAvailability(): Promise<string> {
  if (!window.LanguageModel) return "unavailable"
  return window.LanguageModel.availability({
    expectedInputs: [{ type: "text" }],
    expectedOutputs: [{ type: "text" }],
  })
}

export function createChromePrompt(question: string, locale: "es" | "en") {
  return buildPromptBundle(question, locale)
}
