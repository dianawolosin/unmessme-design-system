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

export const getTokensTool: ToolDefinition = {
  name: "get_tokens",
  description: "Get design tokens (colors, spacing, typography, radius, shadows)",
  inputSchema: z.object({
    category: z.enum(["colors", "spacing", "typography", "radius", "shadows", "all"])
      .describe("Token category to retrieve"),
  }),
  handler: async (args: { category: string }) => {
    const { category } = args;
    
    try {
      const tokensDir = path.resolve(__dirname, "../../../design-system/src/tokens");
      
      if (!await pathExists(tokensDir)) {
        return { error: "Tokens directory not found" };
      }
      
      if (category === "all") {
        // Return all token files
        const files = await fs.readdir(tokensDir);
        const jsonFiles = files.filter((f: string) => f.endsWith(".json"));
        
        const allTokens: Record<string, any> = {};
        for (const file of jsonFiles) {
          const tokenCategory = file.replace(".json", "");
          const content = await fs.readFile(path.join(tokensDir, file), "utf-8");
          allTokens[tokenCategory] = JSON.parse(content);
        }
        
        return {
          category: "all",
          tokens: allTokens
        };
      }
      
      // Return specific category
      const tokenFile = path.join(tokensDir, `${category}.json`);
      
      if (!await pathExists(tokenFile)) {
        return {
          error: `Token category '${category}' not found`,
          available: ["colors", "spacing", "typography", "radius", "shadows"]
        };
      }
      
      const content = await fs.readFile(tokenFile, "utf-8");
      const tokens = JSON.parse(content);
      
      return {
        category: category,
        tokens: tokens
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

