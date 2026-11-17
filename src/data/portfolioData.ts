export type ProjectCategory = 'all' | 'web' | 'ai' | 'java';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  role: string;
  summary: string;
  keyFeatures: string[];
  contributions: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  repoUrl?: string;
  repoStatusNote: string;
  liveUrl?: string;
  demoStatusNote: string;
  cloneCmd?: string;
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  location: string;
  role: string;
  company: string;
  isConcurrent: boolean;
  progressionSteps?: string[];
  summary: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  shortLabel: string;
  description: string;
  items: { name: string; context: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  cgpa: string;
  status: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialMeta: string;
  category: string;
  summary: string;
  certificateUrl?: string;
}

export interface ProfessionalSkillItem {
  id: string;
  title: string;
  description: string;
}

export const PROFILE = {
  initials: 'LC',
  name: 'MD LAL CHAND ALI',
  displayName: 'Md Lal Chand Ali',
  designation:
    'Software Engineer | IT Service Management | Business Operations | AI & Automation',
  positioning:
    'A technology professional combining software engineering, IT service management, business operations, and AI-driven automation to deliver practical, scalable, and efficient digital solutions.',
  summaryParagraphs: [
    'Results-driven Software Engineer and Computer Science & Engineering graduate with 7+ years of progressive professional experience at Softzino Technologies, advancing from Development Assistant to Software Engineer.',
    'Skilled in Python, PHP, Laravel, FastAPI, React.js, IT Service Management (ITSM), and AI-driven automation workflows. Combines full-stack development capabilities with system troubleshooting, prompt engineering, and business operations management to deliver reliable, efficient, and technology-driven solutions.',
    'Additionally possesses formal knowledge of Competency-Based Assessment (CBA), Competency-Based Training and Assessment (CBT&A), competency standards, assessment methods, and structured skills evaluation.',
  ],
  location: 'Dhaka, Bangladesh',
  phone: '+880 1717-080704',
  email: 'lalchandalibd@gmail.com',
  secondaryEmail: 'lal.chand@uttarauniversity.edu.bd',
  availability: 'Open to Software Engineering, ITSM & AI Automation Collaborations',
  experienceYearsLabel: '7+ Years',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/lalchand-ali/',
      handle: 'linkedin.com/in/lalchand-ali',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/lalchandali',
      handle: 'github.com/lalchandali',
    },
  ],
};

