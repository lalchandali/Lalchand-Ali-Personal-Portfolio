import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  Copy,
  ExternalLink,
  FolderGit2,
  Layers,
  Lock,
  X,
} from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';
import { EXECUTIVE_EASE } from './MotionReveal';
import { SafeImage } from './SafeImage';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  const handleCopyCode = async () => {
    if (!project?.codeSnippet) return;
    try {
      await navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Clipboard blocked in restricted contexts
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EXECUTIVE_EASE }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-900 dark:text-slate-100 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md">
              <div className="space-y-0.5">
                <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                  {project.categoryLabel} · {project.year} · {project.role}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-lg sm:text-xl font-bold"
                >
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {project.screenshots.length > 0 && (
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                  <SafeImage
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    fallbackTitle={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Problem Statement
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Solution Architecture
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Technical Implementation
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {project.technicalImplementation.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="font-mono text-blue-600 dark:text-sky-400"
                      >
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>Architecture Layers</span>
                </h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {project.architectureLayers.map((layer) => (
                    <div
                      key={layer.layer}
                      className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] p-3 space-y-1"
                    >
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {layer.layer}
                      </p>
                      <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        {layer.components}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Challenges
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Outcomes
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.outcomes}
                  </p>
                </div>
              </div>

              {project.codeSnippet && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#0B1120] text-slate-100 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-800 bg-slate-900">
                    <span className="text-xs font-mono text-slate-400 truncate">
                      {project.codeSnippet.filename}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-700 text-xs font-mono text-slate-200 hover:border-sky-400 transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5 text-emerald-400"
                            aria-hidden="true"
                          />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Stack: {project.stack.join(' · ')}
                </p>

                <div className="flex items-center gap-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:border-slate-400"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                    >
                      <FolderGit2 className="w-4 h-4" aria-hidden="true" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                      {project.confidential && (
                        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      <span>{project.repoStatusNote}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
