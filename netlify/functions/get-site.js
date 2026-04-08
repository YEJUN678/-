import { getStore } from '@netlify/blobs'
import { normalizeSlug } from '../../src/utils/slug.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

const jsonResponse = (statusCode, data) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders },
  body: JSON.stringify(data),
})

const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' })
  }

  const slug = normalizeSlug(event.queryStringParameters?.slug)
  if (!slug) {
    return jsonResponse(400, { ok: false, error: 'Missing slug' })
  }

  const store = getStore('sites')
  const raw = await store.get(slug)
  if (raw === null) {
    return jsonResponse(404, { ok: false, error: 'Not found' })
  }

  const site = safeParse(raw)
  if (!site) {
    return jsonResponse(500, { ok: false, error: 'Corrupted data' })
  }

  return jsonResponse(200, { ok: true, site })
}
