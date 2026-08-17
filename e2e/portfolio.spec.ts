import { test, expect } from "@playwright/test"

test("home page loads with assistant section", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: /Andoni Vianez/i })).toBeVisible()
  await expect(page.locator("#assistant")).toBeVisible()
})

test("ai-lab page loads", async ({ page }) => {
  await page.goto("/ai-lab")
  await expect(page.getByRole("heading", { name: "AI Lab" })).toBeVisible()
})

test("assistant works in fallback mode", async ({ page }) => {
  await page.goto("/")
  await page.waitForSelector("#assistant", { timeout: 15000 })
  await page.waitForFunction(() => !document.body.textContent?.includes("Cargando asistente IA"), {
    timeout: 20000,
  })
  const questionButton = page.getByRole("button", { name: /tecnologías/i }).first()
  await expect(questionButton).toBeVisible({ timeout: 10000 })
  await questionButton.click()
  await expect(page.locator("#assistant")).toContainText(/React|portfolio|información|Based/i, {
    timeout: 20000,
  })
})
