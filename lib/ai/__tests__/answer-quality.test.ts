import { describe, expect, it } from "vitest"
import { isWeakGeneratedAnswer } from "@/lib/ai/answer-quality"

describe("answer-quality", () => {
  it("rejects empty, leaked prompts and unrelated text", () => {
    expect(isWeakGeneratedAnswer("ok", "es")).toBe(true)
    expect(
      isWeakGeneratedAnswer("No encuentro información suficiente en el portfolio.", "es"),
    ).toBe(true)
    expect(isWeakGeneratedAnswer("You are the intelligent assistant of Andoni.", "en")).toBe(true)
    expect(
      isWeakGeneratedAnswer(
        "I enjoy gardening and baking sourdough every weekend.",
        "en",
        "[FAQ] React Native\nI have used React Native since BQ and Orbis.",
      ),
    ).toBe(true)
  })

  it("accepts grounded answers", () => {
    expect(
      isWeakGeneratedAnswer(
        "Llevo React Native desde BQ y ahora lo uso en Orbis en producción.",
        "es",
        "[FAQ] React Native\nLlevo React Native desde BQ y Orbis.",
      ),
    ).toBe(false)
    expect(isWeakGeneratedAnswer("I am available for freelance projects at kick-off.", "en")).toBe(
      false,
    )
  })
})
