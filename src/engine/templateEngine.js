import { TEMPLATE_PRESETS, getTemplateDefaults } from './presets.js'
import { BASE_SECTION_ORDER } from './sections.js'
import { normalizeSlug } from '../utils/slug.js'

const safeText = (value, fallback) => {
  const v = `${value ?? ''}`.trim()
  return v.length ? v : fallback
}

const escapeHtml = (value) =>
  `${value ?? ''}`
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const isValidHex = (value) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)
const safeColor = (value, fallback) => (isValidHex(value) ? value : fallback)

const normalizeLink = (value, fallback) => {
  const raw = `${value ?? ''}`.trim()
  if (raw) return raw
  return `${fallback ?? ''}`.trim()
}

const resolveHref = (value, fallback) => {
  const raw = normalizeLink(value, fallback)
  if (!raw) return '#'
  const lower = raw.toLowerCase()
  if (
    raw.startsWith('#') ||
    raw.startsWith('/') ||
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:')
  ) {
    return raw
  }
  const [path, hash] = raw.split('#')
  const slug = normalizeSlug(path) || path
  return `/${slug}${hash ? `#${hash}` : ''}`
}

const resolveButtonStyle = (value) => {
  const bg = isValidHex(value?.bg) ? value.bg : ''
  const text = isValidHex(value?.text) ? value.text : ''
  const border = isValidHex(value?.border) ? value.border : ''
  const styles = []
  if (bg) styles.push(`background:${bg}`)
  if (text) styles.push(`color:${text}`)
  if (border) styles.push(`border-color:${border}`)
  return styles.length ? ` style="${styles.join(';')}"` : ''
}

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

const rgbToHex = (rgb) =>
  `#${[rgb.r, rgb.g, rgb.b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('')}`

const mix = (a, b, weight) => {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  return rgbToHex({
    r: ca.r + (cb.r - ca.r) * weight,
    g: ca.g + (cb.g - ca.g) * weight,
    b: ca.b + (cb.b - ca.b) * weight,
  })
}

const luminance = (hex) => {
  const { r, g, b } = hexToRgb(hex)
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

const ensureArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : [])
const normalizeLines = (value, fallback) => (ensureArray(value).length ? ensureArray(value) : fallback)
const normalizeObjects = (value, fallback) => (ensureArray(value).length ? ensureArray(value) : fallback)

const normalizeCta = (value, fallback) => ({
  title: safeText(value?.title, fallback.title),
  desc: safeText(value?.desc, fallback.desc),
  primary: safeText(value?.primary, fallback.primary),
  secondary: safeText(value?.secondary, fallback.secondary),
})

const normalizeContact = (value, fallback) => ({
  email: safeText(value?.email, fallback.email),
  phone: safeText(value?.phone, fallback.phone),
  address: safeText(value?.address, fallback.address),
  hours: safeText(value?.hours, fallback.hours),
})

const fontParam = (font) => encodeURIComponent(font).replace(/%20/g, '+')

