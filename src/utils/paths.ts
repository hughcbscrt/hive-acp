/**
 * Central paths for ~/.hive-acp/ and bootstrap helper.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export const HIVE_HOME = path.join(os.homedir(), ".hive-acp");
export const HIVE_STATE_DIR = path.join(HIVE_HOME, "state");
export const HIVE_TRIPLES_PATH = path.join(HIVE_STATE_DIR, "triples.json");
export const HIVE_SUMMARIES_DIR = path.join(HIVE_STATE_DIR, "summaries");
export const HIVE_SKILLS_DIR = path.join(HIVE_HOME, "skills");

/** WebSocket MCP server port, shared by the server (src/index.ts) and every ACP client bridge. */
export const MCP_PORT = parseInt(process.env.HIVE_MCP_PORT || "4040", 10);

/** Path to the built MCP bridge script, spawned as a subprocess by ACP-compatible agent CLIs. */
export const BRIDGE_PATH = path.join(import.meta.dirname, "..", "..", "dist", "mcp", "bridge.js");

const BUILTIN_SKILLS_DIR = path.join(import.meta.dirname, "..", "skills");

/** Create ~/.hive-acp/ structure and install built-in skills. */
export function bootstrap(): void {
  for (const dir of [HIVE_STATE_DIR, HIVE_SUMMARIES_DIR, HIVE_SKILLS_DIR]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Copy built-in skills that don't already exist in the target
  if (!fs.existsSync(BUILTIN_SKILLS_DIR)) return;
  for (const entry of fs.readdirSync(BUILTIN_SKILLS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dest = path.join(HIVE_SKILLS_DIR, entry.name);
    if (fs.existsSync(dest)) continue;
    fs.cpSync(path.join(BUILTIN_SKILLS_DIR, entry.name), dest, { recursive: true });
  }
}
