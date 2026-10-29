# Unit 001 — Appearance: working light/dark theme in Settings

**Feature:** `setting` · **Type:** interface unit (front-end; client-state only) · **Owner (pilot):** Nilesh
**Status:** DRAFT — awaiting feature-owner approval → then "Ready for Development"

---

## Context / why
The `setting` page is an empty stub. The app already has theme *infrastructure* — a `theme`
field in the Zustand app store, `Theme = 'light' | 'dark' | 'system'`, and Tailwind
`darkMode: ['class']` — but it does **not work**: nothing applies the theme to the DOM, so the
UI never actually switches. This unit makes light/dark theming real, controlled from Settings.

## Scope
**In scope**
- An **"Appearance"** section on the Settings page (`setting` module) with a **Light / Dark** control.
- The control reflects and updates the app store's `theme` (`useAppStore`).
- A minimal app-level mechanism that **applies** the theme — adds/removes the `dark` class on the
  document root — so Tailwind dark mode activates and the UI visibly changes.
- The choice **persists** across page reload.
- Tokens only — no hardcoded hex; any color via the Tailwind theme / ShadCN.

**Out of scope (become their own later units)**
- Fixing the layout `TitleBar` `ThemeToggle` (it's separately broken — logged as a follow-up unit).
- The `'system'` theme option (v1 is Light/Dark only).
- Any backend/API — theme is client state only.

## User-facing behavior
1. User opens **Settings** → sees an **Appearance** section.
2. It shows the current theme and a control to switch between **Light** and **Dark**.
3. Switching **immediately** changes the app's appearance (light ⇄ dark).
4. The chosen theme **survives a page reload**.

## Acceptance criteria (the oracle — tests verify these)
- **AC1** — The Settings page renders an "Appearance" section containing a labelled Light/Dark control.
- **AC2** — The control's displayed state equals `useAppStore().theme` on load.
- **AC3** — Activating the control calls `setTheme` and updates the store to the selected value.
- **AC4** — When `theme === 'dark'`, the document root has the `dark` class; when `'light'`, it does not.
- **AC5** — After changing the theme and reloading, the previously selected theme is restored.
- **AC6** — No hardcoded hex color values appear in the new/changed code; colors come from Tailwind
  tokens / ShadCN classes.

## Technical notes / constraints
- Build inside `client-app/src/modules/setting/` (do not touch the app shell or other modules).
- Reuse `useAppStore` (`theme`, `setTheme`) — do not create a second source of theme truth.
- Theme application: a small `useApplyTheme` hook (or equivalent effect) mounted once at the app
  root that syncs `theme` → document root `dark` class. This is the one permitted app-level touch.
- Persistence: persist only the `theme` value (e.g. Zustand `persist` on that slice, or localStorage
  inside the apply hook).
- Build a new token-based control for the Appearance section; do **not** reuse the broken
  `layout/ThemeToggle` (hardcoded off-brand hex — handled in its own follow-up unit).
- TypeScript strict; exported items get a short doc comment (per the constitution).

## Definition of done
- All acceptance criteria pass (unit tests for the store/apply logic; a render/interaction test for
  the Appearance control).
- No hardcoded hex in changed code; `npm run lint` and `tsc --noEmit` clean.
- PR opened, reviewed, approved (pilot: Nilesh), merged.
