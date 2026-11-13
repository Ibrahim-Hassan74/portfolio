import { AfterViewInit, Component, computed, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCardComponent } from './project-card/project-card.component';
import {
  PROJECTS,
  PROJECT_TABS,
  Project,
  ProjectCategory,
  SMALL_PROJECTS,
} from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements AfterViewInit {
  readonly tabs = PROJECT_TABS;
  readonly smallProjects = SMALL_PROJECTS;

  activeTab = signal<'all' | ProjectCategory>('all');
  selectedProjectId = signal<string>(PROJECTS[0]?.id ?? '');
  mobileExpandedId = signal<string | null>(PROJECTS[0]?.id ?? null);
  expandedSmallTitle = signal<string | null>(null);

  filteredProjects = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(tab));
  });

  activeProject = computed<Project | undefined>(() => {
    const list = this.filteredProjects();
    if (!list.length) return undefined;
    const found = list.find((p) => p.id === this.selectedProjectId());
    return found ?? list[0];
  });

  activeProjectIndex = computed<number>(() => {
    const list = this.filteredProjects();
    const active = this.activeProject();
    if (!active) return 0;
    const idx = list.findIndex((p) => p.id === active.id);
    return idx >= 0 ? idx : 0;
  });

  ngAfterViewInit(): void {
    this.refreshScrollTriggers();
  }

  setTab(tab: 'all' | ProjectCategory): void {
    this.activeTab.set(tab);
    const list = tab === 'all' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(tab));
    if (list.length) {
      this.selectedProjectId.set(list[0].id);
      this.mobileExpandedId.set(list[0].id);
    }
    this.refreshScrollTriggers();
  }

  selectProject(id: string): void {
    this.selectedProjectId.set(id);
    this.refreshScrollTriggers();
  }

  toggleMobileProject(id: string): void {
    this.mobileExpandedId.update((current) => (current === id ? null : id));
    this.refreshScrollTriggers();
  }

  toggleSmallProject(title: string): void {
    this.expandedSmallTitle.update((current) => (current === title ? null : title));
    this.refreshScrollTriggers();
  }

  formatIndex(i: number): string {
    return (i + 1).toString().padStart(2, '0');
  }

  private refreshScrollTriggers(): void {
    if (typeof window === 'undefined') return;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
}
