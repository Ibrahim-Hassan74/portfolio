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
            trigger: '.contact-info',
            endTrigger: this.el.nativeElement,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        });

        // Background glow entrance and continuous floating
        tl.to('.contact-glow', {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut'
        });

        gsap.to('.contact-glow', {
          y: -20,
          x: 10,
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // Left info reveal
        tl.to('.contact-info', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.elegant
        }, 0);

        // Stagger links
        tl.to('.contact-link', {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: GSAP_EASING.snappy
        }, 0.2);

        // Stagger social buttons
        tl.to('.contact-social', {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: GSAP_EASING.bouncy
        }, 0.4);

        // Right CTA card reveal
        tl.to('.contact-cta', {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: GSAP_EASING.elegant
        }, 0.1);

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
