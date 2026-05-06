# CLAUDE.md — iptv-nederland.com

## Project Overview

Migrating iptv-nederland.com from monolithic WordPress/Elementor to **Headless WordPress + Next.js**.

- **WordPress** (backend only): `cms.iptv-nederland.com` — content management dashboard
- **Next.js** (frontend): `iptv-nederland.com` — public-facing site
- **API**: WPGraphQL connects WordPress → Next.js

## Architecture

```
WordPress (Hostinger) → WPGraphQL → Next.js (Vercel)
```

- WordPress serves as headless CMS (no frontend rendering)
- Next.js App Router with TypeScript (strict mode)
- ISR (Incremental Static Regeneration) for content updates
- ACF Pro for structured content modeling
- Rank Math for SEO data (consumed via WPGraphQL)

## Tech Stack

| Layer | Technology |
|---|---|
| CMS | WordPress + ACF Pro + WPGraphQL |
| Frontend | Next.js 15+ (App Router) |
| Language | TypeScript (strict) |
| Styling | Vanilla CSS (no Tailwind) |
| SEO | Rank Math → WPGraphQL for Rank Math |
| Forms | Next.js API routes → WordPress REST |
| Email/CRM | FluentCRM (stays on WordPress) |
| Hosting | Vercel (frontend) + Hostinger (WordPress) |

## Directory Structure

```
iptv-nederland.com/
├── CLAUDE.md              # This file
├── .claude/
│   └── tasks.md           # Migration task tracker
├── scripts/
│   ├── db-backup.bat      # Database backup utility
│   └── README.md          # Scripts documentation
├── backups/               # DB dumps (gitignored)
├── wordpress-inventory.md # Snapshot of current WP state
├── frontend/              # Next.js app (created in Milestone 2)
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # GraphQL client, queries, types
│   │   └── styles/        # Global CSS
│   └── ...
├── wp-content/            # WordPress (existing)
│   ├── themes/
│   │   └── headless-iptv/ # New headless theme (Milestone 1)
│   └── plugins/
└── wp-config.php
```

## Coding Conventions

- **Language**: TypeScript strict mode, functional & declarative
- **Components**: Server Components by default, `"use client"` only when needed
- **Styling**: Vanilla CSS with custom properties, no utility frameworks
- **Data fetching**: `fetch()` with ISR in Server Components
- **Comments**: Concise, explain "why" not "how"
- **Naming**: PascalCase components, camelCase functions, kebab-case files

## Key Commands

```bash
# Frontend development
cd frontend && npm run dev      # Start Next.js dev server
cd frontend && npm run build    # Production build
cd frontend && npm run lint     # Lint check

# WordPress
# Access dashboard at: http://iptv-nederland.com/wp-admin (local)
# GraphQL endpoint: http://iptv-nederland.com/graphql (after WPGraphQL installed)
```

## Task Tracker

See `.claude/tasks.md` for the full migration checklist with milestones.
