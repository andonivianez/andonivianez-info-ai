import { AI_CONFIG } from "@/lib/ai/config"
import type { ProviderId } from "@/lib/ai/types"

export interface AIMetric {
  id: string
  provider: ProviderId
  timestamp: number
  questionLength: number
  contextLength: number
  responseLength: number
  retrievalTime: number
  generationTime: number
  totalTime: number
  success: boolean
  errorType?: string
  answeredWithoutLLM: boolean
  chunksRetrieved: number
  topScore: number
  locale: string
  sessionId: string
  topic?: string
  matchedTerms?: string[]
}

export interface MetricsSummary {
  totalQueries: number
  averageTotalTime: number
  averageRetrievalTime: number
  averageGenerationTime: number
  averageContextLength: number
  errorCount: number
  providerCounts: Record<string, number>
  topicCounts: Record<string, number>
  gapCount: number
}

export interface MetricsStore {
  add(metric: AIMetric): void
  list(): AIMetric[]
  summary(): MetricsSummary
  clear(): void
  exportJson(): string
  exportCsv(): string
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function createSessionId(): string {
  if (typeof window === "undefined") return "server"
  const key = "portfolio-ai-session"
  const existing = sessionStorage.getItem(key)
  if (existing) return existing
  const id = createId()
  sessionStorage.setItem(key, id)
  return id
}

function isQuotaExceededError(error: unknown): boolean {
  if (!(error instanceof DOMException)) return false
  return (
    error.name === "QuotaExceededError" ||
    error.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
    error.code === 22
  )
}

export class LocalStorageMetricsStore implements MetricsStore {
  private key = AI_CONFIG.metricsStorageKey

  add(metric: AIMetric): void {
    if (typeof window === "undefined") return

    let metrics = [metric, ...this.list()].slice(0, AI_CONFIG.metricsMaxEntries)

    while (metrics.length > 0) {
      try {
        localStorage.setItem(this.key, JSON.stringify(metrics))
        return
      } catch (error) {
        if (!isQuotaExceededError(error)) return

        // Liberar espacio: recortar a la mitad; si solo queda la nueva, descartarla.
        if (metrics.length === 1) {
          try {
            localStorage.removeItem(this.key)
          } catch {
            // Ignorar: las métricas no son críticas para el chat.
          }
          return
        }

        metrics = metrics.slice(0, Math.max(1, Math.floor(metrics.length / 2)))
      }
    }
  }

  list(): AIMetric[] {
    if (typeof window === "undefined") return []
    try {
      const raw = localStorage.getItem(this.key)
      return raw ? (JSON.parse(raw) as AIMetric[]) : []
    } catch {
      return []
    }
  }

  summary(): MetricsSummary {
    const metrics = this.list()
    if (metrics.length === 0) {
      return {
        totalQueries: 0,
        averageTotalTime: 0,
        averageRetrievalTime: 0,
        averageGenerationTime: 0,
        averageContextLength: 0,
        errorCount: 0,
        providerCounts: {},
        topicCounts: {},
        gapCount: 0,
      }
    }

    const providerCounts: Record<string, number> = {}
    const topicCounts: Record<string, number> = {}
    let totalTime = 0
    let retrievalTime = 0
    let generationTime = 0
    let contextLength = 0
    let errorCount = 0
    let gapCount = 0

    for (const metric of metrics) {
      providerCounts[metric.provider] = (providerCounts[metric.provider] ?? 0) + 1
      if (metric.topic) {
        topicCounts[metric.topic] = (topicCounts[metric.topic] ?? 0) + 1
      }
      if (metric.chunksRetrieved === 0 && metric.answeredWithoutLLM) {
        gapCount += 1
      }
      totalTime += metric.totalTime
      retrievalTime += metric.retrievalTime
      generationTime += metric.generationTime
      contextLength += metric.contextLength
      if (!metric.success) errorCount += 1
    }

    const count = metrics.length
    return {
      totalQueries: count,
      averageTotalTime: totalTime / count,
      averageRetrievalTime: retrievalTime / count,
      averageGenerationTime: generationTime / count,
      averageContextLength: contextLength / count,
      errorCount,
      providerCounts,
      topicCounts,
      gapCount,
    }
  }

  clear(): void {
    localStorage.removeItem(this.key)
  }

  exportJson(): string {
    return JSON.stringify({ metrics: this.list(), summary: this.summary() }, null, 2)
  }

  exportCsv(): string {
    const metrics = this.list()
    const headers = [
      "id",
      "provider",
      "timestamp",
      "questionLength",
      "contextLength",
      "responseLength",
      "retrievalTime",
      "generationTime",
      "totalTime",
      "success",
      "answeredWithoutLLM",
      "chunksRetrieved",
      "topScore",
      "locale",
      "topic",
      "matchedTerms",
    ]
    const rows = metrics.map((m) =>
      [
        m.id,
        m.provider,
        m.timestamp,
        m.questionLength,
        m.contextLength,
        m.responseLength,
        m.retrievalTime,
        m.generationTime,
        m.totalTime,
        m.success,
        m.answeredWithoutLLM,
        m.chunksRetrieved,
        m.topScore,
        m.locale,
        m.topic ?? "",
        (m.matchedTerms ?? []).join("|"),
      ].join(","),
    )
    return [headers.join(","), ...rows].join("\n")
  }
}

export function createMetric(partial: Omit<AIMetric, "id" | "timestamp" | "sessionId">): AIMetric {
  return {
    id: createId(),
    timestamp: Date.now(),
    sessionId: createSessionId(),
    ...partial,
  }
}

export const metricsStore = new LocalStorageMetricsStore()
