import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useEffect } from "react"
import { describe, expect, it, vi } from "vitest"
import { AIChat } from "@/components/ai/ai-chat"
import { renderWithLanguage } from "@/test/helpers"

const ask = vi.fn()
const clear = vi.fn()
const setInput = vi.fn()
const initialize = vi.fn()

vi.mock("@/components/ai/chat-boot-sequence", () => ({
  ChatBootSequence: ({ onComplete }: { onComplete?: () => void }) => {
    useEffect(() => {
      onComplete?.()
    }, [onComplete])
    return null
  },
}))

vi.mock("@/hooks/use-ai-assistant", () => ({
  useAIAssistant: () => ({
    initialize,
    messages: [],
    input: "",
    setInput,
    isGenerating: false,
    ask,
    cancel: vi.fn(),
    clear,
    activeProvider: { id: "fallback", runsLocally: true, isGenerative: false },
    activeProviderId: "fallback",
    progress: null,
    error: "boom",
  }),
}))

describe("AIChat", () => {
  it("renders the hero chat and suggested questions", async () => {
    render(renderWithLanguage(<AIChat variant="hero" />))
    expect(initialize).toHaveBeenCalled()
    await waitFor(() => expect(screen.getByText("boom")).toBeInTheDocument())
    const suggestion = await screen.findAllByRole("button")
    expect(suggestion.length).toBeGreaterThan(0)
    await userEvent.click(screen.getByRole("button", { name: /Limpiar/i }))
    expect(clear).toHaveBeenCalled()
  })

  it("renders the default card variant", () => {
    render(renderWithLanguage(<AIChat />))
    expect(screen.getByText(/Pregúntame sobre mi experiencia/i)).toBeInTheDocument()
  })
})
