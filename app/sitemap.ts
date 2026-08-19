import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.andonivianez.info"
  const now = new Date()
  const paths = ["", "/about", "/ai-lab"] as const

  return paths.flatMap((path) =>
    locales.map((locale) => {
      const localizedPath = path === "" ? `/${locale}` : `/${locale}${path}`
      const alternates = Object.fromEntries(
        locales.map((lang) => [lang, path === "" ? `${base}/${lang}` : `${base}/${lang}${path}`]),
      )

      return {
        url: `${base}${localizedPath}`,
        lastModified: now,
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority: path === "" ? 1 : path === "/about" ? 0.8 : 0.7,
        alternates: { languages: alternates },
      }
    }),
  )
}
