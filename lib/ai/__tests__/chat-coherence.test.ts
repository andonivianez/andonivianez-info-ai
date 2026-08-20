import { describe, expect, it } from "vitest"
import { FallbackProvider, buildPromptBundle } from "@/lib/ai/providers/fallback"
import { getSuggestedQuestions } from "@/lib/audience/profiles"
import type { Locale } from "@/lib/portfolio/types"

async function askChat(question: string, locale: Locale): Promise<string> {
  const bundle = buildPromptBundle(question, locale)
  if (!bundle.hasRelevantContext) return bundle.insufficientMessage
  const prompt = `${bundle.systemPrompt}\n\n${bundle.userPrompt}`
  return new FallbackProvider().generate(prompt)
}

type Case = {
  question: string
  locale: Locale
  mustMatch: RegExp
  mustNot?: RegExp
}

const CASES: Case[] = [
  {
    question: "hola",
    locale: "es",
    mustMatch: /Hola|experiencia|freelance/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Cuál es tu experiencia principal?",
    locale: "es",
    mustMatch: /15|años|full stack|Orbis|ingeniero/i,
    mustNot: /No encuentro|Tecnologías:/,
  },
  {
    question: "¿Estás disponible para proyectos freelance?",
    locale: "es",
    mustMatch: /disponib|kick-off|Orbis|freelance/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Qué servicios ofreces?",
    locale: "es",
    mustMatch: /React|Next|freelance|desarrollo|IA|móvil/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Tienes experiencia con IA?",
    locale: "es",
    mustMatch: /RAG|local|BigIA|asistente/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Cómo puedo contactarte?",
    locale: "es",
    mustMatch: /andoni\.bartolo@gmail\.com|Malt|LinkedIn/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Haces diseño gráfico?",
    locale: "es",
    mustMatch: /no soy diseñador|no /i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Trabajas con Vue?",
    locale: "es",
    mustMatch: /React|Next|Angular|no/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Qué experiencia tienes con React Native?",
    locale: "es",
    mustMatch: /React Native|BQ|Orbis/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Qué hiciste en Orbis?",
    locale: "es",
    mustMatch: /Orbis|energ|React|producción/i,
    mustNot: /No encuentro/,
  },
  {
    question: "What is your main experience?",
    locale: "en",
    mustMatch: /15|years|full stack|Orbis|engineer/i,
    mustNot: /cannot find/i,
  },
  {
    question: "Are you available for freelance projects?",
    locale: "en",
    mustMatch: /available|kick-off|Orbis|freelance/i,
    mustNot: /cannot find/i,
  },
  {
    question: "How can I contact you?",
    locale: "en",
    mustMatch: /andoni\.bartolo@gmail\.com|Malt|LinkedIn/i,
    mustNot: /cannot find/i,
  },
  {
    question: "Do you have AI experience?",
    locale: "en",
    mustMatch: /RAG|local|BigIA|assistant/i,
    mustNot: /cannot find/i,
  },
  {
    question: "¿Cuáles son tus tarifas?",
    locale: "es",
    mustMatch: /presupuesto|Malt|andoni\.bartolo/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Trabajas en remoto?",
    locale: "es",
    mustMatch: /remoto|País Vasco|Gipuzkoa/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Estás buscando empleo?",
    locale: "es",
    mustMatch: /no busco|Orbis|freelance/i,
    mustNot: /No encuentro/,
  },
  {
    question: "¿Qué es el máster BigIA?",
    locale: "es",
    mustMatch: /BigIA|Isabel|máster|IA/i,
    mustNot: /No encuentro/,
  },
]

describe("chat coherence against the real fallback pipeline", () => {
  for (const entry of CASES) {
    it(`[${entry.locale}] ${entry.question}`, async () => {
      const answer = await askChat(entry.question, entry.locale)
      expect(answer.length).toBeGreaterThan(24)
      expect(answer).toMatch(entry.mustMatch)
      if (entry.mustNot) expect(answer).not.toMatch(entry.mustNot)
    })
  }

  it("answers every default suggested question without giving up", async () => {
    for (const locale of ["es", "en"] as const) {
      for (const question of getSuggestedQuestions("default", locale)) {
        const answer = await askChat(question, locale)
        expect(answer).not.toMatch(
          /No encuentro información suficiente|cannot find enough information/i,
        )
        expect(answer.length).toBeGreaterThan(24)
      }
    }
  })
})
