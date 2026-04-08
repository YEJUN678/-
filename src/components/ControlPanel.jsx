import { useState } from 'react'
import ImageUploader from './ImageUploader'
import GalleryUploader from './GalleryUploader'
import SiteManager from './SiteManager'
import { TEMPLATE_LIST } from '../engine/presets'
import { BASE_SECTION_ORDER, SECTION_LABELS } from '../engine/sections'
import { generateHTML } from '../engine/templateEngine'
import { makeUniqueSlug, normalizeSlug } from '../utils/slug'

const FONTS = [
  'Noto Sans KR',
  'Noto Serif KR',
  'Gothic A1',
  'Gowun Dodum',
  'Black Han Sans',
  'Do Hyeon',
  'Jua',
  'Nanum Gothic',
  'Nanum Myeongjo',
]

const COLOR_PRESETS = [
  '#6366f1',
  '#f43f5e',
  '#10b981',
  '#8b5cf6',
  '#f97316',
  '#0ea5e9',
  '#d97706',
  '#ec4899',
  '#14b8a6',
  '#ef4444',
]

const toLines = (arr) => (Array.isArray(arr) ? arr.join('\n') : '')
const parseLines = (text) =>
  text
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean)

const toTestimonials = (arr) =>
  Array.isArray(arr) ? arr.map((t) => `${t.name} | ${t.role} | ${t.quote}`).join('\n') : ''
const parseTestimonials = (text) =>
  parseLines(text).map((line) => {
    const [name, role, quote] = line.split('|').map((t) => t.trim())
    return { name: name || '고객', role: role || '', quote: quote || line }
  })

const toPricing = (arr) =>
  Array.isArray(arr)
    ? arr
        .map((p) => `${p.name} | ${p.price} | ${p.desc} | ${(p.perks || []).join(';')}`)
        .join('\n')
    : ''
const parsePricing = (text) =>
  parseLines(text).map((line) => {
    const [name, price, desc, perksRaw] = line.split('|').map((t) => t.trim())
    const perks = perksRaw ? perksRaw.split(';').map((t) => t.trim()).filter(Boolean) : []
    return { name: name || '플랜', price: price || '문의', desc: desc || '', perks }
  })

const toFaq = (arr) =>
  Array.isArray(arr) ? arr.map((f) => `${f.q} | ${f.a}`).join('\n') : ''
const parseFaq = (text) =>
  parseLines(text).map((line) => {
    const [q, a] = line.split('|').map((t) => t.trim())
    return { q: q || '질문', a: a || '' }
  })

const toStats = (arr) =>
  Array.isArray(arr) ? arr.map((s) => `${s.label} | ${s.value} | ${s.desc || ''}`).join('\n') : ''
const parseStats = (text) =>
  parseLines(text).map((line) => {
    const [label, value, desc] = line.split('|').map((t) => t.trim())
    return { label: label || '지표', value: value || '', desc: desc || '' }
  })

const toSteps = (arr) =>
  Array.isArray(arr) ? arr.map((s) => `${s.title} | ${s.desc || ''}`).join('\n') : ''
const parseSteps = (text) =>
  parseLines(text).map((line) => {
    const [title, desc] = line.split('|').map((t) => t.trim())
    return { title: title || '단계', desc: desc || '' }
  })

const toSocials = (arr) =>
  Array.isArray(arr) ? arr.map((s) => `${s.label} | ${s.url}`).join('\n') : ''
const parseSocials = (text) =>
  parseLines(text).map((line) => {
    const [label, url] = line.split('|').map((t) => t.trim())
    return { label: label || 'Link', url: url || 'https://' }
  })

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const toCustomItems = (section) => {
  if (!section || !Array.isArray(section.items)) return ''
  if (section.layout === 'stats') {
    return section.items.map((item) => `${item.label} | ${item.value} | ${item.desc || ''}`).join('\n')
  }
  if (section.layout === 'steps') {
    return section.items.map((item) => `${item.title} | ${item.desc || ''}`).join('\n')
  }
  if (section.layout === 'cards') {
    return section.items.map((item) => `${item.title} | ${item.desc || ''}`).join('\n')
  }
  return ''
}

