# src/server — Hono API Backend

Hono-based REST API running inside Next.js via `hono/vercel`. Bridged through `src/app/api/[[...route]]/route.ts`.

## STRUCTURE

```
server/
├── main.ts             # App assembly: routes, OpenAPI, Swagger, Scalar docs
├── common/             # Shared Hono utilities
│   ├── app.ts          # createHonoApp() — base Hono + prettyJSON + Passport
│   ├── middlwares.ts   # AuthProtected middleware (JWT guard)
│   ├── response.ts     # OpenAPI response factory functions
│   ├── error.ts        # createErrorResult(), defaultValidatorErrorHandler
│   └── schema.ts       # Standard error response schema
├── auth/               # Authentication (passport local + JWT)
├── post/               # Blog post CRUD
├── category/           # Category tree (bark/ltree)
├── tag/                # Tag management
├── deepseek/           # DeepSeek AI chat
└── test/               # Test utilities/test endpoints
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new route group | Create `{domain}/{routes,schema,service,type}.ts` — follow existing pattern |
| Auth middleware | `common/middlwares.ts` → `AuthProtected` — apply to protected routes |
| OpenAPI responses | `common/response.ts` — `createSuccessResponse()`, `createErrorResponse()`, etc. |
| Zod validation | `hono-openapi/zod` → `validator()` + `describeRoute()` for OpenAPI docs |
| Passport strategies | `auth/passport.ts` — local + JWT strategies |

## CONVENTIONS

- **Route structure**: Each domain has `routes.ts` (endpoints), `schema.ts` (Zod schemas), `service.ts` (business logic), `type.ts` (TypeScript types)
- **Service files**: Use `'use server'` directive. Import DB from `@/libs/db/client` (NOT `@prisma/client` directly).
- **Error handling**: Always wrap in try/catch, return `createErrorResult()` with status code
- **Auth guard**: Apply `AuthProtected` middleware; access user via `(c.req as any).user`
- **OpenAPI**: Every route must have `describeRoute()` with tags, summary, and response schemas
- **Validation**: Use `validator('json'/'query'/'param', schema, defaultValidatorErrorHandler)`
- **API prefix**: All routes under `/api` (set by `appConfig.apiPath` in `main.ts`)
- **Imports**: Always use `@/` alias when importing from within `src/server/`

## ANTI-PATTERNS

- **DO NOT** call Prisma directly in route handlers — go through service layer
- **DO NOT** skip OpenAPI docs on new endpoints
- **DO NOT** use relative imports in deepseek/test modules — use `@/` alias
