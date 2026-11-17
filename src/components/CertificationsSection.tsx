import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { CERTIFICATIONS, CertificationItem } from '../data/portfolioData';

export function CertificationsSection() {
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(
    null
  );

  return (
    <section
      id="certifications"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#101827] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
            Verified Credentials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            Certifications &amp; Technical Training
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
            Nationally recognized NSDA competency certifications and Cisco
            networking training supporting infrastructure, service delivery, and
            assessment excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-slate-200 dark:border-[#263247] bg-slate-50/70 dark:bg-[#141F30] p-6 flex flex-col justify-between gap-5 hover:border-[#7657F6]/60 dark:hover:border-[#00C2D9]/60 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-mono text-[#6243E8] dark:text-[#00C2D9] font-medium">
                    {cert.credentialMeta}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-[#101827] border border-slate-200 dark:border-[#263247] flex items-center justify-center text-[#6243E8] dark:text-[#A3F7C5] shrink-0">
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                  {cert.issuer} · {cert.category}
                </p>

                <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {cert.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-[#263247] flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-[#A3F7C5] font-medium">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Completed Credential</span>
                </span>

                {cert.certificateUrl && (
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="inline-flex items-center gap-1 font-medium text-[#6243E8] dark:text-[#00C2D9] hover:underline cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {previewCert && previewCert.certificateUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {previewCert.title}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <img
              src={previewCert.certificateUrl}
              alt={previewCert.title}
              className="w-full rounded-xl border border-slate-200 dark:border-[#263247]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
