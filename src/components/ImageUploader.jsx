import { useId } from 'react'

export default function ImageUploader({ label, value, onChange }) {
  const inputId = useId()

  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.readAsDataURL(file)
    })

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const b64 = await toBase64(file)
    onChange(b64)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    const b64 = await toBase64(file)
    onChange(b64)
  }

  return (
    <div>
      <label style={{ fontSize: '0.75rem', color: '#8b93b5', display: 'block', marginBottom: '0.4rem' }}>{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(inputId).click()}
        style={{
          border: `2px dashed ${value ? '#10b981' : '#2a3158'}`,
          borderRadius: '10px',
          padding: '0.8rem',
          cursor: 'pointer',
          textAlign: 'center',
          background: value ? '#10b98110' : '#0f1324',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        {value ? (
          <>
            <img src={value} alt="preview" style={{ maxHeight: '70px', maxWidth: '100%', borderRadius: '6px', objectFit: 'cover' }} />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.1rem 0.4rem',
                cursor: 'pointer',
                fontSize: '0.7rem',
              }}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1.3rem', color: '#56608a' }}>+</div>
            <div style={{ color: '#6b7280', fontSize: '0.72rem' }}>클릭 또는 드래그로 업로드</div>
          </>
        )}
      </div>
      <input id={inputId} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  )
}
