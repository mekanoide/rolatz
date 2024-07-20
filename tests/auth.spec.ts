import { test, expect } from '@playwright/test'

test('job board test', async ({ page, baseURL }) => {
  await page.goto(baseURL + '/') // <-- Nuxt app is running and route '/' is showing.

  // Step 1 - Is Homepage working
  await expect(page.locator('h1').locator('text=Job Board')).toBeVisible()
})