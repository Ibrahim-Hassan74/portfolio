import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SKILL_CATEGORIES, SkillCategory } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  readonly categories: SkillCategory[] = SKILL_CATEGORIES;

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
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        });

        // Header entrance
        tl.to('.skills-header', {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: GSAP_EASING.elegant
        }, 0)
        // Stagger categories
        .to('.skill-category', {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: GSAP_EASING.snappy
        }, 0.05);

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
