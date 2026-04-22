// scripts/parser.ts
// Reads a vault .md file and returns structured section data
//
// Output shape:
// {
//   frontmatter: { page, slug, status },
//   sections: {
//     "Hero": {
//       rows: { "Eyebrow": { content: "...", link: "..." }, ... },
//       subsections: {
//         "Card 1 — The Day": {
//           rows: { "Eyebrow": { content: "...", link: "..." }, ... }
//         }
//       }
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

// Parse markdown table lines into an array of { field, content, link } rows
function parseTable(lines: string[]): Array<{ field: string; content: string; link: string }> {
  const rows: Array<{ field: string; content: string; link: string }> = [];

  for (const line of lines) {
    if (!line.startsWith("|")) continue;

    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);

    // Skip header and separator rows
    if (cells[0].toLowerCase() === "field") continue;
    if (cells[0].startsWith("---") || cells[0].startsWith(":---")) continue;

    const [field = "", content = "", link = ""] = cells;
    rows.push({
      field: cleanCell(field),
      content: cleanCell(content),
      link: cleanCell(link),
    });
  }

  return rows;
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

    const rows = parseTable(tableBuffer);

    if (currentSubsection) {
      if (!sections[currentSection].subsections[currentSubsection]) {
        sections[currentSection].subsections[currentSubsection] = { rows: {} };
      }
      Object.assign(
        sections[currentSection].subsections[currentSubsection].rows,
        rowsToMap(rows)
      );
    } else {
      Object.assign(sections[currentSection].rows, rowsToMap(rows));
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
      sections[currentSection] = { rows: {}, subsections: {} };
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