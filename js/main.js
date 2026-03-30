/* ── SOLASTICE — main.js ── */

/* ── PAGE SWITCH ── */
const pageLanding = document.getElementById('page-landing');
const pageDetail  = document.getElementById('page-detail');

function goToDetail(scrollTarget) {
  pageLanding.classList.add('page-out');
  setTimeout(() => {
    pageLanding.classList.add('hidden');
    pageLanding.classList.remove('page-out');
    pageDetail.classList.remove('hidden');
    pageDetail.classList.add('page-in');
    setTimeout(() => pageDetail.classList.remove('page-in'), 500);
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }, 280);
}

document.getElementById('btn-get-access').addEventListener('click', e => { e.preventDefault(); goToDetail(null); });

/* ── KEY COUNTER ── */
let keys = 1;
let couponApplied = false;
let discountPct   = 0;

const keyVal = document.getElementById('key-val');

document.getElementById('key-minus').addEventListener('click', () => {
  if (keys > 1) { keys--; keyVal.textContent = keys; }
});
document.getElementById('key-plus').addEventListener('click', () => {
  if (keys < 10) { keys++; keyVal.textContent = keys; }
});

/* ── OPEN CHECKOUT MODAL ── */
document.getElementById('order-buy-btn').addEventListener('click', () => {
  const checked  = document.querySelector('input[name="plan"]:checked');
  const price    = checked ? parseInt(checked.dataset.price) : 25;
  const planName = checked ? checked.dataset.name : 'Monthly';

  const total = price * keys;

  document.getElementById('co-plan-badge').textContent = planName;
  document.getElementById('co-keys').textContent       = keys;
  document.getElementById('co-keys-s').textContent     = keys > 1 ? 's' : '';
  document.getElementById('co-price').textContent      = '$' + total.toFixed(2);

  // reset coupon state
  couponApplied = false;
  discountPct   = 0;
  document.getElementById('coupon-msg').textContent = '';
  document.getElementById('coupon-msg').className   = 'coupon-msg';
  document.getElementById('co-coupon').value        = '';
  document.getElementById('co-email').value         = '';
  document.getElementById('co-discord').value       = '';

  const btn = document.getElementById('checkout-submit');
  btn.textContent = 'Complete Purchase';
  btn.disabled    = false;

  document.getElementById('checkout-overlay').classList.add('open');
});

function closeCheckout() {
  document.getElementById('checkout-overlay').classList.remove('open');
}
document.getElementById('checkout-close').addEventListener('click', closeCheckout);
document.getElementById('checkout-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('checkout-overlay')) closeCheckout();
});

/* ── COUPON ── */
const VALID_COUPONS = { 'SOLASTICE10': 10, 'SEMI': 15, 'BANNED': 20 };

document.getElementById('coupon-apply').addEventListener('click', () => {
  const code = document.getElementById('co-coupon').value.trim().toUpperCase();
  const msg  = document.getElementById('coupon-msg');
  const checked = document.querySelector('input[name="plan"]:checked');
  const price   = checked ? parseInt(checked.dataset.price) : 25;

  if (VALID_COUPONS[code] !== undefined) {
    couponApplied = true;
    discountPct   = VALID_COUPONS[code];
    const discount = Math.round(price * keys * discountPct / 100);
    const total    = price * keys - discount;
    msg.textContent = discountPct + '% off applied.';
    msg.className   = 'coupon-msg coupon-ok';
    document.getElementById('co-price').textContent = '$' + total.toFixed(2);
  } else {
    couponApplied = false;
    discountPct   = 0;
    const total = price * keys;
    msg.textContent = 'Invalid code.';
    msg.className   = 'coupon-msg coupon-err';
    document.getElementById('co-price').textContent = '$' + total.toFixed(2);
  }
});

/* ── SUBMIT ── */
document.getElementById('checkout-submit').addEventListener('click', () => {
  const btn = document.getElementById('checkout-submit');
  btn.textContent = 'Processing...';
  btn.disabled    = true;
  setTimeout(() => {
    btn.textContent = 'Order Received. Probably.';
    setTimeout(() => {
      btn.textContent = "We'll email you. Maybe.";
      setTimeout(closeCheckout, 1800);
    }, 1400);
  }, 1200);
});

/* ── VIDEO MODAL ── */
const vidOverlay = document.getElementById('vid-overlay');
document.getElementById('video-box').addEventListener('click', () => vidOverlay.classList.add('open'));
document.getElementById('vid-close').addEventListener('click', () => vidOverlay.classList.remove('open'));
vidOverlay.addEventListener('click', e => { if (e.target === vidOverlay) vidOverlay.classList.remove('open'); });

/* ── KEYBOARD ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCheckout(); vidOverlay.classList.remove('open'); }
});
