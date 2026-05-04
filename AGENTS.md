# AGENTS.md

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

## Stack
- Vue 3 + Vite 5 + Tailwind CSS 3
- No TypeScript, no test framework, no linter configured

## Architecture
- Currently single-page puzzle, planned to grow into multi-screen app
- Entry: `index.html` → `src/main.js`
- Components: `App.vue`, `PuzzleBoard.vue`, `PuzzleHeader.vue`, `PuzzleButtons.vue`
- Tailwind config: `tailwind.config.js`, `postcss.config.js`
- No router installed yet — plan routing before adding screens

## Conventions
- Mobile-first responsive design (target: Android)
- Touch events handled in `PuzzleBoard.vue` for tile swapping
- Background image split into 3x3 grid via CSS `background-position`
- Phrase words reveal progressively as tiles are placed correctly; unrevealed words show as underscores, no words shown initially
- Shuffle uses difficulty-based move counts (facil:15, medio:30, dificil:50)

## Gotchas
- `dist/` is gitignored but contains build output
- No `.env` or special env loading
- `opencode.json` not present — config via `AGENTS.md` only
