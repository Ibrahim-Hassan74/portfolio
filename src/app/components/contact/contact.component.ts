import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { CONTACT } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, ScrollAnimateDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly contact = CONTACT;
}
