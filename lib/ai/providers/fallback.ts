import { buildContext, getInsufficientInfoMessage } from "@/lib/rag"
import type { Chunk, Locale } from "@/lib/portfolio/types"
import { getProfile } from "@/lib/portfolio"
import { getAudienceProfile, type AudienceType } from "@/lib/audience/profiles"
import { getConversationalReply, isSocialConversationIntent } from "../conversation"
import { synthesizeExtractiveAnswer } from "../extractive-answer"
import {
  detectPromptLocale,
  extractContextFromPrompt,
  extractQuestionFromPrompt,
} from "../prompt-parse"
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
    const locale = detectPromptLocale(prompt)
    const question = extractQuestionFromPrompt(prompt)
    const resolvedContext = context?.trim() || extractContextFromPrompt(prompt)
    const conversational = getConversationalReply(question, locale)

    if (isSocialConversationIntent(question) && conversational) {
      return conversational
    }

    if (!resolvedContext) {
      return conversational ?? getInsufficientInfoMessage(locale)
    }

    return synthesizeExtractiveAnswer(question, resolvedContext, locale)
  }

  async *stream(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string> {
    const result = await this.generate(prompt, context, signal)
    yield result
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

  if (isSocialConversationIntent(question) && conversationalReply) {
    return {
      systemPrompt: buildSystemPrompt(profile.name, locale, profile.email),
      userPrompt: "",
      context: "",
      hasRelevantContext: false,
      topScore,
      chunks: [],
      conversationalReply,
      insufficientMessage: conversationalReply,
    }
  }

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
