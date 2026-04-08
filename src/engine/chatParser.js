import { TEMPLATE_PRESETS } from './presets'

export const COMMAND_GUIDE = [
  {
    title: '템플릿/레이아웃',
    items: [
      '카페 템플릿으로',
      '포트폴리오 템플릿으로',
      '레이아웃을 좌우 분할로',
      '레이아웃을 가운데로',
      '테마를 소프트로 / 볼드로 / 미니멀로',
    ],
  },
  {
    title: '컬러/배경',
    items: [
      '포인트 색상 민트로',
      '배경색 #0f172a',
      '텍스트 색상 화이트',
      '배경 스타일: 그라데이션 / 메쉬 / 플랫',
      '다크 모드로 / 라이트 모드로',
    ],
  },
  {
    title: '타이포/버튼',
    items: [
      '폰트 노토',
      '모서리 둥글게 / 각지게',
      '버튼 스타일: pill / soft / square',
    ],
  },
  {
    title: '섹션 표시',
    items: [
      '갤러리 숨겨줘',
      '후기 보여줘',
      '지표 숨겨줘',
      'CTA 숨겨줘',
    ],
  },
  {
    title: '섹션 순서',
    items: [
      '섹션 순서: 히어로, 특징, 지표, 갤러리, 후기, CTA, 문의',
    ],
  },
  {
    title: '텍스트 변경',
    items: [
      '제목: 라이트 마켓',
      '슬로건: 믿을 수 있는 라이프스타일 스토어',
      '메인 버튼: 상담 신청',
      '보조 버튼: 자료 받기',
    ],
  },
  {
    title: '콘텐츠 리스트',
    items: [
      '특징: 빠른 배송, 안전 결제, 리뷰 적립',
      '스탯: 회원수=1200/누적, 만족도=98%',
      '단계: 상담 - 요구 분석, 설계 - 디자인 제안',
      'FAQ: 배송기간=2일, 교환=7일 내',
    ],
  },
  {
    title: 'CTA/연락처',
    items: [
      'CTA 제목: 지금 바로 시작하세요',
      'CTA 설명: 무료 상담으로 시작합니다',
      'CTA 버튼: 상담 신청',
      '연락처 이메일: hello@example.com',
      '연락처 전화: 02-1234-5678',
      '연락처 주소: 서울시 강남구',
    ],
  },
  {
    title: '커스텀 섹션(칸)',
    items: [
      '섹션 추가: 제목 | 설명',
      '카드 섹션 추가: 제목 | 카드1 - 설명1, 카드2 - 설명2',
      '스탯 섹션 추가: 제목 | 매장수=12, 만족도=98%',
      '단계 섹션 추가: 제목 | 1단계 - 설명, 2단계 - 설명',
      '섹션 삭제 2',
    ],
  },
  {
    title: '애니메이션',
    items: [
      '애니메이션 켜줘 / 꺼줘',
      '플로팅 켜줘 / 꺼줘',
      '그라데이션 애니메이션 켜줘 / 꺼줘',
      '버튼 펄스 켜줘 / 꺼줘',
      '카드 틸트 켜줘 / 꺼줘',
      '패럴랙스 켜줘 / 꺼줘',
    ],
  },
]

const COLOR_MAP = {
  빨강: '#ef4444',
  레드: '#ef4444',
  red: '#ef4444',
  주황: '#f97316',
  오렌지: '#f97316',
  orange: '#f97316',
  노랑: '#eab308',
  옐로: '#eab308',
  yellow: '#eab308',
  초록: '#10b981',
  그린: '#10b981',
  green: '#10b981',
  민트: '#14b8a6',
  파랑: '#3b82f6',
  블루: '#3b82f6',
  blue: '#3b82f6',
  하늘: '#38bdf8',
  남색: '#1e3a8a',
  보라: '#8b5cf6',
  퍼플: '#8b5cf6',
  purple: '#8b5cf6',
  핑크: '#ec4899',
  분홍: '#ec4899',
  pink: '#ec4899',
  회색: '#64748b',
  그레이: '#64748b',
  gray: '#64748b',
  검정: '#0f172a',
  블랙: '#0f172a',
  black: '#0f172a',
  흰색: '#ffffff',
  화이트: '#ffffff',
  white: '#ffffff',
}

