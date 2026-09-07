import { chromium } from '@playwright/test'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 })
await page.goto('https://archives.sco.com.sg/', { waitUntil: 'networkidle', timeout: 60000 })
await page.screenshot({ path: 'public/sco-web.png' })
await browser.close()
