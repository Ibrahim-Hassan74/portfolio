import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { SKILL_CATEGORIES } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  readonly categories = SKILL_CATEGORIES;
}
