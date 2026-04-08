import { SHARED_JS } from '../shared'

export const wedding = (cfg) => {
  const R = cfg.rounded === 'none' ? '4px' : '99px'
  const photoGrid = cfg.galleryImages.length > 0
    ? cfg.galleryImages.map(src=>`<div onclick="openLightbox('${src}')" style="cursor:zoom-in;aspect-ratio:1;border-radius:8px;overflow:hidden"><img src="${src}" style="width:100%;height:100%;object-fit:cover"/></div>`).join('')
    : ['🌸','💑','🌺','🥂','💍','🌹'].map(e=>`<div style="aspect-ratio:1;background:linear-gradient(135deg,${cfg.primary}22,${cfg.primary}44);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:2.5rem">${e}</div>`).join('')

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${cfg.title}</title>
<link href="https://fonts.googleapis.com/css2?family=${cfg.font.replace(/ /g,'+')}:wght@400;700&display=swap" rel="stylesheet"/>
<style>
:root{--primary:${cfg.primary}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${cfg.font}',sans-serif;background:${cfg.bg};color:${cfg.text};text-align:center}
.hero{background:linear-gradient(135deg,${cfg.primary}11,${cfg.primary}22);padding:6rem 2rem;${cfg.heroImage?`background-image:linear-gradient(rgba(255,255,255,0.75),rgba(255,255,255,0.7)),url('${cfg.heroImage}');background-size:cover;background-position:center`:''}position:relative}
.ornament{font-size:3rem;margin-bottom:1rem;color:${cfg.primary}}
.hero h1{font-size:3.5rem;font-weight:400;color:${cfg.primary};letter-spacing:0.1em;margin-bottom:0.5rem}
.couple-names{font-size:1.2rem;color:${cfg.primary}99;margin-bottom:0.5rem}
.date-line{font-size:0.95rem;color:${cfg.text}66;letter-spacing:0.2em;margin:1rem 0}
.hero p{font-size:1rem;color:${cfg.text}88;line-height:1.8;max-width:500px;margin:0 auto 2rem}
.btn{background:${cfg.primary};color:#fff;padding:0.9rem 2.5rem;border-radius:${R};border:none;cursor:pointer;font-size:0.95rem;font-weight:600}
.couple{display:grid;grid-template-columns:1fr auto 1fr;gap:2rem;align-items:center;max-width:800px;margin:3rem auto;padding:0 2rem}
.person{padding:2rem;background:#fff;border-radius:16px;box-shadow:0 4px 20px #0001}
.avatar{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,${cfg.primary}44,${cfg.primary}88);margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:3px solid ${cfg.primary}33;overflow:hidden}
.avatar img{width:100%;height:100%;object-fit:cover}
.person h3{font-size:1.2rem;color:${cfg.primary};margin-bottom:0.3rem}
.person p{color:${cfg.text}77;font-size:0.85rem;line-height:1.5}
.heart-btn{font-size:3rem;cursor:pointer;color:${cfg.primary};background:none;border:none;animation:heartbeat 1.5s ease infinite}
@keyframes heartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
.gallery-sec{padding:4rem 2rem;background:${cfg.primary}06}
.gallery-sec h2{font-size:2rem;color:${cfg.primary};margin-bottom:2rem}
.photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;max-width:700px;margin:0 auto;border-radius:12px;overflow:hidden}
.timeline{padding:4rem 2rem;max-width:700px;margin:0 auto;text-align:left}
.timeline h2{font-size:2rem;color:${cfg.primary};margin-bottom:2rem;text-align:center}
.tl-item{display:flex;gap:1.5rem;margin-bottom:2rem;align-items:flex-start}
.tl-dot{width:40px;height:40px;border-radius:50%;background:${cfg.primary};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem}
.tl-content h3{font-weight:700;color:${cfg.primary};margin-bottom:0.2rem}
.tl-content p{color:${cfg.text}77;font-size:0.88rem}
.attend-sec{background:${cfg.primary};color:#fff;padding:5rem 2rem}
.attend-sec h2{font-size:2rem;margin-bottom:1rem}
.attend-sec p{opacity:0.85;margin-bottom:2rem;line-height:1.8}
.info-row{display:flex;justify-content:center;gap:3rem;margin-bottom:2rem;flex-wrap:wrap}
.info-item h4{font-size:0.78rem;opacity:0.7;letter-spacing:0.1em;margin-bottom:0.3rem}
.info-item p{font-size:1rem;font-weight:600}
.attend-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.attend-btn{background:#fff;color:${cfg.primary};padding:0.9rem 2rem;border-radius:${R};border:none;cursor:pointer;font-weight:700}
.attend-btn.decline{background:transparent;border:2px solid #fff;color:#fff}
${cfg.showFooter?`footer{padding:2rem;color:${cfg.text}55;font-size:0.85rem}`:''}
</style>
</head>
<body>
<section class="hero">
  <div class="ornament">💍</div>
  <h1 class="fade-in">${cfg.title}</h1>
  <div class="couple-names fade-in">김민준 & 이서연</div>
  <div class="date-line fade-in">2025 · 06 · 07 · SAT</div>
  <p class="fade-in">${cfg.slogan}</p>
  <button class="btn fade-in" onclick="openModal('attend-modal')">참석 여부 알리기</button>
</section>
<div class="couple">
  <div class="person fade-in">
    <div class="avatar">${cfg.galleryImages[0]?`<img src="${cfg.galleryImages[0]}" alt=""/>`:'👨'}</div>
    <h3>김민준</h3><p>신랑 측 연락처<br/>010-1234-5678</p>
  </div>
  <button class="heart-btn" onclick="this.style.transform='scale(1.5)';setTimeout(()=>this.style.transform='',300)">💗</button>
  <div class="person fade-in">
    <div class="avatar">${cfg.galleryImages[1]?`<img src="${cfg.galleryImages[1]}" alt=""/>`:'👩'}</div>
    <h3>이서연</h3><p>신부 측 연락처<br/>010-8765-4321</p>
  </div>
</div>
<section class="gallery-sec">
  <h2 class="fade-in">우리의 순간들</h2>
  <div class="photo-grid">${photoGrid}</div>
</section>
<div class="timeline">
  <h2>우리의 이야기</h2>
  ${[['💌','2020년 봄','첫 만남','같은 동아리에서 처음 만났습니다'],['☕','2020년 여름','첫 데이트','작은 카페에서 설레는 첫 데이트'],['💍','2025년 봄','프로포즈','벚꽃 아래 평생을 약속했습니다'],['💒','2025년 6월','결혼','새로운 시작을 함께합니다']].map(([e,y,t,d])=>`<div class="tl-item fade-in"><div class="tl-dot">${e}</div><div class="tl-content"><h3>${t} <span style="font-size:0.8rem;color:${cfg.primary}99">${y}</span></h3><p>${d}</p></div></div>`).join('')}
</div>
<section class="attend-sec">
  <h2 class="fade-in">결혼식에 초대합니다</h2>
  <div class="info-row">
    <div class="info-item"><h4>DATE</h4><p>2025년 6월 7일 토요일</p></div>
    <div class="info-item"><h4>TIME</h4><p>오후 2시 30분</p></div>
    <div class="info-item"><h4>VENUE</h4><p>더 그랜드 웨딩홀 3F</p></div>
  </div>
  <div class="attend-btns">
    <button class="attend-btn" onclick="openModal('attend-modal')">참석합니다</button>
    <button class="attend-btn decline" onclick="openModal('attend-modal')">참석이 어렵습니다</button>
  </div>
</section>

<!-- 참석 모달 -->
<div id="attend-modal" class="modal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('attend-modal')">×</button>
    <h2 style="color:${cfg.primary};margin-bottom:1.5rem;font-size:1.3rem">참석 여부 알리기</h2>
    <form id="attend-form" onsubmit="event.preventDefault();submitForm('attend-form')">
      <div class="form-group"><label>이름 *</label><input type="text" required placeholder="홍길동"/></div>
      <div class="form-group"><label>연락처 *</label><input type="tel" required placeholder="010-0000-0000"/></div>
      <div class="form-group"><label>참석 여부</label>
        <select><option>참석합니다 ✅</option><option>참석이 어렵습니다 ❌</option></select>
      </div>
      <div class="form-group"><label>동행 인원</label>
        <select><option>본인만</option><option>2명</option><option>3명</option><option>4명 이상</option></select>
      </div>
      <div class="form-group"><label>축하 메시지</label><textarea rows="3" placeholder="따뜻한 메시지를 남겨주세요"></textarea></div>
      <button type="submit" class="form-submit" style="background:${cfg.primary}">전달하기</button>
    </form>
  </div>
</div>

${cfg.showFooter?`<footer><p>© 2025 ${cfg.title} · 소중한 걸음 감사합니다 💐</p></footer>`:''}
${SHARED_JS}
</body></html>`
}
