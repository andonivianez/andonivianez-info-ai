import { describe, expect, it } from "vitest"
import { isFollowUpQuery, rewriteQueryWithHistory } from "@/lib/ai/follow-up"
import { classifyConversationIntent, getConversationalReply } from "@/lib/ai/conversation"

describe("follow-up", () => {
  it("detects short follow-up queries", () => {
    expect(isFollowUpQuery("y en móvil?")).toBe(true)
    expect(isFollowUpQuery("Describe tu experiencia completa en React Native en BQ")).toBe(false)
  })

  it("rewrites with prior user context", () => {
    const rewritten = rewriteQueryWithHistory("y en móvil?", [
      { role: "user", content: "¿Qué experiencia tienes con React Native?" },
      { role: "assistant", content: "Tengo experiencia en BQ y Orbis." },
    ])
    expect(rewritten.toLowerCase()).toMatch(/react|native|movil|mobile/)
  })
})

describe("conversation extended intents", () => {
  it("detects goodbye and meta intents", () => {
    expect(classifyConversationIntent("adiós")).toBe("goodbye")
    expect(classifyConversationIntent("are you a bot")).toBe("meta")
  })

  it("responds courteously to basque", () => {
    const reply = getConversationalReply("kaixo zer moduz", "es")
    expect(reply).toMatch(/Kaixo|euskera|castellano/i)
  })
})
