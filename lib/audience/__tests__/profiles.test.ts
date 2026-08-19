import { describe, expect, it } from "vitest"
import {
  AUDIENCE_PROFILES,
  getAudienceProfile,
  getSuggestedQuestions,
} from "@/lib/audience/profiles"

describe("audience profiles", () => {
  it("returns a known audience and defaults to general", () => {
    expect(getAudienceProfile("developer").id).toBe("developer")
    expect(getAudienceProfile("default").id).toBe("default")
    expect(getAudienceProfile("unknown" as never).id).toBe("default")
  })

  it("returns localized suggested questions", () => {
    const es = getSuggestedQuestions("recruiter", "es")
    const en = getSuggestedQuestions("recruiter", "en")
    expect(es[0]).toMatch(/experiencia|tecnolog|proyecto|IA/i)
    expect(en[0]).toMatch(/experience|technolog|project|AI/i)
    expect(AUDIENCE_PROFILES).toHaveLength(5)
  })
})
