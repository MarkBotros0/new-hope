# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Freshly-scaffolded Vite + React 19 + TypeScript single-page app. No routing, state management, backend, or test setup exists yet — `src/App.tsx` still contains the starter landing page. Treat this as a blank slate: introduce libraries and structure deliberately as features are added.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Type-check (tsc -b, all project references) then vite build → dist/
npm run lint     # Run Oxlint
npm run preview  # Serve the production build locally
```

There is no test runner configured. `npm run build` is the primary correctness gate — it runs `tsc -b` before bundling, so type errors fail the build.

## Toolchain notes

- **Linter is Oxlint, not ESLint.** Config lives in `.oxlintrc.json` with the `react`, `typescript`, and `oxc` plugins. `react/rules-of-hooks` is an error. To enable type-aware rules, install `oxlint-tsgolint` and set `options.typeAware: true` (see `README.md`).
- **TypeScript uses project references** (`tsconfig.json` → `tsconfig.app.json` for `src/`, `tsconfig.node.json` for config files). Bundler mode is on: `verbatimModuleSyntax` requires `import type` for type-only imports, and `allowImportingTsExtensions` means `.tsx`/`.ts` extensions appear in import paths. `noUnusedLocals` and `noUnusedParameters` are enforced.
- **React 19** with `react-jsx` transform (no `import React` needed). The React Compiler is intentionally not enabled.

## Structure

- `src/main.tsx` — entry point; mounts `<App />` into `#root` under `<StrictMode>`.
- `src/App.tsx` — root component (currently the starter template).
- `public/` — static assets served at the root path (e.g. `/icons.svg`, referenced via `<use href="/icons.svg#...">` in App.tsx).
- `src/assets/` — assets imported through the bundler (fingerprinted).

## Git and GitHub

This repo has **two remotes, and every push goes to both**:

| Remote | Repo | Account |
|---|---|---|
| `origin` | `MarkBotros0/new-hope` | `MarkBotros0` |
| `jpc` | `jesusprojectcommunity/new-hope` | `jesusprojectcommunity` |

Several GitHub accounts are authenticated via `gh` on this machine, and each
remote only accepts its own account — a push under any other fails with a 403
(`Permission ... denied`) or "Repository not found".

```bash
gh auth switch --hostname github.com --user MarkBotros0 && git push origin main
GH_TOKEN=$(gh auth token --hostname github.com --user jesusprojectcommunity) git push jpc main
```

Push `jpc` with the token rather than `gh auth switch`: the switch is global and
would change the account for other repos on this machine. `MarkBotros0` owns both
this repo's `origin` and `message-of-hope`, so leaving it active is the right
default.

## Deploys (Vercel)

Production is `https://new-hope-sigma.vercel.app`, deployed by Vercel from `jpc`'s
`main` (project `jesusprojectcommunity/new-hope`, Hobby plan). The Vercel CLI on
this machine is logged in as `jesusprojectcommunity`.

**Hobby only deploys a push whose newest commit is authored by the project
owner.** Commits authored as Mark Botros push fine, but the deploy shows
`● Blocked` ("the commit author doesn't have permission to create deployments")
and production silently stays on the last good build. The repo has no local
author override, so this is the default outcome.

After every push, check the deploy:

```bash
vercel ls new-hope        # newest row should be ● Ready, not ● Blocked
```

If it is blocked, ask before re-authoring anything. The fix used so far is one
empty commit authored as the owner, pushed to both remotes. It rewrites no
history, and Vercel builds the whole current tree:

```bash
git commit --allow-empty -m "Trigger Vercel deploy under the project owner's account" \
  --author="jesusprojectcommunity <353095907+jesusprojectcommunity@users.noreply.github.com>"
```

A push that changes nothing the site serves (such as an edit to this file)
doesn't need a deploy, so a blocked build for it is harmless.
