import { useReducer } from 'react'
import { getTemplateDefaults } from '../engine/presets'
import { BASE_SECTION_ORDER } from '../engine/sections'

const cloneDefaults = (templateId) => {
  const d = getTemplateDefaults(templateId)
  return {
    title: d.title,
    slogan: d.slogan,
    heroCta: d.heroCta,
    heroCtaSecondary: d.heroCtaSecondary,
    features: [...d.features],
    testimonials: d.testimonials.map((t) => ({ ...t })),
    pricing: d.pricing.map((p) => ({ ...p, perks: [...(p.perks || [])] })),
    faq: d.faq.map((f) => ({ ...f })),
    stats: d.stats.map((s) => ({ ...s })),
    steps: d.steps.map((s) => ({ ...s })),
    cta: { ...d.cta },
    contact: { ...d.contact },
    socials: d.socials.map((s) => ({ ...s })),
  }
}

export const DEFAULT_CONFIG = {
  template: 'cafe',
  ...cloneDefaults('cafe'),
  primary: '#6366f1',
  bg: '#ffffff',
  text: '#111827',
  font: 'Noto Sans KR',
  rounded: 'xl',
  layout: 'center',
  theme: 'clean',
  backgroundStyle: 'gradient',
  buttonStyle: 'pill',
  sectionOrder: [...BASE_SECTION_ORDER],
  showNav: true,
  showHero: true,
  showFeatures: true,
  showGallery: true,
  showTestimonials: true,
  showStats: true,
  showSteps: true,
  showPricing: true,
  showFaq: true,
  showContact: true,
  showCta: true,
  showFooter: true,
  animation: true,
  animFloat: true,
  animGradient: true,
  animPulse: true,
  animTilt: true,
  animParallax: true,
  heroImage: '',
  logoImage: '',
  galleryImages: [],
  customSections: [],
}

const initialState = () => ({
  config: DEFAULT_CONFIG,
  history: [DEFAULT_CONFIG],
  index: 0,
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'update': {
      const next = { ...state.config, ...action.payload }
      const nextHistory = [...state.history.slice(0, state.index + 1), next]
      return { config: next, history: nextHistory, index: nextHistory.length - 1 }
    }
    case 'replace': {
      const next = { ...DEFAULT_CONFIG, ...action.payload }
      return { config: next, history: [next], index: 0 }
    }
    case 'reset': {
      return { config: DEFAULT_CONFIG, history: [DEFAULT_CONFIG], index: 0 }
    }
    case 'undo': {
      if (state.index === 0) return state
      const nextIndex = state.index - 1
      return { ...state, index: nextIndex, config: state.history[nextIndex] }
    }
    case 'redo': {
      if (state.index >= state.history.length - 1) return state
      const nextIndex = state.index + 1
      return { ...state, index: nextIndex, config: state.history[nextIndex] }
    }
    case 'applyDefaults': {
      const next = { ...state.config, ...cloneDefaults(action.templateId || state.config.template) }
      const nextHistory = [...state.history.slice(0, state.index + 1), next]
      return { config: next, history: nextHistory, index: nextHistory.length - 1 }
    }
    default:
      return state
  }
}

export function useSiteConfig() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  return {
    config: state.config,
    update: (payload) => dispatch({ type: 'update', payload }),
    replace: (payload) => dispatch({ type: 'replace', payload }),
    reset: () => dispatch({ type: 'reset' }),
    undo: () => dispatch({ type: 'undo' }),
    redo: () => dispatch({ type: 'redo' }),
    applyDefaults: (templateId) => dispatch({ type: 'applyDefaults', templateId }),
    canUndo: state.index > 0,
    canRedo: state.index < state.history.length - 1,
  }
}
