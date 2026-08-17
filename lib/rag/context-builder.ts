import type { Chunk, Locale } from "@/lib/portfolio/types"
import { retrieve } from "./retriever"

export const DEFAULT_CONTEXT_BUDGET = 2000
export const DEFAULT_MIN_SCORE = 2

export interface ContextBuildResult {
  context: string
  chunks: Chunk[]
  topScore: number
  hasRelevantContext: boolean
}

export function buildContext(
  query: string,
  locale: Locale,
  budget = DEFAULT_CONTEXT_BUDGET,
  minScore = DEFAULT_MIN_SCORE,
): ContextBuildResult {
  const { chunks, topScore, hasRelevantContext } = retrieve(query, {
    locale,
    limit: 8,
    minScore,
  })

  if (!hasRelevantContext) {
    return { context: "", chunks: [], topScore, hasRelevantContext: false }
  }

  const seen = new Set<string>()
  const selected: Chunk[] = []
  let length = 0

  for (const chunk of chunks) {
    if (seen.has(chunk.id)) continue
    const block = `[${chunk.source.toUpperCase()}] ${chunk.title}\n${chunk.text}`
    if (length + block.length > budget && selected.length > 0) break
    seen.add(chunk.id)
    selected.push(chunk)
    length += block.length + 2
  }

  const context = selected
    .map((chunk) => `[${chunk.source.toUpperCase()}] ${chunk.title}\n${chunk.text}`)
    .join("\n\n")

  return {
    context,
    chunks: selected,
    topScore,
    hasRelevantContext: true,
  }
}

export function getInsufficientInfoMessage(locale: Locale): string {
  return locale === "es"
    ? "No encuentro información suficiente en el portfolio para responder con seguridad."
    : "I cannot find enough information in the portfolio to answer confidently."
}
