import { describe, expect, it } from "vitest"
import { DEFAULT_CONTEXT_BUDGET, DEFAULT_MIN_SCORE, buildChunks, retrieve } from "@/lib/rag"

describe("rag barrel", () => {
  it("re-exports the public API", () => {
    expect(DEFAULT_CONTEXT_BUDGET).toBeGreaterThan(0)
    expect(DEFAULT_MIN_SCORE).toBe(1)
    expect(buildChunks("es").length).toBeGreaterThan(0)
    expect(retrieve("React Native", { locale: "es" }).hasRelevantContext).toBe(true)
  })
})
