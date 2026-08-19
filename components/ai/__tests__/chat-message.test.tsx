import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ChatMessageBubble, ChatTranscript } from "@/components/ai/chat-message"

describe("chat messages", () => {
  it("renders user and assistant bubbles", () => {
    render(
      <>
        <ChatMessageBubble message={{ id: "1", role: "user", content: "hola" }} variant="hero" />
        <ChatMessageBubble
          message={{ id: "2", role: "assistant", content: "respuesta" }}
          variant="hero"
          isStreaming
        />
      </>,
    )
    expect(screen.getByText("hola")).toBeInTheDocument()
    expect(screen.getByText("respuesta")).toBeInTheDocument()
  })

  it("shows the empty label and then messages", () => {
    const { rerender } = render(<ChatTranscript messages={[]} emptyLabel="Vacío" variant="hero" />)
    expect(screen.getByText("Vacío")).toBeInTheDocument()

    rerender(
      <ChatTranscript
        isGenerating
        emptyLabel="Vacío"
        variant="default"
        messages={[
          { id: "1", role: "user", content: "q" },
          { id: "2", role: "assistant", content: "a" },
        ]}
      />,
    )
    expect(screen.getByText("q")).toBeInTheDocument()
    expect(screen.getByText("a")).toBeInTheDocument()
  })
})
