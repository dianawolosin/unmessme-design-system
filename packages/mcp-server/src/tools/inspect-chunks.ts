import { z } from "zod";
import { ToolDefinition } from "./index.js";
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Simple markdown chunker simulation
function chunkText(text: string, format: string): string[] {
  if (format === "mono_json") {
    // For JSON, we might just return the whole thing or split by top-level keys
    // For simulation, let's just treat it as one big chunk or simple line splits for now
    // In a real scenario, JSON chunking is complex.
    return [text]; 
  }

  // For Markdown (raw_md, toon_md, baseline), split by headers
  const lines = text.split("\n");
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (const line of lines) {
    if (line.startsWith("#")) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join("\n"));
        currentChunk = [];
      }
    }
    currentChunk.push(line);
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join("\n"));
  }

  return chunks.filter(c => c.trim().length > 0);
}

export const inspectChunksTool: ToolDefinition = {
  name: "inspect_chunks",
  description: "View how a component is chunked for a specific format (simulating Vector DB ingestion)",
  inputSchema: z.object({
    component_name: z.string().describe("The name of the component (e.g., 'Button')"),
    format: z.enum(["baseline", "toon_md", "raw_md", "mono_json"])
      .describe("The format to inspect"),
  }),
  handler: async (args: { component_name: string; format: string }) => {
    const { component_name, format } = args;
    
    try {
      let basePath = "";
      
      // __dirname is dist/tools/
      // We need to reach packages/mcp-server/test-data/
      // So we go up two levels: ../..
      const packageRoot = path.resolve(__dirname, "../..");
      
      switch (format) {
        case "baseline":
          // Go up to packages/design-system
          basePath = path.resolve(packageRoot, "../design-system/component-specs");
          break;
        case "toon_md":
          basePath = path.join(packageRoot, "test-data/test-2-toon-md/components");
          break;
        case "raw_md":
          basePath = path.join(packageRoot, "test-data/test-3-pure-md/components");
          break;
        case "mono_json":
          basePath = path.join(packageRoot, "test-data/test-4-mono-json/components");
          break;
      }

      const ext = format === "mono_json" ? ".json" : ".md";
      const filePath = path.join(basePath, `${component_name}${ext}`);

      if (!await pathExists(filePath)) {
        return {
          error: `Component '${component_name}' not found for format '${format}'`,
          path: filePath,
          suggestion: "Run the data transformation scripts first (e.g., 'npm run transform:test2')"
        };
      }

      const content = await fs.readFile(filePath, "utf-8");
      const chunks = chunkText(content, format);

      return {
        component: component_name,
        format: format,
        total_chunks: chunks.length,
        avg_chunk_size: Math.round(chunks.reduce((acc, c) => acc + c.length, 0) / chunks.length) + " chars",
        chunks: chunks.map((c, i) => ({
          id: i + 1,
          size: c.length,
          preview: c.slice(0, 100).replace(/\n/g, "\\n") + "...",
          content: c
        }))
      };

    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

