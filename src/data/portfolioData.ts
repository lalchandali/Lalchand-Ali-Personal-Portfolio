export type ProjectCategory = 'all' | 'web' | 'ai' | 'itsm';

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

export type CertificationTrack = 'all' | 'nsda' | 'networking' | 'training';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  track: Exclude<CertificationTrack, 'all'>;
  credentialMeta: string;
  category: string;
  summary: string;
  competencies: string[];
  featured?: boolean;
  certificateUrl?: string;
  certificateType?: 'image' | 'pdf';
  previewImages?: { label: string; src: string }[];
  credentialNumber?: string;
  registrationNo?: string;
  issuedDate?: string;
  validUntil?: string;
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
    'Software Engineer | Full-Stack Development | AI/ML & Automation',
  positioning:
    'I am a Software Engineer focused on building reliable web applications, backend systems, and intelligent automation solutions. With professional experience across software engineering, IT service management, and technical operations, I combine practical engineering skills with problem-solving to deliver useful, maintainable digital solutions.',
  summaryParagraphs: [
    'I am a Software Engineer with a BSc in Computer Science & Engineering from Uttara University and 7+ years of professional experience at Softzino Technologies, progressing from Development Assistant to Software Engineer.',
    'My core work centers on full-stack software development using Python, FastAPI, PHP, Laravel, and React.js, alongside AI-assisted workflows and process automation to keep development and troubleshooting efficient.',
    'Alongside software delivery, I support IT Service Management (ITSM), server infrastructure, and technical troubleshooting, complemented by part-time business operations experience and formal NSDA credentials in Competency-Based Assessment (CBA/CBT&A).',
  ],
  location: 'Dhaka, Bangladesh',
  phone: '+880 1717-080704',
  email: 'lalchandalibd@gmail.com',
  availability:
    'Open to Software Engineering, ITSM & AI Automation Collaborations',
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
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/lalchandali.60',
      handle: 'facebook.com/lalchandali.60',
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
  alt: 'Portrait of Md Lal Chand Ali, Software Engineer',
};

export const ROTATING_KEYWORDS = [
  'Full-Stack Development',
  'Python, FastAPI & React.js',
  'PHP, Laravel & REST APIs',
  'AI & Workflow Automation',
];

