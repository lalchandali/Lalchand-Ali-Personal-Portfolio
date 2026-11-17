import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8FAFC] dark:bg-[#080B14] border-t border-slate-200 dark:border-[#263247] transition-colors duration-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7657F6] to-[#00C2D9] text-white font-display font-bold text-xs flex items-center justify-center">
                {PROFILE.initials}
              </span>
              <span className="font-display font-bold text-base text-[#0F172A] dark:text-[#F8FAFC]">
                {PROFILE.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              {PROFILE.designation}
            </p>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
              {PROFILE.location}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-[#94A3B8]">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emails & Socials */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
              Direct Channels
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-[#94A3B8]">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-2 hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>
              <a
                href={`mailto:${PROFILE.secondaryEmail}`}
                className="flex items-center gap-2 hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{PROFILE.secondaryEmail}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={PROFILE.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9] transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9] transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-[#263247] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#94A3B8]">
          <p>
            © {year} {PROFILE.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] text-slate-700 dark:text-[#F8FAFC] hover:border-[#7657F6] dark:hover:border-[#00C2D9] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
