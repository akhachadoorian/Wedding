# Unused components

Components moved out of `src/components` because nothing in `src` actually
renders them anymore. They're kept here for reference instead of being
deleted outright.

This folder lives outside `src` and is excluded from TypeScript
(`tsconfig.json` `exclude`) and ESLint (`eslint.config.mjs`
`globalIgnores`), so it can't break `next build`, `tsc`, or `npm run lint`.
Because of that, imports inside these files (relative paths into `src/...`,
etc.) are not guaranteed to still resolve — treat this as a snapshot, not
code ready to run.

Contents:

- `ArtDecoCardGrid/`, `ArtDecoIcon/` — only consumer was a dead import in
  the accommodations page; never rendered.
- `Drinks/`, `DrinkCardGrid/` — only consumers were a dead import in
  `src/app/page.tsx` and the already-archived `DraggableHero`.
- `ImageGrid/` — no references anywhere.
- `MediaWithCopy/` — only usage left was inside a commented-out JSX block
  on the registry page.
- `SimpleTable/` — imported on the details page but never rendered; its
  config data (`timelineTable`) was also dead.
- `DashedCopy/` — its config data (`welcomeDashedGrid`) was defined but
  never wired into the home page content.
- `SmallTextGrid/` — imported on the details page but never rendered; its
  config data (`welcomeSmallText`, `rehearsalSmallTextGrid`) was also dead.
- `AccordionsOld/` — a single dead file that used to sit inside
  `src/components/Accordions` alongside the still-active `Accordions.tsx`
  (which exports `AccordionGrid`, actively used on the details page).
- `archive/` — components that were already archived inside
  `src/components/archive` before this reorganization (`Marquee`, `Note`,
  `WelcomeBlock`, `WelcomeBlockB`).
- `archive/VenueSectionVariants/` — four alternate designs for the
  "venue" section on the details page (`VenueMiniCards`, `VenueCopyMedia`,
  `VenueCardGrid`, `VenueSplitInfo`), pulled out of
  `src/app/details/page.tsx` where they sat as dead, never-called
  functions. The page ships with a fifth variant, `VenueWatermark`, which
  stayed live. Their content (`venue`, `venueFramed`, `venueMiniCards`,
  `summary`, plus the `date`/`venueContent` that fed `summary`) was
  inlined into the archived file rather than left in
  `src/app/details/content.ts`, since it only ever fed these variants.

If you want to bring one of these back into active use, move its folder
back into `src/components`, fix up its imports, and wire it into a page.
