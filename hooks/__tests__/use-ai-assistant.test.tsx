import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useAIAssistant } from "@/hooks/use-ai-assistant"

const initialize = vi.fn()
const generate = vi.fn()
const stream = vi.fn()
const runtime = {
  initialize,
  initialized: false,
  activeProviderId: "fallback" as const,
  activeProvider: {
    id: "fallback" as const,
    isGenerative: false,
    stream: stream as undefined | typeof stream,
    generate,
  },
  manager: { selectBestProvider: vi.fn() },
}

vi.mock("@/hooks/use-ai-runtime", () => ({
  useAIRuntime: () => runtime,
}))

describe("useAIAssistant", () => {
  beforeEach(() => {
    initialize.mockResolvedValue(undefined)
    runtime.initialized = false
    runtime.activeProvider.stream = stream
    stream.mockReset()
    generate.mockReset()
  })

  it("ignores empty questions", async () => {
    const { result } = renderHook(() => useAIAssistant("es"))
    await act(async () => {
      await result.current.ask("   ")
    })
    expect(result.current.messages).toHaveLength(0)
  })

  it("answers without LLM when there is no relevant context", async () => {
    const { result } = renderHook(() => useAIAssistant("es"))
    await act(async () => {
      await result.current.ask("quantum physics doctorate mars capital xyz")
    })
    expect(result.current.messages[1]?.content).toMatch(/No encuentro/)
  })

  it("streams a relevant answer and can clear it", async () => {
    stream.mockImplementation(async function* () {
      yield "React "
      yield "Native"
    })
    const { result } = renderHook(() => useAIAssistant("es"))

    await act(async () => {
      result.current.setInput("¿Qué experiencia tiene con React Native?")
      await result.current.ask("¿Qué experiencia tiene con React Native?")
    })

    expect(result.current.messages.some((m) => m.content.includes("React"))).toBe(true)

    act(() => {
      result.current.clear()
    })
    expect(result.current.messages).toHaveLength(0)
    expect(result.current.input).toBe("")
  })

  it("uses generate when stream is missing", async () => {
    runtime.activeProvider.stream = undefined
    generate.mockResolvedValue("respuesta")
    const { result } = renderHook(() => useAIAssistant("en"))

    await act(async () => {
      await result.current.ask("What React Native experience do they have?")
    })

    expect(generate).toHaveBeenCalled()
    expect(result.current.messages.at(-1)?.content).toBe("respuesta")
  })

  it("reports generation errors in English", async () => {
    runtime.activeProvider.stream = undefined
    generate.mockRejectedValue(new Error("fail"))
    const { result } = renderHook(() => useAIAssistant("en"))

    await act(async () => {
      await result.current.ask("What React Native experience do they have?")
    })

    expect(result.current.messages.at(-1)?.content).toMatch(/error occurred/)
  })

  it("cancels an in-flight request", () => {
    const { result } = renderHook(() => useAIAssistant("es"))
    act(() => {
      result.current.cancel()
    })
    expect(result.current.isGenerating).toBe(false)
  })
})
