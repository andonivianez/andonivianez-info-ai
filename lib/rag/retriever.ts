import type { Chunk, Locale } from "@/lib/portfolio/types"
import { AI_CONFIG } from "@/lib/ai/config"
import { buildChunks } from "./chunker"

const STOPWORDS = new Set([
  "a",
  "al",
  "con",
  "de",
  "del",
  "el",
  "en",
  "es",
  "la",
  "las",
  "lo",
  "los",
  "para",
  "por",
  "que",
  "un",
  "una",
  "the",
  "and",
  "or",
  "in",
  "on",
  "at",
  "to",
  "for",
  "with",
  "is",
  "are",
  "was",
  "were",
  "su",
  "sus",
  "mi",
  "mis",
])

const SYNONYMS: Record<string, string[]> = {
  movil: ["mobile", "react native", "ios", "android", "app"],
  móvil: ["mobile", "react native", "ios", "android", "app"],
  mobile: ["react native", "ios", "android", "movil", "móvil"],
  ia: ["ai", "machine learning", "llm", "rag", "inteligencia artificial", "bigia"],
  ai: ["ia", "machine learning", "llm", "rag", "inteligencia artificial"],
  backend: ["node", "nodejs", "php", "symfony", "api", "servidor"],
  frontend: ["react", "nextjs", "angular", "typescript"],
  devops: ["docker", "aws", "ci/cd", "jenkins", "firebase"],
  tecnologias: ["technologies", "technology", "stack", "tech"],
  tecnologías: ["technologies", "technology", "stack", "tech"],
  technologies: ["tecnologias", "tecnologías", "stack", "tech"],
  technology: ["tecnologia", "tecnología", "stack"],
  stack: ["tecnologias", "technologies", "tech"],
  proyectos: ["projects", "project"],
  projects: ["proyectos", "project"],
  project: ["proyecto", "proyectos"],
  experiencia: ["experience", "trayectoria", "historial"],
  experience: ["experiencia", "background"],
  formacion: ["education", "estudios", "titulo", "titulacion"],
  formación: ["education", "estudios", "titulo", "titulación"],
  estudios: ["education", "formacion", "formación"],
  education: ["formacion", "formación", "estudios"],
  certificaciones: ["certifications", "certificacion", "certification"],
  certifications: ["certificaciones", "certificacion"],
  certificacion: ["certification", "certificaciones"],
  certification: ["certificacion", "certificaciones"],
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
  master: ["domina", "expert", "proficient"],
  destacar: ["highlight", "featured", "notable"],
  destacaría: ["highlight", "featured"],
  soluciones: ["solutions", "services", "offerings"],
  solutions: ["soluciones", "servicios"],
  decisiones: ["decisions", "technical", "architecture", "achievements", "logros"],
  decisions: ["decisiones", "technical", "architecture"],
  tecnicas: ["technical", "techniques", "architecture"],
  técnicas: ["technical", "techniques", "architecture"],
  tomado: ["taken", "made", "decisions"],
  capabilities: ["skills", "competencias", "habilidades", "soft skills", "capacidades"],
  stand: ["destacan", "highlight", "outstanding"],
  destacan: ["stand out", "capabilities", "skills"],
  capacidades: ["capabilities", "skills", "competencias"],
  similar: ["similar", "comparable", "relevant"],
}

const SOURCE_BOOST: Partial<Record<Chunk["source"], number>> = {
  experience: 1.2,
  project: 1.15,
  technology: 1.1,
  profile: 1.05,
  certification: 1.1,
  softskill: 1.05,
  summary: 1.08,
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s/+.-]/g, " ")
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token))
}

function expandQueryTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens)
  for (const token of tokens) {
    const synonyms = SYNONYMS[token]
    if (synonyms) {
      for (const synonym of synonyms) {
        tokenize(synonym).forEach((t) => expanded.add(t))
      }
    }
  }
  return [...expanded]
}

function scoreChunk(
  chunk: Chunk,
  queryTokens: string[],
  sourceBoost?: Partial<Record<Chunk["source"], number>>,
): number {
  const titleTokens = new Set(tokenize(chunk.title))
  const keywordTokens = new Set(chunk.keywords.map((k) => normalize(k)))
  const textTokens = new Set(tokenize(chunk.text))
  let score = 0

  for (const token of queryTokens) {
    if (titleTokens.has(token)) score += 3
    if (keywordTokens.has(token)) score += 2.5
    if (textTokens.has(token)) score += 1
  }

  const boost = sourceBoost?.[chunk.source] ?? SOURCE_BOOST[chunk.source] ?? 1
  return score * boost
}

export interface RetrieveOptions {
  locale: Locale
  limit?: number
  minScore?: number
  sourceBoost?: Partial<Record<Chunk["source"], number>>
}

export interface RetrieveResult {
  chunks: Chunk[]
  topScore: number
  hasRelevantContext: boolean
}

export function retrieve(query: string, options: RetrieveOptions): RetrieveResult {
  const { locale, limit = 5, minScore = AI_CONFIG.minRetrievalScore, sourceBoost } = options
  const queryTokens = expandQueryTokens(tokenize(query))
  const chunks = buildChunks(locale)

  const scored = chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(chunk, queryTokens, sourceBoost),
    }))
    .filter((chunk) => chunk.score > 0)
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
