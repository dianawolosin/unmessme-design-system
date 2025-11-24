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

export const getComponentTool: ToolDefinition = {
  name: "get_component",
  description: "Get complete documentation for a component including props, usage examples, and design tokens",
  inputSchema: z.object({
    component_name: z.string().describe("The name of the component (e.g., 'Button', 'Card')"),
  }),
  handler: async (args: { component_name: string }) => {
    const { component_name } = args;
    
    try {
      // Try to find the component spec
      const specsDir = path.resolve(__dirname, "../../../design-system/component-specs");
      const componentFile = path.join(specsDir, `${component_name}.md`);
      
      if (!await pathExists(componentFile)) {
        return {
          error: `Component '${component_name}' not found`,
          suggestion: "Try using list_components to see all available components"
        };
      }
      
      const content = await fs.readFile(componentFile, "utf-8");
      
      return {
        component: component_name,
        documentation: content,
        message: `Retrieved documentation for ${component_name}`
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};
