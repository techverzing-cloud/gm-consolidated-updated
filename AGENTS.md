<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes

## Toolchain
- Package manager is **pnpm** (v11.25.0, pinned via `packageManager`). Install with `pnpm install` — do not use npm/yarn.
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint` (runs `eslint`).
- There is **no `typecheck` script**; run `tsc --noEmit` directly to typecheck. No test runner is configured.
- Path alias `@/*` maps to the **repo root** (`tsconfig.json:21`), NOT `./src/*`. To import a `src/` file you must write `@/src/...` (e.g. `@/src/shared/components/Button`), not `@/shared/...`

## Framework / styling quirks
- Next.js **16.3.4** with React 19. The breaking-change warning above applies; consult `node_modules/next/dist/docs/` before writing code.
- The App Router tree lives under `src/app/` (currently scaffold `page.tsx` / `layout.tsx`). Root `src/app/layout.tsx` uses an ambient `LayoutProps<"/">` type — globally provided by this Next version, no import needed.
- Tailwind **v4**: configured via `@import "tailwindcss"` and `@theme` in `src/app/globals.css` — there is no `tailwind.config` file.
- `pnpm-workspace.yaml` sets `allowBuilds` to skip postinstall builds for `sharp` and `unrs-resolver`.

## Tailwind CSS v4 Conventions

We use **Tailwind CSS v4**. Always prefer native Tailwind utilities/scales over arbitrary values when an exact equivalent exists.

- `w-[100px]` → `w-25`; prefer `w-x` over `w-[x]`.
- `h-[14px]` → `h-3.5`.
- `bg-black/[.06]` → `bg-black/6`; same for all color opacity utilities (`/50`, `/10`, `/6`, etc.).
- `aspect-ratio-[1/1]` → `aspect-square`.
- `aspect-ratio-[16/9]` → `aspect-video` when applicable.
- `border-[1px]` → `border`; `border-[2px]` → `border-2`.
- `top-[0px]`, `right-[0px]`, etc. → `top-0`, `right-0`, etc.
- `rounded-[9999px]` → `rounded-full`.
- `font-[700]` → `font-bold`; `font-[600]` → `font-semibold`.
- Prefer native flex/grid utilities: `flex-1`, `grid-cols-3`, `items-center`, `justify-center`, etc.
- Prefer semantic/theme colors over arbitrary hex values when available.
- Use `!` modifier syntax directly: `!flex`, `!hidden`, `!w-full`, etc.
- Prefer native spacing, sizing, typography, color, border, radius, shadow, positioning, flex, and grid utilities.
- Do not use arbitrary values when an exact Tailwind v4 equivalent exists.
- Arbitrary values are valid when no exact native/project utility exists or the design genuinely requires a custom value. Do not replace them with an approximate value.
- Follow existing project conventions consistently.
- Treat Tailwind **v4 syntax and utilities** as authoritative; do not apply outdated v3 conventions blindly.

Before adding any arbitrary class, check whether Tailwind v4 already provides an equivalent. The goal is clean, idiomatic Tailwind v4—not eliminating arbitrary values at all costs.

# Engineering Rules

## Next.js

* Use **Next.js App Router** conventions.
* Prefer **Server Components** by default; use `"use client"` only when required.
* Use `next/image`, `next/font`, and `next/link` where appropriate.
* Keep route-specific components close to their route.
* Use `metadata` / `generateMetadata` properly for SEO.
* Avoid unnecessary API routes, server actions, or client-side fetching for static business-site content.

## UI Skills

* The repo bundles curated UI skills in `.opencode/skills/`, loadable via the `skill` tool: `anti-ui-slop`, `better-typography`, `ui-design`, `ui-radar`, `web-design-guidelines`. **Prefer these first** for any UI task; they are project-installed and don't require a network fetch.
* Pick the skill that matches the goal (e.g. `anti-ui-slop` to ground UI / run a finish gate, `ui-design` to design/build/improve an interface, `better-typography` for type work, `ui-radar` to find real UI references, `web-design-guidelines` to review against best practices). Prefer 1 skill; use 2 only for two clear angles, 3 only for broad review/redesign. Never more than 3.
* **Use `ui-skills` (via `npx ui-skills start`) only when no bundled skill is relevant** to the task.
* If the UI goal is unclear, ask one short clarifying question before proceeding.

## Components

* Keep components small and focused.
* Prefer composition over large configurable "god components".
* Don't create unnecessary abstractions or components used only once without a clear readability benefit.
* Separate content/data from presentation when practical.
* Reuse existing components before creating new ones.

## TypeScript

* **Never use `any`** unless there is a documented, legitimate reason.
* Use proper types for component props, APIs, and data.
* Avoid unnecessary `as` type assertions.
* Reuse shared types instead of duplicating them.
* Maintain strict TypeScript correctness.

## CSS / UI

* Do not use inline styles unless genuinely necessary.
* Do not introduce another CSS framework or styling system.
* Use project design tokens consistently.
* Avoid repeatedly hardcoding the same design values.
* Ensure layouts work properly across mobile, tablet, and desktop.
* Do not solve responsive issues with excessive one-off overrides.

## Accessibility

* Prefer semantic HTML.
* Use appropriate `alt` text for meaningful images.
* Interactive elements must be keyboard accessible.
* Never use `<div>` or `<span>` as a button when a `<button>` is appropriate.
* Maintain visible focus states.
* Maintain logical heading hierarchy.
* Never sacrifice accessibility for visual styling.

## Performance

* Minimize client-side JavaScript.
* Avoid unnecessary `"use client"` boundaries.
* Prefer server-side/static rendering when appropriate.
* Use optimized Next.js images and fonts.
* Avoid unnecessary effects, re-renders, and client-side data fetching.
* Do not install a dependency for functionality that can reasonably be implemented with existing code or native browser APIs.

## SEO

* Every important page must have a unique `title` and `description`.
* Use semantic headings and meaningful HTML structure.
* Configure canonical URLs where appropriate.
* Provide sitemap and robots configuration.
* Add Open Graph metadata for important pages.
* Important SEO content must not depend unnecessarily on client-side rendering.
* Use structured data/schema markup when it provides genuine SEO value.

## Dependencies

* **Do not add dependencies without a clear reason.**
* Check existing dependencies and native APIs before installing anything.
* Avoid overlapping libraries that solve the same problem.
* Prefer stable, well-maintained dependencies.

## Code Hygiene

* Modify only files relevant to the task.
* Do not rewrite working code unnecessarily.
* Remove dead code, unused imports, debugging logs, and commented-out code.
* Never suppress lint, TypeScript, or build errors without understanding and addressing the underlying issue.
* Keep changes focused, minimal, and reviewable.
* Follow existing project conventions before introducing new patterns.

## Architectural Decisions

**Do not make significant architectural decisions silently.**

Before introducing any of the following, explain the reason and trade-offs:

* New dependencies
* New architectural patterns
* Major folder restructuring
* Authentication/authorization systems
* CMS integrations
* State-management libraries
* New data-fetching strategies
* New backend/API layers
* Significant infrastructure or deployment changes

Prefer the **simplest solution that correctly satisfies the requirement**.

## Core Principle

Optimize for:

**Correctness → Maintainability → Performance → Accessibility → SEO → Simplicity**

Do not over-engineer. Do not add complexity without a measurable or clearly justified benefit. Reuse existing patterns where possible and make significant changes only when actually required.

## Verify Before Assuming

* Before using any Next.js API, convention, configuration, or behavior, verify it against the **installed Next.js version and local documentation**.
* Do not rely on assumptions or knowledge from older Next.js versions.
* When the local Next.js agent rules instruct you to consult `node_modules/next/dist/docs/`, follow them.

## Configuration Changes

* Do not modify framework or tooling configuration unless the task genuinely requires it.
* This includes `next.config.*`, `tsconfig.json`, ESLint configuration, package scripts, Tailwind configuration, workspace configuration, and similar files.
* Before changing configuration, understand the existing setup and explain why the change is necessary.
* Prefer solving the problem at the application/code level when configuration changes are unnecessary.

## Dependency & Tooling Discipline

* Do not change package versions, package managers, build tools, or development tooling without a clear requirement.
* Do not add, remove, or upgrade dependencies casually.
* Before making tooling changes, inspect the existing configuration and dependencies and consider whether the requirement can be solved without changing them.
* Keep the existing toolchain stable unless there is a concrete reason to change it.
