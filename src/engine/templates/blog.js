import { SHARED_JS, CONTACT_MODAL } from '../shared'

export const blog = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '12px'

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${cfg.title}</title>
<link href="https://fonts.googleapis.com/css2?family=${cfg.font.replace(/ /g,'+')}:wght@400;700&display=swap" rel="stylesheet"/>
<style>
:root{--primary:${cfg.primary}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${cfg.font}',sans-serif;background:${cfg.bg};color:${cfg.text}}
${cfg.showNav?`nav{padding:1.2rem 3rem;display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid ${cfg.primary};position:sticky;top:0;background:${cfg.bg};z-index:100}
nav .logo{font-size:1.5rem;font-weight:700;color:${cfg.primary};display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:1.5rem}
nav ul li a{color:${cfg.text};text-decoration:none;font-size:0.9rem}
nav ul li a:hover{color:${cfg.primary}}`:''}
.hero{${cfg.heroImage?`background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.4)),url('${cfg.heroImage}') center/cover;color:#fff`:`background:linear-gradient(135deg,${cfg.primary}11,${cfg.primary}22)`};padding:5rem 3rem;text-align:center}
.hero h1{font-size:3rem;font-weight:700;margin-bottom:0.8rem;${!cfg.heroImage?`color:${cfg.primary}`:''}}
.hero p{opacity:0.8;margin-bottom:2rem;font-size:1.1rem}
.subscribe-form{display:flex;gap:0.5rem;max-width:420px;margin:0 auto}
.subscribe-form input{flex:1;padding:0.75rem 1rem;border:none;border-radius:${R};font-size:0.9rem;outline:none}
.subscribe-form button{background:${cfg.primary};color:#fff;border:none;padding:0.75rem 1.5rem;border-radius:${R};cursor:pointer;font-weight:600;white-space:nowrap}
.layout{display:grid;grid-template-columns:1fr 300px;gap:3rem;max-width:1100px;margin:3rem auto;padding:0 3rem}
.cats{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:2rem}
.cat-tag{background:${cfg.primary}22;color:${cfg.primary};padding:0.3rem 0.9rem;border-radius:99px;font-size:0.83rem;cursor:pointer;border:none;font-family:inherit}
.cat-tag.active,.cat-tag:hover{background:${cfg.primary};color:#fff}
.post{background:#fff;border-radius:${R};padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 2px 12px #0001;border-left:4px solid ${cfg.primary};transition:transform 0.2s}
.post:hover{transform:translateX(4px)}
.post-thumb{height:180px;border-radius:${R};overflow:hidden;margin-bottom:1rem;background:linear-gradient(135deg,${cfg.primary}22,${cfg.primary}44);display:flex;align-items:center;justify-content:center;font-size:3rem}
.post-meta{font-size:0.78rem;color:${cfg.text}55;display:flex;gap:1rem;margin-bottom:0.5rem;align-items:center}
.post-cat{background:${cfg.primary}22;color:${cfg.primary};padding:0.1rem 0.5rem;border-radius:4px;font-size:0.75rem;font-weight:600}
.post h2{font-size:1.15rem;font-weight:700;margin-bottom:0.5rem;cursor:pointer}
.post h2:hover{color:${cfg.primary}}
.post p{color:${cfg.text}88;font-size:0.88rem;line-height:1.65;margin-bottom:0.8rem}
.read-more{color:${cfg.primary};font-size:0.85rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;background:none;font-family:inherit}
.sidebar{position:sticky;top:80px;align-self:start}
.sidebar-card{background:#fff;border-radius:${R};padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 2px 12px #0001}
.sidebar-card h3{font-size:1rem;font-weight:700;color:${cfg.primary};margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:2px solid ${cfg.primary}22}
.popular-item{display:flex;gap:0.8rem;align-items:center;padding:0.6rem 0;border-bottom:1px solid #f0f0f0;cursor:pointer}
.popular-item:last-child{border:none}
.popular-num{color:${cfg.primary};font-weight:700;font-size:1.1rem;width:24px;flex-shrink:0}
.popular-title{font-size:0.85rem;font-weight:600}
.popular-title:hover{color:${cfg.primary}}
.tag-cloud{display:flex;flex-wrap:wrap;gap:0.4rem}
.tag{background:${cfg.primary}11;color:${cfg.primary};padding:0.25rem 0.7rem;border-radius:99px;font-size:0.78rem;cursor:pointer;border:none;font-family:inherit}
.tag:hover{background:${cfg.primary};color:#fff}
${cfg.showFooter?`footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:30px;border-radius:6px" alt="logo"/>`:'✍️'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#">개발</a></li><li><a href="#">일상</a></li><li><a href="#">리뷰</a></li><li><a href="#">여행</a></li></ul>
  <button onclick="openModal('contact-modal')" style="background:${cfg.primary};color:#fff;border:none;padding:0.45rem 1.1rem;border-radius:${R};cursor:pointer;font-size:0.88rem;font-weight:600">구독하기</button>
</nav>`:''}
<section class="hero">
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <form class="subscribe-form fade-in" onsubmit="event.preventDefault();showSuccessToast();this.reset()">
    <input type="email" placeholder="이메일을 입력하세요" required/>
    <button type="submit">구독하기</button>
  </form>
</section>
<div class="layout">
  <main>
    <div class="cats">
      <button class="cat-tag active" onclick="this.closest('.cats').querySelectorAll('.cat-tag').forEach(b=>b.classList.remove('active'));this.classList.add('active')">전체</button>
      ${['개발','일상','리뷰','여행','음식'].map(c=>`<button class="cat-tag" onclick="this.closest('.cats').querySelectorAll('.cat-tag').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${c}</button>`).join('')}
    </div>
    ${[
      {e:'💻',cat:'개발',title:'React 18 완전 정복 — 초보자도 이해하는 가이드',desc:'React 18의 Concurrent Mode와 useTransition 훅을 실제 예시로 설명합니다. 기존 코드에서 어떻게 마이그레이션하는지도 다룹니다.',date:'2025.04.08',views:'3.2k',time:'8분'},
      {e:'🗻',cat:'여행',title:'봄의 제주도 — 벚꽃과 유채꽃이 만발한 풍경',desc:'4월의 제주는 온통 꽃 세상입니다. 가장 아름다운 드라이브 코스와 숨겨진 맛집을 소개합니다.',date:'2025.04.05',views:'5.1k',time:'5분'},
      {e:'📱',cat:'리뷰',title:'MacBook Pro M3 Max 3개월 실사용 후기',desc:'영상 편집, 개발, 디자인 등 다양한 작업에서 M3 Max의 진짜 성능을 테스트해 봤습니다.',date:'2025.04.01',views:'7.8k',time:'12분'},
    ].map(p=>`<article class="post fade-in">
      <div class="post-thumb">${p.e}</div>
      <div class="post-meta"><span class="post-cat">${p.cat}</span><span>${p.date}</span><span>👁 ${p.views}</span><span>⏱ ${p.time} 읽기</span></div>
      <h2>${p.title}</h2>
      <p>${p.desc}</p>
      <button class="read-more" onclick="openModal('post-modal')">더 읽기 →</button>
    </article>`).join('')}
  </main>
  <aside class="sidebar">
    <div class="sidebar-card">
      <h3>인기 글</h3>
      ${[['React 18 완전 정복','3.2k'],['MacBook M3 후기','7.8k'],['제주도 여행기','5.1k'],['Python 데이터 분석','2.4k'],['VS Code 필수 확장','4.5k']].map(([t,v],i)=>`<div class="popular-item"><span class="popular-num">${i+1}</span><div><div class="popular-title">${t}</div><div style="font-size:0.75rem;color:#aaa">👁 ${v}</div></div></div>`).join('')}
    </div>
    <div class="sidebar-card">
      <h3>태그</h3>
      <div class="tag-cloud">${['React','JavaScript','Python','여행','맛집','개발','디자인','리뷰','일상','IT','Apple','카페'].map(t=>`<button class="tag">#${t}</button>`).join('')}</div>
    </div>
    <div class="sidebar-card" style="background:${cfg.primary};color:#fff">
      <h3 style="color:#fff;border-color:#ffffff33">📬 뉴스레터</h3>
      <p style="font-size:0.85rem;opacity:0.85;margin-bottom:1rem">매주 좋은 글을 이메일로 받아보세요</p>
      <form onsubmit="event.preventDefault();showSuccessToast();this.reset()">
        <input type="email" placeholder="이메일 입력" required style="width:100%;padding:0.6rem;border-radius:8px;border:none;margin-bottom:0.5rem;font-size:0.85rem"/>
        <button type="submit" style="width:100%;background:#fff;color:${cfg.primary};border:none;padding:0.6rem;border-radius:8px;cursor:pointer;font-weight:700">구독</button>
      </form>
    </div>
  </aside>
</div>

<!-- 포스트 모달 -->
<div id="post-modal" class="modal">
  <div class="modal-box" style="max-width:700px">
    <button class="modal-close" onclick="closeModal('post-modal')">×</button>
    <span style="background:${cfg.primary};color:#fff;font-size:0.75rem;padding:0.2rem 0.6rem;border-radius:4px">개발</span>
    <h2 style="margin:1rem 0;font-size:1.5rem">React 18 완전 정복</h2>
    <p style="color:#888;font-size:0.85rem;margin-bottom:1.5rem">2025.04.08 · 👁 3.2k · ⏱ 8분 읽기</p>
    <p style="line-height:1.8;color:#444;margin-bottom:1rem">React 18은 2022년 출시된 React의 주요 버전으로, Concurrent Mode의 정식 도입이 핵심 변화입니다. 이를 통해 앱이 더 부드럽고 반응성 있게 동작합니다.</p>
    <p style="line-height:1.8;color:#444">useTransition, useDeferredValue 같은 새 훅을 사용하면 무거운 업데이트를 지연시켜 사용자 입력에 즉시 반응하는 UI를 만들 수 있습니다...</p>
    <button onclick="closeModal('post-modal');openModal('contact-modal')" style="margin-top:1.5rem;background:${cfg.primary};color:#fff;border:none;padding:0.7rem 1.5rem;border-radius:${R};cursor:pointer;font-weight:600">💬 댓글 남기기</button>
  </div>
</div>

${CONTACT_MODAL(cfg.primary)}
${SHARED_JS}
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} · ${cfg.slogan}</p></footer>`:''}
</body></html>`
}
