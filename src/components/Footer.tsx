import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { RevealBlock } from './MotionReveal';

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const linkedin = PROFILE.socials.find((s) => s.label === 'LinkedIn');
  const github = PROFILE.socials.find((s) => s.label === 'GitHub');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-200 no-print">
      <RevealBlock className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Identity Summary */}
          <div className="md:col-span-5 space-y-2">
            <p className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
              {PROFILE.displayName}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {PROFILE.headline}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {PROFILE.location}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Sections
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Profiles */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Direct Contact
            </h3>
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{PROFILE.email}</span>
            </a>

            <div className="flex items-center gap-2.5 pt-1">
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {year} {PROFILE.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Top</span>
          </button>
        </div>
      </RevealBlock>
    </footer>
  );
}
