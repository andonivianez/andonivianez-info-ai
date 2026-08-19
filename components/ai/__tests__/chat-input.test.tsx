import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ChatInput } from "@/components/ai/chat-input"

describe("ChatInput", () => {
  it("submits on click and Enter, but not Shift+Enter", async () => {
    const onSubmit = vi.fn()
    const onChange = vi.fn()
    render(
      <ChatInput
        value="hola"
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder="pregunta"
        sendLabel="Enviar"
        cancelLabel="Cancelar"
        variant="hero"
      />,
    )

    await userEvent.click(screen.getByRole("button", { name: "Enviar" }))
    expect(onSubmit).toHaveBeenCalled()

    const textarea = screen.getByPlaceholderText("pregunta")
    await userEvent.type(textarea, "x")
    expect(onChange).toHaveBeenCalled()
    await userEvent.type(textarea, "{Enter}")
    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it("shows a cancel button while generating", async () => {
    const onCancel = vi.fn()
    render(
      <ChatInput
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onCancel={onCancel}
        isGenerating
        sendLabel="Enviar"
        cancelLabel="Cancelar"
      />,
    )
    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }))
    expect(onCancel).toHaveBeenCalled()
  })
})
