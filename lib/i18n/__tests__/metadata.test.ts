import { describe, expect, it } from "vitest"
import { buildPageMetadata, buildRootMetadata, pageMetadata } from "@/lib/i18n/metadata"

describe("i18n metadata", () => {
  it("builds page metadata with hreflang alternates", () => {
    const meta = buildPageMetadata("es", "about", "/about")
    expect(meta.title).toBe(pageMetadata.es.about.title)
    expect(meta.alternates?.canonical).toBe("/es/about")
    expect(meta.alternates?.languages).toMatchObject({
      es: "https://www.andonivianez.info/es/about",
      en: "https://www.andonivianez.info/en/about",
      "x-default": "https://www.andonivianez.info/es/about",
    })
    expect(meta.openGraph?.locale).toBe("es_ES")
  })

  it("builds home metadata without extra path", () => {
    const meta = buildPageMetadata("en", "home", "/")
    expect(meta.alternates?.canonical).toBe("/en")
    expect(meta.openGraph?.url).toBe("https://www.andonivianez.info/en")
    expect(meta.openGraph?.locale).toBe("en_US")
  })

  it("builds root metadata per locale", () => {
    const es = buildRootMetadata("es")
    const en = buildRootMetadata("en")
    expect(es.openGraph?.siteName).toContain("Portfolio IA")
    expect(en.openGraph?.siteName).toContain("AI Portfolio")
    expect(es.description).toBe(pageMetadata.es.home.description)
  })
})
