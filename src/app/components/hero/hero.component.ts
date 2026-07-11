import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT } from '../../data/portfolio.data';
import { gsap } from 'gsap';
import { GSAP_EASING } from '../../utils/gsap.utils';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly contact = CONTACT;

  readonly stats = [
    { num: 8, suffix: '+', text: '', label: 'Projects', isNumber: true },
    { num: 5, suffix: '', text: '', label: 'Live Demos', isNumber: true },
    { num: 300, suffix: '+', text: '', label: 'Test Cases', isNumber: true },
    { num: 0, suffix: '', text: 'ECPC', label: 'Finalist', isNumber: false },
  ];

  readonly techBadges = ['.NET', 'Angular', 'SignalR', 'Redis', 'Docker'];

  // .NET C# snippet
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

  activeSnippet = signal<'dotnet' | 'angular'>('dotnet');
  typedSnippetLines = signal<{html: string}[]>([]);

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
  private snippetTimer?: ReturnType<typeof setTimeout>;
  
  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private ctx!: gsap.Context;

  ngOnInit(): void {
    this.tick();
    this.typeSnippet();
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Background glows
        tl.to('.hero-bg', {
          opacity: 0.4,
          duration: 2,
          ease: 'power2.inOut',
          stagger: 0.2
        }, 0);

        // Continuous subtle float on background
        gsap.to('.hero-bg', {
          y: -20,
          x: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.5
        });

        // Stagger in text and buttons
        tl.from('.hero-item', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: GSAP_EASING.snappy
        }, 0.2);

        // Visual (Code snippet) entrance
        tl.from('.hero-visual', {
          scale: 0.95,
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: GSAP_EASING.elegant
        }, 0.6);

        // Tech badges stagger
        tl.from('.hero-badge', {
          scale: 0.8,
          opacity: 0,
          y: 10,
          duration: 0.6,
          stagger: 0.1,
          ease: GSAP_EASING.bouncy
        }, 1.2);

        // Animate numbers
        const statNumbers = gsap.utils.toArray('.stat-number');
        statNumbers.forEach((el: any) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          gsap.to(el, {
            innerHTML: target,
            duration: 3.5,
            delay: 1.2,
            snap: { innerHTML: 1 },
            ease: "power2.out"
          });
        });
        
      }, this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.snippetTimer) clearTimeout(this.snippetTimer);
    if (this.ctx) this.ctx.revert();
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

  private tokenizeHtml(html: string): string[] {
    const tokens: string[] = [];
    let currentToken = '';
    let inTag = false;
    let inEntity = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];
      if (char === '<') {
        inTag = true;
        currentToken = char;
      } else if (char === '>') {
        inTag = false;
        currentToken += char;
        tokens.push(currentToken);
        currentToken = '';
      } else if (char === '&' && !inTag) {
        inEntity = true;
        currentToken = char;
      } else if (char === ';' && inEntity) {
        inEntity = false;
        currentToken += char;
        tokens.push(currentToken);
        currentToken = '';
      } else if (inTag || inEntity) {
        currentToken += char;
      } else {
        tokens.push(char);
      }
    }
    return tokens;
  }

  private typeSnippet(): void {
    const lines = this.visibleLines();
    const tokenizedLines = lines.map(l => this.tokenizeHtml(l.html));
    
    let currentLineIdx = 0;
    let currentTokenIdx = 0;
    const currentRenderedLines: {html: string}[] = [];
    
    const typeInterval = setInterval(() => {
      if (currentLineIdx >= tokenizedLines.length) {
        clearInterval(typeInterval);
        
        this.snippetTimer = setTimeout(() => {
          this.activeSnippet.update(s => (s === 'dotnet' ? 'angular' : 'dotnet'));
          this.typeSnippet(); 
        }, 4000);
        return;
      }

      const tokens = tokenizedLines[currentLineIdx];
      
      if (currentTokenIdx === 0) {
        currentRenderedLines.push({ html: '' });
      }

      if (tokens.length > 0) {
        currentRenderedLines[currentLineIdx].html += tokens[currentTokenIdx];
      }
      
      this.typedSnippetLines.set([...currentRenderedLines]);

      currentTokenIdx++;

      if (currentTokenIdx >= tokens.length) {
        currentLineIdx++;
        currentTokenIdx = 0;
      }
    }, 15); 
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