const FONT_MAP = {
  노토: 'Noto Sans KR',
  고딕: 'Gothic A1',
  고운: 'Gowun Dodum',
  블랙한: 'Black Han Sans',
  주아: 'Jua',
  도현: 'Do Hyeon',
  나눔: 'Nanum Gothic',
  serif: 'Noto Serif KR',
}

const SECTION_MAP = [
  { key: 'showNav', label: '네비게이션', terms: ['네비', '내비', '메뉴'] },
  { key: 'showHero', label: '히어로', terms: ['히어로', '메인'] },
  { key: 'showFeatures', label: '특징', terms: ['특징', '기능', '포인트'] },
  { key: 'showStats', label: '지표', terms: ['지표', '스탯', '통계'] },
  { key: 'showSteps', label: '단계', terms: ['단계', '프로세스', '스텝'] },
  { key: 'showGallery', label: '갤러리', terms: ['갤러리', '사진'] },
  { key: 'showTestimonials', label: '후기', terms: ['후기', '리뷰'] },
  { key: 'showPricing', label: '가격', terms: ['가격', '플랜', '요금'] },
  { key: 'showFaq', label: 'FAQ', terms: ['faq', '질문'] },
  { key: 'showCta', label: 'CTA', terms: ['cta', '콜투액션'] },
  { key: 'showContact', label: '문의', terms: ['문의', '연락'] },
  { key: 'showFooter', label: '푸터', terms: ['푸터', '하단'] },
]

const ORDER_MAP = {
  히어로: 'hero',
  소개: 'hero',
  특징: 'features',
  기능: 'features',
  지표: 'stats',
  스탯: 'stats',
  통계: 'stats',
  단계: 'steps',
  프로세스: 'steps',
  갤러리: 'gallery',
  사진: 'gallery',
  후기: 'testimonials',
  리뷰: 'testimonials',
  가격: 'pricing',
  플랜: 'pricing',
  요금: 'pricing',
  faq: 'faq',
  FAQ: 'faq',
  cta: 'cta',
  CTA: 'cta',
  문의: 'contact',
  연락: 'contact',
}

const parseList = (raw) =>
  raw
    .split(/[,/;\n]/)
    .map((t) => t.trim())
    .filter(Boolean)

const cleanTail = (value) =>
  value
    .replace(/(으로|로|으로 변경|로 변경|로 바꿔|으로 바꿔|로 바꿔줘|으로 바꿔줘)$/g, '')
    .trim()

const parseKeyValueList = (raw) =>
  parseList(raw).map((item) => {
    const [labelPart, rest] = item.split(/[:=]/).map((t) => t.trim())
    if (!rest) {
      const tokens = labelPart.split(' ')
      if (tokens.length >= 2) {
        return { label: tokens[0], value: tokens.slice(1).join(' ') }
      }
      return { label: labelPart, value: '' }
    }
    const [value, desc] = rest.split('/').map((t) => t.trim())
    return { label: labelPart, value, desc }
  })

const parseStepList = (raw) =>
  parseList(raw).map((item) => {
    const [title, desc] = item.split(/[-|]/).map((t) => t.trim())
    return { title, desc: desc || '' }
  })

const parseFaqList = (raw) =>
  parseList(raw).map((item) => {
    const [q, a] = item.split(/[:=]/).map((t) => t.trim())
    return { q: q || '질문', a: a || '' }
  })

const parseCardList = (raw) =>
  parseList(raw).map((item) => {
    const [title, desc] = item.split(/[-|]/).map((t) => t.trim())
    return { title, desc: desc || '' }
  })

const createSectionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const buildHelpReply = () =>
  COMMAND_GUIDE.map((group) => {
    const items = group.items.map((item) => `- ${item}`).join('\n')
    return `### ${group.title}\n${items}`
  }).join('\n\n')

