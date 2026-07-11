import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Project } from '../../../data/portfolio.data';
import { gsap } from 'gsap';
import { MagneticDirective } from '../../../directives/magnetic.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) project!: Project;
  @ViewChild('card', { static: true }) card!: ElementRef<HTMLElement>;

  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        const el = this.card.nativeElement;
        const title = el.querySelector('h3');
        const techBadges = el.querySelectorAll('.mt-4 span.border');
        const buttons = el.querySelectorAll('.mt-6 a');

        // Entrance animation for card contents
        const contents = Array.from(el.children).filter(child => !child.classList.contains('animate-pulse'));
        gsap.from(contents, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        });

        el.addEventListener('mouseenter', (e) => {
          gsap.to(el, {
            y: -10,
            rotationX: 2,
            rotationY: -1,
            boxShadow: this.project.featured 
              ? '0 15px 40px rgba(108,99,255,0.25)' 
              : '0 15px 40px rgba(255,255,255,0.05)',
            duration: 0.4,
            ease: 'power3.out'
          });

          // Animate inner elements
          if (title) gsap.to(title, { x: 5, duration: 0.3, ease: 'power2.out' });
          if (techBadges.length) gsap.to(techBadges, { y: -2, stagger: 0.03, duration: 0.3, ease: 'back.out(2)' });
          if (buttons.length) gsap.to(buttons, { scale: 1.02, y: -2, stagger: 0.05, duration: 0.3, ease: 'back.out(2)' });
        });

        el.addEventListener('mousemove', (e) => {
          // Slight 3D tilt effect following cursor
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;

          gsap.to(el, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.1,
            ease: 'none'
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            y: 0,
            rotationX: 0,
            rotationY: 0,
            boxShadow: this.project.featured 
              ? '0 0 30px rgba(108,99,255,0.12)' 
              : '0 0 0px rgba(0,0,0,0)',
            duration: 0.5,
            ease: 'back.out(1.5)'
          });

          // Reset inner elements
          if (title) gsap.to(title, { x: 0, duration: 0.4, ease: 'power2.out' });
          if (techBadges.length) gsap.to(techBadges, { y: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out' });
          if (buttons.length) gsap.to(buttons, { scale: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' });
        });

      }, this.card.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }
}
