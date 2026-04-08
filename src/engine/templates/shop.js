import { SHARED_JS, CONTACT_MODAL } from '../shared'

export const shop = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '12px'
  const products = [
    {e:'👟',name:'프리미엄 스니커즈',price:89000,old:120000,cat:'신발'},
    {e:'👗',name:'린넨 원피스',price:55000,old:75000,cat:'의류'},
    {e:'🎒',name:'미니 백팩',price:45000,old:null,cat:'가방'},
    {e:'⌚',name:'스마트 워치',price:199000,old:250000,cat:'액세서리'},
    {e:'🕶',name:'선글라스',price:35000,old:48000,cat:'액세서리'},
    {e:'🧥',name:'오버핏 자켓',price:79000,old:null,cat:'의류'},
    {e:'👜',name:'숄더백',price:65000,old:89000,cat:'가방'},
    {e:'🩴',name:'여름 샌들',price:32000,old:null,cat:'신발'},
  ]

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
${cfg.showNav?`nav{background:#fff;box-shadow:0 2px 8px #0001;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}
nav .logo{font-size:1.4rem;font-weight:700;color:${cfg.primary};display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:1.5rem}
nav ul li a{color:${cfg.text};text-decoration:none;font-size:0.9rem}
nav ul li a:hover{color:${cfg.primary}}
.nav-right{display:flex;gap:0.8rem;align-items:center}
.cart-nav-btn{background:${cfg.primary};color:#fff;border:none;padding:0.5rem 1.2rem;border-radius:${R};cursor:pointer;font-size:0.9rem;font-weight:600;position:relative}
.cart-nav-badge{position:absolute;top:-6px;right:-6px;background:#ef4444;color:#fff;border-radius:50%;width:18px;height:18px;font-size:0.65rem;display:flex;align-items:center;justify-content:center;font-weight:700}`:''}
.banner{${cfg.heroImage?`background:linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('${cfg.heroImage}') center/cover`:`background:linear-gradient(135deg,${cfg.primary},${cfg.primary}cc)`};color:#fff;text-align:center;padding:5rem 2rem}
.banner h1{font-size:2.8rem;font-weight:700;margin-bottom:1rem}
.banner p{font-size:1.1rem;opacity:0.9;margin-bottom:2rem}
.banner-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:#fff;color:${cfg.primary};padding:0.85rem 2rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:700;text-decoration:none;display:inline-block}
.btn-outline{border:2px solid #fff;color:#fff;padding:0.85rem 2rem;border-radius:${R};text-decoration:none;font-size:1rem;font-weight:600;display:inline-block}
.filter-bar{padding:1.5rem 2rem;display:flex;gap:0.5rem;flex-wrap:wrap;background:#fff;border-bottom:1px solid #eee}
.filter-btn{padding:0.4rem 1rem;border-radius:99px;border:1px solid #ddd;cursor:pointer;font-size:0.85rem;background:#fff;color:${cfg.text};transition:all 0.2s}
.filter-btn.active,.filter-btn:hover{background:${cfg.primary};color:#fff;border-color:${cfg.primary}}
.products{padding:3rem 2rem}
.products h2{font-size:1.8rem;font-weight:700;margin-bottom:2rem;text-align:center}
.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.product-card{background:#fff;border-radius:${R};overflow:hidden;box-shadow:0 2px 12px #0001;transition:transform 0.2s,box-shadow 0.2s;cursor:pointer}
.product-card:hover{transform:translateY(-4px);box-shadow:0 8px 28px #0002}
.product-img{height:200px;background:linear-gradient(135deg,${cfg.primary}22,${cfg.primary}44);display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative}
.badge{position:absolute;top:0.6rem;left:0.6rem;background:#ef4444;color:#fff;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;font-weight:700}
.product-info{padding:1rem}
.product-info h3{font-size:0.95rem;font-weight:600;margin-bottom:0.4rem}
.price-row{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.8rem}
.price{color:${cfg.primary};font-weight:700;font-size:1.05rem}
.old-price{color:#aaa;text-decoration:line-through;font-size:0.85rem}
.add-btn{width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.65rem;border-radius:${R};cursor:pointer;font-size:0.88rem;font-weight:600;transition:opacity 0.2s}
.add-btn:hover{opacity:0.85}
.promo-banner{background:${cfg.primary}11;border:1px solid ${cfg.primary}33;padding:1.5rem 2rem;margin:0 2rem 2rem;border-radius:${R};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.promo-banner p{font-weight:600;color:${cfg.primary}}
.promo-banner small{color:${cfg.text}77;font-size:0.82rem}
${cfg.showFooter?`footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:32px;border-radius:6px" alt="logo"/>`:'🛍'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#">신상품</a></li><li><a href="#">세일</a></li><li><a href="#">브랜드</a></li><li><a href="#">고객센터</a></li></ul>
  <div class="nav-right">
    <button class="cart-nav-btn" onclick="document.getElementById('cart-sidebar').style.right='0';document.getElementById('cart-overlay').style.display='block'">
      🛒 장바구니 <span class="cart-nav-badge" id="cart-badge">0</span>
    </button>
    <div class="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></div>
  </div>
  <div id="mobile-menu" class="mobile-menu"><a href="#" style="color:${cfg.text};text-decoration:none;padding:0.5rem">신상품</a><a href="#" style="color:${cfg.text};text-decoration:none;padding:0.5rem">세일</a></div>
</nav>`:''}
<section class="banner">
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <div class="banner-btns fade-in"><a class="btn" href="#products">쇼핑 시작하기</a><a class="btn-outline" href="#">세일 상품</a></div>
</section>
<div class="filter-bar">
  <button class="filter-btn active" onclick="filterProducts(this,'all')">전체</button>
  <button class="filter-btn" onclick="filterProducts(this,'신발')">신발</button>
  <button class="filter-btn" onclick="filterProducts(this,'의류')">의류</button>
  <button class="filter-btn" onclick="filterProducts(this,'가방')">가방</button>
  <button class="filter-btn" onclick="filterProducts(this,'액세서리')">액세서리</button>
</div>
<div class="promo-banner">
  <div><p>🎁 3만원 이상 구매 시 무료배송</p><small>오늘만! 추가 10% 할인 쿠폰 적용 가능</small></div>
  <button onclick="openModal('coupon-modal')" style="background:${cfg.primary};color:#fff;border:none;padding:0.5rem 1.2rem;border-radius:${R};cursor:pointer;font-weight:600">쿠폰 받기</button>
</div>
<section class="products" id="products">
  <h2 class="fade-in">인기 상품</h2>
  <div class="product-grid">
    ${products.map(p=>`<div class="product-card fade-in" data-cat="${p.cat}">
      <div class="product-img">${p.e}${p.old?`<span class="badge">SALE</span>`:''}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price-row"><span class="price">${p.price.toLocaleString()}원</span>${p.old?`<span class="old-price">${p.old.toLocaleString()}원</span>`:''}</div>
        <button class="add-btn" onclick="addToCart('${p.name}',${p.price},'${p.e}')">장바구니 담기</button>
      </div>
    </div>`).join('')}
  </div>
</section>

<!-- 장바구니 -->
<div id="cart-sidebar" style="position:fixed;top:0;right:-420px;width:380px;height:100vh;background:#fff;box-shadow:-4px 0 24px #0003;z-index:1000;transition:right 0.3s;display:flex;flex-direction:column">
  <div style="padding:1.5rem;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center">
    <h3 style="font-size:1.1rem">🛒 장바구니</h3>
    <button onclick="document.getElementById('cart-sidebar').style.right='-420px';document.getElementById('cart-overlay').style.display='none'" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:#999">×</button>
  </div>
  <div id="cart-list" style="flex:1;overflow-y:auto;padding:1rem 1.5rem"><p style="color:#aaa;text-align:center;padding:2rem">장바구니가 비어있어요</p></div>
  <div style="padding:1.5rem;border-top:1px solid #eee">
    <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:1rem;font-size:1.05rem"><span>합계</span><span id="cart-total" style="color:${cfg.primary}">0원</span></div>
    <button onclick="alert('결제 페이지로 이동합니다!')" style="width:100%;background:${cfg.primary};color:#fff;border:none;padding:1rem;border-radius:${R};font-size:1rem;cursor:pointer;font-weight:700">결제하기</button>
  </div>
</div>
<div id="cart-overlay" onclick="document.getElementById('cart-sidebar').style.right='-420px';this.style.display='none'" style="display:none;position:fixed;inset:0;background:#0005;z-index:999"></div>

<!-- 쿠폰 모달 -->
<div id="coupon-modal" class="modal">
  <div class="modal-box" style="text-align:center">
    <button class="modal-close" onclick="closeModal('coupon-modal')">×</button>
    <div style="font-size:3rem;margin-bottom:1rem">🎁</div>
    <h2 style="color:${cfg.primary};margin-bottom:0.5rem">신규 회원 쿠폰</h2>
    <p style="color:#888;margin-bottom:1.5rem">이메일을 입력하시면 10% 할인 쿠폰을 드려요!</p>
    <form id="coupon-form" onsubmit="event.preventDefault();submitForm('coupon-form')">
      <div class="form-group"><label>이메일 *</label><input type="email" required placeholder="example@email.com"/></div>
      <button type="submit" class="form-submit" style="background:${cfg.primary}">쿠폰 받기</button>
    </form>
  </div>
</div>

${CONTACT_MODAL(cfg.primary)}
${SHARED_JS}
<script>
function filterProducts(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}
</script>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} | 고객센터: 1234-5678 | 이메일: help@shop.com</p></footer>`:''}
</body></html>`
}
