import { test, expect } from '@playwright/test'

test('redirect to login', async ({ page, baseURL }) => {
  await page.goto(baseURL + '/') // <-- Nuxt app is running and route '/' is showing.

  // Step 1 - Is Homepage working
  await expect(page.locator('input[type="email"]')).toBeVisible()
})

test('enter valid email', async ({ page, baseURL }) => {
  await page.goto(baseURL + '/auth') // <-- Nuxt app is running and route '/auth' is showing.)

  // Step 2 - Enter email
  await page.fill('input[type="email"]', 'mekanoide@example.com')
})

test('enter invalid email', async ({ page, baseURL }) => {
  await page.goto(baseURL + '/auth') // <-- Nuxt app is running and route '/auth' is showing.)

  // Step 2 - Enter email
  await page.fill('input[type="email"]', 'sexample.com')

  // Step 3 - Verify error
  await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-invalid', 'true')
})
