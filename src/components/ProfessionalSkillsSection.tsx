import { motion } from 'motion/react';
import {
  BookOpen,
  Briefcase,
  Clock,
  Compass,
  Handshake,
  Lightbulb,
  MessageSquare,
  Users,
} from 'lucide-react';
import { PROFESSIONAL_SKILLS } from '../data/portfolioData';

const SKILL_ICONS = [
  Lightbulb,
  MessageSquare,
  Users,
  Compass,
  Handshake,
  Briefcase,
  BookOpen,
  Clock,
];

export function ProfessionalSkillsSection() {
  return (
    <section
      id="professional-skills"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#080B14] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
            Leadership &amp; Soft Competencies
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            Professional &amp; Management Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
            Cross-functional execution skills cultivated across software
            engineering delivery, enterprise IT support, and concurrent business
            operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROFESSIONAL_SKILLS.map((skill, idx) => {
            const Icon = SKILL_ICONS[idx % SKILL_ICONS.length];
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.38,
                  delay: idx * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] p-5 space-y-3 hover:border-[#7657F6]/50 dark:hover:border-[#00C2D9]/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#101827] border border-slate-200 dark:border-[#263247] flex items-center justify-center text-[#6243E8] dark:text-[#00C2D9]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3 className="font-display text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  {skill.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
