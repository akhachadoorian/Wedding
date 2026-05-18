# Alex & Max — Wedding Website

A custom wedding website for Alex & Max, built with React + TypeScript. Live at [alexmaxwedding.com](https://alexmaxwedding.com).

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, wedding overview, and quick-links |
| `/details` | Ceremony details, venue info, and day-of timeline |
| `/accommodations` | Hotel blocks, parking, and travel directions |
| `/rsvp` | RSVP form |
| `/registry` | Gift registry |
| `/timeline` | Full day timeline |

## Tech Stack

- **React 19** + **TypeScript** via **Vite**
- **GSAP** + **Lenis** — scroll animations and smooth scrolling
- **Framer Motion** (`motion`) — component-level animations
- **React Router v7** — client-side routing
- **Sass** — styling
- **Storybook** — component development and documentation
- **Vitest** — unit tests

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server (exposed on local network) |
| `npm run build` | Type-check and build for production → `dist/` |
| `npm test` | Run unit tests with Vitest |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run storybook` | Start Storybook at port 6006 |
| `npm run generate` | Run content generation script |
| `npm run generate-content` | Generate page content |
| `npm run generate-timeline` | Generate timeline content |

## Deployment

The site deploys to GitHub Pages via the `gh-pages` package:

```bash
npm run deploy
```

This runs `npm run build` first, then publishes the `dist/` folder.
