# Production Deployment & Hosting Guide

This guide describes step-by-step instructions to configure, launch, and deploy the Karvao growth platform in production.

---

## 1. Version Control (Git)
Initialize a Git repository and commit the codebase:
```bash
git init
git add .
git commit -m "feat: initial project structure"
```
Create a remote repository on GitHub/GitLab and link it:
```bash
git remote add origin https://github.com/your-username/karvao-website.git
git branch -M main
git push -u origin main
```

---

## 2. PostgreSQL Database Setup
We recommend hosting the PostgreSQL database on cloud providers like **Supabase** or **Neon**.

1.  Create an account and initialize a new PostgreSQL project instance.
2.  Retrieve the production Database connection URL.
3.  Add the URL to your production environment variable list as `DATABASE_URL`.

---

## 3. Hosting Platform Configuration (Vercel)
We recommend **Vercel** for hosting the Next.js application.

1.  Connect your GitHub account to Vercel.
2.  Import the `karvao-website` repository.
3.  Configure environment variables in the project settings matching `.env.example`.
4.  Configure the build commands:
    *   **Build Command**: `npx prisma generate && next build`
    *   **Install Command**: `npm install`
5.  Deploy. Vercel will trigger automated builds on pushes to the `main` branch.

---

## 4. Database Migrations
Run migrations on deployment using Prisma:
*   Prisma migrations run automatically via `prisma migrate deploy` which must be included in the build step script (e.g. `npx prisma migrate deploy && prisma db seed`).

---

## 5. Domain, DNS & SSL
1.  Add your custom domain (e.g., `karvao.in`) in the Vercel project domain tab.
2.  Configure CNAME and A-records in your domain DNS registry pointing to Vercel's nameservers.
3.  Vercel will auto-generate and renew SSL (HTTPS) certificates.
