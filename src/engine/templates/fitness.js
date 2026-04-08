import { SHARED_JS, CONTACT_MODAL, RESERVATION_MODAL } from '../shared'

export const fitness = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '8px'

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${cfg.title}</title>
<link href="https://fonts.googleapis.com/css2?family=${cfg.font.replace(/ /g,'+')}:wght@400;700;900&display=swap" rel="stylesheet"/>
<style>
:root{--primary:${cfg.primary}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${cfg.font}',sans-serif;background:#0a0a0a;color:#fff}
${cfg.showNav?`nav{background:#000;padding:1.2rem 3rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100;border-bottom:1px solid #ffffff10}
nav .logo{color:${cfg.primary};font-size:1.5rem;font-weight:900;letter-spacing:0.05em;display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:#aaa;text-decoration:none;font-size:0.88rem;letter-spacing:0.05em}
nav ul li a:hover{color:#fff}`:''}
.hero{background:#000;padding:6rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;${cfg.heroImage?`background-image:linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url('${cfg.heroImage}');background-size:cover;background-position:center`:''}}
.hero h1{font-size:4rem;font-weight:900;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:${cfg.primary}}
.hero p{color:#999;font-size:1.05rem;line-height:1.7;margin-bottom:2rem}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap}
.btn{background:${cfg.primary};color:#fff;padding:1rem 2.2rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:700;letter-spacing:0.03em}
.btn-ghost{border:1px solid #ffffff44;color:#fff;padding:1rem 2.2rem;border-radius:${R};background:transparent;cursor:pointer;font-size:1rem}
.hero-visual{background:linear-gradient(135deg,${cfg.primary}22,${cfg.primary}44);border-radius:16px;height:400px;display:flex;align-items:center;justify-content:center;font-size:8rem;${cfg.galleryImages[0]?`background-image:url('${cfg.galleryImages[0]}');background-size:cover;background-position:center`:''}}
.stats{display:grid;grid-template-columns:repeat(4,1fr);background:${cfg.primary};padding:2rem;text-align:center}
.stat h3{font-size:2.5rem;font-weight:900}
.stat p{opacity:0.8;font-size:0.82rem;letter-spacing:0.08em}
.programs{padding:5rem 3rem;text-align:center}
.programs h2{font-size:2.5rem;font-weight:900;margin-bottom:0.5rem}
.programs .sub{color:#777;margin-bottom:3rem}
.prog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.prog-card{border:1px solid #ffffff10;border-radius:12px;padding:2rem;text-align:left;background:#0f0f0f;transition:border-color 0.2s,transform 0.2s;cursor:pointer}
.prog-card:hover{border-color:${cfg.primary};transform:translateY(-4px)}
.prog-badge{background:${cfg.primary};color:#fff;font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:99px;display:inline-block;margin-bottom:0.8rem}
.prog-icon{font-size:2.5rem;margin-bottom:0.8rem}
.prog-card h3{font-size:1.05rem;font-weight:700;margin-bottom:0.4rem}
.prog-card p{color:#777;font-size:0.85rem;line-height:1.55}
.prog-card .prog-btn{margin-top:1rem;background:transparent;border:1px solid ${cfg.primary};color:${cfg.primary};padding:0.5rem 1rem;border-radius:${R};cursor:pointer;font-size:0.82rem;font-weight:600;width:100%}
.prog-card:hover .prog-btn{background:${cfg.primary};color:#fff}
.pricing{padding:5rem 3rem;background:#050505;text-align:center}
.pricing h2{font-size:2.5rem;font-weight:900;margin-bottom:3rem}
.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:900px;margin:0 auto}
.price-card{border:1px solid #222;border-radius:12px;padding:2rem;text-align:left}
.price-card.featured{border-color:${cfg.primary};background:${cfg.primary}0d;position:relative}
.price-card.featured::before{content:'BEST';position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:${cfg.primary};color:#fff;font-size:0.7rem;padding:0.2rem 0.8rem;border-radius:0 0 8px 8px;font-weight:700;letter-spacing:0.1em}
.price-card h3{font-size:0.85rem;color:#888;letter-spacing:0.1em;margin-bottom:1rem}
.price-amount{font-size:2.5rem;font-weight:900;color:#fff;margin-bottom:1.5rem}
.price-amount span{font-size:1rem;color:#888}
.price-card ul{list-style:none;color:#777;font-size:0.85rem;margin-bottom:1.5rem}
.price-card ul li{padding:0.4rem 0;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:0.5rem}
.price-card ul li::before{content:'✓';color:${cfg.primary};font-weight:700}
.price-card .choose-btn{width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.9rem;border-radius:${R};cursor:pointer;font-weight:700;font-size:0.95rem}
${cfg.showFooter?`footer{background:#000;color:#444;text-align:center;padding:2rem;font-size:0.82rem;border-top:1px solid #111}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:32px;border-radius:6px" alt="logo"/>`:'💪'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#programs">프로그램</a></li><li><a href="#pricing">요금</a></li><li><a href="#">트레이너</a></li></ul>
  <button class="btn" onclick="openModal('reservation-modal')" style="font-size:0.88rem;padding:0.5rem 1.2rem">무료 체험</button>
</nav>`:''}
<section class="hero">
  <div>
    <h1 class="fade-in">당신의 한계를<br/><span>뛰어넘어라</span></h1>
    <p class="fade-in">${cfg.slogan}</p>
    <div class="hero-btns fade-in">
      <button class="btn" onclick="openModal('reservation-modal')">무료 체험 신청</button>
      <button class="btn-ghost" onclick="openModal('contact-modal')">문의하기</button>
    </div>
  </div>
  <div class="hero-visual fade-in">${cfg.galleryImages[0]?'':'🏋️'}</div>
</section>
<div class="stats">
  <div class="stat"><h3>1,200+</h3><p>MEMBERS</p></div>
  <div class="stat"><h3>15+</h3><p>TRAINERS</p></div>
  <div class="stat"><h3>50+</h3><p>PROGRAMS</p></div>
  <div class="stat"><h3>5★</h3><p>RATING</p></div>
</div>
<section class="programs" id="programs">
  <h2 class="fade-in">프로그램</h2>
  <p class="sub fade-in">목표에 맞는 맞춤 운동</p>
  <div class="prog-grid">
    ${[['인기','🏃','웨이트 트레이닝','체계적인 근력 운동으로 탄탄한 몸매 만들기'],['NEW','🧘','필라테스','코어 강화와 유연성 향상을 위한 전문 클래스'],['','🥊','복싱','전신 유산소 운동으로 체력과 스트레스 해소'],['','🚴','스피닝','에너지 넘치는 그룹 사이클링 클래스'],['','🏊','수영','전 연령대를 위한 수영 클래스'],['HOT','🤸','크로스핏','고강도 인터벌 트레이닝']].map(([b,e,t,d])=>`<div class="prog-card fade-in">${b?`<span class="prog-badge">${b}</span>`:''}<div class="prog-icon">${e}</div><h3>${t}</h3><p>${d}</p><button class="prog-btn" onclick="openModal('reservation-modal')">체험 신청</button></div>`).join('')}
  </div>
</section>
<section class="pricing" id="pricing">
  <h2 class="fade-in">멤버십</h2>
  <div class="price-grid">
    <div class="price-card fade-in"><h3>BASIC</h3><div class="price-amount">49,000<span>원/월</span></div><ul><li>헬스장 이용</li><li>락커 이용</li><li>샤워실 이용</li></ul><button class="choose-btn" onclick="openModal('reservation-modal')">선택하기</button></div>
    <div class="price-card featured fade-in"><h3>PREMIUM</h3><div class="price-amount">89,000<span>원/월</span></div><ul><li>헬스장 이용</li><li>그룹 클래스 무제한</li><li>PT 2회/월</li><li>영양 상담</li></ul><button class="choose-btn" onclick="openModal('reservation-modal')">선택하기</button></div>
    <div class="price-card fade-in"><h3>PT PACKAGE</h3><div class="price-amount">150,000<span>원/월</span></div><ul><li>1:1 PT 12회</li><li>식단 관리</li><li>모든 시설 이용</li></ul><button class="choose-btn" onclick="openModal('reservation-modal')">선택하기</button></div>
  </div>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} | 📞 02-9876-5432 | 영업: 06:00–24:00</p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${RESERVATION_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
