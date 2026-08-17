import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SuggestedQuestions } from "@/components/ai/suggested-questions"

describe("SuggestedQuestions", () => {
  it("calls onSelect when a question is clicked", async () => {
    const onSelect = vi.fn()
    render(<SuggestedQuestions questions={["¿Con qué tecnologías trabaja?"]} onSelect={onSelect} />)

    await userEvent.click(screen.getByRole("button", { name: /tecnologías/i }))
    expect(onSelect).toHaveBeenCalledWith("¿Con qué tecnologías trabaja?")
  })
})
