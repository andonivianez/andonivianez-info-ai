import { describe, expect, it } from "vitest"
import { generateStaticParams, resolveLocale } from "@/lib/i18n/routing"

describe("i18n routing", () => {
  it("generates static params for both locales", () => {
    expect(generateStaticParams()).toEqual([{ lang: "es" }, { lang: "en" }])
  })

  it("resolves valid locales", () => {
    expect(resolveLocale("es")).toBe("es")
    expect(resolveLocale("en")).toBe("en")
  })

  it("throws for invalid locales", () => {
    expect(() => resolveLocale("fr")).toThrow("NEXT_NOT_FOUND")
  })
})
