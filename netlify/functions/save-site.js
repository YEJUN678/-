import { getStore } from '@netlify/blobs'
import { normalizeSlug } from '../../src/utils/slug.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

const findAvailableSlug = async (store, base) => {
  const seed = base || 'site'
  let candidate = seed
  const first = await store.get(candidate)
  if (first === null) return candidate
  for (let i = 2; i <= 50; i += 1) {
    candidate = `${seed}-${i}`
    const existing = await store.get(candidate)
    if (existing === null) return candidate
  }
  return `${seed}-${Date.now().toString(36)}`
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' })
  }

  let payload = {}
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON body' })
  }

  const name = `${payload.name || ''}`.trim()
  const config = payload.config && typeof payload.config === 'object' ? payload.config : {}
  const requestedSlug = normalizeSlug(payload.slug)

  const store = getStore('sites')
  let slug = requestedSlug
  let existingRaw = null

  if (slug) {
    existingRaw = await store.get(slug)
  } else {
    slug = await findAvailableSlug(store, normalizeSlug(name) || 'site')
    existingRaw = await store.get(slug)
  }

  let createdAt = new Date().toISOString()
  if (existingRaw) {
    const parsed = safeParse(existingRaw)
    if (parsed?.createdAt) createdAt = parsed.createdAt
  }

  const now = new Date().toISOString()
  const record = {
    slug,
    name: name || slug,
    config,
    createdAt,
    updatedAt: now,
  }

  await store.setJSON(slug, record)

  return jsonResponse(200, { ok: true, site: record })
}
