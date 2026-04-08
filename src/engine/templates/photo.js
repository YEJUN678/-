import { SHARED_JS, CONTACT_MODAL, RESERVATION_MODAL } from '../shared'

export const photo = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '12px'
  const galleryItems = cfg.galleryImages.length > 0
    ? cfg.galleryImages.map(src=>`<div onclick="openLightbox('${src}')" style="cursor:zoom-in;border-radius:${R};overflow:hidden;background:#1a1a1a"><img src="${src}" style="width:100%;height:200px;object-fit:cover;display:block"/></div>`).join('')
    : ['🌅','👫','🏔','🌸','🌊','🎭'].map(e=>`<div style="height:200px;border-radius:${R};background:linear-gradient(135deg,#1a1a1a,#2a2a2a);display:flex;align-items:center;justify-content:center;font-size:3rem">${e}</div>`).join('')

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${cfg.title}</title>
<link href="https://fonts.googleapis.com/css2?family=${cfg.font.replace(/ /g,'+')}:wght@400;700&display=swap" rel="stylesheet"/>
<style>
:root{--primary:${cfg.primary}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${cfg.font}',sans-serif;background:#050505;color:#fff}
${cfg.showNav?`nav{padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ffffff10;position:sticky;top:0;background:#050505ee;backdrop-filter:blur(10px);z-index:100}
nav .logo{font-size:1.2rem;font-weight:700;color:${cfg.primary};letter-spacing:0.08em;display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:#888;text-decoration:none;font-size:0.85rem;letter-spacing:0.05em}
nav ul li a:hover{color:#fff}`:''}
.hero{${cfg.heroImage?`background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.5)),url('${cfg.heroImage}') center/cover;min-height:80vh;display:flex;align-items:center`:'padding:5rem 3rem'};display:grid;grid-template-columns:1fr 1.1fr;gap:4rem;align-items:center;padding:5rem 3rem}
.hero h1{font-size:3.5rem;font-weight:700;line-height:1.2;margin-bottom:1rem}
.hero h1 span{color:${cfg.primary}}
.hero p{color:#888;line-height:1.8;margin-bottom:2.5rem;font-size:1.05rem}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap}
.btn{background:${cfg.primary};color:#fff;padding:0.9rem 2.2rem;border-radius:${R};border:none;font-size:0.95rem;cursor:pointer;font-weight:600}
.btn-ghost{border:1px solid #ffffff33;color:#fff;padding:0.9rem 2.2rem;border-radius:${R};background:transparent;cursor:pointer;font-size:0.95rem}
.hero-gallery{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem}
.gallery-sec{padding:5rem 3rem;background:#0a0a0a}
.gallery-sec h2{font-size:2.2rem;font-weight:700;text-align:center;margin-bottom:0.3rem}
.gallery-sec h2 span{color:${cfg.primary}}
.gallery-sec .sub{color:#666;text-align:center;margin-bottom:2.5rem}
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.8rem;max-width:1100px;margin:0 auto}
.services-sec{padding:5rem 3rem;text-align:center}
.services-sec h2{font-size:2.2rem;font-weight:700;margin-bottom:3rem}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;max-width:900px;margin:0 auto}
.svc-card{border:1px solid #1a1a1a;border-radius:${R};padding:2rem;transition:border-color 0.2s,transform 0.2s;cursor:pointer}
.svc-card:hover{border-color:${cfg.primary};transform:translateY(-4px)}
.svc-icon{font-size:2.2rem;margin-bottom:1rem}
.svc-card h3{font-size:0.95rem;font-weight:700;color:${cfg.primary};margin-bottom:0.4rem}
.svc-card p{color:#666;font-size:0.82rem;line-height:1.55;margin-bottom:0.6rem}
.svc-price{color:#fff;font-weight:700;font-size:0.9rem}
.pkg-sec{padding:5rem 3rem;background:#050505}
.pkg-sec h2{font-size:2.2rem;font-weight:700;text-align:center;margin-bottom:3rem}
.pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:900px;margin:0 auto}
.pkg{border:1px solid #1a1a1a;border-radius:${R};padding:2rem;text-align:center}
.pkg.featured{border-color:${cfg.primary};background:${cfg.primary}0d}
.pkg h3{font-size:0.88rem;color:#888;letter-spacing:0.08em;margin-bottom:1rem}
.pkg .price{font-size:2rem;font-weight:700;color:${cfg.primary};margin-bottom:1rem}
.pkg ul{list-style:none;color:#666;font-size:0.82rem;margin-bottom:1.5rem;text-align:left}
.pkg ul li{padding:0.35rem 0;border-bottom:1px solid #111}
.pkg ul li::before{content:'📷 ';font-size:0.75rem}
.pkg-btn{width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.8rem;border-radius:${R};cursor:pointer;font-weight:600}
.contact-sec{background:${cfg.primary};color:#fff;text-align:center;padding:5rem 2rem}
.contact-sec h2{font-size:2rem;margin-bottom:1rem}
.contact-sec p{opacity:0.85;margin-bottom:2rem}
.contact-btn{background:#fff;color:${cfg.primary};padding:0.9rem 2.5rem;border-radius:${R};border:none;cursor:pointer;font-weight:700;font-size:1rem}
${cfg.showFooter?`footer{background:#000;color:#333;text-align:center;padding:2rem;font-size:0.8rem;border-top:1px solid #111}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:30px;border-radius:6px" alt="logo"/>`:'📷'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#gallery">포트폴리오</a></li><li><a href="#services">서비스</a></li><li><a href="#packages">패키지</a></li></ul>
  <button class="btn" onclick="openModal('contact-modal')" style="font-size:0.85rem;padding:0.5rem 1.2rem">문의하기</button>
</nav>`:''}
<section class="hero">
  <div>
    <h1 class="fade-in">빛으로 담는<br/><span>당신의 순간</span></h1>
    <p class="fade-in">${cfg.slogan}</p>
    <div class="hero-btns fade-in">
      <button class="btn" onclick="openModal('reservation-modal')">촬영 예약</button>
      <a class="btn-ghost" href="#gallery">포트폴리오 보기</a>
    </div>
  </div>
  <div class="hero-gallery fade-in">
    ${cfg.galleryImages.slice(0,4).map(src=>`<div style="border-radius:${R};overflow:hidden;cursor:zoom-in;height:180px" onclick="openLightbox('${src}')"><img src="${src}" style="width:100%;height:100%;object-fit:cover"/></div>`).join('') || ['🌸','💑','🏔','🌊'].map(e=>`<div style="border-radius:${R};background:linear-gradient(135deg,#111,#222);display:flex;align-items:center;justify-content:center;font-size:3rem;height:180px">${e}</div>`).join('')}
  </div>
</section>
<section class="gallery-sec" id="gallery">
  <h2 class="fade-in">작품 <span>갤러리</span></h2>
  <p class="sub fade-in">클릭하여 크게 보기</p>
  <div class="gallery-grid">${galleryItems}</div>
</section>
<section class="services-sec" id="services">
  <h2 class="fade-in">서비스</h2>
  <div class="svc-grid">
    ${[['💑','웨딩 촬영','생애 가장 특별한 날의 모든 순간','150만원~'],['👶','가족/베이비','소중한 가족과의 따뜻한 추억','50만원~'],['🏢','상업 광고','브랜드를 빛내는 전문 상업 사진','80만원~'],['🎓','졸업/프로필','새로운 시작을 기념하는 사진','20만원~']].map(([e,t,d,p])=>`<div class="svc-card fade-in" onclick="openModal('contact-modal')"><div class="svc-icon">${e}</div><h3>${t}</h3><p>${d}</p><div class="svc-price">${p}</div></div>`).join('')}
  </div>
</section>
<section class="pkg-sec" id="packages">
  <h2 class="fade-in">패키지</h2>
  <div class="pkg-grid">
    <div class="pkg fade-in"><h3>BASIC</h3><div class="price">20만원</div><ul><li>2시간 촬영</li><li>보정본 30장</li><li>온라인 전달</li></ul><button class="pkg-btn" onclick="openModal('reservation-modal')">예약하기</button></div>
    <div class="pkg featured fade-in"><h3>PREMIUM</h3><div class="price">50만원</div><ul><li>4시간 촬영</li><li>보정본 100장</li><li>앨범 1권</li><li>영상 클립</li></ul><button class="pkg-btn" onclick="openModal('reservation-modal')">예약하기</button></div>
    <div class="pkg fade-in"><h3>FULL DAY</h3><div class="price">90만원</div><ul><li>종일 촬영</li><li>보정본 무제한</li><li>프리미엄 앨범</li><li>4K 영상</li></ul><button class="pkg-btn" onclick="openModal('reservation-modal')">예약하기</button></div>
  </div>
</section>
<section class="contact-sec">
  <h2 class="fade-in">촬영 문의</h2>
  <p class="fade-in">원하는 날짜와 스타일을 알려주세요</p>
  <button class="contact-btn fade-in" onclick="openModal('contact-modal')">문의하기</button>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} | 모든 이미지의 저작권은 작가에게 있습니다</p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${RESERVATION_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
