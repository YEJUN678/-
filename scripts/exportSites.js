import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateHTML } from '../src/engine/templateEngine.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const dataPath = path.join(rootDir, 'data', 'sites.json')
const publicDir = path.join(rootDir, 'public')
const sitesDir = path.join(publicDir, 'sites')

const slugify = (value, fallback = 'site') => {
  const cleaned = `${value || ''}`
    .trim()
    .replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return (cleaned || fallback).slice(0, 40)
}

const escapeHtml = (value) =>
  `${value || ''}`
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const loadSites = () => {
  if (!fs.existsSync(dataPath)) {
    return []
  }
  const raw = fs.readFileSync(dataPath, 'utf-8')
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.sites) ? parsed.sites : []
  } catch {
    return []
  }
}

const buildIndex = (entries) => `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>내 사이트 모음</title>
    <style>
      body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; padding: 2rem; }
      h1 { margin-bottom: 1rem; }
      ul { list-style: none; padding: 0; display: grid; gap: 0.6rem; }
      a { color: #38bdf8; text-decoration: none; }
      .card { background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 1rem; }
    </style>
  </head>
  <body>
    <h1>내 사이트 모음</h1>
    <ul>
      ${entries
        .map(
          (entry) =>
            `<li class="card"><a href="./${entry.slug}/index.html">${escapeHtml(entry.name)}</a></li>`
        )
        .join('')}
    </ul>
  </body>
</html>`

const writeFile = (filePath, content) => {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf-8')
}

const main = () => {
  const sites = loadSites()
  if (!sites.length) {
    ensureDir(sitesDir)
    writeFile(path.join(sitesDir, 'index.html'), '<!DOCTYPE html><html lang="ko"><body>사이트가 없습니다.</body></html>')
    return
  }

  if (fs.existsSync(sitesDir)) {
    fs.rmSync(sitesDir, { recursive: true, force: true })
  }
  ensureDir(sitesDir)

  const entries = sites.map((site, idx) => {
    const name = site.name || `내 사이트 ${idx + 1}`
    const slug = slugify(name, `site-${idx + 1}`)
    const html = generateHTML(site.config || {})
    const sitePath = path.join(sitesDir, slug, 'index.html')
    writeFile(sitePath, html)
    return { name, slug }
  })

  writeFile(path.join(sitesDir, 'index.html'), buildIndex(entries))
}

main()
