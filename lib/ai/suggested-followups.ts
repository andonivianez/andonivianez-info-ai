import type { Chunk, Locale } from "@/lib/portfolio/types"

const SOURCE_QUESTIONS: Partial<
  Record<Chunk["source"], { es: (title: string) => string; en: (title: string) => string }>
> = {
  experience: {
    es: (title) => `¿Qué hiciste en ${title.split("@")[1]?.trim() ?? title}?`,
    en: (title) => `What did you do at ${title.split("@")[1]?.trim() ?? title}?`,
  },
  project: {
    es: (title) => `Cuéntame más sobre ${title}`,
    en: (title) => `Tell me more about ${title}`,
  },
  service: {
    es: (title) => `¿Qué incluye ${title}?`,
    en: (title) => `What does ${title} include?`,
  },
  faq: {
    es: () => `¿Estás disponible para proyectos freelance?`,
    en: () => `Are you available for freelance projects?`,
  },
  boundary: {
    es: () => `¿Qué servicios sí ofreces?`,
    en: () => `What services do you offer?`,
  },
  media: {
    es: () => `¿Te han entrevistado en algún podcast?`,
    en: () => `Have you been interviewed on any podcast?`,
  },
  technology: {
    es: (title) => `¿Qué experiencia tienes con ${title}?`,
    en: (title) => `What experience do you have with ${title}?`,
  },
  availability: {
    es: () => `¿Cómo puedo contactarte?`,
    en: () => `How can I contact you?`,
  },
}

export function getFollowUpQuestions(chunks: Chunk[], locale: Locale, limit = 3): string[] {
  const seen = new Set<string>()
  const questions: string[] = []

  for (const chunk of chunks) {
    const factory = SOURCE_QUESTIONS[chunk.source]
    if (!factory) continue
    const question = factory[locale](chunk.title)
    const key = question.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(question)
    if (questions.length >= limit) break
  }

  if (questions.length < limit) {
    const fallbacks =
      locale === "es"
        ? ["¿Qué servicios freelance ofreces?", "¿Tienes experiencia con IA aplicada?"]
        : ["What freelance services do you offer?", "Do you have applied AI experience?"]
    for (const fb of fallbacks) {
      if (questions.length >= limit) break
      if (!seen.has(fb.toLowerCase())) questions.push(fb)
    }
  }

  return questions.slice(0, limit)
}
