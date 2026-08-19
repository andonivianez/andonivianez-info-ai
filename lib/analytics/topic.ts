import type { Chunk } from "@/lib/portfolio/types"
import { getPortfolioData } from "@/lib/portfolio"

export interface TopicClassification {
  topic: string
  matchedTerms: string[]
}

const CONTROLLED_VOCABULARY: string[] = (() => {
  const data = getPortfolioData()
  const terms = new Set<string>()

  for (const tech of data.technologies) {
    terms.add(tech.name.toLowerCase())
    for (const keyword of tech.keywords) {
      terms.add(keyword.toLowerCase())
    }
  }

  for (const category of data.skills) {
    for (const skill of category.skills) {
      terms.add(skill.name.toLowerCase())
      for (const part of skill.name.split(/[/\s,()]+/)) {
        if (part.length > 2) terms.add(part.toLowerCase())
      }
    }
  }

  return [...terms]
})()

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[\s,./+|]+/)
    .filter((t) => t.length > 2)
}

export function extractControlledTerms(query: string): string[] {
  const queryTokens = new Set(tokenize(query))
  const matched: string[] = []

  for (const term of CONTROLLED_VOCABULARY) {
    const termTokens = tokenize(term)
    const isMatch =
      queryTokens.has(term) ||
      termTokens.some((t) => queryTokens.has(t)) ||
      [...queryTokens].some((qt) => term.includes(qt) && qt.length > 3)

    if (isMatch && !matched.includes(term)) {
      matched.push(term)
    }
  }

  return matched.slice(0, 5)
}

export function classifyTopic(chunks: Chunk[], query: string): TopicClassification {
  const topChunk = chunks[0]
  const matchedTerms = extractControlledTerms(query)

  if (!topChunk) {
    return { topic: "unknown", matchedTerms }
  }

  const topic = `${topChunk.source}:${topChunk.sourceId}`
  return { topic, matchedTerms }
}

export function bucketLatency(ms: number): string {
  if (ms < 500) return "0-500ms"
  if (ms < 1000) return "500ms-1s"
  if (ms < 3000) return "1s-3s"
  if (ms < 10000) return "3s-10s"
  return "10s+"
}

export function bucketLength(length: number): string {
  if (length < 20) return "0-20"
  if (length < 50) return "20-50"
  if (length < 100) return "50-100"
  return "100+"
}
