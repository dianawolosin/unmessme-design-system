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

export const searchTokensTool: ToolDefinition = {
  name: "search_tokens",
  description: "Search for design tokens by name or value (e.g., 'primary', 'blue', '16px')",
  inputSchema: z.object({
    query: z.string().describe("Search query (token name or value)"),
  }),
  handler: async (args: { query: string }) => {
    const { query } = args;
    
    try {
      const tokensDir = path.resolve(__dirname, "../../../design-system/src/tokens");
      
      if (!await pathExists(tokensDir)) {
        return { error: "Tokens directory not found", results: [] };
      }
      
      const files = await fs.readdir(tokensDir);
      const jsonFiles = files.filter((f: string) => f.endsWith(".json"));
      
      const results: Array<{
        category: string;
        token: string;
        value: any;
        matchType: string;
      }> = [];
      const queryLower = query.toLowerCase();
      
      for (const file of jsonFiles) {
        const category = file.replace(".json", "");
        const content = await fs.readFile(path.join(tokensDir, file), "utf-8");
        const tokens = JSON.parse(content);
        
        // Search through token keys and values
        const searchTokens = (obj: any, prefix = ""): void => {
          for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
              searchTokens(value, fullKey);
            } else {
              const keyMatch = fullKey.toLowerCase().includes(queryLower);
              const valueMatch = String(value).toLowerCase().includes(queryLower);
              
              if (keyMatch || valueMatch) {
                results.push({
                  category: category,
                  token: fullKey,
                  value: value,
                  matchType: keyMatch ? "name" : "value"
                });
              }
            }
          }
        };
        
        searchTokens(tokens);
      }
      
      return {
        query: query,
        found: results.length,
        results: results.slice(0, 20) // Top 20 results
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

