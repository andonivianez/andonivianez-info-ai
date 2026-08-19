import { describe, expect, it } from "vitest"
import { classifyConversationIntent, getConversationalReply } from "@/lib/ai/conversation"
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

  it("does not treat portfolio questions as conversation", () => {
    expect(classifyConversationIntent("¿Qué experiencia tiene con React Native?")).toBeNull()
    expect(classifyConversationIntent("quantum physics doctorate")).toBeNull()
  })

  it("returns a useful reply for greetings", () => {
    expect(getConversationalReply("hola", "es")).toMatch(/Hola/)
    expect(getConversationalReply("hello", "en")).toMatch(/Hi!/)
    expect(getConversationalReply("qué sabes hacer", "es")).toMatch(
      /full stack|freelance|React Native/i,
    )
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
