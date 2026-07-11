import { Directive, ElementRef, Input, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[gsapScroll]',
  standalone: true
})
export class GsapScrollDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  @Input() gsapDelay: number = 0;
  @Input() gsapY: number = 30;

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        gsap.fromTo(this.el.nativeElement, 
          { y: this.gsapY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: this.gsapDelay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: this.el.nativeElement,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
