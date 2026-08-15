# Karvao India Website — Complete Beginner's Guide

Everything you need to go from "I just downloaded this folder" to a live website
on the internet. No prior experience required — follow the steps in order.

**Database Options**: This guide supports both **local PostgreSQL** and **Supabase** (cloud database). 
Supabase is recommended for beginners — no installation required, free tier available.

---

## Quick Start with Supabase (5 minutes)

Want to get started fast? Follow these steps:

1. **Install Node.js** (Step 2.1)
2. **Create Supabase account** at https://supabase.com (free)
3. **Create a new project** named "karvao"
4. **Copy the connection URI** from Settings → Database → Connection string → URI
5. **Update `.env`** with your Supabase `DATABASE_URL`
6. **Run**:
   ```bash
   npm install
   npx prisma db push
   npx tsx prisma/seed.ts
   npm run dev
   ```
7. **Open** http://localhost:3000
8. **Admin CMS**: http://localhost:3000/admin/login — manage content without code

That's it! Your website is now connected to a cloud database with editable CMS content.

---

## 1. What Is This Project?

A Next.js (React) website for **Karvao India**, a digital growth agency. It has:

| Part | What it does | Folder |
| :--- | :--- | :--- |
| **Marketing website** | Homepage, Solutions, Industries, About, Insights | `app/(marketing)/` |
| **Quotation engine** | Multi-step form that creates a lead in the database | `app/(product)/quotation` |
| **Business Score quiz** | 5-question diagnostic quiz (capped at 79%) | `app/(product)/business-score` |
| **Report page** | Shareable score report, protected by a token | `app/(product)/report/[token]` |
| **Admin panel** | Login-protected dashboard to view leads, quotes, scores | `app/admin/` |
| **Admin CMS** | Edit website content, projects, testimonials, score config | `app/admin/(dashboard)/content` |
| **Database** | Stores everything using PostgreSQL + Prisma (local or Supabase cloud) | `prisma/` |

**The big picture:**

```
Visitor on website  ──►  fills quotation form or quiz
         └──────────────►  data saved to PostgreSQL database (local or Supabase cloud)
                                    │
         Admin logs in at /admin ────┘  to see and manage the data
                                    │
         Admin edits CMS content  ───┘  to change website text without code
```

---

## 2. Prerequisites (Install These First)

You need **two** things installed on your computer:

### 2.1 Node.js
1. Go to https://nodejs.org and download the **LTS** version.
2. Install it (keep clicking Next).
3. Verify it works — open **Command Prompt** or **PowerShell** and run:
   ```
   node --version
   npm --version
   ```
   You should see version numbers like `v22.x.x` and `11.x.x`.

### 2.2 PostgreSQL (the database) — OPTIONAL if using Supabase
> **Using Supabase (cloud database)?** You can skip installing PostgreSQL locally!
> Go to **Step 6, Option B** to set up Supabase instead.

If you prefer a local database:
1. Go to https://www.postgresql.org/download/ and download **PostgreSQL 17** for Windows.
2. During installation, it asks you to set a **password for the `postgres` superuser**.
   **Write this password down — you will need it.**
3. Leave the default port `5432`.
4. After install, verify PostgreSQL is running:
   ```
   Get-Service postgresql*     (in PowerShell)
   ```
   The status should say **Running**.

### 2.3 A Code Editor (recommended)
Install **VS Code** from https://code.visualstudio.com — it makes editing files much easier.

---

## 3. Put the Project in Place

1. The project folder is already at `C:\Users\hp\Downloads\KARVAO INDIA\WEBSITE`.
2. **Move it somewhere simple** (avoid spaces if you can). For example:
   `C:\karvao` — spaces in paths confuse some tools.
3. In VS Code: **File → Open Folder** → select the `WEBSITE` folder.

---

## 4. Install the Project's Dependencies

Every project lists the packages it needs in `package.json`. Install them with:

```
npm install
```

This downloads all libraries (Next.js, Prisma, React, etc.) into the `node_modules` folder.
It also runs `prisma generate` automatically at the end.

**If you see errors here**, run it again — npm can be flaky on the first try.

---

## 5. Configure the Environment Variables (`.env`)

