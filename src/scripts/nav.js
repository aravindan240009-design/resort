/**
 * Navigation, Modals & Interactive Micro-Interactions — ERA Residence
 */

export function initCookies() {
  const cookieBanner = document.querySelector('[data-cookies]');
  if (!cookieBanner) return;

  const acceptBtn = cookieBanner.querySelector('[href="#"][class*="link"], a:first-of-type, [data-cookie-accept]');
  const declineBtn = cookieBanner.querySelector('a:last-of-type, [data-cookie-decline]');

  const accepted = localStorage.getItem('era_cookies_accepted');
  if (accepted) {
    cookieBanner.style.display = 'none';
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('era_cookies_accepted', 'true');
      if (typeof gsap !== 'undefined') {
        gsap.to(cookieBanner, { opacity: 0, y: 20, duration: 0.4, onComplete: () => { cookieBanner.style.display = 'none'; } });
      } else {
        cookieBanner.style.display = 'none';
      }
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('era_cookies_accepted', 'false');
      if (typeof gsap !== 'undefined') {
        gsap.to(cookieBanner, { opacity: 0, y: 20, duration: 0.4, onComplete: () => { cookieBanner.style.display = 'none'; } });
      } else {
        cookieBanner.style.display = 'none';
      }
    });
  }
}

export function initThemeChange() {
  const dayNightLinks = document.querySelectorAll('a[href="#"]');
  dayNightLinks.forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes('by night')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.documentElement.setAttribute('data-theme', 'night');
        document.body.classList.add('theme-night');
      });
    } else if (text.includes('by day')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('theme-night');
      });
    }
  });
}

export function initMagneticEffect() {
  const magnetics = document.querySelectorAll('[hover-magnetic], [data-magnetic]');
  magnetics.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      if (typeof gsap !== 'undefined') {
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      }
    });
    el.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
    });
  });
}

export function initModals() {
  const menuTrigger = document.querySelector('[data-menu-trigger], .nav-menu-btn');
  const menuModal = document.querySelector('[data-modal="menu"]');
  const menuClose = menuModal?.querySelector('[data-modal-close]');

  if (menuTrigger && menuModal) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      menuModal.classList.add('is-open');
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(menuModal, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 });
      }
    });
  }

  if (menuClose && menuModal) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      menuModal.classList.remove('is-open');
    });
  }
}
