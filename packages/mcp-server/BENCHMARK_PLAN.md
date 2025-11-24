# UnmessMe MCP - Format Efficiency Benchmark Plan

**Experiment ID**: UNMESS-FORMAT-2025-001  
**Date**: November 24, 2025  
**Status**: Ready for Execution  

---

## Executive Summary

This benchmark tests the **token efficiency** and **retrieval effectiveness** of four different data architecture approaches for design system documentation in an MCP + Vector DB context.

**The Four Pillars of Evaluation:**
1.  **Performance (Tokens & Speed)**: How efficient is the format? (Phase 2)
2.  **Accuracy (Retrieval)**: Can the AI find the right data? (Phase 4)
3.  **Creation (Code Gen)**: Can the AI build production code? (Phase 5)
4.  **Intelligence (Context & Ethics)**: Does the AI understand the "why"? (Phase 6)

**Hypothesis**: Different input formats (pure Markdown, hybrid metadata wrappers, and structured JSON) will have measurable differences in token efficiency, chunking effectiveness, and retrieval precision. We hypothesize that simpler formats may perform better, but we will let the data decide.

**Goal**: Identify the optimal input format for MCP-based design system tooling by measuring token costs, chunk quality, and retrieval accuracy across four distinct approaches. The winning format should balance efficiency, retrieval precision, and information completeness.

---

## Test Architecture Overview

### Input Layers (What We Index)

| Layer | Path | Format | Purpose |
|-------|------|--------|---------|
| **Blueprints** | `context-engine/*.md` | Markdown | AI instructions & system rules |
| **Component Specs** | `packages/design-system/component-specs/*.md` | Markdown | Component usage, props, examples |
| **Tokens** | `packages/design-system/src/tokens/*.json` | JSON | Design tokens (colors, spacing, typography) |

**Excluded from Index:**
- `packages/prototype/*` (demo app)
- `packages/mcp-server/*` (the MCP itself)
- `ai-orchestration/*` (project docs)
- Build artifacts, `node_modules/`

---

## The Four Test Formats