This file holds all the **secrets and settings**. It is the most important file to get right.

### 5.1 Create your `.env`
1. In the project folder there is a file called **`.env.example`**.
2. Copy it and rename the copy to **`.env`** (exactly — no extra name).

> In Windows Explorer you must enable **View → File name extensions** to rename it properly.

### 5.2 What each line means and what to set

```ini
# 1. DATABASE_URL — tells the app how to reach your PostgreSQL database
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/karvao_db?schema=public"
```
| Part | What to put |
| :--- | :--- |
| `USERNAME` | Almost always `postgres` |
| `PASSWORD` | The password you set during PostgreSQL installation (e.g. `A2Pkarvao`) |
| `localhost:5432` | Your computer + the PostgreSQL port (leave as is) |
| `karvao_db` | The name of the database we will create in step 6 |

```ini
# 2. App URL — used for links. Keep localhost while testing.
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

```ini
# 3. Analytics — optional. Leave the X's if you don't have accounts yet.
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"        # Google Analytics 4 measurement ID
NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXXXXXX"  # Meta (Facebook) Pixel ID
```

```ini
# 4. Email (SMTP) — for sending emails from forms. Leave as-is to start.
SMTP_HOST="smtp.resend.com"
SMTP_PORT=465
SMTP_USER="resend"
SMTP_PASS="re_prod_key"
SMTP_FROM="Karvao India <noreply@karvao.in>"
```

```ini
# 5. Admin login — THIS is what you type at /admin/login
ADMIN_USERNAME="karvaoadmin"
ADMIN_PASSWORD="supersecurepassword123"
ADMIN_JWT_SECRET="super-secret-jwt-key-change-me"
```
**Always change** `ADMIN_PASSWORD` and `ADMIN_JWT_SECRET` before going live.

> **Important**: `.env` is private. Never share it, never commit it to Git
> (a `.gitignore` file already excludes it).

---

## 6. Create the Database

You have **two options** for the database:

| Option | Best for | Cost |
| :--- | :--- | :--- |
| **A) Local PostgreSQL** | Learning, offline development | Free |
| **B) Supabase (Cloud)** | Easy setup, no installation needed, ready for production | Free tier available |

---

### Option A: Local PostgreSQL

> Skip to Option B if you prefer cloud database (Supabase).

#### A.1 Connect to PostgreSQL
In PowerShell:
```
psql -U postgres -h localhost
```
Type the PostgreSQL password you set in step 2.2 when asked.

#### A.2 Create the database
At the `postgres=#` prompt type:
```sql
CREATE DATABASE karvao_db;
\q
```
> **Forgot your PostgreSQL password?** The easiest fix is to uninstall and reinstall
> PostgreSQL, or run the installer's "Change Password" option. (Do NOT do the manual
> trust-auth reset unless you know what you're doing — see Troubleshooting below.)

---

### Option B: Supabase (Cloud Database) — Recommended

Supabase gives you a free PostgreSQL database in the cloud. No local installation needed.

#### B.1 Create a Supabase Account
1. Go to **https://supabase.com** and sign up (free).
2. Verify your email and log in.

#### B.2 Create a New Project
1. Click **"New Project"** on your dashboard.
2. Fill in:
   - **Organization**: Create one if you don't have (e.g., "Karvao India")
   - **Project name**: `karvao`
   - **Database password**: Choose a **strong password** and **save it somewhere safe**
   - **Region**: Choose the region closest to your users (e.g., `ap-south-1` for India)
3. Click **"Create new project"** and wait 1-2 minutes for it to set up.

#### B.3 Get Your Connection String
1. Once your project is ready, click the **gear icon (Settings)** in the left sidebar.
2. Go to **Database**.
3. Scroll down to **Connection string** → **URI**.
4. Click the **copy icon** to copy the full URI. It looks like:
   ```
   postgresql://postgres.xxxxxxxxxxxxx:YOUR-PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```

> **Important**: Make sure you copy the **URI** format, not the other formats.

#### B.4 Update Your `.env` File
Open `.env` in your project and replace the `DATABASE_URL` line:

```ini
# Old (local PostgreSQL):
DATABASE_URL="postgresql://postgres:password@localhost:5432/karvao_db?schema=public"

# New (Supabase cloud):
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxxx:YOUR-PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?schema=public"
```

