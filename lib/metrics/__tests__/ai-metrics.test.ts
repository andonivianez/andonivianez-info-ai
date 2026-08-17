import { describe, expect, it, beforeEach } from "vitest"
import { LocalStorageMetricsStore, createMetric } from "@/lib/metrics/ai-metrics"

describe("ai-metrics", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("stores and summarizes metrics", () => {
    const store = new LocalStorageMetricsStore()
    store.add(
      createMetric({
        provider: "fallback",
        questionLength: 20,
        contextLength: 100,
        responseLength: 50,
        retrievalTime: 5,
        generationTime: 10,
        totalTime: 15,
        success: true,
        answeredWithoutLLM: true,
        chunksRetrieved: 2,
        topScore: 3,
        locale: "es",
      }),
    )

    const summary = store.summary()
    expect(summary.totalQueries).toBe(1)
    expect(summary.averageTotalTime).toBe(15)
  })

  it("caps stored entries", () => {
    const store = new LocalStorageMetricsStore()
    for (let i = 0; i < 510; i += 1) {
      store.add(
        createMetric({
          provider: "fallback",
          questionLength: 1,
          contextLength: 1,
          responseLength: 1,
          retrievalTime: 1,
          generationTime: 1,
          totalTime: 1,
          success: true,
          answeredWithoutLLM: true,
          chunksRetrieved: 1,
          topScore: 1,
          locale: "es",
        }),
      )
    }
    expect(store.list().length).toBeLessThanOrEqual(500)
  })
})
