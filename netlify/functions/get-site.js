import { getStore } from '@netlify/blobs'
import { normalizeSlug } from '../../src/utils/slug.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

const jsonResponse = (statusCode, data) =>
  new Response(JSON.stringify(data), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders },
  })

const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

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

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: corsHeaders })
  }
  if (req.method !== 'GET') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' })
  }

  const url = new URL(req.url)
  const slug = normalizeSlug(url.searchParams.get('slug'))
  if (!slug) {
    return jsonResponse(400, { ok: false, error: 'Missing slug' })
  }

  const store = getStoreWithFallback()
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