> **Replace** `YOUR-PASSWORD` with the database password you created in step B.2.

#### B.5 Verify Your Connection
Test that your app can connect to Supabase:
```
npx prisma db push
```
If successful, you'll see: `Your database is now in sync with your Prisma schema.`

If you get an error, double-check:
- The password in `.env` matches your Supabase database password
- You copied the full URI including `?schema=public` at the end
- Your Supabase project is active (not paused)

---

### 6.3 Create the Tables (Prisma)

Regardless of which option you chose (A or B), run this to create all tables:

```
npx prisma db push
```

Expected output: `Your database is now in sync with your Prisma schema.`

#### Tables created:
- `Lead` — stores contact info from forms
- `Assessment` — stores quiz answers and scores
- `Report` — stores shareable report tokens
- `Quotation` — stores quotation requests
- `QuotationItem` — stores individual services in a quotation
- `ContactSubmission` — stores contact form messages
- `SiteContent` — editable website content (hero text, headlines, CTAs)
- `Project` — project showcase cards
- `Testimonial` — client review cards
- `ScoreCategory` — assessment category config (weights, descriptions)
- `ScoreQuestion` — assessment questions and options
- `Media` — uploaded files library

#### B.6 Verify in Supabase Dashboard (Option B only)
1. Go to your Supabase project dashboard.
2. Click **"Table Editor"** in the left sidebar.
3. You should see all 6 tables listed.
4. Click any table to see its structure and data.

### 6.4 Add Sample Data (Optional but Helpful)
```
npx tsx prisma/seed.ts
```
This loads:
- **25 CMS content items** (hero text, headlines, CTAs for all sections)
- **5 score categories** with weights and descriptions
- **5 assessment questions** with scoring options
- **6 project showcase cards**
- **6 client testimonials**
- A demo lead (Rahul Sharma) with assessment, report, and quotation

> **Note:** The seed script clears existing CMS data before inserting. Re-run it to reset content to defaults.

---

## 7. Run the Website Locally

Start the development server:

```
npm run dev
```

When you see **Ready in ... ms**, open your browser and go to:

* **Website:** http://localhost:3000
* **Admin login:** http://localhost:3000/admin/login  → use `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`

To stop the server: press `Ctrl + C` in the terminal.

---

## 8. Using the Admin Panel (Your Dashboard)

1. Go to `http://localhost:3000/admin/login`.
2. Sign in with the credentials from `.env`.
3. You will see:
   * **Overview** — counts of leads, quotes, assessments.
   * **Leads** — everyone who enquired (from quotation or quiz).
   * **Quotations** — details of quotation requests.
   * **Assessments** — quiz results and scores.
   * **Content** — edit website text (hero, headlines, CTAs) without code changes.
   * **Projects** — manage project showcase cards.
   * **Testimonials** — manage client review cards.
   * **Score Config** — configure assessment categories, weights, and questions.
   * **Media** — manage uploaded files.
4. You can change a lead's status (NEW → CONTACTED → QUALIFIED → WON/LOST).

### CMS API Routes

