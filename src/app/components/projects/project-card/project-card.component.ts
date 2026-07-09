import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Project } from '../../../data/portfolio.data';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
