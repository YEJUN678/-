import { SHARED_JS, CONTACT_MODAL } from '../shared'

export const portfolio = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '12px'
  const heroStyle = cfg.heroImage
    ? `background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.5)),url('${cfg.heroImage}') center/cover`
    : `background:${cfg.bg}`

  const galleryHtml = cfg.galleryImages.length > 0
    ? cfg.galleryImages.map((src,i) => `<div class="work-card fade-in" onclick="openLightbox('${src}')" style="cursor:zoom-in"><img src="${src}" style="width:100%;height:200px;object-fit:cover"/><div class="work-info"><h3>프로젝트 ${i+1}</h3><p>클릭하여 크게 보기</p></div></div>`).join('')
    : [['🌐','웹 앱','React · TypeScript'],['📱','모바일 앱','React Native'],['🎨','UI/UX 디자인','Figma'],['🛠','백엔드','Node.js · DB'],['📊','데이터 분석','Python'],['🚀','DevOps','AWS · Docker']].map(([e,t,s])=>`<div class="work-card fade-in"><div class="work-thumb">${e}</div><div class="work-info"><h3>${t}</h3><p>${s}</p></div></div>`).join('')

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
${cfg.showNav?`nav{padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid ${cfg.primary}22;position:sticky;top:0;background:${cfg.bg};z-index:100}
nav .logo{font-size:1.2rem;font-weight:700;color:${cfg.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:${cfg.text};text-decoration:none;font-size:0.9rem}
nav ul li a:hover{color:${cfg.primary}}
.hire-btn{background:${cfg.primary};color:#fff;border:none;padding:0.5rem 1.3rem;border-radius:${R};cursor:pointer;font-weight:600;font-size:0.9rem}`:''}
.hero{min-height:90vh;display:flex;align-items:center;padding:0 3rem;${heroStyle};${cfg.heroImage?'color:#fff':''}}
.hero-content{max-width:650px}
.hero-tag{color:${cfg.heroImage?'#fff':cfg.primary};font-size:0.85rem;letter-spacing:0.15em;margin-bottom:1.2rem;opacity:0.8}
.hero h1{font-size:3.8rem;font-weight:700;line-height:1.15;margin-bottom:1.5rem}
.hero h1 span{color:${cfg.primary}}
.hero p{opacity:0.75;font-size:1.1rem;line-height:1.75;margin-bottom:2.5rem}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap}
.btn{background:${cfg.primary};color:#fff;padding:0.9rem 2rem;border-radius:${R};border:none;font-size:0.95rem;cursor:pointer;font-weight:600;text-decoration:none;display:inline-block}
.btn-ghost{border:2px solid ${cfg.heroImage?'#fff':cfg.primary};color:${cfg.heroImage?'#fff':cfg.primary};padding:0.9rem 2rem;border-radius:${R};text-decoration:none;font-size:0.95rem;font-weight:600;display:inline-block}
.skills-bar{padding:2rem 3rem;background:${cfg.primary};display:flex;gap:1.5rem;flex-wrap:wrap;align-items:center}
.skill-chip{background:#ffffff22;color:#fff;padding:0.4rem 1rem;border-radius:99px;font-size:0.85rem;font-weight:600}
.works{padding:5rem 3rem;text-align:center}
.works h2{font-size:2.2rem;font-weight:700;margin-bottom:0.5rem}
.works .sub{color:${cfg.text}77;margin-bottom:3rem}
.works-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.work-card{border-radius:${R};overflow:hidden;box-shadow:0 4px 20px #0002;transition:transform 0.2s;background:#fff}
.work-card:hover{transform:translateY(-6px)}
.work-thumb{height:180px;background:linear-gradient(135deg,${cfg.primary}44,${cfg.primary}88);display:flex;align-items:center;justify-content:center;font-size:3.5rem}
.work-info{padding:1.2rem;text-align:left}
.work-info h3{font-weight:700;margin-bottom:0.3rem}
.work-info p{color:${cfg.text}77;font-size:0.85rem}
.about{padding:5rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;background:${cfg.primary}08}
.about-img{border-radius:16px;background:linear-gradient(135deg,${cfg.primary}33,${cfg.primary}66);height:360px;display:flex;align-items:center;justify-content:center;font-size:8rem}
.about-text h2{font-size:2rem;font-weight:700;margin-bottom:1.5rem}
.about-text p{color:${cfg.text}88;line-height:1.8;margin-bottom:2rem}
.stat-row{display:flex;gap:2rem;margin-bottom:2rem}
.stat h3{font-size:2rem;font-weight:700;color:${cfg.primary}}
.stat p{font-size:0.85rem;color:${cfg.text}77}
${cfg.showFooter?`footer{padding:2rem 3rem;text-align:center;border-top:1px solid ${cfg.primary}22;color:${cfg.text}55;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:32px;border-radius:6px;margin-right:0.5rem" alt="logo"/>`:''}${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#works">작업물</a></li><li><a href="#about">소개</a></li><li><a href="#contact">연락처</a></li></ul>
  <button class="hire-btn" onclick="openModal('contact-modal')">고용하기</button>
</nav>`:''}
<section class="hero">
  <div class="hero-content">
    <div class="hero-tag">✦ PORTFOLIO</div>
    <h1>${cfg.title}<br/><span>입니다</span></h1>
    <p>${cfg.slogan}</p>
    <div class="hero-btns">
      <button class="btn" onclick="openModal('contact-modal')">프로젝트 문의</button>
      <a class="btn-ghost" href="#works">작업물 보기</a>
    </div>
  </div>
</section>
<div class="skills-bar">
  ${['React','TypeScript','Node.js','Python','Figma','AWS','Docker','Git'].map(s=>`<span class="skill-chip">${s}</span>`).join('')}
</div>
<section class="works" id="works">
  <h2 class="fade-in">프로젝트</h2>
  <p class="sub fade-in">최근 작업한 프로젝트들입니다</p>
  <div class="works-grid">${galleryHtml}</div>
</section>
<section class="about" id="about">
  <div class="about-img fade-in">${cfg.logoImage?`<img src="${cfg.logoImage}" style="max-height:200px;border-radius:50%;object-fit:cover"/>`:'👨‍💻'}</div>
  <div class="about-text fade-in">
    <h2>안녕하세요,<br/>${cfg.title}입니다</h2>
    <div class="stat-row"><div class="stat"><h3>5+</h3><p>년 경력</p></div><div class="stat"><h3>50+</h3><p>프로젝트</p></div><div class="stat"><h3>30+</h3><p>클라이언트</p></div></div>
    <p>${cfg.slogan}</p>
    <button class="btn" onclick="openModal('contact-modal')" id="contact">연락하기</button>
  </div>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} · Made with 💙 · <a href="#" onclick="openModal('contact-modal')" style="color:${cfg.primary}">연락하기</a></p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
