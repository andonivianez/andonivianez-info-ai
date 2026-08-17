"use client"

import { useCallback, useRef, useState } from "react"
import { buildPromptBundle } from "@/lib/ai/providers/fallback"
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

export function useAIAssistant(locale: Locale) {
  const runtime = useAIRuntime()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const ask = useCallback(
    async (question: string) => {
      if (!question.trim() || isGenerating) return

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: "user",
        content: question.trim(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsGenerating(true)

      const startedAt = performance.now()
      let retrievalTime = 0
      let generationTime = 0
      let responseText = ""
      let success = true
      let errorType: string | undefined

      try {
        if (!runtime.initialized) {
          await runtime.initialize()
        }

        const retrievalStarted = performance.now()
        const bundle = buildPromptBundle(question, locale)
        retrievalTime = performance.now() - retrievalStarted

        if (!bundle.hasRelevantContext) {
          responseText = bundle.insufficientMessage
          const assistantMessage: ChatMessage = {
            id: createMessageId(),
            role: "assistant",
            content: responseText,
          }
          setMessages((prev) => [...prev, assistantMessage])

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
        metricsStore.add(
          createMetric({
            provider: (runtime.activeProviderId ?? "fallback") as ProviderId,
            questionLength: question.length,
            contextLength: buildPromptBundle(question, locale).context.length,
            responseLength: responseText.length,
            retrievalTime,
            generationTime,
            totalTime: performance.now() - startedAt,
            success,
            errorType,
            answeredWithoutLLM: !runtime.activeProvider?.isGenerative,
            chunksRetrieved: buildPromptBundle(question, locale).chunks.length,
            topScore: buildPromptBundle(question, locale).topScore,
            locale,
          }),
        )
        setIsGenerating(false)
        abortRef.current = null
      }
    },
    [isGenerating, locale, runtime],
  )

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setIsGenerating(false)
  }, [])

  const clear = useCallback(() => {
    setMessages([])
    setInput("")
  }, [])

  return {
    ...runtime,
    messages,
    input,
    setInput,
    isGenerating,
    ask,
    cancel,
    clear,
  }
}
