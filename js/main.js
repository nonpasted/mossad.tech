/* ── SOLASTICE — main.js ── */

/* Scroll-triggered animations */
const obs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.ani').forEach(el => obs.observe(el));

/* Mobile nav toggle */
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('#nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ── BUY MODAL ── */
const buyModal    = document.getElementById('buy-modal');
const buyOverlay  = document.getElementById('buy-overlay');

function openBuy() { buyOverlay.classList.add('open'); }
function closeBuy() { buyOverlay.classList.remove('open'); }

document.querySelectorAll('[data-buy]').forEach(el =>
  el.addEventListener('click', e => { e.preventDefault(); openBuy(); })
);
document.getElementById('buy-close').addEventListener('click', closeBuy);
buyOverlay.addEventListener('click', e => { if (e.target === buyOverlay) closeBuy(); });

document.getElementById('buy-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.modal-submit');
  btn.textContent = 'Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Order Received. Probably.';
    setTimeout(() => {
      btn.textContent = "We'll email you. Maybe.";
      setTimeout(closeBuy, 1800);
    }, 1400);
  }, 1200);
});

/* ── VIDEO MODAL ── */
const vidOverlay = document.getElementById('vid-overlay');
document.getElementById('video-box').addEventListener('click', () =>
  vidOverlay.classList.add('open')
);
document.getElementById('vid-close').addEventListener('click', () =>
  vidOverlay.classList.remove('open')
);
vidOverlay.addEventListener('click', e => {
  if (e.target === vidOverlay) vidOverlay.classList.remove('open');
});

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});


/* keyboard close */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeBuy(); vidOverlay.classList.remove('open'); }
});
