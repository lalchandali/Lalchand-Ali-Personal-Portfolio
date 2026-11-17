import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const isProduction = process.env.NODE_ENV === 'production';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      smtpConfigured: isSmtpConfigured(),
    });
  });

  app.post('/api/contact', async (req, res) => {
    const body = (req.body ?? {}) as ContactPayload;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 120) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        error: 'Please enter your full name (at least 2 characters).',
      });
      return;
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 160) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        error: 'Please enter a valid email address.',
      });
      return;
    }

    if (subject.length < 3 || subject.length > 200) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        error: 'Please provide a clear subject (at least 3 characters).',
      });
      return;
    }

    if (message.length < 10 || message.length > 5000) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        error: 'Please write a message of at least 10 characters.',
      });
      return;
    }

    const recipient =
      process.env.CONTACT_TO_EMAIL?.trim() || 'lalchandalibd@gmail.com';

    if (!isSmtpConfigured()) {
      res.status(503).json({
        ok: false,
        code: 'SMTP_NOT_CONFIGURED',
        error:
          'Automated email delivery is not configured on this server yet (missing SMTP credentials). Please use the direct email option below.',
        fallbackEmail: recipient,
      });
      return;
    }

    try {
      const port = Number(process.env.SMTP_PORT || 587);
      const secure =
        process.env.SMTP_SECURE === 'true' || port === 465;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: `"${name.replaceAll('"', '')}" <${email}>`,
        subject: `[Portfolio Inquiry] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
            <h2 style="margin-bottom: 12px;">New Portfolio Contact Inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
      });

      res.status(200).json({
        ok: true,
        message: 'Thank you. Your message has been sent directly to Md Lal Chand Ali.',
      });
    } catch (err) {
      console.error('Failed to send contact email:', err);
      res.status(502).json({
        ok: false,
        code: 'EMAIL_SEND_FAILED',
        error:
          'Unable to send the message via the mail server right now. Please try the direct email option below.',
        fallbackEmail: recipient,
      });
    }
  });

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
