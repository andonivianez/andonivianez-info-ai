import { describe, expect, it } from "vitest"
import {
  detectPromptLocale,
  extractContextFromPrompt,
  extractQuestionFromPrompt,
} from "@/lib/ai/prompt-parse"

describe("prompt-parse", () => {
  it("extracts question and context from a Spanish prompt", () => {
    const prompt =
      "intro\n\nCONTEXTO:\n[FAQ] Disponibilidad\nSí, estoy disponible.\n\nPREGUNTA:\n¿Estás disponible?"
    expect(extractQuestionFromPrompt(prompt)).toBe("¿Estás disponible?")
    expect(extractContextFromPrompt(prompt)).toContain("[FAQ]")
    expect(detectPromptLocale(prompt)).toBe("es")
  })

  it("extracts question and context from an English prompt", () => {
    const prompt =
      "intro\n\nCONTEXT:\n[FAQ] Availability\nYes, I am available.\n\nQUESTION:\nAre you available?"
    expect(extractQuestionFromPrompt(prompt)).toBe("Are you available?")
    expect(extractContextFromPrompt(prompt)).toContain("available")
    expect(detectPromptLocale(prompt)).toBe("en")
  })

  it("falls back when markers are missing", () => {
    expect(extractQuestionFromPrompt("hola qué tal")).toBe("hola qué tal")
    expect(extractContextFromPrompt("sin marcadores")).toBe("")
    expect(detectPromptLocale("What projects do you have")).toBe("en")
    expect(detectPromptLocale("hola, qué experiencia tienes")).toBe("es")
  })
})
