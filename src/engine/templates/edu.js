import { SHARED_JS, CONTACT_MODAL, RESERVATION_MODAL } from '../shared'

export const edu = (cfg) => {
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
${cfg.showNav?`nav{background:#fff;box-shadow:0 2px 8px #0001;padding:1rem 3rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}
nav .logo{font-size:1.3rem;font-weight:700;color:${cfg.primary};display:flex;align-items:center;gap:0.5rem}
nav ul{list-style:none;display:flex;gap:1.5rem}
nav ul li a{color:${cfg.text};text-decoration:none;font-size:0.88rem}
nav ul li a:hover{color:${cfg.primary}}
.enroll-btn{background:${cfg.primary};color:#fff;padding:0.5rem 1.2rem;border-radius:${R};border:none;cursor:pointer;font-weight:600;font-size:0.88rem}`:''}
.hero{background:linear-gradient(135deg,${cfg.primary}11,${cfg.primary}22);padding:5rem 3rem;text-align:center;${cfg.heroImage?`background-image:linear-gradient(rgba(255,255,255,0.88),rgba(255,255,255,0.8)),url('${cfg.heroImage}');background-size:cover;background-position:center`:''}}
.hero-tag{background:${cfg.primary};color:#fff;display:inline-block;padding:0.3rem 1rem;border-radius:99px;font-size:0.82rem;margin-bottom:1.5rem}
.hero h1{font-size:3rem;font-weight:700;margin-bottom:1rem;line-height:1.3}
.hero p{color:${cfg.text}88;font-size:1.05rem;margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:${cfg.primary};color:#fff;padding:0.9rem 2rem;border-radius:${R};border:none;cursor:pointer;font-weight:600;font-size:0.95rem}
.btn-outline{border:2px solid ${cfg.primary};color:${cfg.primary};padding:0.9rem 2rem;border-radius:${R};background:transparent;cursor:pointer;font-weight:600;font-size:0.95rem}
.stats{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-bottom:1px solid #eee;text-align:center}
.stat{padding:2rem 1rem}
.stat h3{font-size:2rem;font-weight:700;color:${cfg.primary}}
.stat p{font-size:0.82rem;color:${cfg.text}77}
.courses{padding:5rem 3rem;text-align:center}
.courses h2{font-size:2.2rem;font-weight:700;margin-bottom:0.5rem}
.courses .sub{color:${cfg.text}77;margin-bottom:1.5rem}
.course-cats{display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem}
.course-cat{padding:0.4rem 1rem;border-radius:99px;border:1px solid ${cfg.primary}33;cursor:pointer;font-size:0.85rem;background:#fff;color:${cfg.text};font-family:inherit}
.course-cat.active,.course-cat:hover{background:${cfg.primary};color:#fff;border-color:${cfg.primary}}
.course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.course-card{background:#fff;border-radius:${R};overflow:hidden;box-shadow:0 2px 16px #0001;text-align:left;border:1px solid #f0f0f0;transition:transform 0.2s,box-shadow 0.2s;cursor:pointer}
.course-card:hover{transform:translateY(-4px);box-shadow:0 8px 28px #0002}
.course-thumb{background:linear-gradient(135deg,${cfg.primary}33,${cfg.primary}66);height:150px;display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;overflow:hidden}
.course-thumb img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
.level-badge{position:absolute;bottom:0.5rem;right:0.5rem;background:#fff;color:${cfg.primary};font-size:0.72rem;padding:0.2rem 0.5rem;border-radius:4px;font-weight:600}
.course-info{padding:1.2rem}
.course-cat-tag{color:${cfg.primary};font-size:0.78rem;font-weight:600;margin-bottom:0.3rem}
.course-info h3{font-size:0.95rem;font-weight:700;margin-bottom:0.3rem;line-height:1.4}
.course-info p{color:${cfg.text}77;font-size:0.82rem;line-height:1.5;margin-bottom:0.8rem}
.course-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem}
.course-price{color:${cfg.primary};font-weight:700}
.course-students{color:${cfg.text}55;font-size:0.78rem}
.enroll-course-btn{width:100%;background:${cfg.primary};color:#fff;border:none;padding:0.6rem;border-radius:${R};cursor:pointer;font-size:0.85rem;font-weight:600}
.teachers{padding:5rem 3rem;background:${cfg.primary}06;text-align:center}
.teachers h2{font-size:2.2rem;font-weight:700;margin-bottom:3rem}
.teacher-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;max-width:900px;margin:0 auto}
.teacher{background:#fff;border-radius:${R};padding:2rem;box-shadow:0 2px 12px #0001;text-align:center;transition:transform 0.2s}
.teacher:hover{transform:translateY(-4px)}
.teacher-avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,${cfg.primary}44,${cfg.primary}88);margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:2rem;border:3px solid ${cfg.primary}22;overflow:hidden}
.teacher-avatar img{width:100%;height:100%;object-fit:cover}
.teacher h3{font-weight:700;margin-bottom:0.2rem}
.teacher .teacher-subj{color:${cfg.primary};font-size:0.8rem;font-weight:600;margin-bottom:0.3rem}
.teacher p{color:${cfg.text}77;font-size:0.82rem}
.cta-sec{background:${cfg.primary};color:#fff;text-align:center;padding:5rem 2rem}
.cta-sec h2{font-size:2.2rem;margin-bottom:1rem}
.cta-sec p{opacity:0.85;margin-bottom:2.5rem;max-width:500px;margin-left:auto;margin-right:auto}
.cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.cta-btn{background:#fff;color:${cfg.primary};padding:1rem 2.5rem;border-radius:${R};border:none;cursor:pointer;font-weight:700;font-size:1rem}
.cta-btn-ghost{border:2px solid #fff;color:#fff;padding:1rem 2.5rem;border-radius:${R};cursor:pointer;background:transparent;font-weight:600;font-size:1rem}
${cfg.showFooter?`footer{background:${cfg.text};color:#fff;text-align:center;padding:2rem;font-size:0.85rem}`:''}
</style>
</head>
<body>
${cfg.showNav?`<nav>
  <div class="logo">${cfg.logoImage?`<img src="${cfg.logoImage}" style="height:30px;border-radius:6px" alt="logo"/>`:'📚'} ${cfg.title}</div>
  <ul class="mobile-hide"><li><a href="#courses">강좌</a></li><li><a href="#teachers">선생님</a></li><li><a href="#">커뮤니티</a></li></ul>
  <button class="enroll-btn" onclick="openModal('reservation-modal')">수강 신청</button>
</nav>`:''}
<section class="hero">
  <span class="hero-tag fade-in">✨ 2025 신규 강좌 오픈</span>
  <h1 class="fade-in">${cfg.title}</h1>
  <p class="fade-in">${cfg.slogan}</p>
  <div class="hero-btns fade-in">
    <button class="btn" onclick="openModal('reservation-modal')">수강 신청</button>
    <button class="btn-outline" onclick="openModal('contact-modal')">무료 상담</button>
  </div>
</section>
<div class="stats">
  <div class="stat"><h3>15,000+</h3><p>수강생</p></div>
  <div class="stat"><h3>200+</h3><p>강좌</p></div>
  <div class="stat"><h3>98%</h3><p>만족도</p></div>
  <div class="stat"><h3>50+</h3><p>전문 강사</p></div>
</div>
<section class="courses" id="courses">
  <h2 class="fade-in">인기 강좌</h2>
  <p class="sub fade-in">지금 가장 많이 선택하는 강좌</p>
  <div class="course-cats">
    <button class="course-cat active" onclick="filterCourses(this,'all')">전체</button>
    ${['프로그래밍','디자인','데이터','마케팅','어학'].map(c=>`<button class="course-cat" onclick="filterCourses(this,'${c}')">${c}</button>`).join('')}
  </div>
  <div class="course-grid">
    ${[
      {e:'💻',cat:'프로그래밍',t:'파이썬 완전 정복',d:'기초부터 실전까지 체계적으로',p:'89,000원',s:'3,240명',lv:'입문',img:cfg.galleryImages[0]||''},
      {e:'🎨',cat:'디자인',t:'UI/UX 디자인 마스터',d:'Figma로 배우는 실무 디자인',p:'120,000원',s:'1,890명',lv:'중급',img:cfg.galleryImages[1]||''},
      {e:'📊',cat:'데이터',t:'데이터 분석 with Python',d:'pandas, matplotlib 실전',p:'99,000원',s:'2,100명',lv:'입문',img:''},
      {e:'🌐',cat:'프로그래밍',t:'React 웹 개발',d:'최신 React 18 완벽 가이드',p:'110,000원',s:'1,560명',lv:'중급',img:''},
      {e:'📢',cat:'마케팅',t:'퍼포먼스 마케팅',d:'구글·메타 광고 실전',p:'79,000원',s:'980명',lv:'입문',img:''},
      {e:'🗣',cat:'어학',t:'비즈니스 영어',d:'실전 이메일·회의 영어',p:'65,000원',s:'2,450명',lv:'중급',img:''},
    ].map(c=>`<div class="course-card fade-in" data-cat="${c.cat}">
      <div class="course-thumb">${c.img?`<img src="${c.img}" alt=""/>`:''}${c.e}<span class="level-badge">${c.lv}</span></div>
      <div class="course-info">
        <div class="course-cat-tag">${c.cat}</div>
        <h3>${c.t}</h3>
        <p>${c.d}</p>
        <div class="course-meta"><span class="course-price">${c.p}</span><span class="course-students">👥 ${c.s}</span></div>
        <button class="enroll-course-btn" onclick="openModal('reservation-modal')">수강 신청</button>
      </div>
    </div>`).join('')}
  </div>
</section>
<section class="teachers" id="teachers">
  <h2 class="fade-in">전문 강사진</h2>
  <div class="teacher-grid">
    ${[
      {e:'👨‍💻',n:'김개발',s:'프론트엔드',d:'전 카카오 시니어 개발자',img:cfg.galleryImages[0]||''},
      {e:'👩‍🎨',n:'이디자인',s:'UI/UX',d:'전 삼성 UX 리드',img:cfg.galleryImages[1]||''},
      {e:'👨‍📊',n:'박데이터',s:'데이터 사이언스',d:'AI 스타트업 CTO',img:''},
      {e:'👩‍📢',n:'최마케팅',s:'디지털 마케팅',d:'마케팅 전문가 10년',img:''},
    ].map(t=>`<div class="teacher fade-in"><div class="teacher-avatar">${t.img?`<img src="${t.img}" alt=""/>`:`${t.e}`}</div><h3>${t.n}</h3><div class="teacher-subj">${t.s}</div><p>${t.d}</p></div>`).join('')}
  </div>
</section>
<section class="cta-sec">
  <h2 class="fade-in">지금 시작하세요</h2>
  <p class="fade-in">첫 강의 7일 무료 체험 · 언제든지 취소 가능</p>
  <div class="cta-btns fade-in">
    <button class="cta-btn" onclick="openModal('reservation-modal')">수강 신청</button>
    <button class="cta-btn-ghost" onclick="openModal('contact-modal')">무료 상담</button>
  </div>
</section>
${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} | 사업자번호: 123-45-67890 | 평생교육시설 등록 제2025-001호</p></footer>`:''}
${CONTACT_MODAL(cfg.primary)}
${RESERVATION_MODAL(cfg.primary)}
${SHARED_JS}
<script>
function filterCourses(btn, cat) {
  document.querySelectorAll('.course-cat').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.course-card').forEach(c=>{
    c.style.display=(cat==='all'||c.dataset.cat===cat)?'block':'none';
  });
}
</script>
</body></html>`
}
