import type { ProviderId } from "./types"

export const AI_CONFIG = {
  defaultWebLLMModel: "Llama-3.2-1B-Instruct-q4f32_1-MLC",
  contextBudget: 2000,
  minRetrievalScore: 2,
  metricsStorageKey: "portfolio-ai-metrics",
  metricsMaxEntries: 200,
  providerPriority: ["chrome-ai", "webllm", "fallback"] as ProviderId[],
} as const

export function getWebLLMModel(): string {
  if (typeof window === "undefined") return AI_CONFIG.defaultWebLLMModel
  return localStorage.getItem("webllm-model") ?? AI_CONFIG.defaultWebLLMModel
}

export function setWebLLMModel(modelId: string): void {
  localStorage.setItem("webllm-model", modelId)
}
