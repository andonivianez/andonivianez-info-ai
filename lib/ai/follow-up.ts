interface HistoryMessage {
  role: "user" | "assistant"
  content: string
}

const FOLLOW_UP_PATTERNS = [
  /^y (en|con|de|sobre|para|el|la|los|las|que|qué|como|cómo)/i,
  /^and (about|in|with|for|the|what|how)/i,
  /^(cuéntame|cuentame|dime|explica|amplia|más|mas|more|tell me|explain)/i,
  /^(y eso|y eso cómo|y eso como|how about that|what about)/i,
  /^(sí|si|yes|ok|vale|claro)[\s,.!?]*$/i,
  /^(¿?y\b)/i,
]

const SHORT_QUERY_MAX_WORDS = 5

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 8)
}

export function isFollowUpQuery(query: string): boolean {
  const trimmed = query.trim()
  if (!trimmed) return false
  const words = trimmed.split(/\s+/).length
  if (FOLLOW_UP_PATTERNS.some((pattern) => pattern.test(trimmed))) return true
  return words <= SHORT_QUERY_MAX_WORDS
}

export function rewriteQueryWithHistory(query: string, messages: HistoryMessage[]): string {
  if (messages.length < 2 || !isFollowUpQuery(query)) return query

  const lastUser = [...messages].reverse().find((m) => m.role === "user")
  if (!lastUser) return query

  const keywords = extractKeywords(lastUser.content)
  if (keywords.length === 0) return `${lastUser.content}. ${query}`

  return `${keywords.join(" ")} ${query}`.trim()
}
