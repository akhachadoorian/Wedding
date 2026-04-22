// core/config.ts

import path from "path";

const VAULT_BASE = path.resolve("C:/Users/beach/Documents/Obsidian Vaults/Wedding");

export const VAULT_CONTENT_DIR = path.join(VAULT_BASE, "Content");
export const VAULT_TIMELINE_DIR = path.join(VAULT_BASE, "Timeline");

export const OUTPUT_DIR = path.join(__dirname, "../../src/generated");

const MAPPINGS_BASE = path.join(__dirname, "../mappings");
export const MAPPINGS_CONTENT_DIR = path.join(MAPPINGS_BASE, "/content");
export const MAPPINGS_TIMELINE_DIR = path.join(MAPPINGS_BASE, "/timeline");