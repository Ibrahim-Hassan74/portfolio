import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  readonly bullets = [
    'Designed and delivered a complete backend using ASP.NET Core and EF Core for invoice and expense management across multiple user roles',
    'Implemented RBAC with ASP.NET Identity: Admin, Owner, Employee roles with full data isolation',
    'Built automated PDF and Excel financial reporting modules',
    'Delivered fully localized Arabic/English admin dashboards with MVC',
  ];

  readonly highlights: { icon: string; title: string; subtitle: string; meta: string; url?: string }[] = [
    {
      icon: 'award',
      title: 'ECPC Finalist',
      subtitle: 'Egyptian Collegiate Programming Contest',
      meta: '2024',
      url: 'https://drive.google.com/file/d/1Vc6Tc7DMcvd354QlbvN2AOpACGzvyKt1/view'
    },
    {
      icon: 'building',
      title: 'AAIB Banking Internship',
      subtitle: 'Arab African International Bank',
      meta: 'Cairo, Egypt · 2025',
      url: 'https://drive.google.com/file/d/182TijwXWvkLnO1b3LTIz8sGnuYNwCYy2/view'
    },
  ];

  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.exp-header',
            endTrigger: this.el.nativeElement,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        });

        // Header
        tl.to('.exp-header', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.elegant
        });

        // Draw line down
        tl.to('.exp-line', {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.2');

        // Pop in the dot
        tl.to('.exp-dot', {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: GSAP_EASING.bouncy
        }, '-=0.6');

        // Reveal the main content
        tl.to('.exp-content', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.snappy
        }, '-=0.4');

        // Stagger bullets
        tl.to('.exp-bullet', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: GSAP_EASING.snappy
        }, '-=0.3');

        // Highlights stagger
        tl.to('.exp-highlight', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: GSAP_EASING.elegant
        }, '-=0.2');

        // Hover effect for highlights
        const highlights = gsap.utils.toArray('.exp-highlight');
        highlights.forEach((hl: any) => {
          hl.addEventListener('mouseenter', () => {
            gsap.to(hl, { y: -5, duration: 0.3, ease: GSAP_EASING.elegant });
          });
          hl.addEventListener('mouseleave', () => {
            gsap.to(hl, { y: 0, duration: 0.3, ease: GSAP_EASING.bouncy });
          });
        });

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }
}
