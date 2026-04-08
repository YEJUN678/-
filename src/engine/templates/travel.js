import { SHARED_JS, CONTACT_MODAL, RESERVATION_MODAL } from '../shared'

export const travel = (cfg) => {
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
${cfg.showNav?`nav{position:absolute;top:0;width:100%;padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;z-index:10}
nav .logo{color:#fff;font-size:1.4rem;font-weight:700;display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:#ffffffcc;text-decoration:none;font-size:0.88rem}
nav ul li a:hover{color:#fff}`:''}
.hero{height:100vh;${cfg.heroImage?`background:linear-gradient(to bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.5)),url('${cfg.heroImage}') center/cover`:`background:linear-gradient(135deg,${cfg.primary}cc,#0a3d62)`};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;position:relative}
.hero h1{font-size:4rem;font-weight:700;margin-bottom:1rem;text-shadow:0 2px 12px #0005}
.hero p{font-size:1.2rem;opacity:0.9;margin-bottom:3rem}
.search-box{background:#fff;border-radius:${cfg.rounded==='none'?'8px':'99px'};padding:0.7rem 0.7rem 0.7rem 1.5rem;display:flex;gap:0.5rem;max-width:560px;width:90%;box-shadow:0 8px 32px #0004}
.search-box input{flex:1;border:none;outline:none;font-size:0.95rem;color:#333;background:transparent;font-family:inherit}
.search-btn{background:${cfg.primary};color:#fff;border:none;padding:0.65rem 1.8rem;border-radius:${cfg.rounded==='none'?'4px':'99px'};cursor:pointer;font-weight:600;font-size:0.9rem}
.dest-sec{padding:5rem 3rem;text-align:center}
.dest-sec h2{font-size:2.5rem;font-weight:700;margin-bottom:0.5rem}
.dest-sec .sub{color:${cfg.text}77;margin-bottom:3rem}
.dest-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.dest-card{border-radius:${R};overflow:hidden;box-shadow:0 4px 20px #0002;cursor:pointer;transition:transform 0.2s}
.dest-card:hover{transform:translateY(-6px)}
.dest-thumb{height:220px;background:linear-gradient(135deg,${cfg.primary}44,${cfg.primary}88);display:flex;align-items:center;justify-content:center;font-size:5rem;position:relative;overflow:hidden}
.dest-thumb img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
.dest-badge{position:absolute;top:0.8rem;right:0.8rem;background:${cfg.primary};color:#fff;font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:99px;font-weight:700;z-index:1}
.dest-info{padding:1.2rem;background:#fff}
.dest-info h3{font-size:1.05rem;font-weight:700;margin-bottom:0.3rem}
.dest-meta{display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem}
.dest-price{color:${cfg.primary};font-weight:700}
.dest-rating{color:#f1c40f;font-size:0.85rem}
.dest-btn{margin-top:0.8rem;width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.6rem;border-radius:${R};cursor:pointer;font-size:0.85rem;font-weight:600}
.features{display:grid;grid-template-columns:repeat(4,1fr);background:${cfg.primary};color:#fff;padding:3rem 2rem;text-align:center}
.feature .icon{font-size:2rem;margin-bottom:0.5rem}
.feature h3{font-size:0.95rem;font-weight:700;margin-bottom:0.2rem}
.feature p{font-size:0.8rem;opacity:0.8}
.deals{padding:5rem 3rem;background:${cfg.primary}06;text-align:center}
.deals h2{font-size:2rem;font-weight:700;margin-bottom:2.5rem}
.deal-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;max-width:1000px;margin:0 auto}
.deal{background:#fff;border-radius:${R};padding:1.5rem;display:flex;gap:1rem;align-items:center;box-shadow:0 2px 12px #0001;cursor:pointer;transition:transform 0.2s}
.deal:hover{transform:translateY(-2px)}
.deal-icon{font-size:2.8rem;flex-shrink:0}
.deal h3{font-size:0.95rem;font-weight:700}
.deal p{color:${cfg.text}77;font-size:0.82rem}
.deal-price{color:${cfg.primary};font-weight:700;margin-top:0.3rem}
.deal-btn{margin-left:auto;background:${cfg.primary};color:#fff;border:none;padding:0.5rem 1rem;border-radius:${R};cursor:pointer;font-size:0.8rem;font-weight:600;flex-shrink:0}
${cfg.showFooter?`footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:30px;border-radius:6px" alt="logo"/>`:'✈️'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#destinations">여행지</a></li><li><a href="#deals">특가</a></li><li><a href="#">항공</a></li><li><a href="#">호텔</a></li></ul>
  <button onclick="openModal('contact-modal')" style="background:#ffffff33;color:#fff;border:1px solid #ffffff55;padding:0.45rem 1.1rem;border-radius:${R};cursor:pointer;font-size:0.88rem;backdrop-filter:blur(4px)">문의하기</button>
</nav>`:''}
<section class="hero">
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <div class="search-box fade-in">
    <input type="text" placeholder="어디로 떠나고 싶으세요?"/>
    <button class="search-btn" onclick="openModal('reservation-modal')">검색</button>
  </div>
</section>
<section class="dest-sec" id="destinations">
  <h2 class="fade-in">인기 여행지</h2>
  <p class="sub fade-in">지금 가장 핫한 여행지를 만나보세요</p>
  <div class="dest-grid">
    ${[
      {e:'🗼',n:'파리, 프랑스',p:'899,000원~',r:'⭐ 4.9',b:'인기 1위',img:cfg.galleryImages[0]||''},
      {e:'🏝',n:'발리, 인도네시아',p:'650,000원~',r:'⭐ 4.8',b:'특가',img:cfg.galleryImages[1]||''},
      {e:'🗻',n:'도쿄, 일본',p:'420,000원~',r:'⭐ 4.9',b:'',img:cfg.galleryImages[2]||''},
      {e:'🏛',n:'로마, 이탈리아',p:'1,100,000원~',r:'⭐ 4.7',b:'NEW',img:cfg.galleryImages[3]||''},
    ].map(d=>`<div class="dest-card fade-in">
      <div class="dest-thumb">${d.img?`<img src="${d.img}" alt=""/>`:''}${d.e}${d.b?`<span class="dest-badge">${d.b}</span>`:''}
      </div>
      <div class="dest-info">
        <h3>${d.n}</h3>
        <div class="dest-meta"><span class="dest-price">${d.p}</span><span class="dest-rating">${d.r}</span></div>
        <button class="dest-btn" onclick="openModal('reservation-modal')">예약하기</button>
      </div>
    </div>`).join('')}
  </div>
</section>
<div class="features">
  ${[['🛡','안전 보장','24시간 현지 지원'],['💰','최저가 보장','더 싸면 차액 환불'],['🔄','무료 취소','출발 7일 전까지'],['📞','전담 매니저','1:1 맞춤 서비스']].map(([e,t,d])=>`<div class="feature"><div class="icon">${e}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div>
<section class="deals" id="deals">
  <h2 class="fade-in">이번 주 특가</h2>
  <div class="deal-list">
    ${[['🇹🇭','방콕 4박 5일','항공+호텔+투어 포함','499,000원 (40% 할인)'],['🇪🇸','스페인 7박 8일','바르셀로나+마드리드','1,490,000원 (25% 할인)'],['🇻🇳','다낭 3박 4일','리조트 포함','320,000원 (35% 할인)']].map(([e,t,d,p])=>`<div class="deal fade-in"><div class="deal-icon">${e}</div><div><h3>${t}</h3><p>${d}</p><div class="deal-price">${p}</div></div><button class="deal-btn" onclick="openModal('reservation-modal')">예약</button></div>`).join('')}
  </div>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} | 관광사업자 등록번호: 제2025-001호</p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${RESERVATION_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
