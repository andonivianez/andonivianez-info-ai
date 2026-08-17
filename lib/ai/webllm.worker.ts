/// <reference lib="webworker" />

import { CreateMLCEngine, type MLCEngineInterface } from "@mlc-ai/web-llm"
import type { ProviderProgress } from "./types"

let engine: MLCEngineInterface | null = null
let abortController: AbortController | null = null

const postProgress = (progress: ProviderProgress) => {
  self.postMessage({ type: "progress", progress })
}

self.onmessage = async (event: MessageEvent) => {
  const data = event.data as
    { type: "init"; modelId: string } | { type: "generate"; prompt: string } | { type: "abort" }

  try {
    if (data.type === "init") {
      postProgress({ state: "checking", detail: "Preparando IA local..." })
      engine = await CreateMLCEngine(data.modelId, {
        initProgressCallback: (report) => {
          postProgress({
            state: "downloading",
            progress: Math.round(report.progress * 100),
            detail: report.text || "Descargando modelo...",
          })
        },
      })
      postProgress({ state: "ready", progress: 100, detail: "IA lista" })
      self.postMessage({ type: "done", text: "__ready__" })
      return
    }

    if (data.type === "abort") {
      abortController?.abort()
      return
    }

    if (data.type === "generate") {
      if (!engine) throw new Error("Engine not initialized")
      abortController = new AbortController()
      postProgress({ state: "initializing", detail: "Generando respuesta..." })

      const chunks = await engine.chat.completions.create({
        messages: [{ role: "user", content: data.prompt }],
        stream: true,
        stream_options: { include_usage: true },
      })

      let fullText = ""
      for await (const chunk of chunks) {
        if (abortController.signal.aborted) break
        const delta = chunk.choices[0]?.delta?.content ?? ""
        if (delta) {
          fullText += delta
          self.postMessage({ type: "token", token: delta })
        }
      }

      self.postMessage({ type: "done", text: fullText })
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      message: error instanceof Error ? error.message : "Unknown worker error",
    })
  }
}

export {}
