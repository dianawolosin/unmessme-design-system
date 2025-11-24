import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Logic ---
async function stripFrontmatter(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Stripping frontmatter from ${inputDir} to ${outputDir}`);
  const files = await fs.readdir(inputDir);
  const mdFiles = files.filter(f => f.endsWith(".md"));

  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    // Remove frontmatter block
    const newContent = content.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
    await fs.writeFile(path.join(outputDir, file), newContent);
  }
}

async function jsonToMarkdown(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Converting tokens from ${inputDir} to ${outputDir}`);
  const files = await fs.readdir(inputDir);
  const jsonFiles = files.filter(f => f.endsWith(".json"));

  for (const file of jsonFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    const json = JSON.parse(content);
    
    // Simple MD Table generator
    let md = `# ${file.replace(".json", "")} Tokens\n\n`;
    
    function processObj(obj: any, prefix = "") {
      if (typeof obj !== 'object' || obj === null) {
        md += `- **${prefix}**: ${obj}\n`;
        return;
      }
      
      // If it looks like a token (value/type), print it
      if ('value' in obj) {
         md += `- **${prefix}**: \`${obj.value}\`\n`;
         return;
      }

      for (const [k, v] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${k}` : k;
        processObj(v, newKey);
      }
    }

    processObj(json);
    
    const outFile = file.replace(".json", ".md");
    await fs.writeFile(path.join(outputDir, outFile), md);
  }
}

async function run() {
  try {
    console.log("Starting Test 3 Transformation (Inline)...");
    
    const packageRoot = path.resolve(__dirname, "../../.."); 
    const monorepoRoot = path.resolve(packageRoot, "../..");
    
    const specsDir = path.join(monorepoRoot, "packages/design-system/component-specs");
    const tokensDir = path.join(monorepoRoot, "packages/design-system/src/tokens");
    
    const test3Dir = path.join(packageRoot, "test-data/test-3-pure-md");
    const outSpecsDir = path.join(test3Dir, "components");
    const outTokensDir = path.join(test3Dir, "tokens");

    await fs.mkdir(outSpecsDir, { recursive: true });
    await fs.mkdir(outTokensDir, { recursive: true });

    await stripFrontmatter(specsDir, outSpecsDir);
    await jsonToMarkdown(tokensDir, outTokensDir);
    
    console.log("✅ Test 3 Transformation Complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run();

