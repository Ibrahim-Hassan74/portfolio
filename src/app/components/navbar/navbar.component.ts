import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';
import { MagneticDirective } from '../../directives/magnetic.directive';

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  readonly cv = CONTACT.cv;
  readonly contact = CONTACT;

  readonly links: NavLink[] = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  mobileOpen = signal(false);
  activeSection = signal('hero');

  @ViewChild('header', { static: true }) header!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;
  private ctx!: gsap.Context;
  private zone = inject(NgZone);

  mobileMenuTl?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        // Entrance animation
        gsap.from(this.header.nativeElement, {
          yPercent: -100,
          opacity: 0,
          duration: 1,
          ease: GSAP_EASING.snappy,
        });

        // Mobile Menu Timeline
        this.mobileMenuTl = gsap.timeline({ paused: true, reversed: true })
          .fromTo('.mobile-menu', 
            { display: 'none', opacity: 0 },
            { display: 'flex', opacity: 1, duration: 0.3, ease: 'power2.inOut' }
          )
          .fromTo('.mobile-link', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: GSAP_EASING.snappy },
            '-=0.1'
          )
          .fromTo('.mobile-cta a, .mobile-cta button', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: GSAP_EASING.elegant },
            '-=0.2'
          );
      });
    });

    const ids = ['hero', ...this.links.map((l) => l.id)];
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.zone.run(() => {
              this.activeSection.set(entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.ctx) this.ctx.revert();
  }

  scrollTo(id: string): void {
    if (this.mobileOpen()) {
      this.mobileOpen.set(false);
      this.mobileMenuTl?.reverse();
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMobile(): void {
    const isOpening = !this.mobileOpen();
    this.mobileOpen.set(isOpening);
    
    if (isOpening) {
      this.mobileMenuTl?.play();
    } else {
      this.mobileMenuTl?.reverse();
    }
  }
}
