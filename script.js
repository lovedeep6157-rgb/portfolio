/* =============================================
   PORTFOLIO — script.js
   ============================================= */

// ── THEME TOGGLE ──
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = themeBtn.querySelector('.theme-icon');

const storedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', storedTheme);
updateThemeIcon(storedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀' : '◐';
}

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── NAVBAR ACTIVE + SCROLL ──
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');
const navLinkEls = document.querySelectorAll('.nav-link');

function onScroll() {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── SCROLL TO TOP ──
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── TYPING ANIMATION ──
const phrases = [
  'AI/ML Learner',
  'Web Developer',
  'Creative Problem Solver',
  'Code Unnati Graduate',
];
let pIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      return setTimeout(type, 1800);
    }
  } else {
    typingEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      return setTimeout(type, 400);
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// ── SLIDESHOW ──
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0, autoSlide;

function goTo(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function resetAuto() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => goTo(current + 1), 4000);
}

document.getElementById('nextSlide').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
document.getElementById('prevSlide').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));
resetAuto();

// ── INTERSECTION OBSERVER: REVEAL ──
const revealEls = document.querySelectorAll('.glass-card, .section-header, .tech-stack, .timeline');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal', 'visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// ── SKILL CARDS REVEAL + BAR ANIMATE ──
const skillCards = document.querySelectorAll('.skill-card');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const card = e.target;
      const delay = parseInt(card.dataset.delay || 0);
      setTimeout(() => {
        card.classList.add('visible');
        const bar = card.querySelector('.skill-bar');
        if (bar) {
          const w = bar.dataset.width;
          bar.style.width = w + '%';
        }
      }, delay);
      skillObs.unobserve(card);
    }
  });
}, { threshold: 0.15 });

skillCards.forEach(c => skillObs.observe(c));

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-primary');
  const success = document.getElementById('formSuccess');

  const name    = document.getElementById('fname').value;
  const email   = document.getElementById('femail').value;
  const subject = document.getElementById('fsubject').value || 'Portfolio Contact';
  const message = document.getElementById('fmessage').value;

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=lovedeep6157@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink, '_blank');

  btn.querySelector('.btn-text').textContent = 'Opening Mail...';
  btn.disabled = true;

  setTimeout(() => {
    btn.querySelector('.btn-text').textContent = 'Send Message';
    btn.disabled = false;
    success.classList.add('show');
    this.reset();
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1200);
});

// ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── PILL HOVER STAGGER ──
document.querySelectorAll('.pill').forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 20}ms`;
});

// ── PARALLAX GLOW ON MOUSE MOVE (home only) ──
const homeSection = document.querySelector('.home-section');
homeSection.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { width, height } = homeSection.getBoundingClientRect();
  const x = (clientX / width - 0.5) * 30;
  const y = (clientY / height - 0.5) * 20;
  homeSection.style.setProperty('--mx', `${x}px`);
  homeSection.style.setProperty('--my', `${y}px`);
});
