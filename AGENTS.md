# RSA Interface Constitution (v0.1 — starter)

> Non-negotiable rules every agent and developer follows on every unit of work in this repo.
> OpenCode reads this file (AGENTS.md) on every run. Starter version for the pilot — it grows
> from what we learn. Scope: the interface layer. (The Figma auto-scaler rule is preserved below.)

## 1. Stack
- React 18 + TypeScript (Vite), Tailwind CSS, Radix UI / ShadCN components.
- Server state: TanStack Query + Axios. Client state: Zustand.
- Backend (a unit's API half): Python / FastAPI with Pydantic models.
- Types across the seam: backend Pydantic models generate the TS types the front-end imports —
  never hand-write a type that duplicates a backend model.
- Do not add a new library, framework, or state tool without an explicit decision. If a unit
  seems to need one, stop and ask.

## 2. Structure
- Features live under `client-app/src/modules/<feature>/` and own their UI, hooks, services,
  types, and route pages (pathway, bluebook, network, myprofile, schedule, setting).
- Build a unit inside its feature module. Do not touch the app shell or other modules.

## 3. Design
- Tokens only. Use the Tailwind theme and ShadCN components for all color, spacing, typography,
  and radius. No hardcoded hex colors, pixel spacing, or font values.
- Reuse existing components before creating new ones.

## 4. Code quality
- TypeScript strict. No `any` unless justified in a comment. No unused code.
- Every exported function/component has a short doc comment. Keep functions small and single-purpose.
- No secrets in code — ever.

## 5. Testing
- Acceptance tests come from the spec, before code — they define "done," written independently
  of the implementation.
- Unit tests are written with the code.
- A unit is not done until its tests pass.

## 6. Process
- Spec before code. No implementation starts until a spec with acceptance criteria is approved
  and the unit is "Ready for Development."
- Small units — one vertical slice (a screen's behavior + its API) per unit.
- Review before merge. Every change goes through a PR. No auto-merge — a human gives final
  approval. Tests and security issues block the merge.

## 7. The golden rule
If the spec and the code disagree, the spec is right — fix the code, or change the spec
deliberately. Code never silently decides what the feature does.

---

# Responsive Design Rule for Figma Conversions

When converting fixed-size Figma designs (typically 1440x900) to HTML/CSS, you must ensure that the output is responsive, maintains its original 1:1 aspect ratio scaling, BUT expands to fill 100vw and 100vh without leaving any letterbox margins (black space) on the sides or top/bottom.

Because Figma data usually provides absolute coordinates (`left`, `top`, `width`, `height` in pixels), standard responsive CSS can be difficult to map directly.

## The Dynamic Auto-Scaler Solution (Margin-Free)

Instead of hardcoding `1440px` and `900px` and accepting margins on different aspect ratio screens (like 16:9), we scale the canvas proportionally (`scale = Math.min(scaleX, scaleY)`) but ALSO expand the canvas's explicit dimensions to perfectly fill the screen (`100vw / scale` and `100vh / scale`). 

### Implementation Guide

1. **The Wrapper (Viewport)**
   Create a full-screen wrapper that hides overflow and centers the content.
   ```css
   body, html {
     margin: 0;
     padding: 0;
     width: 100vw;
     height: 100vh;
     overflow: hidden;
     background-color: #000;
   }
   .app-viewport {
     position: relative;
     width: 100vw;
     height: 100vh;
     overflow: hidden;
   }
   ```

2. **The JavaScript Auto-Scaler (AppLayout)**
   Add this script to calculate the scale factor AND expand the canvas size dynamically.
   ```javascript
   function scaleDesign() {
     const baseWidth = 1440;
     const baseHeight = 900;
     
     // 1. Calculate how much we need to scale to fit the base design
     const scaleX = window.innerWidth / baseWidth;
     const scaleY = window.innerHeight / baseHeight;
     
     // 2. Use Math.min to ensure the base 1440x900 is never cropped
     const scale = Math.min(scaleX, scaleY);
     
     // 3. Expand the canvas size so that after scaling, it exactly fills the screen
     const dynamicWidth = window.innerWidth / scale;
     const dynamicHeight = window.innerHeight / scale;

     if (canvasRef.current) {
       // Set dynamic dimensions to fill empty margin space
       canvasRef.current.style.width = `${dynamicWidth}px`;
       canvasRef.current.style.height = `${dynamicHeight}px`;
       
       // Center and scale it back
       canvasRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
     }
   }
   ```

3. **Adapting Child Components (Relative Width/Height)**
   Since the canvas width and height are now dynamic (larger than 1440x900), absolute positioning must adapt:
   - **Full height Sidebars**: Use `height: '100%'` instead of fixed `900px`.
   - **Right-aligned Elements (TitleBar, Content Areas)**: Use percentages, e.g., `width: 'calc(100% - 115px)'` instead of fixed widths like `1325px`.
   - **Bottom-aligned Elements**: If placing icons at the bottom of the sidebar, use `bottom: [X]px` instead of `top: [Y]px` so they stick to the bottom when the height expands.
   - **Vertically Centered Elements**: Use `top: '50%', transform: 'translateY(-50%)'` instead of fixed `top` pixel values.

## Why this works
- All structural elements (like sidebar width `115px`) still use exact `px` values from Figma.
- The scaling ensures everything shrinks or grows proportionally (maintaining 1:1 ratio).
- The dynamic canvas dimensions (`100vw / scale`) allow fluid components (using `100%` or `calc`) to stretch horizontally and vertically, completely eliminating letterbox margins on all monitors.
