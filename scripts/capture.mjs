import { chromium } from '@playwright/test'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await page.goto('http://127.0.0.1:5173/#experience')
  await page.locator('.loading-screen').waitFor({ state: 'detached' })
  await page.locator('.dot-nav a[aria-label="Experience"][aria-current]').waitFor()
  await page.screenshot({ path: 'artifacts/experience-desktop.png' })
  console.log(await page.locator('.dot-nav a').evaluateAll(links => links.map(link => ({ label: link.getAttribute('aria-label'), active: link.getAttribute('aria-current') }))))
  await page.getByRole('navigation', { name: 'Section navigation' }).getByRole('link', { name: 'Experience', exact: true }).hover()
  await page.screenshot({ path: 'artifacts/navigation-desktop.png', animations: 'disabled' })
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)
    if (!fits) throw new Error(`Horizontal overflow at ${width}px`)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('#experience').evaluate(element => element.scrollIntoView({ behavior: 'instant' }))
  await page.screenshot({ path: 'artifacts/experience-mobile.png' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  for (const id of ['home', 'about', 'projects', 'contact']) {
    await page.locator(`#${id}`).evaluate(element => element.scrollIntoView({ behavior: 'instant' }))
    await page.locator(`#${id} img`).evaluateAll(images => Promise.all(images.map(image => { image.loading = 'eager'; return image.decode().catch(() => {}) })))
    await page.screenshot({ path: `artifacts/${id}-desktop.png`, animations: 'disabled' })
  }
  console.log('Captured experience and navigation. Layout fits 320, 768, and 1024px.')
} finally { await browser.close() }
