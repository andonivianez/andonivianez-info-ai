import type { Locale } from "@/lib/portfolio/types"
import { tokenizeText } from "@/lib/rag/normalize"

const WEAK_PATTERNS = [
  /no encuentro información suficiente/i,
  /cannot find enough information/i,
  /as an ai (language )?model/i,
  /soy un modelo de lenguaje/i,
  /i am (an? )?(artificial intelligence|language model)/i,
  /CONTEXTO:|CONTEXT:|PREGUNTA:|QUESTION:/,
  /Eres el asistente inteligente/i,
  /You are the intelligent assistant/i,
]

export function isWeakGeneratedAnswer(text: string, _locale: Locale, context?: string): boolean {
  const trimmed = text.trim()
  if (trimmed.length < 32) return true
  if (WEAK_PATTERNS.some((pattern) => pattern.test(trimmed))) return true

  if (!context?.trim()) return false

  const contextTokens = tokenizeText(context, false).filter((token) => token.length > 3)
  if (contextTokens.length < 6) return false

  const overlap = contextTokens.filter((token) => trimmed.toLowerCase().includes(token)).length
  return overlap < 2
}
