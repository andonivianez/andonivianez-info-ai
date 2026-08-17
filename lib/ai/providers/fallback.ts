import { buildContext, getInsufficientInfoMessage } from "@/lib/rag"
import type { Locale } from "@/lib/portfolio/types"
import { getProfile } from "@/lib/portfolio"
import { buildSystemPrompt, buildUserPrompt } from "../prompt"
import type { AIProvider, ProviderProgress } from "../types"

export class FallbackProvider implements AIProvider {
  readonly id = "fallback" as const
  readonly label = "Modo compatible · sin modelo generativo"
  readonly isGenerative = false
  readonly runsLocally = true
  readonly privacyLabel = "Modo compatible · sin modelo generativo"

  async isAvailable(): Promise<boolean> {
    return true
  }

  async initialize(_onProgress?: (progress: ProviderProgress) => void): Promise<void> {
    return
  }

  async generate(prompt: string, context?: string, _signal?: AbortSignal): Promise<string> {
    if (!context?.trim()) {
      return getInsufficientInfoMessage(this.detectLocale(prompt))
    }

    const sentences = context
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    const queryTokens = prompt
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 2)

    const ranked = sentences
      .map((sentence) => ({
        sentence,
        score: queryTokens.reduce(
          (acc, token) => acc + (sentence.toLowerCase().includes(token) ? 1 : 0),
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score)

    const best = ranked.filter((item) => item.score > 0).slice(0, 3)
    if (best.length === 0) {
      return getInsufficientInfoMessage(this.detectLocale(prompt))
    }

    const locale = this.detectLocale(prompt)
    const intro =
      locale === "es"
        ? "Según la información disponible en el portfolio:"
        : "Based on the information available in the portfolio:"

    return `${intro}\n\n${best.map((item) => `• ${item.sentence}`).join("\n")}`
  }

  async *stream(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string> {
    const result = await this.generate(prompt, context, signal)
    yield result
  }

  private detectLocale(prompt: string): Locale {
    const spanishHints = ["qué", "cuál", "cómo", "experiencia", "tecnologías", "proyectos"]
    const lower = prompt.toLowerCase()
    return spanishHints.some((hint) => lower.includes(hint)) ? "es" : "en"
  }
}

export async function createFallbackAnswer(
  question: string,
  locale: Locale,
  context: string | undefined,
): Promise<string> {
  const provider = new FallbackProvider()
  return provider.generate(question, context)
}

export function buildPromptBundle(question: string, locale: Locale) {
  const profile = getProfile(locale)
  const { context, hasRelevantContext, topScore, chunks } = buildContext(question, locale)

  if (!hasRelevantContext) {
    return {
      systemPrompt: buildSystemPrompt(profile.name, locale),
      userPrompt: "",
      context,
      hasRelevantContext: false,
      topScore,
      chunks,
      insufficientMessage: getInsufficientInfoMessage(locale),
    }
  }

  return {
    systemPrompt: buildSystemPrompt(profile.name, locale),
    userPrompt: buildUserPrompt(question, context, locale),
    context,
    hasRelevantContext: true,
    topScore,
    chunks,
    insufficientMessage: getInsufficientInfoMessage(locale),
  }
}
