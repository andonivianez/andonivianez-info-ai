import type { Chunk, Locale } from "@/lib/portfolio/types"
import { AI_CONFIG } from "@/lib/ai/config"
import { buildChunks } from "./chunker"
import {
  buildKeywordIndex,
  expandAliases,
  fuzzyMatch,
  normalizeText,
  tokenizeText,
} from "./normalize"

const SYNONYMS: Record<string, string[]> = {
  movil: ["mobile", "react native", "ios", "android", "app"],
  mobile: ["react native", "ios", "android", "movil"],
  ia: ["ai", "machine learning", "llm", "rag", "inteligencia artificial", "bigia"],
  ai: ["ia", "machine learning", "llm", "rag", "inteligencia artificial"],
  backend: ["node", "nodejs", "php", "symfony", "api", "servidor"],
  frontend: ["react", "nextjs", "angular", "typescript"],
  devops: ["docker", "aws", "ci/cd", "jenkins", "firebase"],
  tecnologias: ["technologies", "technology", "stack", "tech"],
  technologies: ["tecnologias", "stack", "tech"],
  technology: ["tecnologia", "stack"],
  stack: ["tecnologias", "technologies", "tech"],
  proyectos: ["projects", "project"],
  projects: ["proyectos", "project"],
  project: ["proyecto", "proyectos"],
  experiencia: ["experience", "trayectoria", "historial", "principal"],
  experience: ["experiencia", "background", "main"],
  principal: ["experiencia", "perfil", "profile", "main"],
  main: ["experience", "profile", "principal"],
  formacion: ["education", "estudios", "titulo", "titulacion"],
  estudios: ["education", "formacion"],
  education: ["formacion", "estudios"],
  certificaciones: ["certifications", "certificacion", "certification"],
  certifications: ["certificaciones", "certificacion"],
  idiomas: ["languages", "language", "idioma"],
  languages: ["idiomas", "idioma"],
  language: ["idioma", "idiomas"],
  habilidades: ["skills", "competencias", "soft skills"],
  skills: ["habilidades", "competencias"],
  competencias: ["skills", "habilidades"],
  empresa: ["company", "companies", "organizacion"],
  company: ["empresa", "companies"],
  embebido: ["embedded", "firmware", "iot"],
  embedded: ["embebido", "firmware", "iot"],
  firmware: ["embebido", "embedded"],
  domina: ["master", "experto", "experienced", "proficient"],
  tarifa: ["rate", "rates", "precio", "price", "presupuesto", "budget"],
  tarifas: ["rates", "rate", "precio", "price", "presupuesto", "budget"],
  rate: ["tarifa", "tarifas", "precio", "price", "presupuesto", "budget"],
  rates: ["tarifa", "tarifas", "precio", "price"],
  precio: ["price", "rate", "tarifa", "presupuesto", "budget"],
  price: ["precio", "rate", "tarifa", "presupuesto", "budget"],
  presupuesto: ["budget", "quote", "tarifa", "rate", "precio", "price"],
  budget: ["presupuesto", "tarifa", "rate", "precio", "price"],
  contratar: ["hire", "hiring", "freelance", "disponible", "available", "contact"],
  hire: ["contratar", "hiring", "freelance", "available", "disponible"],
  hiring: ["contratar", "hire", "freelance", "disponible"],
  disponible: ["available", "availability", "freelance", "contratar", "hire"],
  available: ["disponible", "availability", "freelance", "contratar", "hire"],
  disponibilidad: ["availability", "available", "disponible", "freelance"],
  availability: ["disponibilidad", "disponible", "available", "freelance"],
  remoto: ["remote", "teletrabajo", "distancia"],
  remote: ["remoto", "teletrabajo", "distancia"],
  factura: ["invoice", "invoicing", "autonomo", "freelance"],
  invoice: ["factura", "invoicing", "autonomo"],
  autonomo: ["freelance", "self-employed", "independiente", "factura"],
  freelance: ["autonomo", "independiente", "consultoria"],
  servicios: ["services", "service", "soluciones", "solutions", "ofrece"],
  services: ["servicios", "service", "soluciones", "solutions"],
  contacto: ["contact", "email", "linkedin", "malt"],
  contact: ["contacto", "email", "linkedin", "malt"],
  consultoria: ["consulting", "asesoria", "advisory"],
  consulting: ["consultoria", "asesoria"],
  sabes: ["hacer", "servicios", "services", "capabilities", "ofrece"],
  hacer: ["servicios", "services", "capabilities", "ofrece"],
  ofreces: ["servicios", "services", "freelance", "soluciones"],
  puedes: ["servicios", "help", "ayudar", "capabilities"],
  vue: ["frontend", "react", "angular"],
  svelte: ["frontend", "react", "angular"],
  java: ["backend", "enterprise", "net"],
  net: ["backend", "enterprise", "java"],
  diseno: ["design", "ui", "ux", "grafico"],
  design: ["diseno", "ui", "ux", "grafico"],
  entrevista: ["podcast", "opground", "discovery", "media"],
  podcast: ["entrevista", "opground", "discovery", "media"],
  opground: ["entrevista", "podcast", "discovery"],
  docencia: ["teaching", "profesor", "formacion", "clases"],
  teaching: ["docencia", "profesor", "formacion", "clases"],
  profesor: ["docencia", "teaching", "formacion", "clases"],
  clases: ["docencia", "teaching", "profesor", "formacion"],
  zetup: ["bq", "react native", "mobile", "witbox"],
  bq: ["zetup", "react native", "mobile"],
  orbis: ["energia", "energy", "utilities"],
  onkologikoa: ["salud", "health", "oncology", "clinical"],
  connecthealth: ["salud", "health", "healthcare", "react native"],
  empleo: ["employment", "job", "trabajo", "orbis"],
  trabajo: ["employment", "job", "empleo", "orbis"],
  bot: ["asistente", "assistant", "chat", "ia"],
  privacidad: ["privacy", "datos", "data", "cookies"],
  privacy: ["privacidad", "datos", "data", "cookies"],
}

