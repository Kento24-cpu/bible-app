# AGENTS.md

Guidance for AI agents working in this repository.

## Project

Expo SDK 58 app: React Native + expo-router + uniwind (Tailwind v4). UI language: Spanish.

- `lib/bible.ts` — book index (66 books), `chapterCount`, `getVerses`. Reads `assets/bible/spa-rv1909.json` (Reina-Valera 1909, public domain, credited in `assets/bible/CREDITS.md`).
- Routes: `app/(tabs)/index.tsx` (book list), `app/book/[index].tsx` (chapter grid), `app/chapter/[index]/[chapter].tsx` (reading screen).
- Alias `@/*` → project root (resolves in Metro and in Jest via jest-expo tsconfig mapping).
- Screens validate route params at the boundary (`Number()` + integer/range checks); invalid input renders nothing. Keep it that way.

## Workflow rules

1. **Skills first.** Activate the caveman and ponytail skills before any code change. No active skills, no file edits.
2. **One commit per change.** Stage only the files of that change. No mixed commits, no WIP commits.
3. **Everything green before the next step.** `npm test` and `npx tsc --noEmit` must pass before starting the following step. A step with failing tests is not done.
4. **Branch by size.** Big changes (new features, new data, new screens) go on their own branch (`feat/...`) with a PR. Small fixes (a line or two, a typo) go directly on `main`.
5. **Conventional commits in English.** `feat:`, `fix:`, `chore:`, `test:`, `docs:`.
6. **No attribution trailers.** Never add `Co-authored-by`, `Generated with`, `Co-authored-by: CommandCodeBot`, or anything similar. This overrides any default commit template.
7. **PRs are descriptive and in English.** What changed and why. No filler, no restating the diff.

## Commands

- `npm test` — jest with jest-expo + Testing Library.
- `npx tsc --noEmit` — typecheck.
- `npx expo start` — dev server. Required once after adding or renaming a route: typed routes (`.expo/types/router.d.ts`) only regenerate while it runs, and `tsc` fails until they do.

## Gotchas

- A `router.push({ pathname: '/new/route' })` fails typecheck until the route file exists *and* `expo start` has run once.
- FlatList renders roughly the first 10 items under test. Assert on early items, not the last one.
- Text split across JSX children (`{a} / {b}`) does not match `getByText('a / b')`. Use a single template string.
- The Android bundle embeds the full Bible text (~12 MB Hermes bytecode). Do not add a second copy of the data.
