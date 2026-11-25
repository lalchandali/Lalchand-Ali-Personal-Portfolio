import { motion } from 'motion/react';
import { Bot, CheckCircle2, Code2, Server } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import {
  RevealBlock,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from './MotionReveal';

const SERVICE_ICONS = [Code2, Server, Bot];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#101827] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <RevealBlock className="max-w-2xl space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
            Capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            What I Deliver
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
            Full-stack web engineering and practical workflow automation,
            supported by dependable IT service management and technical
            operations.
          </p>
        </RevealBlock>

        <motion.div
          variants={staggerGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <motion.div
                key={service.id}
                variants={staggerItemVariants}
                className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-slate-50/70 dark:bg-[#141F30] p-6 flex flex-col justify-between gap-5 hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7657F6]/15 to-[#00C2D9]/15 border border-[#7657F6]/25 dark:border-[#00C2D9]/25 flex items-center justify-center text-[#6243E8] dark:text-[#00C2D9]">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 pt-4 border-t border-slate-200 dark:border-[#263247] text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC]">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 text-[#0284C7] dark:text-[#A3F7C5] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
