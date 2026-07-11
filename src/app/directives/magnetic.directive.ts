import { Directive, ElementRef, HostListener, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[magnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngOnInit() {
    this.ctx = gsap.context(() => {});
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.zone.runOutsideAngular(() => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = this.el.nativeElement.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.3;
      const y = (clientY - (top + height / 2)) * 0.3;

      this.ctx.add(() => {
        gsap.to(this.el.nativeElement, {
          x,
          y,
          duration: 1,
          ease: 'power3.out'
        });
      });
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.zone.runOutsideAngular(() => {
      this.ctx.add(() => {
        gsap.to(this.el.nativeElement, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  ngOnDestroy() {
    this.ctx.revert();
  }
}
