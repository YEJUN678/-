export default function GalleryUploader({ images, onChange }) {
  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.readAsDataURL(file)
    })

  const addImages = async (e) => {
    const files = Array.from(e.target.files).slice(0, 6 - images.length)
    const b64s = await Promise.all(files.map(toBase64))
    onChange([...images, ...b64s].slice(0, 6))
  }

  const remove = (idx) => onChange(images.filter((_, i) => i !== idx))

  return (
    <div>
      <label style={{ fontSize: '0.75rem', color: '#8b93b5', display: 'block', marginBottom: '0.4rem' }}>
        갤러리 이미지 (최대 6장)
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem', marginBottom: '0.4rem' }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: '1px solid #2a3158' }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              onClick={() => remove(i)}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: '#ef4444cc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.1rem 0.3rem',
                cursor: 'pointer',
                fontSize: '0.65rem',
              }}
            >
              삭제
            </button>
          </div>
        ))}
        {images.length < 6 && (
          <label
            htmlFor="gallery-input"
            style={{
              aspectRatio: '1',
              border: '2px dashed #2a3158',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: '#56608a',
            }}
          >
            +
          </label>
        )}
      </div>
      <input id="gallery-input" type="file" accept="image/*" multiple onChange={addImages} style={{ display: 'none' }} />
    </div>
  )
}
