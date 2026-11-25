import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Network,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  CertificationItem,
  CertificationTrack,
  PROFILE,
} from '../data/portfolioData';
import {
  EXECUTIVE_EASE,
  RevealBlock,
  VIEWPORT_CONFIG,
} from './MotionReveal';
import { SafeImage } from './SafeImage';

const TRACK_FILTERS: { id: CertificationTrack; label: string }[] = [
  { id: 'all', label: 'All Credentials' },
  { id: 'nsda', label: 'NSDA National' },
  { id: 'networking', label: 'Cisco Networking' },
  { id: 'training', label: 'Training & Sessions' },
];

export function CertificationsSection() {
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

  const handleRequestCopy = () => {
    setActiveCert(null);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePreview =
    activeCert?.previewImages?.[previewPageIndex] ??
    activeCert?.previewImages?.[0];

  return (
    <section
      id="certifications"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#101827] border-b border-slate-200 dark:border-[#263247] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading + Track Filter Tabs */}
        <RevealBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#6243E8] dark:text-[#00C2D9]">
              <span className="uppercase tracking-wider">
                Verified Credentials
              </span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span className="text-slate-500 dark:text-[#94A3B8]">
                4 NSDA National · 1 Cisco CCNA · 3 Training &amp; Sessions
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
              Certifications &amp; Professional Training
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8]">
              National competency credentials (NSDA), Cisco CCNA networking
              training, and verified courses in Linux, cybersecurity, AI
              governance, and research fundamentals.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter certifications"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#080B14] w-fit"
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
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="cert-track-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6243E8] to-[#7657F6]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </RevealBlock>

        {/* Balanced 2x2 default (top 4 core) or 2 + 3 + 3 expanded */}
        <motion.div
          layout
          className={`grid grid-cols-1 gap-6 ${
            selectedTrack === 'all'
              ? showAll
                ? 'md:grid-cols-2 lg:grid-cols-6'
                : 'md:grid-cols-2'
              : selectedTrack === 'nsda'
                ? 'md:grid-cols-2'
                : selectedTrack === 'training'
                  ? 'md:grid-cols-2 lg:grid-cols-3'
                  : 'max-w-2xl'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {visibleCertifications.map((cert, idx) => {
              const Icon =
                cert.track === 'networking'
                  ? Network
                  : cert.track === 'training'
                    ? GraduationCap
                    : Award;
              const spanClass =
                selectedTrack === 'all' && showAll
                  ? cert.featured
                    ? 'lg:col-span-3'
                    : 'lg:col-span-2'
                  : '';
              const cardPreview =
                cert.track === 'training' ? undefined : cert.previewImages?.[0];

              return (
                <motion.article
                  key={cert.id}
                  layout="position"
                  initial={{ opacity: 0, y: 26, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.48,
                    delay: (idx % 3) * 0.07,
                    ease: EXECUTIVE_EASE,
                  }}
                  className={`${spanClass} group relative rounded-2xl p-[1px] bg-slate-200 dark:bg-[#263247] hover:bg-gradient-to-br hover:from-[#7657F6]/70 hover:to-[#00C2D9]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7657F6]/10`}
                >
                <div className="h-full rounded-[15px] bg-slate-50/80 dark:bg-[#141F30] p-6 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          <span className="text-[#6243E8] dark:text-[#00C2D9] font-semibold">
                            {cert.credentialMeta}
                          </span>
                          <span aria-hidden="true" className="text-slate-400">
                            ·
                          </span>
                          <span className="text-slate-500 dark:text-[#94A3B8]">
                            {cert.category}
                          </span>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                          {cert.title}
                        </h3>

                        <p className="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                          Issued by {cert.issuer}
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#101827] border border-slate-200 dark:border-[#263247] flex items-center justify-center text-[#6243E8] dark:text-[#A3F7C5] shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>

                    {cardPreview && (
                      <button
                        type="button"
                        onClick={() => setActiveCert(cert)}
                        aria-label={`Preview ${cert.title} certificate`}
                        className="block w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657F6]"
                      >
                        <SafeImage
                          src={cardPreview.src}
                          alt={`${cert.title} certificate preview`}
                          fallbackTitle={cert.title}
                          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </button>
                    )}

                    <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                      {cert.summary}
                    </p>

                    {(cert.credentialNumber || cert.issuedDate) && (
                      <div className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] space-y-0.5 tabular-nums">
                        {cert.credentialNumber && (
                          <p>
                            Credential No.:{' '}
                            <span className="text-[#0F172A] dark:text-[#F8FAFC]">
                              {cert.credentialNumber}
                            </span>
                          </p>
                        )}
                        {cert.issuedDate && (
                          <p>
                            Issued: {cert.issuedDate}
                            {cert.validUntil
                              ? ` · Valid until: ${cert.validUntil}`
                              : ''}
                          </p>
                        )}
                      </div>
                    )}

                    <ul className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-[#263247] text-xs text-slate-700 dark:text-[#F8FAFC]">
                      {cert.competencies.slice(0, 3).map((comp) => (
                        <li key={comp} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 mt-0.5 text-[#0284C7] dark:text-[#00C2D9] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-[#263247] flex items-center justify-between gap-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-[#A3F7C5] font-medium">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {cert.certificateUrl
                          ? 'Certificate Attached'
                          : 'Completed Credential'}
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="inline-flex items-center gap-1 font-semibold text-[#6243E8] dark:text-[#00C2D9] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {cert.certificateUrl ? 'View Certificate' : 'Details'}
                      </span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hasCollapsedToggle && (
          <RevealBlock delay={0.08} className="flex justify-center pt-2">
            <motion.button
              type="button"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.97 }}
              aria-expanded={showAll}
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] hover:border-[#7657F6] dark:hover:border-[#00C2D9] text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <span>
                {showAll
                  ? 'Show Fewer'
                  : `Show All (${filteredCertifications.length})`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              )}
            </motion.button>
          </RevealBlock>
        )}
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
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EXECUTIVE_EASE }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#141F30] text-[#0F172A] dark:text-[#F8FAFC] shadow-2xl"
            >
              <div className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-[#263247] bg-white/95 dark:bg-[#141F30]/95 backdrop-blur-md">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-[#6243E8] dark:text-[#00C2D9]">
                    {activeCert.credentialMeta} · {activeCert.category}
                  </p>
                  <h3
                    id="cert-modal-title"
                    className="font-display text-xl font-bold"
                  >
                    {activeCert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                    Issuing Organization: {activeCert.issuer}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  aria-label="Close credential details"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {activePreview && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827]">
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-[#263247] text-xs font-mono text-slate-600 dark:text-[#94A3B8]">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText
                          className="w-3.5 h-3.5 text-[#7657F6] dark:text-[#00C2D9]"
                          aria-hidden="true"
                        />
                        <span>
                          {activeCert.track === 'nsda'
                            ? 'Official National Skills Certificate Preview'
                            : activeCert.track === 'training'
                              ? 'Official Training & Participation Certificate'
                              : 'Official Certificate of Completion'}
                        </span>
                      </span>

                      <div className="flex items-center gap-2">
                        {activeCert.previewImages &&
                          activeCert.previewImages.length > 1 && (
                            <div
                              role="tablist"
                              aria-label="Certificate language page"
                              className="inline-flex items-center gap-1 p-0.5 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#080B14]"
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
                                      ? 'bg-[#6243E8] dark:bg-[#7657F6] text-white'
                                      : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
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
                            className="inline-flex items-center gap-1 text-[#6243E8] dark:text-[#00C2D9] hover:underline"
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

                    <div className="bg-white p-2 sm:p-4 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activePreview.src}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: EXECUTIVE_EASE }}
                        >
                          <SafeImage
                            src={activePreview.src}
                            alt={`${activeCert.title} (${activePreview.label})`}
                            fallbackTitle={activeCert.title}
                            className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-lg"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {(activeCert.credentialNumber ||
                  activeCert.registrationNo ||
                  activeCert.issuedDate) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] p-4 text-xs font-mono tabular-nums">
                    {activeCert.credentialNumber && (
                      <div>
                        <span className="text-slate-500 dark:text-[#94A3B8]">
                          Serial / Certificate No.:
                        </span>
                        <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                          {activeCert.credentialNumber}
                        </p>
                      </div>
                    )}
                    {activeCert.registrationNo && (
                      <div>
                        <span className="text-slate-500 dark:text-[#94A3B8]">
                          Registration No.:
                        </span>
                        <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                          {activeCert.registrationNo}
                        </p>
                      </div>
                    )}
                    {activeCert.issuedDate && (
                      <div>
                        <span className="text-slate-500 dark:text-[#94A3B8]">
                          Issued Date:
                        </span>
                        <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                          {activeCert.issuedDate}
                        </p>
                      </div>
                    )}
                    {activeCert.validUntil && (
                      <div>
                        <span className="text-slate-500 dark:text-[#94A3B8]">
                          Valid Until:
                        </span>
                        <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                          {activeCert.validUntil}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {activeCert.summary}
                </p>

                <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#101827] p-4 space-y-2.5">
                  <h4 className="font-display text-sm font-semibold">
                    Units of Competency Covered
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-[#94A3B8]">
                    {activeCert.competencies.map((item) => (
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

                <div className="pt-2 border-t border-slate-200 dark:border-[#263247] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={PROFILE.socials[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6243E8] dark:text-[#00C2D9] hover:underline"
                  >
                    <span>View LinkedIn Licenses &amp; Certifications</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  {activeCert.certificateUrl ? (
                    <a
                      href={activeCert.certificateUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6243E8] dark:bg-[#7657F6] hover:opacity-95 text-white text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {activeCert.certificateType === 'pdf'
                          ? 'Download Official PDF'
                          : 'Download Certificate'}
                      </span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRequestCopy}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6243E8] dark:bg-[#7657F6] hover:opacity-95 text-white text-xs font-semibold cursor-pointer"
                    >
                      <span>Request Certificate Copy</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
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
