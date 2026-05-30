# 💻 Portfolio Website Development Log

This document serves as a guide recording the process of building a portfolio website using `Next.js` and `Claude Code`.

---

## 🛠️ Project Setup & Commands (Used Commands)

### 1. Initialize Next.js Project

Run the following command in your terminal within the directory where you want to create the project:
npx create-next-app@latest .

### 2. Install Skills (skills.sh)

Go to [skills.sh](https://www.skills.sh/?q=next) to find Next.js related skillsets. Copy the commands and select **Claude Code** as your environment.

- **Add `next-best-practices` skill**
  npx skills add https://github.com/vercel-labs/next-skills --skill next-best-practices
- **Add `frontend-design` skill**
  npx skills add https://github.com/anthropics/skills --skill frontend-design

### 3. AI Collaboration Setup

Launch Claude in your terminal, then use `Shift + Tab` to cycle through modes and select:

- **Mode:** `plan mode on`

# How to Deploy on GitHub Pages

**Live URL:** `https://<your-github-username>.github.io/portfolio-website`

This is a Next.js app, not a plain HTML file — the browser can't read `.tsx` directly. A build step is required, which is handled automatically via GitHub Actions on every `git push`.

## One-time setup (do this once per repo)

1. Go to your repository on GitHub
2. **Settings → Pages → Source** → select **GitHub Actions** and save

That's it. The workflow file at `.github/workflows/deploy.yml` handles the rest.

## How deployment works

Every time you push to `main`, GitHub Actions automatically:

1. Installs dependencies (`npm install`)
2. Builds a static export (`npm run build` → outputs to `out/`)
3. Deploys the `out/` folder to GitHub Pages

## Known gotchas

| Issue                                       | Fix applied                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm ci` fails with `Invalid Version` error | Use `npm install` instead — `package-lock.json` version format conflicts with newer npm |
| Node.js 20 deprecation warning on actions   | Set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` in workflow env                          |
| `next/image` not working on static export   | Set `images: { unoptimized: true }` in `next.config.ts`                                 |
| Page not found at root URL                  | Set `basePath: '/portfolio-website'` in `next.config.ts`                                |

## Monitor deployments

Check live status at:
`https://github.com/<your-github-username>/portfolio-website/actions`

---

## 🚀 Feature Implementation Steps (Features)

### 📂 Initial Environment Setup

1. Create a `resources` folder and a `resources/prompts` folder in the project root directory.
2. Add your profile photo to the `public/me.png` path.

### Step 1: Add Basic Feature

Copy the prompt content from `01-research-and-build.md` and paste your personal information to provide context for Claude.

> 📝 **Personal Info Example:**
> "My name is Jenny Park. My LinkedIn: https://www.linkedin.com/in/jennypark7/, My GitHub: https://github.com/jinyeong-park?tab=repositories. Currently working on jynlab.com and tryadmade.com. Location: San Jose, CA. Email: byjennypark@gmail.com"

- **Verify:** Check the output on `localhost` once the build is complete.

### Step 2: Add Animation Feature

If you like the basic layout, enhance the user experience by adding animations.

- Copy the prompt from `resources/prompts/02-streaming-and-reveal.md` and pass it to Claude.
- **Verify:** Check `localhost` to ensure the streaming and reveal animations work smoothly.

### Step 3: Add Chat Q&A Feature

Incorporate an interactive chat component to engage with visitors.

- Copy the prompt from `resources/prompts/03-chat-qa.md` and pass it to Claude.
- **Verify:** Test the Q&A feature locally on `localhost` to ensure complete interactivity.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
