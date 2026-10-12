const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navToggle = document.querySelector('#nav-toggle');
const navLinks = document.querySelector('#nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const progress = document.querySelector('#scroll-progress');
const sections = [...document.querySelectorAll('main section[id]')];
const updateScrollUI = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  let active = '';
  sections.forEach((section) => { if (window.scrollY >= section.offsetTop - 130) active = section.id; });
  navLinks?.querySelectorAll('a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${active}`));
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const revealItems = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) revealItems.forEach((item) => item.classList.add('visible'));
else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); instance.unobserve(entry.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => observer.observe(item));
}

const copyButton = document.querySelector('#copy-email');
const copyFeedback = document.querySelector('#copy-feedback');
copyButton?.addEventListener('click', async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = 'Email copied to clipboard.';
  } catch { copyFeedback.textContent = email; }
  window.setTimeout(() => { copyFeedback.textContent = ''; }, 2600);
});

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
form?.addEventListener('submit', () => {
  formStatus.textContent = 'Sending message…';
  const submit = form.querySelector('button[type="submit"]');
  if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
});
if (new URLSearchParams(window.location.search).get('sent') === '1' && formStatus) formStatus.textContent = 'Message sent. Thank you for getting in touch.';

const canvas = document.querySelector('#neural-bg');
const context = canvas?.getContext('2d');
let particles = [];
let pointer = { x: -1000, y: -1000 };
const resizeCanvas = () => { if (!canvas) return; canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
const seedParticles = () => { particles = Array.from({ length: Math.min(58, Math.floor(window.innerWidth * window.innerHeight / 22000)) }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2 })); };
const drawNetwork = () => { if (!context || prefersReducedMotion) return; context.clearRect(0, 0, window.innerWidth, window.innerHeight); particles.forEach((p, i) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1; if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1; const near = Math.hypot(p.x - pointer.x, p.y - pointer.y); context.fillStyle = `rgba(34,211,238,${near < 150 ? .72 : .22})`; context.fillRect(p.x, p.y, 2, 2); for (let j = i + 1; j < particles.length; j += 1) { const q = particles[j]; const distance = Math.hypot(p.x - q.x, p.y - q.y); if (distance < 125) { const boost = near < 150 ? .18 : 0; context.strokeStyle = `rgba(59,130,246,${Math.max(.02, .12 - distance / 1300 + boost)})`; context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y); context.stroke(); } } }); requestAnimationFrame(drawNetwork); };
if (canvas && context && !prefersReducedMotion) { resizeCanvas(); seedParticles(); window.addEventListener('resize', () => { resizeCanvas(); seedParticles(); }); window.addEventListener('pointermove', (event) => { pointer = { x: event.clientX, y: event.clientY }; }, { passive: true }); drawNetwork(); }
