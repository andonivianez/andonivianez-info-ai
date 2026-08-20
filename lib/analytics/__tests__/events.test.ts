import { beforeEach, describe, expect, it, vi } from "vitest"

const track = vi.fn()
const hasAnalyticsConsent = vi.fn()

vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => track(...args),
}))

vi.mock("@/lib/consent/storage", () => ({
  hasAnalyticsConsent: () => hasAnalyticsConsent(),
}))

import { trackChatGap, trackChatQuestion } from "@/lib/analytics/events"

describe("analytics events", () => {
  beforeEach(() => {
    track.mockReset()
    hasAnalyticsConsent.mockReset()
  })

  it("does not track without consent", () => {
    hasAnalyticsConsent.mockReturnValue(false)
    trackChatQuestion({
      topic: "faq:pricing",
      matchedTerms: ["react"],
      provider: "fallback",
      locale: "es",
      answered: true,
      audience: "default",
      totalTimeMs: 120,
      questionLength: 18,
    })
    expect(track).not.toHaveBeenCalled()
  })

  it("tracks a chat question with buckets and first matched term", () => {
    hasAnalyticsConsent.mockReturnValue(true)
    trackChatQuestion({
      topic: "experience:orbis",
      matchedTerms: ["react", "node"],
      provider: "fallback",
      locale: "en",
      answered: false,
      audience: "recruiter",
      totalTimeMs: 800,
      questionLength: 40,
    })
    expect(track).toHaveBeenCalledWith(
      "chat_question",
      expect.objectContaining({
        topic: "experience:orbis",
        matchedTerm: "react",
        answered: "no",
        latencyBucket: "500ms-1s",
        questionLengthBucket: "20-50",
      }),
    )
  })

  it("tracks a chat gap with none when no matched terms", () => {
    hasAnalyticsConsent.mockReturnValue(true)
    trackChatGap("??", { topic: "unknown", matchedTerms: [] }, "es", "default")
    expect(track).toHaveBeenCalledWith(
      "chat_gap",
      expect.objectContaining({
        topic: "unknown",
        matchedTerm: "none",
        locale: "es",
      }),
    )
  })
})
