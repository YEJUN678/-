export const BASE_SECTIONS = [
  { id: 'hero', label: '히어로' },
  { id: 'features', label: '특징' },
  { id: 'stats', label: '지표' },
  { id: 'steps', label: '단계' },
  { id: 'gallery', label: '갤러리' },
  { id: 'testimonials', label: '후기' },
  { id: 'pricing', label: '가격' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta', label: 'CTA' },
  { id: 'contact', label: '문의' },
]

export const BASE_SECTION_ORDER = BASE_SECTIONS.map((s) => s.id)

export const SECTION_LABELS = BASE_SECTIONS.reduce((acc, cur) => {
  acc[cur.id] = cur.label
  return acc
}, {})
