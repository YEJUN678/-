import { SHARED_JS, CONTACT_MODAL } from '../shared'

export const tech = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '8px'

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${cfg.title}</title>
<link href="https://fonts.googleapis.com/css2?family=${cfg.font.replace(/ /g,'+')}:wght@400;700&display=swap" rel="stylesheet"/>
<style>
:root{--primary:${cfg.primary}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${cfg.font}',sans-serif;background:#050510;color:#e0e0f0}
${cfg.showNav?`nav{padding:1.5rem 4rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ffffff10;position:sticky;top:0;background:#050510ee;backdrop-filter:blur(10px);z-index:100}
nav .logo{font-size:1.3rem;font-weight:700;color:${cfg.primary};letter-spacing:0.05em;display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul li a{color:#aaa;text-decoration:none;font-size:0.88rem}
nav ul li a:hover{color:#fff}
.nav-cta{background:${cfg.primary};color:#fff;border:none;padding:0.5rem 1.3rem;border-radius:${R};cursor:pointer;font-weight:600;font-size:0.88rem}`:''}
.hero{padding:8rem 4rem 6rem;text-align:center;position:relative;overflow:hidden;${cfg.heroImage?`background-image:linear-gradient(rgba(5,5,16,0.85),rgba(5,5,16,0.9)),url('${cfg.heroImage}');background-size:cover;background-position:center`:''}}
.hero::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:${cfg.primary};opacity:0.05;filter:blur(100px);pointer-events:none}
.hero-badge{display:inline-block;border:1px solid ${cfg.primary}66;color:${cfg.primary};padding:0.3rem 1rem;border-radius:99px;font-size:0.82rem;margin-bottom:2rem;letter-spacing:0.1em}
.hero h1{font-size:4rem;font-weight:700;line-height:1.15;margin-bottom:1.5rem;background:linear-gradient(135deg,#fff 30%,${cfg.primary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{color:#888;font-size:1.1rem;max-width:600px;margin:0 auto 3rem;line-height:1.7}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-main{background:${cfg.primary};color:#fff;padding:1rem 2.5rem;border-radius:${R};border:none;cursor:pointer;font-weight:600;font-size:0.95rem}
.btn-ghost{border:1px solid #ffffff33;color:#fff;padding:1rem 2.5rem;border-radius:${R};background:transparent;cursor:pointer;font-size:0.95rem}
.hero-demo{margin:4rem auto 0;max-width:800px;background:#0a0a1a;border:1px solid #ffffff10;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px #00000088}
.demo-bar{background:#111;padding:0.8rem 1rem;display:flex;gap:0.4rem;align-items:center}
.demo-dot{width:12px;height:12px;border-radius:50%}
.demo-content{padding:2rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.demo-block{background:#111;border-radius:8px;padding:1rem;border:1px solid #ffffff08}
.demo-block h4{color:${cfg.primary};font-size:0.78rem;margin-bottom:0.5rem;letter-spacing:0.1em}
.demo-bar-chart{display:flex;flex-direction:column;gap:0.5rem}
.bar-item{display:flex;align-items:center;gap:0.5rem;font-size:0.75rem;color:#666}
.bar{height:6px;border-radius:99px;background:${cfg.primary}}
.features{padding:6rem 4rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:1100px;margin:0 auto}
.feat{border:1px solid #ffffff08;border-radius:16px;padding:2rem;background:#0a0a1a;position:relative;overflow:hidden;transition:border-color 0.2s,transform 0.2s;cursor:default}
.feat:hover{border-color:${cfg.primary}66;transform:translateY(-4px)}
.feat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${cfg.primary},transparent)}
.feat-icon{font-size:2rem;margin-bottom:1rem}
.feat h3{font-size:1rem;font-weight:700;margin-bottom:0.5rem;color:${cfg.primary}}
.feat p{color:#666;font-size:0.85rem;line-height:1.65}
.pricing{padding:6rem 4rem;background:#030308;text-align:center}
.pricing h2{font-size:2.5rem;font-weight:700;margin-bottom:0.5rem;background:linear-gradient(135deg,#fff,${cfg.primary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.pricing .sub{color:#666;margin-bottom:3rem}
.price-toggle{display:flex;align-items:center;gap:1rem;justify-content:center;margin-bottom:2.5rem}
.toggle-label{color:#888;font-size:0.88rem}
.toggle{width:44px;height:24px;background:${cfg.primary};border-radius:99px;cursor:pointer;position:relative;border:none}
.toggle::before{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform 0.2s}
.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:900px;margin:0 auto}
.price-card{border:1px solid #ffffff10;border-radius:16px;padding:2rem;background:#0a0a1a;text-align:left}
.price-card.featured{border-color:${cfg.primary}66;background:${cfg.primary}0d;position:relative}
.price-card.featured::before{content:'POPULAR';position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:${cfg.primary};color:#fff;font-size:0.7rem;padding:0.2rem 0.8rem;border-radius:0 0 8px 8px;letter-spacing:0.1em;font-weight:700}
.price-card h3{font-size:0.82rem;color:#888;letter-spacing:0.1em;margin-bottom:1rem}
.price-amount{font-size:2.5rem;font-weight:700;color:#fff;margin-bottom:1.5rem}
.price-amount span{font-size:1rem;color:#666;font-weight:400}
.price-card ul{list-style:none;margin-bottom:1.5rem;color:#666;font-size:0.85rem}
.price-card ul li{padding:0.4rem 0;border-bottom:1px solid #ffffff08;display:flex;align-items:center;gap:0.5rem}
.price-card ul li::before{content:'✓';color:${cfg.primary};font-weight:700}
.choose-btn{width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.9rem;border-radius:${R};cursor:pointer;font-weight:700;font-size:0.95rem}
.testimonials{padding:6rem 4rem;text-align:center}
.testimonials h2{font-size:2.2rem;font-weight:700;margin-bottom:3rem}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;max-width:1000px;margin:0 auto}
.testi{border:1px solid #ffffff08;border-radius:12px;padding:1.5rem;background:#0a0a1a;text-align:left;transition:border-color 0.2s}
.testi:hover{border-color:${cfg.primary}44}
.stars{color:#f1c40f;margin-bottom:0.8rem;font-size:0.9rem}
.testi p{color:#aaa;font-size:0.88rem;line-height:1.7;margin-bottom:1.2rem}
.testi-author{display:flex;align-items:center;gap:0.8rem}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:${cfg.primary}44;display:flex;align-items:center;justify-content:center;font-size:1.2rem;overflow:hidden}
.testi-avatar img{width:100%;height:100%;object-fit:cover}
.testi-name{font-weight:600;font-size:0.9rem}
.testi-role{color:#555;font-size:0.78rem}
.cta-section{padding:6rem 4rem;text-align:center;position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,${cfg.primary}12,transparent 70%);pointer-events:none}
.cta-section h2{font-size:3rem;font-weight:700;margin-bottom:1rem}
.cta-section p{color:#888;margin-bottom:2.5rem;font-size:1.05rem}
.cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
${cfg.showFooter?`footer{border-top:1px solid #ffffff08;padding:2rem 4rem;display:flex;justify-content:space-between;align-items:center;color:#444;font-size:0.82rem;flex-wrap:wrap;gap:1rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:28px;border-radius:6px" alt="logo"/>`:'⚡'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#features">기능</a></li><li><a href="#pricing">가격</a></li><li><a href="#">문서</a></li><li><a href="#">블로그</a></li></ul>
  <button class="nav-cta" onclick="openModal('contact-modal')">무료 시작</button>
</nav>`:''}
<section class="hero">
  <div class="hero-badge fade-in">🚀 새 버전 출시</div>
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <div class="hero-btns fade-in">
    <button class="btn-main" onclick="openModal('contact-modal')">무료로 시작하기</button>
    <button class="btn-ghost" onclick="document.getElementById('demo-section').scrollIntoView({behavior:'smooth'})">데모 보기</button>
  </div>
  <div class="hero-demo fade-in" id="demo-section">
    <div class="demo-bar">
      <div class="demo-dot" style="background:#ff5f57"></div>
      <div class="demo-dot" style="background:#ffbd2e"></div>
      <div class="demo-dot" style="background:#28c840"></div>
      <span style="color:#444;font-size:0.78rem;margin-left:0.5rem">${cfg.title} Dashboard</span>
    </div>
    <div class="demo-content">
      <div class="demo-block"><h4>📈 GROWTH</h4><div class="demo-bar-chart">
        <div class="bar-item"><span style="width:40px">1월</span><div class="bar" style="width:60%"></div><span>60%</span></div>
        <div class="bar-item"><span style="width:40px">2월</span><div class="bar" style="width:78%"></div><span>78%</span></div>
        <div class="bar-item"><span style="width:40px">3월</span><div class="bar" style="width:92%"></div><span>92%</span></div>
      </div></div>
      <div class="demo-block"><h4>⚡ METRICS</h4>
        ${[['응답속도','12ms'],['업타임','99.9%'],['사용자','12,400']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid #ffffff08;font-size:0.8rem"><span style="color:#666">${k}</span><span style="color:${cfg.primary};font-weight:700">${v}</span></div>`).join('')}
      </div>
    </div>
  </div>
</section>
<div class="features" id="features">
  ${[['⚡','초고속 성능','업계 최고 수준의 응답 속도와 안정성을 제공합니다'],['🛡','엔터프라이즈 보안','SOC2 인증, AES-256 암호화로 데이터를 보호합니다'],['🔌','원클릭 연동','Slack, Notion, Jira 등 200+ 앱과 즉시 연동됩니다'],['📊','실시간 분석','모든 지표를 실시간으로 추적하고 인사이트를 얻으세요'],['🤖','AI 자동화','반복 작업을 AI가 자동 처리, 생산성 10배 향상'],['🌐','글로벌 인프라','전 세계 15개 리전 CDN으로 어디서든 빠릅니다']].map(([e,t,d])=>`<div class="feat fade-in"><div class="feat-icon">${e}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div>
<section class="pricing" id="pricing">
  <h2 class="fade-in">투명한 요금제</h2>
  <p class="sub fade-in">숨겨진 비용 없이 필요한 만큼만</p>
  <div class="price-grid">
    <div class="price-card fade-in"><h3>STARTER</h3><div class="price-amount">무료<span>/월</span></div><ul><li>프로젝트 3개</li><li>팀원 5명</li><li>기본 분석</li><li>이메일 지원</li></ul><button class="choose-btn" onclick="openModal('contact-modal')">시작하기</button></div>
    <div class="price-card featured fade-in"><h3>PRO</h3><div class="price-amount">49,000<span>원/월</span></div><ul><li>무제한 프로젝트</li><li>팀원 20명</li><li>AI 기능 포함</li><li>우선 지원</li><li>고급 분석</li></ul><button class="choose-btn" onclick="openModal('contact-modal')">시작하기</button></div>
    <div class="price-card fade-in"><h3>ENTERPRISE</h3><div class="price-amount">문의<span></span></div><ul><li>무제한 전 기능</li><li>전용 인프라</li><li>SLA 보장</li><li>전담 매니저</li></ul><button class="choose-btn" onclick="openModal('contact-modal')">문의하기</button></div>
  </div>
</section>
<section class="testimonials">
  <h2 class="fade-in">고객들의 이야기</h2>
  <div class="testi-grid">
    ${[
      {e:'👨‍💼',n:'김대표',r:'ABC 테크 CEO',t:'"도입 후 팀 생산성이 3배 향상됐습니다. 이제 이것 없이는 일 못해요."',img:cfg.galleryImages[0]||''},
      {e:'👩‍💻',n:'이개발',r:'XYZ 스타트업 CTO',t:'"온보딩이 너무 쉬웠어요. 10분 설정으로 바로 쓸 수 있었습니다."',img:cfg.galleryImages[1]||''},
      {e:'👨‍📊',n:'박마케터',r:'커머스 마케팅 팀장',t:'"고객 지원이 정말 빠르고 친절해요. 문제가 생겨도 걱정이 없어요."',img:''},
    ].map(t=>`<div class="testi fade-in"><div class="stars">⭐⭐⭐⭐⭐</div><p>${t.t}</p><div class="testi-author"><div class="testi-avatar">${t.img?`<img src="${t.img}" alt=""/>`:`${t.e}`}</div><div><div class="testi-name">${t.n}</div><div class="testi-role">${t.r}</div></div></div></div>`).join('')}
  </div>
</section>
<section class="cta-section">
  <h2 class="fade-in">${cfg.title}를 지금 시작하세요</h2>
  <p class="fade-in">14일 무료 체험 · 신용카드 불필요 · 언제든지 취소</p>
  <div class="cta-btns fade-in">
    <button class="btn-main" onclick="openModal('contact-modal')">무료로 시작하기</button>
    <button class="btn-ghost" onclick="openModal('contact-modal')">데모 신청</button>
  </div>
</section>
${cfg.showFooter?`<footer><span>© 2025 ${cfg.title}</span><span style="display:flex;gap:1.5rem"><a href="#" style="color:#444;text-decoration:none">개인정보처리방침</a><a href="#" style="color:#444;text-decoration:none">이용약관</a><a href="#" style="color:#444;text-decoration:none">고객센터</a></span></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${SHARED_JS}
</body></html>`
}
