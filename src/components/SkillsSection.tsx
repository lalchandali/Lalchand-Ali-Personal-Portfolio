import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Award,
  Bot,
  Briefcase,
  Code2,
  Layers,
  Server,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  EXECUTIVE_EASE,
  RevealBlock,
  VIEWPORT_CONFIG,
} from './MotionReveal';

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  languages: Code2,
  frameworks: Layers,
  ai: Bot,
  itsm: Server,
  business: Briefcase,
  cba: Award,
};

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#101827] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Heading + Filter Tabs */}
        <RevealBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
              Technical Stack
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
              Technical Skills &amp; Core Competencies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
              Verified technologies and practices across programming, full-stack
              web development, AI workflows, and supporting ITSM, operations,
              and NSDA assessment frameworks.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter skill categories"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#080B14]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'text-white'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              {selectedCategory === 'all' && (
                <motion.span
                  layoutId="skill-tab-bg"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6243E8] to-[#7657F6]"
                />
              )}
              <span className="relative z-10">All Categories</span>
            </button>

            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="skill-tab-bg"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6243E8] to-[#7657F6]"
                    />
                  )}
                  <span className="relative z-10">{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </RevealBlock>

        {/* Bento Skill Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((group, idx) => {
              const Icon = CATEGORY_ICONS[group.id] ?? Code2;
              return (
                <motion.div
                  key={group.id}
                  layout="position"
                  initial={{ opacity: 0, y: 26, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.48,
                    delay: (idx % 3) * 0.08,
                    ease: EXECUTIVE_EASE,
                  }}
                  className="group relative rounded-2xl p-[1px] bg-slate-200 dark:bg-[#263247] hover:bg-gradient-to-br hover:from-[#7657F6]/70 hover:to-[#00C2D9]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7657F6]/10"
                >
                  <div className="h-full rounded-[15px] bg-white dark:bg-[#141F30] p-6 flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                            {group.category}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1 leading-relaxed">
                            {group.description}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#101827] border border-slate-200 dark:border-[#263247] flex items-center justify-center text-[#6243E8] dark:text-[#00C2D9] shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                      </div>

                      <ul className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-[#263247]">
                        {group.items.map((item) => (
                          <li
                            key={item.name}
                            className="group/skill rounded-xl p-1.5 -mx-1.5 transition-colors duration-200 hover:bg-slate-50/80 dark:hover:bg-[#101827]/60"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <motion.span
                                whileHover={{ scale: 1.04, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 420,
                                  damping: 24,
                                }}
                                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-slate-200/90 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] text-xs sm:text-[13px] font-medium text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200 group-hover/skill:border-[#7657F6]/60 dark:group-hover/skill:border-[#00C2D9]/60 group-hover/skill:bg-gradient-to-r group-hover/skill:from-[#7657F6]/10 group-hover/skill:to-[#00C2D9]/10 group-hover/skill:text-[#6243E8] dark:group-hover/skill:text-[#00C2D9] group-hover/skill:shadow-sm group-hover/skill:shadow-[#7657F6]/10 cursor-default"
                              >
                                <span
                                  aria-hidden="true"
                                  className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 transition-all duration-300 group-hover/skill:scale-125 group-hover/skill:bg-[#7657F6] dark:group-hover/skill:bg-[#00C2D9] group-hover/skill:animate-pulse"
                                />
                                <span>{item.name}</span>
                              </motion.span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1.5 pl-0.5 leading-relaxed">
                              {item.context}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
