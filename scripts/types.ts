// scripts/types.ts
// Shared types for the vault parser and content generator

// ─── Parser output types ─────────────────────────────────────────────────────

export type TableRow = {
  content: string;
  link: string;
};

export type SectionData = {
  rows: Record<string, TableRow>;
  subsections: Record<string, { rows: Record<string, TableRow> }>;
};

export type ParsedNote = {
  frontmatter: Record<string, string>;
  sections: Record<string, SectionData>;
};

// ─── Mapping config types ────────────────────────────────────────────────────

export type PropMapping =
  | {
      // Read value from vault table
      field: string;
      column?: "content" | "link";
      transform?: (val: string) => string | boolean;
      value?: never;
    }
  | {
      // Hardcode a value — doesn't come from vault
      value: string | boolean | number;
      field?: never;
      column?: never;
      transform?: never;
    };

export type MappingConfig = {
  /** Vault file name without extension e.g. "Home" */
  source: string;
  /** ## Section heading to read from e.g. "Hero" */
  section: string;
  /** React component name e.g. "HomeHero" */
  component: string;
  /** Map of dot-path prop → where to find its value */
  props: Record<string, PropMapping>;
};