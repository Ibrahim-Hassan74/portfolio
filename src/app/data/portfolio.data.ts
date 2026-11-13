export type ProjectCategory = 'fullstack' | 'backend' | 'frontend' | 'nodejs';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  techStack: string[];
  achievements: string[];
  achievementGroups?: { label: string; items: string[] }[];
  ecosystem?: string[];
  githubLinks: ProjectLink[];
  liveLinks: ProjectLink[];
  featured: boolean;
  live: boolean;
  badge: string;
  categories: ProjectCategory[];
}

export interface SmallProject {
  title: string;
  tech: string[];
  description: string;
  github: string;
  live?: string;
}

export interface Skill {
  name: string;
  icon?: string;
  isLucide?: boolean;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

const FEATURED = new Set([
  'C#',
  'ASP.NET Core',
  'Angular',
  'TypeScript',
  'Docker',
  'PostgreSQL',
  'GitHub Actions (CI/CD)',
]);

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Backend',
    icon: 'hard-drive',
    skills: [
      { name: 'ASP.NET Core', icon: 'devicon-dotnetcore-plain', isLucide: false },
      { name: 'Web API', icon: 'network', isLucide: true },
      { name: 'Minimal APIs', icon: 'minimize', isLucide: true },
      { name: 'MVC', icon: 'layers', isLucide: true },
      { name: 'EF Core', icon: 'database-zap', isLucide: true },
      { name: 'Dapper', icon: 'zap', isLucide: true },
      { name: 'MediatR (CQRS)', icon: 'arrow-left-right', isLucide: true },
      { name: 'SignalR', icon: 'radio', isLucide: true },
      { name: 'Hangfire', icon: 'clock', isLucide: true },
      { name: 'FluentValidation', icon: 'check-circle', isLucide: true },
      { name: 'LINQ', icon: 'filter', isLucide: true },
      { name: 'Node.js', icon: 'devicon-nodejs-plain', isLucide: false },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'Frontend',
    icon: 'globe',
    skills: [
      { name: 'Angular', icon: 'devicon-angularjs-plain', isLucide: false },
      { name: 'TypeScript', icon: 'devicon-typescript-plain', isLucide: false },
      { name: 'Angular Signals', icon: 'satellite-dish', isLucide: true },
      { name: 'RxJS', icon: 'activity', isLucide: true },
      { name: 'TailwindCSS', icon: 'devicon-tailwindcss-original', isLucide: false },
      { name: 'SSR', icon: 'server-cog', isLucide: true },
      { name: 'Localization (i18n / RTL)', icon: 'globe-2', isLucide: true },
      { name: 'SCSS', icon: 'devicon-sass-original', isLucide: false },
      { name: 'HTML5', icon: 'devicon-html5-plain', isLucide: false },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'Databases & Caching',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', isLucide: false },
      { name: 'SQL Server', icon: 'devicon-microsoftsqlserver-plain', isLucide: false },
      { name: 'Redis', icon: 'devicon-redis-plain', isLucide: false },
      { name: 'PL/pgSQL Stored Functions', icon: 'database-zap', isLucide: true },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'Auth & Security',
    icon: 'shield',
    skills: [
      { name: 'JWT & Refresh Token Rotation', icon: 'key', isLucide: true },
      { name: 'OAuth 2.0', icon: 'devicon-oauth-plain', isLucide: false },
      { name: 'ASP.NET Identity', icon: 'user-check', isLucide: true },
      { name: 'RBAC & IDOR Defense', icon: 'users', isLucide: true },
      { name: 'AES-GCM Encryption', icon: 'lock', isLucide: true },
      { name: 'Rate Limiting', icon: 'shield', isLucide: true },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'Testing & Quality',
    icon: 'test-tube',
    skills: [
      { name: 'xUnit', icon: 'flask-conical', isLucide: true },
      { name: 'Moq', icon: 'ghost', isLucide: true },
      { name: 'FluentAssertions', icon: 'check-circle', isLucide: true },
      { name: 'Integration Testing', icon: 'combine', isLucide: true },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'DevOps & CI/CD',
    icon: 'cpu',
    skills: [
      { name: 'GitHub Actions (CI/CD)', icon: 'workflow', isLucide: true },
      { name: 'Docker', icon: 'devicon-docker-plain', isLucide: false },
      { name: 'Docker Compose', icon: 'layers', isLucide: true },
      { name: 'Git & GitHub', icon: 'devicon-git-plain', isLucide: false },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'Tools & AI Workflow',
    icon: 'zap',
    skills: [
      { name: 'Swagger/OpenAPI', icon: 'book-open', isLucide: true },
      { name: 'Serilog & Seq', icon: 'scroll-text', isLucide: true },
      { name: 'AutoMapper', icon: 'copy-check', isLucide: true },
      { name: 'Google Antigravity', icon: 'sparkles', isLucide: true },
      { name: 'Claude Code', icon: 'bot', isLucide: true },
      { name: 'GitHub Copilot', icon: 'cpu', isLucide: true },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
  {
    category: 'Languages',
    icon: 'code-2',
    skills: [
      { name: 'C#', icon: 'devicon-csharp-plain', isLucide: false },
      { name: 'TypeScript', icon: 'devicon-typescript-plain', isLucide: false },
      { name: 'JavaScript', icon: 'devicon-javascript-plain', isLucide: false },
      { name: 'SQL', icon: 'devicon-azuresqldatabase-plain', isLucide: false },
      { name: 'C++', icon: 'devicon-cplusplus-plain', isLucide: false },
      { name: 'Java', icon: 'devicon-java-plain', isLucide: false },
    ].map((s) => ({ ...s, featured: FEATURED.has(s.name) })),
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'ticketflow',
    title: 'TicketFlow — Enterprise Support Ticket Platform',
    oneLiner:
      'High-performance Clean Architecture + Hybrid CQRS platform with EF Core, Dapper, PostgreSQL 17, and Angular',
    description:
      'An enterprise customer support ticket management platform built on ASP.NET Core 10, PostgreSQL 17, and Clean 4-Layer Architecture. Engineered with a hybrid CQRS pipeline separating EF Core transactional writes from sub-millisecond Dapper reads powered by 11 native PL/pgSQL stored functions, backed by 328 automated tests and GitHub Actions CI/CD.',
    techStack: [
      '.NET 10',
      'C#',
      'PostgreSQL 17',
      'Dapper',
      'EF Core',
      'MediatR (CQRS)',
      'Angular',
      'Docker Compose',
      'GitHub Actions',
      'xUnit',
      'Serilog',
    ],
    achievements: [
      'Hybrid CQRS: EF Core 10 write path + Dapper & 11 PL/pgSQL stored functions for zero-tracking reads (60% lower query latency)',
      'Optimistic concurrency control via PostgreSQL row-version triggers mapped to RFC 7807 HTTP 409 Conflict',
      'Strict security: JWT + Refresh Token rotation, 3-tier RBAC, horizontal customer IDOR isolation & IP rate limiting (15 req/s)',
      '328 automated tests (100% green: 272 unit, 43 API, 13 PostgreSQL E2E integration tests) + GitHub Actions CI/CD',
    ],
    ecosystem: [
      'Backend: ASP.NET Core 10 + CQRS',
      'Database: PostgreSQL 17 + Dapper',
      'Frontend: Angular (TicketHub)',
      'DevOps: Docker + GitHub Actions',
    ],
    githubLinks: [
      {
        label: 'Backend (TicketFlow)',
        url: 'https://github.com/Ibrahim-Hassan74/TicketFlow',
      },
      {
        label: 'Frontend (TicketHub)',
        url: 'https://github.com/Ibrahim-Hassan74/TicketHub',
      },
    ],
    liveLinks: [
      { label: 'Live App', url: 'https://ticket--hub.web.app' },
      { label: 'Swagger API', url: 'https://support-ticket.runasp.net/swagger/index.html' },
    ],
    featured: true,
    live: true,
    badge: 'FEATURED · ENTERPRISE CQRS',
    categories: ['fullstack', 'backend', 'frontend'],
  },
  {
    id: 'wasla',
    title: 'Wasla — Smart Microbus Platform',
    oneLiner:
      "Real-time bilingual transportation management system for Egypt's microbus network",
    description:
      'A 5-application distributed ecosystem serving real users in Arabic and English. The backend manages AES-GCM encrypted QR check-in/out workflows, live GPS tracking with OSRM ETA calculation, 4 concurrent SignalR hubs, role-based access for 5 user types, and daily automated queue resets.',
    techStack: [
      '.NET',
      'C#',
      'SignalR',
      'Redis',
      'SQL Server',
      'EF Core',
      'Docker',
      'JWT',
      'Hangfire',
      'Angular',
      'Arabic/English i18n',
    ],
    achievements: [
      '11 controllers · 16 domain entities · 86 DTOs across 3 Clean Architecture layers with Arabic/English localization',
      '4 concurrent SignalR hubs pushing live queue, GPS, and ETA data simultaneously',
      'AES-GCM encrypted QR tokens — single scan triggers 4 atomic SignalR broadcasts',
      'OSRM routing + Haversine deduplication + Redis 4h TTL caching pipeline',
    ],
    ecosystem: [
      'Backend: ASP.NET Core',
      'Dashboard: Angular',
      'Mobile: Flutter',
      'Messaging: Node.js + Angular',
    ],
    githubLinks: [
      {
        label: 'GitHub (Backend)',
        url: 'https://github.com/Ibrahim-Hassan74/GraduationProject',
      },
    ],
    liveLinks: [
      { label: 'Live Swagger API', url: 'https://smart-microbus.runasp.net/swagger/index.html' },
    ],
    featured: true,
    live: true,
    badge: 'FEATURED PROJECT · LIVE',
    categories: ['backend', 'fullstack'],
  },
  {
    id: 'estorex',
    title: 'E-StoreX — Enterprise E-Commerce Platform',
    oneLiner:
      'Full-stack bilingual e-commerce: ASP.NET Core enterprise API + Angular SPA with live Stripe payments',
    description:
      'Complete end-to-end ownership: 140+ API endpoints on the backend, 20+ lazy-loaded Angular feature modules on the frontend with full Arabic RTL & English localization. Real Stripe payment processing with webhooks, Google + GitHub OAuth, 250+ automated test cases, and a deployed live demo.',
    techStack: [
      '.NET',
      'C#',
      'Angular',
      'Stripe',
      'Redis',
      'OAuth',
      'xUnit',
      'Hangfire',
      'TailwindCSS',
      'Arabic/English i18n',
    ],
    achievements: [],
    achievementGroups: [
      {
        label: 'Backend',
        items: [
          '140+ endpoints · 3 auth providers (JWT + Google + GitHub OAuth) · Stripe Webhooks',
          '250+ xUnit test cases — unit, service, and integration layers (90%+ reliability)',
        ],
      },
      {
        label: 'Frontend',
        items: [
          'Angular Signals-based state — 40% fewer change detection cycles + Arabic/English RTL/LTR',
          'Multi-step Stripe checkout · SSR + Lazy Loading → 50% FCP improvement',
        ],
      },
    ],
    githubLinks: [
      { label: 'Backend (GitHub)', url: 'https://github.com/Ibrahim-Hassan74/EStoreX' },
      { label: 'Frontend (GitHub)', url: 'https://github.com/Ibrahim-Hassan74/E-StoreX' },
    ],
    liveLinks: [
      { label: 'Live Demo', url: 'https://e-store-x.web.app' },
      { label: 'Swagger API', url: 'https://estorex.runasp.net/swagger/index.html' },
    ],
    featured: false,
    live: true,
    badge: 'FULL STACK · LIVE',
    categories: ['fullstack', 'frontend', 'backend'],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Messaging Infrastructure',
    oneLiner:
      'Self-healing headless WhatsApp engine + ASP.NET Core gateway + Angular real-time dashboard',
    description:
      'A 3-repo distributed messaging system: a Node.js service automating WhatsApp Web via Puppeteer (with zombie detection and exponential backoff), an ASP.NET Core orchestration gateway logging every message to SQL Server, and an Angular dashboard showing live QR codes via SignalR for admin authentication.',
    techStack: [
      'Node.js',
      'Puppeteer',
      'ASP.NET Core',
      'Angular',
      'SignalR',
      'Docker',
      'JWT',
    ],
    achievements: [
      '6-state machine: INITIALIZING → QR_PENDING → CONNECTED → ZOMBIE → DESTROYING → READY',
      '45s heartbeat · 5 failure threshold · 10s–120s exponential backoff recovery',
      'Angular dashboard: real-time QR updates via SignalR · JWT guards · containerized deployment',
      'Session persistence — no QR re-scan on restart',
    ],
    githubLinks: [
      { label: 'Node.js Engine', url: 'https://github.com/Ibrahim-Hassan74/whatsapp-service' },
      { label: 'ASP.NET Gateway', url: 'https://github.com/Ibrahim-Hassan74/whatsapp-sender' },
      { label: 'Angular Dashboard', url: 'https://github.com/Ibrahim-Hassan74/whatsapp-client' },
    ],
    liveLinks: [],
    featured: false,
    live: false,
    badge: 'MULTI-SERVICE',
    categories: ['nodejs', 'backend'],
  },
  {
    id: 'laundry',
    title: 'Laundry Management System',
    oneLiner:
      'Full bilingual MVC SaaS for laundry businesses — invoicing, WhatsApp notifications, and automated reporting',
    description:
      'A 3-layer ASP.NET Core MVC application for laundry operations across Hotels, Apartments, and Regions, with full Arabic RTL + English bilingual UI, WhatsApp & MailKit notifications, Rotativa PDF invoice generation, ClosedXML Excel reports, Hangfire.Console scheduled jobs, and role-based MVC Areas.',
    techStack: [
      'ASP.NET Core MVC',
      'Hangfire',
      'EF Core',
      'SQL Server',
      'AutoMapper',
      'Arabic/English i18n',
      'Rotativa PDF',
      'ClosedXML Excel',
      'WhatsApp API',
    ],
    achievements: [
      '3 roles (Admin, Owner, Employee) across dedicated MVC Areas with ASP.NET Identity isolation',
      '10+ business services covering hotel/apartment pricing, invoice repricing, and debtor tracking',
      '4 Hangfire background jobs automating daily/monthly invoicing, PDF/Excel reports, and WhatsApp alerts',
      'Bilingual Arabic (RTL) + English localization using IStringLocalizer & .resx resources',
    ],
    githubLinks: [
      { label: 'GitHub', url: 'https://github.com/Ibrahim-Hassan74' },
    ],
    liveLinks: [],
    featured: false,
    live: false,
    badge: 'FREELANCE · .NET MVC',
    categories: ['fullstack', 'backend'],
  },
];

export const SMALL_PROJECTS: SmallProject[] = [
  {
    title: 'Quizzes API',
    tech: ['ASP.NET Core', 'Minimal APIs', 'EF Core', 'SQL Server', 'Rate Limiting'],
    description:
      'Minimal API quiz backend using MapGroup route organization, endpoint filters for DTO validation, and a fixed-window rate limiter (3 req/s). Full CRUD with nested Question/Option entities.',
    github: 'https://github.com/Ibrahim-Hassan74/QuizzesApi',
  },
  {
    title: 'Contacts Manager',
    tech: ['ASP.NET Core MVC', 'xUnit', 'Moq', 'Identity'],
    description:
      '50 unit tests + 3 integration tests across 3 test project layers (controller, service, integration). ASP.NET Core MVC with ASP.NET Identity and full CRUD workflows.',
    github: 'https://github.com/Ibrahim-Hassan74/Contacts-Manager',
    live: 'http://contactsmanager.runasp.net/',
  },
  {
    title: 'Security Algorithms Suite',
    tech: ['.NET WinForms', 'MathNet.Numerics', 'RSA', 'Hill Cipher', 'AES'],
    description:
      'Desktop cryptography suite implementing RSA, Hill Cipher, PlayFair, Affine, Caesar, and more with an ICipherService interface pattern.',
    github: 'https://github.com/Ibrahim-Hassan74',
  },
  {
    title: 'Bike Store',
    tech: ['HTML', 'CSS', 'JavaScript', 'Axios', 'JWT', 'PHP', 'MySQL'],
    description:
      'Full-stack bike shop — Vanilla JS frontend with JWT auth, admin panel, and PHP/MySQL backend. First full-stack project.',
    github: 'https://github.com/Ibrahim-Hassan74',
  },
];

export const PROJECT_TABS: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: '.NET Backend', value: 'backend' },
  { label: 'Angular Frontend', value: 'frontend' },
  { label: 'Node.js', value: 'nodejs' },
];

export const CONTACT = {
  email: 'ibrahimhassan.dev1@gmail.com',
  phone: '+20 102 799 2904',
  location: 'Cairo, Egypt',
  github: 'https://github.com/Ibrahim-Hassan74',
  githubHandle: '@Ibrahim-Hassan74',
  linkedin: 'https://linkedin.com/in/ibrahim-hassan-dev',
  cv: 'Ibrahim_Hassan_FullStack_Developer.pdf',
  profileImage: 'ibrahim_hassan_image.jpg',
};
