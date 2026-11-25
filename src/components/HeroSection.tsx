import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Briefcase,
  Code2,
  Cpu,
  Download,
  Facebook,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Server,
} from 'lucide-react';
import {
  HERO_IMAGE,
  PROFILE,
  ROTATING_KEYWORDS,
} from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onExploreWork: () => void;
  onDownloadCv: () => void;
  isDownloadingCv: boolean;
  onConnect: () => void;
}

export function HeroSection({
  onExploreWork,
  onDownloadCv,
  isDownloadingCv,
  onConnect,
}: HeroSectionProps) {
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#080B14] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      {/* Subtle Architectural Tech Grid & Atmospheric Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-tech-grid opacity-70 pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 right-0 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(118,87,246,0.14)_0%,rgba(0,194,217,0.06)_45%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(118,87,246,0.22)_0%,rgba(0,194,217,0.09)_45%,transparent_72%)] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column — Typographic Identity & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-700 dark:text-[#A3F7C5]"
            >
              <Briefcase className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{PROFILE.availability}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-3"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                Software Engineer Building{' '}
                <span className="bg-gradient-to-r from-[#6243E8] via-[#7657F6] to-[#00C2D9] dark:from-[#F8FAFC] dark:via-[#C4B5FD] dark:to-[#00C2D9] bg-clip-text text-transparent">
                  Practical Digital Solutions.
                </span>
              </h1>

              <p className="text-sm sm:text-base font-medium text-[#0284C7] dark:text-[#00C2D9]">
                {PROFILE.designation}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-2xl"
            >
              {PROFILE.positioning}
            </motion.p>

            {/* Animated Rotating Focus Keyword */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center gap-2.5 text-sm"
            >
              <span className="font-mono text-xs text-slate-500 dark:text-[#94A3B8]">
                Core Focus:
              </span>
              <div className="relative h-7 min-w-[240px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_KEYWORDS[keywordIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-semibold text-[#6243E8] dark:text-[#A3F7C5]"
                  >
                    {ROTATING_KEYWORDS[keywordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6243E8] to-[#7657F6] hover:from-[#5234D6] hover:to-[#00A8BD] text-white text-sm font-semibold shadow-lg shadow-[#7657F6]/20 whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onDownloadCv}
                disabled={isDownloadingCv}
                className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#141F30] hover:border-[#7657F6] dark:hover:border-[#00C2D9] text-[#0F172A] dark:text-[#F8FAFC] text-sm font-semibold whitespace-nowrap shrink-0 transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6] cursor-pointer"
              >
                {isDownloadingCv ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="w-4 h-4" aria-hidden="true" />
                )}
                <span>
                  {isDownloadingCv ? 'Generating PDF...' : 'Download My CV'}
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConnect}
                className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl text-sm font-semibold text-[#6243E8] dark:text-[#00C2D9] hover:bg-[#7657F6]/8 dark:hover:bg-[#00C2D9]/10 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2D9] cursor-pointer"
              >
                <span>Let&apos;s Connect</span>
              </motion.button>
            </motion.div>

            {/* Social Links & Location Meta */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pt-4 border-t border-slate-200 dark:border-[#263247] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-slate-600 dark:text-[#94A3B8]"
            >
              <a
                href={PROFILE.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PROFILE.socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE.socials[2].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
                <span>Facebook</span>
              </a>

              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[#6243E8] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>

              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column — Portrait Card with Gradient Orb & Floating Tech Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Soft Ambient Orb */}
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1, 1.05, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-[#7657F6]/25 via-[#00C2D9]/15 to-[#A3F7C5]/10 blur-2xl pointer-events-none"
              />

              {/* Floating Tech Nodes */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="hidden sm:flex absolute -top-4 -left-4 z-10 w-11 h-11 rounded-xl border border-slate-200 dark:border-[#263247] bg-white/95 dark:bg-[#141F30]/95 shadow-lg items-center justify-center text-[#7657F6]"
              >
                <Code2 className="w-5 h-5" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                className="hidden sm:flex absolute top-10 -right-4 z-10 w-11 h-11 rounded-xl border border-slate-200 dark:border-[#263247] bg-white/95 dark:bg-[#141F30]/95 shadow-lg items-center justify-center text-[#00C2D9]"
              >
                <Server className="w-5 h-5" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.1,
                }}
                className="hidden sm:flex absolute bottom-20 -left-5 z-10 w-11 h-11 rounded-xl border border-slate-200 dark:border-[#263247] bg-white/95 dark:bg-[#141F30]/95 shadow-lg items-center justify-center text-emerald-600 dark:text-[#A3F7C5]"
              >
                <Bot className="w-5 h-5" />
              </motion.div>

              {/* Main Portrait Container */}
              <div className="relative rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] p-3 shadow-xl">
                <div className="aspect-[4/4.2] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-[#101827]">
                  <SafeImage
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    fallbackTitle={PROFILE.displayName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Integrated 7+ Years Highlight Strip */}
                <div className="mt-3 rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] px-4 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display font-bold text-lg tabular-nums text-[#0F172A] dark:text-[#F8FAFC]">
                      {PROFILE.experienceYearsLabel}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-[#94A3B8] truncate">
                      Softzino Technologies · Dhaka
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#7657F6]/12 dark:bg-[#7657F6]/20 text-[#6243E8] dark:text-[#A3F7C5] flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
