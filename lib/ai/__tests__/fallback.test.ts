import { describe, expect, it } from "vitest"
import {
  FallbackProvider,
  buildPromptBundle,
  createFallbackAnswer,
} from "@/lib/ai/providers/fallback"

describe("FallbackProvider", () => {
  const provider = new FallbackProvider()

  it("is always available and extractive", async () => {
    expect(await provider.isAvailable()).toBe(true)
    expect(provider.isGenerative).toBe(false)
    await provider.initialize()
  })

  it("returns insufficient info without context", async () => {
    const es = await provider.generate("¿Qué experiencia tiene?")
    const en = await provider.generate("What experience do they have?")
    expect(es).toMatch(/No encuentro/)
    expect(en).toMatch(/cannot find/)
  })

  it("extracts matching sentences from context", async () => {
    const context = "React Native is used for mobile apps. PHP is also used."
    const answer = await provider.generate("React Native mobile", context)
    expect(answer).toContain("React Native")
  })

  it("returns insufficient info when no sentence matches", async () => {
    const answer = await provider.generate("xyzabc", "Hola mundo.")
    expect(answer).toMatch(/cannot find|No encuentro/)
  })

  it("streams the generated answer", async () => {
    const chunks: string[] = []
    for await (const chunk of provider.stream("React Native", "React Native experience.")) {
      chunks.push(chunk)
    }
    expect(chunks.join("")).toContain("React Native")
  })

  it("builds prompt bundles for relevant and irrelevant questions", async () => {
    const relevant = buildPromptBundle("¿Qué experiencia tiene con React Native?", "es")
    expect(relevant.hasRelevantContext).toBe(true)
    expect(relevant.userPrompt).toContain("PREGUNTA:")

    const irrelevant = buildPromptBundle(
      "quantum physics doctorate mars capital",
      "en",
      "developer",
    )
    expect(irrelevant.hasRelevantContext).toBe(false)
    expect(irrelevant.userPrompt).toBe("")

    const helper = await createFallbackAnswer("React Native", "en", "React Native apps.")
    expect(helper).toContain("React Native")
  })
})
