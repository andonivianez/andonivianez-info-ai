import { describe, expect, it } from "vitest"
import {
  extractUsableBody,
  parseContextBlocks,
  synthesizeExtractiveAnswer,
  synthesizeFromChunks,
} from "@/lib/ai/extractive-answer"
import type { Chunk } from "@/lib/portfolio/types"

describe("extractive-answer", () => {
  const context = `[FAQ] ¿Estás disponible para proyectos freelance?
¿Estás disponible para proyectos freelance? — Sí. Mi disponibilidad depende del proyecto y se valora en el kick-off.

[EXPERIENCE] Full Stack @ Orbis
Full Stack Developer. Orbis. Desarrollo del stack web. Tecnologías: React, Node.js.`

  it("parses labeled context blocks", () => {
    const blocks = parseContextBlocks(context)
    expect(blocks).toHaveLength(2)
    expect(blocks[0]?.source).toBe("faq")
  })

  it("strips the FAQ question prefix", () => {
    expect(extractUsableBody("faq", "¿Estás disponible? — Sí. Estoy disponible.")).toBe(
      "Sí. Estoy disponible.",
    )
  })

  it("prefers the FAQ answer over raw experience dumps", () => {
    const answer = synthesizeExtractiveAnswer(
      "¿Estás disponible para proyectos freelance?",
      context,
      "es",
    )
    expect(answer).toMatch(/disponibilidad|kick-off/i)
    expect(answer).not.toMatch(/Tecnologías:/)
  })

  it("returns insufficient info when nothing matches", () => {
    expect(synthesizeExtractiveAnswer("xyzabc", "Hola mundo.", "en")).toMatch(/cannot find/)
  })

  it("rewrites proficiency lines and synthesizes from chunks", () => {
    const chunks: Chunk[] = [
      {
        id: "tech-rn",
        source: "technology",
        sourceId: "rn",
        title: "React Native",
        text: "React Native (mobile) - proficiency 90%",
        keywords: ["react"],
        locale: "en",
      },
    ]
    expect(synthesizeFromChunks("React Native", chunks, "en")).toMatch(
      /experience with React Native/,
    )
  })

  it("lists several services for a broad offer question", () => {
    const services = `[SERVICE] Desarrollo web full stack
Aplicaciones web a medida con React y Next.js.

[SERVICE] Apps móviles multiplataforma
Apps iOS y Android con React Native.`
    const answer = synthesizeExtractiveAnswer("¿Qué servicios ofreces?", services, "es")
    expect(answer).toMatch(/Ofrezco/)
    expect(answer).toMatch(/Desarrollo web|React Native/i)
  })
})
