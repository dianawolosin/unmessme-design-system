import { promises as fs } from "fs";
import * as path from "path";
import { encode } from "../toon-mock.js";

export async function jsonToToon(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Converting tokens from ${inputDir} to ${outputDir}`);
  
  const files = await fs.readdir(inputDir);
  const jsonFiles = files.filter(f => f.endsWith(".json"));

  for (const file of jsonFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    const json = JSON.parse(content);
    
    const toon = encode(json);
    
    // Save as .toon file? Or .md? Plan implies .md or text format.
    // Let's use .toon for tokens
    const outFile = file.replace(".json", ".toon");
    await fs.writeFile(path.join(outputDir, outFile), toon);
  }
}
