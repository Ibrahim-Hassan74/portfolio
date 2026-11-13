import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { CONTACT } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  readonly contact = CONTACT;
  copied = signal(false);

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

        tl.to('.contact-glow', {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 0);

        gsap.to('.contact-glow', {
          y: -20,
          x: 10,
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        tl.to('.contact-info', {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: GSAP_EASING.elegant
        }, 0)
        .to('.contact-cta', {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: GSAP_EASING.elegant
        }, 0.1)
        .to('.contact-link', {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.1,
          ease: GSAP_EASING.snappy
        }, 0.2)
        .to('.contact-social', {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.1,
          ease: GSAP_EASING.bouncy
        }, 0.35);

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }

  copyEmail() {
    navigator.clipboard.writeText(this.contact.email).then(() => {
      this.copied.set(true);
      
      gsap.fromTo('.text-success', 
        { scale: 0.5, rotation: -45 }, 
        { scale: 1, rotation: 0, duration: 0.4, ease: GSAP_EASING.bouncy }
      );

      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