export function parseChat(input, currentCfg) {
  const text = `${input ?? ''}`.trim()
  if (!text) {
    return { updates: {}, reply: '원하는 변경 내용을 알려주세요.' }
  }

  const lower = text.toLowerCase()
  const updates = {}
  const replies = []

  if (/(명령어|도움말|help|가능한)/i.test(lower)) {
    return { updates: {}, reply: buildHelpReply() }
  }

  if (/(초기화|리셋|reset)/i.test(lower)) {
    return { updates: null, reply: '초기 상태로 되돌렸어요.', reset: true }
  }

  if (/(자동|기본).*(채우|세팅|설정)|추천.*채워|자동 채우기/.test(text)) {
    return { updates: {}, reply: '템플릿 기본 콘텐츠로 채웠어요.', applyDefaults: true }
  }

  for (const preset of Object.values(TEMPLATE_PRESETS)) {
    const hit = preset.keywords.some((k) => lower.includes(k.toLowerCase())) || lower.includes(preset.label.toLowerCase())
    if (hit) {
      updates.template = preset.id
      replies.push(`${preset.label} 템플릿으로 바꿨어요.`)
      break
    }
  }

  const hexMatch = text.match(/#([0-9a-f]{3}|[0-9a-f]{6})/i)
  if (hexMatch) {
    const hex = `#${hexMatch[1]}`
    if (lower.includes('배경') || lower.includes('바탕')) {
      updates.bg = hex
      replies.push(`배경색을 ${hex}로 변경했어요.`)
    } else if (lower.includes('글자') || lower.includes('텍스트')) {
      updates.text = hex
      replies.push(`텍스트 색상을 ${hex}로 변경했어요.`)
    } else {
      updates.primary = hex
      replies.push(`포인트 색상을 ${hex}로 변경했어요.`)
    }
  } else {
    for (const [key, value] of Object.entries(COLOR_MAP)) {
      if (lower.includes(key)) {
        if (lower.includes('배경') || lower.includes('바탕')) {
          updates.bg = value
          replies.push(`배경색을 ${key} 톤으로 바꿨어요.`)
        } else if (lower.includes('글자') || lower.includes('텍스트')) {
          updates.text = value
          replies.push(`텍스트 색상을 ${key} 톤으로 바꿨어요.`)
        } else {
          updates.primary = value
          replies.push(`포인트 색상을 ${key} 톤으로 바꿨어요.`)
        }
        break
      }
    }
  }

  if (/(다크|어두운|night|dark)/i.test(lower)) {
    updates.bg = '#0f172a'
    updates.text = '#e2e8f0'
    replies.push('다크 모드로 전환했어요.')
  } else if (/(라이트|밝게|white|light)/i.test(lower)) {
    updates.bg = '#ffffff'
    updates.text = '#1f2937'
    replies.push('라이트 모드로 전환했어요.')
  }

  if (/(그라데이션|gradient)/i.test(lower) && lower.includes('배경')) {
    updates.backgroundStyle = 'gradient'
    replies.push('배경 스타일을 그라데이션으로 바꿨어요.')
  } else if (/(메쉬|mesh)/i.test(lower)) {
    updates.backgroundStyle = 'mesh'
    replies.push('배경 스타일을 메쉬로 바꿨어요.')
  } else if (/(플랫|단색|plain)/i.test(lower) && lower.includes('배경')) {
    updates.backgroundStyle = 'plain'
    replies.push('배경 스타일을 플랫으로 바꿨어요.')
  }

  if (/(버튼).*(pill|캡슐|둥글)/i.test(lower)) {
    updates.buttonStyle = 'pill'
    replies.push('버튼 스타일을 캡슐형으로 설정했어요.')
  } else if (/(버튼).*(soft|소프트)/i.test(lower)) {
    updates.buttonStyle = 'soft'
    replies.push('버튼 스타일을 소프트로 설정했어요.')
  } else if (/(버튼).*(square|각진)/i.test(lower)) {
    updates.buttonStyle = 'square'
    replies.push('버튼 스타일을 각진 형태로 설정했어요.')
  }

  if (/(좌우|스플릿|split|두 칸)/i.test(lower)) {
    updates.layout = 'split'
    replies.push('히어로 레이아웃을 좌우 분할로 설정했어요.')
  } else if (/(가운데|센터|중앙|center)/i.test(lower)) {
    updates.layout = 'center'
    replies.push('히어로 레이아웃을 가운데 정렬로 설정했어요.')
  }

  if (/(볼드|강렬|굵게)/i.test(lower)) {
    updates.theme = 'bold'
    replies.push('테마를 볼드 스타일로 바꿨어요.')
  } else if (/(부드럽|소프트|soft)/i.test(lower)) {
    updates.theme = 'soft'
    replies.push('테마를 소프트 스타일로 바꿨어요.')
  } else if (/(미니멀|깔끔|clean)/i.test(lower)) {
    updates.theme = 'clean'
    replies.push('테마를 미니멀 스타일로 바꿨어요.')
  }

  if (/(둥글|라운드)/i.test(lower)) {
    updates.rounded = 'xl'
    replies.push('모서리를 둥글게 설정했어요.')
  } else if (/(각진|직각)/i.test(lower)) {
    updates.rounded = 'none'
    replies.push('모서리를 각지게 설정했어요.')
  } else if (/(보통|중간)/i.test(lower)) {
    updates.rounded = 'md'
    replies.push('모서리를 중간 정도로 설정했어요.')
  }

  for (const [key, value] of Object.entries(FONT_MAP)) {
    if (lower.includes(key)) {
      updates.font = value
      replies.push(`폰트를 ${value}로 변경했어요.`)
      break
    }
  }

  const titleMatch = text.match(/(?:제목|타이틀|사이트 이름|브랜드명)\s*[:=]?\s*["'“”]?(.+?)["'“”]?\s*$/)
  if (titleMatch) {
    updates.title = cleanTail(titleMatch[1])
    replies.push(`제목을 "${updates.title}"로 변경했어요.`)
  }

  const sloganMatch = text.match(/(?:슬로건|소개|한줄 소개|설명)\s*[:=]?\s*["'“”]?(.+?)["'“”]?\s*$/)
  if (sloganMatch) {
    updates.slogan = cleanTail(sloganMatch[1])
    replies.push('슬로건을 업데이트했어요.')
  }

  const ctaMatch = text.match(/(?:메인 버튼|cta|버튼 문구|버튼 텍스트)\s*[:=]?\s*["'“”]?(.+?)["'“”]?\s*$/i)
  if (ctaMatch) {
    updates.heroCta = cleanTail(ctaMatch[1])
    replies.push('메인 버튼 문구를 변경했어요.')
  }

  const cta2Match = text.match(/(?:보조 버튼|서브 버튼|두번째 버튼)\s*[:=]?\s*["'“”]?(.+?)["'“”]?\s*$/)
  if (cta2Match) {
    updates.heroCtaSecondary = cleanTail(cta2Match[1])
    replies.push('보조 버튼 문구를 변경했어요.')
  }

  const featureMatch = text.match(/(?:특징|기능|포인트)\s*[:=]\s*(.+)/)
  if (featureMatch) {
    const items = parseList(featureMatch[1])
    if (items.length) {
      updates.features = items
      replies.push(`특징 ${items.length}개를 업데이트했어요.`)
    }
  }

  const statMatch = text.match(/(?:스탯|지표|통계)\s*[:=]\s*(.+)/)
  if (statMatch) {
    const items = parseKeyValueList(statMatch[1])
    if (items.length) {
      updates.stats = items
      replies.push(`지표 ${items.length}개를 업데이트했어요.`)
    }
  }

  const stepMatch = text.match(/(?:단계|프로세스|스텝)\s*[:=]\s*(.+)/)
  if (stepMatch) {
    const items = parseStepList(stepMatch[1])
    if (items.length) {
      updates.steps = items
      replies.push(`단계 ${items.length}개를 업데이트했어요.`)
    }
  }

  const orderMatch = text.match(/(?:섹션 순서|순서)\s*[:=]\s*(.+)/i)
  if (orderMatch) {
    const tokens = parseList(orderMatch[1])
    const order = []
    tokens.forEach((token) => {
      const key = ORDER_MAP[token] || ORDER_MAP[token.toLowerCase()]
      if (key && !order.includes(key)) {
        order.push(key)
        return
      }
      const custom = (currentCfg.customSections || []).find(
        (section) => section.title && token.includes(section.title)
      )
      if (custom) {
        const id = `custom:${custom.id}`
        if (!order.includes(id)) order.push(id)
      }
    })
    if (order.length) {
      updates.sectionOrder = order
      replies.push('섹션 순서를 변경했어요.')
    }
  }

  const faqMatch = text.match(/(?:faq|질문)\s*[:=]\s*(.+)/i)
  if (faqMatch) {
    const items = parseFaqList(faqMatch[1])
    if (items.length) {
      updates.faq = items
      replies.push(`FAQ ${items.length}개를 업데이트했어요.`)
    }
  }

  const ctaTitleMatch = text.match(/(?:CTA 제목|cta 제목)\s*[:=]\s*(.+)/i)
  if (ctaTitleMatch) {
    updates.cta = { ...(currentCfg.cta || {}), title: cleanTail(ctaTitleMatch[1]) }
    replies.push('CTA 제목을 변경했어요.')
  }

  const ctaDescMatch = text.match(/(?:CTA 설명|cta 설명)\s*[:=]\s*(.+)/i)
  if (ctaDescMatch) {
    updates.cta = { ...(currentCfg.cta || {}), desc: cleanTail(ctaDescMatch[1]) }
    replies.push('CTA 설명을 변경했어요.')
  }

  const ctaBtnMatch = text.match(/(?:CTA 버튼|cta 버튼)\s*[:=]\s*(.+)/i)
  if (ctaBtnMatch) {
    updates.cta = { ...(currentCfg.cta || {}), primary: cleanTail(ctaBtnMatch[1]) }
    replies.push('CTA 버튼 문구를 변경했어요.')
  }

  const ctaSubMatch = text.match(/(?:CTA 보조|cta 보조)\s*[:=]\s*(.+)/i)
  if (ctaSubMatch) {
    updates.cta = { ...(currentCfg.cta || {}), secondary: cleanTail(ctaSubMatch[1]) }
    replies.push('CTA 보조 문구를 변경했어요.')
  }

  const contactEmailMatch = text.match(/(?:연락처 이메일|이메일)\s*[:=]\s*(.+)/i)
  if (contactEmailMatch) {
    updates.contact = { ...(currentCfg.contact || {}), email: cleanTail(contactEmailMatch[1]) }
    replies.push('연락처 이메일을 변경했어요.')
  }
  const contactPhoneMatch = text.match(/(?:연락처 전화|전화)\s*[:=]\s*(.+)/i)
  if (contactPhoneMatch) {
    updates.contact = { ...(currentCfg.contact || {}), phone: cleanTail(contactPhoneMatch[1]) }
    replies.push('연락처 전화를 변경했어요.')
  }
  const contactAddressMatch = text.match(/(?:연락처 주소|주소)\s*[:=]\s*(.+)/i)
  if (contactAddressMatch) {
    updates.contact = { ...(currentCfg.contact || {}), address: cleanTail(contactAddressMatch[1]) }
    replies.push('연락처 주소를 변경했어요.')
  }
  const contactHoursMatch = text.match(/(?:운영시간|영업시간)\s*[:=]\s*(.+)/i)
  if (contactHoursMatch) {
    updates.contact = { ...(currentCfg.contact || {}), hours: cleanTail(contactHoursMatch[1]) }
    replies.push('운영 시간을 변경했어요.')
  }

  const customAddMatch = text.match(/(텍스트|카드|스탯|단계)?\s*(섹션|칸)\s*추가\s*[:=]\s*(.+)/i)
  if (customAddMatch) {
    const type = customAddMatch[1] || '텍스트'
    const payload = customAddMatch[3] || ''
    const [rawTitle, rawBody] = payload.split('|').map((t) => t.trim())
    const layout =
      type.includes('카드') ? 'cards' : type.includes('스탯') ? 'stats' : type.includes('단계') ? 'steps' : 'text'
    const id = createSectionId()
    const section = {
      id,
      title: rawTitle || '새 섹션',
      body: rawBody || '',
      layout,
      items: [],
      showInNav: false,
      navLabel: '',
    }
    if (layout === 'cards') {
      section.items = parseCardList(rawBody || '')
    } else if (layout === 'stats') {
      section.items = parseKeyValueList(rawBody || '')
    } else if (layout === 'steps') {
      section.items = parseStepList(rawBody || '')
    }
    updates.customSections = [...(currentCfg.customSections || []), section]
    updates.sectionOrder = [...(currentCfg.sectionOrder || []), `custom:${id}`]
    replies.push('커스텀 섹션을 추가했어요.')
  }

  const removeMatch = text.match(/(섹션|칸)\s*(삭제|제거)\s*(\d+)/i)
  if (removeMatch) {
    const idx = parseInt(removeMatch[3], 10) - 1
    const next = (currentCfg.customSections || []).filter((_, i) => i !== idx)
    updates.customSections = next
    const removed = (currentCfg.customSections || [])[idx]
    if (removed && Array.isArray(currentCfg.sectionOrder)) {
      updates.sectionOrder = currentCfg.sectionOrder.filter((id) => id !== `custom:${removed.id}`)
    }
    replies.push('해당 섹션을 삭제했어요.')
  }

  for (const section of SECTION_MAP) {
    const hit = section.terms.some((t) => lower.includes(t))
    if (!hit) continue
    const hide = /(숨기|끄|제거|없애)/i.test(lower)
    const show = /(보여|켜|추가|살려)/i.test(lower)
    if (hide) {
      updates[section.key] = false
      replies.push(`${section.label} 섹션을 숨겼어요.`)
    } else if (show) {
      updates[section.key] = true
      replies.push(`${section.label} 섹션을 보이게 했어요.`)
    }
  }

  if (/(애니메이션|모션)/i.test(lower)) {
    if (/(끄|없애|해제)/i.test(lower)) {
      updates.animation = false
      replies.push('애니메이션을 껐어요.')
    } else if (/(켜|사용|활성)/i.test(lower)) {
      updates.animation = true
      replies.push('애니메이션을 켰어요.')
    }
  }

  if (/(플로팅|부유|floating)/i.test(lower)) {
    if (/(끄|없애|해제)/i.test(lower)) {
      updates.animFloat = false
      replies.push('플로팅 애니메이션을 껐어요.')
    } else if (/(켜|사용|활성)/i.test(lower)) {
      updates.animFloat = true
      replies.push('플로팅 애니메이션을 켰어요.')
    }
  }

  if (/(그라데이션).*애니메이션|gradient animation/i.test(lower)) {
    if (/(끄|없애|해제)/i.test(lower)) {
      updates.animGradient = false
      replies.push('그라데이션 애니메이션을 껐어요.')
    } else if (/(켜|사용|활성)/i.test(lower)) {
      updates.animGradient = true
      replies.push('그라데이션 애니메이션을 켰어요.')
    }
  }

  if (/(펄스|pulse)/i.test(lower)) {
    if (/(끄|없애|해제)/i.test(lower)) {
      updates.animPulse = false
      replies.push('버튼 펄스를 껐어요.')
    } else if (/(켜|사용|활성)/i.test(lower)) {
      updates.animPulse = true
      replies.push('버튼 펄스를 켰어요.')
    }
  }

  if (/(틸트|기울|tilt)/i.test(lower)) {
    if (/(끄|없애|해제)/i.test(lower)) {
      updates.animTilt = false
      replies.push('카드 틸트를 껐어요.')
    } else if (/(켜|사용|활성)/i.test(lower)) {
      updates.animTilt = true
      replies.push('카드 틸트를 켰어요.')
    }
  }

  if (/(패럴랙스|parallax)/i.test(lower)) {
    if (/(끄|없애|해제)/i.test(lower)) {
      updates.animParallax = false
      replies.push('패럴랙스 효과를 껐어요.')
    } else if (/(켜|사용|활성)/i.test(lower)) {
      updates.animParallax = true
      replies.push('패럴랙스 효과를 켰어요.')
    }
  }

  if (!replies.length) {
    return {
      updates: {},
      reply: `요청을 이해했어요. 예시로 아래처럼 말해볼까요?\n- "카페 템플릿으로"\n- "배경 스타일: 메쉬"\n- "포인트 색상 민트"\n- "특징: 빠른 배송, 안전 결제, 리뷰 적립"\n- "섹션 추가: 팀 소개 | 우리의 철학을 소개합니다"`,
    }
  }

  return { updates, reply: replies.join(' ') }
}
