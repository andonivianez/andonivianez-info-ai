import { track } from "@vercel/analytics"
import type { AudienceType } from "@/lib/audience/profiles"
import type { ProviderId } from "@/lib/ai/types"
import type { Locale } from "@/lib/portfolio/types"
import { hasAnalyticsConsent } from "@/lib/consent/storage"
import { bucketLatency, bucketLength, type TopicClassification } from "./topic"

export interface ChatAnalyticsPayload {
  topic: string
  matchedTerms: string[]
  provider: ProviderId
  locale: Locale
  answered: boolean
  audience: AudienceType
  totalTimeMs: number
  questionLength: number
}

function primaryMatchedTerm(terms: string[]): string {
  return terms[0] ?? "none"
}

export function trackChatQuestion(payload: ChatAnalyticsPayload): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return

  track("chat_question", {
    topic: payload.topic,
    matchedTerm: primaryMatchedTerm(payload.matchedTerms),
    provider: payload.provider,
    locale: payload.locale,
    answered: payload.answered ? "yes" : "no",
    audience: payload.audience,
    latencyBucket: bucketLatency(payload.totalTimeMs),
    questionLengthBucket: bucketLength(payload.questionLength),
  })
}

export function trackChatGap(
  query: string,
  classification: TopicClassification,
  locale: Locale,
  audience: AudienceType,
): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return

  track("chat_gap", {
    topic: classification.topic,
    matchedTerm: primaryMatchedTerm(classification.matchedTerms),
    locale,
    audience,
    questionLengthBucket: bucketLength(query.length),
  })
}
