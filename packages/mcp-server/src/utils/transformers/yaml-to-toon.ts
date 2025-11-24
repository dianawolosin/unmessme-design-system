import { promises as fs } from "fs";
import * as path from "path";
import { encode } from "../toon-mock.js";

function parseYamlSimple(yamlStr: string): any {
  const lines = yamlStr.split("\n");
  const result: any = {};
  for (const line of lines) {
    if (!line.includes(":")) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    // Remove quotes if present
    const cleanValue = value.replace(/^['"](.*)['"]$/, "$1");
    result[key.trim()] = cleanValue;
  }
  return result;
}

export async function yamlToToon(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Converting specs from ${inputDir} to ${outputDir}`);
  
  const files = await fs.readdir(inputDir);
  const mdFiles = files.filter(f => f.endsWith(".md"));

  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    
    // Extract YAML frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (match) {
      const frontmatter = match[1];
      const body = match[2];
      
      const data = parseYamlSimple(frontmatter);
      const toonHeader = encode(data);
      
      // Create Toon Frontmatter (using +++ or similar delimiter, or just raw Toon at top)
      // Let's use +++ for Toon
      const newContent = `+++\n${toonHeader}\n+++\n${body}`;
      
      await fs.writeFile(path.join(outputDir, file), newContent);
    } else {
      // No frontmatter, just copy
      await fs.writeFile(path.join(outputDir, file), content);
    }
  }
}
