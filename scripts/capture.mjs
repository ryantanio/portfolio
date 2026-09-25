import { chromium } from '@playwright/test'
import { copyFile } from 'node:fs/promises'

const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('http://127.0.0.1:5173/')
  await page.locator('.loading-screen').waitFor({ state: 'detached' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'artifacts/home-desktop.png' })
  await copyFile('artifacts/home-desktop.png', 'docs/portfolio-home.png')
  await page.getByRole('link', { name: 'Open CPFV 2.0', exact: true }).click()
  await page.locator('dialog').waitFor()
  await page.locator('dialog img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => {}))))
  await page.screenshot({ path: 'artifacts/reader-desktop.png' })
  await page.getByRole('button', { name: 'Close project' }).click()
  for (const id of ['experience', 'about', 'contact']) {
    await page.locator('#' + id).evaluate(element => element.scrollIntoView({ behavior: 'instant' }))
    await page.screenshot({ path: 'artifacts/' + id + '-desktop.png' })
  }
  for (const width of [320, 390, 580, 768, 900, 1024, 1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 })
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    if (!(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))) throw new Error('Horizontal overflow at ' + width)
    await page.screenshot({ path: 'artifacts/record-' + width + '.png' })
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('#home').evaluate(element => element.scrollIntoView({ behavior: 'instant' }))
  await page.screenshot({ path: 'artifacts/index-mobile.png' })
  await page.getByRole('link', { name: 'Open Connected monitoring', exact: true }).click()
  await page.screenshot({ path: 'artifacts/reader-mobile.png' })
  console.log(JSON.stringify({ errors, responsiveWidths: [320, 390, 580, 768, 900, 1024, 1440] }))
} finally { await browser.close() }
