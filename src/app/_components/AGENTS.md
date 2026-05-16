# src/app/_components — UI Component Library

Custom components + shadcn/ui (New York style, `tw-` prefix) + Ant Design. Organized by feature domain.

## STRUCTURE

```
_components/
├── shadcn/              # shadcn/ui generated (ui/, utils/, libs/, hooks/)
├── layout/              # Header, Footer, navigation
│   └── header/tools/    # Theme toggle, search, user menu
├── home/                # Home page sections
│   └── cards/           # Welcome card, video, typed text, timeline
├── blog/                # Blog CRUD components
│   ├── form/            # Create/edit form
│   │   └── tag/         # TagInput component (526 lines — largest file)
│   └── list/            # Post list, cards, pagination
├── auth/                # Login form, auth provider
├── aboutme/             # About me page components
├── message/             # Message board
├── deepseek/            # AI chat UI
├── web_nav/             # Web navigation links
├── theme/               # Theme provider, toggle
├── mdx/                 # MDX rendering components
├── motion/              # Animation components (motion/react-spring)
├── modal/               # Modal/parallel route components
├── paginate/            # Pagination controls
├── video/               # ArtPlayer video component
├── text/                # Text effects (typed.js)
├── cards/               # Generic card components
├── background/          # Background effects
├── collapsible/         # Accordion/collapse
├── loading/             # Loading skeletons
└── link/                # Link components
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add page section | Create dir under `_components/{feature}/` | Follow existing naming: `index.tsx` + sub-components |
| Use shadcn/ui | `shadcn/ui/` | Import from `@/app/_components/shadcn/ui/{component}` |
| Form components | `blog/form/` | Uses react-hook-form + Ant Design |
| Auth context | `auth/provider.tsx` | Wraps whole app, provides user state |
| Theme system | `theme/` | Dark/light mode with CSS variables |
| Responsive hooks | `@/libs/broswer.ts` | `useIsMobile()`, `useIsTablet()`, `useIsDesktop()`, `useScroll()` |
| MDX rendering | `mdx/` | Custom MDX components for blog content |

## CONVENTIONS

- **Tailwind prefix**: ALL classes use `tw-` prefix (shadcn/ui config enforces this)
- **Component structure**: `index.tsx` as barrel export, sub-components in same directory
- **Client components**: Most UI components are `'use client'` — add directive at top
- **State management**: Zustand stores created via `@/libs/store` helpers (immer + devtools included)
- **Icons**: Lucide (via `lucide-react`) or `@ricons/fluent` + `@ricons/material`
- **Animations**: `motion` (formerly framer-motion) + `@react-spring/web` for complex animations
- **CSS Modules**: Used alongside Tailwind (e.g. `layout.module.css`) for complex layouts
- **Form validation**: react-hook-form with `@hookform/resolvers` (Zod schemas)

## ANTI-PATTERNS

- **DO NOT** use Tailwind without `tw-` prefix — will not apply
- **DO NOT** create new Zustand stores without using `@/libs/store` factory functions (ensure immer + devtools)
- **TagInput** (`blog/form/tag/tag-input.tsx`): 526 lines, most complex single file — refactor with care
