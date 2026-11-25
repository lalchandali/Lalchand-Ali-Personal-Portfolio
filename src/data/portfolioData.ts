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
  alt: 'Professional portrait of Md Lal Chand Ali, Software Engineer',
};

export const ROTATING_KEYWORDS = [
  'Full-Stack Software Engineering',
  'IT Service Management (ITSM)',
  'AI & Workflow Automation',
  'Laravel & FastAPI Architecture',
];

export const ABOUT_HIGHLIGHTS = [
  {
    id: 'hl-exp',
    title: '7+ Years Engineering Tenure',
    subtitle: 'Softzino Technologies (2019–Present)',
    detail:
      'Progressed from Development Assistant through Senior Executive (IT) and Associate Software Engineer to Software Engineer delivering enterprise systems.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-eng',
    title: 'Full-Stack Engineering',
    subtitle: 'Python · FastAPI · PHP · Laravel · React.js',
    detail:
      'Architects maintainable backend APIs, role-based portals, authentication flows, and responsive React.js web interfaces.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-itsm',
    title: 'IT Service Management',
    subtitle: 'Infrastructure Reliability & Root-Cause Analysis',
    detail:
      'Hands-on server administration, incident governance, structured debugging, and SLA-oriented technical support.',
    span: 'md:col-span-2',
  },
  {
    id: 'hl-ai',
    title: 'AI-Driven Workflows',
    subtitle: 'Prompt Engineering & Automation Scripts',
    detail:
      'Applies prompt engineering and Python automation inside developer and ITSM triage pipelines to accelerate diagnosis and delivery.',
    span: 'md:col-span-3',
  },
  {
    id: 'hl-ops',
    title: 'Operational & Assessment Breadth',
    subtitle: 'Supporting Background in Operations & NSDA CBA',
    detail:
      'Complements core software engineering with hands-on IT advisory, fulfillment coordination, and formal NSDA competency evaluation standards.',
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
      'Primary full-time role leading full-stack web engineering, AI workflow automation, and enterprise IT service management.',
    highlights: [
      'Architect, develop, and maintain production web applications and REST APIs using Python, FastAPI, PHP, and Laravel.',
      'Embed prompt engineering and AI-assisted diagnostic tooling into internal developer workflows to accelerate triage and documentation.',
      'Manage IT service delivery (ITSM), Linux/server administration, preventive maintenance, and enterprise infrastructure support.',
      'Lead technical debugging and root-cause analysis across production incidents, translating business specs into maintainable releases.',
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
      'Part-time shared-group operational mandate overseeing fulfillment workflows, order tracking, and customer escalation resolution.',
    highlights: [
      'Direct daily order fulfillment, delivery partner coordination, and inventory movement across online retail operations.',
      'Handle escalated customer inquiries and enforce service quality standards across order lifecycles.',
      'Streamline logistics handoffs and fulfillment tracking alongside core engineering commitments.',
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
      'Part-time group IT advisory mandate aligning sister-entity technical requirements, vendor systems, and internal workflows.',
    highlights: [
      'Advise on internal IT operations, workstation readiness, and technical service continuity across group initiatives.',
      'Translate operational bottlenecks into structured software and automation specifications for business stakeholders.',
      'Coordinate technical setup and IT support workflows on a scheduled part-time advisory basis.',
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
    repoStatusNote: 'Proprietary Enterprise Workflow · Architecture Case Study',
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
    subtitle: 'Role-Based Ticketing, Incident Escalation & Server Health Workflows',
    category: 'itsm',
    categoryLabel: 'Laravel & ITSM',
    year: '2024',
    role: 'Software Engineer · Softzino Technologies',
    summary:
      'Architected and maintained multi-role PHP & Laravel enterprise portals integrating IT service management (ITSM) ticket lifecycles, automated SLA escalation rules, and infrastructure health diagnostics.',
    keyFeatures: [
      'Role-based access control & multi-tenant permissions',
      'Structured ITSM incident lifecycle & SLA escalation tracking',
      'Automated server health checks & root-cause audit logs',
      'RESTful API integration with internal operations tooling',
    ],
    contributions: [
      'Built modular Laravel services, policies, and REST API endpoints',
      'Designed normalized relational schemas for audit & incident trails',
      'Aligned system troubleshooting logs with ITSM root-cause workflows',
    ],
    stack: ['PHP', 'Laravel', 'REST APIs', 'MySQL', 'ITSM', 'Linux Server'],
    image: resolveAssetPath(
      'src/assets/images/project_distributed_telemetry_1794909245929.jpg'
    ),
    imageAlt:
      'Enterprise service monitoring and ITSM operational health dashboard displaying live service telemetry and incident status',
    repoStatusNote: 'Enterprise Architecture Case Study',
    demoStatusNote: 'Enterprise Architecture & Laravel Service Pattern',
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
      'End-to-end architecture and delivery of scalable web portals, backend services, and clean REST APIs.',
    capabilities: [
      'Python (FastAPI), PHP (Laravel) & React.js systems',
      'Authentication, RBAC & modular API architecture',
      'Database design, performance tuning & deployment',
    ],
  },
  {
    id: 'srv-itsm',
    title: 'IT Service Management & Infrastructure',
    summary:
      'Dependable infrastructure administration, preventive server maintenance, and structured root-cause resolution.',
    capabilities: [
      'Enterprise system administration & uptime governance',
      'Technical troubleshooting & root-cause analysis',
      'Incident workflows, SLAs & operational continuity',
    ],
  },
  {
    id: 'srv-ai',
    title: 'AI Workflows & Operations Automation',
    summary:
      'Applying prompt engineering, LLM tools, and automation scripts to accelerate engineering and business execution.',
    capabilities: [
      'Structured prompt engineering & AI-assisted triage',
      'Python workflow automation & operational tooling',
      'Logistics, customer support & process optimization',
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
    id: 'cert-cba-l4',
    title: 'Competency-Based Assessment – Level 4',
    issuer: 'National Skills Development Authority (NSDA)',
    issuerShort: 'NSDA',
    track: 'nsda',
    credentialMeta: 'NSDA Level 4',
    category: 'Assessment & Training',
    featured: true,
    summary:
      'Certified capability in designing and conducting competency-based skills evaluations under national CBT&A frameworks.',
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
      'Hands-on routing, switching, IP addressing, and enterprise network infrastructure fundamentals.',
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
      'National Skills Certificate under BNQF covering workstation assembly, OS configuration, networking, and technical troubleshooting.',
    competencies: [
      'Install, configure & optimize OS and utility software',
      'Maintain & troubleshoot PCs and perform PC assembly',
      'Basic networking, data backup & recovery',
      'IT support fundamentals & workplace English interaction',
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
      'National Skills Certificate (220 hours, BNQF) in customer management techniques, software tools, service quality, and IT ethics.',
    competencies: [
      'Customer management techniques & service quality compliance',
      'Software tools in customer service & basic IT skills',
      'Effective communication, presentations & teamwork',
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
      'National Skills Certificate under BNQF covering spreadsheet business data management, small team leadership, and back-office operations.',
    competencies: [
      'Spreadsheets for business data & Bangla/English typing',
      'Lead small teams & basic business development activities',
      'Basic digital marketing, IT skills & clipping path',
      'Customer soft skills, OHS & IT workplace ethics',
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
      'Certificate of Completion for successfully finishing the Simplilearn SkillUP online course covering Linux fundamentals and command-line workflows.',
    competencies: [
      'Linux OS architecture & file system navigation',
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
      'Certificate of Participation for completing the training program on Cybersecurity Awareness and AI Governance organized by Nationalist ICT Forum (NICTF).',
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
      'Certificate of Participation in the online webinar organized by the Department of Research and Development, Bangladesh Space Research Society (BSRS).',
    competencies: [
      'Exploring research ideas & scientific inquiry',
      'Scientific methods & structured evaluation',
      'Essential research tools & discovery workflows',
    ],
  },
];

export const LEADERSHIP_STRENGTHS: string[] = [
  'Analytical Root-Cause Solving',
  'Cross-Functional Team Coordination',
  'Technical Stakeholder Communication',
  'SLA & Operational Execution',
  'Customer Escalation Management',
  'Continuous Learning & Adaptability',
];
