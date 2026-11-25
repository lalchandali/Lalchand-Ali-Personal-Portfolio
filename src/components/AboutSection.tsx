import { motion } from 'motion/react';
import {
  Bot,
  Briefcase,
  Code2,
  Compass,
  Server,
} from 'lucide-react';
import { ABOUT_HIGHLIGHTS, PROFILE } from '../data/portfolioData';
import {
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from './MotionReveal';

const HIGHLIGHT_ICONS = [Briefcase, Code2, Server, Bot, Compass];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#101827] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Executive Summary Narrative */}
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-5 space-y-5"
          >
            <motion.p
              variants={staggerItemVariants}
              className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]"
            >
              About Me
            </motion.p>
            <motion.h2
              variants={staggerItemVariants}
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance"
            >
              Engineering Solutions. Empowering Operations.
            </motion.h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              {PROFILE.summaryParagraphs.map((para) => (
                <motion.p key={para} variants={staggerItemVariants}>
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* 5-Highlight Bento Grid */}
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-6 gap-4"
          >
            {ABOUT_HIGHLIGHTS.map((item, idx) => {
              const Icon = HIGHLIGHT_ICONS[idx % HIGHLIGHT_ICONS.length];
              return (
                <motion.div
                  key={item.id}
                  variants={staggerItemVariants}
                  className={`${item.span} group rounded-2xl border border-slate-200 dark:border-[#263247] bg-slate-50/80 dark:bg-[#141F30] p-5 sm:p-6 hover:border-[#7657F6]/50 dark:hover:border-[#00C2D9]/50 transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-[#6243E8] dark:text-[#00C2D9] mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-[#101827] border border-slate-200 dark:border-[#263247] flex items-center justify-center text-[#6243E8] dark:text-[#A3F7C5] shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
