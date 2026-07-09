import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [LucideAngularModule, ScrollAnimateDirective],
  templateUrl: './education.component.html',
})
export class EducationComponent {
  readonly certifications = [
    'C# Development — Udemy 2025',
    'ASP.NET Core Web API — Udemy 2025',
    'Angular Development — Udemy 2025',
  ];
}
