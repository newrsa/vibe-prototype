# Client App — AGENTS.md
> Project rules and conventions for AI agents working on this codebase.

---

## 📋 Project Overview

**Name:** Client App  
**Type:** AI-powered dashboard web application  
**Stack:** React 18 + TypeScript + Tailwind CSS v3 + ShadCN UI  
**State:** Zustand (with devtools + persist)  
**Data Fetching:** Axios + React Query (@tanstack/react-query)  
**Routing:** React Router DOM v6 (createBrowserRouter)  
**Icons:** lucide-react  
**Location:** `prototype/client-app/`

---

## 🏗️ Architecture: Module-Based

The project follows a **feature-module architecture**. All feature code lives inside `src/modules/`.

### Modules
| Module      | Route         | Folder                    |
|-------------|---------------|---------------------------|
| Pathway     | `/pathway`    | `src/modules/pathway/`    |
| Bluebook    | `/bluebook`   | `src/modules/bluebook/`   |
| Network     | `/network`    | `src/modules/network/`    |
| My Profile  | `/my-profile` | `src/modules/myprofile/`  |
| Schedule    | `/schedule`   | `src/modules/schedule/`   |
| Settings    | `/setting`    | `src/modules/setting/`    |

### Each module contains:
```
modules/<module-name>/
├── components/     # Module-specific UI components
├── hooks/          # Module-specific custom hooks
├── services/       # Module-specific API service calls
├── types/          # Module-specific TypeScript types
├── pages/          # Route-level page components
└── index.ts        # Barrel export
```

---

## 📁 Shared Folder Structure

```
src/
├── ai/             # AI features (aiService, useAI hook)
├── assets/         # Static assets (icons, images)
├── components/
│   ├── ui/         # ShadCN components (Button, Card, Input, Badge)
│   ├── layout/     # AppLayout, Sidebar, Header
│   └── common/     # ErrorBoundary, LoadingSpinner, PageHeader
├── hooks/          # useAuth, useDebounce
├── lib/            # lib/utils.ts (cn() helper)
├── modules/        # Feature modules (see above)
├── router/         # routes.tsx (createBrowserRouter)
├── services/       # api/axiosInstance.ts, auth.service.ts
├── store/          # auth.store.ts, app.store.ts (Zustand)
├── types/          # common.types.ts, auth.types.ts
└── utils/          # constants.ts, formatters.ts, validators.ts
```

---

## 🛠️ Coding Conventions

### Path Aliases
Always use path aliases instead of relative paths:
```ts
// ✅ Correct
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks'
import { ROUTES } from '@/utils/constants'

// ❌ Wrong
import { Button } from '../../components/ui/button'
```

### Barrel Exports
Every folder has an `index.ts` that re-exports everything:
```ts
// Import from the barrel, not directly
import { useAuth, useDebounce } from '@/hooks'
```

### Services Pattern
- **Shared services** (auth, notifications): `src/services/`
- **Module services** (pathway API, bluebook API): `src/modules/<module>/services/`
- All API calls go through `axiosInstance` (never raw `fetch` or raw `axios`)

### Component Naming
- Pages: `<ModuleName>Page.tsx` → e.g., `PathwayPage.tsx`
- Layout: `AppLayout.tsx`, `Sidebar.tsx`, `Header.tsx`
- Reusable: PascalCase, no suffix

### State Management Rules
- **Global state** (auth, theme, sidebar, notifications): Zustand stores in `src/store/`
- **Server state** (API data): React Query (`useQuery`, `useMutation`)
- **Local UI state**: `useState` / `useReducer` inside component
- **Never** put server data in Zustand stores

### Types
- Define shared types in `src/types/`
- Define module-specific types in `src/modules/<module>/types/`
- Always export types from barrel `index.ts`

---

## 🎨 Styling Rules

- Use **Tailwind CSS** utility classes (not inline styles)
- Use **ShadCN CSS variables** for theme colors (e.g., `text-primary`, `bg-muted`)
- Use `cn()` from `@/lib/utils` to merge conditional classes
- Use `glass` utility class for glassmorphism cards
- Use `gradient-text` for gradient text effects
- Use `animate-fade-in` for page enter animations

### Color Usage
- Brand: `brand-500` (indigo #6366f1)
- Success: `emerald-*` 
- Warning: `amber-*`
- Danger: `destructive` / `red-*`

---

## 🤖 AI Features

- AI service: `src/ai/services/ai.service.ts`
- AI hook: `src/ai/hooks/useAI.ts`
- AI calls go through backend proxy (never expose API keys in frontend)
- Streaming supported via `useAI.sendStreamMessage()`

---

## 🔑 Environment Variables

All env vars must start with `VITE_` to be accessible in browser.
See `.env.example` for the full list.

---

## 📦 Adding New ShadCN Components

```bash
# From client-app directory
npx shadcn@latest add <component-name>
# e.g.
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add toast
```

---

## 🚀 Running the Project

```bash
cd prototype/client-app
npm install
npm run dev       # Dev server at http://localhost:3000
npm run build     # Production build
npm run build:check  # TypeScript check only
```

---

## ✅ Checklist for New Features

When adding a new feature/page:
1. Create module folder with `components/`, `hooks/`, `services/`, `types/`, `pages/` subdirs
2. Create a page component in `pages/`
3. Export from module `index.ts`
4. Add route in `src/router/routes.tsx` (lazy loaded)
5. Add nav item in `src/components/layout/Sidebar.tsx` if needed
6. Add route constant in `src/utils/constants.ts`
7. Add query key in `QUERY_KEYS` in `constants.ts`
