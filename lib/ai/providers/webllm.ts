import { getWebLLMModel } from "../config"
import type { AIProvider, ProviderProgress } from "../types"

type WorkerMessage =
  | { type: "progress"; progress: ProviderProgress }
  | { type: "token"; token: string }
  | { type: "done"; text: string }
  | { type: "error"; message: string }

export class WebLLMProvider implements AIProvider {
  readonly id = "webllm" as const
  readonly label = "IA local · WebGPU"
  readonly isGenerative = true
  readonly runsLocally = true
  readonly privacyLabel = "IA privada · procesamiento 100% local en tu navegador"

  private worker: Worker | null = null
  private ready = false

  async isAvailable(): Promise<boolean> {
    if (typeof window === "undefined") return false
    return "gpu" in navigator
  }

  async initialize(onProgress?: (progress: ProviderProgress) => void): Promise<void> {
    if (!this.worker) {
      this.worker = new Worker(new URL("../webllm.worker.ts", import.meta.url), {
        type: "module",
      })
    }

    await new Promise<void>((resolve, reject) => {
      const modelId = getWebLLMModel()

      const handler = (event: MessageEvent<WorkerMessage>) => {
        const message = event.data
        if (message.type === "progress") {
          onProgress?.(message.progress)
        }
        if (message.type === "error") {
          this.worker?.removeEventListener("message", handler)
          reject(new Error(message.message))
        }
        if (message.type === "done" && message.text === "__ready__") {
          this.ready = true
          this.worker?.removeEventListener("message", handler)
          resolve()
        }
      }

      this.worker?.addEventListener("message", handler)
      this.worker?.postMessage({ type: "init", modelId })
    })
  }

  async generate(prompt: string, context?: string, signal?: AbortSignal): Promise<string> {
    const parts: string[] = []
    for await (const chunk of this.stream(prompt, context, signal)) {
      parts.push(chunk)
    }
    return parts.join("")
  }

  async *stream(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string> {
    if (!this.worker || !this.ready) {
      throw new Error("WebLLM worker not initialized")
    }

    const input = context ? `${context}\n\n${prompt}` : prompt
    const queue: string[] = []
    let done = false
    let error: Error | null = null
    let notify: (() => void) | null = null

    const handler = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data
      if (message.type === "token") {
        queue.push(message.token)
        notify?.()
      }
      if (message.type === "done" && message.text !== "__ready__") {
        done = true
        notify?.()
      }
      if (message.type === "error") {
        error = new Error(message.message)
        done = true
        notify?.()
      }
    }

    this.worker.addEventListener("message", handler)
    signal?.addEventListener("abort", () => {
      this.worker?.postMessage({ type: "abort" })
    })

    this.worker.postMessage({ type: "generate", prompt: input })

    try {
      while (!done || queue.length > 0) {
        signal?.throwIfAborted()
        if (error) throw error
        if (queue.length > 0) {
          yield queue.shift()!
          continue
        }
        await new Promise<void>((resolve) => {
          notify = resolve
        })
      }
    } finally {
      this.worker.removeEventListener("message", handler)
    }
  }

  getModelName(): string {
    return getWebLLMModel()
  }

  async dispose(): Promise<void> {
    this.worker?.terminate()
    this.worker = null
    this.ready = false
  }
}
