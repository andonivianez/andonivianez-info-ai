import type { Locale } from "@/lib/portfolio/types"

const SPANISH_HINTS = [
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

export function extractQuestionFromPrompt(prompt: string): string {
  const markers = ["PREGUNTA:", "QUESTION:"]
  for (const marker of markers) {
    const index = prompt.lastIndexOf(marker)
    if (index >= 0) return prompt.slice(index + marker.length).trim()
  }
  return prompt.trim()
}

export function extractContextFromPrompt(prompt: string): string {
  const startMarker = prompt.includes("CONTEXTO:") ? "CONTEXTO:" : "CONTEXT:"
  const endMarker = prompt.includes("PREGUNTA:") ? "PREGUNTA:" : "QUESTION:"
  const start = prompt.indexOf(startMarker)
  const end = prompt.lastIndexOf(endMarker)
  if (start < 0 || end <= start) return ""
  return prompt.slice(start + startMarker.length, end).trim()
}

export function detectPromptLocale(prompt: string): Locale {
  if (prompt.includes("CONTEXTO:") || prompt.includes("PREGUNTA:")) return "es"
  if (prompt.includes("CONTEXT:") || prompt.includes("QUESTION:")) return "en"
  const lower = prompt.toLowerCase()
  return SPANISH_HINTS.some((hint) => lower.includes(hint)) ? "es" : "en"
}