const parseCustomItems = (layout, text) => {
  if (layout === 'stats') return parseStats(text)
  if (layout === 'steps') return parseSteps(text)
  if (layout === 'cards') return parseSteps(text).map((s) => ({ title: s.title, desc: s.desc }))
  return []
}

function Section({ title, children, defaultOpen = true }) {
  return (
    <details open={defaultOpen} style={{ borderBottom: '1px solid #212744', paddingBottom: '0.9rem' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#fff', margin: '0.6rem 0' }}>{title}</summary>
      <div style={{ display: 'grid', gap: '0.7rem' }}>{children}</div>
    </details>
  )
}

const pickSlug = (value, fallback) => normalizeSlug(value) || normalizeSlug(fallback) || 'site'

const escapeHtml = (value) =>
  `${value || ''}`
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const buildIndexHtml = (entries) => `
<!DOCTYPE html>
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
</html>
`

const writeFile = async (dirHandle, pathParts, content) => {
  let current = dirHandle
  for (let i = 0; i < pathParts.length - 1; i += 1) {
    current = await current.getDirectoryHandle(pathParts[i], { create: true })
  }
  const fileHandle = await current.getFileHandle(pathParts[pathParts.length - 1], { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(content)
  await writable.close()
}

const downloadFile = (filename, content) => {
  const blob = new Blob([content], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const downloadJson = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function ControlPanel({
  config,
  onUpdate,
  onUndo,
  onRedo,
  onReset,
  onApplyDefaults,
  onReplace,
  canUndo,
  canRedo,
  sites,
  currentSiteId,
  siteLimit,
  onSelectSite,
  onCreateSite,
  onDuplicateSite,
  onRenameSite,
  onDeleteSite,
  onUpdateSiteSlug,
}) {
  const [jsonText, setJsonText] = useState('')
  const [publishState, setPublishState] = useState({ status: 'idle', message: '' })
  const [publishedUrl, setPublishedUrl] = useState('')
  const [importSlug, setImportSlug] = useState('')
  const [importState, setImportState] = useState({ status: 'idle', message: '' })
  const S = {
    wrap: {
      padding: '1rem',
      overflowY: 'auto',
      background: '#14182c',
      color: '#e5e7eb',
      height: '100%',
      fontSize: '0.85rem',
    },
    label: { fontSize: '0.75rem', color: '#8b93b5', display: 'block', marginBottom: '0.35rem' },
    input: {
      width: '100%',
      background: '#0f1324',
      border: '1px solid #2a3158',
      borderRadius: '8px',
      color: '#fff',
      padding: '0.5rem 0.7rem',
      fontSize: '0.85rem',
      outline: 'none',
    },
    button: (on) => ({
      padding: '0.35rem 0.7rem',
      borderRadius: '6px',
      border: '1px solid #2a3158',
      cursor: 'pointer',
      fontSize: '0.75rem',
      background: on ? config.primary : '#1d2242',
      color: on ? '#fff' : '#c5c9e4',
    }),
  }

  const currentSite = sites.find((site) => site.id === currentSiteId) || sites[0]
  const currentSlug = currentSite ? currentSite.slug || pickSlug(currentSite.name, 'site') : ''
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const publicUrl = currentSlug && origin ? `${origin}/${currentSlug}` : ''
  const displayUrl = publishedUrl || publicUrl

  const visibilityKeys = {
    hero: 'showHero',
    features: 'showFeatures',
    stats: 'showStats',
    steps: 'showSteps',
    gallery: 'showGallery',
    testimonials: 'showTestimonials',
    pricing: 'showPricing',
    faq: 'showFaq',
    cta: 'showCta',
    contact: 'showContact',
  }

  const customIds = (config.customSections || []).map((section, idx) => `custom:${section.id || `idx-${idx}`}`)
  const baseOrder = Array.isArray(config.sectionOrder) ? config.sectionOrder : []
  const mergedOrder = [
    ...baseOrder,
    ...BASE_SECTION_ORDER.filter((id) => !baseOrder.includes(id)),
    ...customIds.filter((id) => !baseOrder.includes(id)),
  ]
  const normalizedOrder = mergedOrder.filter((id, idx) => mergedOrder.indexOf(id) === idx)

  const moveSection = (idx, dir) => {
    const next = [...normalizedOrder]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    const [item] = next.splice(idx, 1)
    next.splice(target, 0, item)
    onUpdate({ sectionOrder: next })
  }

  const resetOrder = () => {
    onUpdate({ sectionOrder: [...BASE_SECTION_ORDER, ...customIds] })
  }

  const exportCurrentSite = async () => {
    const current = sites.find((site) => site.id === currentSiteId) || sites[0]
    if (!current) return
    const html = generateHTML(current.config)
    if (window.showDirectoryPicker) {
      try {
        const dir = await window.showDirectoryPicker()
        const slug = pickSlug(current.slug || current.name, 'site')
        await writeFile(dir, [slug, 'index.html'], html)
        alert('내보내기가 완료되었습니다.')
        return
      } catch {
        // fall through to download
      }
    }
    downloadFile(`${pickSlug(current.slug || current.name, 'site')}.html`, html)
  }

  const exportAllSites = async () => {
    if (!sites.length) return
    const used = new Set()
    const entries = sites.map((site, idx) => {
      const name = site.name || `내 사이트 ${idx + 1}`
      const slug = makeUniqueSlug(site.slug || name, used, `site-${idx + 1}`)
      used.add(slug)
      return {
        id: site.id,
        name,
        slug,
        html: generateHTML(site.config),
      }
    })
    if (window.showDirectoryPicker) {
      try {
        const dir = await window.showDirectoryPicker()
        await writeFile(dir, ['index.html'], buildIndexHtml(entries))
        for (const entry of entries) {
          await writeFile(dir, [entry.slug, 'index.html'], entry.html)
        }
        alert('전체 사이트 내보내기가 완료되었습니다.')
        return
      } catch {
        // fall through to download
      }
    }
    entries.forEach((entry) => downloadFile(`${entry.slug}.html`, entry.html))
  }

  const exportSitesJson = () => {
    downloadJson('sites.json', {
      sites: sites.map((site) => ({ id: site.id, name: site.name, slug: site.slug, config: site.config })),
    })
  }

  const updateCustomSection = (idx, patch) => {
    const next = [...(config.customSections || [])]
    next[idx] = { ...next[idx], ...patch }
    onUpdate({ customSections: next })
  }

  const addCustomSection = (layout = 'text') => {
    const id = createId()
    const next = [
      ...(config.customSections || []),
      { id, title: '새 섹션', body: '설명을 입력해 주세요.', layout, items: [], showInNav: false, navLabel: '' },
    ]
    const orderBase = Array.isArray(config.sectionOrder) ? config.sectionOrder : [...BASE_SECTION_ORDER]
    const nextOrder = [...orderBase, `custom:${id}`]
    onUpdate({ customSections: next, sectionOrder: nextOrder })
  }

  const removeCustomSection = (idx) => {
    const target = (config.customSections || [])[idx]
    const next = (config.customSections || []).filter((_, i) => i !== idx)
    const order = Array.isArray(config.sectionOrder) ? config.sectionOrder : []
    const orderId = target ? `custom:${target.id || `idx-${idx}`}` : null
    const nextOrder = orderId ? order.filter((id) => id !== orderId) : order
    onUpdate({ customSections: next, sectionOrder: nextOrder })
  }

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText)
      onReplace(parsed)
    } catch {
      alert('JSON 형식이 올바르지 않습니다.')
    }
  }

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(config, null, 2))
  }

  const publishSite = async () => {
    if (!currentSite) return
    const slug = normalizeSlug(currentSlug || currentSite.name)
    if (!slug) {
      setPublishState({ status: 'error', message: '사이트 주소를 먼저 입력해주세요.' })
      return
    }
    setPublishState({ status: 'loading', message: '발행 중...' })
    try {
      const res = await fetch('/.netlify/functions/save-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentSite.name, slug, config }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.site) {
        throw new Error(data?.error || '발행에 실패했습니다.')
      }
      const nextSlug = data.site.slug || slug
      if (nextSlug && nextSlug !== currentSite.slug) {
        onUpdateSiteSlug?.(currentSite.id, nextSlug)
      }
      const url = origin ? `${origin}/${nextSlug}` : ''
      setPublishedUrl(url)
      setPublishState({ status: 'success', message: '발행 완료' })
    } catch (err) {
      setPublishState({ status: 'error', message: err.message || '발행에 실패했습니다.' })
    }
  }

  const copyPublishUrl = async () => {
    if (!displayUrl) return
    try {
      await navigator.clipboard.writeText(displayUrl)
      setPublishState({ status: 'success', message: '주소가 복사되었습니다.' })
    } catch {
      setPublishState({ status: 'error', message: '주소 복사에 실패했습니다.' })
    }
  }

  const loadPublishedSite = async () => {
    if (!currentSite) return
    const slug = normalizeSlug(importSlug)
    if (!slug) {
      setImportState({ status: 'error', message: '불러올 주소를 입력해주세요.' })
      return
    }
    setImportState({ status: 'loading', message: '불러오는 중...' })
    try {
      const res = await fetch(`/.netlify/functions/get-site?slug=${encodeURIComponent(slug)}`)
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.site) {
        throw new Error(data?.error || '불러오기에 실패했습니다.')
      }
      if (data.site?.config) {
        onReplace(data.site.config)
      }
      if (data.site?.name) {
        onRenameSite?.(currentSite.id, data.site.name)
      }
      onUpdateSiteSlug?.(currentSite.id, data.site.slug || slug)
      setImportState({ status: 'success', message: '불러오기 완료' })
    } catch (err) {
      setImportState({ status: 'error', message: err.message || '불러오기에 실패했습니다.' })
    }
  }

  return (
    <div style={S.wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>컨트롤 패널</div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <button onClick={onUndo} disabled={!canUndo} style={{ ...S.button(false), opacity: canUndo ? 1 : 0.4 }}>되돌리기</button>
          <button onClick={onRedo} disabled={!canRedo} style={{ ...S.button(false), opacity: canRedo ? 1 : 0.4 }}>다시하기</button>
          <button onClick={onReset} style={S.button(false)}>초기화</button>
        </div>
      </div>

      <Section title="내 사이트">
        <SiteManager
          sites={sites}
          currentId={currentSiteId}
          limit={siteLimit}
          onSelect={onSelectSite}
          onCreate={onCreateSite}
          onDuplicate={onDuplicateSite}
          onRename={onRenameSite}
          onDelete={onDeleteSite}
        />
        {currentSite && (
          <div
            style={{
              marginTop: '0.6rem',
              padding: '0.6rem',
              borderRadius: '8px',
              border: '1px solid #2a3158',
              background: '#0f1324',
              display: 'grid',
              gap: '0.4rem',
            }}
          >
            <label style={S.label}>사이트 주소(슬러그)</label>
            <input
              style={S.input}
              value={currentSlug}
              onChange={(e) => onUpdateSiteSlug?.(currentSite.id, e.target.value)}
              placeholder="예: my-brand"
            />
            <div style={{ color: '#8b93b5', fontSize: '0.72rem' }}>
              예시: https://your-site.netlify.app/{currentSlug || '주소'}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.7rem' }}>
              한글/영문/숫자/하이픈만 가능하고, 공백은 자동으로 - 로 바뀝니다.
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onUpdateSiteSlug?.(currentSite.id, currentSite.name)}
                style={S.button(false)}
              >
                이름으로 자동 설정
              </button>
            </div>
            <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.4rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>자동 발행</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={publishSite}
                  disabled={publishState.status === 'loading'}
                  style={{ ...S.button(false), opacity: publishState.status === 'loading' ? 0.6 : 1 }}
                >
                  발행하기
                </button>
                <button
                  onClick={copyPublishUrl}
                  disabled={!displayUrl}
                  style={{ ...S.button(false), opacity: displayUrl ? 1 : 0.5 }}
                >
                  주소 복사
                </button>
                <button
                  onClick={() => displayUrl && window.open(displayUrl, '_blank', 'noopener')}
                  disabled={!displayUrl}
                  style={{ ...S.button(false), opacity: displayUrl ? 1 : 0.5 }}
                >
                  주소 열기
                </button>
              </div>
              {displayUrl && (
                <div style={{ color: '#8b93b5', fontSize: '0.74rem', wordBreak: 'break-all' }}>
                  {displayUrl}
                </div>
              )}
              {publishState.message && (
                <div
                  style={{
                    color: publishState.status === 'error' ? '#fca5a5' : '#6ee7b7',
                    fontSize: '0.72rem',
                  }}
                >
                  {publishState.message}
                </div>
              )}
            </div>
            <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.3rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>
                발행된 사이트 불러오기
              </div>
              <input
                style={S.input}
                value={importSlug}
                onChange={(e) => setImportSlug(e.target.value)}
                placeholder="슬러그 입력 (예: my-brand)"
              />
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={loadPublishedSite}
                  disabled={importState.status === 'loading'}
                  style={{ ...S.button(false), opacity: importState.status === 'loading' ? 0.6 : 1 }}
                >
                  불러오기
                </button>
              </div>
              {importState.message && (
                <div
                  style={{
                    color: importState.status === 'error' ? '#fca5a5' : '#6ee7b7',
                    fontSize: '0.72rem',
                  }}
                >
                  {importState.message}
                </div>
              )}
            </div>
          </div>
        )}
      </Section>

      <Section title="템플릿">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {TEMPLATE_LIST.map((t) => (
            <button key={t.id} onClick={() => onUpdate({ template: t.id })} style={S.button(config.template === t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={onApplyDefaults} style={{ ...S.button(false), background: '#1f2a4a', color: '#6ee7b7' }}>
          템플릿 기본 콘텐츠 불러오기
        </button>
      </Section>

      <Section title="기본 정보">
        <label style={S.label}>사이트 제목</label>
        <input style={S.input} value={config.title} onChange={(e) => onUpdate({ title: e.target.value })} />
        <label style={S.label}>슬로건</label>
        <input style={S.input} value={config.slogan} onChange={(e) => onUpdate({ slogan: e.target.value })} />
        <label style={S.label}>메인 버튼</label>
        <input style={S.input} value={config.heroCta} onChange={(e) => onUpdate({ heroCta: e.target.value })} />
        <label style={S.label}>보조 버튼</label>
        <input style={S.input} value={config.heroCtaSecondary} onChange={(e) => onUpdate({ heroCtaSecondary: e.target.value })} />
      </Section>

      <Section title="레이아웃 & 스타일">
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button onClick={() => onUpdate({ layout: 'center' })} style={S.button(config.layout === 'center')}>가운데</button>
          <button onClick={() => onUpdate({ layout: 'split' })} style={S.button(config.layout === 'split')}>좌우 분할</button>
          <button onClick={() => onUpdate({ theme: 'clean' })} style={S.button(config.theme === 'clean')}>미니멀</button>
          <button onClick={() => onUpdate({ theme: 'bold' })} style={S.button(config.theme === 'bold')}>볼드</button>
          <button onClick={() => onUpdate({ theme: 'soft' })} style={S.button(config.theme === 'soft')}>소프트</button>
        </div>
        <label style={S.label}>배경 스타일</label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button onClick={() => onUpdate({ backgroundStyle: 'gradient' })} style={S.button(config.backgroundStyle === 'gradient')}>그라데이션</button>
          <button onClick={() => onUpdate({ backgroundStyle: 'mesh' })} style={S.button(config.backgroundStyle === 'mesh')}>메쉬</button>
          <button onClick={() => onUpdate({ backgroundStyle: 'plain' })} style={S.button(config.backgroundStyle === 'plain')}>플랫</button>
        </div>
        <label style={S.label}>버튼 스타일</label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button onClick={() => onUpdate({ buttonStyle: 'pill' })} style={S.button(config.buttonStyle === 'pill')}>캡슐</button>
          <button onClick={() => onUpdate({ buttonStyle: 'soft' })} style={S.button(config.buttonStyle === 'soft')}>소프트</button>
          <button onClick={() => onUpdate({ buttonStyle: 'square' })} style={S.button(config.buttonStyle === 'square')}>각진</button>
        </div>
      </Section>

      <Section title="이미지">
        <ImageUploader label="히어로 이미지" value={config.heroImage} onChange={(v) => onUpdate({ heroImage: v })} />
        <ImageUploader label="로고 이미지" value={config.logoImage} onChange={(v) => onUpdate({ logoImage: v })} />
        <GalleryUploader images={config.galleryImages} onChange={(v) => onUpdate({ galleryImages: v })} />
      </Section>

      <Section title="컬러">
        <label style={S.label}>포인트 컬러</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
          {COLOR_PRESETS.map((p) => (
            <div
              key={p}
              onClick={() => onUpdate({ primary: p })}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: p,
                cursor: 'pointer',
                outline: config.primary === p ? '2px solid #fff' : 'none',
                outlineOffset: '2px',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
          {[
            ['포인트', 'primary'],
            ['배경', 'bg'],
            ['텍스트', 'text'],
          ].map(([label, key]) => (
            <div key={key}>
              <div style={{ fontSize: '0.7rem', color: '#8b93b5', marginBottom: '0.2rem' }}>{label}</div>
              <input
                type="color"
                value={config[key]}
                onChange={(e) => onUpdate({ [key]: e.target.value })}
                style={{ width: '100%', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="타이포그래피">
        <label style={S.label}>폰트</label>
        <select value={config.font} onChange={(e) => onUpdate({ font: e.target.value })} style={S.input}>
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <label style={S.label}>모서리 라운드</label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button onClick={() => onUpdate({ rounded: 'none' })} style={S.button(config.rounded === 'none')}>각진</button>
          <button onClick={() => onUpdate({ rounded: 'md' })} style={S.button(config.rounded === 'md')}>보통</button>
          <button onClick={() => onUpdate({ rounded: 'xl' })} style={S.button(config.rounded === 'xl')}>둥글게</button>
        </div>
      </Section>

      <Section title="애니메이션">
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button onClick={() => onUpdate({ animation: !config.animation })} style={S.button(config.animation)}>리빌</button>
          <button onClick={() => onUpdate({ animFloat: !config.animFloat })} style={S.button(config.animFloat)}>플로팅</button>
          <button onClick={() => onUpdate({ animGradient: !config.animGradient })} style={S.button(config.animGradient)}>그라데이션</button>
          <button onClick={() => onUpdate({ animPulse: !config.animPulse })} style={S.button(config.animPulse)}>펄스</button>
          <button onClick={() => onUpdate({ animTilt: !config.animTilt })} style={S.button(config.animTilt)}>틸트</button>
          <button onClick={() => onUpdate({ animParallax: !config.animParallax })} style={S.button(config.animParallax)}>패럴랙스</button>
        </div>
      </Section>

      <Section title="섹션 표시">
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            ['네비', 'showNav'],
            ['히어로', 'showHero'],
            ['특징', 'showFeatures'],
            ['지표', 'showStats'],
            ['단계', 'showSteps'],
            ['갤러리', 'showGallery'],
            ['후기', 'showTestimonials'],
            ['가격', 'showPricing'],
            ['FAQ', 'showFaq'],
            ['CTA', 'showCta'],
            ['문의', 'showContact'],
            ['푸터', 'showFooter'],
          ].map(([label, key]) => (
            <button key={key} onClick={() => onUpdate({ [key]: !config[key] })} style={S.button(config[key])}>
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="섹션 순서">
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          {normalizedOrder.map((key, idx) => {
            const isCustom = key.startsWith('custom:')
            const customId = isCustom ? key.replace('custom:', '') : null
            const custom = isCustom
              ? (config.customSections || []).find((s, i) => (s.id || `idx-${i}`) === customId)
              : null
            const label = isCustom ? (custom?.title || '커스텀 섹션') : (SECTION_LABELS[key] || key)
            const hidden = !isCustom && visibilityKeys[key] && config[visibilityKeys[key]] === false
            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.6rem',
                  border: '1px solid #2a3158',
                  borderRadius: '8px',
                  background: '#11162b',
                }}
              >
                <div style={{ fontSize: '0.8rem' }}>
                  {label}
                  {hidden && <span style={{ marginLeft: '0.4rem', color: '#fca5a5' }}>(숨김)</span>}
                </div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} style={{ ...S.button(false), opacity: idx === 0 ? 0.4 : 1 }}>위</button>
                  <button onClick={() => moveSection(idx, 1)} disabled={idx === normalizedOrder.length - 1} style={{ ...S.button(false), opacity: idx === normalizedOrder.length - 1 ? 0.4 : 1 }}>아래</button>
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={resetOrder} style={S.button(false)}>기본 순서로 복원</button>
      </Section>

      <Section title="내보내기">
        <div style={{ color: '#8b93b5', fontSize: '0.75rem' }}>
          현재 편집한 사이트를 실제 사이트 파일로 저장합니다.
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button onClick={exportCurrentSite} style={S.button(false)}>현재 사이트 내보내기</button>
          <button onClick={exportAllSites} style={S.button(false)}>전체 사이트 내보내기</button>
          <button onClick={exportSitesJson} style={S.button(false)}>배포용 sites.json 내려받기</button>
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.7rem' }}>
          브라우저에서 폴더 선택이 지원되지 않으면 HTML 파일이 다운로드됩니다.
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.7rem' }}>
          자동 배포용은 `data/sites.json`을 이 파일로 교체해 커밋하면 됩니다.
        </div>
      </Section>

      <Section title="콘텐츠 편집">
        <label style={S.label}>특징 (한 줄에 하나)</label>
        <textarea
          style={{ ...S.input, minHeight: '90px' }}
          value={toLines(config.features)}
          onChange={(e) => onUpdate({ features: parseLines(e.target.value) })}
        />
        <label style={S.label}>지표 (라벨 | 값 | 설명)</label>
        <textarea
          style={{ ...S.input, minHeight: '90px' }}
          value={toStats(config.stats)}
          onChange={(e) => onUpdate({ stats: parseStats(e.target.value) })}
        />
        <label style={S.label}>단계 (제목 | 설명)</label>
        <textarea
          style={{ ...S.input, minHeight: '90px' }}
          value={toSteps(config.steps)}
          onChange={(e) => onUpdate({ steps: parseSteps(e.target.value) })}
        />
        <label style={S.label}>후기 (이름 | 역할 | 내용)</label>
        <textarea
          style={{ ...S.input, minHeight: '110px' }}
          value={toTestimonials(config.testimonials)}
          onChange={(e) => onUpdate({ testimonials: parseTestimonials(e.target.value) })}
        />
        <label style={S.label}>가격/플랜 (이름 | 가격 | 설명 | 혜택1;혜택2)</label>
        <textarea
          style={{ ...S.input, minHeight: '110px' }}
          value={toPricing(config.pricing)}
          onChange={(e) => onUpdate({ pricing: parsePricing(e.target.value) })}
        />
        <label style={S.label}>FAQ (질문 | 답변)</label>
        <textarea
          style={{ ...S.input, minHeight: '110px' }}
          value={toFaq(config.faq)}
          onChange={(e) => onUpdate({ faq: parseFaq(e.target.value) })}
        />
      </Section>

      <Section title="CTA & 연락처">
        <label style={S.label}>CTA 제목</label>
        <input style={S.input} value={config.cta?.title || ''} onChange={(e) => onUpdate({ cta: { ...config.cta, title: e.target.value } })} />
        <label style={S.label}>CTA 설명</label>
        <input style={S.input} value={config.cta?.desc || ''} onChange={(e) => onUpdate({ cta: { ...config.cta, desc: e.target.value } })} />
        <label style={S.label}>CTA 버튼</label>
        <input style={S.input} value={config.cta?.primary || ''} onChange={(e) => onUpdate({ cta: { ...config.cta, primary: e.target.value } })} />
        <label style={S.label}>CTA 보조</label>
        <input style={S.input} value={config.cta?.secondary || ''} onChange={(e) => onUpdate({ cta: { ...config.cta, secondary: e.target.value } })} />

        <label style={S.label}>연락처 이메일</label>
        <input style={S.input} value={config.contact?.email || ''} onChange={(e) => onUpdate({ contact: { ...config.contact, email: e.target.value } })} />
        <label style={S.label}>연락처 전화</label>
        <input style={S.input} value={config.contact?.phone || ''} onChange={(e) => onUpdate({ contact: { ...config.contact, phone: e.target.value } })} />
        <label style={S.label}>연락처 주소</label>
        <input style={S.input} value={config.contact?.address || ''} onChange={(e) => onUpdate({ contact: { ...config.contact, address: e.target.value } })} />
        <label style={S.label}>운영 시간</label>
        <input style={S.input} value={config.contact?.hours || ''} onChange={(e) => onUpdate({ contact: { ...config.contact, hours: e.target.value } })} />

        <label style={S.label}>소셜 링크 (이름 | URL)</label>
        <textarea
          style={{ ...S.input, minHeight: '90px' }}
          value={toSocials(config.socials)}
          onChange={(e) => onUpdate({ socials: parseSocials(e.target.value) })}
        />
      </Section>

      <Section title="커스텀 섹션(칸)">
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button onClick={() => addCustomSection('text')} style={S.button(false)}>텍스트 섹션 추가</button>
          <button onClick={() => addCustomSection('cards')} style={S.button(false)}>카드 섹션 추가</button>
          <button onClick={() => addCustomSection('stats')} style={S.button(false)}>스탯 섹션 추가</button>
          <button onClick={() => addCustomSection('steps')} style={S.button(false)}>단계 섹션 추가</button>
        </div>
        {(config.customSections || []).map((section, idx) => (
          <div key={idx} style={{ border: '1px solid #2a3158', borderRadius: '10px', padding: '0.8rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <button onClick={() => removeCustomSection(idx)} style={{ ...S.button(false), color: '#fca5a5' }}>삭제</button>
            </div>
            <label style={S.label}>섹션 제목</label>
            <input
              style={S.input}
              value={section.title}
              onChange={(e) => updateCustomSection(idx, { title: e.target.value })}
            />
            <label style={S.label}>섹션 설명</label>
            <textarea
              style={{ ...S.input, minHeight: '70px' }}
              value={section.body}
              onChange={(e) => updateCustomSection(idx, { body: e.target.value })}
            />
            <label style={S.label}>네비게이션 표시</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => updateCustomSection(idx, { showInNav: !section.showInNav })}
                style={S.button(!!section.showInNav)}
              >
                {section.showInNav ? '표시 중' : '표시 안 함'}
              </button>
            </div>
            {section.showInNav && (
              <>
                <label style={S.label}>네비게이션 이름</label>
                <input
                  style={S.input}
                  value={section.navLabel || ''}
                  onChange={(e) => updateCustomSection(idx, { navLabel: e.target.value })}
                />
              </>
            )}
            <label style={S.label}>레이아웃</label>
            <select
              value={section.layout || 'text'}
              onChange={(e) => updateCustomSection(idx, { layout: e.target.value, items: [] })}
              style={S.input}
            >
              <option value="text">텍스트</option>
              <option value="cards">카드</option>
              <option value="stats">스탯</option>
              <option value="steps">단계</option>
            </select>
            {section.layout !== 'text' && (
              <>
                <label style={S.label}>
                  {section.layout === 'cards' && '카드 목록 (제목 | 설명)'}
                  {section.layout === 'stats' && '스탯 목록 (라벨 | 값 | 설명)'}
                  {section.layout === 'steps' && '단계 목록 (제목 | 설명)'}
                </label>
                <textarea
                  style={{ ...S.input, minHeight: '90px' }}
                  value={toCustomItems(section)}
                  onChange={(e) => updateCustomSection(idx, { items: parseCustomItems(section.layout, e.target.value) })}
                />
              </>
            )}
          </div>
        ))}
      </Section>

      <Section title="JSON 고급 편집" defaultOpen={false}>
        <label style={S.label}>현재 설정 불러오기</label>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button onClick={() => setJsonText(JSON.stringify(config, null, 2))} style={S.button(false)}>JSON 불러오기</button>
          <button onClick={copyJson} style={S.button(false)}>JSON 복사</button>
        </div>
        <textarea
          style={{ ...S.input, minHeight: '160px' }}
          value={jsonText}
          placeholder="여기에 JSON을 붙여넣고 적용하세요."
          onChange={(e) => setJsonText(e.target.value)}
        />
        <button onClick={applyJson} style={{ ...S.button(false), color: '#6ee7b7' }}>JSON 적용</button>
      </Section>
    </div>
  )
}
