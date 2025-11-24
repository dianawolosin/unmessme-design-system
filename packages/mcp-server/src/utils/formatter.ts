import { encode } from "./toon-mock.js";

export type OutputFormat = "raw_md" | "toon_md" | "json_md" | "json";

/**
 * Formats data according to the requested experiment mode.
 *
 * @param data - The data object (expected { metadata: {}, content: "" })
 * @param format - The experiment mode
 * @returns String representation
 */
export function formatData(data: any, format: OutputFormat = "raw_md"): string {
  const { metadata, content } = data;

  if (format === "raw_md") {
    // 1. Baseline: Raw Markdown
    // Just the content, maybe with a simple title if missing
    return content;
  }

  if (format === "toon_md") {
    // 2. Toon Envelope + MD
    const metadataToon = encode(metadata);
    return `---
${metadataToon}
---
${content}`;
  }

  if (format === "json_md") {
    // 3. JSON Envelope + MD
    return JSON.stringify({ metadata, content_raw: content }, null, 2);
  }

  if (format === "json") {
    // 4. Pure JSON (Structured)
    return JSON.stringify({ ...metadata, content_structured: content }, null, 2);
  }

  return content;
}
