import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  X,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  CertificationItem,
  CertificationTrack,
  EDUCATION,
  PROFILE,
} from '../data/portfolioData';
import {
  EXECUTIVE_EASE,
  RevealBlock,
  VIEWPORT_CONFIG,
} from './MotionReveal';
import { SafeImage } from './SafeImage';

const TRACK_FILTERS: { id: CertificationTrack; label: string }[] = [
  { id: 'all', label: 'All (8)' },
  { id: 'networking', label: 'Networking' },
  { id: 'nsda', label: 'NSDA National' },
  { id: 'training', label: 'Courses & Training' },
];

export function EducationCertificationsSection() {
  const [selectedTrack, setSelectedTrack] = useState<CertificationTrack>('all');
  const [showAll, setShowAll] = useState(false);
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const [previewPageIndex, setPreviewPageIndex] = useState(0);

  useEffect(() => {
    setPreviewPageIndex(0);
    if (!activeCert) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCert]);

  const filteredCertifications =
    selectedTrack === 'all'
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((cert) => cert.track === selectedTrack);

  const hasCollapsedToggle =
    selectedTrack === 'all' && filteredCertifications.length > 4;

  const visibleCertifications =
    hasCollapsedToggle && !showAll
      ? filteredCertifications.slice(0, 4)
      : filteredCertifications;

  const activePreview =
    activeCert?.previewImages?.[previewPageIndex] ??
    activeCert?.previewImages?.[0];

  const linkedinUrl =
    PROFILE.socials.find((s) => s.label === 'LinkedIn')?.href ?? '#';

  return (
    <section
      id="credentials"
      className="py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <RevealBlock className="max-w-2xl space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-sky-400">
            Education &amp; Certifications
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
            Academic Foundation &amp; Verified Credentials
          </h2>
        </RevealBlock>

        {/* Academic Degree */}
        {EDUCATION.map((edu) => (
          <motion.article
            key={edu.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.48, ease: EXECUTIVE_EASE }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0">
                <GraduationCap className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-blue-600 dark:text-sky-400 font-medium">
                    {edu.status}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{edu.institution}</span>
                  <span aria-hidden="true">·</span>
                  <span>{edu.location}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">
                  {edu.degree} in {edu.field}
                </h3>

                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  {edu.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-blue-600 dark:text-sky-400 font-mono"
                      >
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:text-right rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] px-5 py-4 shrink-0">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">
                Academic Result
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50 mt-0.5">
                CGPA {edu.cgpa}
              </p>
            </div>
          </motion.article>
        ))}

        {/* Compact Certifications & Training */}
        <div className="space-y-5">
          <RevealBlock className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                Certifications &amp; Technical Training
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Cisco CCNA training, NSDA national credentials, and verified
                systems &amp; AI governance coursework.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter certifications"
              className="flex flex-wrap items-center gap-1 p-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] w-fit"
            >
              {TRACK_FILTERS.map((tab) => {
                const isSelected = selectedTrack === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedTrack(tab.id);
                      if (tab.id !== 'all') setShowAll(false);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {visibleCertifications.map((cert, idx) => (
                <motion.article
                  key={cert.id}
                  layout="position"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.38,
                    delay: (idx % 2) * 0.06,
                    ease: EXECUTIVE_EASE,
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 flex flex-col justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                          <span className="text-blue-600 dark:text-sky-400 font-medium">
                            {cert.credentialMeta}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{cert.issuerShort}</span>
                          {cert.issuedDate && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{cert.issuedDate}</span>
                            </>
                          )}
                        </div>

                        <h4 className="font-display text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {cert.title}
                        </h4>
                      </div>

                      <Award
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {cert.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-slate-500 dark:text-slate-400 truncate tabular-nums">
                      {cert.credentialNumber
                        ? `ID: ${cert.credentialNumber}`
                        : cert.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-sky-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {cert.certificateUrl ? 'Inspect Certificate' : 'Details'}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {hasCollapsedToggle && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                aria-expanded={showAll}
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111827] hover:border-slate-400 dark:hover:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <span>
                  {showAll
                    ? 'Show Fewer'
                    : `Show All Credentials (${filteredCertifications.length})`}
                </span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Credential Inspection Modal */}
      <AnimatePresence>
        {activeCert && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EXECUTIVE_EASE }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-900 dark:text-slate-100 shadow-2xl"
            >
              <div className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md">
                <div className="space-y-0.5">
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                    {activeCert.credentialMeta} · {activeCert.issuer}
                  </p>
                  <h3
                    id="cert-modal-title"
                    className="font-display text-lg sm:text-xl font-bold"
                  >
                    {activeCert.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  aria-label="Close credential details"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {activePreview && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120]">
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText
                          className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400"
                          aria-hidden="true"
                        />
                        <span>Official Credential Document</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {activeCert.previewImages &&
                          activeCert.previewImages.length > 1 && (
                            <div
                              role="tablist"
                              aria-label="Certificate language page"
                              className="inline-flex items-center gap-1 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]"
                            >
                              {activeCert.previewImages.map((page, pIdx) => (
                                <button
                                  key={page.label}
                                  type="button"
                                  role="tab"
                                  aria-selected={previewPageIndex === pIdx}
                                  onClick={() => setPreviewPageIndex(pIdx)}
                                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                    previewPageIndex === pIdx
                                      ? 'bg-blue-600 text-white'
                                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                  }`}
                                >
                                  {page.label}
                                </button>
                              ))}
                            </div>
                          )}

                        {activeCert.certificateUrl && (
                          <a
                            href={activeCert.certificateUrl}
                            download
                            className="inline-flex items-center gap-1 text-blue-600 dark:text-sky-400 hover:underline"
                          >
                            <Download className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>
                              {activeCert.certificateType === 'pdf'
                                ? 'Download PDF'
                                : 'Download Image'}
                            </span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="bg-white p-2 sm:p-4">
                      <SafeImage
                        src={activePreview.src}
                        alt={`${activeCert.title} (${activePreview.label})`}
                        fallbackTitle={activeCert.title}
                        className="w-full h-auto max-h-[560px] object-contain mx-auto rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {(activeCert.credentialNumber ||
                  activeCert.registrationNo ||
                  activeCert.issuedDate) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] p-4 text-xs font-mono tabular-nums">
                    {activeCert.credentialNumber && (
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Certificate No.:
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                          {activeCert.credentialNumber}
                        </p>
                      </div>
                    )}
                    {activeCert.registrationNo && (
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Registration No.:
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                          {activeCert.registrationNo}
                        </p>
                      </div>
                    )}
                    {activeCert.issuedDate && (
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Issued Date:
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                          {activeCert.issuedDate}
                        </p>
                      </div>
                    )}
                    {activeCert.validUntil && (
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Valid Until:
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                          {activeCert.validUntil}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-display text-sm font-semibold">
                    Covered Competencies
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {activeCert.competencies.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="text-blue-600 dark:text-sky-400 font-mono"
                        >
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-sky-400 hover:underline"
                  >
                    <span>LinkedIn Licenses &amp; Certifications</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  {activeCert.certificateUrl && (
                    <a
                      href={activeCert.certificateUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {activeCert.certificateType === 'pdf'
                          ? 'Download PDF'
                          : 'Download Image'}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
