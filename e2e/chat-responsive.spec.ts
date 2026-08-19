import { test, expect } from "@playwright/test"

const viewports = [
  { width: 360, height: 640, label: "360px" },
  { width: 390, height: 844, label: "390px" },
  { width: 768, height: 1024, label: "768px" },
  { width: 1280, height: 800, label: "1280px" },
] as const

for (const viewport of viewports) {
  test(`chat is usable at ${viewport.label}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto("/es")
    await page.waitForSelector("#assistant", { timeout: 15000 })

    const assistant = page.locator("#assistant")
    await expect(assistant).toBeVisible()

    const input = assistant.getByRole("textbox")
    await expect(input).toBeVisible()
    await input.scrollIntoViewIfNeeded()
    await input.focus()
    await expect(input).toBeFocused()

    const assistantBox = await assistant.boundingBox()
    const inputBox = await input.boundingBox()
    expect(assistantBox).not.toBeNull()
    expect(inputBox).not.toBeNull()
    if (assistantBox && inputBox) {
      expect(inputBox.y + inputBox.height).toBeLessThanOrEqual(
        assistantBox.y + assistantBox.height + 1,
      )
    }

    await expect(assistant.getByRole("button", { name: /Enviar|Send/i })).toBeVisible()
    await expect(assistant.getByRole("button", { name: /Limpiar|Clear/i })).toBeVisible()
  })
}

test("suggested questions hide after first message", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/es")
  await page.waitForSelector("#assistant", { timeout: 15000 })

  const assistant = page.locator("#assistant")
  const suggestion = assistant
    .getByRole("button", { name: /tecnolog|technolog|experienc|experience/i })
    .first()
  await expect(suggestion).toBeVisible({ timeout: 15000 })
  await suggestion.click()

  await expect(suggestion).toBeHidden({ timeout: 25000 })
  await expect(assistant.getByRole("textbox")).toBeVisible()
})
