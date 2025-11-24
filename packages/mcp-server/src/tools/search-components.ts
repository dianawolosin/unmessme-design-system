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

export const searchComponentsTool: ToolDefinition = {
  name: "search_components",
  description: "Search for components by purpose, feature, or keyword (e.g., 'form', 'navigation', 'button')",
  inputSchema: z.object({
    query: z.string().describe("Search query (e.g., 'form validation', 'navigation')"),
  }),
  handler: async (args: { query: string }) => {
    const { query } = args;
    
    try {
      const specsDir = path.resolve(__dirname, "../../../design-system/component-specs");
      
      if (!await pathExists(specsDir)) {
        return { error: "Component specs directory not found", results: [] };
      }
      
      const files = await fs.readdir(specsDir);
      const mdFiles = files.filter((f: string) => f.endsWith(".md"));
      
      const results = [];
      const queryLower = query.toLowerCase();
      
      for (const file of mdFiles) {
        const componentName = file.replace(".md", "");
        const content = await fs.readFile(path.join(specsDir, file), "utf-8");
        const contentLower = content.toLowerCase();
        
        // Simple keyword matching
        if (contentLower.includes(queryLower) || componentName.toLowerCase().includes(queryLower)) {
          // Extract a relevant snippet
          const lines = content.split("\n");
          const matchLine = lines.find((l: string) => l.toLowerCase().includes(queryLower));
          
          results.push({
            component: componentName,
            relevance: contentLower.split(queryLower).length - 1, // Count occurrences
            snippet: matchLine?.trim() || lines.find((l: string) => l.trim() && !l.startsWith("#"))?.trim()
          });
        }
      }
      
      // Sort by relevance
      results.sort((a, b) => b.relevance - a.relevance);
      
      return {
        query: query,
        found: results.length,
        results: results.slice(0, 10) // Top 10 results
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

