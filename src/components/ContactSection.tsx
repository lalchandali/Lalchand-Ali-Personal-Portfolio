import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { EXECUTIVE_EASE, VIEWPORT_CONFIG } from './MotionReveal';

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | {
      status: 'error';
      message: string;
      code?: string;
      fallbackEmail?: string;
    };

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setSubmitState({
        status: 'error',
        message: 'Please enter your full name (at least 2 characters).',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitState({
        status: 'error',
        message: 'Please provide a valid email address.',
      });
      return;
    }

    if (trimmedSubject.length < 3) {
      setSubmitState({
        status: 'error',
        message: 'Please provide a subject (at least 3 characters).',
      });
      return;
    }

    if (trimmedMessage.length < 10) {
      setSubmitState({
        status: 'error',
        message: 'Please write a message of at least 10 characters.',
      });
      return;
    }

    setSubmitState({ status: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

      if (!isJson && (response.status === 404 || response.status === 405)) {
        setSubmitState({
          status: 'error',
          code: 'STATIC_HOST',
          fallbackEmail: PROFILE.email,
          message:
            'This site is running in static hosting mode (such as GitHub Pages), where no server mail relay is active. Click below to send your message directly using your email app.',
        });
        return;
      }

      const data = (isJson ? await response.json().catch(() => ({})) : {}) as {
        ok?: boolean;
        message?: string;
        error?: string;
        code?: string;
        fallbackEmail?: string;
      };

      if (response.ok && data.ok) {
        setSubmitState({
          status: 'success',
          message:
            data.message ||
            'Your message has been sent to Md Lal Chand Ali.',
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        return;
      }

      setSubmitState({
        status: 'error',
        code: data.code,
        fallbackEmail: data.fallbackEmail || PROFILE.email,
        message:
          data.error ||
          'Unable to send the message automatically. Please reach out via email directly.',
      });
    } catch {
      setSubmitState({
        status: 'error',
        code: 'NETWORK_ERROR',
        fallbackEmail: PROFILE.email,
        message:
          'Could not connect to the contact service. Please use the direct email link below.',
      });
    }
  };

  const buildMailtoHref = (recipient: string) => {
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${name.trim()}\nReply-To: ${email.trim()}\n\n${message.trim()}`
    );
    return `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#101827] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.55, ease: EXECUTIVE_EASE }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
                Get In Touch
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                Let&apos;s Build Something Meaningful.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Open to software engineering engagements, IT service management
                consulting, AI workflow automation, and technical operations
                leadership.
              </p>
            </div>

            <div className="space-y-3">
              {/* Phone */}
              <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone
                    className="w-4 h-4 text-[#6243E8] dark:text-[#00C2D9] shrink-0"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      Phone
                    </p>
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:underline"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', PROFILE.phone)}
                  aria-label="Copy phone number"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
                >
                  {copiedKey === 'phone' ? (
                    <Check
                      className="w-4 h-4 text-emerald-600 dark:text-[#A3F7C5]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Personal Email */}
              <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail
                    className="w-4 h-4 text-[#6243E8] dark:text-[#00C2D9] shrink-0"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      Personal Email
                    </p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:underline truncate block"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email1', PROFILE.email)}
                  aria-label="Copy personal email"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
                >
                  {copiedKey === 'email1' ? (
                    <Check
                      className="w-4 h-4 text-emerald-600 dark:text-[#A3F7C5]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* University / Professional Email */}
              <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail
                    className="w-4 h-4 text-[#0284C7] dark:text-[#A3F7C5] shrink-0"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      Academic / Professional Email
                    </p>
                    <a
                      href={`mailto:${PROFILE.secondaryEmail}`}
                      className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:underline truncate block"
                    >
                      {PROFILE.secondaryEmail}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email2', PROFILE.secondaryEmail)}
                  aria-label="Copy academic email"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
                >
                  {copiedKey === 'email2' ? (
                    <Check
                      className="w-4 h-4 text-emerald-600 dark:text-[#A3F7C5]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Location & Socials */}
              <div className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-[#F8FAFC]">
                  <MapPin
                    className="w-4 h-4 text-[#7657F6] dark:text-[#00C2D9]"
                    aria-hidden="true"
                  />
                  <span>{PROFILE.location}</span>
                </span>

                <div className="flex items-center gap-3 text-xs font-medium">
                  <a
                    href={PROFILE.socials[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#6243E8] dark:text-[#00C2D9] hover:underline"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                  <span aria-hidden="true" className="text-slate-400">
                    ·
                  </span>
                  <a
                    href={PROFILE.socials[1].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#6243E8] dark:text-[#00C2D9] hover:underline"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: EXECUTIVE_EASE,
            }}
            className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-[#263247] bg-slate-50/70 dark:bg-[#141F30] p-6 sm:p-8 shadow-sm"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-slate-700 dark:text-[#F8FAFC]"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7657F6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-slate-700 dark:text-[#F8FAFC]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7657F6]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-slate-700 dark:text-[#F8FAFC]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project collaboration, software engineering role, or consulting"
                  className="w-full rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7657F6]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-slate-700 dark:text-[#F8FAFC]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your project, timeline, or technical requirements..."
                  className="w-full rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7657F6] resize-y"
                />
              </div>

              {submitState.status === 'success' && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3 text-sm text-emerald-800 dark:text-[#A3F7C5]"
                >
                  <CheckCircle2
                    className="w-5 h-5 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{submitState.message}</span>
                </div>
              )}

              {submitState.status === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-2.5 text-sm text-amber-900 dark:text-amber-200"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle
                      className="w-5 h-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{submitState.message}</span>
                  </div>

                  {submitState.fallbackEmail && (
                    <div className="pl-7">
                      <a
                        href={buildMailtoHref(submitState.fallbackEmail)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold underline hover:opacity-80"
                      >
                        <span>
                          Open Email App to Send to {submitState.fallbackEmail}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitState.status === 'loading'}
                  className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6243E8] to-[#7657F6] hover:from-[#5234D6] hover:to-[#00A8BD] text-white text-sm font-semibold shadow-lg shadow-[#7657F6]/20 whitespace-nowrap shrink-0 transition-all disabled:opacity-70 cursor-pointer"
                >
                  {submitState.status === 'loading' ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                  Direct delivery to {PROFILE.email}
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
