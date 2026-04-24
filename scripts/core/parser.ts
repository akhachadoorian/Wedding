// scripts/parser.ts
// Reads a vault .md file and returns structured section data
//
// Output shape:
// {
//   frontmatter: { page, slug, status },
//   sections: {
//     "Hero": {
//       rows: { "Eyebrow": { content: "...", link: "..." }, ... },
//       records: [ { Field: "Eyebrow", Content: "...", Link: "..." }, ... ],
//       headers: ["Field", "Content", "Link"],
//       subsections: { ... }
//     }
//   }
// }

import fs from "fs";
import type { TableRow, SectionData, ParsedNote } from "./types";

// Strip backticks and treat "— TBD" / "TBD" as empty
function cleanCell(val: string): string {
  return val
    .replace(/`/g, "")
    .replace(/^—\s*TBD$/, "")
    .replace(/^TBD$/, "")
    .trim();
}

type ParsedTable = {
  rows: Array<{ field: string; content: string; link: string }>;
  records: Array<Record<string, string>>;
  headers: string[];
};

function parseTable(lines: string[]): ParsedTable {
  const rows: ParsedTable["rows"] = [];
  const records: ParsedTable["records"] = [];
  let headers: string[] = [];

  for (const line of lines) {
    if (!line.startsWith("|")) continue;

    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);

    // Header row
    if (cells[0].toLowerCase() === "field") {
      headers = cells;
      continue;
    }
    // Separator row
    if (cells[0].startsWith("---") || cells[0].startsWith(":---")) continue;

    const [field = "", content = "", link = ""] = cells;
    rows.push({ field: cleanCell(field), content: cleanCell(content), link: cleanCell(link) });

    // Raw record keyed by actual column headers
    const record: Record<string, string> = {};
    cells.forEach((cell, i) => {
      if (headers[i]) record[headers[i]] = cleanCell(cell);
    });
    records.push(record);
  }

  return { rows, records, headers };
}

// Convert row array into a keyed map for easy lookup
function rowsToMap(rows: Array<{ field: string; content: string; link: string }>): Record<string, TableRow> {
  const map: Record<string, TableRow> = {};
  for (const row of rows) {
    if (row.field) {
      map[row.field] = { content: row.content, link: row.link };
    }
  }
  return map;
}

function emptySection(): SectionData {
  return { rows: {}, records: [], headers: [], subsections: {} };
}

export function parseVaultNote(filePath: string): ParsedNote {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");

  // ── Parse frontmatter ──────────────────────────────────────────────────────
  const frontmatter: Record<string, string> = {};
  let i = 0;

  if (lines[0]?.trim() === "---") {
    i = 1;
    while (i < lines.length && lines[i].trim() !== "---") {
      const colonIndex = lines[i].indexOf(":");
      if (colonIndex !== -1) {
        const key = lines[i].slice(0, colonIndex).trim();
        const val = lines[i].slice(colonIndex + 1).trim();
        frontmatter[key] = val;
      }
      i++;
    }
    i++; // skip closing ---
  }

  // ── Parse sections and subsections ────────────────────────────────────────
  const sections: Record<string, SectionData> = {};
  let currentSection: string | null = null;
  let currentSubsection: string | null = null;
  let tableBuffer: string[] = [];

  function flushTable(): void {
    if (!tableBuffer.length || !currentSection) return;

    const { rows, records, headers } = parseTable(tableBuffer);

    if (currentSubsection) {
      if (!sections[currentSection].subsections[currentSubsection]) {
        sections[currentSection].subsections[currentSubsection] = { rows: {}, records: [], headers: [] };
      }
      const sub = sections[currentSection].subsections[currentSubsection];
      Object.assign(sub.rows, rowsToMap(rows));
      sub.records.push(...records);
      if (!sub.headers.length) sub.headers.push(...headers);
    } else {
      Object.assign(sections[currentSection].rows, rowsToMap(rows));
      sections[currentSection].records.push(...records);
      if (!sections[currentSection].headers.length) sections[currentSection].headers.push(...headers);
    }

    tableBuffer = [];
  }

  for (; i < lines.length; i++) {
    const line = lines[i];

    // ## Section heading
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      flushTable();
      const name = line.replace("## ", "").trim();
      currentSubsection = null;
      // Skip the Sections index
      if (name === "Sections") { currentSection = null; continue; }
      currentSection = name;
      sections[currentSection] = emptySection();
      continue;
    }

    // ### Subsection heading
    if (line.startsWith("### ")) {
      flushTable();
      currentSubsection = line.replace("### ", "").trim();
      continue;
    }

    // Table lines
    if (line.startsWith("|") && currentSection) {
      tableBuffer.push(line);
      continue;
    }

    // Flush on blank line or divider
    if (line.trim() === "" || line.trim() === "---") {
      flushTable();
    }
  }

  flushTable(); // catch any trailing table

  return { frontmatter, sections };
}
