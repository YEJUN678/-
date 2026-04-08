import { getStore } from '@netlify/blobs'
import { generateHTML } from '../../src/engine/templateEngine.js'
import { normalizeSlug } from '../../src/utils/slug.js'

const htmlResponse = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
  body,
})

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

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return htmlResponse(405, notFoundHtml(''))
  }

  const slug = normalizeSlug(event.queryStringParameters?.slug)
  if (!slug) {
    return htmlResponse(400, notFoundHtml(''))
  }

  const store = getStore('sites')
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
