import path from "path";
import { OUTPUT_DIR, VAULT_CONTENT_DIR, VAULT_TIMELINE_DIR } from "./config";
import type {  TimelineMappingConfig, GenerateProps, MappingConfig, OutputEntry } from "./types";
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
    return items ? `[\n${items},\n${pad}]` : "[]";
  }
  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>)
      .map(([k, v]) => `${innerPad}${k}: ${formatValue(v, indent + 1)}`)
      .join(",\n");
    return entries ? `{\n${entries},\n${pad}}` : "{}";
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
    if (!mod.default) {
      console.warn(`⚠️  ${file} has no default export — skipping`);
      continue;
    }
    if (Array.isArray(mod.default)) {
      mappings.push(...mod.default);
    } else {
      mappings.push(mod.default);
    }
  }
  return mappings;
}

// ─── Run generation ──────────────────────────────────────────────────────────
export async function generate({content = true, mappingDir, applyMapping, buildOutput}: GenerateProps): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const mappings = await loadMappings(mappingDir);

  // Group mappings by source so each vault file is parsed once and all its
  // exports land in a single output file.
  const bySource = new Map<string, (MappingConfig | TimelineMappingConfig)[]>();
  for (const mapping of mappings) {
    const group = bySource.get(mapping.source) ?? [];
    group.push(mapping);
    bySource.set(mapping.source, group);
  }

  for (const [source, group] of Array.from(bySource.entries())) {
    const vaultDir = content ? VAULT_CONTENT_DIR : VAULT_TIMELINE_DIR;
    const vaultFile = path.join(vaultDir, `${source}.md`);

    if (!fs.existsSync(vaultFile)) {
      console.warn(`⚠️  Vault file not found: ${vaultFile}`);
      continue;
    }

    const { sections } = parseVaultNote(vaultFile);
    console.log("sections: ", sections);

    const entries: OutputEntry[] = [];
    for (const mapping of group) {
      const props = applyMapping(mapping, sections);
      if (props) entries.push({ mapping, props });
    }

    // if (entries.length > 0) buildOutput(source, entries);
  }
}
