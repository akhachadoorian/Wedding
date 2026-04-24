import { MAPPINGS_CONTENT_DIR, OUTPUT_DIR, VAULT_CONTENT_DIR } from "./core/config";
import { formatValue, generate, setNested } from "./core/generator";
import type { GenerateProps, MappingConfig, OutputEntry, PropMapping, SectionData } from "./core/types";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

// ─── Page content: apply mapping config ─────────────────────────────────────
function applyPageMapping(mapping: unknown, sections: Record<string, SectionData>): Record<string, unknown> | null {
    const { section: sectionKey, source, componentMap } = mapping as MappingConfig;
    const section = sections[sectionKey];
    if (!section) {
        console.warn(`⚠️  Section "${sectionKey}" not found in "${source}.md"`);
        return null;
    }

    const result: Record<string, unknown> = {};

    // Walk every declared prop for this component
    for (const [propPath, config] of Object.entries(componentMap.props) as [string, PropMapping][]) {
        let value: unknown;

        // console.log("=== config ", config);

        // Strategy 1 — literal: hardcoded in the mapping config, not read from the vault (e.g. `value: true`)
        if ("value" in config && config.value !== undefined) {
            value = config.value;

        // Strategy 2 — shape: build an array of objects from vault rows, re-keyed via config.shape
        // (e.g. { btnText: "content", link: "link" } maps vault columns → prop keys).
        // config.fields picks specific named rows; omitting it uses all records in the section.
        // Rows where every mapped column is empty are dropped.
        } else if ("shape" in config && config.shape) {
            const sourceRows = config.fields
                ? config.fields.map((f) => section.rows[f]).filter(Boolean) as Array<Record<string, string>>
                : section.records as Array<Record<string, string>>;

            console.log("=== sourceRows ", sourceRows);

            value = sourceRows
                .map((row) => {
                    console.log("row ", row);
                    const item: Record<string, string> = {};
                    for (const [key, col] of Object.entries(config.shape)) {

                        const val = row[col];
                        if (val) item[key] = val;
                    }
                    return Object.keys(item).length > 0 ? item : null;
                })
                .filter(Boolean);

            console.log("value ", value);
            if ((value as unknown[]).length === 0) continue; // skip prop if vault has no data

        // Strategy 3 — field: read a single named row, pull one column (default "content"),
        // and optionally transform the raw string (e.g. "true" → boolean, markdown → HTML).
        } else if ("field" in config && config.field) {
            const row = section.rows[config.field];
            if (!row) continue; // row missing in vault — skip prop

            const column = config.column ?? "content";
            const rawValue = (row as Record<string, string>)[column];
            if (!rawValue) continue; // column empty — skip prop

            value = config.transform ? config.transform(rawValue) : rawValue;
        } else {
            continue; // config matches none of the three strategies — ignore
        }

        setNested(result, propPath, value);
    }

    return result;
}

// ─── Page content: write output ──────────────────────────────────────────────
function writePageOutput(source: string, entries: OutputEntry[]): void {
    const slug = source.toLowerCase().replace(/\s+/g, "-");

    const toVarName = (mapping: MappingConfig) => {
        const sectionCamel = mapping.section
            .split(/\s+/)
            .map((w, i) => (i === 0 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1)))
            .join("");
        return `${sectionCamel}${mapping.componentMap.component}Content`;
    };

    // Deduplicate imports (same component can appear in multiple sections)
    const seen = new Set<string>();
    const imports = (entries as { mapping: MappingConfig; props: Record<string, unknown> }[])
        .filter(({ mapping }) => {
            const key = `${mapping.componentMap.component}|${mapping.componentMap.componentPath}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .map(({ mapping }) => `import type { ${mapping.componentMap.component}Props } from "${mapping.componentMap.componentPath}";`);

    const exports = (entries as { mapping: MappingConfig; props: Record<string, unknown> }[]).map(({ mapping, props }) => {
        const varName = toVarName(mapping);
        const typeName = `${mapping.componentMap.component}Props`;
        const propsType = mapping.componentMap.propsImport ?? `Partial<${typeName}>`;
        return `export const ${varName}: ${propsType} = ${formatValue(props)};`;
    });

    const output = [`// ⚠️  Auto-generated — do not edit directly.`, `// Edit vault/Content/${source}.md instead, then re-run: npx tsx scripts/generate.ts`, ``, ...imports, ``, exports.join("\n\n"), ``].join("\n");

    const outPath = path.join(OUTPUT_DIR, `${slug}.content.ts`);
    fs.writeFileSync(outPath, output, "utf-8");
    console.log(`✅  Generated ${path.relative(process.cwd(), outPath)}`);
}

// ─── Generate Content ─────────────────────────────────────────────────────────────

export function generateContent(isWatch: boolean = false) {
    const gProps = {
        content: true,
        mappingDir: MAPPINGS_CONTENT_DIR,
        applyMapping: applyPageMapping,
        buildOutput: writePageOutput,
    } satisfies GenerateProps;

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
