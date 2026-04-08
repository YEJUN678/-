import { generateHTML } from '../engine/templateEngine'

const STORAGE_KEY = 'site-builder-sites-v1'

const readSites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.sites) ? parsed.sites : []
  } catch {
    return []
  }
}

const siteId = window.location.hash ? window.location.hash.replace('#', '') : ''
const sites = readSites()
const site = sites.find((s) => s.id === siteId) || sites[0]

const fallback = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Site Not Found</title></head><body style="font-family:sans-serif;padding:2rem"><h1>사이트를 찾을 수 없습니다.</h1><p>빌더에서 사이트를 만든 후 다시 열어주세요.</p></body></html>`

const html = site ? generateHTML(site.config) : fallback

document.open()
document.write(html)
document.close()
