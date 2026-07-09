import { Component, computed, signal, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { ProjectCardComponent } from './project-card/project-card.component';
import {
  PROJECTS,
  PROJECT_TABS,
  ProjectCategory,
  SMALL_PROJECTS,
} from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule, ScrollAnimateDirective, ProjectCardComponent],
  templateUrl: './projects.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent {
  readonly tabs = PROJECT_TABS;
  readonly smallProjects = SMALL_PROJECTS;

  @ViewChild('featuredSwiper') featuredSwiper?: ElementRef<any>;

  activeTab = signal<'all' | ProjectCategory>('all');

  filteredProjects = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(tab));
  });

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
