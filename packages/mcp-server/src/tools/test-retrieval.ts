import { z } from "zod";
import { ToolDefinition } from "./index.js";
import { inspectChunksTool } from "./inspect-chunks.js";

export const testRetrievalTool: ToolDefinition = {
  name: "test_retrieval",
  description: "Test retrieval precision by running a query against all formats (Simulated)",
  inputSchema: z.object({
    query: z.string().describe("The question to ask (e.g., 'What is the size prop?')"),
    component_name: z.string().describe("The component context (e.g., 'Button')"),
  }),
  handler: async (args: { query: string; component_name: string }) => {
    const { query, component_name } = args;
    const formats = ["baseline", "toon_md", "raw_md", "mono_json"];
    const queryLower = query.toLowerCase();
    
    try {
      const retrievalResults = await Promise.all(
        formats.map(async (format) => {
          // 1. Get chunks
          const result = await inspectChunksTool.handler({ component_name, format });
          
          if (typeof result === "string" || (result as any).error) {
            return {
              format,
              found: false,
              reason: "Data missing"
            };
          }

          const chunks = (result as any).chunks as Array<{id: number, content: string}>;

          // 2. Simple keyword search (Simulating Vector Similarity)
          // In a real test, this would use embeddings. Here we use keyword overlap.
          const scoredChunks = chunks.map(chunk => {
            const contentLower = chunk.content.toLowerCase();
            const keywords = queryLower.split(" ").filter(k => k.length > 3); // filter small words
            let score = 0;
            
            keywords.forEach(k => {
              if (contentLower.includes(k)) score++;
            });

            return { ...chunk, score };
          });

          // 3. Sort by score
          scoredChunks.sort((a, b) => b.score - a.score);
          const topChunk = scoredChunks[0];

          return {
            format,
            found: topChunk.score > 0,
            top_match_score: topChunk.score,
            top_chunk_id: topChunk.id,
            retrieved_content: topChunk.content.slice(0, 150) + "..."
          };
        })
      );

      return {
        query,
        component: component_name,
        results: retrievalResults
      };

    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

