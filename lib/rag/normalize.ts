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
  "tu",
  "tus",
  "te",
  "me",
  "se",
  "y",
  "o",
  "si",
  "no",
])

export const ALIASES: Record<string, string[]> = {
  rn: ["react", "native"],
  ts: ["typescript"],
  js: ["javascript"],
  k8s: ["kubernetes"],
  ci: ["continuous", "integration"],
  cd: ["continuous", "deployment"],
  pg: ["postgresql", "postgres"],
  rs: ["rust"],
  next: ["nextjs"],
  nextjs: ["next", "js"],
  tfm: ["master", "bigia", "thesis"],
  llm: ["model", "language"],
  bd: ["database", "base", "datos"],
  ble: ["bluetooth"],
  mqtt: ["iot"],
  nda: ["confidencialidad", "confidentiality"],
  cto: ["chief", "technology", "officer"],
}

const LEMMA_SUFFIXES = [
  "mente",
  "acion",
  "ación",
  "cion",
  "ción",
  "ando",
  "iendo",
  "ados",
  "adas",
  "ados",
  "idos",
  "idas",
  "mente",
  "ings",
  "ing",
  "ed",
  "es",
  "s",
]

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s/+.-]/g, " ")
}

export function lemmatizeToken(token: string): string {
  if (token.length <= 4) return token
  for (const suffix of LEMMA_SUFFIXES) {
    if (token.endsWith(suffix) && token.length - suffix.length >= 3) {
      return token.slice(0, -suffix.length)
    }
  }
  return token
}

function addAliasTokens(tokens: Set<string>, aliasList: string[]): void {
  for (const alias of aliasList) {
    normalizeText(alias)
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOPWORDS.has(t))
      .forEach((t) => tokens.add(t))
  }
}

export function tokenizeText(text: string, includeLemma = true): string[] {
  const raw = normalizeText(text)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token))

  const tokens = new Set<string>()
  for (const token of raw) {
    tokens.add(token)
    if (includeLemma) {
      const lemma = lemmatizeToken(token)
      if (lemma !== token && lemma.length > 1) tokens.add(lemma)
    }
    const aliases = ALIASES[token]
    if (aliases) addAliasTokens(tokens, aliases)
  }
  return [...tokens]
}

export function expandAliases(tokens: string[]): string[] {
  const expanded = new Set(tokens)
  for (const token of tokens) {
    const aliases = ALIASES[token]
    if (aliases) addAliasTokens(expanded, aliases)
  }
  return [...expanded]
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      const row = matrix[i]!
      const prevRow = matrix[i - 1]!
      row[j] = Math.min(prevRow[j]! + 1, row[j - 1]! + 1, prevRow[j - 1]! + cost)
    }
  }
  return matrix[a.length]![b.length]!
}

export function fuzzyMatch(token: string, candidate: string): boolean {
  if (token.length < 5 || candidate.length < 5) return false
  return levenshtein(token, candidate) <= 1
}

export function buildKeywordIndex(keywords: string[]): {
  tokens: Set<string>
  phrases: string[]
} {
  const tokens = new Set<string>()
  const phrases: string[] = []

  for (const keyword of keywords) {
    const normalized = normalizeText(keyword)
    if (normalized.includes(" ")) {
      phrases.push(normalized)
      tokenizeText(normalized, false).forEach((t) => tokens.add(t))
    } else {
      tokens.add(normalized)
    }
  }
  return { tokens, phrases }
}

export { STOPWORDS }
