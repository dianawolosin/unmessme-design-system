import { z } from "zod";
import { benchmarkTool } from "./benchmark.js";
import { inspectChunksTool } from "./inspect-chunks.js";
import { compareChunksTool } from "./compare-chunks.js";
import { testRetrievalTool } from "./test-retrieval.js";
import { getComponentTool } from "./get-component.js";
import { listComponentsTool } from "./list-components.js";
import { searchComponentsTool } from "./search-components.js";
import { getTokensTool } from "./get-tokens.js";
import { searchTokensTool } from "./search-tokens.js";
import { generateComponentCodeTool } from "./generate-component-code.js";
import { generatePageLayoutTool } from "./generate-page-layout.js";
import { validateComponentUsageTool } from "./validate-component-usage.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodType<any>;
  handler: (args: any) => Promise<any> | any;
}

export const tools: ToolDefinition[] = [
  // Benchmark Tools
  benchmarkTool,
  inspectChunksTool,
  compareChunksTool,
  testRetrievalTool,
  
  // Component Discovery
  getComponentTool,
  listComponentsTool,
  searchComponentsTool,
  
  // Design Tokens
  getTokensTool,
  searchTokensTool,
  
  // Code Generation
  generateComponentCodeTool,
  generatePageLayoutTool,
  
  // Validation & Best Practices
  validateComponentUsageTool,
];
