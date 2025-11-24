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

export const listComponentsTool: ToolDefinition = {
  name: "list_components",
  description: "List all available components in the design system with brief descriptions",
  inputSchema: z.object({}),
  handler: async () => {
    try {
      const specsDir = path.resolve(__dirname, "../../../design-system/component-specs");
      
      if (!await pathExists(specsDir)) {
        return {
          error: "Component specs directory not found",
          components: []
        };
      }
      
      const files = await fs.readdir(specsDir);
      const mdFiles = files.filter((f: string) => f.endsWith(".md"));
      
      const components = await Promise.all(
        mdFiles.map(async (file: string) => {
          const componentName = file.replace(".md", "");
          const content = await fs.readFile(path.join(specsDir, file), "utf-8");
          
          // Extract first heading and first paragraph as description
          const lines = content.split("\n");
          const descLine = lines.find((l: string) => l.trim() && !l.startsWith("#") && !l.startsWith("---"));
          
          return {
            name: componentName,
            description: descLine?.trim() || "No description available"
          };
        })
      );
      
      return {
        total: components.length,
        components: components
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

