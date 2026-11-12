/**
 * Core GSAP Animation Routines & Motion Fidelity — ERA Residence
 */

export const BREAKPOINT = 992;
export const DUR_S = 0.4;
export const DUR_M = 0.8;
export const DUR_L = 1.2;
export const STAGGER = 0.1;

export function registerGsapPlugins() {
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof CustomEase !== 'undefined') {
      gsap.registerPlugin(CustomEase);
      CustomEase.create('InOut', '0.75,0,0.25,1');
      CustomEase.create('Out', '0.25,1,0.5,1');
      CustomEase.create('In', '0.5,0,0.75,0');
      CustomEase.create('Ease', '0.25,0.1,0.25,1');
      CustomEase.create('Write', '0.333,0,0.667,1');
      CustomEase.create('diveIn', '0.6,0,0,1');
      CustomEase.create('horScroll', '0.25,0,0.75,1');
      CustomEase.create('loaderEase', 'M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1');
    }
    if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
  }
}

export function initHorizontalScroll() {
  const locArea = document.querySelector('.loc-scroll-area');
  if (!locArea || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.matchMedia().add(`(min-width: ${BREAKPOINT}px)`, () => {
    const track = locArea.querySelector('.loc-scroll-area_track');
    if (!track) return;
    const distance = track.scrollWidth - locArea.offsetWidth;
    locArea.style.height = `${track.scrollWidth}px`;
    ScrollTrigger.refresh();

    gsap.to(track, {
      x: -distance,
      ease: 'horScroll',
      scrollTrigger: {
        trigger: locArea,
        start: '2.5% top',
        end: '97.5% bottom',
        scrub: 0.25,
      },
    });
  });
}

export function initFooterClip() {
  const footer = document.querySelector('.footer-w');
  const clipTarget = document.querySelector('[data-footer-clip]');
  if (!footer || !clipTarget || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const insetVal = window.innerWidth >= BREAKPOINT ? 'inset(8% 22% 8% 22%)' : 'inset(4% 32% 4% 32%)';

  gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: 'top 30%',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  }).fromTo(clipTarget, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: insetVal, ease: 'none' }, 0);
}