All CMS endpoints require admin authentication (cookie-based session):

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/admin/content` | GET | List all site content items |
| `/api/admin/content/[id]` | PATCH | Update a content item |
| `/api/admin/projects` | GET/POST | List or create projects |
| `/api/admin/projects/[id]` | PATCH/DELETE | Update or delete a project |
| `/api/admin/testimonials` | GET/POST | List or create testimonials |
| `/api/admin/testimonials/[id]` | PATCH/DELETE | Update or delete a testimonial |
| `/api/admin/score-config` | GET | List score categories |
| `/api/admin/score-config/[id]` | PATCH | Update a category or question |
| `/api/admin/media` | GET/POST | List or upload media files |
| `/api/admin/media/[id]` | DELETE | Delete a media file |

---

## 9. How to Change Your Website Content

You have **two ways** to update content:

### Option A: Via Admin CMS (No Code Changes)
1. Go to `/admin/content` — edit hero text, headlines, CTAs, footer copy.
2. Go to `/admin/projects` — add/edit/remove project showcase cards.
3. Go to `/admin/testimonials` — add/edit/remove client review cards.
4. Go to `/admin/score-config` — change assessment questions, categories, weights.
5. Changes appear on the website immediately (once frontend is wired to CMS API).

### Option B: Via Code (For Structural Changes)
All text is plain and easy to edit. Open these files in VS Code:

### Homepage
`app/(marketing)/page.tsx` — hero text, sections, CTAs.
Components that build it: `components/marketing/` (Hero, SolutionsSection, etc.).

### Solutions & Industries
`app/(marketing)/solutions/page.tsx` — the 5 growth pillars.
`app/(marketing)/industries/page.tsx` — industry cards.

### Insights (blog-style articles)
`lib/insights.ts` — add a new entry to the `insights` array to publish a new article.
Each entry needs a `slug` (the URL), `title`, `category`, `excerpt`, and `content` blocks.

### About page
`app/(marketing)/about/page.tsx`

### Navigation & Footer
`components/marketing/Header.tsx` — top menu.
`components/marketing/Footer.tsx` — footer links.

### Colors & Theme
`app/globals.css` — brand colors (navy/blue palette). Edit the `:root` variables.
- **Deep Navy**: `#0A1931` (primary dark)
- **Blue Bright**: `#0066FF` (CTAs, highlights)
- **Blue Medium**: `#4A7FA7` (secondary)
- **Blue Light**: `#B3CFE5` (accents)
- **Green**: `#16B878` (success states)
- **Red**: `#EF4444` (error states)

### Photos & Files
Put images in `public/` and reference them like `/my-image.png`.

---

## 10. Testing Your Work

```
npm run test          # unit tests (Vitest)
npm run lint          # code style checks
npm run typecheck     # TypeScript type checks
```
Fix any errors these report before deploying.

---

## 11. Going Live — Deployment (Step by Step)

You will use **GitHub** (code storage), **Vercel** (website hosting), and
**Supabase or Neon** (cloud database). All three have free tiers.

### 11.1 Push your code to GitHub
1. Create a free account at https://github.com.
2. Click **New repository** → name it `karvao-website` → **Create repository**.
3. On the empty repo page, GitHub shows commands. Run them in PowerShell inside your project folder:
   ```
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/karvao-website.git
   git push -u origin main
   ```
   (It will ask for your GitHub username and a password/token.)

### 11.2 Create a cloud database (Supabase)
> If you already set up Supabase locally in Step 6, skip to 11.3.

1. Follow **Step 6, Option B** above to create your Supabase project.
2. Copy your Supabase connection URI.
3. Update `.env` on your computer with this as `DATABASE_URL`.
4. Create the tables on the cloud database:
   ```
   npx prisma db push
   ```

### 11.3 Deploy to Vercel
1. Go to https://vercel.com → Sign up with your GitHub account.
2. Click **Add New → Project** → import the `karvao-website` repository.
3. **Before deploying**, click **Environment Variables** and add every variable from your `.env`
   (DATABASE_URL, NEXT_PUBLIC_APP_URL, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_JWT_SECRET,
   SMTP_*, NEXT_PUBLIC_*). Use the **cloud** DATABASE_URL, not localhost!
4. Change **Build Command** to:
   ```
   npx prisma generate && next build
   ```
5. Click **Deploy**.

### 11.4 Update URLs after deploy
After Vercel gives your site a URL (e.g. `https://karvao-web.vercel.app`):
* Set `NEXT_PUBLIC_APP_URL` to that URL (in Vercel → Settings → Environment Variables → redeploy).

### 11.5 Custom domain (optional)
In Vercel: **Project → Settings → Domains** → add `karvao.in`.
Follow the DNS instructions Vercel shows (add CNAME/A records at your domain registrar).
Vercel provides free HTTPS/SSL automatically.

---

## 12. Checklist Before Launch

