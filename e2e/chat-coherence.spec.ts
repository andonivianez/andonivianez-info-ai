import { test, expect } from "@playwright/test"

async function disableGenerativeRuntimes(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "gpu", { configurable: true, get: () => undefined })
    Object.defineProperty(window, "LanguageModel", { configurable: true, get: () => undefined })
  })
}

async function waitForChatReady(page: import("@playwright/test").Page) {
  const assistant = page.locator("#assistant")
  await expect(assistant).toBeVisible()
  await expect(assistant.getByRole("textbox")).toBeVisible({ timeout: 20000 })
  return assistant
}

test.describe("chat coherence", () => {
  test.beforeEach(async ({ page }) => {
    await disableGenerativeRuntimes(page)
  })

  test("suggested questions in Spanish return grounded answers", async ({ page }) => {
    await page.goto("/es")
    const assistant = await waitForChatReady(page)

    const questions = [
      { name: /experiencia principal/i, expect: /15|años|full stack|Orbis|ingeniero/i },
      {
        name: /disponible para proyectos freelance/i,
        expect: /disponib|kick-off|Orbis|freelance/i,
      },
      { name: /servicios ofreces/i, expect: /React|Next|desarrollo|IA|móvil/i },
    ]

    for (const question of questions) {
      await assistant.getByRole("button", { name: /Limpiar|Clear/i }).click()
      const suggestion = assistant.getByRole("button", { name: question.name }).first()
      await expect(suggestion).toBeVisible({ timeout: 15000 })
      await suggestion.click()
      const answer = assistant.getByTestId("assistant-message").last()
      await expect(answer).toBeVisible({ timeout: 15000 })
      await expect(answer).toContainText(question.expect)
      await expect(answer).not.toContainText(/No encuentro información suficiente/i)
    }
  })

  test("typed questions stay coherent in both locales", async ({ page }) => {
    await page.goto("/es")
    const assistant = await waitForChatReady(page)
    const input = assistant.getByRole("textbox")

    await input.fill("¿Cómo puedo contactarte?")
    await assistant.getByRole("button", { name: /Enviar|Send/i }).click()
    await expect(assistant.getByTestId("assistant-message").last()).toContainText(
      /andoni\.bartolo@gmail\.com|Malt|LinkedIn/i,
      { timeout: 15000 },
    )

    await page.goto("/en")
    const enAssistant = await waitForChatReady(page)
    await enAssistant.getByRole("textbox").fill("Do you have AI experience?")
    await enAssistant.getByRole("button", { name: /Enviar|Send/i }).click()
    await expect(enAssistant.getByTestId("assistant-message").last()).toContainText(
      /RAG|local AI|BigIA|assistant/i,
      { timeout: 15000 },
    )

    await enAssistant.getByRole("button", { name: /Clear|Limpiar/i }).click()
    await enAssistant.getByRole("textbox").fill("Do you do graphic design?")
    await enAssistant.getByRole("button", { name: /Enviar|Send/i }).click()
    await expect(enAssistant.getByTestId("assistant-message").last()).toContainText(
      /not a graphic designer|designer|Figma|shadcn/i,
      { timeout: 15000 },
    )
  })
})
