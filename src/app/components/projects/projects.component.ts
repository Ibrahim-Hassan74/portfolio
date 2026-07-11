import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, ViewChild, computed, inject, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MagneticDirective } from '../../directives/magnetic.directive';
import {
  PROJECTS,
  PROJECT_TABS,
  ProjectCategory,
  SMALL_PROJECTS,
} from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASING } from '../../utils/gsap.utils';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule, ProjectCardComponent, MagneticDirective],
  templateUrl: './projects.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  readonly tabs = PROJECT_TABS;
  readonly smallProjects = SMALL_PROJECTS;

  @ViewChild('featuredSwiper') featuredSwiper?: ElementRef<any>;

  activeTab = signal<'all' | ProjectCategory>('all');

  filteredProjects = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(tab));
  });

  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        
        // Featured Projects Section
        const tlFeatured = gsap.timeline({
          scrollTrigger: {
            trigger: '.projects-header',
            endTrigger: this.el.nativeElement,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        });

        tlFeatured.to('.projects-header', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.elegant
        })
        .to('.projects-tabs', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: GSAP_EASING.snappy
        }, '-=0.3')
        .to('.projects-carousel', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: GSAP_EASING.elegant
        }, '-=0.2')
        .from('.projects-carousel .project-card', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: GSAP_EASING.bouncy
        }, '-=0.2');

        // Small Projects Section
        const tlSmall = gsap.timeline({
          scrollTrigger: {
            trigger: '.projects-small-header',
            endTrigger: this.el.nativeElement,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        });

        tlSmall.to('.projects-small-header', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: GSAP_EASING.elegant
        })
        .to('.projects-small-carousel', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: GSAP_EASING.elegant
        }, '-=0.3')
        .from('.projects-small-carousel .project-card', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: GSAP_EASING.bouncy
        }, '-=0.2');

      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }

  setTab(tab: 'all' | ProjectCategory): void {
    this.activeTab.set(tab);
    
    // Reset the Swiper to the first slide instantly when changing categories
    setTimeout(() => {
      if (this.featuredSwiper?.nativeElement?.swiper) {
        this.featuredSwiper.nativeElement.swiper.slideTo(0, 0);
      }
    });
  }
}
