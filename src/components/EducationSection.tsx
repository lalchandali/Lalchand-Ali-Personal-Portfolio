import { motion } from 'motion/react';
import { Award, CheckCircle2, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export function EducationSection() {
  return (
    <section
      id="education"
      className="py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#080B14] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
            Academic Foundation
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {EDUCATION.map((edu) => (
            <motion.article
              key={edu.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7657F6]/15 to-[#00C2D9]/15 border border-[#7657F6]/30 flex items-center justify-center text-[#6243E8] dark:text-[#00C2D9] shrink-0">
                  <GraduationCap className="w-7 h-7" aria-hidden="true" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                    <span className="text-[#6243E8] dark:text-[#A3F7C5] font-medium">
                      {edu.status}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {edu.location}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {edu.degree} in {edu.field}
                  </h3>

                  <p className="text-base font-medium text-slate-700 dark:text-[#F8FAFC]">
                    {edu.institution}
                  </p>

                  <ul className="pt-2 space-y-1.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                    {edu.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 text-[#0284C7] dark:text-[#00C2D9] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:text-right rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] px-5 py-4 shrink-0">
                <div className="flex items-center lg:justify-end gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                  <Award
                    className="w-4 h-4 text-[#7657F6] dark:text-[#A3F7C5]"
                    aria-hidden="true"
                  />
                  <span>Academic Result</span>
                </div>
                <p className="font-display text-2xl font-bold tabular-nums text-[#0F172A] dark:text-[#F8FAFC] mt-1">
                  CGPA {edu.cgpa}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
