import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GSAP_EASING = {
  smooth: 'power2.out',
  elegant: 'power3.out',
  snappy: 'expo.out',
  bouncy: 'back.out(1.7)',
};

export function createMatchMedia() {
  return gsap.matchMedia();
}
