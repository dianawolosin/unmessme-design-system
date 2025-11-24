import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Logic ---
async function mdToMonolithicJson(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Converting specs from ${inputDir} to ${outputDir}`);
  const files = await fs.readdir(inputDir);
  const mdFiles = files.filter(f => f.endsWith(".md"));

  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    
    // Simple naive conversion: 
    // Treat headers as keys? Or just dump whole content into "content" field?
    // BENCHMARK_PLAN says: "Convert MD specs -> deep nested JSON"
    // Let's do a simple structure:
    // { name: "Button", sections: { "Usage": "...", "Props": "..." } }
    
    const lines = content.split("\n");
    const json: any = { raw_content: content, sections: {} };
    
    let currentSection = "intro";
    let currentBuffer: string[] = [];
    
    for (const line of lines) {
      if (line.startsWith("# ")) {
        // New main section
        if (currentBuffer.length > 0) {
            json.sections[currentSection] = currentBuffer.join("\n").trim();
        }
        currentSection = line.replace("# ", "").trim();
        currentBuffer = [];
      } else if (line.startsWith("## ")) {
        // Subsection - for simplicity flatten into sections with prefix?
        // Or just append
        currentBuffer.push(line);
      } else {
        currentBuffer.push(line);
      }
    }
    if (currentBuffer.length > 0) {
        json.sections[currentSection] = currentBuffer.join("\n").trim();
    }

    const outFile = file.replace(".md", ".json");
    await fs.writeFile(path.join(outputDir, outFile), JSON.stringify(json, null, 2));
  }
}

// For Test 4, tokens stay as JSON (or nested). We'll just copy them.
async function copyTokens(inputDir: string, outputDir: string): Promise<void> {
    console.log(`Copying tokens from ${inputDir} to ${outputDir}`);
    const files = await fs.readdir(inputDir);
    const jsonFiles = files.filter(f => f.endsWith(".json"));
  
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(inputDir, file), "utf-8");
      await fs.writeFile(path.join(outputDir, file), content);
    }
  }

async function run() {
  try {
    console.log("Starting Test 4 Transformation (Inline)...");
    
    const packageRoot = path.resolve(__dirname, "../../.."); 
    const monorepoRoot = path.resolve(packageRoot, "../..");
    
    const specsDir = path.join(monorepoRoot, "packages/design-system/component-specs");
    const tokensDir = path.join(monorepoRoot, "packages/design-system/src/tokens");
    
    const test4Dir = path.join(packageRoot, "test-data/test-4-mono-json");
    const outSpecsDir = path.join(test4Dir, "components");
    const outTokensDir = path.join(test4Dir, "tokens");

    await fs.mkdir(outSpecsDir, { recursive: true });
    await fs.mkdir(outTokensDir, { recursive: true });

    await mdToMonolithicJson(specsDir, outSpecsDir);
    await copyTokens(tokensDir, outTokensDir);
    
    console.log("✅ Test 4 Transformation Complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run();

