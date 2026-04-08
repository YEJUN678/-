// 다운로드된 HTML에 삽입되는 공통 JS (인터랙션)
export const SHARED_JS = `
<script>
// ── 모바일 메뉴 ──
function toggleMenu() {
  var m = document.getElementById('mobile-menu');
  if(m) m.style.display = m.style.display==='flex' ? 'none' : 'flex';
}

// ── 모달 ──
function openModal(id) {
  var el = document.getElementById(id);
  if(el){ el.style.display='flex'; document.body.style.overflow='hidden'; }
}
function closeModal(id) {
  var el = document.getElementById(id);
  if(el){ el.style.display='none'; document.body.style.overflow=''; }
}
document.addEventListener('keydown', function(e){
  if(e.key==='Escape') document.querySelectorAll('.modal').forEach(function(m){ m.style.display='none'; document.body.style.overflow=''; });
});

// ── 갤러리 라이트박스 ──
function openLightbox(src) {
  var lb = document.getElementById('lightbox');
  if(!lb){
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = 'position:fixed;inset:0;background:#000d;display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out';
    lb.onclick = function(){ lb.style.display='none'; };
    var img = document.createElement('img');
    img.id = 'lb-img';
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 8px 40px #0008';
    lb.appendChild(img);
    document.body.appendChild(lb);
  }
  document.getElementById('lb-img').src = src;
  lb.style.display = 'flex';
}

// ── 장바구니 ──
var cart = [];
function addToCart(name, price, emoji) {
  var exist = cart.find(function(i){ return i.name===name; });
  if(exist){ exist.qty++; } else { cart.push({name:name,price:price,emoji:emoji,qty:1}); }
  updateCartUI();
  showCartToast(name);
}
function updateCartUI() {
  var count = cart.reduce(function(s,i){ return s+i.qty; }, 0);
  var total = cart.reduce(function(s,i){ return s+i.price*i.qty; }, 0);
  var badge = document.getElementById('cart-badge');
  if(badge) badge.textContent = count;
  var cartTotal = document.getElementById('cart-total');
  if(cartTotal) cartTotal.textContent = total.toLocaleString()+'원';
  var list = document.getElementById('cart-list');
  if(list){
    list.innerHTML = cart.length ? cart.map(function(i){
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;border-bottom:1px solid #eee">'+
        '<span>'+i.emoji+' '+i.name+' x'+i.qty+'</span>'+
        '<span style="font-weight:700">'+( i.price*i.qty).toLocaleString()+'원</span></div>';
    }).join('') : '<p style="color:#aaa;text-align:center;padding:2rem">장바구니가 비어있어요</p>';
  }
}
function showCartToast(name) {
  var t = document.getElementById('cart-toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'cart-toast';
    t.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:#10b981;color:#fff;padding:0.8rem 1.5rem;border-radius:12px;font-size:0.9rem;z-index:9999;transition:opacity 0.3s;box-shadow:0 4px 16px #0003';
    document.body.appendChild(t);
  }
  t.textContent = '✅ ' + name + ' 추가됨!';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.style.opacity='0'; }, 2000);
}

// ── 폼 제출 ──
function submitForm(formId) {
  var form = document.getElementById(formId);
  if(!form) return;
  var inputs = form.querySelectorAll('input[required],textarea[required]');
  var valid = true;
  inputs.forEach(function(inp){
    if(!inp.value.trim()){ inp.style.borderColor='#ef4444'; valid=false; }
    else { inp.style.borderColor=''; }
  });
  if(!valid){ alert('필수 항목을 입력해주세요'); return; }
  var btn = form.querySelector('button[type=submit]');
  if(btn){ btn.textContent='전송 중...'; btn.disabled=true; }
  setTimeout(function(){
    closeModal(form.closest('.modal').id);
    showSuccessToast();
    form.reset();
    if(btn){ btn.textContent='전송'; btn.disabled=false; }
  }, 1000);
}
function showSuccessToast() {
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;padding:1rem 2rem;border-radius:12px;font-size:1rem;z-index:9999;box-shadow:0 4px 20px #0003';
  t.textContent = '✅ 전송 완료! 빠른 시일 내 연락드리겠습니다.';
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 3000);
}

// ── 스무스 스크롤 ──
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var target = document.querySelector(this.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// ── 스크롤 애니메이션 ──
var observer = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(function(el){ observer.observe(el); });
<\/script>

<style>
.fade-in{opacity:0;transform:translateY(20px);transition:opacity 0.6s,transform 0.6s}
.fade-in.visible{opacity:1;transform:none}
.modal{display:none;position:fixed;inset:0;background:#0008;z-index:1000;align-items:center;justify-content:center}
.modal-box{background:#fff;border-radius:16px;padding:2rem;max-width:500px;width:90%;max-height:90vh;overflow-y:auto;position:relative}
.modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#999}
.form-group{margin-bottom:1rem}
.form-group label{display:block;font-size:0.85rem;color:#666;margin-bottom:0.3rem}
.form-group input,.form-group textarea,.form-group select{width:100%;padding:0.7rem;border:1px solid #ddd;border-radius:8px;font-size:0.9rem;outline:none;font-family:inherit}
.form-group input:focus,.form-group textarea:focus{border-color:var(--primary)}
.form-submit{width:100%;background:var(--primary);color:#fff;border:none;padding:0.9rem;border-radius:8px;font-size:1rem;cursor:pointer;font-weight:600;margin-top:0.5rem}
.cart-sidebar{position:fixed;top:0;right:-400px;width:380px;height:100vh;background:#fff;box-shadow:-4px 0 20px #0002;z-index:1000;transition:right 0.3s;display:flex;flex-direction:column}
.cart-sidebar.open{right:0}
.cart-header{padding:1.5rem;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}
.cart-items{flex:1;overflow-y:auto;padding:1rem 1.5rem}
.cart-footer{padding:1.5rem;border-top:1px solid #eee}
.cart-checkout{width:100%;background:var(--primary);color:#fff;border:none;padding:1rem;border-radius:8px;font-size:1rem;cursor:pointer;font-weight:700}
@media(max-width:768px){
  .mobile-hide{display:none!important}
  .mobile-menu{display:none;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:inherit;padding:1rem;gap:0.5rem;box-shadow:0 4px 12px #0002}
  .hamburger{display:flex!important;flex-direction:column;gap:4px;cursor:pointer;padding:0.3rem}
  .hamburger span{width:22px;height:2px;background:currentColor;display:block}
}
.hamburger{display:none}
</style>`

