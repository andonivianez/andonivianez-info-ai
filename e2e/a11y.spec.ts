import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test("home page passes basic accessibility checks", async ({ page }) => {
  await page.goto("/es")
  await page.waitForSelector("#assistant")
  const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze()
  expect(
    results.violations.filter((v) => v.impact === "critical" || v.impact === "serious"),
  ).toEqual([])
})

test("about page passes basic accessibility checks", async ({ page }) => {
  await page.goto("/es/about")
  const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze()
  expect(
    results.violations.filter((v) => v.impact === "critical" || v.impact === "serious"),
  ).toEqual([])
})

test("ai-lab page passes basic accessibility checks", async ({ page }) => {
  await page.goto("/es/ai-lab")
  const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze()
  expect(
    results.violations.filter((v) => v.impact === "critical" || v.impact === "serious"),
  ).toEqual([])
})
