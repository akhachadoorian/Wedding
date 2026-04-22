

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import type { GenerateProps, MappingConfig, PropMapping, SectionData } from "./core/types";
import { formatValue, generate, setNested } from "./core/generator";
import { MAPPINGS_CONTENT_DIR, OUTPUT_DIR, VAULT_CONTENT_DIR } from "./core/config";

// ─── Page content: apply mapping config ─────────────────────────────────────
function applyPageMapping(
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
      value = config.value;
    } else if ("field" in config && config.field) {
      const row = section.rows[config.field];
      if (!row) continue;
      const column = config.column ?? "content";
      const rawValue = row[column];
      if (!rawValue) continue;
      value = config.transform ? config.transform(rawValue) : rawValue;
    } else {
      continue;
    }

    setNested(result, propPath, value);
  }

  return result;
}

// ─── Page content: write output ──────────────────────────────────────────────
function writePageOutput(mapping: MappingConfig, props: Record<string, unknown>): void {
  const varName = mapping.component[0].toLowerCase() + mapping.component.slice(1) + "Content";
  const typeName = mapping.component + "Props";
  const slug = mapping.source.toLowerCase().replace(/\s+/g, "-");

  const output = `// ⚠️  Auto-generated — do not edit directly.
// Edit vault/Content/${mapping.source}.md instead, then re-run: npx tsx scripts/generate.ts

import type { ${typeName} } from "${mapping.componentPath}";

export const ${varName}: Partial<${typeName}> = ${formatValue(props)};
`;

  const outPath = path.join(OUTPUT_DIR, `${slug}.content.ts`);
  fs.writeFileSync(outPath, output, "utf-8");
  console.log(`✅  Generated ${path.relative(process.cwd(), outPath)}`);
}

// ─── Generate Content ─────────────────────────────────────────────────────────────

export function generateContent(isWatch:boolean = false  ) {
    const gProps = {
        content: true,
        mappingDir: MAPPINGS_CONTENT_DIR,
        applyMapping: applyPageMapping,
        buildOutput: writePageOutput
    } as GenerateProps;

    generate(gProps).then(() => {
        if (isWatch) {
            if (!fs.existsSync(VAULT_CONTENT_DIR)) {
                console.error(`❌  Cannot watch — vault directory not found: ${VAULT_CONTENT_DIR}`);

                process.exit(1);
            }

            console.log(`\n👀  Watching ${VAULT_CONTENT_DIR} for changes...\n`);
            
            fs.watch(VAULT_CONTENT_DIR, { recursive: true }, (_, filename) => {
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

generateContent(isWatch);