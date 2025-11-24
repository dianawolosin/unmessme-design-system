import { z } from "zod";
import { ToolDefinition } from "./index.js";
import { formatData } from "../utils/formatter.js";
import { loadBlueprint } from "../utils/blueprint-loader.js";

export const benchmarkTool: ToolDefinition = {
  name: "benchmark_formats",
  description: "Compare token efficiency of Raw MD, Toon+MD, JSON+MD, and Pure JSON.",
  inputSchema: z.object({
    blueprint_name: z.string().describe("The name of the blueprint file to test (e.g., 'unmess_me_ui_blueprint.md')"),
  }),
  handler: async (args: { blueprint_name: string }) => {
    const { blueprint_name } = args;
    try {
      const rawContent = await loadBlueprint(blueprint_name);
      
      const data = {
        metadata: {
          id: blueprint_name,
          type: "blueprint",
          tags: ["ui", "design-system"],
          version: "1.0.0"
        },
        content: rawContent
      };

      const formats = ["json_md", "toon_md", "json", "raw_md"] as const;
      const metrics = formats.map(fmt => {
        const output = formatData(data, fmt);
        return {
          format: fmt,
          chars: output.length,
          tokens_est: Math.ceil(output.length / 4)
        };
      });

      // Calculate savings relative to JSON_MD (The System Standard)
      const baseline = metrics.find(m => m.format === "json_md")!.chars;
      
      const results = metrics.map(m => ({
        ...m,
        diff_vs_baseline: m.chars === baseline 
          ? "BASELINE" 
          : `${((1 - m.chars / baseline) * 100).toFixed(1)}% ${m.chars < baseline ? "savings" : "overhead"}`
      }));

      return {
        blueprint: blueprint_name,
        analysis: "Benchmark: Comparing against Standard JSON+MD Baseline.",
        results: results
      };

    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};
