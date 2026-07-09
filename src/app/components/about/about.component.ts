import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { CONTACT } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LucideAngularModule, ScrollAnimateDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly profileImage = CONTACT.profileImage;
  readonly quickFacts: { icon: string; text: string; url?: string }[] = [
    { icon: 'graduation-cap', text: 'B.Sc IT, Minia University, 2026' },
    { icon: 'award', text: 'ECPC Finalist 2024', url: 'https://drive.google.com/file/d/1Vc6Tc7DMcvd354QlbvN2AOpACGzvyKt1/view' },
    { icon: 'building', text: 'AAIB Banking Internship 2025', url: 'https://drive.google.com/file/d/182TijwXWvkLnO1b3LTIz8sGnuYNwCYy2/view' },
    { icon: 'globe', text: 'Arabic (Native) · English' },
  ];

  readonly values = [
    {
      icon: 'server',
      title: 'Backend Expert',
      text: 'ASP.NET Core, Clean Architecture, SignalR, Redis, Docker',
    },
    {
      icon: 'zap',
      title: 'Full Stack',
      text: 'Angular to SQL Server — end to end ownership',
    },
    {
      icon: 'test-tube',
      title: 'Test-Driven',
      text: '300+ xUnit cases, Moq, FluentAssertions, integration testing',
    },
  ];
}
