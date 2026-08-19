import { describe, expect, it } from "vitest"
import {
  defaultLocale,
  isValidLocale,
  localizedPath,
  locales,
  stripLocalePrefix,
  switchLocalePath,
} from "@/lib/i18n/config"

describe("i18n config", () => {
  it("accepts supported locales", () => {
    expect(locales).toEqual(["es", "en"])
    expect(defaultLocale).toBe("es")
    expect(isValidLocale("es")).toBe(true)
    expect(isValidLocale("en")).toBe(true)
    expect(isValidLocale("fr")).toBe(false)
  })

  it("builds localized paths", () => {
    expect(localizedPath("/", "es")).toBe("/es")
    expect(localizedPath("/about", "en")).toBe("/en/about")
    expect(localizedPath("ai-lab", "es")).toBe("/es/ai-lab")
  })

  it("switches locale prefix", () => {
    expect(switchLocalePath("/es/about", "en")).toBe("/en/about")
    expect(switchLocalePath("/about", "en")).toBe("/en/about")
    expect(switchLocalePath("/", "en")).toBe("/en")
  })

  it("strips locale prefix", () => {
    expect(stripLocalePrefix("/es/about")).toBe("/about")
    expect(stripLocalePrefix("/en")).toBe("/")
    expect(stripLocalePrefix("/about")).toBe("/about")
    expect(stripLocalePrefix("")).toBe("/")
  })
})
