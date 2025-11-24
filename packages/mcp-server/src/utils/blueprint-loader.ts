import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up 3 levels from src/utils: src/utils -> src -> mcp-server -> packages -> root
// Or from dist/utils: dist/utils -> dist -> mcp-server -> packages -> root
// We'll look for "context-engine" to confirm we're at the root
const PROJECT_ROOT = path.resolve(__dirname, "../../../..");

const CONTEXT_ENGINE_DIR = path.join(PROJECT_ROOT, "context-engine");

export async function loadBlueprint(filename: string): Promise<string> {
  const filePath = path.join(CONTEXT_ENGINE_DIR, filename);
  
  if (!await fs.pathExists(filePath)) {
    throw new Error(`Blueprint not found: ${filename} at ${filePath}`);
  }

  return fs.readFile(filePath, "utf-8");
}

export async function listBlueprints(): Promise<string[]> {
  if (!await fs.pathExists(CONTEXT_ENGINE_DIR)) {
    return [];
  }
  
  const files = await fs.readdir(CONTEXT_ENGINE_DIR);
  return files.filter((f: string) => f.endsWith(".md"));
}
