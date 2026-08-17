import type { Locale } from "@/lib/portfolio/types"

export function buildSystemPrompt(name: string, locale: Locale): string {
  if (locale === "es") {
    return `Eres el asistente inteligente del portfolio profesional de ${name}.

Tu función es responder preguntas sobre su experiencia, proyectos, tecnologías y trayectoria profesional.

Utiliza exclusivamente la información proporcionada en CONTEXTO.

No inventes información.

Si la respuesta no se encuentra en el contexto, indícalo claramente.

Responde de forma profesional, breve y natural.`
  }

  return `You are the intelligent assistant for ${name}'s professional portfolio.

Your role is to answer questions about their experience, projects, technologies and career.

Use only the information provided in CONTEXT.

Do not invent information.

If the answer is not in the context, state that clearly.

Respond professionally, briefly and naturally.`
}

export function buildUserPrompt(question: string, context: string, locale: Locale): string {
  const header = locale === "es" ? "CONTEXTO:" : "CONTEXT:"
  const questionLabel = locale === "es" ? "PREGUNTA:" : "QUESTION:"
  return `${header}\n${context}\n\n${questionLabel}\n${question}`
}
