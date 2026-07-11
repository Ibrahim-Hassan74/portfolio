import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { SKILL_CATEGORIES } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  readonly categories = SKILL_CATEGORIES;

  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse'
          }
        });

        // Header entrance
        tl.to('.skills-header', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.elegant
        })
        // Stagger categories
        .to('.skill-category', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: GSAP_EASING.snappy
        }, '-=0.3');

        const badges = gsap.utils.toArray('.skill-badge');
        badges.forEach((badge: any) => {
          badge.addEventListener('mouseenter', () => {
            gsap.to(badge, {
              scale: 1.05,
              y: -3,
              duration: 0.2,
              ease: GSAP_EASING.elegant
            });
          });

          badge.addEventListener('mouseleave', () => {
            gsap.to(badge, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: GSAP_EASING.bouncy
            });
          });
        });

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }
}
