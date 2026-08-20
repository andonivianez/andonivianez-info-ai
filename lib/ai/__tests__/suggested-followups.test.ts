import { describe, expect, it } from "vitest"
import { getFollowUpQuestions } from "@/lib/ai/suggested-followups"
import type { Chunk } from "@/lib/portfolio/types"

function chunk(source: Chunk["source"], title: string, sourceId = source): Chunk {
  return {
    id: `${source}-${sourceId}`,
    source,
    sourceId,
    title,
    text: title,
    keywords: [],
    locale: "es",
    score: 3,
  }
}

describe("suggested follow-ups", () => {
  it("builds questions from retrieved sources", () => {
    const questions = getFollowUpQuestions(
      [chunk("experience", "Full Stack @ Orbis"), chunk("project", "ConnectHealth")],
      "es",
      2,
    )
    expect(questions[0]).toMatch(/Orbis/)
    expect(questions[1]).toMatch(/ConnectHealth/)
  })

  it("deduplicates and fills with locale fallbacks", () => {
    const questions = getFollowUpQuestions(
      [chunk("faq", "Disponibilidad"), chunk("faq", "Disponibilidad 2")],
      "en",
      3,
    )
    expect(questions).toHaveLength(3)
    expect(new Set(questions).size).toBe(3)
    expect(questions.some((q) => /available/i.test(q))).toBe(true)
  })

  it("skips sources without a template", () => {
    const questions = getFollowUpQuestions([chunk("summary", "Resumen")], "es", 2)
    expect(questions.length).toBe(2)
    expect(questions[0]).toMatch(/servicios freelance/i)
  })
})
