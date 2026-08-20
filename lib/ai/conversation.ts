import type { Locale } from "@/lib/portfolio/types"
import { getProfile } from "@/lib/portfolio"

export type ConversationIntent =
  | "greeting"
  | "smalltalk"
  | "capabilities"
  | "thanks"
  | "help"
  | "goodbye"
  | "meta"
  | "basque"
  | null

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const GREETINGS = new Set([
  "hola",
  "hola hola",
  "holi",
  "hello",
  "hello hello",
  "hi",
  "hey",
  "hey there",
  "buenas",
  "buenos dias",
  "buenas tardes",
  "buenas noches",
  "saludos",
  "good morning",
  "good afternoon",
  "good evening",
])

const SMALLTALK = new Set([
  "que tal",
  "que tal estas",
  "que tal va",
  "como estas",
  "como va",
  "como te va",
  "que pasa",
  "que hay",
  "how are you",
  "how are you doing",
  "whats up",
  "what s up",
])

const CAPABILITIES = new Set([
  "que sabes hacer",
  "que puedes hacer",
  "en que puedes ayudar",
  "en que me puedes ayudar",
  "que ofreces",
  "que haces",
  "a que te dedicas",
  "de que va esto",
  "para que sirves",
  "what can you do",
  "what do you do",
  "what do you know",
  "how can you help",
  "what can you help with",
])

const THANKS = new Set([
  "gracias",
  "muchas gracias",
  "gracias por todo",
  "thanks",
  "thank you",
  "thx",
  "ty",
])

const HELP = new Set([
  "ayuda",
  "help",
  "que puedo preguntar",
  "que puedo preguntarte",
  "que te puedo preguntar",
  "what can i ask",
  "what should i ask",
])

const GOODBYE = new Set([
  "adios",
  "hasta luego",
  "nos vemos",
  "chao",
  "bye",
  "goodbye",
  "see you",
  "see ya",
])

const META = new Set([
  "eres un bot",
  "eres una ia",
  "eres inteligencia artificial",
  "que ia usas",
  "que modelo usas",
  "guardas lo que escribo",
  "guardas mis datos",
  "es privado",
  "are you a bot",
  "are you ai",
  "what ai do you use",
  "what model do you use",
  "do you store what i write",
  "do you save my data",
  "is this private",
])

const BASQUE_HINTS = [
  "kaixo",
  "egun on",
  "zer moduz",
  "eskerrik asko",
  "agur",
  "zer egin dezakezu",
  "nor zara",
  "non bizi",
  "zer dakizu",
]

function matchesSet(normalized: string, phrases: Set<string>): boolean {
  if (phrases.has(normalized)) return true
  if (normalized.split(" ").length > 8) return false
  for (const phrase of phrases) {
    if (normalized === phrase) return true
    if (normalized.startsWith(`${phrase} `) || normalized.endsWith(` ${phrase}`)) return true
    if (normalized.includes(` ${phrase} `)) return true
  }
  return false
}

function isBasqueQuery(normalized: string): boolean {
  return BASQUE_HINTS.some((hint) => normalized.includes(hint))
}

const SOCIAL_INTENTS: ConversationIntent[] = [
  "greeting",
  "smalltalk",
  "thanks",
  "help",
  "goodbye",
  "meta",
  "basque",
]

export function isSocialConversationIntent(query: string): boolean {
  const intent = classifyConversationIntent(query)
  return intent !== null && SOCIAL_INTENTS.includes(intent)
}

export function classifyConversationIntent(query: string): ConversationIntent {
  const normalized = normalize(query)
  if (!normalized) return null

  if (isBasqueQuery(normalized)) return "basque"
  if (matchesSet(normalized, GREETINGS)) return "greeting"
  if (matchesSet(normalized, SMALLTALK)) return "smalltalk"
  if (matchesSet(normalized, CAPABILITIES)) return "capabilities"
  if (matchesSet(normalized, THANKS)) return "thanks"
  if (matchesSet(normalized, HELP)) return "help"
  if (matchesSet(normalized, GOODBYE)) return "goodbye"
  if (matchesSet(normalized, META)) return "meta"

  if (
    (normalized.startsWith("hola ") ||
      normalized.startsWith("hi ") ||
      normalized.startsWith("hey ")) &&
    normalized.split(" ").length <= 5
  ) {
    return "greeting"
  }

  return null
}

export function getConversationalReply(query: string, locale: Locale): string | null {
  const intent = classifyConversationIntent(query)
  if (!intent) return null

  const profile = getProfile(locale)
  const name = profile.name.split(" ")[0] ?? profile.name

  if (locale === "es") {
    switch (intent) {
      case "greeting":
        return `¡Hola! Soy el asistente de ${name}. Puedo contarte sobre mi experiencia, servicios freelance, proyectos e IA aplicada. ¿Qué te gustaría saber?`
      case "smalltalk":
        return `¡Todo bien, gracias! Estoy aquí para hablar de mi perfil profesional: experiencia, stack, servicios y disponibilidad. ¿En qué te puedo ayudar?`
      case "capabilities":
        return `Puedo contarte sobre mi trayectoria: desarrollo full stack y móvil, IA aplicada, servicios freelance, disponibilidad y proyectos destacados. Pregunta, por ejemplo, por React Native, servicios o si estoy disponible.`
      case "thanks":
        return `De nada. Si quieres, pregunta por experiencia, servicios freelance o cómo contactarme.`
      case "help":
        return `Puedes preguntarme por experiencia, tecnologías, proyectos, servicios freelance, disponibilidad o cómo contactarme. Por ejemplo: «¿Estás disponible para un proyecto?» o «¿Qué experiencia tienes con React Native?»`
      case "goodbye":
        return `¡Hasta luego! Si necesitas algo más sobre mi perfil, aquí estaré.`
      case "meta":
        return `Soy un asistente con IA 100% local en tu navegador (Chrome Prompt API, WebLLM o modo compatible). No guardo el texto literal de tus preguntas; solo métricas agregadas anónimas si aceptas analítica. Más info en la política de privacidad.`
      case "basque":
        return `Kaixo! Eskerrik asko. Oraindik ez dut euskaraz erantzuten modu osoan; gehiago ondo egiten dut gaztelaniaz eta ingelesez. Galdetu nire esperientziari, zerbitzuei edo nola har dezakezun harremanetan.`
    }
  }

  switch (intent) {
    case "greeting":
      return `Hi! I'm ${name}'s portfolio assistant. I can tell you about my experience, freelance services, projects and applied AI. What would you like to know?`
    case "smalltalk":
      return `Doing well, thanks! I'm here to talk about my professional profile: experience, stack, services and availability. How can I help?`
    case "capabilities":
      return `I can tell you about my background: full stack and mobile development, applied AI, freelance services, availability and featured projects. Try asking about React Native, services, or whether I'm available.`
    case "thanks":
      return `You're welcome. Feel free to ask about experience, freelance services or how to get in touch.`
    case "help":
      return `You can ask about experience, technologies, projects, freelance services, availability or how to contact me. For example: "Are you available for a project?" or "What React Native experience do you have?"`
    case "goodbye":
      return `Goodbye! If you need anything else about my profile, I'll be here.`
    case "meta":
      return `I'm an assistant with 100% local AI in your browser (Chrome Prompt API, WebLLM or compatible mode). I don't store the literal text of your questions; only anonymous aggregated metrics if you accept analytics. More info in the privacy policy.`
    case "basque":
      return `Kaixo! Thank you. I don't fully support Basque yet; I work best in Spanish and English. Ask about my experience, services or how to contact me.`
  }
}
