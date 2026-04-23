// scripts/types.ts
// Shared types for the vault parser and content generator

// ─── Parser output types ─────────────────────────────────────────────────────

export type TableRow = {
  content: string;
  link: string;
};

// A raw table row parsed as named columns (used for array-style tables)
export type TableRecord = Record<string, string>;

export type SectionData = {
  rows: Record<string, TableRow>;       // keyed by Field column (page content)
  records: TableRecord[];               // raw array of rows (timeline/list data)
  headers: string[];                    // column headers in order
  subsections: Record<string, { rows: Record<string, TableRow>; records: TableRecord[]; headers: string[] }>;
};

export type ParsedNote = {
  frontmatter: Record<string, string>;
  sections: Record<string, SectionData>;
};

// ─── Page content mapping types ─────────────────────────────────────────────

export type PropMapping =
  | {
      field: string;
      column?: "content" | "link";
      transform?: (val: string) => string | boolean;
      value?: never;
    }
  | {
      value: string | boolean | number;
      field?: never;
      column?: never;
      transform?: never;
    };

export type ComponentMappingProps = {
  /** React component name e.g. "HomeHero" */
  component: string;
  /** Path to component file for type import */
  componentPath: string;
  /** syntax for the props import if needed*/
  propsImport?: string,
  /** Map of dot-path prop → where to find its value */
  props: Record<string, PropMapping>;
} 

export type MappingConfig = {
  /** Vault file name without extension e.g. "Home" */
  source: string;
  /** ## Section heading to read from e.g. "Hero" */
  section: string;
  /**  */
  componentMap: ComponentMappingProps; 

  /** React component name e.g. "HomeHero" */
  // component: string;
  /** Path to component file for type import */
  // componentPath: string;
  /** syntax for the props import if needed*/
  // propsImport?: string,
  /** Map of dot-path prop → where to find its value */
  // props: Record<string, PropMapping>;
};

// ─── Timeline mapping types ──────────────────────────────────────────────────

export type TimelineColumnMap = {
  /** Column name in the vault table */
  column: string;
  /** Optional transform on the raw string value */
  transform?: (val: string) => unknown;
};

export type TimelineSectionMapping = {
  /** ## Section heading in the vault note */
  section: string;
  /** Map of output key → column name (or transform) */
  columns: Record<string, TimelineColumnMap>;
};

export type TimelineMappingConfig = {
  /** Vault file name without extension e.g. "Wedding Day Timeline" */
  source: string;
  /** React component name e.g. "WeddingTimeline" */
  component: string;
  /** Path to component file for type import */
  componentPath: string;
  /** How to read the metadata section (key/value) */
  metadata: { section: string };
  /** How to read each array section */
  sections: {
    categories: TimelineSectionMapping;
    lanes: TimelineSectionMapping;
    events: TimelineSectionMapping;
  };
};

// ─── Generate Type ──────────────────────────────────────────────────
export type OutputEntry = {
  mapping: unknown;
  props: Record<string, unknown>;
};

export type GenerateProps = {
  content: boolean;
  mappingDir: string;
  applyMapping: (mapping: unknown, sections: Record<string, SectionData>) => Record<string, unknown> | null;
  buildOutput: (source: string, entries: OutputEntry[]) => void;
}
