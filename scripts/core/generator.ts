import path from "path";
import { OUTPUT_DIR, VAULT_CONTENT_DIR, VAULT_TIMELINE_DIR } from "./config";
import type {  TimelineMappingConfig, GenerateProps, MappingConfig } from "./types";
import fs from "fs";
import { parseVaultNote } from "./parser";
import { pathToFileURL } from "url";

// ─── Utility: set a deeply nested value via dot-path ────────────────────────
export function setNested(obj: Record<string, unknown>, dotPath: string, value: unknown): void {
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

// ─── Format a value as a TypeScript literal ─────────────────────────────────
export function formatValue(val: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const innerPad = "  ".repeat(indent + 1);

  if (val === null || val === undefined) return "undefined";
  if (typeof val === "boolean") return String(val);
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return JSON.stringify(val);
  if (Array.isArray(val)) {
    const items = val
      .map((v) => `${innerPad}${formatValue(v, indent + 1)}`)
      .join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>)
      .map(([k, v]) => `${innerPad}${k}: ${formatValue(v, indent + 1)}`)
      .join(",\n");
    return `{\n${entries},\n${pad}}`;
  }
  return String(val);
}


// ─── Load all mapping configs ────────────────────────────────────────────────
async function loadMappings(mappingDir: string): Promise<(MappingConfig | TimelineMappingConfig)[]> {
  const files = fs
    .readdirSync(mappingDir)
    .filter((f) => f.endsWith(".mapping.ts"));
 
  const mappings: (MappingConfig | TimelineMappingConfig)[] = [];
  for (const file of files) {
    const filePath = pathToFileURL(path.join(mappingDir, file)).href;
    const mod = await import(filePath);
    mappings.push(mod.default);
  }
  return mappings;
}

// ─── Run generation ──────────────────────────────────────────────────────────
export async function generate({content = true, mappingDir, applyMapping, buildOutput}: GenerateProps): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const mappings = await loadMappings(mappingDir);
  

  for (const mapping of mappings) {
    const vaultDir = content ? VAULT_CONTENT_DIR : VAULT_TIMELINE_DIR;
    const vaultFile = path.join(vaultDir, `${mapping.source}.md`);

    if (!fs.existsSync(vaultFile)) {
      console.warn(`⚠️  Vault file not found: ${vaultFile}`);
      continue;
    }

    const { sections } = parseVaultNote(vaultFile);
    const props = applyMapping(mapping, sections);
    if (props) buildOutput(mapping, props);

    // if (content) {
    //   const props = applyPageMapping(mapping as MappingConfig, sections);
    //   if (props) writePageOutput(mapping as MappingConfig, props);
    // } else {
    //   const props = applyTimelineMapping(mapping, sections);
    //   if (props) writeTimelineOutput(mapping, props);
    // }
  }
}
