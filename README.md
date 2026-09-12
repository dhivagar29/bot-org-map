# Grok Bot Org Map

Interactive org map for **Dhivagar’s Grok Bot team**. Doug sits at the root as Chief of Staff. Everyone else reports to Doug, grouped into six desks: Office of Don, Tech, X, Digital, Finance, and Family.

This is a public roster site. It does not include emails, phone numbers, private agent IDs, or tokens.

- **GitHub:** https://github.com/dhivagar29/bot-org-map
- **Live (Vercel):** _pending — add the production URL after the first deploy_

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Static page (no auth, no secrets, no database)

## Edit the roster

All names, titles, jobs, sections, and personas live in one file:

```
src/data/org.ts
```

1. Add or change an entry in `sections` or `agents`.
2. Keep `id` values as public slugs (`doug`, `logan`, `x-algo`). Do not put private IDs here.
3. Set `reportsTo` to another agent’s `id`. Doug is the root (`reportsTo: null`, `pinned: true`).
4. `persona` is optional and should stay short.

Helpers in `src/lib/org.ts` only read that file. You should not need to touch UI code to add an agent.

## Local run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

`npm run build` must stay clean. The page is statically generated.

## Deploy on Vercel

The app is Vercel-ready as a standard Next.js project. From this directory:

```bash
npx vercel
```

Production:

```bash
npx vercel --prod
```

Or import the GitHub repo in the Vercel dashboard (`dhivagar29/bot-org-map`). Framework preset: **Next.js**. No environment variables are required.

After the first production deploy, paste the URL into the Live line at the top of this README.

## Using the map

- **Map** — Doug at the top, six section columns underneath. Scroll horizontally on small screens.
- **Directory** — Section cards with full agent cards.
- Search by name, title, job, persona, or section.
- Filter chips narrow to one desk (including Leadership).
- Select an agent to see reports-to and persona. Press Escape to clear.
