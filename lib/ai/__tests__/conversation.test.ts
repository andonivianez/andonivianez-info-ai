import { describe, expect, it } from "vitest"
import {
  classifyConversationIntent,
  getConversationalReply,
  isSocialConversationIntent,
} from "@/lib/ai/conversation"
import { buildPromptBundle } from "@/lib/ai/providers/fallback"

describe("conversation intents", () => {
  it("classifies greetings and small talk", () => {
    expect(classifyConversationIntent("hola")).toBe("greeting")
    expect(classifyConversationIntent("Hola!")).toBe("greeting")
    expect(classifyConversationIntent("qué tal?")).toBe("smalltalk")
    expect(classifyConversationIntent("how are you")).toBe("smalltalk")
  })

  it("classifies capability questions", () => {
    expect(classifyConversationIntent("qué sabes hacer?")).toBe("capabilities")
    expect(classifyConversationIntent("what can you do")).toBe("capabilities")
  })

  it("classifies thanks, help, goodbye, meta and Basque", () => {
    expect(classifyConversationIntent("muchas gracias")).toBe("thanks")
    expect(classifyConversationIntent("ayuda")).toBe("help")
    expect(classifyConversationIntent("hasta luego")).toBe("goodbye")
    expect(classifyConversationIntent("eres una ia")).toBe("meta")
    expect(classifyConversationIntent("kaixo")).toBe("basque")
    expect(classifyConversationIntent("hey there friend")).toBe("greeting")
    expect(classifyConversationIntent("")).toBeNull()
  })

  it("does not treat portfolio questions as conversation", () => {
    expect(classifyConversationIntent("¿Qué experiencia tiene con React Native?")).toBeNull()
    expect(classifyConversationIntent("quantum physics doctorate")).toBeNull()
    expect(isSocialConversationIntent("hola")).toBe(true)
    expect(isSocialConversationIntent("qué sabes hacer")).toBe(false)
    expect(isSocialConversationIntent("¿Estás disponible?")).toBe(false)
  })

  it("returns a useful reply for greetings", () => {
    expect(getConversationalReply("hola", "es")).toMatch(/Hola/)
    expect(getConversationalReply("hello", "en")).toMatch(/Hi!/)
    expect(getConversationalReply("qué sabes hacer", "es")).toMatch(
      /full stack|freelance|React Native/i,
    )
    expect(getConversationalReply("thanks", "en")).toMatch(/welcome/i)
    expect(getConversationalReply("help", "en")).toMatch(/ask/i)
    expect(getConversationalReply("bye", "en")).toMatch(/Goodbye/)
    expect(getConversationalReply("are you a bot", "en")).toMatch(/local/i)
    expect(getConversationalReply("kaixo", "en")).toMatch(/Kaixo/)
    expect(getConversationalReply("qué tal", "es")).toMatch(/perfil/)
    expect(getConversationalReply("gracias", "es")).toMatch(/De nada/)
    expect(getConversationalReply("ayuda", "es")).toMatch(/preguntarme/)
    expect(getConversationalReply("adios", "es")).toMatch(/Hasta luego/)
    expect(getConversationalReply("eres un bot", "es")).toMatch(/local/)
    expect(getConversationalReply("kaixo", "es")).toMatch(/Kaixo/)
    expect(getConversationalReply("react native", "es")).toBeNull()
  })

  it("uses conversational replies in the prompt bundle when RAG has no context", () => {
    const greeting = buildPromptBundle("hola", "es")
    expect(greeting.hasRelevantContext).toBe(false)
    expect(greeting.conversationalReply).toMatch(/Hola/)
    expect(greeting.insufficientMessage).toMatch(/Hola/)

    const capabilities = buildPromptBundle("qué sabes hacer?", "es")
    expect(capabilities.insufficientMessage.length).toBeGreaterThan(20)
    expect(capabilities.insufficientMessage).not.toMatch(
      /^No encuentro información suficiente en el portfolio para responder con seguridad\.$/,
    )
  })
})
