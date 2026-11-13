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

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
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
  isLightMode = signal(false);

  @ViewChild('header', { static: true }) header!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;
  private ctx!: gsap.Context;
  private zone = inject(NgZone);

  mobileMenuTl?: gsap.core.Timeline;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersLight = savedTheme === 'light';
      this.isLightMode.set(prefersLight);
      document.documentElement.classList.toggle('light', prefersLight);
    }
  }

  toggleTheme(): void {
    const nextLight = !this.isLightMode();
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const applyTheme = () => {
        root.classList.add('theme-switching');
        this.isLightMode.set(nextLight);
        root.classList.toggle('light', nextLight);
        localStorage.setItem('theme', nextLight ? 'light' : 'dark');
        // Force synchronous style recalculation so all elements switch in the exact same frame
        void root.offsetHeight;
        requestAnimationFrame(() => {
          root.classList.remove('theme-switching');
        });
      };

      const docAny = document as any;
      if (typeof docAny.startViewTransition === 'function') {
        docAny.startViewTransition(() => applyTheme());
      } else {
        applyTheme();
      }
    }
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        // Entrance animation
        gsap.from(this.header.nativeElement, {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: GSAP_EASING.snappy,
        });
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
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  scrollTo(id: string): void {
    if (this.mobileOpen()) {
      this.closeMobile();
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMobile(): void {
    const isOpening = !this.mobileOpen();
    this.mobileOpen.set(isOpening);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpening ? 'hidden' : '';
    }
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
