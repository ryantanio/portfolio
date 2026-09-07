import fs from 'node:fs'
for (const name of ['ssdc', 'itees']) {
  const html = fs.readFileSync(`artifacts/${name}.html`, 'utf8')
  console.log(name)
  console.log([...new Set(html.match(/https[^\s"<>]+(?:png|jpg|webp)[^\s"<>]*/g))].filter(url => url.toLowerCase().includes(name)).join('\n'))
  const start = html.indexOf('<h1')
  console.log(html.slice(start, start + 28000).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 4500))
}
