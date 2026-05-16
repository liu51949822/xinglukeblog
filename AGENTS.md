# 行路客的小站 (xinglukeblog)

**Generated:** 2026-05-16
**Commit:** 84134ac
**Branch:** main

## OVERVIEW

Personal tech/life blog — Next.js 15 App Router + Hono API + Prisma/PostgreSQL + Redis. Custom component library with shadcn/ui (New York, `tw-` prefix) + Ant Design.

## STRUCTURE

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (metadata only)
│   ├── api/[[...route]]/route.ts   # Hono → Next.js bridge endpoint
│   ├── (pages)/                    # Route group: main app layout (Header/Footer/Theme/Auth)
│   │   ├── page.tsx                # Home page
│   │   ├── blog/                   # Blog CRUD + listing
│   │   ├── auth/login/             # Login page
│   │   ├── message/                # Message board
│   │   ├── myself/                 # About me + timeline
│   │   ├── deepseek/               # AI chat page
│   │   └── webnav/                 # Web navigation links
│   ├── _components/                # All UI components (→ AGENTS.md)
│   └── styles/                     # Global CSS, Tailwind, CSS vars
├── server/                         # Hono API backend (→ AGENTS.md)
├── api/                            # Typed Hono RPC clients for frontend
├── config/                         # Static config data (personal info, web links, etc.)
├── database/                       # Prisma schema (multi-file), migrations, seed, legacy client
├── libs/                           # Shared utilities (db client, env, redis, store, time, etc.)
└── install.ts                      # Auto-generate JWT secret on postinstall
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| API endpoints | `src/server/{auth,post,category,tag,deepseek,test}/routes.ts` | Hono routes with OpenAPI docs |
| API typed clients | `src/api/{auth,post,category,tag,chat}.ts` | Typed RPC via `hono/client` |
| Database schema | `src/database/schema/*.prisma` | Multi-file Prisma schema |
| DB client (primary) | `src/libs/db/client.ts` | With paginate + bark extensions |
| Auth flow | `src/server/auth/{passport,utils,token,service}.ts` | Passport local + JWT, Redis blacklist |
| Page components | `src/app/(pages)/**/page.tsx` | Next.js App Router pages |
| Reusable components | `src/app/_components/` | shadcn/ui + custom |
| Global CSS vars | `src/app/styles/vars.css` | CSS custom properties for theming |
| Environment config | `.env`, `src/config/app.ts` | API path, base URL, locale, timezone |
| Personal data | `src/config/{me,home,web}.ts` | About me, home page content, web links |
| Deployment | `Dockerfile`, `docker-compose.yml`, `ecosystem.config.js`, `nginx.conf` | Docker + PM2 |

## CONVENTIONS

- **Tailwind prefix**: ALL tailwind classes use `tw-` prefix (e.g. `tw-bg-red-500`, not `bg-red-500`)
- **Import alias**: `@/` → `./src/`. Always use `@/` for internal imports.
- **shadcn/ui paths**: Components at `@/app/_components/shadcn/ui`, utils at `@/app/_components/shadcn/utils`
- **TypeScript strict**: `strict: true`, `noUnusedLocals: true`, `noImplicitReturns: true`
- **Prettier**: Auto-formatting enforced via ESLint plugin
- **Stylelint**: CSS linting with recess-order
- **Server components**: Pages default to server components; use `'use client'` only when needed
- **Hono services**: Use `'use server'` directive in service files called from routes
- **Category tree**: Uses `prisma-extension-bark` for Materialized Path (ltree) model
- **Pagination**: Uses `prisma-paginate` extension; always transform through `paginateTransform()`
- **Tag association**: Use `connectOrCreate` pattern when creating/updating posts with tags
- **Environment**: Scripts use `cross-env NODE_ENV=development` for DB operations

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** use the legacy Prisma client at `src/database/client.ts` — use `src/libs/db/client.ts` (has paginate + bark extensions)
- **DO NOT** use `bg-*`, `text-*`, etc. without the `tw-` prefix
- **DO NOT** import from `@prisma/client` directly in service code — use `@/libs/db/client`
- **DO NOT** bypass `fetchApi()` wrapper when calling Hono API clients — it handles 401 redirects

## UNIQUE STYLES

- **Dual Prisma clients**: `src/database/client.ts` (legacy, with truncate extension) vs `src/libs/db/client.ts` (primary, with paginate + bark + ancestor/descendant helpers). Use the latter.
- **Cookie abstraction**: `src/libs/coolkies.ts` wraps `cookies-next` + `next/headers` for isomorphic cookie access
- **Auth token**: Stored in cookies as `auth_token`, also accepted via `Authorization: Bearer` header. Redis-backed blacklist on logout.
- **Zustand stores**: Created via `createStore()`, `createPersistStore()`, `createReduxStore()` — always includes immer + devtools + subscribeWithSelector middleware
- **Post thumbnails**: Randomly assigned on create from `/uploads/thumb/post-{1-8}.png`
- **Slug generation**: Chinese → pinyin → lowercase kebab-case via `generateLowerString()`
- **Time handling**: All timestamps go through `localTime()` with `Asia/Shanghai` timezone

## COMMANDS

```bash
pnpm dev            # Start dev server (clears .next first)
pnpm build          # Production build (clears .next first)
pnpm start          # Start production server
pnpm lint           # ESLint + Stylelint (fix mode)
pnpm lint:es        # ESLint only
pnpm lint:style     # Stylelint only

# Database
pnpm dbg            # prisma generate
pnpm dbp            # prisma db push (no migration)
pnpm dbm            # prisma migrate dev (skip seed)
pnpm dbms           # prisma migrate dev (with seed)
pnpm dbmr           # prisma migrate reset -f (skip seed)
pnpm dbmrs          # prisma migrate reset -f (with seed)
pnpm dbs            # prisma db seed
pnpm dbmd           # prisma migrate deploy (production)
pnpm dbo            # prisma studio

# shadcn/ui
pnpm addsc          # dlx shadcn@latest add

# Set up env (auto-generates JWT secret)
pnpm setEnv
```

## NOTES

- **No tests**: No test infrastructure exists. No Jest/Vitest/Playwright configs.
- **Next.js config quirks**: `reactStrictMode: false`, ESLint/TS errors ignored during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`)
- **Output mode**: `standalone` — required for Docker deployment
- **Postinstall**: Runs `setEnv && dbm && dbs && dbg` automatically — be aware on fresh installs
- **Redis**: Key prefix is `nextapp:` — build-time Redis connects lazily to avoid connection errors
- **JWT expiry**: 5 days by default, configured in `src/config/auth.ts`
- **DeepSeek API**: Requires `DEEPSEEK_API_KEY` env variable
- **Port**: Dev on 3000, Production Docker on 80
