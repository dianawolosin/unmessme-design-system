import { z } from "zod";
import { ToolDefinition } from "./index.js";

export const generateComponentCodeTool: ToolDefinition = {
  name: "generate_component_code",
  description: "Generate ready-to-use component code with specified props and children",
  inputSchema: z.object({
    component: z.string().describe("Component name (e.g., 'Button', 'Card')"),
    props: z.record(z.any()).optional().describe("Component props as key-value pairs"),
    children: z.string().optional().describe("Component children/content"),
  }),
  handler: async (args: { component: string; props?: Record<string, any>; children?: string }) => {
    const { component, props = {}, children } = args;
    
    try {
      // Generate import statement
      const importStatement = `import { ${component} } from '@unmessme/design-system';`;
      
      // Generate props string
      const propsString = Object.entries(props)
        .map(([key, value]) => {
          if (typeof value === "string") {
            return `${key}="${value}"`;
          } else if (typeof value === "boolean") {
            return value ? key : "";
          } else if (typeof value === "object") {
            return `${key}={${JSON.stringify(value)}}`;
          } else {
            return `${key}={${value}}`;
          }
        })
        .filter(Boolean)
        .join(" ");
      
      // Generate component code
      const propsWithSpace = propsString ? ` ${propsString}` : "";
      const componentCode = children
        ? `<${component}${propsWithSpace}>\n  ${children}\n</${component}>`
        : `<${component}${propsWithSpace} />`;
      
      return {
        component: component,
        import: importStatement,
        code: componentCode,
        fullExample: `${importStatement}\n\n${componentCode}`
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

