
import fs from "fs";
import path from "path";
import type { GenerateProps, MappingConfig, PropMapping, SectionData, TimelineMappingConfig } from "./core/types";
import { formatValue, generate, setNested } from "./core/generator";
import { MAPPINGS_TIMELINE_DIR, OUTPUT_DIR, VAULT_TIMELINE_DIR } from "./core/config";

// ─── Timeline: apply mapping config ─────────────────────────────────────────
function applyTimelineMapping(
  mapping: TimelineMappingConfig,
  sections: Record<string, SectionData>
): Record<string, unknown> | null {

  // Metadata — read as key/value rows
  const metaSection = sections[mapping.metadata.section];
  const metadata: Record<string, string> = {};
  if (metaSection) {
    for (const [key, row] of Object.entries(metaSection.rows)) {
      metadata[key.toLowerCase()] = row.content;
    }
  }

  // Array sections — categories, lanes, events
  const result: Record<string, unknown> = { metadata };

  for (const [key, sectionMap] of Object.entries(mapping.sections)) {
    const section = sections[sectionMap.section];
    if (!section) {
      console.warn(`⚠️  Section "${sectionMap.section}" not found`);
      result[key] = [];
      continue;
    }

    result[key] = section.records.map((record) => {
      const out: Record<string, unknown> = {};
      for (const [outKey, colMap] of Object.entries(sectionMap.columns)) {
        const raw = record[colMap.column] ?? "";
        out[outKey] = colMap.transform ? colMap.transform(raw) : raw;
      }
      return out;
    });
  }

  return result;
}

// ─── Timeline: write output ──────────────────────────────────────────────────
function writeTimelineOutput(mapping: TimelineMappingConfig, props: Record<string, unknown>): void {
  const varName = mapping.component[0].toLowerCase() + mapping.component.slice(1) + "Data";
  const typeName = mapping.component + "Props";
  const slug = mapping.source.toLowerCase().replace(/\s+/g, "-");

  const output = `// ⚠️  Auto-generated — do not edit directly.
// Edit vault/Content/${mapping.source}.md instead, then re-run: npx tsx scripts/generate.ts

import type { ${typeName} } from "${mapping.componentPath}";

export const ${varName}: Partial<${typeName}> = ${formatValue(props)};
`;

  const outPath = path.join(OUTPUT_DIR, `${slug}.data.ts`);
  fs.writeFileSync(outPath, output, "utf-8");
  console.log(`✅  Generated ${path.relative(process.cwd(), outPath)}`);
}

// ─── Generate Timeline ─────────────────────────────────────────────────────────────

export function generateTimeline(isWatch:boolean = false  ) {
    const gProps = {
        content: true,
        mappingDir: MAPPINGS_TIMELINE_DIR,
        applyMapping: applyTimelineMapping,
        buildOutput: writeTimelineOutput
    } as GenerateProps;

    generate(gProps).then(() => {
        if (isWatch) {
            if (!fs.existsSync(VAULT_TIMELINE_DIR)) {
                console.error(`❌  Cannot watch — vault directory not found: ${VAULT_TIMELINE_DIR}`);
                
                process.exit(1);
            }
            console.log(`\n👀  Watching ${VAULT_TIMELINE_DIR} for changes...\n`);

            fs.watch(VAULT_TIMELINE_DIR, { recursive: true }, (_, filename) => {
                if (filename?.endsWith(".md")) {
                    console.log(`\n📝  ${filename} changed — regenerating...`);

                    generate(gProps);
                }
            });
        }
    });
}

// ─── Execution ─────────────────────────────────────────────────────────────
const isWatch = process.argv.includes("--watch");

generateTimeline(isWatch);