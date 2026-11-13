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
    { icon: 'graduation-cap', text: 'B.Sc IT, Minia University (GPA: 3.4/4.0)' },
    { icon: 'award', text: 'ECPC Finalist 2024', url: 'https://drive.google.com/file/d/1Vc6Tc7DMcvd354QlbvN2AOpACGzvyKt1/view' },
    { icon: 'building', text: 'AAIB Banking Internship 2025', url: 'https://drive.google.com/file/d/182TijwXWvkLnO1b3LTIz8sGnuYNwCYy2/view' },
    { icon: 'globe', text: 'Arabic (Native) · English' },
  ];

  readonly values = [
    {
      icon: 'server',
      title: 'Backend & Architecture',
      text: 'ASP.NET Core, Clean Architecture, Hybrid CQRS (EF Core & Dapper), SignalR, Redis',
    },
    {
      icon: 'zap',
      title: 'Full-Stack & DevOps',
      text: 'Angular (Signals, SSR) to PostgreSQL & SQL Server, Docker Compose & GitHub Actions CI/CD',
    },
    {
      icon: 'test-tube',
      title: 'Test-Driven Quality',
      text: '570+ automated xUnit, Moq, FluentAssertions & full-stack PostgreSQL integration tests',
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
            trigger: this.el.nativeElement,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        });

        // Image and location badge
        tl.to('.about-img', {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: GSAP_EASING.elegant
        }, 0);

        // Stagger text items
        tl.to('.about-text', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: GSAP_EASING.snappy
        }, 0.05);

        // Stagger quick facts
        tl.to('.about-fact', {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: GSAP_EASING.bouncy
        }, 0.1);

        // Stagger core values
        tl.to('.about-value', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: GSAP_EASING.elegant
        }, 0.12);

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
