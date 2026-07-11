import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './about.component.html',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  readonly profileImage = CONTACT.profileImage;
  readonly quickFacts: { icon: string; text: string; url?: string }[] = [
    { icon: 'graduation-cap', text: 'B.Sc IT, Minia University, 2026' },
    { icon: 'award', text: 'ECPC Finalist 2024', url: 'https://drive.google.com/file/d/1Vc6Tc7DMcvd354QlbvN2AOpACGzvyKt1/view' },
    { icon: 'building', text: 'AAIB Banking Internship 2025', url: 'https://drive.google.com/file/d/182TijwXWvkLnO1b3LTIz8sGnuYNwCYy2/view' },
    { icon: 'globe', text: 'Arabic (Native) · English' },
  ];

  readonly values = [
    {
      icon: 'server',
      title: 'Backend Expert',
      text: 'ASP.NET Core, Clean Architecture, SignalR, Redis, Docker',
    },
    {
      icon: 'zap',
      title: 'Full Stack',
      text: 'Angular to SQL Server — end to end ownership',
    },
    {
      icon: 'test-tube',
      title: 'Test-Driven',
      text: '300+ xUnit cases, Moq, FluentAssertions, integration testing',
    },
  ];

  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        
        // Image parallax effect on scroll
        gsap.to('.about-img', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse'
          }
        });

        // Image and location badge
        tl.to('.about-img', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: GSAP_EASING.elegant
        });

        // Stagger text items
        tl.to('.about-text', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: GSAP_EASING.snappy
        }, '-=0.4');

        // Stagger quick facts
        tl.to('.about-fact', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: GSAP_EASING.bouncy
        }, '-=0.2');

        // Stagger core values
        tl.to('.about-value', {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: GSAP_EASING.elegant
        }, '-=0.2');

        // Hover effect for values to replace Tailwind's -translate-y-1
        const valuesCards = gsap.utils.toArray('.about-value');
        valuesCards.forEach((card: any) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -4, duration: 0.3, ease: GSAP_EASING.elegant });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: GSAP_EASING.bouncy });
          });
        });

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }
}