export const ABOUT_HIGHLIGHTS = [
  {
    id: 'hl-exp',
    title: 'Career Progression',
    subtitle: 'Softzino Technologies (2019–Present)',
    detail:
      'Grew across four engineering and IT roles into a full-time Software Engineer building and maintaining production web systems.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-eng',
    title: 'Full-Stack Development',
    subtitle: 'Python · FastAPI · PHP · Laravel · React.js',
    detail:
      'Builds modular REST APIs, token authentication flows, relational schemas, and responsive single-page interfaces.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-itsm',
    title: 'ITSM & Infrastructure',
    subtitle: 'Supporting Technical Operations',
    detail:
      'Handles server administration, structured root-cause analysis, and dependable enterprise technical troubleshooting.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-ai',
    title: 'AI & Workflow Automation',
    subtitle: 'Prompt Engineering & Python Tooling',
    detail:
      'Applies structured prompt patterns and Python scripts inside developer workflows to assist with triage and documentation.',
    span: 'md:col-span-3',
  },
  {
    id: 'hl-ops',
    title: 'Operations & NSDA CBA',
    subtitle: 'Business Operations & Assessment Standards',
    detail:
      'Complements software engineering with part-time logistics and IT advisory work plus formal NSDA CBT&A and CBA evaluation knowledge.',
    span: 'md:col-span-3',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-softzino',
    period: 'June 2019 – Present',
    location: 'Dhaka, Bangladesh (Full-Time)',
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
      'Full-time software engineering role focused on web application development, backend APIs, AI-assisted workflows, and supporting IT service management.',
    highlights: [
      'Develop and maintain web applications and REST APIs using Python, FastAPI, PHP, Laravel, and React.js.',
      'Incorporate AI-assisted developer workflows, prompt engineering, and Python automation scripts to support triage and documentation.',
      'Provide IT Service Management (ITSM) and infrastructure support, including Linux/server administration and troubleshooting.',
      'Perform technical debugging and root-cause analysis on production incidents to ship reliable, maintainable fixes.',
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
      'Part-time role overseeing order fulfillment, delivery partner coordination, and customer service escalations.',
    highlights: [
      'Manage daily order fulfillment, logistics coordination, and inventory movement across online retail operations.',
      'Coordinate with delivery partners to monitor dispatch handoffs and improve operational efficiency.',
      'Handle escalated customer service inquiries and maintain consistent resolution standards.',
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
      'Part-time role supporting internal IT operations, system readiness, and technical coordination.',
    highlights: [
      'Support internal IT operations, workstation readiness, and ongoing IT service continuity across teams.',
      'Provide technical support and coordinate system upkeep and vendor workflows on a part-time schedule.',
      'Document business workflow and automation requirements to align operational processes with technical solutions.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    category: 'Programming Languages',
    shortLabel: 'Languages',
    description:
      'Core languages used to build backend services, web interfaces, and automation utilities.',
    items: [
      { name: 'Python', context: 'FastAPI backends, scripting & AI automation' },
      { name: 'PHP', context: 'Server-side logic & web portal engineering' },
      { name: 'Java', context: 'Object-oriented programming & CS foundations' },
      { name: 'JavaScript', context: 'Interactive frontend & SPA logic' },
      { name: 'HTML5 / CSS3', context: 'Semantic markup & responsive styling' },
    ],
  },
  {
    id: 'frameworks',
    category: 'Frameworks & Web Development',
    shortLabel: 'Frameworks',
    description:
      'Web frameworks and API tooling used across backend services and frontend applications.',
    items: [
      { name: 'Laravel', context: 'MVC architecture, policies & REST services' },
      { name: 'React.js', context: 'Component-based interactive user interfaces' },
      { name: 'FastAPI', context: 'Typed Python REST endpoints & validation' },
      { name: 'REST APIs', context: 'Endpoint contracts, CORS & token auth' },
      { name: 'Tailwind CSS', context: 'Responsive utility-first interface styling' },
      { name: 'Axios', context: 'HTTP client integration & request handling' },
    ],
  },
  {
    id: 'ai',
    category: 'AI & Automation',
    shortLabel: 'AI & Automation',
    description:
      'Practical LLM integration and scripting techniques applied to software engineering and triage.',
    items: [
      { name: 'Prompt Engineering', context: 'Structured prompts for consistent analysis' },
      { name: 'LLM Tools', context: 'Code review, debugging & research support' },
      { name: 'AI-Assisted Workflows', context: 'Faster incident triage & documentation' },
      { name: 'Automation', context: 'Repeatable Python scripts & task flows' },
    ],
  },
  {
    id: 'itsm',
    category: 'IT Service Management (ITSM)',
    shortLabel: 'ITSM',
    description:
      'Supporting expertise in server upkeep, structured troubleshooting, and technical support.',
    items: [
      {
        name: 'IT Service Management',
        context: 'Incident workflows, SLAs & service coordination',
      },
      {
        name: 'Infrastructure Maintenance',
        context: 'Linux/server upkeep & preventive checks',
      },
      {
        name: 'Technical Troubleshooting',
        context: 'Log analysis & root-cause isolation',
      },
      { name: 'IT Support', context: 'Workstation setup & end-user assistance' },
    ],
  },
  {
    id: 'business',
    category: 'Business & Operations',
    shortLabel: 'Operations',
    description:
      'Supporting operational skills from part-time logistics and IT advisory roles.',
    items: [
      {
        name: 'Logistics Management',
        context: 'Fulfillment coordination & inventory movement',
      },
      {
        name: 'Technical Sales',
        context: 'Explaining technical capabilities clearly',
      },
      {
        name: 'Solution Consulting',
        context: 'Mapping operational needs into software specs',
      },
      {
        name: 'Customer Support',
        context: 'Escalation handling & service quality',
      },
    ],
  },
  {
    id: 'cba',
    category: 'Competency-Based Training & Assessment',
    shortLabel: 'CBA & CBT&A',
    description:
      'Formal NSDA grounding in CBT&A frameworks, competency standards, and structured evaluation.',
    items: [
      {
        name: 'Competency-Based Assessment',
        context: 'NSDA Level 4 structured evaluation practices',
      },
      {
        name: 'Competency-Based Training and Assessment',
        context: 'National CBT&A training & assessment standards',
      },
      {
        name: 'Competency Standards',
        context: 'Benchmarking performance against criteria',
      },
      {
        name: 'Assessment Methods',
        context: 'Observation, questioning & evidence review',
      },
      {
        name: 'Skills Evaluation',
        context: 'Objective capability checks & feedback',
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'agromitra',
    title: 'AgroMitra – Smart Agricultural Management Platform',
    subtitle: 'Full-Stack Crop Decision & Agricultural Operations System',
    category: 'web',
    categoryLabel: 'Full-Stack Web',
    year: '2025',
    role: 'Full-Stack Developer',
    featured: true,
    summary:
      'A full-stack web platform built with Python FastAPI and React.js that turns soil macronutrient inputs into structured crop plans. It addresses fragmented agricultural planning by integrating a rule-based crop recommendation API, seasonal crop calendars, market price forecasting, token authentication, and a local payment gateway.',
    keyFeatures: [
      'Rule-based crop recommendation engine driven by soil inputs',
      'Soil macronutrient analysis (N, P, K, pH) and input parsing',
      'Seasonal crop calendar planning module',
      'Market price forecasting view for harvest decisions',
      'Token-based user authentication and protected endpoints',
      'Local payment gateway integration',
    ],
    contributions: [
      'Designed decoupled FastAPI backend and React.js + Vite architecture',
      'Built typed REST endpoints and soil analysis parsing in Python',
      'Implemented responsive React.js + Tailwind CSS dashboard views',
      'Configured CORS rules and Axios client-server communication',
      'Integrated token authentication flows across protected routes',
      'Structured modular backend and frontend directories for maintainability',
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
    repoStatusNote: 'Architecture Case Study · Source Available Upon Request',
    demoStatusNote: 'Architecture Case Study & Code Walkthrough',
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
    subtitle: 'Prompt Engineering & Python Diagnostic Support',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    year: '2025',
    role: 'Software Engineer · Softzino Technologies',
    summary:
      'A practical engineering and ITSM workflow toolkit combining Python log-parsing scripts with structured LLM prompt templates. It supports faster technical diagnostics, root-cause analysis preparation, documentation assistance, and everyday operational efficiency without manual overhead.',
    keyFeatures: [
      'Structured prompt templates for code review and debugging support',
      'Python scripts for error-trace excerpting and diagnostic prep',
      'Root-cause analysis support checklists for ITSM triage',
      'Documentation assistance for technical notes and specifications',
    ],
    contributions: [
      'Integrated LLM tools and prompt templates into developer and ITSM workflows',
      'Built Python helper scripts to format raw service traces for triage',
      'Standardized prompt patterns to improve operational efficiency and clarity',
      'Connected diagnostic summaries to infrastructure support workflows',
    ],
    stack: ['Python', 'Prompt Engineering', 'LLM Tools', 'REST APIs', 'ITSM'],
    image: resolveAssetPath(
      'src/assets/images/project_python_ai_automation_1794910154157.jpg'
    ),
    imageAlt:
      'Python automation and AI workflow terminal visualization in an engineering workspace',
    repoStatusNote: 'Internal Engineering Workflow · Architecture Case Study',
    demoStatusNote: 'Architecture Case Study & Triage Pattern',
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
    id: 'laravel-itsm-portal',
    title: 'Enterprise Laravel Operations & ITSM Service Portal',
    subtitle: 'Role-Based Portal, Ticket Lifecycle & SLA Escalation Workflows',
    category: 'itsm',
    categoryLabel: 'Laravel & ITSM',
    year: '2024',
    role: 'Software Engineer · Softzino Technologies',
    summary:
      'A role-based PHP and Laravel enterprise portal built to organize IT service requests, SLA tracking, and infrastructure diagnostics in one system. It centralizes ticket lifecycle management, policy-enforced access control, automated SLA escalation checks, and audit logs.',
    keyFeatures: [
      'Role-based enterprise portal access and authorization policies',
      'ITSM ticket lifecycle management and status tracking',
      'Automated SLA escalation workflow evaluation',
      'Infrastructure health diagnostics and root-cause audit logs',
    ],
    contributions: [
      'Developed modular Laravel services, policies, and REST API endpoints',
      'Designed relational MySQL schemas for tickets and incident audit trails',
      'Implemented SLA breach evaluation logic for L2 infrastructure escalation',
    ],
    stack: ['PHP', 'Laravel', 'REST APIs', 'MySQL', 'ITSM', 'Linux Server'],
    image: resolveAssetPath(
      'src/assets/images/project_distributed_telemetry_1794909245929.jpg'
    ),
    imageAlt:
      'Enterprise service monitoring and ITSM operational health dashboard displaying live service telemetry and incident status',
    repoStatusNote: 'Architecture Case Study',
    demoStatusNote: 'Architecture Case Study & Laravel Service Pattern',
    codeSnippet: {
      filename: 'app/Services/IncidentEscalationService.php',
      language: 'php',
      code: `final class IncidentEscalationService
{
    public function evaluateSlaBreach(ServiceTicket $ticket): EscalationDecision
    {
        $elapsedMinutes = $ticket->opened_at->diffInMinutes(now());
        $shouldEscalate = !$ticket->isResolved() && $elapsedMinutes >= $ticket->sla_threshold_minutes;

        return new EscalationDecision(
            escalate: $shouldEscalate,
            priority: $shouldEscalate ? TicketPriority::CRITICAL : $ticket->priority,
            assignedTeam: $shouldEscalate ? 'L2-Infrastructure' : $ticket->assigned_team,
        );
    }
}`,
    },
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-swe',
    title: 'Full-Stack Software Engineering',
    summary:
      'Building reliable web applications, structured REST APIs, and maintainable backend and frontend systems.',
    capabilities: [
      'Python (FastAPI), PHP (Laravel) & React.js systems',
      'Token authentication, RBAC & modular API design',
      'Relational database modeling & production deployment',
    ],
  },
  {
    id: 'srv-itsm',
    title: 'IT Service Management & Infrastructure',
    summary:
      'Keeping enterprise systems stable through proactive server maintenance, structured debugging, and SLA-focused support.',
    capabilities: [
      'Linux/server administration & preventive maintenance',
      'Technical debugging & root-cause analysis',
      'Incident workflows & operational continuity',
    ],
  },
  {
    id: 'srv-ai',
    title: 'AI Workflows & Operations Automation',
    summary:
      'Using prompt engineering, LLM tools, and Python scripting to reduce repetitive work across engineering and operations.',
    capabilities: [
      'Structured prompt engineering & triage support',
      'Python automation scripts for logs & recurring tasks',
      'Workflow streamlining across technical & support teams',
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
      'Core coursework in algorithms, data structures, object-oriented programming, software engineering, and database systems.',
      'Applied computer science principles across full-stack web architectures and automation systems.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-cba-l4',
    title: 'Competency-Based Assessment – Level 4',
    issuer: 'National Skills Development Authority (NSDA)',
    issuerShort: 'NSDA',
    track: 'nsda',
    credentialMeta: 'NSDA Level 4',
    category: 'Assessment & Training',
    featured: true,
    summary:
      'Certified capability in designing and conducting competency-based skills evaluations under national CBT&A standards.',
    competencies: [
      'Competency-Based Assessment (CBA) execution',
      'CBT&A standards & assessment methods',
      'Practical skills evaluation & evidence review',
    ],
  },
  {
    id: 'cert-ccna',
    title: 'CCNA Training (Cisco Certified Network Associate)',
    issuer: 'CSL Training',
    issuerShort: 'CSL Training',
    track: 'networking',
    credentialMeta: '72 Hours Intensive',
    category: 'Networking & Infrastructure',
    featured: true,
    credentialNumber: 'CSL-KUR-OFF-CCN-23802',
    issuedDate: '03 Sep 2023',
    certificateUrl: resolveAssetPath('assets/aistudio/CCNA_617a9b50.jpeg'),
    certificateType: 'image',
    previewImages: [
      {
        label: 'Certificate',
        src: resolveAssetPath('assets/aistudio/CCNA_617a9b50.jpeg'),
      },
    ],
    summary:
      'Intensive 72-hour networking program covering routing, switching, IP subnetting, and enterprise network diagnostics.',
    competencies: [
      'Routing & switching fundamentals',
      'IP addressing, subnetting & VLANs',
      'Network troubleshooting & diagnostics',
    ],
  },
  {
    id: 'cert-it-l3',
    title: 'IT Support Service, Level 3',
    issuer: 'National Skills Development Authority (NSDA)',
    issuerShort: 'NSDA',
    track: 'nsda',
    credentialMeta: 'NSDA Level 3 · BNQF',
    category: 'IT Service & Support',
    credentialNumber: 'NSC-ICT-ITSS-L3-003108',
    registrationNo: 'RPL-ICT-ITSS-L3-001863',
    issuedDate: '19 Apr 2025',
    validUntil: '18 Apr 2030',
    certificateUrl: resolveAssetPath(
      'assets/aistudio/Certificate_MD_LAL_CHAND_ALI_b4886295.pdf'
    ),
    certificateType: 'pdf',
    previewImages: [
      {
        label: 'English',
        src: resolveAssetPath('assets/aistudio/cert_itss_l3_en.png'),
      },
      {
        label: 'বাংলা',
        src: resolveAssetPath('assets/aistudio/cert_itss_l3_bn.png'),
      },
    ],
    summary:
      'National Skills Certificate under BNQF covering OS installation, workstation hardware, basic networking, and troubleshooting.',
    competencies: [
      'Install, configure & optimize OS and utility software',
      'Maintain, assemble & troubleshoot PC workstations',
      'Basic networking, data backup & recovery',
      'IT support fundamentals & workplace communication',
    ],
  },
  {
    id: 'cert-cs-l3',
    title: 'Professional Customer Services, Level 3',
    issuer: 'National Skills Development Authority (NSDA)',
    issuerShort: 'NSDA',
    track: 'nsda',
    credentialMeta: 'NSDA Level 3 · 220 Hours',
    category: 'Client & Operations',
    credentialNumber: 'NSC-ICT-PCS-L3-001412',
    registrationNo: 'REG-ICT-PCS-L3-001366',
    issuedDate: '05 Jul 2026',
    validUntil: '04 Jul 2031',
    certificateUrl: resolveAssetPath(
      'assets/aistudio/Certificate_Md_Lal_Chand_Ali__2__b421144c.pdf'
    ),
    certificateType: 'pdf',
    previewImages: [
      {
        label: 'English',
        src: resolveAssetPath('assets/aistudio/cert_pcs_l3_en.png'),
      },
      {
        label: 'বাংলা',
        src: resolveAssetPath('assets/aistudio/cert_pcs_l3_bn.png'),
      },
    ],
    summary:
      'National Skills Certificate (220 hours, BNQF) in client service quality, software support tools, and IT workplace standards.',
    competencies: [
      'Customer management & service quality compliance',
      'Customer service software tools & core IT skills',
      'Clear communication, presentations & teamwork',
      'Workplace OHS & ethical standards in IT environments',
    ],
  },
  {
    id: 'cert-bo-l3',
    title: 'Professional Back-office Service, Level 3',
    issuer: 'National Skills Development Authority (NSDA)',
    issuerShort: 'NSDA',
    track: 'nsda',
    credentialMeta: 'NSDA Level 3 · BNQF',
    category: 'Business Administration',
    credentialNumber: 'NSC-ICT-PBS-L3-001568',
    registrationNo: 'RPL-ICT-PBS-L3-001060',
    issuedDate: '27 Sep 2026',
    validUntil: '26 Sep 2031',
    certificateUrl: resolveAssetPath(
      'assets/aistudio/Certificate_MD_LAL_CHAND_ALI__1__f468b6f1.pdf'
    ),
    certificateType: 'pdf',
    previewImages: [
      {
        label: 'English',
        src: resolveAssetPath('assets/aistudio/cert_pbs_l3_en.png'),
      },
      {
        label: 'বাংলা',
        src: resolveAssetPath('assets/aistudio/cert_pbs_l3_bn.png'),
      },
    ],
    summary:
      'National Skills Certificate under BNQF covering spreadsheet business reporting, team coordination, and back-office administration.',
    competencies: [
      'Spreadsheets for business data & bilingual typing',
      'Small team coordination & business support tasks',
      'Digital media basics, IT skills & clipping path',
      'Workplace OHS & IT ethics standards',
    ],
  },
  {
    id: 'cert-linux-simplilearn',
    title: 'Basic Introduction to Linux Course',
    issuer: 'Simplilearn | SkillUP',
    issuerShort: 'Simplilearn SkillUP',
    track: 'training',
    credentialMeta: 'Online Course',
    category: 'Linux & Systems',
    credentialNumber: '4760301',
    issuedDate: '04 Jan 2024',
    certificateUrl: resolveAssetPath(
      'assets/aistudio/4760301_1704365632_ffe90d1f.pdf'
    ),
    certificateType: 'pdf',
    previewImages: [
      {
        label: 'Certificate',
        src: resolveAssetPath('assets/aistudio/cert_simplilearn_linux.png'),
      },
    ],
    summary:
      'Completed the Simplilearn SkillUP online course covering Linux OS architecture, shell commands, and file permissions.',
    competencies: [
      'Linux OS architecture & filesystem navigation',
      'Essential shell commands & file permissions',
      'System environment & administration basics',
    ],
  },
  {
    id: 'cert-nictf-cyber-ai',
    title: 'Cybersecurity Awareness and AI Governance',
    issuer: 'Nationalist ICT Forum (NICTF)',
    issuerShort: 'NICTF',
    track: 'training',
    credentialMeta: 'Training Participation',
    category: 'Cybersecurity & AI',
    credentialNumber: 'NICTF-CYBER-00245',
    issuedDate: '13 Nov 2026',
    certificateUrl: resolveAssetPath(
      'assets/aistudio/nictf-certificate-md-lal-chand-ali_page-0001_15674174.jpg'
    ),
    certificateType: 'image',
    previewImages: [
      {
        label: 'Certificate',
        src: resolveAssetPath(
          'assets/aistudio/nictf-certificate-md-lal-chand-ali_page-0001_15674174.jpg'
        ),
      },
    ],
    summary:
      'Participation certificate for completing the NICTF training session on cybersecurity awareness and responsible AI governance.',
    competencies: [
      'Cybersecurity threat awareness & digital hygiene',
      'Responsible AI governance & risk mitigation',
      'ICT security compliance & operational awareness',
    ],
  },
  {
    id: 'cert-bsrs-research',
    title: 'Research Fundamentals: From Curiosity to Scientific Discovery',
    issuer: 'Bangladesh Space Research Society (BSRS)',
    issuerShort: 'BSRS',
    track: 'training',
    credentialMeta: 'Online Webinar',
    category: 'Research & Methodology',
    issuedDate: '13 Nov 2026',
    certificateUrl: resolveAssetPath(
      'assets/aistudio/Screenshot_2026-11-14_232258_ec5b5fa4.png'
    ),
    certificateType: 'image',
    previewImages: [
      {
        label: 'Certificate',
        src: resolveAssetPath(
          'assets/aistudio/Screenshot_2026-11-14_232258_ec5b5fa4.png'
        ),
      },
    ],
    summary:
      'Participation certificate for the BSRS online webinar on scientific methods, structured inquiry, and research discovery workflows.',
    competencies: [
      'Formulating research questions & scientific inquiry',
      'Scientific methods & structured evaluation',
      'Essential research tools & discovery workflows',
    ],
  },
];

export const LEADERSHIP_STRENGTHS: string[] = [
  'Root-Cause Problem Solving',
  'Cross-Functional Coordination',
  'Clear Technical Communication',
  'SLA & Process Execution',
  'Stakeholder & Client Support',
  'Continuous Technical Learning',
];