export function resolveAssetPath(assetPath: string): string {
  const cleanPath = assetPath.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

export const HERO_IMAGE = {
  src: resolveAssetPath('assets/aistudio/my_photo_1_a247e1c4.png'),
  alt: 'Professional portrait of Md Lal Chand Ali, Software Engineer',
};

export const ROTATING_KEYWORDS = [
  'Full-Stack Software Engineering',
  'IT Service Management (ITSM)',
  'AI & Workflow Automation',
  'Business & Logistics Operations',
  'Competency-Based Assessment',
];

export const ABOUT_HIGHLIGHTS = [
  {
    id: 'hl-exp',
    title: '7+ Years Experience',
    subtitle: 'Progressive Career Growth',
    detail:
      'Advanced from Development Assistant through Senior Executive (IT) and Associate Software Engineer to Software Engineer at Softzino Technologies since June 2019.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-eng',
    title: 'Full-Stack Engineering',
    subtitle: 'Python · PHP · Laravel · FastAPI · React.js',
    detail:
      'Architects maintainable backend APIs, authentication flows, and responsive React.js web applications aligned with real business requirements.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-itsm',
    title: 'IT Service Management',
    subtitle: 'Enterprise Infrastructure & Root-Cause Analysis',
    detail:
      'Hands-on system administration, server maintenance, structured debugging, and SLA-oriented technical support.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-ai',
    title: 'AI-Driven Workflows',
    subtitle: 'Prompt Engineering & LLM Integration',
    detail:
      'Applies prompt engineering and AI tools inside engineering and operations pipelines to accelerate problem diagnosis and delivery.',
    span: 'md:col-span-3',
  },
  {
    id: 'hl-ops',
    title: 'Business & Operations Leadership',
    subtitle: 'Concurrent IT, Logistics & Customer Service Roles',
    detail:
      'Bridges software delivery with real-world execution across logistics coordination, technical consulting, and customer satisfaction.',
    span: 'md:col-span-3',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-softzino',
    period: 'June 2019 – Present',
    location: 'Dhaka, Bangladesh',
    role: 'Software Engineer',
    company: 'SOFTZINO TECHNOLOGIES',
    isConcurrent: false,
    progressionSteps: [
      'Development Assistant',
      'Senior Executive (IT)',
      'Associate Software Engineer',
      'Software Engineer',
    ],
    summary:
      '7+ years of progressive full-stack engineering, AI workflow optimization, and enterprise IT service management.',
    highlights: [
      'Develop and maintain web applications utilizing Python, PHP, and modern web application frameworks (Laravel).',
      'Incorporate AI-powered tools and prompt engineering methodologies into internal developer workflows to optimize productivity.',
      'Deliver IT service management (ITSM), system administration, server maintenance, and technical infrastructure support.',
      'Perform technical troubleshooting, debugging, and root-cause analysis for enterprise systems.',
      'Collaborate with cross-functional teams to translate business and functional requirements into scalable technical solutions.',
    ],
  },
  {
    id: 'exp-barnoi-lifestyle',
    period: 'January 2024 – Present',
    location: 'Dhaka, Bangladesh',
    role: 'Assistant Manager (Logistics) / Senior Executive (Customer Service)',
    company: 'BARNOi LIFESTYLE',
    isConcurrent: true,
    summary:
      'Concurrent operational leadership overseeing logistics fulfillment, order tracking, and customer service excellence.',
    highlights: [
      'Oversee daily logistics operations, including delivery coordination, order tracking, and inventory movement.',
      'Manage customer inquiries, resolve service issues, and maintain high customer satisfaction standards.',
      'Coordinate logistics and customer service activities to ensure smooth business operations.',
      'Collaborate with relevant teams to improve operational efficiency and service delivery.',
    ],
  },
  {
    id: 'exp-barnoi-holdings',
    period: 'January 2025 – Present',
    location: 'Dhaka, Bangladesh',
    role: 'Assistant Manager (IT)',
    company: 'BARNOi HOLDINGS LTD.',
    isConcurrent: true,
    summary:
      'Concurrent IT leadership coordinating technical requirements, service delivery, and technology-driven workflow improvements.',
    highlights: [
      'Coordinate IT-related operations and support ongoing business initiatives.',
      'Manage technical requirements and assist with IT service delivery.',
      'Communicate with stakeholders to facilitate business and operational activities.',
      'Support technology-driven solutions and improve operational workflows.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    category: 'Programming Languages',
    shortLabel: 'Languages',
    description:
      'Core programming languages applied across enterprise web backends, automation scripts, and UI engineering.',
    items: [
      { name: 'Python', context: 'FastAPI services, automation & AI scripts' },
      { name: 'PHP', context: 'Server-side web application development' },
      { name: 'Java', context: 'Object-Oriented Programming & core CS systems' },
      { name: 'JavaScript', context: 'Modern browser & SPA application logic' },
      { name: 'HTML5 / CSS3', context: 'Semantic, accessible web markup & layout' },
    ],
  },
  {
    id: 'frameworks',
    category: 'Frameworks & Web Development',
    shortLabel: 'Frameworks',
    description:
      'Production frameworks and API tools used to architect full-stack applications cleanly.',
    items: [
      { name: 'Laravel', context: 'Enterprise PHP MVC architectures & APIs' },
      { name: 'React.js', context: 'Component-driven interactive interfaces' },
      { name: 'FastAPI', context: 'High-speed typed Python REST endpoints' },
      { name: 'REST APIs', context: 'Structured contracts, CORS & token auth' },
      { name: 'Tailwind CSS', context: 'Responsive utility-first design systems' },
      { name: 'Axios', context: 'Client-server HTTP integration & interceptors' },
    ],
  },
  {
    id: 'ai',
    category: 'AI & Automation',
    shortLabel: 'AI & Automation',
    description:
      'Practical application of generative AI and automation workflows inside real developer and business operations.',
    items: [
      { name: 'Prompt Engineering', context: 'Structured templates for reliable outputs' },
      { name: 'LLM Tools', context: 'Engineering research, code & workflow support' },
      { name: 'AI-Assisted Workflows', context: 'Accelerating triage, docs & prototyping' },
      { name: 'Automation', context: 'Repeatable scripts & operational process flows' },
    ],
  },
  {
    id: 'itsm',
    category: 'IT Service Management (ITSM)',
    shortLabel: 'ITSM',
    description:
      'Keeping enterprise infrastructure dependable through proactive maintenance, debugging, and structured support.',
    items: [
      { name: 'ITSM', context: 'Service delivery, incident handling & governance' },
      { name: 'Infrastructure Maintenance', context: 'Server administration & uptime care' },
      { name: 'Technical Troubleshooting', context: 'Debugging & root-cause analysis' },
      { name: 'IT Support', context: 'End-to-end user & enterprise assistance' },
    ],
  },
  {
    id: 'business',
    category: 'Business & Operations',
    shortLabel: 'Operations',
    description:
      'Hands-on business operations leadership aligning logistics, customer service, and technical consulting.',
    items: [
      { name: 'Logistics Management', context: 'Delivery coordination & inventory tracking' },
      { name: 'Technical Sales', context: 'Translating technical value for clients' },
      { name: 'Solution Consulting', context: 'Mapping business needs to digital systems' },
      { name: 'Customer Support', context: 'Escalation handling & service quality' },
    ],
  },
  {
    id: 'cba',
    category: 'Competency-Based Training & Assessment',
    shortLabel: 'CBA & CBT&A',
    description:
      'Formal NSDA-certified expertise in competency standards, structured assessment methods, and skills evaluation.',
    items: [
      {
        name: 'Competency-Based Assessment (CBA)',
        context: 'NSDA Level 4 structured evaluation practices',
      },
      {
        name: 'CBT&A',
        context: 'Competency-Based Training & Assessment frameworks',
      },
      {
        name: 'Competency Standards',
        context: 'Aligning workplace performance with industry benchmarks',
      },
      {
        name: 'Assessment Methods',
        context: 'Practical observation, questioning & evidence portfolios',
      },
      {
        name: 'Skills Evaluation',
        context: 'Objective capability verification & feedback',
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'agromitra',
    title: 'AgroMitra – Smart Agricultural Management Platform',
    subtitle: 'Full-Stack Digital Agriculture & Crop Decision Platform',
    category: 'web',
    categoryLabel: 'Full-Stack Engineering',
    year: '2025',
    role: 'Full-Stack Architect & Developer',
    featured: true,
    summary:
      'Designed and built a full-stack agricultural decision and operations platform pairing a Python FastAPI REST backend with a responsive React.js + Vite + Tailwind CSS dashboard for crop planning, soil macronutrient analysis, and market forecasting.',
    keyFeatures: [
      'Rule-based crop recommendation engine',
      'Soil macronutrient analysis and input parsing',
      'Crop calendar planning',
      'Market price forecasting',
      'Token-based authentication',
      'Local payment gateway integration',
    ],
    contributions: [
      'Designed frontend-backend architecture',
      'Built FastAPI REST endpoints',
      'Implemented React dashboard components',
      'Handled CORS and API communication',
      'Integrated token authentication flows',
      'Structured scalable project layout',
    ],
    stack: [
      'Python',
      'FastAPI',
      'React.js',
      'Vite',
      'Tailwind CSS',
      'Axios',
      'REST APIs',
    ],
    image: resolveAssetPath(
      'src/assets/images/project_agromitra_platform_1794910152138.jpg'
    ),
    imageAlt:
      'AgroMitra Smart Agricultural Management Platform interface displaying soil macronutrient analysis and crop planning modules',
    repoUrl: 'https://github.com/lalchandali',
    repoStatusNote: 'GitHub Profile (Source Repository Available Upon Request)',
    demoStatusNote: 'Architecture Preview & Code Walkthrough Available in Modal',
    codeSnippet: {
      filename: 'backend/app/routers/recommendations.py',
      language: 'python',
      code: `@router.post("/recommendations", response_model=CropRecommendationResponse)
async def evaluate_crop_plan(
    soil: SoilMacronutrientPayload,
    user: AuthenticatedUser = Depends(verify_token),
):
    matched_crops = rule_engine.match(
        nitrogen=soil.nitrogen,
        phosphorus=soil.phosphorus,
        potassium=soil.potassium,
        ph=soil.ph,
    )
    calendar = crop_calendar.generate_schedule(matched_crops, soil.season)
    forecast = market_forecaster.estimate(matched_crops)
    return CropRecommendationResponse(
        crops=matched_crops,
        calendar=calendar,
        market_forecast=forecast,
    )`,
    },
  },
  {
    id: 'ai-workflow-automation',
    title: 'AI-Assisted Developer & ITSM Workflow Automation',
    subtitle: 'Prompt Engineering & Root-Cause Triage Pipelines',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    year: '2025',
    role: 'Software Engineer · Softzino Technologies',
    summary:
      'Integrated structured prompt engineering and Python automation scripts into internal engineering and IT service management workflows to standardize diagnostics, accelerate root-cause analysis, and improve operational clarity.',
    keyFeatures: [
      'Structured prompt templates for code review & debugging',
      'Automated incident trace summarization in Python',
      'Repeatable ITSM root-cause analysis checklists',
      'Cross-team documentation & functional spec helpers',
    ],
    contributions: [
      'Incorporated AI-powered tooling into daily developer workflows',
      'Built Python helper utilities for log parsing and triage',
      'Standardized prompt patterns for repeatable technical outputs',
      'Connected troubleshooting findings to infrastructure support',
    ],
    stack: ['Python', 'Prompt Engineering', 'LLM Tools', 'REST APIs', 'ITSM'],
    image: resolveAssetPath(
      'src/assets/images/project_python_ai_automation_1794910154157.jpg'
    ),
    imageAlt:
      'Python automation and AI workflow terminal visualization in an engineering workspace',
    repoUrl: 'https://github.com/lalchandali',
    repoStatusNote: 'Internal Enterprise Workflow · GitHub Profile Linked',
    demoStatusNote: 'Workflow Pattern Preview Available in Modal',
    codeSnippet: {
      filename: 'automation/itsm_triage.py',
      language: 'python',
      code: `def prepare_rca_prompt(service_name: str, trace_excerpt: str) -> dict[str, str]:
    return {
        "system": "Analyze the service trace and output probable root causes and verification steps.",
        "user": f"Service: {service_name}\\nTrace:\\n{trace_excerpt[:2000]}",
    }`,
    },
  },
  {
    id: 'guess-the-number-java',
    title: 'Guess the Number – Java OOP Application',
    subtitle: 'Object-Oriented Game Architecture & Persistent Leaderboard',
    category: 'java',
    categoryLabel: 'Java & Core CS',
    year: '2024',
    role: 'Sole Developer',
    summary:
      'Interactive Java application built on clean Object-Oriented Programming principles featuring selectable difficulty tiers, attempt tracking, file-based persistent score storage, and a ranked leaderboard.',
    keyFeatures: [
      'Selectable difficulty levels (Easy, Medium, Hard)',
      'Attempt tracking and defensive input validation',
      'Persistent File I/O score storage',
      'Sorted leaderboard ranking top runs',
    ],
    contributions: [
      'Modeled GameSession, Difficulty, and ScoreBoard OOP classes',
      'Implemented persistent leaderboard File I/O serialization',
      'Added boundary checking and clean console UX',
    ],
    stack: ['Java', 'OOP', 'File I/O', 'Collections'],
    image: resolveAssetPath(
      'src/assets/images/project_java_game_oop_1794910154146.jpg'
    ),
    imageAlt:
      'Java OOP application showing difficulty modes and leaderboard persistence output',
    repoUrl: 'https://github.com/lalchandali',
    repoStatusNote: 'GitHub Profile',
    demoStatusNote: 'Architecture & Java Source Snippet in Modal',
    codeSnippet: {
      filename: 'src/com/lalchand/game/ScoreBoard.java',
      language: 'java',
      code: `public class ScoreBoard {
    private final Path storagePath;

    public void recordResult(String player, int attempts, Difficulty difficulty) throws IOException {
        String row = String.format("%s,%d,%s%n", player, attempts, difficulty.name());
        Files.writeString(
            storagePath,
            row,
            StandardOpenOption.CREATE,
            StandardOpenOption.APPEND
        );
    }
}`,
    },
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-swe',
    title: 'Software Engineering',
    summary:
      'End-to-end engineering of reliable full-stack web applications and clean API contracts.',
    capabilities: [
      'Full-stack web applications',
      'REST APIs & backend architecture',
      'FastAPI, Laravel & React.js delivery',
    ],
  },
  {
    id: 'srv-itsm',
    title: 'IT Service Management',
    summary:
      'Dependable IT infrastructure governance, preventive server maintenance, and structured incident resolution.',
    capabilities: [
      'System administration & server maintenance',
      'Technical troubleshooting & root-cause analysis',
      'Enterprise IT support & service continuity',
    ],
  },
  {
    id: 'srv-ai',
    title: 'AI & Automation',
    summary:
      'Embedding practical AI tools and automation pipelines into engineering and business workflows.',
    capabilities: [
      'Structured prompt engineering',
      'AI workflow integration',
      'Developer & operational productivity automation',
    ],
  },
  {
    id: 'srv-ops',
    title: 'Business Operations',
    summary:
      'Bridging technical systems with day-to-day logistics execution and customer-facing service standards.',
    capabilities: [
      'Logistics & delivery coordination',
      'Customer service optimization',
      'Cross-team workflow management',
    ],
  },
  {
    id: 'srv-cba',
    title: 'Competency-Based Assessment',
    summary:
      'Applying national competency frameworks and objective evaluation methods to verify workplace readiness.',
    capabilities: [
      'Competency standards evaluation',
      'Structured assessment methodology',
      'CBT&A frameworks & evidence review',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-uttara',
    degree: 'Bachelor of Science (BSc)',
    field: 'Computer Science & Engineering (CSE)',
    institution: 'Uttara University',
    location: 'Dhaka, Bangladesh',
    cgpa: '3.65 / 4.00',
    status: 'Graduate',
    highlights: [
      'Strong academic foundation in algorithms, software engineering, OOP, and database systems.',
      'Applied engineering principles across full-stack web architectures and AI-assisted systems.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-ccna',
    title: 'CCNA Training (Cisco Certified Network Associate)',
    issuer: 'CSL Training',
    credentialMeta: '72 Hours Intensive',
    category: 'Networking & Infrastructure',
    summary:
      'Hands-on routing, switching, IP addressing, and enterprise network fundamentals.',
  },
  {
    id: 'cert-it-l3',
    title: 'IT Support Service – Level 3',
    issuer: 'National Skills Development Authority (NSDA)',
    credentialMeta: 'NSDA Level 3',
    category: 'IT Service & Support',
    summary:
      'Nationally recognized certification in workstation maintenance, troubleshooting, and IT user support.',
  },
  {
    id: 'cert-cs-l3',
    title: 'Professional Customer Services, Level 3',
    issuer: 'National Skills Development Authority (NSDA)',
    credentialMeta: 'NSDA Level 3',
    category: 'Client & Operations',
    summary:
      'Structured client communication, issue escalation, and service quality standards.',
  },
  {
    id: 'cert-bo-l3',
    title: 'Professional Back Office Service – Level 3',
    issuer: 'National Skills Development Authority (NSDA)',
    credentialMeta: 'NSDA Level 3',
    category: 'Business Administration',
    summary:
      'Operational documentation, workflow coordination, and back-office execution standards.',
  },
  {
    id: 'cert-cba-l4',
    title: 'Competency-Based Assessment – Level 4',
    issuer: 'National Skills Development Authority (NSDA)',
    credentialMeta: 'NSDA Level 4',
    category: 'Assessment & Training',
    summary:
      'Certified capability in designing and conducting competency-based skills evaluations under CBT&A standards.',
  },
];

export const PROFESSIONAL_SKILLS: ProfessionalSkillItem[] = [
  {
    id: 'ps-analytical',
    title: 'Analytical Thinking & Problem-Solving',
    description:
      'Breaking down complex software bugs, infrastructure incidents, and operational bottlenecks into actionable solutions.',
  },
  {
    id: 'ps-comm',
    title: 'Technical Communication',
    description:
      'Translating system architecture, technical trade-offs, and functional specs clearly for engineering and business stakeholders.',
  },
  {
    id: 'ps-collab',
    title: 'Team Collaboration',
    description:
      'Working seamlessly across cross-functional engineering, IT support, and operations teams to deliver reliable outcomes.',
  },
  {
    id: 'ps-lead',
    title: 'Leadership & Coordination',
    description:
      'Coordinating daily execution across concurrent IT management, logistics, and customer service responsibilities.',
  },
  {
    id: 'ps-crm',
    title: 'Customer Relationship Management',
    description:
      'Maintaining high service standards, resolving escalations empathetically, and building lasting client trust.',
  },
  {
    id: 'ps-ops',
    title: 'Operational Management',
    description:
      'Streamlining inventory movement, order tracking, SLA compliance, and day-to-day business continuity.',
  },
  {
    id: 'ps-adapt',
    title: 'Adaptability & Continuous Learning',
    description:
      'Continuously adopting modern frameworks, AI-assisted engineering workflows, and industry certifications.',
  },
  {
    id: 'ps-time',
    title: 'Time Management',
    description:
      'Prioritizing critical deliverables effectively across software development sprints and concurrent operational roles.',
  },
];
