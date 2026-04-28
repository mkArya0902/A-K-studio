// CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 60);
});
document.querySelectorAll('a,button,.portfolio-item,.filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
});

// NAV SCROLL
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// MOBILE MENU
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// PORTFOLIO FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.display = 'block';
        setTimeout(() => item.style.opacity = '1', 10);
      } else {
        item.style.opacity = '0';
        setTimeout(() => item.style.display = 'none', 300);
      }
    });
  });
});

// TESTIMONIAL SLIDER
let current = 0;
const track = document.querySelector('.testimonial-track');
const dots = document.querySelectorAll('.slider-dot');
const testimonials = document.querySelectorAll('.testimonial');
function goTo(n) {
  current = (n + testimonials.length) % testimonials.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}
document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
setInterval(() => goTo(current + 1), 5000);



// STATS COUNTER
function animateCounter(el, target) {
  let start = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(timer); } 
    else el.textContent = Math.floor(start) + '+';
  }, 25);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.dataset.val);
        animateCounter(el, val);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// PARALLAX HERO
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});
