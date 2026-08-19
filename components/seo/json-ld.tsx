import profileData from "@/data/profile.json"
import type { AppLocale } from "@/lib/i18n/config"

interface JsonLdProps {
  locale?: AppLocale
}

export function JsonLd({ locale = "es" }: JsonLdProps) {
  const profile = profileData
  const role = profile.role[locale]
  const bio = profile.bio[locale]

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: role,
    email: profile.email,
    url: "https://www.andonivianez.info",
    image: "https://www.andonivianez.info/images/andoni-profile.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Astigarraga",
      addressRegion: "Gipuzkoa",
      addressCountry: "ES",
    },
    sameAs: [profile.links.linkedin, profile.links.github, profile.links.malt],
    knowsAbout: [
      "React Native",
      "Next.js",
      "TypeScript",
      "Local AI",
      "RAG",
      "Full Stack Development",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: locale === "es" ? "Andoni Vianez — Portfolio IA" : "Andoni Vianez — AI Portfolio",
    url: `https://www.andonivianez.info/${locale}`,
    description: bio,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    inLanguage: ["es", "en"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
