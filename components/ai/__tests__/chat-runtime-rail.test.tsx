import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ChatRuntimeRail } from "@/components/ai/chat-runtime-rail"
import type { AIProvider } from "@/lib/ai/types"

const localProvider = {
  runsLocally: true,
  isGenerative: true,
} as AIProvider

describe("ChatRuntimeRail", () => {
  it("toggles privacy detail and clears the chat", async () => {
    const onClear = vi.fn()
    render(
      <ChatRuntimeRail
        label="WebGPU"
        progress={{ state: "checking", detail: "Preparando", progress: 10 }}
        provider={localProvider}
        onClear={onClear}
        variant="hero"
        privacyLocal="local"
        privacyDetail="IA privada"
        privacyFallback="fallback"
        clearLabel="Limpiar"
      />,
    )

    expect(screen.getByText(/Preparando/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: /local/i }))
    expect(screen.getByText("IA privada")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Limpiar" }))
    expect(onClear).toHaveBeenCalled()
  })

  it("shows fallback privacy copy for extractive mode", async () => {
    render(
      <ChatRuntimeRail
        label="compat"
        provider={null}
        onClear={vi.fn()}
        privacyLocal="local"
        privacyDetail="privada"
        privacyFallback="Modo compatible"
        clearLabel="Clear"
      />,
    )
    await userEvent.click(screen.getByRole("button", { name: /^local$/i }))
    expect(screen.getByText("Modo compatible")).toBeInTheDocument()
  })
})
