import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { CONTACT } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  readonly contact = CONTACT;
  @ViewChild('scrollTopBtn') scrollTopBtn!: ElementRef<HTMLButtonElement>;

  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        
        // Footer Entrance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 95%',
            toggleActions: 'play reverse play reverse'
          }
        });

        tl.to('.footer-text', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.elegant
        })
        .to('.footer-link', {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: GSAP_EASING.snappy
        }, '-=0.4');

        ScrollTrigger.create({
          start: 500,
          end: 99999, 
          onEnter: () => {
            gsap.to(this.scrollTopBtn.nativeElement, {
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.4,
              ease: GSAP_EASING.bouncy
            });
          },
          onLeaveBack: () => {
            gsap.to(this.scrollTopBtn.nativeElement, {
              y: 20,
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.3,
              ease: 'power2.in'
            });
          }
        });

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
