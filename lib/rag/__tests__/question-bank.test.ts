import { describe, expect, it } from "vitest"
import { tokenizeText, expandAliases, fuzzyMatch } from "@/lib/rag/normalize"
import { retrieve } from "@/lib/rag/retriever"

describe("normalize", () => {
  it("expands RN alias to react native tokens", () => {
    const tokens = expandAliases(tokenizeText("rn"))
    expect(tokens).toContain("react")
    expect(tokens).toContain("native")
  })

  it("accepts close typos for long tokens", () => {
    expect(fuzzyMatch("typescript", "typescrpt")).toBe(true)
    expect(fuzzyMatch("ab", "cd")).toBe(false)
  })
})

type BankEntry = {
  query: string
  locale: "es" | "en"
  expectSources?: string[]
}

const QUESTION_BANK: BankEntry[] = [
  {
    query: "¿Estás disponible para proyectos freelance?",
    locale: "es",
    expectSources: ["faq", "availability"],
  },
  {
    query: "Are you available for freelance projects?",
    locale: "en",
    expectSources: ["faq", "availability"],
  },
  { query: "¿Trabajas en remoto?", locale: "es", expectSources: ["faq"] },
  { query: "Do you work remotely?", locale: "en", expectSources: ["faq"] },
  { query: "¿Qué servicios freelance ofreces?", locale: "es", expectSources: ["service", "faq"] },
  {
    query: "What freelance services do you offer?",
    locale: "en",
    expectSources: ["service", "faq"],
  },
  { query: "¿Por qué contratarte a ti?", locale: "es", expectSources: ["faq"] },
  { query: "Why hire you?", locale: "en", expectSources: ["faq"] },
  { query: "¿Haces diseño gráfico?", locale: "es", expectSources: ["boundary", "faq"] },
  { query: "Do you do graphic design?", locale: "en", expectSources: ["boundary", "faq"] },
  { query: "¿Trabajas con Vue?", locale: "es", expectSources: ["boundary", "faq"] },
  { query: "Do you work with Vue?", locale: "en", expectSources: ["boundary", "faq"] },
  {
    query: "¿Tienes experiencia con React Native?",
    locale: "es",
    expectSources: ["experience", "technology", "skill", "faq"],
  },
  {
    query: "What React Native experience do you have?",
    locale: "en",
    expectSources: ["experience", "technology", "skill", "faq"],
  },
  { query: "¿Qué hiciste en Orbis?", locale: "es", expectSources: ["experience"] },
  { query: "Tell me about Orbis experience", locale: "en", expectSources: ["experience"] },
  { query: "¿Experiencia en Onkologikoa?", locale: "es", expectSources: ["experience"] },
  { query: "ConnectHealth healthcare apps", locale: "en", expectSources: ["experience"] },
  { query: "¿Has sido CTO?", locale: "es", expectSources: ["faq", "experience"] },
  { query: "Have you been a CTO?", locale: "en", expectSources: ["faq", "experience"] },
  { query: "¿Das clases o formación?", locale: "es", expectSources: ["faq", "experience"] },
  {
    query: "Do you teach or provide training?",
    locale: "en",
    expectSources: ["faq", "experience"],
  },
  {
    query: "¿Te han entrevistado en algún podcast?",
    locale: "es",
    expectSources: ["media", "faq"],
  },
  {
    query: "Have you been interviewed on any podcast?",
    locale: "en",
    expectSources: ["media", "faq"],
  },
  { query: "Opground Discovery Tech Stories", locale: "en", expectSources: ["media"] },
  {
    query: "¿Cuál ha sido tu proyecto más complejo?",
    locale: "es",
    expectSources: ["faq", "experience", "project"],
  },
  { query: "Zetup BQ React Native", locale: "en", expectSources: ["experience", "project"] },
  {
    query: "¿Tienes experiencia con firmware embebido?",
    locale: "es",
    expectSources: ["experience", "faq", "technology"],
  },
  { query: "C++ Qt embedded firmware", locale: "en", expectSources: ["experience", "technology"] },
  { query: "¿Experiencia en sector salud?", locale: "es", expectSources: ["faq", "experience"] },
  { query: "healthcare sector experience", locale: "en", expectSources: ["faq", "experience"] },
  { query: "¿Experiencia en energía?", locale: "es", expectSources: ["faq", "experience"] },
  { query: "energy sector Orbis", locale: "en", expectSources: ["experience"] },
  {
    query: "¿Cómo funciona el RAG de este portfolio?",
    locale: "es",
    expectSources: ["faq", "project"],
  },
  { query: "How does this portfolio RAG work?", locale: "en", expectSources: ["faq", "project"] },
  { query: "¿Tienes código en GitHub?", locale: "es", expectSources: ["faq", "project"] },
  { query: "Do you have code on GitHub?", locale: "en", expectSources: ["faq", "project"] },
  { query: "¿Estás buscando empleo?", locale: "es", expectSources: ["faq"] },
  { query: "Are you looking for employment?", locale: "en", expectSources: ["faq"] },
  { query: "¿Firmas NDA?", locale: "es", expectSources: ["faq"] },
  { query: "Do you sign NDA?", locale: "en", expectSources: ["faq"] },
  { query: "¿Recoges proyectos legacy?", locale: "es", expectSources: ["faq"] },
  { query: "Do you take over legacy projects?", locale: "en", expectSources: ["faq"] },
  { query: "¿Dónde vives?", locale: "es", expectSources: ["faq", "profile"] },
  { query: "Where do you live?", locale: "en", expectSources: ["faq", "profile"] },
  { query: "¿Tocas algún instrumento?", locale: "es", expectSources: ["faq"] },
  { query: "Do you play any instrument?", locale: "en", expectSources: ["faq"] },
  { query: "¿Qué haces en tu tiempo libre?", locale: "es", expectSources: ["faq"] },
  { query: "Arduino Raspberry Pi hobbies", locale: "en", expectSources: ["faq"] },
  { query: "¿Qué es el máster BigIA?", locale: "es", expectSources: ["faq", "education"] },
  {
    query: "What is the BigIA master's degree?",
    locale: "en",
    expectSources: ["faq", "education"],
  },
  {
    query: "¿Haces DevOps e infraestructura?",
    locale: "es",
    expectSources: ["faq", "service", "skill"],
  },
  {
    query: "Do you do DevOps and infrastructure?",
    locale: "en",
    expectSources: ["faq", "service", "skill"],
  },
  { query: "¿Cuándo podrías empezar un proyecto?", locale: "es", expectSources: ["faq"] },
  { query: "When could you start a project?", locale: "en", expectSources: ["faq"] },
  { query: "¿Cómo puedo contactarte?", locale: "es", expectSources: ["faq", "availability"] },
  { query: "How can I contact you?", locale: "en", expectSources: ["faq", "availability"] },
  { query: "¿En qué sectores has trabajado?", locale: "es", expectSources: ["faq"] },
  { query: "What sectors have you worked in?", locale: "en", expectSources: ["faq"] },
  { query: "¿Entrenas modelos ML desde cero?", locale: "es", expectSources: ["boundary", "faq"] },
  {
    query: "Do you train ML models from scratch?",
    locale: "en",
    expectSources: ["boundary", "faq"],
  },
  { query: "¿Experiencia con Java enterprise?", locale: "es", expectSources: ["boundary", "faq"] },
  {
    query: "Java enterprise backend experience?",
    locale: "en",
    expectSources: ["boundary", "faq"],
  },
  {
    query: "¿Qué stack utilizas?",
    locale: "es",
    expectSources: ["summary", "technology", "skill"],
  },
  {
    query: "technology stack summary",
    locale: "en",
    expectSources: ["summary", "technology", "skill"],
  },
  {
    query: "¿Cuál es tu experiencia principal?",
    locale: "es",
    expectSources: ["profile", "experience", "faq"],
  },
  {
    query: "What is your main experience?",
    locale: "en",
    expectSources: ["profile", "experience", "faq"],
  },
  { query: "Titaneumáticos CTO", locale: "es", expectSources: ["experience"] },
  { query: "INKORFORMACION teaching cloud APIs", locale: "en", expectSources: ["experience"] },
  { query: "profesor TIC docencia freelance", locale: "es", expectSources: ["experience", "faq"] },
  { query: "freelance IT teacher since 2010", locale: "en", expectSources: ["experience", "faq"] },
  { query: "¿Guardas lo que escribo en el chat?", locale: "es", expectSources: ["faq"] },
  { query: "Do you store what I write in the chat?", locale: "en", expectSources: ["faq"] },
  {
    query: "¿Tienes experiencia con IA?",
    locale: "es",
    expectSources: ["faq", "technology", "project"],
  },
  {
    query: "Do you have AI experience?",
    locale: "en",
    expectSources: ["faq", "technology", "project"],
  },
  { query: "¿Facturas como autónomo?", locale: "es", expectSources: ["faq"] },
  { query: "Do you invoice as self-employed?", locale: "en", expectSources: ["faq"] },
  { query: "¿Ofreces mantenimiento después de la entrega?", locale: "es", expectSources: ["faq"] },
  { query: "Do you offer maintenance after delivery?", locale: "en", expectSources: ["faq"] },
  { query: "¿Cedes la propiedad del código?", locale: "es", expectSources: ["faq"] },
  { query: "Do you transfer code ownership?", locale: "en", expectSources: ["faq"] },
  { query: "¿Trabajas con bolsa de horas?", locale: "es", expectSources: ["faq"] },
  { query: "Do you work with hourly retainer?", locale: "en", expectSources: ["faq"] },
  { query: "¿Prefieres trato directo con el cliente?", locale: "es", expectSources: ["faq"] },
  {
    query: "Do you prefer working directly with the end client?",
    locale: "en",
    expectSources: ["faq"],
  },
  { query: "Wattio C++ Qt domótica MQTT", locale: "es", expectSources: ["experience", "project"] },
  {
    query: "Voladd TuMaker 3D printer app",
    locale: "en",
    expectSources: ["experience", "project"],
  },
  {
    query: "¿Experiencia con rn y módulos nativos?",
    locale: "es",
    expectSources: ["experience", "technology"],
  },
  {
    query: "native modules Java Kotlin Swift",
    locale: "en",
    expectSources: ["experience", "technology"],
  },
  {
    query: "symfony php backend",
    locale: "en",
    expectSources: ["experience", "technology", "skill"],
  },
  { query: "nextjs typescript frontend", locale: "en", expectSources: ["technology", "skill"] },
  {
    query: "docker ci cd github actions",
    locale: "en",
    expectSources: ["experience", "skill", "faq"],
  },
  {
    query: "aws cloud infraestructura",
    locale: "es",
    expectSources: ["experience", "technology", "skill"],
  },
  { query: "iot mqtt ble dispositivos", locale: "es", expectSources: ["experience", "technology"] },
  { query: "¿Qué idiomas hablas?", locale: "es", expectSources: ["faq", "language"] },
  { query: "What languages do you work in?", locale: "en", expectSources: ["faq", "language"] },
  { query: "¿Qué tipo de proyectos aceptas?", locale: "es", expectSources: ["faq", "service"] },
  {
    query: "What types of projects do you accept?",
    locale: "en",
    expectSources: ["faq", "service"],
  },
  { query: "consultoría técnica arquitectura", locale: "es", expectSources: ["service", "faq"] },
  { query: "technical consulting architecture", locale: "en", expectSources: ["service", "faq"] },
  {
    query: "IA aplicada RAG asistentes",
    locale: "es",
    expectSources: ["service", "faq", "project"],
  },
  {
    query: "applied AI RAG assistants",
    locale: "en",
    expectSources: ["service", "faq", "project"],
  },
]

describe("question bank retrieval", () => {
  for (const entry of QUESTION_BANK) {
    it(`[${entry.locale}] "${entry.query.slice(0, 50)}"`, () => {
      const result = retrieve(entry.query, { locale: entry.locale, limit: 8 })
      expect(result.hasRelevantContext).toBe(true)
      expect(result.topScore).toBeGreaterThanOrEqual(2)
      if (entry.expectSources) {
        const topSources = result.chunks.slice(0, 5).map((c) => c.source)
        expect(entry.expectSources.some((source) => topSources.includes(source as never))).toBe(
          true,
        )
      }
    })
  }
})
