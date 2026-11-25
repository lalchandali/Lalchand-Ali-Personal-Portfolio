import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import {
  Download,
  Facebook,
  Github,
  Linkedin,
  Loader2,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onDownloadResume: () => void;
  isDownloadingResume: boolean;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  onDownloadResume,
  isDownloadingResume,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeId, setActiveId] = useState<string>('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 16);
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setActiveId(id);
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 border-b border-slate-200/80 dark:border-[#263247] bg-white/85 dark:bg-[#080B14]/85 backdrop-blur-md transition-all duration-200 no-print ${
        isScrolled ? 'shadow-md shadow-slate-900/5 dark:shadow-black/30' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Initials & Name */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] rounded-lg"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7657F6] to-[#00C2D9] text-white font-display font-bold text-sm flex items-center justify-center shadow-sm">
            {PROFILE.initials}
          </span>
          <span className="font-display font-semibold text-sm sm:text-base tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            {PROFILE.displayName}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`relative px-2.5 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] ${
                  isActive
                    ? 'text-[#6243E8] dark:text-[#F8FAFC]'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-[#7657F6] to-[#00C2D9]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.a
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.95 }}
            href={PROFILE.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
            className="hidden sm:flex w-10 h-10 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-slate-600 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9] hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6]"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
          </motion.a>

          <motion.a
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.95 }}
            href={PROFILE.socials[1].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-slate-600 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9] hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6]"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
          </motion.a>

          <motion.button
            type="button"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-slate-700 dark:text-[#F8FAFC] hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <Sun className="w-4 h-4 text-[#A3F7C5]" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 60, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -60, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <Moon className="w-4 h-4 text-[#6243E8]" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDownloadResume}
            disabled={isDownloadingResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#6243E8] dark:bg-[#7657F6] hover:bg-[#5234D6] dark:hover:bg-[#6545EB] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#080B14] cursor-pointer"
          >
            {isDownloadingResume ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{isDownloadingResume ? 'Preparing CV...' : 'Download CV'}</span>
          </motion.button>

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden w-11 h-11 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-slate-700 dark:text-[#F8FAFC] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] cursor-pointer"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] px-4 py-4 space-y-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#7657F6]/12 text-[#6243E8] dark:text-[#A3F7C5]'
                      : 'text-slate-700 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#141F30]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-200 dark:border-[#263247] space-y-3">
              <div className="flex items-center gap-2.5">
                <a
                  href={PROFILE.socials[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#080B14] text-xs font-medium text-slate-700 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9]"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.socials[1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#080B14] text-xs font-medium text-slate-700 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9]"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE.socials[2].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#080B14] text-xs font-medium text-slate-700 dark:text-[#94A3B8] hover:text-[#6243E8] dark:hover:text-[#00C2D9]"
                >
                  <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Facebook</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(false);
                  onDownloadResume();
                }}
                disabled={isDownloadingResume}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-[#6243E8] dark:bg-[#7657F6] text-white text-sm font-medium"
              >
                {isDownloadingResume ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="w-4 h-4" aria-hidden="true" />
                )}
                <span>Download CV (PDF)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
