import { test, expect } from '@playwright/test'

test('page renders without errors and fits the viewport', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ryan Tan')
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  for (const id of ['projects', 'skills', 'experience', 'about', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached()
  await expect(page.locator('.project')).toHaveCount(5)
  await expect(page.locator('.loading-screen')).toHaveCount(0)
  const heroHeight = await page.locator('#home').evaluate(element => element.getBoundingClientRect().height)
  expect(heroHeight).toBeGreaterThanOrEqual(page.viewportSize()!.height)
  await page.locator('.project-screens img').evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = 'eager' }))
  await expect.poll(() => page.locator('.project-screens img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  await expect(page.locator('.timeline-card')).toHaveCount(4)
  const mountain = await page.request.get('/alps.jpg')
  expect(mountain.ok()).toBe(true)
  expect(mountain.headers()['content-type']).toContain('image/jpeg')
  expect(errors).toEqual([])
  await page.screenshot({ path: `artifacts/${testInfo.project.name}.png`, fullPage: true, animations: 'disabled' })
})

test('timeline is readable and résumé downloads', async ({ page }) => {
  await page.goto('/')
  await page.locator('#experience').scrollIntoViewIfNeeded()
  await expect(page.locator('.timeline-card').filter({ hasText: 'OriginallyUs' })).toBeVisible()
  await expect(page.locator('.timeline-date').first()).toContainText('Aug 2025')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download my résumé' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('ryan-tan-resume.pdf')
  expect(await download.failure()).toBeNull()
})

test('contact links and clipboard work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:ryantan.htn@gmail.com')
  await expect(page.getByRole('link', { name: 'Email Ryan', exact: true })).toHaveAttribute('href', /^mailto:ryantan.htn@gmail.com\?subject=/)
  await expect(page.getByRole('link', { name: 'Find me on GitHub' })).toHaveAttribute('href', 'https://github.com/ryantanio')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('status')).toHaveText('Email copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('ryantan.htn@gmail.com')
})

test('named projects link to their public pages and full screenshots', async ({ page }) => {
  await page.goto('/#projects')
  await expect(page.locator('.loading-screen')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'View Price Kaki', exact: true })).toHaveAttribute('href', 'https://apps.apple.com/sg/app/price-kaki/id1477815678')
  await expect(page.getByRole('link', { name: 'FWD Mobile case study', exact: true })).toHaveAttribute('href', 'https://vinova.sg/portfolio/fwd-mobile/')
  const price = page.locator('.project').filter({ has: page.getByRole('heading', { name: 'Price Kaki', exact: true }) })
  await expect(price).toContainText('AI-assisted moderation')
  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Enlarge FWD Mobile screenshot 1', exact: true }).click()
  const popup = await popupPromise
  await expect(popup).toHaveURL(/\/fwd-1.png$/)
  await popup.close()
})

test('loading screen releases the page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('.loading-screen')).toBeVisible()
  await expect(page.locator('.loading-screen')).toHaveCount(0, { timeout: 3000 })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('navigation reaches sections and mobile menu closes', async ({ page }, testInfo) => {
  await page.goto('/')
  if (testInfo.project.name === 'mobile') {
    const button = page.locator('button[aria-controls="mobile-nav"]')
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await button.click()
  }
  const navigation = page.getByRole('navigation', { name: testInfo.project.name === 'mobile' ? 'Mobile navigation' : 'Section navigation' })
  await navigation.getByRole('link', { name: 'About', exact: testInfo.project.name !== 'mobile' }).click()
  await expect(page).toHaveURL(/#about$/)
  if (testInfo.project.name === 'mobile') await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  else await expect(navigation.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'location')
})

test('dot labels respond to keyboard focus and track direct section links', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Dot navigation is replaced by the mobile menu')
  await page.goto('/#experience')
  await expect(page.locator('.loading-screen')).toHaveCount(0)
  const nav = page.getByRole('navigation', { name: 'Section navigation' })
  await expect(nav.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute('aria-current', 'location')
  const projects = nav.getByRole('link', { name: 'Projects', exact: true })
  await projects.focus()
  await expect(projects.locator('.dot-label')).toHaveCSS('opacity', '1')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#projects$/)
  await expect(projects).toHaveAttribute('aria-current', 'location')
})
