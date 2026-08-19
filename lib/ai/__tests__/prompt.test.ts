import { describe, expect, it } from "vitest"
import { buildSystemPrompt, buildUserPrompt } from "@/lib/ai/prompt"

describe("prompts", () => {
  it("builds localized system prompts", () => {
    expect(buildSystemPrompt("Andoni", "es")).toContain("portfolio profesional")
    expect(buildSystemPrompt("Andoni", "en")).toContain("professional portfolio")
  })

  it("builds localized user prompts", () => {
    expect(buildUserPrompt("hola", "ctx", "es")).toContain("CONTEXTO:")
    expect(buildUserPrompt("hello", "ctx", "en")).toContain("QUESTION:")
  })
})
