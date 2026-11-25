import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Facebook,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  EXECUTIVE_EASE,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from './MotionReveal';

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

  const submitToStaticRelay = async (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const formspreeUrl = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

    if (formspreeUrl) {
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          _replyto: payload.email,
        }),
      });
      if (res.ok) {
        return {
          ok: true as const,
          message:
            'Thank you. Your message has been sent directly to Md Lal Chand Ali.',
        };
      }
      return {
        ok: false as const,
        message:
          'Unable to submit via the form endpoint right now. Please use the direct email option below.',
      };
    }

    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(PROFILE.email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _subject: `[Portfolio Inquiry] ${payload.subject}`,
          message: payload.message,
          _replyto: payload.email,
          _template: 'table',
        }),
      }
    );

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };

    if (res.ok && (data.success === true || data.success === 'true')) {
      return {
        ok: true as const,
        message:
          'Thank you. Your message has been delivered directly to Md Lal Chand Ali.',
      };
    }

    if (
      typeof data.message === 'string' &&
      data.message.toLowerCase().includes('activation')
    ) {
      return {
        ok: false as const,
        message:
          'This static contact relay is awaiting one-time inbox activation by the site owner. Please click below to send your message directly via your email app.',
      };
    }

    return {
      ok: false as const,
      message:
        'Could not deliver automatically from this static host. Please click below to send via your email app.',
    };
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

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    };

    if (import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()) {
      try {
        const relayResult = await submitToStaticRelay(payload);
        if (relayResult.ok) {
          setSubmitState({ status: 'success', message: relayResult.message });
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        } else {
          setSubmitState({
            status: 'error',
            code: 'STATIC_RELAY',
            fallbackEmail: PROFILE.email,
            message: relayResult.message,
          });
        }
      } catch {
        setSubmitState({
          status: 'error',
          code: 'NETWORK_ERROR',
          fallbackEmail: PROFILE.email,
          message:
            'Could not reach the form endpoint. Please use the direct email link below.',
        });
      }
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

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

      const shouldFallbackToStaticRelay =
        (!isJson && (response.status === 404 || response.status === 405)) ||
        response.status === 503 ||
        data.code === 'SMTP_NOT_CONFIGURED';

      if (shouldFallbackToStaticRelay) {
        try {
          const relayResult = await submitToStaticRelay(payload);
          if (relayResult.ok) {
            setSubmitState({ status: 'success', message: relayResult.message });
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            return;
          }
          setSubmitState({
            status: 'error',
            code: 'STATIC_HOST',
            fallbackEmail: PROFILE.email,
            message: relayResult.message,
          });
          return;
        } catch {
          setSubmitState({
            status: 'error',
            code: 'STATIC_HOST',
            fallbackEmail: PROFILE.email,
            message:
              'Automated form relay could not be reached from this static host. Click below to send directly via your email app.',
          });
          return;
        }
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
      try {
        const relayResult = await submitToStaticRelay(payload);
        if (relayResult.ok) {
          setSubmitState({ status: 'success', message: relayResult.message });
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          return;
        }
      } catch {
        // Fall through to mailto fallback
      }

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
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div variants={staggerItemVariants} className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#6243E8] dark:text-[#00C2D9]">
                Contact
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                Get in Touch.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                I&apos;m open to meaningful opportunities in software
                engineering, full-stack development, AI-driven automation, and
                technology-focused problem-solving. Let&apos;s connect and
                explore how we can build practical digital solutions together.
              </p>
            </motion.div>

            <div className="space-y-3">
              {/* Phone */}
              <motion.div
                variants={staggerItemVariants}
                className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex items-center justify-between gap-3"
              >
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
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleCopy('phone', PROFILE.phone)}
                  aria-label="Copy phone number"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copiedKey === 'phone' ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check
                          className="w-4 h-4 text-emerald-600 dark:text-[#A3F7C5]"
                          aria-hidden="true"
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="w-4 h-4" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Primary Email */}
              <motion.div
                variants={staggerItemVariants}
                className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail
                    className="w-4 h-4 text-[#6243E8] dark:text-[#00C2D9] shrink-0"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      Email
                    </p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:underline truncate block"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleCopy('email1', PROFILE.email)}
                  aria-label="Copy email address"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#263247] bg-white dark:bg-[#101827] flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] shrink-0 cursor-pointer"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copiedKey === 'email1' ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check
                          className="w-4 h-4 text-emerald-600 dark:text-[#A3F7C5]"
                          aria-hidden="true"
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="w-4 h-4" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Location & Socials */}
              <motion.div
                variants={staggerItemVariants}
                className="rounded-xl border border-slate-200 dark:border-[#263247] bg-slate-50 dark:bg-[#141F30] p-4 flex flex-wrap items-center justify-between gap-4"
              >
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
                  <span aria-hidden="true" className="text-slate-400">
                    ·
                  </span>
                  <a
                    href={PROFILE.socials[2].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#6243E8] dark:text-[#00C2D9] hover:underline"
                  >
                    <Facebook className="w-4 h-4" aria-hidden="true" />
                    <span>Facebook</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{
              duration: 0.55,
              delay: 0.14,
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
                  placeholder="Software engineering role, project inquiry, or consulting"
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
                  placeholder="Share details about the role, project scope, or timeline..."
                  className="w-full rounded-xl border border-slate-300 dark:border-[#263247] bg-white dark:bg-[#101827] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7657F6] resize-y"
                />
              </div>

              <AnimatePresence mode="wait">
                {submitState.status === 'success' && (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3 text-sm text-emerald-800 dark:text-[#A3F7C5]"
                  >
                    <CheckCircle2
                      className="w-5 h-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{submitState.message}</span>
                  </motion.div>
                )}

                {submitState.status === 'error' && (
                  <motion.div
                    key="error"
                    role="alert"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
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
                </motion.button>

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
