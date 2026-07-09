import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly contact = CONTACT;

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
