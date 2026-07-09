import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [LucideAngularModule, ScrollAnimateDirective],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  readonly bullets = [
    'Designed and delivered a complete backend using ASP.NET Core and EF Core for invoice and expense management across multiple user roles',
    'Implemented RBAC with ASP.NET Identity: Admin, Owner, Employee roles with full data isolation',
    'Built automated PDF and Excel financial reporting modules',
    'Delivered fully localized Arabic/English admin dashboards with MVC',
  ];

  readonly highlights: { icon: string; title: string; subtitle: string; meta: string; url?: string }[] = [
    {
      icon: 'award',
      title: 'ECPC Finalist',
      subtitle: 'Egyptian Collegiate Programming Contest',
      meta: '2024',
      url: 'https://drive.google.com/file/d/1Vc6Tc7DMcvd354QlbvN2AOpACGzvyKt1/view'
    },
    {
      icon: 'building',
      title: 'AAIB Banking Internship',
      subtitle: 'Arab African International Bank',
      meta: 'Cairo, Egypt · 2025',
      url: 'https://drive.google.com/file/d/182TijwXWvkLnO1b3LTIz8sGnuYNwCYy2/view'
    },
  ];
}
