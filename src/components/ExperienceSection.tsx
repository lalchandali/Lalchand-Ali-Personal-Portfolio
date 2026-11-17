import { motion } from 'motion/react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  GitCommitHorizontal,
  Layers,
  MapPin,
} from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';
import {
  EXECUTIVE_EASE,
  RevealBlock,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from './MotionReveal';

export function ExperienceSection() {
  const primaryRole = EXPERIENCE.find((e) => !e.isConcurrent);
  const concurrentRoles = EXPERIENCE.filter((e) => e.isConcurrent);

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#080B14] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <RevealBlock className="max-w-2xl space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
            Professional Journey
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            Experience &amp; Concurrent Leadership Roles
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
            Over 7 years of continuous software engineering progression paired
            with concurrent IT management, logistics, and customer operations
            responsibilities.
          </p>
        </RevealBlock>

        {/* Primary Career Progression — Softzino Technologies */}
        {primaryRole && (
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.55, delay: 0.05, ease: EXECUTIVE_EASE }}
            className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#263247]">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#6243E8] dark:text-[#A3F7C5]">
                  <span>Primary Engineering Tenure</span>
                  <span aria-hidden="true">·</span>
                  <span>7+ Years</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  {primaryRole.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-[#94A3B8]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    <Building2
                      className="w-4 h-4 text-[#7657F6]"
                      aria-hidden="true"
                    />
                    {primaryRole.company}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {primaryRole.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-[#94A3B8] shrink-0">
                <Calendar
                  className="w-4 h-4 text-[#0284C7] dark:text-[#00C2D9]"
                  aria-hidden="true"
                />
                <span>{primaryRole.period}</span>
              </div>
            </div>

            {/* Visual Career Progression Timeline */}
            {primaryRole.progressionSteps && (
              <div className="py-6 border-b border-slate-200 dark:border-[#263247]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8] mb-4">
                  <GitCommitHorizontal
                    className="w-4 h-4 text-[#7657F6]"
                    aria-hidden="true"
                  />
                  <span>Career Progression at {primaryRole.company}</span>
                </div>

                <motion.ol
                  variants={staggerGridVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_CONFIG}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  {primaryRole.progressionSteps.map((step, index) => {
                    const isCurrent =
                      index === primaryRole.progressionSteps!.length - 1;
                    return (
                      <motion.li
                        key={step}
                        variants={staggerItemVariants}
                        className={`rounded-xl border p-3.5 transition-colors ${
                          isCurrent
                            ? 'border-[#7657F6]/60 bg-[#7657F6]/8 dark:bg-[#7657F6]/15'
                            : 'border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-[#94A3B8]">
                            Step 0{index + 1}
                          </span>
                          {isCurrent && (
                            <span className="text-[11px] font-mono font-medium text-[#6243E8] dark:text-[#A3F7C5]">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="font-display text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                          {step}
                        </p>
                      </motion.li>
                    );
                  })}
                </motion.ol>
              </div>
            )}

            {/* Responsibilities */}
            <div className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-slate-700 dark:text-[#94A3B8] leading-relaxed">
                {primaryRole.highlights.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 text-[#6243E8] dark:text-[#00C2D9] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        )}

        {/* Concurrent Roles Subsection */}
        <RevealBlock className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers
                className="w-4 h-4 text-[#0284C7] dark:text-[#00C2D9]"
                aria-hidden="true"
              />
              <h3 className="font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Concurrent IT &amp; Business Operations Roles
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
              Held concurrently alongside software engineering at Softzino
              Technologies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {concurrentRoles.map((exp, idx) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: EXECUTIVE_EASE,
                }}
                className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] p-6 flex flex-col justify-between gap-5 hover:border-[#7657F6]/50 dark:hover:border-[#00C2D9]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#0284C7] dark:text-[#00C2D9] font-medium">
                      Concurrent Role · Active
                    </span>
                    <span className="text-slate-500 dark:text-[#94A3B8]">
                      {exp.period}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                      {exp.role}
                    </h4>
                    <p className="text-sm font-semibold text-[#6243E8] dark:text-[#A3F7C5] mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                    {exp.highlights.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 text-[#0284C7] dark:text-[#00C2D9] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
