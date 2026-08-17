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
        "¿Cuál es su experiencia principal?",
        "¿Con qué tecnologías trabaja?",
        "¿Qué proyectos destacaría?",
        "¿Tiene experiencia con IA?",
      ],
      en: [
        "What is their main experience?",
        "What technologies do they work with?",
        "Which projects would they highlight?",
        "Do they have AI experience?",
      ],
    },
    sourceWeights: { experience: 1.3, technology: 1.2, project: 1.1 },
  },
  {
    id: "developer",
    label: { es: "Desarrollador", en: "Developer" },
    suggestedQuestions: {
      es: [
        "¿Qué stack utiliza habitualmente?",
        "¿Qué decisiones técnicas ha tomado?",
        "¿Tiene código en GitHub?",
        "¿Qué experiencia tiene con React Native?",
      ],
      en: [
        "What stack do they typically use?",
        "What technical decisions have they made?",
        "Do they have code on GitHub?",
        "What React Native experience do they have?",
      ],
    },
    sourceWeights: { project: 1.3, technology: 1.25, experience: 1.1 },
  },
  {
    id: "client",
    label: { es: "Cliente", en: "Client" },
    suggestedQuestions: {
      es: [
        "¿Qué proyectos ha completado?",
        "¿Qué soluciones puede ofrecer?",
        "¿Tiene experiencia freelance?",
        "¿Qué capacidades destacan?",
      ],
      en: [
        "What projects have they completed?",
        "What solutions can they offer?",
        "Do they have freelance experience?",
        "What capabilities stand out?",
      ],
    },
    sourceWeights: { project: 1.35, experience: 1.15, profile: 1.1 },
  },
  {
    id: "company",
    label: { es: "Empresa", en: "Company" },
    suggestedQuestions: {
      es: [
        "¿Qué proyecto se parece más a mi empresa?",
        "¿Tiene experiencia en mi sector?",
        "¿Qué tecnologías domina?",
        "¿Está disponible para proyectos?",
      ],
      en: [
        "Which project is most similar to my company?",
        "Do they have experience in my sector?",
        "What technologies do they master?",
        "Are they available for projects?",
      ],
    },
    sourceWeights: { project: 1.3, experience: 1.2, technology: 1.15 },
  },
  {
    id: "default",
    label: { es: "General", en: "General" },
    suggestedQuestions: {
      es: [
        "¿Cuál es su experiencia principal?",
        "¿Con qué tecnologías trabaja?",
        "¿Qué proyectos destacaría?",
        "¿Tiene experiencia con IA?",
        "¿Ha desarrollado aplicaciones móviles?",
        "¿Qué experiencia tiene con backend?",
      ],
      en: [
        "What is their main experience?",
        "What technologies do they work with?",
        "Which projects would they highlight?",
        "Do they have AI experience?",
        "Have they developed mobile applications?",
        "What backend experience do they have?",
      ],
    },
    sourceWeights: {},
  },
]

export function getAudienceProfile(id: AudienceType): AudienceProfile {
  return AUDIENCE_PROFILES.find((profile) => profile.id === id) ?? AUDIENCE_PROFILES[4]!
}

export function getSuggestedQuestions(audience: AudienceType, locale: "es" | "en"): string[] {
  return getAudienceProfile(audience).suggestedQuestions[locale]
}
