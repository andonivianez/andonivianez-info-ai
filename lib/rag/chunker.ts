import { getPortfolioData, localize } from "@/lib/portfolio"
import type { Chunk, ChunkSource, Locale } from "@/lib/portfolio/types"

function joinParts(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(". ")
}

export function buildChunks(locale: Locale): Chunk[] {
  const data = getPortfolioData()
  const chunks: Chunk[] = []

  const profile = data.profile
  chunks.push({
    id: "profile-main",
    source: "profile",
    sourceId: "profile",
    title: profile.name,
    text: joinParts([
      profile.name,
      localize(profile.role, locale),
      localize(profile.subtitle, locale),
      localize(profile.bio, locale),
      `${localize(profile.role, locale)} with ${profile.stats.yearsExperience}+ years of experience`,
    ]),
    keywords: [
      profile.name.toLowerCase(),
      "profile",
      "perfil",
      "experience",
      "experiencia",
      ...localize(profile.role, locale).toLowerCase().split(/\s+/),
    ],
    locale,
  })

  for (const exp of data.experience) {
    chunks.push({
      id: `exp-${exp.id}`,
      source: "experience",
      sourceId: exp.id,
      title: `${localize(exp.title, locale)} @ ${exp.company}`,
      text: joinParts([
        localize(exp.title, locale),
        exp.company,
        localize(exp.period, locale),
        localize(exp.description, locale),
        `Technologies: ${exp.technologies.join(", ")}`,
        `Achievements: ${localize(exp.achievements, locale).join(", ")}`,
      ]),
      keywords: [
        exp.company.toLowerCase(),
        ...exp.technologies.map((t) => t.toLowerCase()),
        ...localize(exp.title, locale).toLowerCase().split(/\s+/),
      ],
      locale,
    })
  }

  for (const project of data.projects) {
    chunks.push({
      id: `project-${project.id}`,
      source: "project",
      sourceId: project.id,
      title: localize(project.name, locale),
      text: joinParts([
        localize(project.name, locale),
        localize(project.description, locale),
        `Technologies: ${project.technologies.join(", ")}`,
        `Highlights: ${localize(project.highlights, locale).join(", ")}`,
        project.github ? `GitHub: ${project.github}` : undefined,
      ]),
      keywords: [
        ...project.technologies.map((t) => t.toLowerCase()),
        ...localize(project.name, locale).toLowerCase().split(/\s+/),
        localize(project.category, locale).toLowerCase(),
      ],
      locale,
    })
  }

  for (const tech of data.technologies) {
    chunks.push({
      id: `tech-${tech.id}`,
      source: "technology",
      sourceId: tech.id,
      title: tech.name,
      text: `${tech.name} (${tech.category}) - proficiency ${tech.level}%`,
      keywords: tech.keywords,
      locale,
    })
  }

  for (const edu of data.education) {
    chunks.push({
      id: `edu-${edu.id}`,
      source: "education",
      sourceId: edu.id,
      title: localize(edu.degree, locale),
      text: joinParts([localize(edu.degree, locale), edu.institution, edu.period, edu.type]),
      keywords: [
        edu.institution.toLowerCase(),
        edu.type,
        "education",
        "formacion",
        "formación",
        "estudios",
      ],
      locale,
    })
  }

  for (const lang of data.languages) {
    chunks.push({
      id: `lang-${lang.id}`,
      source: "language",
      sourceId: lang.id,
      title: localize(lang.language, locale),
      text: `${localize(lang.language, locale)}: ${lang.level} (${lang.proficiency}%) - ${localize(lang.description, locale)}`,
      keywords: [
        localize(lang.language, locale).toLowerCase(),
        lang.level,
        "language",
        "idioma",
        "languages",
      ],
      locale,
    })
  }

  for (const category of data.skills) {
    for (const skill of category.skills) {
      chunks.push({
        id: `skill-${category.id}-${skill.name.replace(/\W+/g, "-").toLowerCase()}`,
        source: "skill",
        sourceId: category.id,
        title: skill.name,
        text: `${skill.name} (${category.id}): ${skill.level}% proficiency`,
        keywords: [skill.name.toLowerCase(), category.id, "skill", "habilidad"],
        locale,
      })
    }
  }

  return chunks
}

export function getChunksBySource(source: ChunkSource, locale: Locale): Chunk[] {
  return buildChunks(locale).filter((chunk) => chunk.source === source)
}
