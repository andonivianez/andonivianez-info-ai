import { afterEach, describe, expect, it } from "vitest"
import { AI_CONFIG, getWebLLMModel, setWebLLMModel } from "@/lib/ai/config"

describe("AI config", () => {
  afterEach(() => {
    localStorage.removeItem("webllm-model")
  })

  it("returns the default model when nothing is stored", () => {
    expect(getWebLLMModel()).toBe(AI_CONFIG.defaultWebLLMModel)
  })

  it("persists and reads a custom model", () => {
    setWebLLMModel("custom-model")
    expect(getWebLLMModel()).toBe("custom-model")
  })
})
