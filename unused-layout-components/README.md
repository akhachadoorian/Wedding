# Unused layout components

Components moved out of `src/layout` because nothing in `src` imports them
anymore. They're kept here for reference instead of being deleted outright.

This folder lives outside `src` and is excluded from TypeScript (`tsconfig.json`
`exclude`) and ESLint (`eslint.config.mjs` `globalIgnores`), so it can't break
`next build`, `tsc`, or `npm run lint`. Because of that, imports inside these
files (relative paths into `src/...`, etc.) are not guaranteed to still
resolve — treat this as a snapshot, not code ready to run.

Contents:

- `BackgroundSection/`, `DraggableHero/`, `LoadingScreen/` — previously in
  `src/layout`, no longer referenced anywhere.
- `archive/` — components that were already archived inside
  `src/layout/archive` before this reorganization (`Footer copy`, `FooterV1`,
  `NavigationV1`, `ParallaxingDrinkSection`, `ScrollRevealHero`,
  `SmallTextTagHero`, `SplitHero`).

If you want to bring one of these back into active use, move its folder back
into `src/layout`, fix up its imports, and wire it into a page.
