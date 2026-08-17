import { test, expect } from "@playwright/test"

test("home page loads with chat assistant", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: /Andoni Vianez/i })).toBeVisible()
  await expect(page.locator("#assistant")).toBeVisible()
})

test("about page loads with experience", async ({ page }) => {
  await page.goto("/about")
  await expect(page.getByRole("heading", { name: /Andoni Vianez/i, level: 1 })).toBeVisible()
  await expect(page.locator("#experience")).toBeVisible()
})

test("ai-lab page loads", async ({ page }) => {
  await page.goto("/ai-lab")
  await expect(page.getByRole("heading", { name: "AI Lab" })).toBeVisible()
})

test("assistant works in fallback mode", async ({ page }) => {
  await page.goto("/")
  await page.waitForSelector("#assistant", { timeout: 15000 })
  const questionButton = page
    .getByRole("button", { name: /tecnolog|technolog|experienc|experience/i })
    .first()
  await expect(questionButton).toBeVisible({ timeout: 15000 })
  await questionButton.click()
  await expect(page.locator("#assistant")).toContainText(
    /React|portfolio|información|Based|experiencia/i,
    {
      timeout: 25000,
    },
  )
})
