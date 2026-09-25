import { test, expect } from '@playwright/test'

test('the work index renders without runtime errors and all public images load', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('.loading-screen')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ryan Tan.')
  await expect(page.locator('.project-row')).toHaveCount(5)
  expect(await page.locator('.identity').evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(page.viewportSize()!.height)
  await page.getByRole('button', { name: 'All8', exact: true }).click()
  await expect(page.locator('.project-row')).toHaveCount(8)
  await expect.poll(() => page.locator('.record-thumbnail img').evaluateAll(images => images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true)
  await expect(page.locator('.timeline-card')).toHaveCount(4)
  expect(errors).toEqual([])
})

test('filters expose websites, mobile apps and services independently', async ({ page }) => {
  await page.goto('/#home')
  const filters = page.getByRole('group', { name: 'Filter projects' })
  await filters.getByRole('button', { name: 'Web4', exact: true }).click()
  await expect(page.locator('.project-row')).toHaveCount(4)
  await expect(page.getByRole('link', { name: 'Open ITEES' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open Price Kaki' })).toHaveCount(0)
  await filters.getByRole('button', { name: 'Mobile3', exact: true }).click()
  await expect(page.locator('.project-row')).toHaveCount(3)
  await expect(page.getByRole('link', { name: 'Open CPFV 2.0' })).toBeVisible()
  await filters.getByRole('button', { name: 'Services1', exact: true }).click()
  await expect(page.locator('.project-row')).toHaveCount(1)
  await page.getByRole('link', { name: 'Open Singa', exact: true }).click()
  await expect(page.getByRole('dialog')).toContainText('Publicly launched in May 2025')
  await page.goBack()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.locator('.project-row')).toHaveCount(1)
  await page.goForward()
  await expect(page.getByRole('dialog', { name: 'Singa', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Close project' }).click()
  await expect(page.locator('.project-row')).toHaveCount(1)
  await filters.getByRole('button', { name: 'Selected5', exact: true }).click()
  await expect(page.locator('.project-row')).toHaveCount(5)
})

test('a project opens from the keyboard, traps focus, and restores the opener on Escape', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.loading-screen')).toHaveCount(0)
  const opener = page.getByRole('link', { name: 'Open CPFV 2.0', exact: true })
  await opener.focus()
  await page.keyboard.press('Enter')
  const reader = page.getByRole('dialog', { name: 'CPFV 2.0', exact: true })
  await expect(reader).toBeVisible()
  await expect(page).toHaveURL(/#work-cpfv$/)
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    expect(await reader.evaluate(element => element.contains(document.activeElement))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(reader).not.toBeVisible()
  await expect(opener).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('browser Back and Forward restore project selection without losing filters', async ({ page }) => {
  await page.goto('/#home')
  await page.getByRole('button', { name: 'Web4', exact: true }).click()
  await page.getByRole('link', { name: 'Open SCO Digital Archives' }).click()
  await expect(page.getByRole('dialog')).toContainText('The public archive launched in June 2022')
  await page.goBack()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.locator('.project-row')).toHaveCount(4)
  await page.goForward()
  await expect(page.getByRole('dialog', { name: 'SCO Digital Archives' })).toBeVisible()
  await page.getByRole('button', { name: 'Next project', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Price Kaki', exact: true })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('dialog', { name: 'SCO Digital Archives' })).toBeVisible()
})

test('deep links reload, include supplementary projects, and handle the final record', async ({ page }) => {
  await page.goto('/#work-singa')
  await expect(page.getByRole('dialog', { name: 'Singa', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Next project', exact: true })).toBeDisabled()
  await page.reload()
  await expect(page.getByRole('dialog', { name: 'Singa', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Close project' }).click()
  await expect(page.locator('.project-row')).toHaveCount(8)
  await expect(page.locator('#work-index-title')).toBeFocused()
  await page.goto('/#work-masimo')
  await expect(page.getByRole('button', { name: 'Previous project', exact: true })).toBeDisabled()
  await expect(page.getByRole('dialog')).toContainText('the image isn’t a record of a specific SafetyNet assignment')
  await expect(page.getByRole('link', { name: 'Explore Masimo SafetyNet' })).toHaveAttribute('href', 'https://www.masimo.com/products/telehealth/masimo-safetynet/')
})

test('project images enlarge and product sources are linked', async ({ page }) => {
  await page.goto('/#work-fwd')
  await expect(page.getByRole('dialog', { name: 'FWD Mobile' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'FWD Mobile case study', exact: true })).toHaveAttribute('href', 'https://vinova.sg/portfolio/fwd-mobile/')
  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Enlarge FWD Mobile screenshot 1', exact: true }).click()
  const popup = await popupPromise
  await expect(popup).toHaveURL(/\/fwd-1.png$/)
  await popup.close()
  await expect(page.getByRole('dialog')).toContainText('October 2018')
})

test('navigation reaches the career and mobile menu is keyboard accessible', async ({ page }, testInfo) => {
  await page.goto('/')
  const mobile = testInfo.project.name === 'mobile'
  if (mobile) {
    await page.getByRole('button', { name: 'Open menu', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  }
  const nav = page.getByRole('navigation', { name: mobile ? 'Mobile navigation' : 'Section navigation', exact: true })
  await nav.getByRole('link', { name: mobile ? '02 Experience' : 'Experience', exact: true }).click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('#experience')).toBeInViewport()
  if (mobile) await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  else await expect(nav.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute('aria-current', 'location')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download my résumé', exact: true }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('ryan-tan-resume.pdf')
  expect(await download.failure()).toBeNull()
})

test('contact offers working email, clipboard and GitHub actions', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#contact')
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:ryantan.htn@gmail.com')
  await expect(page.getByRole('link', { name: 'Email Ryan', exact: true })).toHaveAttribute('href', /^mailto:ryantan.htn@gmail.com\?subject=/)
  await expect(page.getByRole('link', { name: 'Find me on GitHub' })).toHaveAttribute('href', 'https://github.com/ryantanio')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('status')).toHaveText('Email copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('ryantan.htn@gmail.com')
})

test('skills expand with the keyboard and reduced-motion layouts fit narrow viewports', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#about')
  await expect(page.locator('.loading-screen')).toHaveCount(0)
  await page.locator('summary').filter({ hasText: 'Backend & APIs' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details[open]')).toContainText('Django')
  for (const width of [320, 390, 580, 768, 900, 1024]) {
    await page.setViewportSize({ width, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Page at ' + width).toBe(true)
  }
  await page.goto('/#work-cpfv')
  await expect(page.getByRole('dialog')).toBeVisible()
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 })
    expect(await page.locator('.reader-scroll').evaluate(element => element.scrollWidth <= element.clientWidth), 'Reader at ' + width).toBe(true)
  }
})
