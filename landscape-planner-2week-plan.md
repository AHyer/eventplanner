# Yard/Landscape Project Planner — 2-Week Build Plan

**Goal:** Be conversant in React + Next.js, with a real Kanban-driven workflow (Jira), real planning docs (Notion), and a real Git/release cadence — scoped just beyond entry-level for a new-grad interview, not senior-level.

---

## Day 0: Tool & Platform Setup

Do all of this before writing app code — it's the "environment" half of the exercise, and it's what you'll actually be able to speak to in an interview.

### 1. GitHub + Git

- Create a new repo (public, so it doubles as portfolio proof): `github.com/new`
- Clone locally, set up `.gitignore` for Node (GitHub gives you a Node template on repo creation)
- Branch convention: `main` = deployed, short-lived feature branches merged via PR (even solo, open real PRs and merge them yourself — it's the artifact that shows workflow, not just code)

### 2. Node.js + Next.js

- Confirm Node 18+ (`node -v`)
- Scaffold: `npx create-next-app@latest` — TypeScript: yes, App Router: yes, Tailwind: yes, `src/` directory: your call
- This gives you the App Router structure (`app/`) — server components by default, `"use client"` where you need interactivity. That distinction is most of what "conversant in Next.js" means right now.

### 3. Database: Postgres (matching the company's stack)

- Free hosted Postgres — **Neon** (`neon.tech`) or **Vercel Postgres** (same underlying service via Vercel's integration): create account → new project → copy the connection string
- `npm install prisma --save-dev`, `npx prisma init --datasource-provider postgresql`
- Paste the connection string into `.env` as `DATABASE_URL`
- Define your schema (see data model below), run `npx prisma migrate dev`
(Reads the data sources and data model definition to create a new migration.)
- Worth being able to say in the interview: you chose Postgres specifically because it's their production stack, and hosted Postgres over a local install because it removes deployment friction on Vercel and keeps local/prod parity — that reasoning is worth more than the choice itself.

### 4. UI: Tailwind (scaffolded above) + shadcn/ui

- `npx shadcn@latest init` — accessible, unstyled-but-themeable components you own the code for, rather than a black-box library. Current industry-standard pairing with Tailwind.
- Icons: `npm install lucide-react`

### 5. Auth: skip real auth, use a role toggle

- Full auth (NextAuth/Auth.js) is scope creep for this timeframe and this level. Model "homeowner" vs. "contractor" as a role switcher in the UI instead — it lets you demonstrate the multi-stakeholder concept without burning days on session management.
- Knowing the difference between "real auth" and "role-based UI for demo purposes," and being able to say so plainly, reads better than either skipping the concept or over-building it.

### 6. Deployment: Vercel

- Free tier, built by the Next.js team, connects directly to your GitHub repo
- Every push to `main` auto-deploys — this is what makes a twice-a-week release cadence a real habit rather than a simulated one
- `vercel.com` → import your GitHub repo → connect your Neon/Vercel Postgres instance via env vars → done

### 7. Jira (real board, mirroring their process)

- Free Atlassian Cloud account: `atlassian.com/software/jira/free`
- Create a project → **Kanban**, not Scrum (no sprints, no story points, matching what they described)
- Columns: `Backlog → In Progress → In Review → Ready to Release → Done`
- Log your actual tasks here as you go — you'll reference this board directly in interviews

### 8. Notion (real planning doc)

- Free account: `notion.so`
- One page:
  - **Overview** — problem statement, why this project (1 paragraph)
  - **Decisions log** — dated entries: what you decided and why (e.g., "used Postgres via Neon to match the company's production stack")
  - **Data model** — your schema, in plain language
  - **Release notes** — one entry per twice-weekly release

### 9. AI-assisted coding: VS Code + Copilot as your default, Claude Code where it earns its place

You're new to Claude Code, and the position allows any tooling — so use this project to get honest, deliberate experience with it rather than defaulting to it for everything.

- **Default to VS Code + Copilot** for the parts where you most need to build muscle memory: component structure, the App Router server/client boundary, writing your own server actions. Inline suggestions keep you the one navigating the code, which matters most for the "conversant" bar.
- **Use Claude Code (terminal-based, agentic — reads/edits across files, runs commands)** for more mechanical or unfamiliar-but-not-core work: initial Prisma schema scaffolding, repo/config setup, boilerplate around the Jira-adjacent task structure. Start it with `claude` from the project root; review every diff before accepting, especially for the schema.
- Checkpoint after day 2–3: if you're understanding the code *less* by using Claude Code, pull back to VS Code/Copilot for the remainder — that's a legitimate, discussable outcome, not a failure.

---

## Data Model (starting point — refine in Notion, not in code, first)

- **Project** — name, description, status (Design/Sourcing/Prep/Install/Done)
- **Phase** — belongs to Project; name, order, status
- **Item** (materials/plants) — belongs to Phase; name, quantity, cost estimate, status (Needed → Ordered → Delivered → Installed), assigned role (homeowner/contractor)
- **Note** — belongs to Project or Phase; body, author role, timestamp (your decision log inside the app)

Seed your own patio redesign as the first real Project once the schema's in place — fire pit placement, hammock relocation, canoe/firewood removal all become real Items/Notes.

---

## The Two Weeks

Twice-weekly releases: pick two fixed days (e.g., **Tue/Fri**) and actually push to `main` → Vercel on those days, no exceptions.

### Week 1 — Core app

#### Mon–Tue (Release 1: Tue)

- Repo, Next.js scaffold, Tailwind/shadcn, Neon/Vercel Postgres connected, Prisma schema + migration
- Jira board set up, Notion page skeleton started
- Basic layout + navigation shell (server component)
- Release 1 = "app deploys, connects to real Postgres, shows empty state"

#### Wed–Fri (Release 2: Fri)

- Project + Phase CRUD (create/list/edit) — server actions for mutations, server components for listing
- Seed your real patio project as data
- Basic phase status board (simple columns — no drag-and-drop; that's an optional stretch, not core)
- Release 2 = "I can create a project, add phases, see them, backed by Postgres"

### Week 2 — Depth + the parts that mirror their product

#### Mon–Tue (Release 3: Tue)

- Items/materials list per phase, with status + cost
- Role toggle (homeowner vs. contractor view)
- Notes/decision log, tied to phases
- Release 3 = "the multi-stakeholder angle is visible"

#### Wed–Thu (Release 4: Thu)

- Polish: loading/error/empty states, basic form validation, a few UI refinements
- **Optional stretch only if ahead of schedule**: drag-and-drop status changes (client component + optimistic UI is a nice talking point, but not required to hit the bar)
- Finish Notion write-up (decisions log, release notes) and make sure Jira board reflects real history, not a backfilled fiction
- README with screenshots, a short "why I built this" section, and a link to the Notion doc

#### Fri — buffer

- Nothing new. Fix whatever broke, confirm a stranger can clone and run it, do one clean walkthrough of your own commit history and Jira board like you're about to present it.

---

## What "conversant, just beyond entry-level" looks like at the end of this

You should be able to explain, without notes: server vs. client components and why you chose each in a given file; how server actions handle your mutations; why Postgres (matched to their stack) and why a role toggle instead of full auth (deliberate scope choice, not an oversight); which parts you built with Claude Code versus VS Code/Copilot and why; and walk through your Jira board and Notion doc as real project artifacts, because they are.
