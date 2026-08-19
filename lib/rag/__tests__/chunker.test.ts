import { describe, expect, it } from "vitest"
import { buildChunks, getChunksBySource } from "@/lib/rag/chunker"

describe("chunker", () => {
  it("builds chunks for all portfolio sources", () => {
    const chunks = buildChunks("es")
    expect(chunks.length).toBeGreaterThan(10)
    expect(chunks.some((c) => c.source === "profile")).toBe(true)
    expect(chunks.some((c) => c.source === "experience")).toBe(true)
    expect(chunks.some((c) => c.source === "project")).toBe(true)
  })

  it("localizes content by locale", () => {
    const esChunks = buildChunks("es")
    const enChunks = buildChunks("en")
    expect(esChunks[0]?.text).not.toEqual(enChunks[0]?.text)
  })

  it("indexes certifications, soft skills and summaries", () => {
    const chunks = buildChunks("es")
    expect(chunks.some((c) => c.source === "certification")).toBe(true)
    expect(chunks.some((c) => c.source === "softskill")).toBe(true)
    expect(chunks.some((c) => c.source === "summary")).toBe(true)
    expect(getChunksBySource("education", "es").length).toBeGreaterThan(0)
  })
})