export function generateHTML(cfg) {
  const preset = TEMPLATE_PRESETS[cfg.template] || TEMPLATE_PRESETS.cafe
  const defaults = getTemplateDefaults(cfg.template)

  const title = safeText(cfg.title, defaults.title)
  const slogan = safeText(cfg.slogan, defaults.slogan)
  const heroCta = safeText(cfg.heroCta, defaults.heroCta)
  const heroCtaSecondary = safeText(cfg.heroCtaSecondary, defaults.heroCtaSecondary)

  const features = normalizeLines(cfg.features, preset.defaults.features)
  const testimonials = normalizeObjects(cfg.testimonials, preset.defaults.testimonials)
  const pricing = normalizeObjects(cfg.pricing, preset.defaults.pricing)
  const faq = normalizeObjects(cfg.faq, preset.defaults.faq)
  const stats = normalizeObjects(cfg.stats, preset.defaults.stats)
  const steps = normalizeObjects(cfg.steps, preset.defaults.steps)
  const socials = normalizeObjects(cfg.socials, preset.defaults.socials)
  const cta = normalizeCta(cfg.cta, preset.defaults.cta)
  const contact = normalizeContact(cfg.contact, preset.defaults.contact)
  const customSections = ensureArray(cfg.customSections)
  const buttonLinks = cfg.buttonLinks || {}
  const buttonColors = cfg.buttonColors || {}

  const primary = safeColor(cfg.primary, '#6366f1')
  const bg = safeColor(cfg.bg, '#ffffff')
  const text = safeColor(cfg.text, '#111827')
  const font = safeText(cfg.font, 'Noto Sans KR')

  const rounded = cfg.rounded === 'none' ? '6px' : cfg.rounded === 'md' ? '12px' : '18px'
  const layout = cfg.layout === 'split' ? 'split' : 'center'
  const theme = cfg.theme === 'bold' ? 'bold' : cfg.theme === 'soft' ? 'soft' : 'clean'
  const backgroundStyle = cfg.backgroundStyle === 'plain' ? 'plain' : cfg.backgroundStyle === 'mesh' ? 'mesh' : 'gradient'
  const buttonStyle = cfg.buttonStyle === 'square' ? 'square' : cfg.buttonStyle === 'soft' ? 'soft' : 'pill'

  const isDark = luminance(bg) < 0.4
  const surface = isDark ? mix(bg, '#ffffff', 0.08) : mix(bg, '#000000', 0.04)
  const surfaceSoft = mix(surface, primary, isDark ? 0.18 : 0.08)
  const muted = isDark ? mix(bg, '#ffffff', 0.7) : mix(bg, '#000000', 0.55)
  const border = isDark ? mix(bg, '#ffffff', 0.14) : mix(bg, '#000000', 0.1)
  const shadow = isDark ? '0 24px 60px rgba(0,0,0,0.35)' : '0 24px 60px rgba(15,23,42,0.12)'

  const showNav = cfg.showNav !== false
  const showFooter = cfg.showFooter !== false
  const showHero = cfg.showHero !== false
  const showFeatures = cfg.showFeatures !== false
  const showGallery = cfg.showGallery !== false
  const showTestimonials = cfg.showTestimonials !== false
  const showStats = cfg.showStats !== false
  const showSteps = cfg.showSteps !== false
  const showPricing = cfg.showPricing !== false
  const showFaq = cfg.showFaq !== false
  const showContact = cfg.showContact !== false
  const showCta = cfg.showCta !== false
  const animReveal = cfg.animation !== false
  const animFloat = cfg.animFloat !== false
  const animGradient = cfg.animGradient !== false
  const animPulse = cfg.animPulse !== false
  const animTilt = cfg.animTilt !== false
  const animParallax = cfg.animParallax !== false

  const inputOrder = Array.isArray(cfg.sectionOrder) ? cfg.sectionOrder : []
  const baseOrder = BASE_SECTION_ORDER
  const orderWithBase = [...inputOrder, ...baseOrder.filter((id) => !inputOrder.includes(id))]
  const customIds = customSections.map((section, idx) => `custom:${section.id || `idx-${idx}`}`)
  const finalOrder = [...orderWithBase, ...customIds.filter((id) => !orderWithBase.includes(id))]

  const builtinNav = {
    hero: { id: 'hero', label: preset.sections.hero || '소개', show: showHero },
    features: { id: 'features', label: preset.sections.features || '특징', show: showFeatures },
    stats: { id: 'stats', label: preset.sections.stats || '지표', show: showStats },
    steps: { id: 'steps', label: preset.sections.steps || '프로세스', show: showSteps },
    gallery: { id: 'gallery', label: preset.sections.gallery || '갤러리', show: showGallery },
    testimonials: { id: 'testimonials', label: preset.sections.testimonials || '후기', show: showTestimonials },
    pricing: { id: 'pricing', label: preset.sections.pricing || '가격', show: showPricing },
    faq: { id: 'faq', label: preset.sections.faq || 'FAQ', show: showFaq },
    cta: { id: 'cta', label: preset.sections.cta || 'CTA', show: showCta },
    contact: { id: 'contact', label: preset.sections.contact || '문의', show: showContact },
  }

  const navLinks = []
  finalOrder.forEach((key) => {
    if (builtinNav[key]?.show) {
      navLinks.push({ id: builtinNav[key].id, label: builtinNav[key].label })
      return
    }
    if (key.startsWith('custom:')) {
      const customId = key.replace('custom:', '')
      const section = customSections.find((s, i) => (s.id || `idx-${i}`) === customId)
      if (section && section.showInNav) {
        const sectionId = section.id || customId
        navLinks.push({ id: `custom-${sectionId}`, label: section.navLabel || section.title || '섹션' })
      }
    }
  })

  const galleryImages = ensureArray(cfg.galleryImages)
  const galleryHtml = galleryImages.length
    ? galleryImages
        .map((src) => `<div class="gallery-card"><img src="${src}" alt="gallery" loading="lazy"/></div>`)
        .join('')
    : preset.defaults.galleryEmojis
        .map((emoji) => `<div class="gallery-card emoji-card"><span>${emoji}</span></div>`)
        .join('')

  const heroMedia = cfg.heroImage
    ? `<img src="${cfg.heroImage}" alt="hero" />`
    : `<div class="hero-badge">${escapeHtml(preset.label)}</div><div class="hero-glow"></div>`

  const logoHtml = cfg.logoImage
    ? `<img class="logo-img" src="${cfg.logoImage}" alt="logo" />`
    : `<div class="logo-dot"></div>`

  const revealClass = animReveal ? 'reveal' : ''
  const buttonRadius = buttonStyle === 'square' ? '8px' : buttonStyle === 'soft' ? '14px' : '999px'
  const heroPrimaryHref = resolveHref(buttonLinks.heroPrimary, '#contact')
  const heroSecondaryHref = resolveHref(buttonLinks.heroSecondary, '#features')
  const ctaPrimaryHref = resolveHref(buttonLinks.ctaPrimary, '#contact')
  const ctaSecondaryHref = resolveHref(buttonLinks.ctaSecondary, '#features')
  const heroPrimaryStyle = resolveButtonStyle(buttonColors.heroPrimary)
  const heroSecondaryStyle = resolveButtonStyle(buttonColors.heroSecondary)
  const ctaPrimaryStyle = resolveButtonStyle(buttonColors.ctaPrimary)
  const ctaSecondaryStyle = resolveButtonStyle(buttonColors.ctaSecondary)

  const renderCustomSection = (section, idx) => {
    const titleText = escapeHtml(section.title || `새 섹션 ${idx + 1}`)
    const bodyText = escapeHtml(section.body || '')
    const layoutType = section.layout || 'text'
    const items = ensureArray(section.items)
    const anchor = `custom-${section.id || `idx-${idx}`}`

    if (layoutType === 'cards') {
      const cards = items.length
        ? items
            .map((item) => `<div class="card"><h3>${escapeHtml(item.title || '카드')}</h3><p>${escapeHtml(item.desc || '')}</p></div>`)
            .join('')
        : `<div class="card"><p>${bodyText || '카드 내용을 입력해 주세요.'}</p></div>`
      return `
      <section id="${anchor}" class="section custom-section ${revealClass}">
        <div class="container">
          <div class="section-header">
            <h2>${titleText}</h2>
            <p>${bodyText}</p>
          </div>
          <div class="grid custom-grid">${cards}</div>
        </div>
      </section>
      `
    }

    if (layoutType === 'stats') {
      const statsHtml = items.length
        ? items
            .map((item) => `<div class="card stat-card"><div class="stat-value">${escapeHtml(item.value || '')}</div><div class="stat-label">${escapeHtml(item.label || '')}</div><p>${escapeHtml(item.desc || '')}</p></div>`)
            .join('')
        : `<div class="card stat-card"><div class="stat-value">+</div><div class="stat-label">새 지표</div><p>${bodyText}</p></div>`
      return `
      <section id="${anchor}" class="section custom-section ${revealClass}">
        <div class="container">
          <div class="section-header">
            <h2>${titleText}</h2>
            <p>${bodyText}</p>
          </div>
          <div class="grid stats-grid">${statsHtml}</div>
        </div>
      </section>
      `
    }

    if (layoutType === 'steps') {
      const stepHtml = items.length
        ? items
            .map((item, i) => `<div class="card step-card"><div class="step-index">${String(i + 1).padStart(2, '0')}</div><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.desc || '')}</p></div>`)
            .join('')
        : `<div class="card step-card"><div class="step-index">01</div><h3>${titleText}</h3><p>${bodyText}</p></div>`
      return `
      <section id="${anchor}" class="section custom-section ${revealClass}">
        <div class="container">
          <div class="section-header">
            <h2>${titleText}</h2>
            <p>${bodyText}</p>
          </div>
          <div class="grid steps-grid">${stepHtml}</div>
        </div>
      </section>
      `
    }

    return `
    <section id="${anchor}" class="section custom-section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${titleText}</h2>
          <p>${bodyText}</p>
        </div>
      </div>
    </section>
    `
  }

  const sectionBlocks = {
    hero: showHero
      ? `
    <section id="hero" class="hero ${revealClass}">
      <div class="container">
        <div class="hero-grid ${layout}">
          <div class="hero-text">
            <div class="section-header">
              <span style="color:var(--primary);font-weight:700">${escapeHtml(preset.label)}</span>
              <h1>${escapeHtml(title)}</h1>
              <p>${escapeHtml(slogan)}</p>
              <div class="hero-actions">
                <a class="btn primary" href="${escapeHtml(heroPrimaryHref)}"${heroPrimaryStyle}>${escapeHtml(heroCta)}</a>
                <a class="btn ghost" href="${escapeHtml(heroSecondaryHref)}"${heroSecondaryStyle}>${escapeHtml(heroCtaSecondary)}</a>
              </div>
            </div>
          </div>
          <div class="hero-media">${heroMedia}</div>
        </div>
      </div>
    </section>
    `
      : '',
    features: showFeatures
      ? `
    <section id="features" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.features || '특징')}</h2>
          <p>${escapeHtml(slogan)}</p>
        </div>
        <div class="grid features-grid">
          ${features
            .map((item) => `<div class="card"><h3>${escapeHtml(item)}</h3><p>${escapeHtml(preset.defaults.slogan)}</p></div>`)
            .join('')}
        </div>
      </div>
    </section>
    `
      : '',
    stats: showStats
      ? `
    <section id="stats" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.stats || '지표')}</h2>
          <p>${escapeHtml('한눈에 보는 핵심 수치입니다.')}</p>
        </div>
        <div class="grid stats-grid">
          ${stats
            .map((item) => `<div class="card stat-card"><div class="stat-value">${escapeHtml(item.value)}</div><div class="stat-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.desc || '')}</p></div>`)
            .join('')}
        </div>
      </div>
    </section>
    `
      : '',
    steps: showSteps
      ? `
    <section id="steps" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.steps || '프로세스')}</h2>
          <p>${escapeHtml('간단한 단계로 진행됩니다.')}</p>
        </div>
        <div class="grid steps-grid">
          ${steps
            .map(
              (item, i) =>
                `<div class="card step-card"><div class="step-index">${String(i + 1).padStart(2, '0')}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.desc || '')}</p></div>`
            )
            .join('')}
        </div>
      </div>
    </section>
    `
      : '',
    gallery: showGallery
      ? `
    <section id="gallery" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.gallery || '갤러리')}</h2>
          <p>${escapeHtml('분위기와 스타일을 한눈에 확인하세요.')}</p>
        </div>
        <div class="grid gallery-grid">
          ${galleryHtml}
        </div>
      </div>
    </section>
    `
      : '',
    testimonials: showTestimonials
      ? `
    <section id="testimonials" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.testimonials || '후기')}</h2>
          <p>${escapeHtml('실제 고객의 목소리를 확인하세요.')}</p>
        </div>
        <div class="grid testimonial-grid">
          ${testimonials
            .map(
              (t) => `
              <div class="card">
                <p>"${escapeHtml(t.quote)}"</p>
                <div style="margin-top:1rem;font-weight:700">${escapeHtml(t.name)}</div>
                <div style="color:var(--muted);font-size:0.85rem">${escapeHtml(t.role)}</div>
              </div>`
            )
            .join('')}
        </div>
      </div>
    </section>
    `
      : '',
    pricing: showPricing
      ? `
    <section id="pricing" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.pricing || '가격')}</h2>
          <p>${escapeHtml('필요에 맞는 옵션을 선택하세요.')}</p>
        </div>
        <div class="grid pricing-grid">
          ${pricing
            .map(
              (plan) => `
              <div class="card">
                <h3>${escapeHtml(plan.name)}</h3>
                <div class="price">${escapeHtml(plan.price)}</div>
                <p>${escapeHtml(plan.desc)}</p>
                <ul style="margin-top:1rem;display:grid;gap:0.4rem;color:var(--muted);font-size:0.9rem">
                  ${ensureArray(plan.perks).map((perk) => `<li>${escapeHtml(perk)}</li>`).join('')}
                </ul>
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    </section>
    `
      : '',
    faq: showFaq
      ? `
    <section id="faq" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.faq || 'FAQ')}</h2>
          <p>${escapeHtml('자주 묻는 질문을 모았습니다.')}</p>
        </div>
        <div class="grid faq-list">
          ${faq
            .map(
              (item) => `
              <details>
                <summary>${escapeHtml(item.q)}</summary>
                <p>${escapeHtml(item.a)}</p>
              </details>
            `
            )
            .join('')}
        </div>
      </div>
    </section>
    `
      : '',
    cta: showCta
      ? `
    <section id="cta" class="section ${revealClass}">
      <div class="container">
        <div class="cta-box">
          <div>
            <h2>${escapeHtml(cta.title)}</h2>
            <p style="color:var(--muted);margin-top:0.6rem">${escapeHtml(cta.desc)}</p>
          </div>
          <div class="cta-actions">
            <a class="btn primary" href="${escapeHtml(ctaPrimaryHref)}"${ctaPrimaryStyle}>${escapeHtml(cta.primary)}</a>
            <a class="btn ghost" href="${escapeHtml(ctaSecondaryHref)}"${ctaSecondaryStyle}>${escapeHtml(cta.secondary)}</a>
          </div>
        </div>
      </div>
    </section>
    `
      : '',
    contact: showContact
      ? `
    <section id="contact" class="section ${revealClass}">
      <div class="container">
        <div class="section-header">
          <h2>${escapeHtml(preset.sections.contact || '문의하기')}</h2>
          <p>${escapeHtml('간단한 정보를 남기면 빠르게 연락드릴게요.')}</p>
        </div>
        <div class="contact-grid">
          <form class="contact-form card">
            <label>이름
              <input type="text" required placeholder="이름을 입력하세요" />
            </label>
            <label>이메일
              <input type="email" required placeholder="example@email.com" />
            </label>
            <label>메시지
              <textarea required placeholder="문의 내용을 적어주세요"></textarea>
            </label>
            <button class="btn primary" type="submit" style="margin-top:1rem">보내기</button>
          </form>
          <div class="contact-card">
            <h3 style="margin-bottom:0.8rem">연락처</h3>
            <p>이메일: ${escapeHtml(contact.email)}</p>
            <p>전화: ${escapeHtml(contact.phone)}</p>
            <p>주소: ${escapeHtml(contact.address)}</p>
            <p>운영: ${escapeHtml(contact.hours)}</p>
            <p style="margin-top:1rem;color:var(--muted)">빠른 상담이 필요하면 지금 연락 주세요.</p>
          </div>
        </div>
      </div>
    </section>
    `
      : '',
  }

  const customBlocks = new Map(
    customSections.map((section, idx) => [`custom:${section.id || `idx-${idx}`}`, renderCustomSection(section, idx)])
  )

  const sectionsHtml = finalOrder.map((key) => sectionBlocks[key] || customBlocks.get(key) || '').join('')

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=${fontParam(font)}:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --primary: ${primary};
      --bg: ${bg};
      --text: ${text};
      --surface: ${surface};
      --surface-soft: ${surfaceSoft};
      --muted: ${muted};
      --border: ${border};
      --radius: ${rounded};
      --shadow: ${shadow};
      --btn-radius: ${buttonRadius};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: '${font}', sans-serif;
      color: var(--text);
      line-height: 1.6;
      position: relative;
      min-height: 100vh;
      background: var(--bg);
    }
    body.bg-gradient {
      background: radial-gradient(circle at top left, ${primary}22, transparent 55%),
                  radial-gradient(circle at bottom right, ${primary}11, transparent 60%),
                  var(--bg);
      ${animGradient ? 'background-size: 160% 160%; animation: gradientShift 12s ease infinite;' : ''}
    }
    body.bg-mesh {
      background: radial-gradient(circle at 10% 20%, ${primary}25, transparent 45%),
                  radial-gradient(circle at 80% 10%, ${primary}18, transparent 40%),
                  radial-gradient(circle at 70% 80%, ${primary}25, transparent 50%),
                  var(--bg);
    }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }
    .container { max-width: 1120px; margin: 0 auto; padding: 0 1.6rem; }
    .section { padding: 5rem 0; position: relative; }
    .section-header { margin-bottom: 2.2rem; max-width: 720px; }
    .section-header h2 { font-size: 2.1rem; margin-bottom: 0.6rem; }
    .section-header p { color: var(--muted); }
    .grid { display: grid; gap: 1.4rem; }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.4rem;
      box-shadow: var(--shadow);
    }
    body.theme-bold .card { border-width: 2px; box-shadow: none; }
    body.theme-soft .card { background: var(--surface-soft); }
    nav {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255,255,255,${isDark ? '0.04' : '0.7'});
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
    }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.6rem; }
    .logo-wrap { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; }
    .logo-img { width: 36px; height: 36px; border-radius: 9px; object-fit: cover; }
    .logo-dot { width: 36px; height: 36px; border-radius: 12px; background: var(--primary); }
    .nav-links { display: flex; gap: 1.2rem; font-size: 0.9rem; color: var(--muted); }
    .nav-links a:hover { color: var(--text); }
    .nav-actions { display: flex; align-items: center; gap: 0.6rem; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.75rem 1.6rem;
      border-radius: var(--btn-radius);
      border: 1px solid transparent;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px rgba(0,0,0,0.12); }
    .btn.primary { background: var(--primary); color: #fff; }
    .btn.ghost { background: transparent; color: var(--text); border-color: var(--border); }
    body.anim-pulse .btn.primary { animation: pulse 2.6s ease-in-out infinite; }
    body.anim-tilt .card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    body.anim-tilt .card:hover { transform: translateY(-6px) rotateX(2deg); }
    body.anim-parallax .hero-media { will-change: transform; }
    .hero { padding: 5rem 0 3rem; position: relative; }
    .hero-grid { display: grid; align-items: center; gap: 2.4rem; }
    .hero-grid.center { grid-template-columns: 1fr; text-align: center; }
    .hero-grid.split { grid-template-columns: 1.1fr 0.9fr; }
    .hero h1 { font-size: 3.2rem; line-height: 1.1; margin-bottom: 1rem; }
    .hero p { font-size: 1.05rem; color: var(--muted); margin-bottom: 1.6rem; }
    .hero-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: ${layout === 'center' ? 'center' : 'flex-start'}; }
    .hero-media {
      position: relative;
      border-radius: calc(var(--radius) + 12px);
      overflow: hidden;
      background: linear-gradient(135deg, ${primary}35, ${primary}99);
      min-height: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
    }
    .hero-media img { width: 100%; height: 100%; object-fit: cover; }
    .hero-badge {
      background: rgba(255,255,255,0.2);
      color: #fff;
      padding: 0.8rem 1.6rem;
      border-radius: 999px;
      font-weight: 700;
      backdrop-filter: blur(12px);
      position: relative;
      z-index: 2;
    }
    .hero-glow {
      position: absolute;
      inset: 12% 12%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
      ${animFloat ? 'animation: float 6s ease-in-out infinite;' : ''}
    }
    .features-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .custom-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .gallery-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
    .gallery-card {
      border-radius: calc(var(--radius) + 6px);
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--surface);
      min-height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.4rem;
    }
    .gallery-card img { width: 100%; height: 100%; object-fit: cover; }
    .testimonial-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .pricing-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .price { font-size: 2rem; font-weight: 700; margin: 0.6rem 0; color: var(--primary); }
    .stats-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
    .stat-card { text-align: left; }
    .stat-value { font-size: 2.1rem; font-weight: 700; color: var(--primary); }
    .stat-label { font-weight: 600; margin-top: 0.5rem; }
    .steps-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .step-card { position: relative; }
    .step-index { font-size: 0.8rem; color: var(--muted); margin-bottom: 0.6rem; }
    .cta-box {
      background: linear-gradient(135deg, ${primary}18, ${primary}40);
      border: 1px solid ${primary}30;
      border-radius: calc(var(--radius) + 12px);
      padding: 2.6rem;
      display: grid;
      gap: 1.2rem;
      align-items: center;
      box-shadow: var(--shadow);
    }
    .cta-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
    .faq-list details {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1rem 1.2rem;
    }
    .faq-list summary { cursor: pointer; font-weight: 600; }
    .faq-list p { margin-top: 0.6rem; color: var(--muted); }
    .contact-grid { display: grid; gap: 1.6rem; grid-template-columns: 1.1fr 0.9fr; }
    .contact-card { padding: 1.6rem; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface); }
    .contact-form input, .contact-form textarea {
      width: 100%;
      margin-top: 0.6rem;
      padding: 0.8rem 0.9rem;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: transparent;
      color: inherit;
      font-family: inherit;
    }
    .contact-form textarea { min-height: 120px; resize: vertical; }
    .social-links { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 1rem; }
    .social-links a { color: var(--muted); font-size: 0.85rem; }
    footer {
      padding: 2.5rem 0 3rem;
      border-top: 1px solid var(--border);
      color: var(--muted);
      text-align: center;
    }
    nav, main, footer { position: relative; z-index: 1; }
    .mobile-toggle { display: none; }
    .reveal { opacity: 0; transform: translateY(18px); transition: all 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .bg-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
      opacity: ${backgroundStyle === 'plain' ? '0' : '1'};
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, ${primary}35, transparent 70%);
      filter: blur(0px);
      ${animFloat ? 'animation: float 8s ease-in-out infinite;' : ''}
    }
    .orb.one { width: 280px; height: 280px; top: -80px; left: -60px; }
    .orb.two { width: 220px; height: 220px; bottom: 10%; right: 4%; animation-delay: 1.5s; }
    .orb.three { width: 180px; height: 180px; top: 30%; right: 18%; animation-delay: 2.4s; }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-18px); }
    }
    @keyframes pulse {
      0% { transform: translateY(0) scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
      50% { transform: translateY(-1px) scale(1.02); box-shadow: 0 12px 22px rgba(0,0,0,0.15); }
      100% { transform: translateY(0) scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
      100% { background-position: 0% 0%; }
    }
    @media (max-width: 960px) {
      .hero-grid.split { grid-template-columns: 1fr; text-align: center; }
      .hero-actions { justify-content: center; }
      .contact-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
      .mobile-toggle { display: inline-flex; }
      .mobile-menu {
        display: none;
        flex-direction: column;
        gap: 0.8rem;
        padding: 1rem 1.6rem 1.4rem;
        border-top: 1px solid var(--border);
      }
      .mobile-menu.open { display: flex; }
    }
  </style>
</head>
<body class="theme-${theme} bg-${backgroundStyle}${animPulse ? ' anim-pulse' : ''}${animTilt ? ' anim-tilt' : ''}${animParallax ? ' anim-parallax' : ''}">
  <div class="bg-layer">
    <span class="orb one"></span>
    <span class="orb two"></span>
    <span class="orb three"></span>
  </div>
  ${showNav ? `
  <nav>
    <div class="nav-inner container">
      <div class="logo-wrap">
        ${logoHtml}
        <span>${escapeHtml(title)}</span>
      </div>
      <div class="nav-links">
        ${navLinks.map((link) => `<a href="#${link.id}">${escapeHtml(link.label)}</a>`).join('')}
      </div>
      <div class="nav-actions">
        <button class="btn ghost mobile-toggle" onclick="toggleMenu()">메뉴</button>
        <a class="btn primary" href="${escapeHtml(heroPrimaryHref)}"${heroPrimaryStyle}>${escapeHtml(heroCta)}</a>
      </div>
    </div>
    <div id="mobile-menu" class="mobile-menu container">
      ${navLinks.map((link) => `<a href="#${link.id}">${escapeHtml(link.label)}</a>`).join('')}
    </div>
  </nav>
  ` : ''}

  <main>
    ${sectionsHtml}
  </main>

  ${showFooter ? `
  <footer>
    © 2026 ${escapeHtml(title)}. All rights reserved.
    ${socials.length ? `
    <div class="social-links">
      ${socials.map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noreferrer">${escapeHtml(s.label)}</a>`).join('')}
    </div>` : ''}
  </footer>
  ` : ''}

  <script>
    function toggleMenu() {
      var menu = document.getElementById('mobile-menu');
      if (!menu) return;
      menu.classList.toggle('open');
    }
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    var form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('문의가 접수되었습니다. 곧 연락드리겠습니다.');
        form.reset();
      });
    }
    ${animParallax ? `
    var heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
      window.addEventListener('scroll', function() {
        var offset = window.scrollY * 0.06;
        heroMedia.style.transform = 'translateY(' + offset + 'px)';
      });
    }
    ` : ''}
    ${animReveal ? `
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('visible'); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });
    ` : ''}
  </script>
</body>
</html>`

  return html
}
