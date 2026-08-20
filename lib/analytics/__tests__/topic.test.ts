import { describe, expect, it } from "vitest"
import {
  classifyTopic,
  extractControlledTerms,
  bucketLatency,
  bucketLength,
} from "@/lib/analytics/topic"
import type { Chunk } from "@/lib/portfolio/types"

describe("topic classifier", () => {
  it("extracts controlled vocabulary terms from query", () => {
    const terms = extractControlledTerms("¿Tienes experiencia con React Native y Node.js?")
    expect(terms.some((t) => t.includes("react") || t.includes("node"))).toBe(true)
  })

  it("does not include arbitrary user text as matched terms", () => {
    const terms = extractControlledTerms("mi empresa secreta xyz123 necesita un desarrollador")
    expect(terms.some((t) => t.includes("secreta") || t.includes("xyz123"))).toBe(false)
  })

  it("classifies topic from top chunk", () => {
    const chunks: Chunk[] = [
      {
        id: "faq-pricing",
        source: "faq",
        sourceId: "pricing",
        title: "Tarifas",
        text: "Presupuesto personalizado",
        keywords: ["tarifa"],
        locale: "es",
        score: 5,
      },
    ]
    const result = classifyTopic(chunks, "¿Cuáles son tus tarifas?")
    expect(result.topic).toBe("faq:pricing")
  })

  it("classifies unknown when there are no chunks", () => {
    expect(classifyTopic([], "hello").topic).toBe("unknown")
  })

  it("buckets latency and length into ranges", () => {
    expect(bucketLatency(200)).toBe("0-500ms")
    expect(bucketLatency(800)).toBe("500ms-1s")
    expect(bucketLatency(2000)).toBe("1s-3s")
    expect(bucketLatency(5000)).toBe("3s-10s")
    expect(bucketLatency(12000)).toBe("10s+")
    expect(bucketLength(10)).toBe("0-20")
    expect(bucketLength(30)).toBe("20-50")
    expect(bucketLength(80)).toBe("50-100")
    expect(bucketLength(140)).toBe("100+")
  })
})
