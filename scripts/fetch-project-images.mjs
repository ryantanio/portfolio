import { writeFile } from 'node:fs/promises'

// Official, publicly published product previews. See docs/project-research.md.
const assets = [
  ['cpfv-1.png', 'https://originallyus.sg/wp-content/uploads/2025/07/CPFv-01-Home.png'],
  ['cpfv-2.png', 'https://originallyus.sg/wp-content/uploads/2025/07/CPFv-02-Home-Mission.png'],
  ['singa-1.png', 'https://originallyus.sg/wp-content/uploads/2025/06/Singa-01-Intro.png'],
  ['singa-2.png', 'https://originallyus.sg/wp-content/uploads/2025/06/Singa-02-name.png'],
  ['masimo-context.jpg', 'https://www.masimo.com/siteassets/us/images/products/hospital-automation-connectivity/masimo-safetynet/remote-mgmt_insights.jpg'],
]
const results = await Promise.allSettled(assets.map(async ([name, url]) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) })
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`${name}: HTTP ${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  await writeFile(`public/${name}`, bytes)
  console.log(`${name}: ${bytes.length} bytes`)
}))
for (const result of results) if (result.status === 'rejected') { console.error(result.reason); process.exitCode = 1 }
