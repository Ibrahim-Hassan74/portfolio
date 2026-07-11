import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spotlight', { static: true }) spotlight!: ElementRef<HTMLDivElement>;
  
  private zone = inject(NgZone);
  private mouseMoveHandler?: (e: MouseEvent) => void;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.mouseMoveHandler = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Fade in the spotlight on the first mouse movement
        if (this.spotlight.nativeElement.style.opacity === '0' || this.spotlight.nativeElement.style.opacity === '') {
          this.spotlight.nativeElement.style.opacity = '1';
        }

        // Update gradient center
        this.spotlight.nativeElement.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(108, 99, 255, 0.12), transparent 80%)`;
      };

      window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    });
  }

  ngOnDestroy() {
    if (this.mouseMoveHandler && typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }
}
