import { useEffect, useMemo, useState } from 'react'
import { makeUniqueSlug } from '../utils/slug'

const STORAGE_KEY = 'site-builder-sites-v1'
const SITE_LIMIT = 10

const clone = (value) => {
  if (typeof structuredClone === 'function') return structuredClone(value)
  return JSON.parse(JSON.stringify(value))
}

const createSite = (name, config, slug) => ({
  id: `site-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  slug,
  config: clone(config),
  updatedAt: Date.now(),
})

const ensureUniqueSlugs = (sites) => {
  const used = new Set()
  return sites.map((site, idx) => {
    const slug = makeUniqueSlug(site.slug || site.name, used, `site-${idx + 1}`)
    used.add(slug)
    return { ...site, slug }
  })
}

const loadState = (defaultConfig) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) throw new Error('empty')
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.sites) || !parsed.sites.length) throw new Error('empty')
    const sites = ensureUniqueSlugs(parsed.sites.slice(0, SITE_LIMIT))
    const currentId = parsed.currentId && sites.find((s) => s.id === parsed.currentId)?.id
    return { sites, currentId: currentId || sites[0].id }
  } catch {
    const firstSlug = makeUniqueSlug('내 사이트 1', new Set(), 'site-1')
    const first = createSite('내 사이트 1', defaultConfig, firstSlug)
    return { sites: [first], currentId: first.id }
  }
}

export function useSites(defaultConfig) {
  const [state, setState] = useState(() => loadState(defaultConfig))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const currentSite = useMemo(
    () => state.sites.find((site) => site.id === state.currentId) || state.sites[0],
    [state]
  )

  const selectSite = (id) => {
    if (!state.sites.find((site) => site.id === id)) return
    setState((prev) => ({ ...prev, currentId: id }))
  }

  const createNewSite = (name) => {
    if (state.sites.length >= SITE_LIMIT) return { ok: false, reason: 'limit' }
    const used = new Set(state.sites.map((site) => site.slug).filter(Boolean))
    const fallbackName = `내 사이트 ${state.sites.length + 1}`
    const displayName = name || fallbackName
    const slug = makeUniqueSlug(displayName, used, `site-${state.sites.length + 1}`)
    const site = createSite(displayName, defaultConfig, slug)
    setState((prev) => ({ sites: [...prev.sites, site], currentId: site.id }))
    return { ok: true, id: site.id }
  }

  const duplicateSite = (id) => {
    if (state.sites.length >= SITE_LIMIT) return { ok: false, reason: 'limit' }
    const source = state.sites.find((site) => site.id === id)
    if (!source) return { ok: false, reason: 'missing' }
    const used = new Set(state.sites.map((site) => site.slug).filter(Boolean))
    const baseName = `${source.name} 복사본`
    const slug = makeUniqueSlug(`${source.slug || source.name}-copy`, used, baseName)
    const site = createSite(baseName, source.config, slug)
    setState((prev) => ({ sites: [...prev.sites, site], currentId: site.id }))
    return { ok: true, id: site.id }
  }

  const renameSite = (id, name) => {
    setState((prev) => ({
      ...prev,
      sites: prev.sites.map((site) => (site.id === id ? { ...site, name: name || site.name } : site)),
    }))
  }

  const deleteSite = (id) => {
    if (state.sites.length <= 1) return { ok: false, reason: 'minimum' }
    const next = state.sites.filter((site) => site.id !== id)
    const nextId = state.currentId === id ? next[0]?.id : state.currentId
    setState({ sites: next, currentId: nextId })
    return { ok: true }
  }

  const updateSiteConfig = (id, config) => {
    setState((prev) => ({
      ...prev,
      sites: prev.sites.map((site) =>
        site.id === id ? { ...site, config: clone(config), updatedAt: Date.now() } : site
      ),
    }))
  }

  const updateSiteSlug = (id, value) => {
    setState((prev) => {
      const target = prev.sites.find((site) => site.id === id)
      if (!target) return prev
      const used = new Set(
        prev.sites
          .filter((site) => site.id !== id)
          .map((site) => site.slug)
          .filter(Boolean)
      )
      const slug = makeUniqueSlug(value, used, target.name)
      return {
        ...prev,
        sites: prev.sites.map((site) =>
          site.id === id ? { ...site, slug, updatedAt: Date.now() } : site
        ),
      }
    })
  }

  return {
    sites: state.sites,
    currentId: state.currentId,
    currentSite,
    selectSite,
    createNewSite,
    duplicateSite,
    renameSite,
    deleteSite,
    updateSiteConfig,
    updateSiteSlug,
    limit: SITE_LIMIT,
  }
}
