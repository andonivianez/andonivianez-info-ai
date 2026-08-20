import { getInsufficientInfoMessage } from "@/lib/rag"
import type { Chunk, Locale } from "@/lib/portfolio/types"
import { tokenizeText } from "@/lib/rag/normalize"

const SOURCE_WEIGHT: Record<string, number> = {
  faq: 1.7,
  boundary: 1.65,
  availability: 1.45,
  service: 1.3,
  profile: 1.2,
  experience: 1.15,
  project: 1.1,
  education: 1.1,
  media: 1.05,
  language: 1.05,
  certification: 1.0,
  summary: 0.9,
  softskill: 0.75,
  technology: 0.45,
  skill: 0.4,
}

const META_LABEL =
  /^(Technologies|Tecnologías|Achievements|Logros|Deliverables|Entregables|Highlights|Destacados|GitHub|Problem|Problema|Solution|Solución|Result|Resultado|Open to|Abierto a|Contact|Contacto):\s*/i

const SHORT_KEEP = /^(sí|si|no|yes)\.?$/i

interface ContextBlock {
  source: string
  title: string
  text: string
}

interface RankedBlock extends ContextBlock {
  usable: string
  score: number
  titleOverlap: number
}

export function parseContextBlocks(context: string): ContextBlock[] {
  const blocks: ContextBlock[] = []
  const pattern = /\[([A-Z]+)\][ \t]+([^\n]*)\n([\s\S]*?)(?=\n\[[A-Z]+\]|$)/g
  let match = pattern.exec(context)
  while (match) {
    blocks.push({
      source: match[1]!.toLowerCase(),
      title: match[2]!.trim(),
      text: match[3]!.trim(),
    })
    match = pattern.exec(context)
  }

  if (blocks.length === 0 && context.trim()) {
    blocks.push({ source: "unknown", title: "", text: context.trim() })
  }

  return blocks
}

export function extractUsableBody(source: string, text: string): string {
  let body = text.trim()
  if (!body) return ""

  if (source === "faq" || source === "boundary") {
    for (const separator of [" — ", " – ", " - "]) {
      const index = body.lastIndexOf(separator)
      if (index >= 0) {
        body = body.slice(index + separator.length).trim()
        break
      }
    }
    return body
  }

  const cut = body.search(
    /\s+(Technologies|Tecnologías|Achievements|Logros|Deliverables|Entregables|Highlights|Destacados|GitHub):\s+/i,
  )
  if (cut > 40) body = body.slice(0, cut).trim()

  return body
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.replace(META_LABEL, "").trim())
    .filter((sentence) => sentence.length > 12 || SHORT_KEEP.test(sentence))
    .join(" ")
}

function scoreBody(body: string, queryTokens: string[]): number {
  if (!body) return 0
  const haystack = body.toLowerCase()
  return queryTokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0)
}

function titleOverlap(questionTokens: string[], title: string): number {
  if (questionTokens.length === 0 || !title) return 0
  const titleTokens = new Set(tokenizeText(title, false))
  const hits = questionTokens.filter((token) => titleTokens.has(token)).length
  return hits / questionTokens.length
}

