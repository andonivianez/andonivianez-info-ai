import { afterEach, describe, expect, it, vi } from "vitest"
import { WebLLMProvider } from "@/lib/ai/providers/webllm"

class MockWorker {
  listeners = new Set<(event: MessageEvent) => void>()
  postMessage = vi.fn((data: { type: string }) => {
    if (data.type === "init") {
      queueMicrotask(() => {
        this.emit({ type: "progress", progress: { state: "checking", detail: "init" } })
        this.emit({ type: "done", text: "__ready__" })
      })
    }
    if (data.type === "generate") {
      queueMicrotask(() => {
        this.emit({ type: "token", token: "hi" })
        this.emit({ type: "done", text: "hi" })
      })
    }
  })
  terminate = vi.fn()
  addEventListener = (_type: string, handler: (event: MessageEvent) => void) => {
    this.listeners.add(handler)
  }
  removeEventListener = (_type: string, handler: (event: MessageEvent) => void) => {
    this.listeners.delete(handler)
  }
  emit(data: unknown) {
    const event = { data } as MessageEvent
    this.listeners.forEach((listener) => listener(event))
  }
}

describe("WebLLMProvider", () => {
  const originalWorker = globalThis.Worker

  afterEach(() => {
    globalThis.Worker = originalWorker
    Object.defineProperty(navigator, "gpu", { configurable: true, value: undefined })
  })

  it("is unavailable without WebGPU", async () => {
    const provider = new WebLLMProvider()
    expect(await provider.isAvailable()).toBe(false)
  })

  it("initializes via worker and streams tokens", async () => {
    Object.defineProperty(navigator, "gpu", { configurable: true, value: {} })
    globalThis.Worker = MockWorker as unknown as typeof Worker

    const provider = new WebLLMProvider()
    expect(await provider.isAvailable()).toBe(true)
    await provider.initialize(vi.fn())
    expect(await provider.generate("hola", "ctx")).toBe("hi")
    expect(provider.getModelName()).toBeTruthy()
    await provider.dispose()
  })

  it("throws before initialization", async () => {
    const provider = new WebLLMProvider()
    await expect(
      (async () => {
        for await (const _chunk of provider.stream("q")) {
          void _chunk
        }
      })(),
    ).rejects.toThrow("not initialized")
  })

  it("rejects when the worker reports an error", async () => {
    class ErrorWorker extends MockWorker {
      postMessage = vi.fn((data: { type: string }) => {
        if (data.type === "init") {
          queueMicrotask(() => this.emit({ type: "error", message: "boom" }))
        }
      })
    }
    globalThis.Worker = ErrorWorker as unknown as typeof Worker
    await expect(new WebLLMProvider().initialize()).rejects.toThrow("boom")
  })
})
