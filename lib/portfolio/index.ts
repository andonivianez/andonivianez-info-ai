import profileData from "@/data/profile.json"
import experienceData from "@/data/experience.json"
import projectsData from "@/data/projects.json"
import technologiesData from "@/data/technologies.json"
import educationData from "@/data/education.json"
import skillsData from "@/data/skills.json"
import type {
  EducationEntry,
  Experience,
  LanguageEntry,
  Locale,
  Localized,
  PortfolioData,
  Profile,
  Project,
  SkillCategory,
  Technology,
} from "./types"

export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale]
}

export function getPortfolioData(): PortfolioData {
  return {
    profile: profileData as Profile,
    experience: experienceData as Experience[],
    projects: projectsData as Project[],
    skills: skillsData.skillCategories as SkillCategory[],
    education: educationData as EducationEntry[],
    languages: skillsData.languages as LanguageEntry[],
    technologies: technologiesData as Technology[],
    certifications: skillsData.certifications as Localized<string[]>,
    softSkills: skillsData.softSkills as Localized<string[]>,
  }
}

export function getProfile(locale: Locale) {
  const { profile } = getPortfolioData()
  return {
    ...profile,
    role: localize(profile.role, locale),
    subtitle: localize(profile.subtitle, locale),
    bio: localize(profile.bio, locale),
    location: localize(profile.location, locale),
    tagline: profile.tagline ? localize(profile.tagline, locale) : undefined,
  }
}

export function getExperiences(locale: Locale) {
  return getPortfolioData().experience.map((exp) => ({
    ...exp,
    title: localize(exp.title, locale),
    location: localize(exp.location, locale),
    period: localize(exp.period, locale),
    description: localize(exp.description, locale),
    achievements: localize(exp.achievements, locale),
  }))
}

export function getProjects(locale: Locale) {
  return getPortfolioData().projects.map((project) => ({
    ...project,
    name: localize(project.name, locale),
    description: localize(project.description, locale),
    highlights: localize(project.highlights, locale),
    category: localize(project.category, locale),
  }))
}

export function getEducation(locale: Locale) {
  return getPortfolioData().education.map((entry) => ({
    ...entry,
    degree: localize(entry.degree, locale),
  }))
}

export function getLanguages(locale: Locale) {
  return getPortfolioData().languages.map((lang) => ({
    ...lang,
    language: localize(lang.language, locale),
    description: localize(lang.description, locale),
  }))
}

export function getCertifications(locale: Locale) {
  return localize(getPortfolioData().certifications, locale)
}

export function getSoftSkills(locale: Locale) {
  return localize(getPortfolioData().softSkills, locale)
}

export * from "./types"
