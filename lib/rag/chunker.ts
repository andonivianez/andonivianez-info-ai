import { getPortfolioData, localize } from "@/lib/portfolio"
import type { Chunk, ChunkSource, Locale } from "@/lib/portfolio/types"

function joinParts(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(". ")
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 1)
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
        exp.industry ? localize(exp.industry, locale) : undefined,
        localize(exp.description, locale),
        `Technologies: ${exp.technologies.join(", ")}`,
        `Achievements: ${localize(exp.achievements, locale).join(", ")}`,
      ]),
      keywords: [
        exp.company.toLowerCase(),
        ...exp.technologies.map((t) => t.toLowerCase()),
        ...localize(exp.title, locale).toLowerCase().split(/\s+/),
        ...(exp.industry ? tokenize(localize(exp.industry, locale)) : []),
        ...(exp.scope === "freelance"
          ? ["freelance", "autonomo", "autónomo", "independiente"]
          : []),
      ],
      locale,
    })

    chunks.push({
      id: `exp-${exp.id}-achievements`,
      source: "experience",
      sourceId: `${exp.id}-achievements`,
      title: `${localize(exp.title, locale)} @ ${exp.company} — ${locale === "es" ? "Logros" : "Achievements"}`,
      text: localize(exp.achievements, locale).join(". "),
      keywords: [
        exp.company.toLowerCase(),
        "achievements",
        "logros",
        "impact",
        "impacto",
        ...localize(exp.achievements, locale).join(" ").toLowerCase().split(/\s+/),
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
        project.problem ? `Problem: ${localize(project.problem, locale)}` : undefined,
        project.solution ? `Solution: ${localize(project.solution, locale)}` : undefined,
        project.result ? `Result: ${localize(project.result, locale)}` : undefined,
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
        keywords: [skill.name.toLowerCase(), category.id, "skill", "habilidad", "skills"],
        locale,
      })
    }
  }

  const certifications = localize(data.certifications, locale)
  chunks.push({
    id: "certifications-all",
    source: "certification",
    sourceId: "certifications",
    title: locale === "es" ? "Certificaciones" : "Certifications",
    text: certifications.join(". "),
    keywords: [
      "certification",
      "certificaciones",
      "certificacion",
      "certifications",
      "lpi",
      "cambridge",
    ],
    locale,
  })

  const softSkills = localize(data.softSkills, locale)
  chunks.push({
    id: "softskills-all",
    source: "softskill",
    sourceId: "softskills",
    title: locale === "es" ? "Soft skills" : "Soft skills",
    text: softSkills.join(". "),
    keywords: [
      "soft skills",
      "softskills",
      "habilidades",
      "competencias",
      "capabilities",
      "capacidades",
      "leadership",
      "liderazgo",
      "agile",
    ],
    locale,
  })

  chunks.push({
    id: "summary-technologies",
    source: "summary",
    sourceId: "technologies",
    title: locale === "es" ? "Stack tecnológico" : "Technology stack",
    text: data.technologies.map((t) => `${t.name} (${t.category}, ${t.level}%)`).join(", "),
    keywords: ["technologies", "tecnologias", "tecnologías", "stack", "tech"],
    locale,
  })

  chunks.push({
    id: "summary-projects",
    source: "summary",
    sourceId: "projects",
    title: locale === "es" ? "Proyectos destacados" : "Featured projects",
    text: data.projects
      .map((p) => `${localize(p.name, locale)}: ${localize(p.description, locale)}`)
      .join(". "),
    keywords: ["projects", "proyectos", "portfolio", "highlights"],
    locale,
  })

  chunks.push({
    id: "summary-education",
    source: "summary",
    sourceId: "education",
    title: locale === "es" ? "Formación académica" : "Academic background",
    text: data.education
      .map((e) => `${localize(e.degree, locale)} — ${e.institution} (${e.period})`)
      .join(". "),
    keywords: ["education", "formacion", "formación", "estudios", "master", "bigia", "tfm"],
    locale,
  })

  if (profile.availability) {
    chunks.push({
      id: "profile-availability",
      source: "availability",
      sourceId: "availability",
      title: locale === "es" ? "Disponibilidad freelance" : "Freelance availability",
      text: joinParts([
        localize(profile.availability, locale),
        profile.workModel ? localize(profile.workModel, locale) : undefined,
        profile.openTo ? `Open to: ${localize(profile.openTo, locale).join(", ")}` : undefined,
        `Contact: ${profile.email}`,
      ]),
      keywords: [
        "disponible",
        "available",
        "freelance",
        "contratar",
        "hire",
        "disponibilidad",
        "availability",
        "remoto",
        "remote",
        "tarifa",
        "rate",
        "presupuesto",
        "budget",
        "autonomo",
        "autónomo",
      ],
      locale,
    })
  }

  for (const service of data.services) {
    chunks.push({
      id: `service-${service.id}`,
      source: "service",
      sourceId: service.id,
      title: localize(service.title, locale),
      text: joinParts([
        localize(service.title, locale),
        localize(service.description, locale),
        `Deliverables: ${localize(service.deliverables, locale).join(", ")}`,
        `Technologies: ${service.technologies.join(", ")}`,
        service.pricing ? localize(service.pricing, locale) : undefined,
      ]),
      keywords: [
        ...tokenize(localize(service.title, locale)),
        "service",
        "servicio",
        "solucion",
        "solución",
        "solution",
        "freelance",
        "consultoria",
        "consultoría",
        "consulting",
        ...service.technologies.map((t) => t.toLowerCase()),
      ],
      locale,
    })
  }

  for (const entry of data.faq) {
    const source = entry.category === "boundaries" ? "boundary" : "faq"
    chunks.push({
      id: `${source}-${entry.id}`,
      source,
      sourceId: entry.id,
      title: localize(entry.question, locale),
      text: `${localize(entry.question, locale)} — ${localize(entry.answer, locale)}`,
      keywords: [
        ...tokenize(localize(entry.question, locale)),
        entry.category,
        source,
        "faq",
        "contratar",
        "hire",
        "tarifa",
        "rate",
        "presupuesto",
        "budget",
        "precio",
        "price",
        "disponible",
        "available",
        "contacto",
        "contact",
        ...(entry.category === "boundaries"
          ? ["no", "limit", "limite", "limite", "boundary", "vue", "java", "diseno"]
          : []),
        ...(entry.category === "personal" ? ["personal", "hobby", "musica", "music"] : []),
      ],
      locale,
    })
  }

  for (const item of data.media) {
    chunks.push({
      id: `media-${item.id}`,
      source: "media",
      sourceId: item.id,
      title: localize(item.title, locale),
      text: joinParts([
        localize(item.title, locale),
        localize(item.platform, locale),
        item.date,
        localize(item.summary, locale),
        localize(item.topics, locale).join(", "),
        item.url,
      ]),
      keywords: [
        "entrevista",
        "interview",
        "podcast",
        "opground",
        "discovery",
        "media",
        "youtube",
        "video",
        ...tokenize(localize(item.title, locale)),
        ...tokenize(localize(item.platform, locale)),
        ...tokenize(localize(item.summary, locale)),
      ],
      locale,
    })
  }

  return chunks
}

export function getChunksBySource(source: ChunkSource, locale: Locale): Chunk[] {
  return buildChunks(locale).filter((chunk) => chunk.source === source)
}
