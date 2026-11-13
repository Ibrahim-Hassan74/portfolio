import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './education.component.html',
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  readonly certifications = [
    'C# Development — Udemy 2025',
    'ASP.NET Core Web API — Udemy 2025',
    'Angular Development — Udemy 2025',
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
            trigger: this.el.nativeElement,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        });

        tl.to('.edu-header', {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: GSAP_EASING.elegant
        })
        .to('.edu-card', {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: GSAP_EASING.snappy
        }, '-=0.3')
        .to('.edu-cert', {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.12,
          ease: GSAP_EASING.bouncy
        }, '-=0.25');

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }
}
