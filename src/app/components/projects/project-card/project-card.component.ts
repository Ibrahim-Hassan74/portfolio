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
  @Input() index: number = 0;

  get formattedIndex(): string {
    return (this.index + 1).toString().padStart(2, '0');
  }
}
