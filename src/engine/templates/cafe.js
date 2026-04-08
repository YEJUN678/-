import { SHARED_JS, CONTACT_MODAL, RESERVATION_MODAL, buildAnimExtras, buildAnimCSS } from '../shared'

export const cafe = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : cfg.rounded === 'md' ? '8px' : '99px'
  const heroStyle = cfg.heroImage
    ? `background:linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.35)),url('${cfg.heroImage}') center/cover`
    : `background:linear-gradient(135deg,${cfg.primary}22,${cfg.bg})`

  const galleryHtml = cfg.galleryImages.length > 0
    ? cfg.galleryImages.map(src => `<div class="gallery-item fade-in" onclick="openLightbox('${src}')" style="cursor:zoom-in"><img src="${src}" style="width:100%;height:200px;object-fit:cover;border-radius:12px"/></div>`).join('')
    : ['☕','🍰','🧁','🍵','🥐','🍮'].map(e => `<div class="gallery-item fade-in" style="height:200px;background:linear-gradient(135deg,${cfg.primary}33,${cfg.primary}55);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:3.5rem">${e}</div>`).join('')

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
${cfg.showNav ? `
nav{background:${cfg.bg};border-bottom:1px solid ${cfg.primary}22;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px #0001}
nav .logo-wrap{display:flex;align-items:center;gap:0.5rem}
nav .logo-img{height:36px;border-radius:8px}
nav .logo{font-size:1.4rem;font-weight:700;color:${cfg.primary};text-decoration:none}
nav ul{list-style:none;display:flex;gap:1.5rem}
nav ul li a{color:${cfg.text};text-decoration:none;font-size:0.92rem;transition:color 0.2s}
nav ul li a:hover{color:${cfg.primary}}
nav .nav-btns{display:flex;gap:0.5rem;align-items:center}
` : ''}
.hero{${heroStyle};padding:6rem 2rem;text-align:center;${cfg.heroImage ? 'color:#fff' : `color:${cfg.text}`}}
.hero h1{font-size:3.2rem;font-weight:700;margin-bottom:1rem;${cfg.heroImage ? '' : `color:${cfg.primary}`}}
.hero p{font-size:1.15rem;margin-bottom:2rem;opacity:${cfg.heroImage ? '0.9' : '0.75'}}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:${cfg.primary};color:#fff;padding:0.85rem 2rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:600;text-decoration:none;display:inline-block;transition:opacity 0.2s}
.btn:hover{opacity:0.85}
.btn-outline{background:transparent;color:${cfg.heroImage ? '#fff' : cfg.primary};border:2px solid ${cfg.heroImage ? '#fff' : cfg.primary};padding:0.85rem 2rem;border-radius:${R};font-size:1rem;cursor:pointer;font-weight:600;text-decoration:none;display:inline-block}
.menu-section{padding:5rem 2rem;text-align:center}
.menu-section h2{font-size:2.2rem;color:${cfg.primary};margin-bottom:0.5rem}
.menu-section .sub{color:${cfg.text}77;margin-bottom:3rem}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;max-width:1000px;margin:0 auto}
.menu-card{background:#fff;border-radius:${cfg.rounded==='none'?'4px':'16px'};padding:1.5rem;box-shadow:0 4px 20px #0001;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s}
.menu-card:hover{transform:translateY(-4px);box-shadow:0 8px 32px #0002}
.menu-card .emoji{font-size:2.8rem;margin-bottom:0.8rem}
.menu-card h3{color:${cfg.primary};margin-bottom:0.3rem;font-size:1rem}
.menu-card p{color:#888;font-size:0.85rem;line-height:1.5}
.menu-card .price{color:${cfg.primary};font-weight:700;margin-top:0.7rem;font-size:1.05rem}
.menu-card .add-btn{margin-top:0.8rem;width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.6rem;border-radius:${cfg.rounded==='none'?'4px':'8px'};cursor:pointer;font-size:0.88rem;font-weight:600}
.gallery-section{padding:5rem 2rem;background:${cfg.primary}08;text-align:center}
.gallery-section h2{font-size:2.2rem;color:${cfg.primary};margin-bottom:2rem}
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;max-width:1000px;margin:0 auto}
.info-section{display:grid;grid-template-columns:1fr 1fr;gap:0;background:${cfg.primary}}
.info-box{padding:4rem 3rem;color:#fff}
.info-box h3{font-size:1.5rem;margin-bottom:1rem}
.info-box p{opacity:0.85;line-height:1.8}
${cfg.showFooter ? `footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}` : ''}
</style>
</head>
<body>

${cfg.showNav ? `
<nav>
  <div class="logo-wrap">
    ${cfg.logoImage ? `<img class="logo-img" src="${cfg.logoImage}" alt="logo"/>` : ''}
    <a class="logo" href="#">☕ ${cfg.title}</a>
  </div>
  <ul class="mobile-hide">
    <li><a href="#menu">메뉴</a></li>
    <li><a href="#gallery">갤러리</a></li>
    <li><a href="#info">오시는 길</a></li>
  </ul>
  <div class="nav-btns">
    <button class="btn" onclick="openModal('reservation-modal')" style="padding:0.5rem 1.2rem;font-size:0.88rem">예약하기</button>
    <div class="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></div>
  </div>
  <div id="mobile-menu" class="mobile-menu">
    <a href="#menu" style="color:${cfg.text};text-decoration:none;padding:0.5rem">메뉴</a>
    <a href="#gallery" style="color:${cfg.text};text-decoration:none;padding:0.5rem">갤러리</a>
    <a href="#info" style="color:${cfg.text};text-decoration:none;padding:0.5rem">오시는 길</a>
  </div>
</nav>` : ''}

<section class="hero">
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <div class="hero-btns fade-in">
    <button class="btn" onclick="openModal('reservation-modal')">자리 예약하기</button>
    <a class="btn-outline" href="#menu">메뉴 보기</a>
  </div>
</section>

<section class="menu-section" id="menu">
  <h2 class="fade-in">인기 메뉴</h2>
  <p class="sub fade-in">매일 신선하게 준비하는 시그니처 메뉴</p>
  <div class="menu-grid">
    <div class="menu-card fade-in"><div class="emoji">☕</div><h3>시그니처 라떼</h3><p>부드럽고 진한 에스프레소</p><div class="price">5,500원</div><button class="add-btn" onclick="addToCart('시그니처 라떼',5500,'☕')">장바구니 담기</button></div>
    <div class="menu-card fade-in"><div class="emoji">🍵</div><h3>말차 라떼</h3><p>향긋한 말차의 풍미</p><div class="price">6,000원</div><button class="add-btn" onclick="addToCart('말차 라떼',6000,'🍵')">장바구니 담기</button></div>
    <div class="menu-card fade-in"><div class="emoji">🧁</div><h3>크림 케이크</h3><p>매일 직접 만드는 케이크</p><div class="price">7,500원</div><button class="add-btn" onclick="addToCart('크림 케이크',7500,'🧁')">장바구니 담기</button></div>
    <div class="menu-card fade-in"><div class="emoji">🥐</div><h3>버터 크로와상</h3><p>바삭한 겹겹이 버터 크로와상</p><div class="price">4,500원</div><button class="add-btn" onclick="addToCart('버터 크로와상',4500,'🥐')">장바구니 담기</button></div>
  </div>
</section>

<section class="gallery-section" id="gallery">
  <h2 class="fade-in">갤러리</h2>
  <div class="gallery-grid">${galleryHtml}</div>
</section>

<section class="info-section" id="info">
  <div class="info-box fade-in">
    <h3>📍 오시는 길</h3>
    <p>서울특별시 마포구 합정동 123-45<br/>2호선 합정역 1번 출구에서 도보 5분</p>
    <br/>
    <button onclick="openModal('contact-modal')" style="background:#fff;color:${cfg.primary};border:none;padding:0.7rem 1.5rem;border-radius:${R};cursor:pointer;font-weight:700;margin-top:0.5rem">문의하기</button>
  </div>
  <div class="info-box fade-in" style="background:${cfg.primary}cc">
    <h3>🕐 영업시간</h3>
    <p>월 – 금 &nbsp; 08:00 – 21:00<br/>토 – 일 &nbsp; 09:00 – 22:00<br/>공휴일 &nbsp; 10:00 – 20:00</p>
  </div>
</section>

${cfg.showFooter ? `<footer><p>© 2025 ${cfg.title} | 📞 02-1234-5678 | ${cfg.slogan}</p></footer>` : ''}

<!-- 장바구니 사이드바 -->
<div id="cart-sidebar" style="position:fixed;top:0;right:-400px;width:360px;height:100vh;background:#fff;box-shadow:-4px 0 20px #0002;z-index:1000;transition:right 0.3s;display:flex;flex-direction:column">
  <div style="padding:1.5rem;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center">
    <h3>🛒 장바구니 <span id="cart-badge" style="background:${cfg.primary};color:#fff;border-radius:99px;padding:0.1rem 0.5rem;font-size:0.8rem;margin-left:0.3rem">0</span></h3>
    <button onclick="document.getElementById('cart-sidebar').style.right='-400px';document.getElementById('cart-overlay').style.display='none'" style="background:none;border:none;font-size:1.5rem;cursor:pointer">×</button>
  </div>
  <div id="cart-list" style="flex:1;overflow-y:auto;padding:1rem 1.5rem"><p style="color:#aaa;text-align:center;padding:2rem">장바구니가 비어있어요</p></div>
  <div style="padding:1.5rem;border-top:1px solid #eee">
    <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:1rem;font-size:1.1rem"><span>합계</span><span id="cart-total">0원</span></div>
    <button style="width:100%;background:${cfg.primary};color:#fff;border:none;padding:1rem;border-radius:8px;font-size:1rem;cursor:pointer;font-weight:700" onclick="alert('결제 페이지로 이동합니다!')">결제하기</button>
  </div>
</div>
<div id="cart-overlay" onclick="document.getElementById('cart-sidebar').style.right='-400px';this.style.display='none'" style="display:none;position:fixed;inset:0;background:#0005;z-index:999"></div>

<!-- 장바구니 버튼 (하단 고정) -->
<button onclick="document.getElementById('cart-sidebar').style.right='0';document.getElementById('cart-overlay').style.display='block'"
  style="position:fixed;bottom:2rem;right:2rem;background:${cfg.primary};color:#fff;border:none;padding:1rem 1.3rem;border-radius:50%;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 16px ${cfg.primary}88;z-index:500;width:56px;height:56px">
  🛒
</button>

${CONTACT_MODAL(cfg.primary)}
${RESERVATION_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
