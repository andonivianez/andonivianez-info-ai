import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { ChatBootSequence } from "@/components/ai/chat-boot-sequence"
import { renderWithLanguage } from "@/test/helpers"

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>()
  return {
    ...actual,
    useReducedMotion: () => true,
  }
})

describe("ChatBootSequence", () => {
  it("skips animation when reduced motion is preferred", async () => {
    const onComplete = vi.fn()
    render(renderWithLanguage(<ChatBootSequence onComplete={onComplete} />))
    await waitFor(() => expect(onComplete).toHaveBeenCalled())
    expect(screen.queryByLabelText("Boot sequence")).not.toBeInTheDocument()
  })

  it("still completes in English", async () => {
    const onComplete = vi.fn()
    render(renderWithLanguage(<ChatBootSequence onComplete={onComplete} />, "en"))
    await waitFor(() => expect(onComplete).toHaveBeenCalled())
    expect(screen.queryByLabelText("Boot sequence")).not.toBeInTheDocument()
  })
})
