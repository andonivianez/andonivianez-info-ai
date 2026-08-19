"use client"

import { useCallback, useRef, useState } from "react"
import { trackChatGap, trackChatQuestion } from "@/lib/analytics/events"
import { classifyTopic } from "@/lib/analytics/topic"
import { rewriteQueryWithHistory } from "@/lib/ai/follow-up"
import { buildPromptBundle } from "@/lib/ai/providers/fallback"
import { getFollowUpQuestions } from "@/lib/ai/suggested-followups"
import type { AudienceType } from "@/lib/audience/profiles"
import type { ProviderId } from "@/lib/ai/types"
import { createMetric, metricsStore } from "@/lib/metrics/ai-metrics"
import type { Locale } from "@/lib/portfolio/types"
import { useAIRuntime } from "./use-ai-runtime"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function useAIAssistant(locale: Locale, audience: AudienceType = "default") {
  const runtime = useAIRuntime()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const abortRef = useRef<AbortController | null>(null)

  const ask = useCallback(
    async (question: string) => {
      if (!question.trim() || isGenerating) return

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: "user",
        content: question.trim(),
      }
      const historyBeforeAsk = messages
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsGenerating(true)
      setFollowUpQuestions([])

      const retrievalQuery = rewriteQueryWithHistory(question.trim(), historyBeforeAsk)

      const startedAt = performance.now()
      let retrievalTime = 0
      let generationTime = 0
      let responseText = ""
      let success = true
      let errorType: string | undefined
      let bundle = buildPromptBundle(retrievalQuery, locale, audience)

      try {
        if (!runtime.initialized) {
          await runtime.initialize()
        }

        const retrievalStarted = performance.now()
        bundle = buildPromptBundle(retrievalQuery, locale, audience)
        retrievalTime = performance.now() - retrievalStarted
        const updatedClassification = classifyTopic(bundle.chunks, question)

        if (!bundle.hasRelevantContext) {
          responseText = bundle.insufficientMessage
          const assistantMessage: ChatMessage = {
            id: createMessageId(),
            role: "assistant",
            content: responseText,
          }
          setMessages((prev) => [...prev, assistantMessage])

          if (!bundle.conversationalReply) {
            trackChatGap(question, updatedClassification, locale, audience)
          }

          metricsStore.add(
            createMetric({
              provider: runtime.activeProviderId ?? "fallback",
              questionLength: question.length,
              contextLength: 0,
              responseLength: responseText.length,
              retrievalTime,
              generationTime: 0,
              totalTime: performance.now() - startedAt,
              success: true,
              answeredWithoutLLM: true,
              chunksRetrieved: 0,
              topScore: bundle.topScore,
              locale,
              topic: updatedClassification.topic,
              matchedTerms: updatedClassification.matchedTerms,
            }),
          )
          return
        }

        abortRef.current = new AbortController()
        const generationStarted = performance.now()
        const provider = runtime.activeProvider ?? (await runtime.manager.selectBestProvider())
        const prompt = `${bundle.systemPrompt}\n\n${bundle.userPrompt}`

        if (provider.stream) {
          const assistantId = createMessageId()
          setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }])

          for await (const chunk of provider.stream(prompt, undefined, abortRef.current.signal)) {
            responseText += chunk
            setMessages((prev) =>
              prev.map((msg) => (msg.id === assistantId ? { ...msg, content: responseText } : msg)),
            )
          }
        } else {
          responseText = await provider.generate(prompt, undefined, abortRef.current.signal)
          setMessages((prev) => [
            ...prev,
            { id: createMessageId(), role: "assistant", content: responseText },
          ])
        }

        generationTime = performance.now() - generationStarted
        setFollowUpQuestions(getFollowUpQuestions(bundle.chunks, locale))
      } catch (err) {
        success = false
        errorType = err instanceof Error ? err.name : "UnknownError"
        responseText =
          locale === "es"
            ? "Ha ocurrido un error al generar la respuesta. Inténtalo de nuevo."
            : "An error occurred while generating the response. Please try again."
        setMessages((prev) => [
          ...prev,
          { id: createMessageId(), role: "assistant", content: responseText },
        ])
      } finally {
        const totalTime = performance.now() - startedAt
        const finalClassification = classifyTopic(bundle.chunks, question)
        const providerId = (runtime.activeProviderId ?? "fallback") as ProviderId

        trackChatQuestion({
          topic: finalClassification.topic,
          matchedTerms: finalClassification.matchedTerms,
          provider: providerId,
          locale,
          answered: bundle.hasRelevantContext && success,
          audience,
          totalTimeMs: totalTime,
          questionLength: question.length,
        })

        metricsStore.add(
          createMetric({
            provider: providerId,
            questionLength: question.length,
            contextLength: bundle.context.length,
            responseLength: responseText.length,
            retrievalTime,
            generationTime,
            totalTime,
            success,
            errorType,
            answeredWithoutLLM: !runtime.activeProvider?.isGenerative,
            chunksRetrieved: bundle.chunks.length,
            topScore: bundle.topScore,
            locale,
            topic: finalClassification.topic,
            matchedTerms: finalClassification.matchedTerms,
          }),
        )
        setIsGenerating(false)
        abortRef.current = null
      }
    },
    [isGenerating, locale, audience, runtime, messages],
  )

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setIsGenerating(false)
  }, [])

  const clear = useCallback(() => {
    setMessages([])
    setInput("")
    setFollowUpQuestions([])
  }, [])

  return {
    ...runtime,
    messages,
    input,
    setInput,
    isGenerating,
    followUpQuestions,
    ask,
    cancel,
    clear,
  }
}
