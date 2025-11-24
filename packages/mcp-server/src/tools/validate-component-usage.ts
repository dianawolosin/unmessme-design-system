import { z } from "zod";
import { ToolDefinition } from "./index.js";

// Simple validation rules
const validationRules = [
  {
    pattern: /color\s*=\s*["'](?!primary|secondary|danger|ghost)/,
    message: "Use 'variant' prop instead of 'color'. Valid variants: primary, secondary, danger, ghost",
    component: "Button"
  },
  {
    pattern: /<Button[^>]*>\s*<\/Button>/,
    message: "Button should have children or an aria-label for accessibility",
    component: "Button"
  },
  {
    pattern: /<img(?![^>]*alt=)/i,
    message: "Images must have an 'alt' attribute for accessibility",
    component: "Image"
  },
  {
    pattern: /onClick.*href/,
    message: "Don't use onClick with href. Use Button for actions, Link for navigation",
    component: "Link"
  }
];

export const validateComponentUsageTool: ToolDefinition = {
  name: "validate_component_usage",
  description: "Validate component usage against design system guidelines and best practices",
  inputSchema: z.object({
    code: z.string().describe("Component code to validate"),
  }),
  handler: async (args: { code: string }) => {
    const { code } = args;
    
    try {
      const errors = [];
      const warnings = [];
      
      // Run validation rules
      for (const rule of validationRules) {
        if (rule.pattern.test(code)) {
          errors.push({
            component: rule.component,
            message: rule.message,
            severity: "error"
          });
        }
      }
      
      // Check for missing imports
      const componentsUsed = code.match(/<([A-Z][a-zA-Z]*)/g)?.map(m => m.slice(1)) || [];
      const uniqueComponents = [...new Set(componentsUsed)];
      
      if (uniqueComponents.length > 0 && !code.includes("import")) {
        warnings.push({
          message: `Missing import statement. Add: import { ${uniqueComponents.join(", ")} } from '@unmessme/design-system';`,
          severity: "warning"
        });
      }
      
      const isValid = errors.length === 0;
      
      return {
        valid: isValid,
        errors: errors,
        warnings: warnings,
        summary: isValid 
          ? "✅ Code follows design system guidelines"
          : `❌ Found ${errors.length} error(s) and ${warnings.length} warning(s)`
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

