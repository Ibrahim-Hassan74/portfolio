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
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

const FEATURED = new Set([
  'C#',
  'ASP.NET Core',
  'Angular',
  'TypeScript',
  'Docker',
]);

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Backend',
    skills: [
      'ASP.NET Core',
      'Web API',
      'Minimal APIs',
      'MVC',
      'SignalR',
      'Hangfire',
      'EF Core',
      'LINQ',
      'MediatR (CQRS)',
      'Node.js',
    ].map((name) => ({ name, featured: FEATURED.has(name) })),
  },
  {
    category: 'Frontend',
    skills: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Signals',
      'TailwindCSS',
      'SSR',
      'SCSS',
      'HTML5',
    ].map((name) => ({ name, featured: FEATURED.has(name) })),
  },
  {
    category: 'Databases',
    skills: ['SQL Server', 'Redis', 'PostgreSQL'].map((name) => ({ name })),
  },
  {
    category: 'Auth & Security',
    skills: ['JWT', 'OAuth 2.0', 'ASP.NET Identity', 'AES-GCM Encryption', 'RBAC'].map(
      (name) => ({ name }),
    ),
  },
  {
    category: 'Testing',
    skills: ['xUnit', 'Moq', 'FluentAssertions', 'Integration Testing'].map((name) => ({
      name,
    })),
  },
  {
    category: 'DevOps & Cloud',
    skills: ['Docker', 'Docker Compose', 'Azure', 'GitHub Actions'].map((name) => ({
      name,
      featured: FEATURED.has(name),
    })),
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Swagger/OpenAPI', 'Serilog', 'AutoMapper'].map((name) => ({
      name,
    })),
  },
  {
    category: 'Languages',
    skills: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Java'].map((name) => ({
      name,
      featured: FEATURED.has(name),
    })),
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'wasla',
    title: 'Wasla — Smart Microbus Platform',
    oneLiner:
      "Real-time transportation management system for Egypt's informal microbus network",
    description:
      'A 5-application distributed ecosystem serving real users. The backend manages encrypted QR check-in/out workflows, live GPS tracking with OSRM ETA calculation, 4 concurrent SignalR hubs, role-based access for 5 user types, and daily automated queue resets.',
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
      'Flutter',
    ],
    achievements: [
      '11 controllers · 16 domain entities · 86 DTOs across 3 Clean Architecture layers',
      '4 SignalR hubs pushing live queue, GPS, and ETA data simultaneously',
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
      { label: 'Live Swagger API', url: 'https://smart-microbus.runasp.net/swagger' },
    ],
    featured: true,
    live: true,
    badge: 'FEATURED PROJECT · LIVE',
    categories: ['backend'],
  },
  {
    id: 'estorex',
    title: 'E-StoreX — Enterprise E-Commerce Platform',
    oneLiner:
      'Full-stack e-commerce: ASP.NET Core enterprise API + Angular SPA with live Stripe payments',
    description:
      'Complete end-to-end ownership: 140+ API endpoints on the backend, 20+ lazy-loaded Angular feature modules on the frontend. Real Stripe payment processing with webhooks, Google + GitHub OAuth, 250+ automated test cases, and a deployed live demo you can click through right now.',
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
      'Firebase',
    ],
    achievements: [],
    achievementGroups: [
      {
        label: 'Backend',
        items: [
          '140+ endpoints · 3 auth providers (JWT + Google + GitHub OAuth) · Stripe Webhooks',
          '250+ xUnit test cases — unit, service, and integration layers',
        ],
      },
      {
        label: 'Frontend',
        items: [
          'Angular Signals-based state — 40% fewer change detection cycles',
          'Multi-step Stripe checkout · SSR + Lazy Loading → 50% FCP improvement',
          'Generic ResourceService<T> eliminating HTTP boilerplate',
        ],
      },
    ],
    githubLinks: [
      { label: 'Backend (GitHub)', url: 'https://github.com/Ibrahim-Hassan74/EStoreX' },
      { label: 'Frontend (GitHub)', url: 'https://github.com/Ibrahim-Hassan74/E-StoreX' },
    ],
    liveLinks: [{ label: 'Live Demo', url: 'https://e-store-x.web.app' }],
    featured: false,
    live: true,
    badge: 'FULL STACK · LIVE',
    categories: ['fullstack', 'frontend'],
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
      'NGINX',
      'JWT',
    ],
    achievements: [
      '6-state machine: INITIALIZING → QR_PENDING → CONNECTED → ZOMBIE → DESTROYING → READY',
      '45s heartbeat · 5 failure threshold · 10s–120s exponential backoff recovery',
      'Angular dashboard: real-time QR updates via SignalR · JWT guards · multi-stage Docker→NGINX build',
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
    categories: ['nodejs'],
  },
  {
    id: 'laundry',
    title: 'Laundry Management System',
    oneLiner:
      'Full bilingual MVC SaaS for laundry businesses — invoicing, WhatsApp notifications, and automated reporting',
    description:
      'A complete ASP.NET Core MVC application for laundry operations across Hotels and Apartments, with full Arabic RTL + English bilingual UI, WhatsApp OTP notifications, Rotativa PDF invoice generation, Hangfire.Console scheduled jobs for automated billing, and role-based Areas for Admin/Owner/Employee workflows.',
    techStack: [
      'ASP.NET Core MVC',
      'Hangfire',
      'EF Core',
      'SQL Server',
      'Arabic/English i18n',
      'PDF',
      'WhatsApp',
    ],
    achievements: [
      '3 roles (Admin, Owner, Employee) with complete data isolation via Identity',
      'Bilingual Arabic (default) + English using IStringLocalizer + .resx',
      'Real-time PDF and Excel report generation for financial analytics',
      'Hangfire.Console dashboard with live job monitoring',
    ],
    githubLinks: [
      { label: 'GitHub', url: 'https://github.com/Ibrahim-Hassan74' },
    ],
    liveLinks: [],
    featured: false,
    live: false,
    badge: 'FREELANCE · .NET BACKEND',
    categories: ['fullstack'],
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
  linkedin: 'https://linkedin.com/in/ibrahim-hassan-48287b250',
  cv: 'Ibrahim_Hassan_Fullstack_Developer.pdf',
  profileImage: 'ibrahim_hassan_image.jpg',
};
