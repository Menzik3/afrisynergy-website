/* ============================================================
   AFRISYNERGY TECHNOLOGY — script.js
   ============================================================ */

/* ─── NAV: SHRINK ON SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── MOBILE HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ─── HERO FLOATING PARTICLES ─── */
const particlesContainer = document.getElementById('particles');

for (let i = 0; i < 25; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    animation-duration: ${Math.random() * 12 + 8}s;
    animation-delay: ${Math.random() * 10}s;
    opacity: 0;
  `;
  particlesContainer.appendChild(p);
}

/* ─── SCROLL REVEAL ANIMATION ─── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

/* ─── INDUSTRY TABS ─── */
const industryItems   = document.querySelectorAll('.industry-item');
const industryDetails = document.querySelectorAll('.industry-detail');

industryItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active from all
    industryItems.forEach(i => i.classList.remove('active'));
    industryDetails.forEach(d => d.classList.remove('active'));

    // Activate clicked item
    item.classList.add('active');
    const target = item.dataset.target;
    const detail = document.getElementById('detail-' + target);
    if (detail) detail.classList.add('active');
  });
});

/* ─── CONTACT FORM SUBMIT ─── */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const btn      = e.target.querySelector('.btn-submit');
  const original = btn.textContent;

  btn.textContent      = '✓ Message Sent!';
  btn.style.background = '#00c853';
  btn.style.boxShadow  = '0 0 30px rgba(0, 200, 83, 0.4)';

  setTimeout(() => {
    btn.textContent      = original;
    btn.style.background = '';
    btn.style.boxShadow  = '';
    e.target.reset();
  }, 3000);
});

/* ─── ANIMATED STAT COUNTERS ─── */
function animateCounter(el, target, suffix = '') {
  let current  = 0;
  const step   = target / 60;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      if (nums[0]) animateCounter(nums[0], 12, '+');
      if (nums[1]) animateCounter(nums[1],  8, '+');
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);
