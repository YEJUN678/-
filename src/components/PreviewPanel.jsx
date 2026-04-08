import { useState } from 'react'

export default function PreviewPanel({ html, siteId, siteName }) {
  const [copied, setCopied] = useState(false)
  const [device, setDevice] = useState('desktop')

  const copy = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'my-website.html'
    a.click()
  }

  const openNewTab = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener')
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  const openLiveSite = () => {
    if (!siteId) return
    const url = new URL('site.html', window.location.href)
    url.hash = siteId
    window.open(url.toString(), '_blank', 'noopener')
  }

  const widths = { desktop: '100%', tablet: '820px', mobile: '390px' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0b0f1f' }}>
      <div style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #1f2545', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ color: '#8b93b5', fontSize: '0.8rem', marginRight: '0.6rem' }}>
          현재 사이트: {siteName || '알 수 없음'}
        </div>
        <div style={{ display: 'flex', gap: '0.3rem', marginRight: 'auto' }}>
          {[['desktop', '데스크탑'], ['tablet', '태블릿'], ['mobile', '모바일']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setDevice(key)}
              style={{
                padding: '0.35rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid #2a3158',
                cursor: 'pointer',
                fontSize: '0.78rem',
                background: device === key ? '#2a3158' : 'transparent',
                color: device === key ? '#fff' : '#8b93b5',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          style={{
            background: copied ? '#10b981' : '#2a3158',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.4rem 1rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          {copied ? '복사 완료' : 'HTML 복사'}
        </button>
        <button
          onClick={download}
          style={{
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.4rem 1rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          HTML 다운로드
        </button>
        <button
          onClick={openNewTab}
          style={{
            background: '#0ea5e9',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.4rem 1rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          새 탭에서 열기
        </button>
        <button
          onClick={openLiveSite}
          style={{
            background: '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.4rem 1rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          라이브 사이트 열기
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '1rem', background: '#0f172a' }}>
        <div style={{ width: widths[device], transition: 'width 0.3s', height: '100%', minHeight: '500px' }}>
          <iframe
            srcDoc={html}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 16px 40px #00000066',
              minHeight: '500px',
              background: '#fff',
            }}
            title="preview"
          />
        </div>
      </div>
    </div>
  )
}
