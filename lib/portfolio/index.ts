import profileData from "@/data/profile.json"
import experienceData from "@/data/experience.json"
import projectsData from "@/data/projects.json"
import servicesData from "@/data/services.json"
import faqData from "@/data/faq.json"
import mediaData from "@/data/media.json"
import technologiesData from "@/data/technologies.json"
import educationData from "@/data/education.json"
import skillsData from "@/data/skills.json"
import type {
  EducationEntry,
  Experience,
  FaqEntry,
  LanguageEntry,
  Locale,
  Localized,
  MediaAppearance,
  PortfolioData,
  Profile,
  Project,
  Service,
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
    services: servicesData as Service[],
    faq: faqData as FaqEntry[],
    media: mediaData as MediaAppearance[],
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
    availability: profile.availability ? localize(profile.availability, locale) : undefined,
    openTo: profile.openTo ? localize(profile.openTo, locale) : undefined,
    workModel: profile.workModel ? localize(profile.workModel, locale) : undefined,
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
    industry: exp.industry ? localize(exp.industry, locale) : undefined,
    teamSize: exp.teamSize ? localize(exp.teamSize, locale) : undefined,
    clients: exp.clients ? localize(exp.clients, locale) : undefined,
  }))
}

export function getProjects(locale: Locale) {
  return getPortfolioData().projects.map((project) => ({
    ...project,
    name: localize(project.name, locale),
    description: localize(project.description, locale),
    highlights: localize(project.highlights, locale),
    category: localize(project.category, locale),
    problem: project.problem ? localize(project.problem, locale) : undefined,
    solution: project.solution ? localize(project.solution, locale) : undefined,
    result: project.result ? localize(project.result, locale) : undefined,
  }))
}

export function getServices(locale: Locale) {
  return getPortfolioData().services.map((service) => ({
    ...service,
    title: localize(service.title, locale),
    description: localize(service.description, locale),
    deliverables: localize(service.deliverables, locale),
    pricing: service.pricing ? localize(service.pricing, locale) : undefined,
  }))
}

export function getFaq(locale: Locale) {
  return getPortfolioData().faq.map((entry) => ({
    ...entry,
    question: localize(entry.question, locale),
    answer: localize(entry.answer, locale),
  }))
}

export function getMedia(locale: Locale) {
  return getPortfolioData().media.map((item) => ({
    ...item,
    title: localize(item.title, locale),
    platform: localize(item.platform, locale),
    summary: localize(item.summary, locale),
    topics: localize(item.topics, locale),
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
