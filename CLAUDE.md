# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev            # next dev (Turbopack) on :3000
npm run build          # next build
npm run lint           # eslint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit       # typecheck — the only fast way to catch broken TSX; `next dev` only
                       # compiles routes you actually visit, so errors hide until navigation
```

There is no test framework in this project.

Database (drizzle-kit is a dependency but has no npm scripts — invoke via npx):

```bash
npx drizzle-kit push       # apply src/db/schema.ts straight to the DB (how this repo has been working)
npx drizzle-kit generate   # emit SQL into drizzle/
npx drizzle-kit studio     # browse data
```

All of the above require `DATABASE_URL` in `.env` (gitignored). `src/db/index.ts` throws at import time if it is missing, which surfaces as a failure on any page that touches the DB.

## Architecture

Next.js 16 App Router + React 19, TypeScript, Drizzle ORM over Postgres (`pg` Pool). `@/*` maps to `src/*`.

### The mutation pattern

Every write follows the same three-file shape, and new features should match it:

1. A `'use server'` module exporting an action with the signature `(prevState: unknown, formData: FormData) => Promise<{ success: boolean; message: string }>`.
2. A `'use client'` form component that calls `useActionState(action, { success: false, message: '' })` and renders `state.message` plus an `isPending` submit button.
3. A server-component page that composes the form with an `async` list component that queries `db` directly in its body.

Existing pairs: `createevent.tsx`/`createeventform.tsx`, `createuser.tsx`/`createuserform.tsx`, `questionnaire.tsx`/`questionnaireform.tsx`, and `update-event.tsx` + `delete-event.tsx` consumed by `edit-event-form.tsx`.

Note the unconventional placement: **server actions live in `src/components/ui/` next to the forms that use them**, not in a `lib/actions/` directory. Only `button.tsx` and `calendar.tsx` in that folder are generated UI primitives; everything else is hand-written app code.

Actions that change existing rows call `revalidatePath('/events')` (see `update-event.tsx`, `delete-event.tsx`). Creates currently do not, so new rows may not appear until a hard refresh.

### Data layer

- `src/db/schema.ts` is the source of truth: 16 tables, all `integer ... generatedAlwaysAsIdentity`, with heavy use of `pgEnum` for status columns. Child tables (`event_guest_profile`, `guests`, `tasks`, `notes`, `menu`, `deco`) cascade on event delete; `vendors` deliberately does not.
- `src/db/index.ts` attaches the schema to the client, which is what enables `db.query.<table>.findMany()` alongside the builder API.
- **`drizzle/` is stale.** The single committed migration (`0000_sloppy_madame_masque.sql`) has 5 tables with `serial` ids and enum values that no longer exist in `schema.ts`. The live database has been kept in sync with `drizzle-kit push`, not migrations. Do not read `drizzle/` to learn the current shape of the DB.
- **`drizzle/relations.ts` is dead code** — nothing under `src/` imports it, and it is not part of the schema object passed to `drizzle()`. Relational `with:` queries will not work until those relations are defined in (or re-exported from) `src/db/schema.ts`.
- Decimal columns (`totalBudgetMin/Max`, `hostLaborPortion`, `vendorEstimate`) are strings in Drizzle — pass the raw `formData.get()` value through without `Number()`.

### Auth

There is none. `CURRENT_USER_ID = 1` is hardcoded in `createevent.tsx` and `questionnaire.tsx`, and `/login` is a user-creation form plus a public user directory. The `users.role` enum (`host`/`vendor`/`guest`) exists but is not enforced anywhere.

### Styling

- Tailwind v4, CSS-first. All theming lives in `@theme inline` / `:root` inside `src/app/globals.css`. **`tailwind.config.ts` is vestigial** — v4 does not read it without an `@config` directive, and there isn't one. Add theme tokens to `globals.css`, not to the config file.
- Fonts are loaded with `next/font/google` in `layout.tsx`, exposed as CSS variables on `<body>`, and mapped to utilities in `@theme inline`. `font-aboreto` (headings) and `font-arapey` work through that chain.
- Each route has a full-bleed photo background class defined in `globals.css` (`.hero-background`, `.events-background`, `.calendar-background`, …) pointing at Unsplash images in `public/`.
- shadcn is configured for the `base-maia` style with **`@base-ui/react` primitives (not Radix)** and **hugeicons** as the icon library. `lucide-react` is also installed.
- Much of the form markup uses inline `style={{}}` objects mixed with Tailwind classes. That is the existing state, not a convention worth propagating — prefer Tailwind classes in new code.

### Routes

`/`, `/events` (list + create), `/events/[id]` (edit + delete), `/plan` (the long questionnaire), `/login`, `/calendar` (react-day-picker). The remaining nav links — `/vendors`, `/inspo`, `/todo`, `/drinks`, `/deco`, `/food`, `/invitations` — are empty placeholder pages with a background and TODO comments.

## Workflow conventions

Branches are named `KAN-<number>-<slug>` and merged into `main` via PR; commit subjects are prefixed with the ticket id (`KAN-52 feat: ...`). `epics.csv` and `tickets.csv` are gitignored local Jira exports.

`AGENTS.md` is regenerated by `next dev` on every run. Commit it with your changes rather than reverting it.
