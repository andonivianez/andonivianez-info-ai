import { describe, expect, it } from "vitest"
import { retrieve } from "@/lib/rag/retriever"

describe("retriever", () => {
  it("finds React Native experience for mobile questions", () => {
    const result = retrieve("¿Ha desarrollado aplicaciones móviles?", { locale: "es" })
    expect(result.hasRelevantContext).toBe(true)
    expect(result.chunks.some((c) => c.text.toLowerCase().includes("react native"))).toBe(true)
  })

  it("finds AI-related projects", () => {
    const result = retrieve("¿Qué proyectos relacionados con IA ha realizado?", { locale: "es" })
    expect(result.hasRelevantContext).toBe(true)
    expect(result.chunks.some((c) => c.source === "project")).toBe(true)
  })

  it("returns low score for unrelated questions", () => {
    const result = retrieve("¿Cuál es la capital de Marte?", { locale: "es", minScore: 5 })
    expect(result.hasRelevantContext).toBe(false)
  })

  it("finds backend technologies", () => {
    const result = retrieve("¿Qué experiencia tiene con backend?", { locale: "es" })
    expect(result.hasRelevantContext).toBe(true)
    expect(result.topScore).toBeGreaterThan(2)
  })
})
