import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.andonivianez.info"
  const now = new Date()
  const paths = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/ai-lab", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/legal/notice", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  return paths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => {
      const localizedPath = path === "" ? `/${locale}` : `/${locale}${path}`
      const alternates = Object.fromEntries(
        locales.map((lang) => [lang, path === "" ? `${base}/${lang}` : `${base}/${lang}${path}`]),
      )

      return {
        url: `${base}${localizedPath}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: alternates },
      }
    }),
  )
}