- [ ] Changed `ADMIN_PASSWORD` and `ADMIN_JWT_SECRET` to strong values.
- [ ] Changed `ADMIN_USERNAME` from the default.
- [ ] Replaced analytics IDs with real ones (or removed the tags).
- [ ] Real SMTP credentials (or emails won't send).
- [ ] `DATABASE_URL` points to the cloud database (Supabase), not localhost.
- [ ] Supabase project is **Active** (not paused or deleted).
- [ ] Database tables exist (check Supabase Table Editor or run `npx prisma db push`).
- [ ] Run `npm run build` locally with no errors.
- [ ] Test the quotation form and quiz on the live site.
- [ ] Run `npx tsx prisma/seed.ts` to populate CMS with default content.
- [ ] Verify CMS content at `/admin/content` — edit hero, headlines, CTAs as needed.
- [ ] Add real projects at `/admin/projects` and testimonials at `/admin/testimonials`.
- [ ] Review assessment questions at `/admin/score-config`.

---

## 13. Common Problems & Fixes

**"password authentication failed for user 'postgres'"**
Your `DATABASE_URL` password doesn't match your PostgreSQL password. Fix the `.env` file.

**"Server has closed the connection" on /admin**
The app can't reach the database. Check that PostgreSQL is running
(`Get-Service postgresql*`) and the `.env` password is correct, then restart the dev server.

**"driver adapter is required" error**
This happens when code creates `new PrismaClient()` without the adapter. Copy the pattern from
`lib/prisma.ts` (it uses `PrismaPg` + `pg.Pool`). The seed file already follows this.

**Supabase: "Connection refused" or "Could not connect" error**
- Make sure your Supabase project is **Active** (not paused) in the dashboard.
- Check that the password in `.env` matches your Supabase database password.
- Ensure the connection URI ends with `?schema=public`.
- Verify your IP is not blocked — Supabase has IP restrictions on free tier.

**Supabase: "Password authentication failed" error**
Your `.env` password doesn't match your Supabase database password. Reset it in
Supabase Dashboard → Settings → Database → Reset database password.

**Supabase: Tables not appearing after `prisma db push`**
- Make sure `DATABASE_URL` uses the **URI** format (starts with `postgresql://`).
- Check the Supabase project is in the correct region.
- Try running `npx prisma db push --force-reset` to reset and recreate tables.

**Supabase: "SSL connection required" error**
Supabase requires SSL. The connection string should work automatically, but if you
get this error, add `?sslmode=require` to your `DATABASE_URL`:
```
DATABASE_URL="postgresql://...?schema=public&sslmode=require"
```

**Supabase: Project paused or deleted**
Supabase pauses free projects after inactivity. Go to your dashboard and click
"Restore" if paused. If deleted, you'll need to create a new project and re-run
`npx prisma db push`.

**Page shows 404**
The route folder doesn't exist under `app/`. Next.js creates pages from folders — a URL like
`/insights` needs `app/(marketing)/insights/page.tsx`.

**Port 3000 already in use**
Another program is using 3000. Run on another port:
```
npm run dev -- -p 3001
```

**Changes don't appear**
The dev server auto-reloads. If it's stuck, press `Ctrl + C` and run `npm run dev` again.

**"timeStyle is not a valid option" error**
Some code used `toLocaleDateString` with a time option. Use `toLocaleString(...)` instead
when showing both date and time.

**Analytics scripts slow the site**
The project already loads GA4/Pixel lazily via `next/script` `strategy="lazyOnload"`
so they don't block the page.

**CMS content not appearing on website**
The frontend currently uses hardcoded data. You need to wire components to fetch from
the CMS API endpoints (`/api/admin/content`, etc.) or create a public `/api/content`
endpoint for unauthenticated access.

**Seed script fails with validation error**
After schema changes, run `npx prisma generate` first to update the Prisma Client,
then re-run `npx tsx prisma/seed.ts`.

**Assessment score always shows 79% or lower**
This is by design. The Business Growth Score is capped at 79% per the business rule
in `lib/scoring.ts`. This encourages users to take action rather than feel "done".

---

## 14. Folder Map (Quick Reference)

```
WEBSITE/
├── app/                      # All pages & API routes
│   ├── (marketing)/          #   Homepage, solutions, industries, about, insights
│   ├── (product)/            #   Quotation, business-score, report/[token]
│   ├── admin/                #   Admin dashboard pages
│   │   └── (dashboard)/      #     leads, quotations, assessments, content, projects,
│   │                         #     testimonials, score-config, media
│   └── api/                  #   Server endpoints
│       ├── admin/            #     CMS CRUD: content, projects, testimonials,
│       │                     #     score-config, media, login, logout
│       ├── assessment/       #     Quiz submission
│       └── quotation/        #     Quotation submission
├── components/
│   ├── ui/                   # Reusable buttons, inputs, cards
│   ├── marketing/            # Header, Footer, homepage sections
│   │   ├── Header.tsx        #   Navigation bar
│   │   ├── Footer.tsx        #   Footer with company links
│   │   ├── GrowthCapabilityBar.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ClientReviewsSection.tsx
│   │   └── SolutionsSection.tsx
│   └── product/              # Form steppers, quiz
├── lib/                      # Business logic
│   ├── scoring.ts            #   Score calculation (5 categories, 79% cap)
│   ├── assessmentData.ts     #   5 assessment questions
│   ├── recommendations.ts    #   Recommendation engine
│   ├── insights.ts           #   Hardcoded blog content
│   ├── validation.ts         #   Zod schemas
│   └── prisma.ts             #   Prisma client
├── prisma/
│   ├── schema.prisma         # Database models (12 tables)
│   └── seed.ts               # Demo data (CMS + legacy)
├── public/                   # Images / static files
├── tests/
│   └── scoring.test.ts       # Unit tests
├── .env                      # YOUR secrets & settings (never share)
├── package.json              # Scripts & dependencies
└── next.config.ts            # Next.js configuration
```

---

## 15. Everyday Commands Cheat Sheet

| Command | What it does |
| :--- | :--- |
| `npm install` | Installs all packages |
| `npm run dev` | Starts the website locally |
| `npm run build` | Builds the site for production (must pass before deploy) |
| `npm start` | Runs the production build locally |
| `npx prisma generate` | Regenerates Prisma Client after schema changes (auto-runs on `npm install`) |
| `npx prisma db push` | Syncs database tables with schema.prisma (run after schema changes) |
| `npx prisma db push --force-reset` | Resets and recreates all tables (use with caution!) |
| `npx tsx prisma/seed.ts` | Loads demo data (CMS content, projects, testimonials, score config) |
| `npx prisma studio` | Opens a visual database browser |
| `npm run test` | Runs tests |
| `npm run lint` | Checks code style |
| `npm run typecheck` | Checks for TypeScript errors |

### Supabase-Specific Tips

| Task | How to do it |
| :--- | :--- |
| View tables | Supabase Dashboard → Table Editor |
| Run SQL queries | Supabase Dashboard → SQL Editor |
| Reset database password | Supabase Dashboard → Settings → Database → Reset password |
| Check project status | Supabase Dashboard → Settings → General |
| View connection logs | Supabase Dashboard → Logs → Postgres |

---

## 16. Using Supabase Dashboard (Optional but Helpful)

If you're using Supabase, here's how to use the dashboard:

### 16.1 View and Edit Data
1. Go to **Table Editor** in the left sidebar.
2. Click any table (e.g., `Lead`) to see all records.
3. You can **add**, **edit**, or **delete** rows directly from the dashboard.
4. Use the **Filter** button to search for specific records.

### 16.2 Run SQL Queries
1. Go to **SQL Editor** in the left sidebar.
2. Type any SQL query and click **Run**.
3. Example — find all leads with status "NEW":
   ```sql
   SELECT * FROM "Lead" WHERE status = 'NEW';
   ```

### 16.3 Monitor API Usage
1. Go to **Logs** → **Postgres** to see all database queries.
2. Check **API** logs to see requests from your website.
3. The free tier includes 500MB database space and 1GB bandwidth per month.

### 16.4 Backup Your Data
1. Go to **Settings** → **Database**.
2. Scroll to **Backups** and click **Create backup**.
3. Download the backup file to your computer.

### 16.5 Invite Team Members
1. Go to **Settings** → **Access**.
2. Click **Invite user** and enter their email.
3. They'll get an invite to join your Supabase project.

---

*If something is still unclear, open the other docs in the project: `PROJECT_SPEC.md`
(what the site should do), `ARCHITECTURE.md` (how it's built), and `DEPLOYMENT.md` (deployment specifics).*
