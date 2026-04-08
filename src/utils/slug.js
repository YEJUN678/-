export const normalizeSlug = (value) => {
  const cleaned = `${value || ''}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
  return cleaned.slice(0, 40)
}

export const makeUniqueSlug = (desired, used, fallback) => {
  const base = normalizeSlug(desired) || normalizeSlug(fallback) || 'site'
  let slug = base
  let i = 2
  const set = used instanceof Set ? used : new Set(used || [])
  while (set.has(slug)) {
    slug = `${base}-${i}`
    i += 1
  }
  return slug
}