function joinList(items: string[], locale: Locale): string {
  if (items.length <= 1) return items[0] ?? ""
  const conjunction = locale === "es" ? "y" : "and"
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items.at(-1)}`
}

function limitSentences(text: string, max = 4): string {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const limited = sentences.slice(0, max).join(" ")
  return limited.endsWith(".") || limited.endsWith("!") || limited.endsWith("?")
    ? limited
    : `${limited}.`
}

function rewriteProficiency(body: string, locale: Locale): string {
  const match = body.match(/^(.+?)\s*\(([^)]+)\)\s*-\s*proficiency\s+(\d+)%/i)
  if (!match) return body
  const [, name, category, level] = match
  return locale === "es"
    ? `Tengo experiencia con ${name!.trim()} (${category}, nivel ${level}%).`
    : `I have experience with ${name!.trim()} (${category}, ${level}% proficiency).`
}

function isServiceQuestion(question: string): boolean {
  return /servicio|service|ofreces|offer|soluciones|solutions/i.test(question)
}

function pickByQuestionIntent(question: string, ranked: RankedBlock[]): RankedBlock | undefined {
  if (/diseñ|design|gr[aá]fico|graphic/i.test(question)) {
    return ranked.find(
      (block) =>
        (block.source === "boundary" || block.source === "faq") &&
        /diseñ|design|gr[aá]fico|graphic|ui\/ux|figma/i.test(`${block.title} ${block.usable}`),
    )
  }

  if (isServiceQuestion(question) && !/contrato|prestaci[oó]n|contract/i.test(question)) {
    return ranked.find((block) =>
      /tipo de proyectos|types of projects|project types|aceptas|do you accept/i.test(block.title),
    )
  }

  if (/experiencia principal|main experience|trayectoria/i.test(question)) {
    return ranked.find((block) => block.source === "profile")
  }

  return undefined
}

export function synthesizeExtractiveAnswer(
  question: string,
  context: string,
  locale: Locale,
): string {
  const queryTokens = tokenizeText(question, false)
  const scored: RankedBlock[] = parseContextBlocks(context)
    .map((block) => {
      const usable = extractUsableBody(block.source, block.text)
      const overlap = titleOverlap(queryTokens, block.title)
      const tokenScore =
        scoreBody(usable, queryTokens) + scoreBody(block.title, queryTokens) * 2 + overlap * 6
      const serviceBonus = block.source === "service" && isServiceQuestion(question) ? 3 : 0
      const weight = SOURCE_WEIGHT[block.source] ?? 1
      return {
        ...block,
        usable,
        titleOverlap: overlap,
        score: (tokenScore + serviceBonus) * weight,
      }
    })
    .filter((block) => Boolean(block.usable))
    .sort((a, b) => b.score - a.score || b.titleOverlap - a.titleOverlap)

  const ranked = scored.filter((block) => block.score > 0)
  const pool = scored.length > 0 ? scored : ranked

  if (pool.length === 0) {
    return getInsufficientInfoMessage(locale)
  }

  const intentHit = pickByQuestionIntent(question, pool)
  if (intentHit) {
    return limitSentences(intentHit.usable)
  }

  if (ranked.length === 0) {
    return getInsufficientInfoMessage(locale)
  }

  const best = ranked[0]!
  const matchingFaq = ranked.find(
    (block) =>
      (block.source === "faq" || block.source === "boundary") &&
      block.usable.length >= 24 &&
      (block.titleOverlap >= 0.45 ||
        (block.titleOverlap >= 0.3 && block.score >= best.score * 0.85)),
  )
  if (matchingFaq) {
    return limitSentences(matchingFaq.usable)
  }

  const serviceBlocks = ranked.filter((block) => block.source === "service")
  if (serviceBlocks.length >= 2 && isServiceQuestion(question)) {
    const titles = serviceBlocks.slice(0, 4).map((block) => block.title)
    const intro =
      locale === "es" ? `Ofrezco ${joinList(titles, "es")}.` : `I offer ${joinList(titles, "en")}.`
    return limitSentences(`${intro} ${serviceBlocks[0]!.usable}`)
  }

  const preferred = ["availability", "service", "profile"]
  if (preferred.includes(best.source) && best.usable.length >= 60) {
    const lead =
      best.source === "service"
        ? locale === "es"
          ? `Ofrezco ${best.title.toLowerCase()}. `
          : `I offer ${best.title.toLowerCase()}. `
        : ""
    return limitSentences(`${lead}${best.usable}`)
  }

  const unique: string[] = []
  for (const block of ranked.slice(0, 3)) {
    const piece = rewriteProficiency(block.usable, locale)
    if (unique.some((existing) => existing.includes(piece.slice(0, 48)))) continue
    unique.push(piece)
    if (unique.join(" ").length > 420) break
    if (preferred.includes(block.source) && unique.length >= 1) break
  }

  return limitSentences(unique.join(" "))
}

export function synthesizeFromChunks(question: string, chunks: Chunk[], locale: Locale): string {
  const context = chunks
    .map((chunk) => `[${chunk.source.toUpperCase()}] ${chunk.title}\n${chunk.text}`)
    .join("\n\n")
  return synthesizeExtractiveAnswer(question, context, locale)
}
