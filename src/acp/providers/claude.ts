/**
 * Claude Code CLI provider — spawn config for claude-code-acp.
 *
 * Requires the ACP bridge (e.g. `@zed-industries/claude-code-acp`) installed
 * and on PATH, plus ANTHROPIC_API_KEY set in the environment.
 */

import type { CliProvider } from "./types.js";

export function claudeProvider(): CliProvider {
  return {
    name: "claude",
    bin: process.env.HIVE_CLAUDE_CLI_PATH || "claude-code-acp",
    args: [],
    capabilities: { fs: { readTextFile: true, writeTextFile: true }, terminal: true },
  };
}
