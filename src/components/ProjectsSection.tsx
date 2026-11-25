import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  FolderGit2,
  Layers,
} from 'lucide-react';
import {
  ProjectCategory,
  ProjectItem,
  PROJECTS,
} from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { SafeImage } from './SafeImage';
import {
  EXECUTIVE_EASE,
  RevealBlock,
  VIEWPORT_CONFIG,
} from './MotionReveal';

const FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Full-Stack Web' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'itsm', label: 'Laravel & ITSM' },
];

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const featuredProject = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const secondaryProjects = PROJECTS.filter((p) => p.id !== featuredProject.id);

  const filteredSecondary =
    filter === 'all'
      ? secondaryProjects
      : secondaryProjects.filter((p) => p.category === filter);

  const showFeatured =
    filter === 'all' || featuredProject.category === filter;

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#080B14] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading + Category Filter */}
        <RevealBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
              Portfolio Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
              Selected Projects &amp; Engineering Work
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
              Architecture-focused engineering work across full-stack FastAPI +
              React platforms, AI-assisted ITSM automation, and enterprise
              Laravel portals.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] w-fit"
          >
            {FILTERS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'text-white'
                      : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6243E8] to-[#7657F6]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </RevealBlock>

        {/* Featured Showcase Card — AgroMitra */}
        <AnimatePresence mode="popLayout">
          {showFeatured && (
            <motion.article
              key={featuredProject.id}
              layout="position"
              initial={{ opacity: 0, y: 28, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.52, ease: EXECUTIVE_EASE }}
              className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] overflow-hidden shadow-sm hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 transition-colors"
            >
            <div className="grid lg:grid-cols-12 items-stretch">
              {/* Preview Image */}
              <div className="lg:col-span-5 relative bg-slate-100 dark:bg-[#101827] min-h-[260px] lg:min-h-full overflow-hidden">
                <SafeImage
                  src={featuredProject.image}
                  alt={featuredProject.imageAlt}
                  fallbackTitle={featuredProject.title}
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#080B14]/75 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-xs text-white">
                  <span className="font-mono font-medium">
                    Featured Flagship · {featuredProject.year}
                  </span>
                  <span className="font-mono text-[#A3F7C5]">
                    {featuredProject.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Project Narrative, Features, Contributions & Stack */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6243E8] dark:text-[#00C2D9]">
                      <span>{featuredProject.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{featuredProject.subtitle}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {featuredProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                      {featuredProject.summary}
                    </p>
                  </div>

                  {/* Key Features + Key Contributions */}
                  <div className="grid sm:grid-cols-2 gap-5 pt-3 border-t border-slate-200 dark:border-[#263247]">
                    <div>
                      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2.5 flex items-center gap-1.5">
                        <Layers
                          className="w-3.5 h-3.5 text-[#7657F6]"
                          aria-hidden="true"
                        />
                        <span>Key Features</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC]">
                        {featuredProject.keyFeatures.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2
                              className="w-3.5 h-3.5 mt-1 text-[#0284C7] dark:text-[#00C2D9] shrink-0"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2.5 flex items-center gap-1.5">
                        <Code2
                          className="w-3.5 h-3.5 text-[#00C2D9]"
                          aria-hidden="true"
                        />
                        <span>Key Contributions</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8]">
                        {featuredProject.contributions.map((contrib) => (
                          <li key={contrib} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="text-[#7657F6] dark:text-[#A3F7C5] font-mono mt-0.5"
                            >
                              ·
                            </span>
                            <span>{contrib}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tech Stack & Action Row */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#263247]">
                  <div className="flex flex-wrap items-center gap-2">
                    {featuredProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-xs font-mono text-slate-700 dark:text-[#F8FAFC]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1.5 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedProject(featuredProject)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-xl bg-[#6243E8] dark:bg-[#7657F6] hover:bg-[#5234D6] dark:hover:bg-[#6545EB] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                    >
                      <span>Inspect Architecture &amp; Code</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </motion.button>

                    {featuredProject.repoUrl && (
                      <a
                        href={featuredProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] hover:border-[#7657F6] dark:hover:border-[#00C2D9] text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap shrink-0 transition-colors"
                      >
                        <FolderGit2 className="w-4 h-4" aria-hidden="true" />
                        <span>View Repository</span>
                        <ExternalLink
                          className="w-3.5 h-3.5 opacity-70"
                          aria-hidden="true"
                        />
                      </a>
                    )}

                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] hover:border-[#7657F6] dark:hover:border-[#00C2D9] text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap shrink-0 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink
                          className="w-3.5 h-3.5 opacity-70"
                          aria-hidden="true"
                        />
                      </a>
                    )}

                    <span className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                      {featuredProject.repoStatusNote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
          )}
        </AnimatePresence>

        {/* Secondary Engineering Projects */}
        {filteredSecondary.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSecondary.map((project, idx) => (
                <motion.article
                  key={project.id}
                  layout="position"
                  initial={{ opacity: 0, y: 26, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: EXECUTIVE_EASE,
                  }}
                  className="group rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] overflow-hidden flex flex-col justify-between hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm"
                >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-[#101827] border-b border-slate-200 dark:border-[#263247]">
                    <SafeImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                      <span className="text-[#6243E8] dark:text-[#00C2D9]">
                        {project.categoryLabel}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-[#263247] space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-[11px] font-mono text-slate-700 dark:text-[#94A3B8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6243E8] dark:text-[#00C2D9] hover:underline cursor-pointer"
                    >
                      <span>View Architecture &amp; Details</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-slate-500 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] inline-flex items-center gap-1"
                      >
                        <span>Repository</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8]">
                        Architecture Case Study
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
