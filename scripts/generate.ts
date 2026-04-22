// scripts/generate.ts
// Reads vault notes, applies mapping configs, and writes typed .ts content files
//
// Usage:
//   npx tsx scripts/generate.ts          — run once
//   npx tsx scripts/generate.ts --watch  — watch vault for changes

import { generateTimeline } from "./generate-timeline";
import { generateContent } from "./generate-content";

// ─── Entry point ─────────────────────────────────────────────────────────────
const isWatch = process.argv.includes("--watch");

generateTimeline(isWatch);
generateContent(isWatch);

