import { buildContext, getInsufficientInfoMessage } from "@/lib/rag"
import type { Chunk, Locale } from "@/lib/portfolio/types"
import { getProfile } from "@/lib/portfolio"
import { getAudienceProfile, type AudienceType } from "@/lib/audience/profiles"
import { getConversationalReply } from "../conversation"
import { buildSystemPrompt, buildUserPrompt } from "../prompt"
import type { AIProvider, ProviderProgress } from "../types"

function composeFallbackAnswer(sentences: string[], locale: Locale): string {
  const unique: string[] = []
  for (const sentence of sentences) {
    const trimmed = sentence.trim()
    if (!trimmed || unique.some((s) => s.includes(trimmed.slice(0, 40)))) continue
    unique.push(trimmed)
  }

  if (unique.length === 0) {
    return locale === "es"
      ? "No encuentro información suficiente en el portfolio para responder con seguridad."
      : "I cannot find enough information in the portfolio to answer confidently."
  }

  const body = unique.slice(0, 2).join(" ")
  if (locale === "es") {
    return body.endsWith(".") ? body : `${body}.`
  }
  return body.endsWith(".") ? body : `${body}.`
}

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
    const locale = this.detectLocale(prompt)
    const question = this.extractQuestion(prompt)
    const conversational = getConversationalReply(question, locale)
    if (!context?.trim()) {
      return conversational ?? getInsufficientInfoMessage(locale)
    }

    const sentences = context
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    const queryTokens = question
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
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
      return conversational ?? getInsufficientInfoMessage(locale)
    }

    return composeFallbackAnswer(
      best.map((item) => item.sentence),
      locale,
    )
  }

  async *stream(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string> {
    const result = await this.generate(prompt, context, signal)
    yield result
  }

  private detectLocale(prompt: string): Locale {
    const spanishHints = [
      "qué",
      "cuál",
      "cómo",
      "experiencia",
      "tecnologías",
      "proyectos",
      "hola",
      "gracias",
      "tal",
    ]
    const lower = prompt.toLowerCase()
    return spanishHints.some((hint) => lower.includes(hint)) ? "es" : "en"
  }

  private extractQuestion(prompt: string): string {
    const markers = ["PREGUNTA:", "QUESTION:"]
    for (const marker of markers) {
      const index = prompt.lastIndexOf(marker)
      if (index >= 0) return prompt.slice(index + marker.length).trim()
    }
    return prompt
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

export function buildPromptBundle(
  question: string,
  locale: Locale,
  audience: AudienceType = "default",
) {
  const profile = getProfile(locale)
  const audienceProfile = getAudienceProfile(audience)
  const sourceBoost = audienceProfile.sourceWeights as Partial<Record<Chunk["source"], number>>
  const { context, hasRelevantContext, topScore, chunks } = buildContext(
    question,
    locale,
    undefined,
    undefined,
    sourceBoost,
  )

  const conversationalReply = getConversationalReply(question, locale)

  if (!hasRelevantContext) {
    return {
      systemPrompt: buildSystemPrompt(profile.name, locale, profile.email),
      userPrompt: "",
      context,
      hasRelevantContext: false,
      topScore,
      chunks,
      conversationalReply,
      insufficientMessage: conversationalReply ?? getInsufficientInfoMessage(locale),
    }
  }

  return {
    systemPrompt: buildSystemPrompt(profile.name, locale, profile.email),
    userPrompt: buildUserPrompt(question, context, locale),
    context,
    hasRelevantContext: true,
    topScore,
    chunks,
    conversationalReply: undefined,
    insufficientMessage: getInsufficientInfoMessage(locale),
  }
}