// 공통 모달 HTML (모든 템플릿에 삽입)
export const CONTACT_MODAL = (primary) => `
<div id="contact-modal" class="modal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('contact-modal')">×</button>
    <h2 style="margin-bottom:1.5rem;color:${primary}">문의하기</h2>
    <form id="contact-form" onsubmit="event.preventDefault();submitForm('contact-form')">
      <div class="form-group"><label>이름 *</label><input type="text" required placeholder="홍길동"/></div>
      <div class="form-group"><label>연락처 *</label><input type="tel" required placeholder="010-0000-0000"/></div>
      <div class="form-group"><label>이메일</label><input type="email" placeholder="example@email.com"/></div>
      <div class="form-group"><label>문의 내용 *</label><textarea required rows="4" placeholder="문의 내용을 입력해주세요"></textarea></div>
      <button type="submit" class="form-submit">전송하기</button>
    </form>
  </div>
</div>`

export const RESERVATION_MODAL = (primary) => `
<div id="reservation-modal" class="modal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('reservation-modal')">×</button>
    <h2 style="margin-bottom:1.5rem;color:${primary}">예약하기</h2>
    <form id="res-form" onsubmit="event.preventDefault();submitForm('res-form')">
      <div class="form-group"><label>이름 *</label><input type="text" required placeholder="홍길동"/></div>
      <div class="form-group"><label>연락처 *</label><input type="tel" required placeholder="010-0000-0000"/></div>
      <div class="form-group"><label>날짜 *</label><input type="date" required/></div>
      <div class="form-group"><label>시간 *</label><input type="time" required/></div>
      <div class="form-group"><label>인원</label>
        <select><option>1명</option><option>2명</option><option>3-4명</option><option>5명 이상</option></select>
      </div>
      <div class="form-group"><label>요청사항</label><textarea rows="3" placeholder="특별한 요청이 있으시면 적어주세요"></textarea></div>
      <button type="submit" class="form-submit">예약하기</button>
    </form>
  </div>
</div>`

export const CART_SIDEBAR = (primary) => `
<div id="cart-sidebar" class="cart-sidebar">
  <div class="cart-header">
    <h3>🛒 장바구니 <span id="cart-badge" style="background:${primary};color:#fff;border-radius:99px;padding:0.1rem 0.5rem;font-size:0.8rem">0</span></h3>
    <button onclick="document.getElementById('cart-sidebar').classList.remove('open')" style="background:none;border:none;font-size:1.3rem;cursor:pointer">×</button>
  </div>
  <div class="cart-items"><div id="cart-list"><p style="color:#aaa;text-align:center;padding:2rem">장바구니가 비어있어요</p></div></div>
  <div class="cart-footer">
    <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:1rem">
      <span>합계</span><span id="cart-total">0원</span>
    </div>
    <button class="cart-checkout" style="background:${primary}">결제하기</button>
  </div>
</div>
<div onclick="document.getElementById('cart-sidebar').classList.remove('open')" id="cart-overlay" style="display:none;position:fixed;inset:0;background:#0005;z-index:999"></div>`
