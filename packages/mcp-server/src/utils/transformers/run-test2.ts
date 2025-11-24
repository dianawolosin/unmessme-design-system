import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Mock Toon Encoder ---
function encode(data: any): string {
  if (typeof data !== 'object' || data === null) {
    return String(data);
  }
  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";
    const keys = Object.keys(data[0] || {});
    const header = `${keys.join(",")}[${data.length}]:`;
    const rows = data.map(item => keys.map(k => item[k]).join(",")).join("\n  ");
    return `${header}\n  ${rows}`;
  }
  return Object.entries(data)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n");
}

// --- Parsers ---
function parseYamlSimple(yamlStr: string): any {
  const lines = yamlStr.split("\n");
  const result: any = {};
  for (const line of lines) {
    if (!line.includes(":")) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    const cleanValue = value.replace(/^['"](.*)['"]$/, "$1");
    result[key.trim()] = cleanValue;
  }
  return result;
}

// --- Logic ---
async function yamlToToon(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Converting specs from ${inputDir} to ${outputDir}`);
  const files = await fs.readdir(inputDir);
  const mdFiles = files.filter(f => f.endsWith(".md"));

  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (match) {
      const frontmatter = match[1];
      const body = match[2];
      const data = parseYamlSimple(frontmatter);
      const toonHeader = encode(data);
      const newContent = `+++\n${toonHeader}\n+++\n${body}`;
      await fs.writeFile(path.join(outputDir, file), newContent);
    } else {
      await fs.writeFile(path.join(outputDir, file), content);
    }
  }
}

async function jsonToToon(inputDir: string, outputDir: string): Promise<void> {
  console.log(`Converting tokens from ${inputDir} to ${outputDir}`);
  const files = await fs.readdir(inputDir);
  const jsonFiles = files.filter(f => f.endsWith(".json"));

  for (const file of jsonFiles) {
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    const json = JSON.parse(content);
    const toon = encode(json);
    const outFile = file.replace(".json", ".toon");
    await fs.writeFile(path.join(outputDir, outFile), toon);
  }
}

async function run() {
  try {
    console.log("Starting Test 2 Transformation (Inline)...");
    
    // Calculate paths relative to this script location (dist/utils/transformers/run-test2.js)
    const packageRoot = path.resolve(__dirname, "../../.."); 
    const monorepoRoot = path.resolve(packageRoot, "../..");
    
    const specsDir = path.join(monorepoRoot, "packages/design-system/component-specs");
    const tokensDir = path.join(monorepoRoot, "packages/design-system/src/tokens");
    
    const test2Dir = path.join(packageRoot, "test-data/test-2-toon-md");
    const outSpecsDir = path.join(test2Dir, "components");
    const outTokensDir = path.join(test2Dir, "tokens");

    await fs.mkdir(outSpecsDir, { recursive: true });
    await fs.mkdir(outTokensDir, { recursive: true });

    await yamlToToon(specsDir, outSpecsDir);
    await jsonToToon(tokensDir, outTokensDir);
    
    console.log("✅ Test 2 Transformation Complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run();
