/**
 * Scroll Management & Inertial Smooth Scrolling — ERA Residence
 * Powered by Lenis & GSAP ScrollTrigger
 */

let lenis = null;
let localLenisInstances = [];

export function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    wrapper: window,
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => lenis.raf(1000 * time));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function lockScroll() {
  if (lenis) lenis.stop();
  document.body.classList.add('overflow-hidden');
}

export function unlockScroll() {
  if (lenis) lenis.start();
  document.body.classList.remove('overflow-hidden');
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

export function initScrollBar() {
  const scrollBar = document.querySelector('[data-scroll-bar]');
  if (!scrollBar || typeof ScrollTrigger === 'undefined') return;

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress;
      scrollBar.style.transform = `scaleY(${progress})`;
    },
  });
}
