export type Locale = "es" | "en"

export type Localized<T> = {
  es: T
  en: T
}

export interface Profile {
  name: string
  role: Localized<string>
  subtitle: Localized<string>
  bio: Localized<string>
  location: Localized<string>
  email: string
  links: {
    linkedin: string
    github: string
    malt: string
  }
  tagline?: Localized<string>
  social?: {
    linkedinFollowers?: number
    linkedinConnections?: string
  }
  stats: {
    yearsExperience: number
    companies: number
    technologies: number
    projects: number
  }
  availability?: Localized<string>
  openTo?: Localized<string[]>
  workModel?: Localized<string>
}

export interface Experience {
  id: string
  title: Localized<string>
  company: string
  location: Localized<string>
  period: Localized<string>
  description: Localized<string>
  technologies: string[]
  achievements: Localized<string[]>
  tags: ("current" | "freelance" | "teaching")[]
  industry?: Localized<string>
  teamSize?: Localized<string>
  scope?: "employment" | "freelance"
  clients?: Localized<string[]>
  featured?: boolean
}

export interface Project {
  id: string
  name: Localized<string>
  description: Localized<string>
  technologies: string[]
  highlights: Localized<string[]>
  url?: string
  github?: string
  category: Localized<string>
  problem?: Localized<string>
  solution?: Localized<string>
  result?: Localized<string>
}

export interface Service {
  id: string
  title: Localized<string>
  description: Localized<string>
  deliverables: Localized<string[]>
  technologies: string[]
  pricing?: Localized<string>
}

export interface FaqEntry {
  id: string
  question: Localized<string>
  answer: Localized<string>
  category: "hiring" | "technical" | "general" | "boundaries" | "personal"
}

export interface MediaAppearance {
  id: string
  type: "podcast" | "video" | "article" | "talk"
  title: Localized<string>
  platform: Localized<string>
  date: string
  url: string
  embedUrl?: string
  thumbnail?: string
  summary: Localized<string>
  topics: Localized<string[]>
}

export interface SkillCategory {
  id: string
  titleKey: string
  icon: string
  skills: { name: string; level: number }[]
}

export interface EducationEntry {
  id: string
  degree: Localized<string>
  institution: string
  period: string
  type: "university" | "vocational" | "music" | "basic"
}

export interface LanguageEntry {
  id: string
  language: Localized<string>
  level: "native" | "basic" | "intermediate" | "B2"
  description: Localized<string>
  proficiency: number
}

export interface Technology {
  id: string
  name: string
  category: "frontend" | "backend" | "mobile" | "devops" | "ai" | "embedded"
  level: number
  keywords: string[]
}

export interface PortfolioData {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  services: Service[]
  faq: FaqEntry[]
  media: MediaAppearance[]
  skills: SkillCategory[]
  education: EducationEntry[]
  languages: LanguageEntry[]
  technologies: Technology[]
  certifications: Localized<string[]>
  softSkills: Localized<string[]>
}

export type ChunkSource =
  | "profile"
  | "experience"
  | "project"
  | "technology"
  | "education"
  | "language"
  | "skill"
  | "certification"
  | "softskill"
  | "summary"
  | "service"
  | "faq"
  | "availability"
  | "boundary"
  | "media"

export interface Chunk {
  id: string
  source: ChunkSource
  sourceId: string
  title: string
  text: string
  keywords: string[]
  locale: Locale
  score?: number
}
