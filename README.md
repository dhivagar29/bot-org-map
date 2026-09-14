# Don’s Org Map

Interactive org map for **Dhivagar’s Grok Bot team**. Doug sits at the root as Chief of Staff. Everyone else reports to Doug across six desks: Office of Don, Tech, X, Digital, Finance, and Family.

Public roster only — no emails, phones, private agent IDs, or tokens.

- **GitHub:** https://github.com/dhivagar29/bot-org-map
- **Live:** https://bot-org-map-app.vercel.app

## What’s new in this rebuild

- Cinematic dark UI (map + directory, search, desk chips, personnel panel)
- Roster now includes **Whiterose** (MTS / Codex CLI) and **Mike** (Investigator / Treg)
- Webpack-forced Next scripts for this build host
- Vitest coverage for roster helpers

## Edit the roster

All names, titles, jobs, sections, and personas live in one file:

```
src/data/org.ts
```

Keep `id` values as public slugs. Doug is root (`reportsTo: null`, `pinned: true`).

## Local run

Node 22:

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Notes

- Titles follow the locked desk map from Doug. Mike = Investigator; Whiterose = Member of Technical Staff.
- Persona lines are optional short show references.
