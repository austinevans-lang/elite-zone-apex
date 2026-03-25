/* ============================================
   ELITE ZONE APEX — Main Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Custom Cursor ---
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .btn, .service-card, .app-card, input, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  } else {
    // Hide custom cursor on touch devices
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
  }

  // --- Nav Scroll Effect ---
  const nav = document.querySelector('.nav');
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger siblings
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.querySelectorAll('.reveal'));
            const siblingIndex = siblings.indexOf(entry.target);
            const delay = siblingIndex * 100;

            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);

            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // --- Process Timeline Lines ---
  const processLines = document.querySelectorAll('.process__line');

  if ('IntersectionObserver' in window && processLines.length) {
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    processLines.forEach((line) => lineObserver.observe(line));
  }

  // --- About Section Stagger ---
  const aboutText = document.querySelector('.about__text');
  const aboutStats = document.querySelector('.about__stats');

  if ('IntersectionObserver' in window && aboutText && aboutStats) {
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger: text fades in first, stats follow with delay
            aboutText.style.transitionDelay = '0ms';
            aboutText.classList.add('visible');
            setTimeout(() => {
              aboutStats.classList.add('visible');
            }, 250);
            aboutObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    );

    aboutObserver.observe(aboutText);
  }

  // --- Contact Form (basic client-side handling) ---
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      // If no real form endpoint, prevent default and show confirmation
      if (form.action.includes('placeholder')) {
        e.preventDefault();
        const btn = form.querySelector('.contact__submit');
        const originalText = btn.textContent;
        btn.textContent = 'TRANSMITTED';
        btn.style.background = '#00ff66';
        btn.style.color = '#0a0a0a';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          form.reset();
        }, 2500);
      }
    });
  }

})();
