# MD LAL CHAND ALI — Personal Portfolio

Personal portfolio website for **Md Lal Chand Ali** (Software Engineer | IT Service Management | Business Operations | AI & Automation).

## Local Development

```bash
npm install
npm run dev
```

Runs the Express + Vite server at `http://localhost:3000`.

## GitHub Pages Deployment

This repository includes an automated GitHub Actions workflow at `.github/workflows/deploy.yml` and relative/base-aware asset resolution so the portfolio works both at `https://<username>.github.io/` and `https://<username>.github.io/<repo-name>/`.

To enable GitHub Pages on your GitHub repository:

1. Push this repository to GitHub on the `main` (or `master`) branch.
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The **Deploy Portfolio to GitHub Pages** workflow will run automatically on push and publish your live URL.

> **Note on the Contact Form:** When hosted statically on GitHub Pages (where no Node/Express server runs), submitting the contact form automatically detects static hosting and presents a pre-filled direct email (`mailto:`) option to send your inquiry cleanly. When hosted with the Node/Express server (`npm start`) and `SMTP_*` environment variables configured, it sends emails directly via SMTP.
