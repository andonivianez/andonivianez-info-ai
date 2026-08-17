import { describe, expect, it } from "vitest"
import { buildContext, getInsufficientInfoMessage } from "@/lib/rag/context-builder"

describe("context-builder", () => {
  it("respects context budget", () => {
    const result = buildContext("React Native mobile apps", "en", 500)
    expect(result.context.length).toBeLessThanOrEqual(600)
  })

  it("returns insufficient message context for unrelated queries", () => {
    const result = buildContext("quantum physics doctorate", "en", 2000, 10)
    expect(result.hasRelevantContext).toBe(false)
    expect(result.context).toBe("")
  })

  it("provides localized insufficient info message", () => {
    expect(getInsufficientInfoMessage("es")).toContain("No encuentro")
    expect(getInsufficientInfoMessage("en")).toContain("cannot find")
  })
})
