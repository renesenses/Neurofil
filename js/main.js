/* ===========================
   NEUROFIL — Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Active Nav Link ----
  setActiveNav();

  // ---- Mobile Navigation ----
  initMobileNav();

  // ---- Fake Cart ----
  initCart();

  // ---- Boutique Filters ----
  initFilters();

  // ---- Scroll Animations ----
  initScrollAnimations();

});

/* ===========================
   ACTIVE NAV
   =========================== */
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cart)');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ===========================
   MOBILE NAVIGATION
   =========================== */
function initMobileNav() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ===========================
   FAKE CART
   =========================== */
let cartCount = 0;

function initCart() {
  const cartButtons = document.querySelectorAll('.btn-cart');
  const badge = document.querySelector('.cart-badge');

  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      updateCartBadge(badge);
      animateAddToCart(btn);
    });
  });
}

function updateCartBadge(badge) {
  if (!badge) return;
  badge.textContent = cartCount;
  badge.classList.add('visible');

  // Bump animation
  badge.classList.remove('bump');
  void badge.offsetWidth; // force reflow
  badge.classList.add('bump');
}

function animateAddToCart(btn) {
  const originalText = btn.textContent;
  btn.textContent = 'Ajout\u00e9 \u2713';
  btn.style.background = '#4ECDC4';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 1000);
}

/* ===========================
   BOUTIQUE FILTERS
   =========================== */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = '';
          product.style.opacity = '0';
          product.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            product.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          });
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

/* ===========================
   SCROLL ANIMATIONS
   =========================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
