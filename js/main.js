// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
let current = 0;
setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 6500);

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Session type selector
function selectSession(btn, value) {
  document.querySelectorAll('.session-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('sessionTypeInput').value = value;
}

// Contact form — Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        btn.style.display = 'none';
        success.style.display = 'block';
      } else {
        error.style.display = 'block';
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    } catch {
      error.style.display = 'block';
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}

// Portfolio slider
const track = document.getElementById('portfolioTrack');
const prevBtn = document.getElementById('portfolioPrev');
const nextBtn = document.getElementById('portfolioNext');

if (track) {
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -600, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: 600, behavior: 'smooth' }));

  let isDragging = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => {
    isDragging = true;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDragging = false; track.classList.remove('is-dragging'); });
  track.addEventListener('mouseup', () => { isDragging = false; track.classList.remove('is-dragging'); });
  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

// Coming soon gallery tiles
document.querySelectorAll('.gallery-card.coming-soon').forEach(card => {
  card.addEventListener('click', e => e.preventDefault());
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
