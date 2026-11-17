import { useState } from 'react';
import { motion } from 'motion/react';
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
              Technical Capabilities
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
              Technical Skills &amp; Core Competencies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
              Applied technical stack spanning software engineering, AI-driven
              automation, IT service management, business operations, and
              competency-based assessment.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((group, idx) => {
            const Icon = CATEGORY_ICONS[group.id] ?? Code2;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{
                  duration: 0.48,
                  delay: idx * 0.06,
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

                    <ul className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#263247]">
                      {group.items.map((item) => (
                        <li key={item.name} className="space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                              {item.name}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
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
        </div>
      </div>
    </section>
  );
}
