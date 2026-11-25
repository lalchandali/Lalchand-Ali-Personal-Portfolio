import { motion } from 'motion/react';
import { VERIFIED_ACHIEVEMENTS } from '../data/portfolioData';
import {
  RevealBlock,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from './MotionReveal';

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <RevealBlock className="max-w-2xl space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-sky-400">
            Verified Milestones
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
            Documented Achievements &amp; Qualifications
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Measurable career progression, academic performance, and nationally
            verified credentials.
          </p>
        </RevealBlock>

        <motion.div
          variants={staggerGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {VERIFIED_ACHIEVEMENTS.map((item) => (
            <motion.article
              key={item.id}
              variants={staggerItemVariants}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#111827] p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs font-mono text-blue-600 dark:text-sky-400">
                    {item.category}
                  </span>
                  <span className="font-display text-lg font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    {item.metric}
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <p className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                {item.verificationNote}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