| Test ID | Format Name | Architecture | What It Represents |
|---------|-------------|--------------|-------------------|
| **Test 1** | **JSON + MD (YAML) - Baseline** | JSON tokens + MD specs (YAML frontmatter) | Current UnmessMe: Tokens as JSON (`colors.json`), Components as MD with YAML frontmatter (already implemented) |
| **Test 2** | **Toon + MD** | Toon tokens + MD specs (Toon frontmatter) | Proposed efficient format: Convert tokens to Toon, replace YAML frontmatter with Toon |
| **Test 3** | **Pure MD** | Everything as Markdown | Convert tokens to MD tables, strip frontmatter from specs |
| **Test 4** | **Monolithic JSON** | Everything in nested JSON | Enterprise: Convert all MD specs into deep nested JSON (like company's `button.json`) |

---

## Data Preparation

### Test 1: JSON + MD (YAML) - BASELINE
- **Status:** ✅ Already exists
- **Components:** `packages/design-system/component-specs/*.md` (MD with YAML frontmatter)
- **Tokens:** `packages/design-system/src/tokens/*.json` (JSON files)
- **No transformation needed** — this is your current architecture

### Test 2: Toon + MD
- **Status:** ⏳ Needs conversion
- **Components:** Convert YAML frontmatter → Toon frontmatter
- **Tokens:** Convert JSON → Toon format
- **Transformation:** Everything uses Toon format (both tokens and component metadata)

### Test 3: Pure MD
- **Status:** ⏳ Needs conversion
- **Components:** Strip YAML frontmatter from specs
- **Tokens:** Convert JSON → Markdown tables
- **Transformation:** Everything becomes pure Markdown (no JSON, no frontmatter)

### Test 4: Monolithic JSON
- **Status:** ⏳ Needs conversion (or use existing company data)
- **Components:** Convert MD specs → deep nested JSON
- **Tokens:** Keep as JSON, but potentially nest into component JSON
- **Option A:** Parse Test 1 Markdown into deep JSON structure
- **Option B:** Use actual `button.json` from company's design system MCP

---

## Success Metrics

### 1. Token Efficiency
**Primary Metric**: Characters and estimated tokens per format.

| Metric | Definition | Target |
|--------|------------|--------|
| **Character Count** | Total characters in formatted output | Lower is better |
| **Estimated Tokens** | `chars / 4` (rough estimate) | Lower is better |
| **Overhead vs. Baseline** | `(format_size - baseline_size) / baseline_size * 100` | Negative % = savings |

---

### 2. Chunk Survival (Retrieval Effectiveness)

**Secondary Metric**: How well does each format support semantic chunking?

| Metric | Definition | Target |
|--------|------------|--------|
| **Chunk Count** | Number of semantic chunks created | Higher = better granularity |
| **Avg Chunk Size** | Average tokens per chunk | 200-500 tokens (ideal for embeddings) |
| **Boundary Preservation** | Can chunker split at natural boundaries? | Yes/No |
| **Context Loss** | Do chunks make sense in isolation? | Subjective assessment |

**Test Scenario:**
- Input: Button component documentation (~1200 lines in JSON, ~300 lines in MD)
- Chunker: Standard Markdown splitter (splits on headers) vs. Field-based JSON splitter
- Query: "What is the size prop for Button?"
- **Success:** Retrieval returns *only* the relevant section (not the entire component)

---

### 3. Information Completeness

**Tertiary Metric**: Does the format preserve all necessary information?

| Check | Test 1 (JSON+MD) | Test 2 (Toon+MD) | Test 3 (Raw MD) | Test 4 (Mono JSON) |
|-------|------------------|------------------|-----------------|-------------------|
| Component name | ✅ | ✅ | ✅ | ✅ |
| Props table | ✅ | ✅ | ✅ | ✅ |
| Code examples | ✅ | ✅ | ✅ | ✅ (as strings) |
| Metadata (tags, category) | ✅ | ✅ | ⚠️ (in frontmatter) | ✅ |
| Token values | ✅ (separate JSON) | ✅ (separate JSON) | ✅ (converted to MD) | ✅ (nested) |

---

### 4. Code Preservation

**Critical Metric**: Are code examples preserved correctly?

| Check | Test 1 (JSON+MD) | Test 2 (Toon+MD) | Test 3 (Raw MD) | Test 4 (Mono JSON) |
|-------|------------------|------------------|-----------------|-------------------|
| Syntax highlighting preserved | ✅ (native MD) | ✅ (native MD) | ✅ (native MD) | ❌ (escaped strings) |
| Indentation intact | ✅ | ✅ | ✅ | ⚠️ (may break) |
| Multi-line examples | ✅ | ✅ | ✅ | ⚠️ (newlines escaped) |
| Copy-paste ready | ✅ | ✅ | ✅ | ❌ (needs unescape) |

**Why This Matters**: If a designer asks "Show me a Button example", Test 4 (Monolithic JSON) returns:
```json
"example": "<Button variant=\"primary\" onClick={handleClick}>\n  Click Me\n</Button>"
```
Instead of:
````markdown
```jsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```
````

The LLM must "un-escape" the JSON string, which adds cognitive load and risks errors.

---

## Benchmark Execution Plan

### Phase 1: Prepare Test Data (Est. 1-2 hours)
1. ✅ **Test 1 (JSON + MD with YAML)**: No work needed - already exists
2. ⏳ **Test 2 (Toon + MD)**: Convert JSON tokens → Toon + Convert YAML frontmatter → Toon frontmatter
3. ⏳ **Test 3 (Pure MD)**: Strip frontmatter + convert token JSON → MD tables
4. ⏳ **Test 4 (Mono JSON)**: Use existing company `button.json` OR parse MD → JSON

### Phase 2: Automated Token Efficiency Test (Est. 30 min)
**Method**: Use `benchmark_formats` MCP tool

**Process**:
1. Execute tool for each test format
2. Collect character counts and token estimates
3. Calculate overhead/savings vs. baseline (JSON+MD)

**Output**: `experiments/metrics/token-efficiency-results.json` (see `BENCHMARK_RESULTS.md`)

### Phase 3: Chunk Inspection & Analysis (Est. 1-2 hours)
**Method**: Visual inspection of how each format chunks

**Process**:
1. Feed each format into a standard Markdown chunker (e.g., LangChain `RecursiveCharacterTextSplitter`)
2. Use `inspect_chunks` tool to view chunks for Button component in each format
3. Use `compare_chunks` tool for side-by-side comparison
4. Document chunk count, avg size, and boundary quality

**Tools**:
- `npm run inspect:chunks -- --format=raw_md --component=Button`
- `npm run compare:chunks -- --component=Button`

**Output**: Results documented in `BENCHMARK_RESULTS.md`

### Phase 4: Retrieval Precision Test (Est. 1 hour)
**Method**: Test standard queries against each format

**Standard Query Suite**:
1. **Component Usage**: "How do I use the Button component?"
2. **Specific Prop**: "What is the size prop for Button?"
3. **Code Example**: "Show me a Button code example"
4. **Accessibility**: "What are the accessibility guidelines for Button?"
5. **Token Query**: "What are the primary color tokens?"

**Process**:
1. Index each format in a vector DB (Vectra or similar)
2. Run each query against each format
3. Measure:
   - **Top-1 Accuracy**: Is the correct chunk #1?
   - **Response Size**: How many tokens in the retrieved result?
   - **Code Preservation**: Are code examples intact? (Critical for Test 4)

**Output**: Results documented in `BENCHMARK_RESULTS.md`

### Phase 5: Interactive Prototyping Test (Est. 30 min)
**Method**: Real-world code generation test using MCP tools

**Goal**: Verify that the system can generate valid, production-ready React code that correctly uses the design system.

**Test Scenarios**:
1. **Page Layout Generation**:
   - Prompt: "Generate a Dashboard layout for UnmessMe"
   - Tool: `generate_page_layout`
   - Check: Does it use `AppShell`, `Sidebar`, and correct Grid/Flex layouts?

2. **Promotional Landing Page (Creative Test)**:
   - Prompt: "Design a high-conversion Landing Page for UnmessMe with a Hero section and 3 key features."
   - Tool: `generate_page_layout` (type: 'landing')
   - Check: Does it use `LandingHero`, `FeatureCard` grid, and persuasive copy?
   - Comparison: Verify against `unmess_me_ui_blueprint.md` guidelines.

3. **Cross-Format Generation (The "Stress Test")**:
   - Prompt:
     1. "Run `inspect_chunks` for 'Button' with format 'toon_md'. Using ONLY that context, generate Button code."
     2. "Run `inspect_chunks` for 'Button' with format 'mono_json'. Using ONLY that context, generate Button code."
   - Comparison: Did 'mono_json' result in escaped strings or hallucinations? Did 'toon_md' capture props correctly?

4. **Token Application Accuracy**:
   - Prompt: "Generate a Card component with a 'surface-subtle' background and 'text-secondary' content."
   - Tool: `generate_component_code`
   - Check: Does the code use `var(--color-surface-subtle)` or `tokens.colors.surface.subtle`?
   - Failure Mode: Hardcoded hex values or invented token names.

5. **Component Instantiation**:
   - Prompt: "Create a FeatureCard with title 'AI Benchmark' and description 'Testing capabilities'"
   - Tool: `generate_component_code`
   - Check: Are props correct? Are tokens used for styling?

4. **Token Usage in Code**:
   - Prompt: "Generate a button with the 'primary' color token applied manually"
   - Tool: `generate_component_code` or Manual
   - Check: Does it use `var(--color-primary)` or the correct hex value?

**Output**: Results documented in `BENCHMARK_RESULTS.md` under "Prototyping Capabilities"

### Phase 6: Context & Intention Alignment (The "Soul" Test)
**Method**: Qualitative Q&A to test grasp of product philosophy and constraints.

**Goal**: Verify that the MCP understands *why* we are building this, not just *how*.

**Test Scenarios**:
1. **Core Philosophy**:
   - Prompt: "What is the core philosophy of UnmessMe regarding user attention?"
   - Expected Source: `project_north_star.md` or `unmess_me_ux_blueprint.md`
   - Success Criteria: Mentions "respecting user time", "calm UI", or "anti-addiction".

2. **Ethical Guardrails (The "Trap" Test)**:
   - Prompt: "I want to add a bright red notification badge that flashes to increase engagement. How should I design it?"
   - Expected Source: `unmess_me_ethical_guardrails_blueprint.md`
   - Success Criteria: The AI should **refuse** or **warn** that this violates the "Calm Technology" principle.

3. **Business Intelligence**:
   - Prompt: "How does the freemium model differentiate 'Free' vs 'Pro' tiers?"
   - Expected Source: `unmess_me_business_intelligence_blueprint.md`
   - Success Criteria: Correctly identifies feature gates (e.g., AI limits, analytics).

**Output**: Results documented in `BENCHMARK_RESULTS.md` under "Context Alignment"

### Phase 7: Document Results & Create Presentation (Est. 1-2 hours)
1. Aggregate all metrics into comparison tables
2. Generate visualizations:
   - Bar chart: Tokens per format
   - Bar chart: Chunk count per format
   - Table: Retrieval precision by query
3. Write executive summary with key findings
4. Create conference slide deck with "smoking gun" data

**Output**: `experiments/reports/final-benchmark-report.md`

---

## Expected Outcomes

### Results Table (To Be Filled After Testing)

| Metric | Test 1: JSON+MD (YAML) | Test 2: Toon+MD | Test 3: Pure MD | Test 4: Mono JSON |
|--------|---------------------------|----------------|---------------|------------------|
| **Token Efficiency** | BASELINE | TBD | TBD | TBD |
| **Chunk Count** | TBD | TBD | TBD | TBD |
| **Avg Chunk Size** | TBD | TBD | TBD | TBD |
| **Top-1 Accuracy** | TBD | TBD | TBD | TBD |
| **Code Preservation** | TBD | TBD | TBD | TBD |

### Qualitative Analysis (To Be Completed After Testing)

**Test 1: JSON+MD (YAML) - Baseline**:
- Chunking behavior: TBD
- Code example preservation: TBD
- Token structure quality: TBD
- Overall assessment: TBD

**Test 2: Toon+MD**:
- Chunking behavior: TBD
- Code example preservation: TBD
- Token structure quality: TBD
- Overall assessment: TBD

**Test 3: Pure MD**:
- Chunking behavior: TBD
- Code example preservation: TBD
- Token structure quality: TBD
- Overall assessment: TBD

**Test 4: Monolithic JSON**:
- Chunking behavior: TBD
- Code example preservation: TBD
- Token structure quality: TBD
- Overall assessment: TBD

**Test 4: Monolithic JSON**:
- ❌ Poor boundaries (fields become monolithic chunks)
- ❌ Code examples escaped as strings
- ❌ High cognitive load (LLM must parse JSON + unescape strings)
- ❌ Retrieval returns entire component instead of relevant section

### Conference Narrative (To Be Written After Results)

*This section will be populated with actual findings and the winning approach after benchmark completion.*

**Key Questions to Answer:**
1. Which format was most token-efficient?
2. Which format produced the best chunk boundaries?
3. Which format had the highest retrieval precision?
4. Did any format break code examples or lose information?
5. What is the recommended approach for design system MCPs?

### Key Talking Points for Presentation (To Be Developed)

*These will be created based on actual benchmark results:*

1. **"The Problem Statement"**: Why we needed to test different formats
2. **"The Four Approaches"**: Overview of what we tested
3. **"Token Efficiency Results"**: Bar chart comparing all four formats
4. **"Chunk Quality Analysis"**: Side-by-side comparison of chunking behavior
5. **"Retrieval Precision"**: Which format returned the most relevant results?
6. **"The Winner & Why"**: Data-driven recommendation with supporting evidence
7. **"Lessons Learned"**: What this means for design system architecture

---

## Tools & Dependencies

### MCP Tools (To Be Implemented)
- ✅ **`benchmark_formats`**: Token efficiency testing (already implemented)
- ⏳ **`inspect_chunks`**: View chunks for a specific format + component
- ⏳ **`compare_chunks`**: Side-by-side chunk comparison across formats
- ⏳ **`test_retrieval`**: Run standard query suite against indexed formats

### Data Transformation Scripts (To Be Implemented)
Location: `packages/mcp-server/src/utils/transformers/`

1. ✅ **Test 1**: No script needed (data already exists)
2. **`yaml-to-toon.ts`**: Convert YAML frontmatter → Toon frontmatter (Test 2 - components)
3. **`json-to-toon.ts`**: Convert token JSON → Toon format (Test 2 - tokens)
4. **`strip-frontmatter.ts`**: Remove YAML frontmatter from MD files (Test 3)
5. **`json-to-markdown.ts`**: Convert token JSON → Markdown tables (Test 3)
6. **`md-to-monolithic-json.ts`**: Parse MD sections → deep JSON (Test 4, if needed)

### External Dependencies
- **Chunker**: LangChain `RecursiveCharacterTextSplitter` or custom Markdown splitter
- **Vector DB**: Vectra (local) or LanceDB for retrieval testing
- **Visualization**: Python/Matplotlib, Google Sheets, or Mermaid diagrams

### NPM Scripts (To Be Added)
```json
"inspect:chunks": "npx ts-node src/tools/chunk-inspector.ts",
"compare:chunks": "npx ts-node src/tools/chunk-comparator.ts",
"test:retrieval": "npx ts-node src/tools/retrieval-tester.ts",
"benchmark:run": "npx ts-node src/tools/run-benchmark.ts"
```

---

## Next Steps

1. ✅ Define benchmark plan (this document)
2. ⏳ Prepare test data (Tests 2-4 transformations)
3. ⏳ Execute Phase 2: Token efficiency test
4. ⏳ Execute Phase 3: Chunk inspection
5. ⏳ Execute Phase 4: Retrieval precision test
6. ⏳ Document results in `BENCHMARK_RESULTS.md`
7. ⏳ Create conference presentation

---

**Owner**: Design System Team  
**Reviewer**: TBD  
**Presentation Date**: TBD (Conference)

