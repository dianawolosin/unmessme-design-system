import { z } from "zod";
import { ToolDefinition } from "./index.js";
import { inspectChunksTool } from "./inspect-chunks.js";

export const compareChunksTool: ToolDefinition = {
  name: "compare_chunks",
  description: "Compare chunking behavior side-by-side across all formats for a component",
  inputSchema: z.object({
    component_name: z.string().describe("The name of the component (e.g., 'Button')"),
  }),
  handler: async (args: { component_name: string }) => {
    const { component_name } = args;
    const formats = ["baseline", "toon_md", "raw_md", "mono_json"];
    
    try {
      const results = await Promise.all(
        formats.map(async (format) => {
          const result = await inspectChunksTool.handler({ component_name, format });
          
          // If error (e.g. file not found), return a simplified error object
          if (typeof result === "string" || (result as any).error) {
            return {
              format,
              status: "missing",
              error: (result as any).error || result
            };
          }

          const r = result as any;
          return {
            format,
            status: "success",
            total_chunks: r.total_chunks,
            avg_chunk_size: r.avg_chunk_size,
            first_chunk_preview: r.chunks[0]?.preview || "N/A"
          };
        })
      );

      return {
        component: component_name,
        comparison: results
      };

    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

