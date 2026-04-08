import { SHARED_JS, CONTACT_MODAL } from '../shared'

export const company = (cfg) => {
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
${cfg.showNav?`nav{background:${cfg.primary};padding:1.2rem 3rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}
nav .logo{color:#fff;font-size:1.3rem;font-weight:700;display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:#ffffff99;text-decoration:none;font-size:0.88rem;transition:color 0.2s}
nav ul li a:hover{color:#fff}
.contact-nav-btn{background:#fff;color:${cfg.primary};border:none;padding:0.45rem 1.2rem;border-radius:${R};cursor:pointer;font-weight:700;font-size:0.88rem}`:''}
.hero{${cfg.heroImage?`background:linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.45)),url('${cfg.heroImage}') center/cover;color:#fff`:`background:linear-gradient(135deg,${cfg.primary}ee,${cfg.primary}99);color:#fff`};text-align:center;padding:7rem 2rem}
.hero h1{font-size:3.2rem;font-weight:700;margin-bottom:1rem}
.hero p{font-size:1.15rem;opacity:0.85;margin-bottom:2.5rem;max-width:600px;margin-left:auto;margin-right:auto}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:#fff;color:${cfg.primary};padding:0.9rem 2.2rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:700;text-decoration:none;display:inline-block}
.btn-outline{border:2px solid #fff;color:#fff;padding:0.9rem 2.2rem;border-radius:${R};text-decoration:none;font-size:1rem;font-weight:600;display:inline-block}
.stats{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-bottom:1px solid #eee;text-align:center}
.stat-item{padding:2.5rem 1rem;border-right:1px solid #eee}
.stat-item:last-child{border:none}
.stat-item h3{font-size:2.5rem;font-weight:700;color:${cfg.primary}}
.stat-item p{color:${cfg.text}77;font-size:0.85rem;margin-top:0.2rem}
.services{padding:5rem 3rem;text-align:center}
.services h2{font-size:2.2rem;font-weight:700;margin-bottom:0.5rem}
.services .sub{color:${cfg.text}77;margin-bottom:3rem}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.svc-card{background:#fff;border-radius:${R};padding:2rem;box-shadow:0 4px 20px #0001;border-top:4px solid ${cfg.primary};text-align:left;transition:transform 0.2s}
.svc-card:hover{transform:translateY(-4px)}
.svc-icon{font-size:2.5rem;margin-bottom:1rem}
.svc-card h3{font-size:1.05rem;font-weight:700;color:${cfg.primary};margin-bottom:0.5rem}
.svc-card p{color:${cfg.text}77;font-size:0.88rem;line-height:1.65;margin-bottom:1rem}
.svc-more{color:${cfg.primary};font-size:0.85rem;font-weight:600;cursor:pointer;border:none;background:none;font-family:inherit}
.process{padding:5rem 3rem;background:${cfg.primary}06}
.process h2{font-size:2.2rem;font-weight:700;text-align:center;margin-bottom:3rem}
.process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;max-width:1000px;margin:0 auto;position:relative}
.process-steps::before{content:'';position:absolute;top:3rem;left:10%;right:10%;height:2px;background:${cfg.primary}33;z-index:0}
.step{text-align:center;position:relative;z-index:1}
.step-num{width:60px;height:60px;border-radius:50%;background:${cfg.primary};color:#fff;font-size:1.4rem;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}
.step h3{font-size:0.95rem;font-weight:700;margin-bottom:0.4rem}
.step p{font-size:0.82rem;color:${cfg.text}77}
.team{padding:5rem 3rem;text-align:center}
.team h2{font-size:2.2rem;font-weight:700;margin-bottom:3rem}
.team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;max-width:900px;margin:0 auto}
.member{background:#fff;border-radius:${R};padding:2rem;box-shadow:0 2px 12px #0001;text-align:center}
.member-avatar{width:80px;height:80px;border-radius:50%;background:${cfg.primary}22;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:2.2rem;border:3px solid ${cfg.primary}33}
.member h3{font-weight:700;margin-bottom:0.2rem}
.member .role{color:${cfg.primary};font-size:0.82rem;font-weight:600}
.member .desc{color:${cfg.text}77;font-size:0.82rem;margin-top:0.4rem}
.cta-section{background:${cfg.primary};color:#fff;text-align:center;padding:5rem 2rem}
.cta-section h2{font-size:2.2rem;margin-bottom:1rem}
.cta-section p{opacity:0.85;margin-bottom:2.5rem;max-width:500px;margin-left:auto;margin-right:auto}
.cta-btn{background:#fff;color:${cfg.primary};padding:1rem 3rem;border-radius:${R};border:none;font-size:1rem;cursor:pointer;font-weight:700}
${cfg.showFooter?`footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:30px;border-radius:6px" alt="logo"/>`:'🏢'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#">회사소개</a></li><li><a href="#">서비스</a></li><li><a href="#">실적</a></li><li><a href="#">채용</a></li></ul>
  <button class="contact-nav-btn" onclick="openModal('contact-modal')">문의하기</button>
</nav>`:''}
<section class="hero">
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <div class="hero-btns fade-in"><button class="btn" onclick="openModal('contact-modal')">무료 상담 신청</button><a class="btn-outline" href="#services">서비스 보기</a></div>
</section>
<div class="stats">
  <div class="stat-item fade-in"><h3>10+</h3><p>년 업력</p></div>
  <div class="stat-item fade-in"><h3>500+</h3><p>고객사</p></div>
  <div class="stat-item fade-in"><h3>98%</h3><p>만족도</p></div>
  <div class="stat-item fade-in"><h3>50+</h3><p>전문 인력</p></div>
</div>
<section class="services" id="services">
  <h2 class="fade-in">핵심 서비스</h2>
  <p class="sub fade-in">전문적인 서비스로 비즈니스 성장을 도와드립니다</p>
  <div class="svc-grid">
    ${[['💡','IT 컨설팅','비즈니스 디지털 전환을 위한 전략 수립 및 실행'],['🚀','솔루션 개발','최신 기술 기반 맞춤형 웹/앱 개발'],['📊','데이터 분석','데이터 기반 의사결정 지원 및 분석'],['🛡','보안 진단','기업 IT 인프라 보안 점검 및 솔루션'],['🌐','클라우드','AWS/GCP 기반 인프라 구축 및 운영'],['📢','디지털 마케팅','SEO, SNS, 퍼포먼스 마케팅']].map(([e,t,d])=>`<div class="svc-card fade-in"><div class="svc-icon">${e}</div><h3>${t}</h3><p>${d}</p><button class="svc-more" onclick="openModal('contact-modal')">자세히 알아보기 →</button></div>`).join('')}
  </div>
</section>
<section class="process">
  <h2 class="fade-in">진행 프로세스</h2>
  <div class="process-steps">
    ${[['1','상담','요구사항 파악 및 방향성 수립'],['2','기획','솔루션 설계 및 일정 확정'],['3','실행','전문 팀 투입 및 프로젝트 진행'],['4','완료','납품 및 사후 지원']].map(([n,t,d])=>`<div class="step fade-in"><div class="step-num">${n}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
</section>
<section class="team">
  <h2 class="fade-in">전문가 팀</h2>
  <div class="team-grid">
    ${[['👨‍💼','김대표','CEO','20년 IT 업계 경력'],['👩‍💻','이개발','CTO','전 NAVER 수석 엔지니어'],['👨‍🎨','박디자인','CDO','UX 전문가'],['👩‍📊','최마케팅','CMO','디지털 마케팅 전문가']].map(([e,n,r,d])=>`<div class="member fade-in"><div class="member-avatar">${e}</div><h3>${n}</h3><div class="role">${r}</div><div class="desc">${d}</div></div>`).join('')}
  </div>
</section>
<section class="cta-section">
  <h2 class="fade-in">함께 성장하겠습니다</h2>
  <p class="fade-in">지금 바로 문의하시고 맞춤 솔루션을 경험해 보세요</p>
  <button class="cta-btn fade-in" onclick="openModal('contact-modal')">무료 상담 신청하기</button>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} · 대표: 홍길동 · 사업자번호: 123-45-67890 · 서울 강남구</p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
