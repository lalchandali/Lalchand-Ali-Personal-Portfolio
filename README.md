# MD LAL CHAND ALI — Personal Portfolio

Personal portfolio website for **Md Lal Chand Ali** (Software Engineer | IT Service Management | Business Operations | AI & Automation).

## Local Development

```bash
bun install
bun run dev
```

Runs the Express + Vite server at `http://localhost:3000`.

## GitHub Pages Deployment

This repository includes an automated GitHub Actions workflow at `.github/workflows/deploy.yml` that typechecks, builds `./dist` with relative `./` asset resolution, and publishes it to the `gh-pages` branch automatically on every push to `main` or `master`.

To enable your live GitHub Pages URL on GitHub:

1. Push this repository to GitHub on the `main` (or `master`) branch and let the **Deploy Portfolio to GitHub Pages** workflow complete.
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**, choose branch **`gh-pages`** and folder **`/ (root)`**, then click **Save**.
4. Your portfolio will be published at `https://<username>.github.io/<repo-name>/` automatically.

> **Note on the Contact Form:** When hosted statically on GitHub Pages (where no Node/Express server runs), submitting the contact form automatically detects static hosting and presents a pre-filled direct email (`mailto:`) option to send your inquiry cleanly. When hosted with the Node/Express server (`npm start`) and `SMTP_*` environment variables configured, it sends emails directly via SMTP.
