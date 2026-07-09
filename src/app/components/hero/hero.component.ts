import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly contact = CONTACT;

  readonly stats = [
    { value: '8+', label: 'Projects' },
    { value: '5', label: 'Live Demos' },
    { value: '300+', label: 'Test Cases' },
    { value: 'ECPC', label: 'Finalist' },
  ];

  readonly techBadges = ['.NET', 'Angular', 'SignalR', 'Redis', 'Docker'];

  // .NET C# snippet — shows first
  private readonly dotnetLines: { html: string }[] = [
    { html: '<span class="text-text-muted">// Wasla — QR Check-In Hub</span>' },
    { html: '<span class="text-accent-2">[Authorize</span>(<span class="text-success">Roles</span> = <span class="text-accent-2">nameof</span>(<span class="text-[#e0b0ff]">UserRole</span>.<span class="text-[#7fd3ff]">Driver</span>))<span class="text-accent-2">]</span>' },
    { html: '<span class="text-accent-2">public class</span> <span class="text-[#e0b0ff]">QueueHub</span> : <span class="text-[#7fd3ff]">Hub</span>' },
    { html: '{' },
    { html: '&nbsp;&nbsp;<span class="text-accent-2">private readonly</span> <span class="text-[#7fd3ff]">IQueueService</span> _queue;' },
    { html: '' },
    { html: '&nbsp;&nbsp;<span class="text-accent-2">public async</span> <span class="text-[#7fd3ff]">Task</span> <span class="text-[#e0b0ff]">JoinRoute</span>(<span class="text-accent-2">string</span> routeId)' },
    { html: '&nbsp;&nbsp;{' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-accent-2">await</span> Groups.<span class="text-[#7fd3ff]">AddToGroupAsync</span>(' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Context.ConnectionId, routeId);' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-accent-2">await</span> _queue.<span class="text-[#7fd3ff]">BroadcastPositionsAsync</span>(routeId);' },
    { html: '&nbsp;&nbsp;}' },
    { html: '}' },
  ];

  // Angular TypeScript snippet
  private readonly angularLines: { html: string }[] = [
    { html: '<span class="text-text-muted">// Wasla Platform — Real-time Core</span>' },
    { html: '<span class="text-accent-2">@Injectable</span>({ providedIn: <span class="text-success">\'root\'</span> })' },
    { html: '<span class="text-accent-2">export class</span> <span class="text-[#e0b0ff]">QueueService</span> {' },
    { html: '&nbsp;&nbsp;<span class="text-accent-2">private</span> hub = <span class="text-[#7fd3ff]">inject</span>(SignalRService);' },
    { html: '' },
    { html: '&nbsp;&nbsp;<span class="text-[#7fd3ff]">connectDriver</span>(driverId: <span class="text-accent-2">string</span>) {' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-accent-2">return this</span>.hub' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.on(<span class="text-success">\'ReceiveQueueUpdate\'</span>)' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.pipe(filter(e => e.driverId === driverId));' },
    { html: '&nbsp;&nbsp;}' },
    { html: '}' },
    { html: '' },
    { html: '' },
  ];

  // 'dotnet' shows first
  activeSnippet = signal<'dotnet' | 'angular'>('dotnet');
  snippetVisible = signal(true);

  readonly snippetLabel = computed(() =>
    this.activeSnippet() === 'dotnet' ? 'QueueHub.cs' : 'queue.service.ts',
  );

  readonly visibleLines = computed(() =>
    this.activeSnippet() === 'dotnet' ? this.dotnetLines : this.angularLines,
  );

  private readonly phrases = [
    'Building real-time platforms',
    'Shipping production systems',
    'Designing scalable APIs',
  ];

  typedText = signal('');
  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.tick();
    this.scheduleSnippetSwitch();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.snippetTimer) clearInterval(this.snippetTimer);
  }

  private tick(): void {
    const current = this.phrases[this.phraseIndex];

    if (!this.deleting) {
      this.charIndex++;
      this.typedText.set(current.slice(0, this.charIndex));
      if (this.charIndex === current.length) {
        this.deleting = true;
        this.timer = setTimeout(() => this.tick(), 1800);
        return;
      }
    } else {
      this.charIndex--;
      this.typedText.set(current.slice(0, this.charIndex));
      if (this.charIndex === 0) {
        this.deleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      }
    }

    this.timer = setTimeout(() => this.tick(), this.deleting ? 45 : 90);
  }

  private snippetTimer?: ReturnType<typeof setInterval>;

  private scheduleSnippetSwitch(): void {
    this.snippetTimer = setInterval(() => {
      // fade out
      this.snippetVisible.set(false);
      setTimeout(() => {
        // swap snippet
        this.activeSnippet.update(s => (s === 'dotnet' ? 'angular' : 'dotnet'));
        // fade in
        this.snippetVisible.set(true);
      }, 350);
    }, 5000);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
