import { SHARED_JS, CONTACT_MODAL, RESERVATION_MODAL } from '../shared'

export const restaurant = (cfg) => {
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
${cfg.showNav?`nav{position:fixed;top:0;width:100%;background:${cfg.bg}ee;backdrop-filter:blur(12px);padding:1.2rem 3rem;display:flex;justify-content:space-between;align-items:center;z-index:100;border-bottom:1px solid ${cfg.primary}22}
nav .logo{font-size:1.5rem;font-weight:700;color:${cfg.primary};display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:${cfg.text};text-decoration:none;font-size:0.9rem}
nav ul li a:hover{color:${cfg.primary}}`:''}
.hero{height:100vh;${cfg.heroImage?`background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.4)),url('${cfg.heroImage}') center/cover`:`background:linear-gradient(135deg,#1a0a00,${cfg.primary}88,#1a0a00)`};display:flex;align-items:center;justify-content:center;text-align:center;color:#fff}
.hero-content h1{font-size:4rem;font-weight:700;margin-bottom:1rem;text-shadow:0 2px 12px #0006}
.hero-content p{font-size:1.2rem;opacity:0.9;margin-bottom:2.5rem}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:${cfg.primary};color:#fff;padding:1rem 2.5rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:600}
.btn:hover{opacity:0.9}
.btn-outline{border:2px solid #fff;color:#fff;padding:1rem 2.5rem;border-radius:${R};text-decoration:none;font-size:1rem;font-weight:600;background:transparent;cursor:pointer}
.story{display:grid;grid-template-columns:1fr 1fr}
.story-img{min-height:400px;${cfg.galleryImages[0]?`background:url('${cfg.galleryImages[0]}') center/cover`:`background:url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800') center/cover`}}
.story-text{padding:5rem;background:${cfg.primary};color:#fff;display:flex;flex-direction:column;justify-content:center}
.story-text h2{font-size:2rem;margin-bottom:1.2rem}
.story-text p{opacity:0.85;line-height:1.8;margin-bottom:2rem}
.menu-sec{padding:5rem 3rem;text-align:center}
.menu-sec h2{font-size:2.5rem;font-weight:700;color:${cfg.primary};margin-bottom:0.5rem}
.menu-sec .sub{color:${cfg.text}77;margin-bottom:1.5rem}
.menu-tabs{display:flex;gap:0.5rem;justify-content:center;margin-bottom:2.5rem;flex-wrap:wrap}
.menu-tab{padding:0.5rem 1.3rem;border-radius:99px;border:2px solid ${cfg.primary}33;cursor:pointer;font-size:0.88rem;background:#fff;color:${cfg.text};font-family:inherit}
.menu-tab.active,.menu-tab:hover{background:${cfg.primary};color:#fff;border-color:${cfg.primary}}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.menu-item{background:#fff;border-radius:${R};overflow:hidden;box-shadow:0 4px 20px #0001;text-align:left;transition:transform 0.2s}
.menu-item:hover{transform:translateY(-4px)}
.menu-img{height:180px;background:linear-gradient(135deg,${cfg.primary}33,${cfg.primary}66);display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative}
.menu-badge{position:absolute;top:0.6rem;right:0.6rem;background:${cfg.primary};color:#fff;font-size:0.72rem;padding:0.2rem 0.5rem;border-radius:4px}
.menu-info{padding:1.2rem}
.menu-info h3{font-size:1rem;font-weight:700;margin-bottom:0.3rem}
.menu-info p{color:#888;font-size:0.83rem;margin-bottom:0.6rem}
.menu-price{color:${cfg.primary};font-weight:700;font-size:1.05rem}
.gallery-sec{padding:4rem 3rem;background:${cfg.primary}06;text-align:center}
.gallery-sec h2{font-size:2rem;font-weight:700;color:${cfg.primary};margin-bottom:2rem}
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.8rem;max-width:1100px;margin:0 auto}
.gallery-cell{height:180px;border-radius:${R};overflow:hidden;cursor:zoom-in;background:linear-gradient(135deg,${cfg.primary}22,${cfg.primary}44);display:flex;align-items:center;justify-content:center;font-size:3.5rem}
.gallery-cell img{width:100%;height:100%;object-fit:cover}
.reserve-sec{background:${cfg.primary};color:#fff;text-align:center;padding:5rem 2rem}
.reserve-sec h2{font-size:2.2rem;margin-bottom:1rem}
.reserve-sec p{opacity:0.85;margin-bottom:2.5rem}
.reserve-btn{background:#fff;color:${cfg.primary};padding:1rem 3rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:700}
.hours{padding:4rem 3rem;text-align:center}
.hours h2{font-size:2rem;font-weight:700;color:${cfg.primary};margin-bottom:2rem}
.hours-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;max-width:800px;margin:0 auto}
.hours-card{background:#fff;border-radius:${R};padding:1.5rem;box-shadow:0 2px 12px #0001;text-align:center}
.hours-card h3{color:${cfg.primary};font-weight:700;margin-bottom:0.5rem}
.hours-card p{color:#777;font-size:0.9rem;line-height:1.6}
${cfg.showFooter?`footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:32px;border-radius:6px" alt="logo"/>`:'🍽'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#menu">메뉴</a></li><li><a href="#gallery">갤러리</a></li><li><a href="#hours">영업시간</a></li></ul>
  <button onclick="openModal('reservation-modal')" style="background:${cfg.primary};color:#fff;border:none;padding:0.5rem 1.2rem;border-radius:${R};cursor:pointer;font-weight:600">예약하기</button>
</nav>`:''}
<section class="hero">
  <div class="hero-content">
    <h1 class="fade-in">${cfg.title}</h1>
    <p class="fade-in">${cfg.slogan}</p>
    <div class="hero-btns fade-in">
      <button class="btn" onclick="openModal('reservation-modal')">예약하기</button>
      <a class="btn-outline" href="#menu">메뉴 보기</a>
    </div>
  </div>
</section>
<section class="story">
  <div class="story-img"></div>
  <div class="story-text fade-in">
    <h2>우리의 이야기</h2>
    <p>최고의 식재료와 셰프의 정성으로 완성되는 특별한 한 끼. 매일 아침 신선한 재료를 직접 엄선하여 최고의 맛을 선사합니다.</p>
    <button onclick="openModal('contact-modal')" style="background:#fff;color:${cfg.primary};border:none;padding:0.7rem 1.8rem;border-radius:${R};cursor:pointer;font-weight:700;align-self:flex-start">문의하기</button>
  </div>
</section>
<section class="menu-sec" id="menu">
  <h2 class="fade-in">시그니처 메뉴</h2>
  <p class="sub fade-in">셰프가 엄선한 최고의 요리</p>
  <div class="menu-tabs">
    <button class="menu-tab active" onclick="filterMenu(this,'all')">전체</button>
    <button class="menu-tab" onclick="filterMenu(this,'메인')">메인</button>
    <button class="menu-tab" onclick="filterMenu(this,'파스타')">파스타</button>
    <button class="menu-tab" onclick="filterMenu(this,'디저트')">디저트</button>
  </div>
  <div class="menu-grid">
    ${[
      {e:'🥩',n:'등심 스테이크',d:'28일 숙성 한우 등심, 트러플 소스',p:'58,000',badge:'시그니처',cat:'메인'},
      {e:'🦞',n:'랍스터 파스타',d:'보스턴 랍스터, 크림 소스',p:'42,000',badge:'',cat:'파스타'},
      {e:'🍱',n:'시즌 코스',d:'제철 식재료 5코스 메뉴',p:'89,000',badge:'추천',cat:'메인'},
      {e:'🍝',n:'트러플 리조또',d:'이탈리아산 트러플, 파르마 치즈',p:'36,000',badge:'',cat:'파스타'},
      {e:'🎂',n:'시그니처 케이크',d:'매일 직접 만드는 디저트',p:'18,000',badge:'',cat:'디저트'},
      {e:'🍮',n:'크렘 브륄레',d:'바닐라빈 크림, 캐러멜',p:'15,000',badge:'',cat:'디저트'},
    ].map(m=>`<div class="menu-item fade-in" data-cat="${m.cat}">
      <div class="menu-img">${m.e}${m.badge?`<span class="menu-badge">${m.badge}</span>`:''}</div>
      <div class="menu-info"><h3>${m.n}</h3><p>${m.d}</p><div class="menu-price">${m.p}원</div></div>
    </div>`).join('')}
  </div>
</section>
<section class="gallery-sec" id="gallery">
  <h2 class="fade-in">갤러리</h2>
  <div class="gallery-grid">
    ${cfg.galleryImages.length > 0
      ? cfg.galleryImages.map(src=>`<div class="gallery-cell" onclick="openLightbox('${src}')"><img src="${src}" alt=""/></div>`).join('')
      : ['🌮','🍣','🥗','🍜','🥘','🍷'].map(e=>`<div class="gallery-cell">${e}</div>`).join('')}
  </div>
</section>
<section class="reserve-sec">
  <h2 class="fade-in">특별한 날, 함께하세요</h2>
  <p class="fade-in">소중한 사람과의 완벽한 식사를 위해 예약해 드립니다</p>
  <button class="reserve-btn fade-in" onclick="openModal('reservation-modal')">온라인 예약하기</button>
</section>
<section class="hours" id="hours">
  <h2 class="fade-in">영업시간</h2>
  <div class="hours-grid">
    <div class="hours-card fade-in"><h3>평일</h3><p>월 – 금<br/>11:30 – 22:00<br/>(브레이크 15:00–17:30)</p></div>
    <div class="hours-card fade-in"><h3>주말</h3><p>토 – 일<br/>11:00 – 23:00<br/>연중무휴</p></div>
    <div class="hours-card fade-in"><h3>오시는 길</h3><p>서울 강남구 청담동<br/>📞 02-1234-5678<br/>주차 가능</p></div>
  </div>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} | 📞 02-1234-5678 | 📍 서울 강남구 청담동</p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${RESERVATION_MODAL(cfg.primary)}
${SHARED_JS}
<script>
function filterMenu(btn, cat) {
  document.querySelectorAll('.menu-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.menu-item').forEach(item=>{
    item.style.display = (cat==='all'||item.dataset.cat===cat)?'block':'none';
  });
}
</script>
</body></html>`
}
