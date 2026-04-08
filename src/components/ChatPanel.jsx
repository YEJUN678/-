import { useEffect, useRef, useState } from 'react'
import { COMMAND_GUIDE } from '../engine/chatParser'

const SUGGESTIONS = [
  '카페 템플릿으로',
  '포인트 색상 민트로',
  '다크 모드로',
  '배경 스타일: 메쉬',
  '메인 버튼: 예약하기',
  '특징: 빠른 배송, 안전 결제, 리뷰 적립',
  '갤러리 숨겨줘',
  '모서리 둥글게',
]

const QUICK_COMMANDS = [
  '제목: 라이트 마켓',
  '슬로건: 믿을 수 있는 라이프스타일 스토어',
  '보조 버튼: 할인 보기',
  '레이아웃을 좌우 분할로',
  '테마를 소프트로',
  'CTA 제목: 지금 바로 시작하세요',
]

export default function ChatPanel({ config, onChat, onAutoFill }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `안녕하세요. 사이트 빌더 AI입니다.\n원하는 변경을 자연어로 말해 주세요.\n\n예시:\n- "카페 템플릿으로"\n- "배경 스타일: 메쉬"\n- "특징: 빠른 배송, 안전 결제, 리뷰 적립"\n- "섹션 추가: 팀 소개 | 우리의 철학을 소개합니다"`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const reply = onChat ? onChat(msg) : '아직 연결되지 않았어요.'
      setMessages((prev) => [...prev, { role: 'ai', text: reply }])
      setLoading(false)
    }, 250)
  }

  const resetChat = () => {
    setMessages((prev) => prev.slice(0, 1))
  }

  const S = {
    wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0b1024', color: '#e5e7eb' },
    header: { padding: '1rem', borderBottom: '1px solid #1f2545', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontWeight: 700, fontSize: '0.95rem' },
    sub: { fontSize: '0.72rem', color: '#8b93b5', marginTop: '0.25rem' },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: config.primary + '33',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      flexShrink: 0,
    },
    bubble: (role) => ({
      maxWidth: '78%',
      padding: '0.65rem 0.9rem',
      borderRadius: role === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px',
      background: role === 'user' ? config.primary : '#161b36',
      color: '#fff',
      fontSize: '0.82rem',
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap',
    }),
    chip: {
      background: '#ffffff08',
      color: '#a3accf',
      border: '1px solid #2a3158',
      borderRadius: '99px',
      padding: '0.25rem 0.6rem',
      fontSize: '0.7rem',
      cursor: 'pointer',
    },
  }

  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div>
          <div style={S.title}>AI 편집 도우미</div>
          <div style={S.sub}>자연어로 바로 편집할 수 있어요</div>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button onClick={() => setShowCommands((v) => !v)} style={S.chip}>
            {showCommands ? '명령어 닫기' : '명령어 전체'}
          </button>
          <button onClick={resetChat} style={{ ...S.chip, color: '#fca5a5' }}>대화 초기화</button>
        </div>
      </div>

      {showCommands && (
        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #1f2545', maxHeight: '220px', overflowY: 'auto', background: '#0f142b' }}>
          {COMMAND_GUIDE.map((group) => (
            <div key={group.title} style={{ marginBottom: '0.8rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#e5e7eb' }}>{group.title}</div>
              <div style={{ display: 'grid', gap: '0.25rem', color: '#8b93b5', fontSize: '0.75rem' }}>
                {group.items.map((item) => (
                  <div key={item}>• {item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'ai' && <div style={{ ...S.avatar, marginRight: '0.5rem' }}>AI</div>}
            <div style={S.bubble(m.role)}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={S.avatar}>AI</div>
            <div style={{ background: '#161b36', borderRadius: '2px 12px 12px 12px', padding: '0.65rem 1rem', color: '#8b93b5', fontSize: '0.82rem' }}>
              답변 작성 중...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '0.6rem 0.8rem', borderTop: '1px solid #1f2545', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => send(s)} style={S.chip}>{s}</button>
        ))}
      </div>

      <div style={{ padding: '0.6rem 0.8rem', borderTop: '1px solid #1f2545', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        <button onClick={onAutoFill} style={{ ...S.chip, color: '#6ee7b7' }}>템플릿 기본 콘텐츠 채우기</button>
        {QUICK_COMMANDS.map((s) => (
          <button key={s} onClick={() => send(s)} style={S.chip}>{s}</button>
        ))}
      </div>

      <div style={{ padding: '0.8rem', borderTop: '1px solid #1f2545', display: 'flex', gap: '0.4rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="원하는 변경을 입력해 주세요..."
          style={{
            flex: 1,
            background: '#151a33',
            border: '1px solid #2a3158',
            borderRadius: '8px',
            color: '#fff',
            padding: '0.6rem 0.8rem',
            fontSize: '0.85rem',
            outline: 'none',
          }}
        />
        <button
          onClick={() => send()}
          style={{
            background: config.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          보내기
        </button>
      </div>
    </div>
  )
}
