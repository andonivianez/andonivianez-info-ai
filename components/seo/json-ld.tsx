import profileData from "@/data/profile.json"

export function JsonLd() {
  const profile = profileData

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role.es,
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
    name: "Andoni Vianez — Portfolio IA",
    url: "https://www.andonivianez.info",
    description: profile.bio.es,
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
