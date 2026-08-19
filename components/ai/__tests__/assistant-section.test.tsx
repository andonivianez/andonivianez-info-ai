import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { AssistantSection } from "@/components/ai/assistant-section"
import { renderWithLanguage } from "@/test/helpers"

vi.mock("@/components/ai/ai-chat", () => ({
  AIChat: () => <div>chat-mock</div>,
}))

describe("AssistantSection", () => {
  it("renders the assistant landmark", async () => {
    render(renderWithLanguage(<AssistantSection />))
    expect(document.getElementById("assistant")).toBeTruthy()
    expect(await screen.findByText("chat-mock")).toBeInTheDocument()
  })
})
