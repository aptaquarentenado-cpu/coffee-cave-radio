/* Coffee Cave Radio - Landing Page Script */

(function () {
  'use strict';

  /* ---------- Copyright year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile navigation toggle ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close nav when a nav link is tapped */
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close nav on outside click */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Sticky header: add shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 16) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.45)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ---------- Intersection Observer: fade-in sections ---------- */
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-section {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-in-section.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const sections = document.querySelectorAll(
    '.about-strip, .characters, .videos, .socials'
  );
  sections.forEach(function (sec) {
    sec.classList.add('fade-in-section');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach(function (sec) { observer.observe(sec); });
  } else {
    /* Fallback for older browsers */
    sections.forEach(function (sec) { sec.classList.add('visible'); });
  }

  /* ---------- Character card: stagger delay ---------- */
  document.querySelectorAll('.character-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.08) + 's';
  });

})();
