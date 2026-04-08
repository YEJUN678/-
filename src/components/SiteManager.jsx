export default function SiteManager({
  sites,
  currentId,
  limit,
  onSelect,
  onCreate,
  onDuplicate,
  onRename,
  onDelete,
}) {
  const handleCreate = () => {
    if (sites.length >= limit) {
      alert(`최대 ${limit}개까지 만들 수 있어요.`)
      return
    }
    const name = prompt('새 사이트 이름을 입력하세요.', `내 사이트 ${sites.length + 1}`)
    if (!name) return
    onCreate(name.trim())
  }

  const handleRename = (site) => {
    const name = prompt('사이트 이름을 수정하세요.', site.name)
    if (!name) return
    onRename(site.id, name.trim())
  }

  const handleDelete = (site) => {
    const ok = confirm(`"${site.name}" 사이트를 삭제할까요?`)
    if (!ok) return
    const result = onDelete(site.id)
    if (result && result.ok === false && result.reason === 'minimum') {
      alert('최소 1개의 사이트는 남겨야 해요.')
    }
  }

  const handleDuplicate = (site) => {
    const result = onDuplicate(site.id)
    if (result && result.ok === false && result.reason === 'limit') {
      alert(`최대 ${limit}개까지 만들 수 있어요.`)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700 }}>내 사이트 ({sites.length}/{limit})</div>
        <button onClick={handleCreate} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #2a3158', background: '#1f2a4a', color: '#6ee7b7', cursor: 'pointer', fontSize: '0.72rem' }}>
          새 사이트
        </button>
      </div>
      <div style={{ display: 'grid', gap: '0.4rem' }}>
        {sites.map((site) => (
          <div key={site.id} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', padding: '0.45rem 0.6rem', borderRadius: '8px', border: '1px solid #2a3158', background: site.id === currentId ? '#1f2a4a' : '#0f1324' }}>
            <button
              onClick={() => onSelect(site.id)}
              style={{
                flex: 1,
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                color: site.id === currentId ? '#fff' : '#c5c9e4',
                cursor: 'pointer',
                fontSize: '0.82rem',
              }}
            >
              {site.name}
            </button>
            <button onClick={() => handleDuplicate(site)} style={{ background: 'transparent', border: 'none', color: '#8b93b5', cursor: 'pointer', fontSize: '0.72rem' }}>복제</button>
            <button onClick={() => handleRename(site)} style={{ background: 'transparent', border: 'none', color: '#8b93b5', cursor: 'pointer', fontSize: '0.72rem' }}>이름</button>
            <button onClick={() => handleDelete(site)} style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '0.72rem' }}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}