const SOURCE_BOOST: Partial<Record<Chunk["source"], number>> = {
  experience: 1.2,
  project: 1.15,
  technology: 1.1,
  profile: 1.05,
  certification: 1.1,
  softskill: 1.05,
  summary: 1.08,
  service: 1.25,
  faq: 1.3,
  availability: 1.35,
  boundary: 1.4,
  media: 1.25,
}

function expandQueryTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens)
  for (const token of tokens) {
    const synonyms = SYNONYMS[token]
    if (synonyms) {
      for (const synonym of synonyms) {
        tokenizeText(synonym, false).forEach((t) => expanded.add(t))
      }
    }
  }
  return expandAliases([...expanded])
}

function tokenScore(
  token: string,
  candidates: Set<string>,
  weight: number,
  fuzzyCandidates?: Set<string>,
): number {
  if (candidates.has(token)) return weight
  if (fuzzyCandidates) {
    for (const candidate of fuzzyCandidates) {
      if (fuzzyMatch(token, candidate)) return weight * 0.5
    }
  }
  return 0
}

function scoreChunk(
  chunk: Chunk,
  queryTokens: string[],
  normalizedQuery: string,
  sourceBoost?: Partial<Record<Chunk["source"], number>>,
): { score: number; matchedTokens: number } {
  const titleTokens = new Set(tokenizeText(chunk.title))
  const textTokens = new Set(tokenizeText(chunk.text))
  const keywordIndex = buildKeywordIndex(chunk.keywords)
  let score = 0
  let matchedTokens = 0

  for (const token of queryTokens) {
    const titleScore = tokenScore(token, titleTokens, 3, titleTokens)
    const keywordScore = tokenScore(token, keywordIndex.tokens, 2.5, keywordIndex.tokens)
    const textScore = tokenScore(token, textTokens, 1, textTokens)
    const tokenScoreTotal = titleScore + keywordScore + textScore
    if (tokenScoreTotal > 0) matchedTokens += 1
    score += tokenScoreTotal
  }

  for (const phrase of keywordIndex.phrases) {
    if (normalizedQuery.includes(phrase)) {
      score += 3
      matchedTokens += 1
    }
  }

  const boost = sourceBoost?.[chunk.source] ?? SOURCE_BOOST[chunk.source] ?? 1
  return { score: score * boost, matchedTokens }
}

export interface RetrieveOptions {
  locale: Locale
  limit?: number
  minScore?: number
  minMatchedTokens?: number
  sourceBoost?: Partial<Record<Chunk["source"], number>>
}

export interface RetrieveResult {
  chunks: Chunk[]
  topScore: number
  hasRelevantContext: boolean
}

export function retrieve(query: string, options: RetrieveOptions): RetrieveResult {
  const {
    locale,
    limit = 5,
    minScore = AI_CONFIG.minRetrievalScore,
    minMatchedTokens = 2,
    sourceBoost,
  } = options
  const normalizedQuery = normalizeText(query)
  const queryTokens = expandQueryTokens(tokenizeText(query))
  const chunks = buildChunks(locale)

  const scored = chunks
    .map((chunk) => {
      const { score, matchedTokens } = scoreChunk(chunk, queryTokens, normalizedQuery, sourceBoost)
      return {
        ...chunk,
        score,
        matchedTokens,
      }
    })
    .filter((chunk) => chunk.score > 0 && chunk.matchedTokens >= minMatchedTokens)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit)

  const topScore = scored[0]?.score ?? 0

  return {
    chunks: scored,
    topScore,
    hasRelevantContext: topScore >= minScore,
  }
}

export interface Retriever {
  retrieve(query: string, options?: Partial<RetrieveOptions>): RetrieveResult
}

export function createRetriever(defaultOptions: RetrieveOptions): Retriever {
  return {
    retrieve(query: string, options?: Partial<RetrieveOptions>) {
      return retrieve(query, { ...defaultOptions, ...options })
    },
  }
}
