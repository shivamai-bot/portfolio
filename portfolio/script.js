// Theme toggle (remembers choice)
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
function setTheme(t) {
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? 'Light' : 'Dark';
  try { localStorage.setItem('theme', t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () =>
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  }));

// Typing line in hero
const roles = ['Web Developer', 'MCA Student', 'Java Learner', 'Problem Solver'];
const typed = document.getElementById('typed');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (still) {
  typed.textContent = roles.join(' | ');
} else {
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = roles[r];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 45 : 85);
  })();
}

// Skill bars fill when scrolled into view
document.querySelectorAll('.bar').forEach(b =>
  b.querySelector('i').style.setProperty('--w', b.querySelector('i').dataset.level + '%'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
}, { threshold: 0.4 });
document.querySelectorAll('.bar').forEach(b => io.observe(b));

// Contact form opens the visitor's email app
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = encodeURIComponent(document.getElementById('fname').value);
  const m = encodeURIComponent(document.getElementById('fmsg').value);
  location.href = `mailto:shivamnalawade3@gmail.com?subject=Portfolio message from ${n}&body=${m}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
