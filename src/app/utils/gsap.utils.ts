import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  if (typeof ResizeObserver !== 'undefined') {
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    });
    if (document.body) {
      ro.observe(document.body);
    } else {
      window.addEventListener('DOMContentLoaded', () => ro.observe(document.body));
    }
  }
}

export const GSAP_EASING = {
  smooth: 'power2.out',
  elegant: 'power3.out',
  snappy: 'expo.out',
  bouncy: 'back.out(1.7)',
};

export function createMatchMedia() {
  return gsap.matchMedia();
}
