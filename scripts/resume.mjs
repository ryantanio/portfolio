import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(resolve('public/resume.html')).href)
  await page.pdf({ path: 'public/ryan-tan-resume.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true })
} finally {
  await browser.close()
}
