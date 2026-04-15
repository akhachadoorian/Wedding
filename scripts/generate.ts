// scripts/generate.ts
// Reads vault notes, applies mapping configs, and writes typed .ts content files
//
// Usage:
//   npx tsx scripts/generate.ts          — run once
//   npx tsx scripts/generate.ts --watch  — watch vault for changes

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { parseVaultNote } from "./parser";
import type { MappingConfig, PropMapping, SectionData } from "./types";

const VAULT_DIR = path.resolve("C:/Users/beach/Documents/Obsidian Vaults/Wedding/Content");
const MAPPINGS_DIR = path.join(__dirname, "./mappings");
const OUTPUT_DIR = path.join(__dirname, "../src/generated");

// ─── Utility: set a deeply nested value via dot-path ────────────────────────
// setNested({}, "heading.line1", "Alex") → { heading: { line1: "Alex" } }
function setNested(obj: Record<string, unknown>, dotPath: string, value: unknown): void {
  const keys = dotPath.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

// ─── Apply one mapping config to parsed vault sections ──────────────────────
function applyMapping(
  mapping: MappingConfig,
  sections: Record<string, SectionData>
): Record<string, unknown> | null {
  const section = sections[mapping.section];

  if (!section) {
    console.warn(`⚠️  Section "${mapping.section}" not found in "${mapping.source}.md"`);
    return null;
  }

  const result: Record<string, unknown> = {};

  for (const [propPath, config] of Object.entries(mapping.props) as [string, PropMapping][]) {
    let value: unknown;

    if ("value" in config && config.value !== undefined) {
      // Hardcoded value — doesn't come from vault
      value = config.value;

    } else if ("field" in config && config.field) {
      // Read from vault table row
      const row = section.rows[config.field];

      if (!row) continue; // Field not found — likely TBD, skip silently

      const column = config.column ?? "content";
      const rawValue = row[column];

      if (!rawValue) continue; // Empty / TBD — skip

      value = config.transform ? config.transform(rawValue) : rawValue;

    } else {
      continue;
    }

    setNested(result, propPath, value);
  }

  return result;
}

// ─── Format a value as a TypeScript literal ─────────────────────────────────
function formatValue(val: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const innerPad = "  ".repeat(indent + 1);

  if (val === null || val === undefined) return "undefined";
  if (typeof val === "boolean") return String(val);
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>)
      .map(([k, v]) => `${innerPad}${k}: ${formatValue(v, indent + 1)}`)
      .join(",\n");
    return `{\n${entries},\n${pad}}`;
  }
  return String(val);
}

// ─── Write a generated .ts content file ─────────────────────────────────────
function writeOutput(mapping: MappingConfig, props: Record<string, unknown>): void {
  const varName =
    mapping.component[0].toLowerCase() + mapping.component.slice(1) + "Content";
  const typeName = mapping.component + "Props";

  const output = `// ⚠️  Auto-generated — do not edit directly.
// Edit vault/Content/${mapping.source}.md instead, then re-run: npx tsx scripts/generate.ts

import type { ${typeName} } from "../src/components/${mapping.component}";

export const ${varName}: Partial<${typeName}> = ${formatValue(props)};
`;

  const outPath = path.join(OUTPUT_DIR, `${mapping.source.toLowerCase()}.content.ts`);
  fs.writeFileSync(outPath, output, "utf-8");
  console.log(`✅  Generated ${path.relative(process.cwd(), outPath)}`);
}

// ─── Load all mapping configs from /mappings ────────────────────────────────
async function loadMappings(): Promise<MappingConfig[]> {
  const files = fs
    .readdirSync(MAPPINGS_DIR)
    .filter((f) => f.endsWith(".mapping.ts"));

  const mappings: MappingConfig[] = [];
  for (const file of files) {
    // Use pathToFileURL to handle Windows absolute paths (D:\ → file://)
    const filePath = pathToFileURL(path.join(MAPPINGS_DIR, file)).href;
    const mod = await import(filePath);
    mappings.push(mod.default);
  }
  return mappings;
}

// ─── Run generation for all mappings ────────────────────────────────────────
async function generate(): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const mappings = await loadMappings();

  for (const mapping of mappings) {
    const vaultFile = path.join(VAULT_DIR, `${mapping.source}.md`);

    if (!fs.existsSync(vaultFile)) {
      console.warn(`⚠️  Vault file not found: ${vaultFile}`);
      continue;
    }

    const { sections } = parseVaultNote(vaultFile);
    const props = applyMapping(mapping, sections);
    if (props) writeOutput(mapping, props);
  }
}

// ─── Entry point ─────────────────────────────────────────────────────────────
const isWatch = process.argv.includes("--watch");

generate().then(() => {
  if (isWatch) {
    console.log(`\n👀  Watching ${VAULT_DIR} for changes...\n`);
    fs.watch(VAULT_DIR, { recursive: true }, (_, filename) => {
      if (filename?.endsWith(".md")) {
        console.log(`\n📝  ${filename} changed — regenerating...`);
        generate();
      }
    });
  }
});