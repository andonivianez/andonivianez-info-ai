import { describe, expect, it } from "vitest"
import { AUDIENCE_PROFILES } from "@/lib/audience/profiles"
import { retrieve } from "@/lib/rag/retriever"
import type { Chunk } from "@/lib/portfolio/types"

describe("retriever suggested questions", () => {
  for (const profile of AUDIENCE_PROFILES) {
    for (const locale of ["es", "en"] as const) {
      for (const question of profile.suggestedQuestions[locale]) {
        it(`[${profile.id}/${locale}] "${question}"`, () => {
          const sourceBoost = profile.sourceWeights as Partial<Record<Chunk["source"], number>>
          const result = retrieve(question, { locale, sourceBoost })
          expect(result.hasRelevantContext).toBe(true)
          expect(result.topScore).toBeGreaterThanOrEqual(1)
        })
      }
    }
  }
})
