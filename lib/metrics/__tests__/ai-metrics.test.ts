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
    for (let i = 0; i < 250; i += 1) {
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
    expect(store.list().length).toBeLessThanOrEqual(200)
  })

  it("does not throw when localStorage quota is exceeded", () => {
    const store = new LocalStorageMetricsStore()
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

    const originalSetItem = Storage.prototype.setItem
    let attempts = 0
    Storage.prototype.setItem = function setItemMock(key: string, value: string) {
      if (key === "portfolio-ai-metrics") {
        attempts += 1
        if (attempts === 1) {
          const error = new DOMException("Quota exceeded", "QuotaExceededError")
          throw error
        }
      }
      return originalSetItem.call(this, key, value)
    }

    expect(() =>
      store.add(
        createMetric({
          provider: "chrome-ai",
          questionLength: 2,
          contextLength: 2,
          responseLength: 2,
          retrievalTime: 2,
          generationTime: 2,
          totalTime: 2,
          success: true,
          answeredWithoutLLM: false,
          chunksRetrieved: 2,
          topScore: 2,
          locale: "es",
          topic: "faq:pricing",
          matchedTerms: ["react"],
        }),
      ),
    ).not.toThrow()

    Storage.prototype.setItem = originalSetItem
    expect(store.list().length).toBeGreaterThan(0)
  })

  it("summarizes empty and mixed metrics and exports them", () => {
    const store = new LocalStorageMetricsStore()
    expect(store.summary().totalQueries).toBe(0)

    store.add(
      createMetric({
        provider: "fallback",
        questionLength: 2,
        contextLength: 4,
        responseLength: 6,
        retrievalTime: 1,
        generationTime: 2,
        totalTime: 3,
        success: false,
        answeredWithoutLLM: true,
        chunksRetrieved: 0,
        topScore: 0,
        locale: "en",
      }),
    )

    const summary = store.summary()
    expect(summary.errorCount).toBe(1)
    expect(store.exportJson()).toContain("fallback")
    expect(store.exportCsv()).toContain("provider")
    store.clear()
    expect(store.list()).toEqual([])
  })

  it("returns an empty list when stored JSON is invalid", () => {
    localStorage.setItem("portfolio-ai-metrics", "{not-json")
    const store = new LocalStorageMetricsStore()
    expect(store.list()).toEqual([])
  })
})
