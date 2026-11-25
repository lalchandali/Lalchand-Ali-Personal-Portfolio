import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FolderGit2,
  X,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface ProjectModalProps {
  project: ProjectItem | null;
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
    if (!project) return;
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
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] text-[#0F172A] dark:text-[#F8FAFC] shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-[#263247] bg-white/95 dark:bg-[#141F30]/95 backdrop-blur-md">
              <div>
                <p className="text-xs font-mono text-[#6243E8] dark:text-[#00C2D9]">
                  {project.categoryLabel} · {project.year}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-xl font-bold mt-0.5"
                >
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-100 dark:bg-[#101827]">
                <SafeImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                {project.summary}
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] p-4 space-y-2.5">
                  <h4 className="font-display text-sm font-semibold">
                    Key Features
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-[#94A3B8]">
                    {project.keyFeatures.map((feat) => (
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

                <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] p-4 space-y-2.5">
                  <h4 className="font-display text-sm font-semibold">
                    Key Contributions
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-[#94A3B8]">
                    {project.contributions.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="font-mono text-[#7657F6] dark:text-[#A3F7C5]">
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-[#080B14] text-slate-100 overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#263247] bg-[#101827]">
                  <span className="text-xs font-mono text-[#94A3B8] truncate">
                    {project.codeSnippet.filename}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#263247] text-xs font-mono text-[#F8FAFC] hover:border-[#00C2D9] transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check
                          className="w-3.5 h-3.5 text-[#A3F7C5]"
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

              {/* Honest Repo / Case Study Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-[#263247]">
                <p className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                  {project.demoStatusNote}
                </p>
                <div className="flex items-center gap-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-[#263247] text-xs font-semibold hover:border-[#7657F6] dark:hover:border-[#00C2D9]"
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6243E8] dark:bg-[#7657F6] text-white text-xs font-semibold hover:opacity-95"
                    >
                      <FolderGit2 className="w-4 h-4" aria-hidden="true" />
                      <span>View Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      {project.repoStatusNote}
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
