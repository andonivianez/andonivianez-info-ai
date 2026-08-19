export type AudienceType = "recruiter" | "developer" | "client" | "company" | "default"

export interface AudienceProfile {
  id: AudienceType
  label: LocalizedLabel
  suggestedQuestions: { es: string[]; en: string[] }
  sourceWeights: Partial<Record<string, number>>
}

type LocalizedLabel = { es: string; en: string }

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  {
    id: "recruiter",
    label: { es: "Recruiter", en: "Recruiter" },
    suggestedQuestions: {
      es: [
        "¿Cuál es tu experiencia principal?",
        "¿Estás buscando empleo?",
        "¿Qué tecnologías dominas?",
        "¿Tienes experiencia con IA aplicada?",
      ],
      en: [
        "What is your main experience?",
        "Are you looking for employment?",
        "What technologies do you master?",
        "Do you have applied AI experience?",
      ],
    },
    sourceWeights: {
      experience: 1.3,
      technology: 1.2,
      project: 1.1,
      faq: 1.15,
      boundary: 1.1,
      media: 1.05,
    },
  },
  {
    id: "developer",
    label: { es: "Desarrollador", en: "Developer" },
    suggestedQuestions: {
      es: [
        "¿Qué stack utilizas habitualmente?",
        "¿Cómo funciona el RAG de este portfolio?",
        "¿Tienes código en GitHub?",
        "¿Qué experiencia tienes con React Native?",
      ],
      en: [
        "What stack do you typically use?",
        "How does this portfolio's RAG work?",
        "Do you have code on GitHub?",
        "What React Native experience do you have?",
      ],
    },
    sourceWeights: {
      project: 1.3,
      technology: 1.25,
      experience: 1.1,
      boundary: 1.1,
      media: 1.05,
    },
  },
  {
    id: "client",
    label: { es: "Cliente", en: "Client" },
    suggestedQuestions: {
      es: [
        "¿Qué servicios freelance ofreces?",
        "¿Estás disponible para proyectos?",
        "¿Trabajas en remoto?",
        "¿Cómo puedo contactarte?",
      ],
      en: [
        "What freelance services do you offer?",
        "Are you available for projects?",
        "Do you work remotely?",
        "How can I contact you?",
      ],
    },
    sourceWeights: {
      service: 1.4,
      faq: 1.35,
      availability: 1.3,
      project: 1.2,
      experience: 1.1,
      boundary: 1.15,
    },
  },
  {
    id: "company",
    label: { es: "Empresa", en: "Company" },
    suggestedQuestions: {
      es: [
        "¿En qué sectores has trabajado?",
        "¿Qué servicios puedes ofrecer?",
        "¿Por qué contratarte a ti?",
        "¿Cómo puedo contactarte?",
      ],
      en: [
        "What sectors have you worked in?",
        "What services can you offer?",
        "Why hire you?",
        "How can I contact you?",
      ],
    },
    sourceWeights: {
      service: 1.35,
      faq: 1.3,
      project: 1.25,
      experience: 1.2,
      availability: 1.2,
      boundary: 1.1,
      media: 1.05,
    },
  },
  {
    id: "default",
    label: { es: "General", en: "General" },
    suggestedQuestions: {
      es: [
        "¿Cuál es tu experiencia principal?",
        "¿Estás disponible para proyectos freelance?",
        "¿Qué servicios ofreces?",
        "¿Tienes experiencia con IA?",
        "¿Cómo puedo contactarte?",
      ],
      en: [
        "What is your main experience?",
        "Are you available for freelance projects?",
        "What services do you offer?",
        "Do you have AI experience?",
        "How can I contact you?",
      ],
    },
    sourceWeights: {
      faq: 1.15,
      service: 1.1,
      availability: 1.1,
      boundary: 1.1,
      media: 1.05,
    },
  },
]

export function getAudienceProfile(id: AudienceType): AudienceProfile {
  return AUDIENCE_PROFILES.find((profile) => profile.id === id) ?? AUDIENCE_PROFILES[4]!
}

export function getSuggestedQuestions(audience: AudienceType, locale: "es" | "en"): string[] {
  return getAudienceProfile(audience).suggestedQuestions[locale]
}
