import { test, expect } from "@playwright/test"

test("home page loads with chat assistant", async ({ page }) => {
  await page.goto("/es")
  await expect(page.getByRole("heading", { name: /Andoni Vianez/i })).toBeVisible()
  await expect(page.locator("#assistant")).toBeVisible()
})

test("about page loads with experience", async ({ page }) => {
  await page.goto("/es/about")
  await expect(page.getByRole("heading", { name: /Andoni Vianez/i, level: 1 })).toBeVisible()
  await expect(page.locator("#experience")).toBeVisible()
})

test("english about page renders in english", async ({ page }) => {
  await page.goto("/en/about")
  await expect(page.getByRole("heading", { name: /Professional Experience/i })).toBeVisible()
  await expect(page.getByText("Followers", { exact: true })).toBeVisible()
})

test("ai-lab page loads", async ({ page }) => {
  await page.goto("/es/ai-lab")
  await expect(page.getByRole("heading", { name: "AI Lab" })).toBeVisible()
})

test("root redirects to locale", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveURL(/\/(es|en)$/)
})

test("legal pages load from footer", async ({ page }) => {
  await page.goto("/es/about")
  await page.getByRole("link", { name: "Aviso legal" }).click()
  await expect(page).toHaveURL(/\/es\/legal\/notice/)
  await expect(page.getByRole("heading", { name: "Aviso legal", level: 1 })).toBeVisible()
})

test("consent notice can be dismissed", async ({ page }) => {
  await page.goto("/es")
  const acceptButton = page.getByRole("button", { name: /Entendido/i })
  await expect(acceptButton).toBeVisible({ timeout: 10000 })
  await acceptButton.click()
  await expect(acceptButton).not.toBeVisible()
})

test("interviews section loads video facade without iframe until play", async ({ page }) => {
  await page.goto("/es/about")
  await expect(page.locator("#interviews")).toBeVisible()
  await expect(page.getByRole("heading", { name: /Entrevistas y apariciones/i })).toBeVisible()
  await expect(page.locator("#interviews iframe")).toHaveCount(0)
  await page.locator("#interviews button").first().click()
  await expect(page.locator("#interviews iframe")).toHaveCount(1)
})

test("assistant works in fallback mode", async ({ page }) => {
  await page.goto("/es")
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
