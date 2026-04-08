import { getStore } from '@netlify/blobs'
import { generateHTML } from '../../src/engine/templateEngine.js'
import { normalizeSlug } from '../../src/utils/slug.js'

const htmlResponse = (statusCode, body) =>
  new Response(body, { status: statusCode, headers: { 'Content-Type': 'text/html; charset=utf-8' } })

const notFoundHtml = (slug) => `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Site Not Found</title>
    <style>
      body { font-family: sans-serif; padding: 2rem; background: #0f172a; color: #e2e8f0; }
      a { color: #38bdf8; }
      .card { background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 1.5rem; max-width: 560px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>사이트를 찾을 수 없습니다.</h1>
      <p>요청한 주소: <strong>${slug || '알 수 없음'}</strong></p>
      <p>빌더에서 발행을 완료했는지 확인해주세요.</p>
    </div>
  </body>
</html>`

const getEnv = (key) => {
  if (typeof Netlify !== 'undefined' && Netlify.env?.get) return Netlify.env.get(key)
  if (typeof process !== 'undefined') return process.env?.[key]
  return undefined
}

const getStoreWithFallback = () => {
  const siteID = getEnv('BLOBS_SITE_ID')
  const token = getEnv('BLOBS_TOKEN')
  if (siteID && token) {
    return getStore('sites', { siteID, token })
  }
  return getStore('sites')
}

const safeDecode = (value) => {
  if (!value) return ''
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const extractSlug = (req) => {
  const url = new URL(req.url)
  let slug = normalizeSlug(safeDecode(url.searchParams.get('slug')))
  if (slug) return slug

  const pathParam = safeDecode(url.searchParams.get('path') || url.searchParams.get('splat'))
  if (pathParam) {
    const parts = `${pathParam}`.split('/').filter(Boolean)
    if (parts[0] === 'sites') return normalizeSlug(parts[1])
    return normalizeSlug(parts[0])
  }

  const pathParts = url.pathname.split('/').filter(Boolean)
  const renderIdx = pathParts.findIndex((p) => p === 'render')
  if (renderIdx !== -1) {
    const candidate = safeDecode(pathParts[renderIdx + 1])
    if (candidate) return normalizeSlug(candidate)
  }

  const originalPath =
    req.headers.get('x-nf-original-path') ||
    req.headers.get('x-original-path') ||
    req.headers.get('x-forwarded-uri')
  if (!originalPath) return ''

  const cleanPath = safeDecode(originalPath).split('?')[0]
  const parts = cleanPath.split('/').filter(Boolean)
  if (!parts.length) return ''
  if (parts[0] === 'sites') return normalizeSlug(parts[1])
  return normalizeSlug(parts[0])
}

export default async (req) => {
  if (req.method !== 'GET') {
    return htmlResponse(405, notFoundHtml(''))
  }

  const slug = extractSlug(req)
  if (!slug) {
    return htmlResponse(400, notFoundHtml(''))
  }

  const store = getStoreWithFallback()
  const raw = await store.get(slug)
  if (raw === null) {
    return htmlResponse(404, notFoundHtml(slug))
  }

  let site = null
  try {
    site = JSON.parse(raw)
  } catch {
    return htmlResponse(500, notFoundHtml(slug))
  }

  const html = generateHTML(site?.config || {})
  return htmlResponse(200, html)
}
