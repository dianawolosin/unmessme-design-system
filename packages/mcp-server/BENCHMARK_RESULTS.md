# UnmessMe MCP - Format Efficiency Benchmark Results

**Experiment ID**: UNMESS-FORMAT-2025-001  
**Date Started**: TBD  
**Date Completed**: TBD  
**Status**: Not Started  

---

## Executive Summary

*To be written after benchmark completion.*

**Key Findings:**
- TBD

**Winner:**
- TBD

**Recommendation:**
- TBD

---

## Test Results

### Phase 2: Token Efficiency Results

**Date Run**: TBD  
**Tool Used**: `benchmark_formats` MCP tool  

#### Raw Data

```json
{
  "test_1_json_md_yaml": { "chars": "TBD", "tokens": "TBD", "vs_baseline": "BASELINE" },
  "test_2_toon_md": { "chars": "TBD", "tokens": "TBD", "vs_baseline": "TBD" },
  "test_3_pure_md": { "chars": "TBD", "tokens": "TBD", "vs_baseline": "TBD" },
  "test_4_mono_json": { "chars": "TBD", "tokens": "TBD", "vs_baseline": "TBD" }
}
```

#### Analysis

| Metric | Test 1: JSON+MD (YAML) | Test 2: Toon+MD | Test 3: Pure MD | Test 4: Mono JSON |
|--------|---------------------------|----------------|---------------|------------------|
| **Character Count** | TBD | TBD | TBD | TBD |
| **Token Count** | TBD | TBD | TBD | TBD |
| **vs. Baseline** | BASELINE | TBD | TBD | TBD |
| **Ranking** | TBD | TBD | TBD | TBD |

**Observations:**
- TBD

---

### Phase 3: Chunk Inspection Results

**Date Run**: TBD  
**Component Tested**: Button  
**Tools Used**: `inspect_chunks`, `compare_chunks`  

#### Chunk Comparison

| Format | Chunk Count | Avg Size | Boundaries | Notes |
|--------|-------------|----------|------------|-------|
| Test 1: JSON+MD (YAML) | TBD | TBD | TBD | JSON tokens + MD specs with YAML frontmatter |
| Test 2: Toon+MD | TBD | TBD | TBD | Toon tokens + MD specs with Toon frontmatter |
| Test 3: Pure MD | TBD | TBD | TBD | Everything as MD, no JSON, no frontmatter |
| Test 4: Mono JSON | TBD | TBD | TBD | Everything as nested JSON |

**Observations:**
- TBD

**Chunk Quality Assessment:**
- TBD

---

### Phase 4: Retrieval Precision Results

**Date Run**: TBD  
**Tool Used**: `test_retrieval`  
**Vector DB**: TBD (Vectra/LanceDB)  

#### Standard Query Results

**Query 1: "How do I use the Button component?"**

| Format | Top-1 Correct | Response Tokens | Code Intact | Notes |
|--------|---------------|-----------------|-------------|-------|
| Test 1 | TBD | TBD | TBD | TBD |
| Test 2 | TBD | TBD | TBD | TBD |
| Test 3 | TBD | TBD | TBD | TBD |
| Test 4 | TBD | TBD | TBD | TBD |

**Query 2: "What is the size prop for Button?"**

| Format | Top-1 Correct | Response Tokens | Code Intact | Notes |
|--------|---------------|-----------------|-------------|-------|
| Test 1 | TBD | TBD | TBD | TBD |
| Test 2 | TBD | TBD | TBD | TBD |
| Test 3 | TBD | TBD | TBD | TBD |
| Test 4 | TBD | TBD | TBD | TBD |

**Query 3: "Show me a Button code example"**

| Format | Top-1 Correct | Response Tokens | Code Intact | Notes |
|--------|---------------|-----------------|-------------|-------|
| Test 1 | TBD | TBD | TBD | TBD |
| Test 2 | TBD | TBD | TBD | TBD |
| Test 3 | TBD | TBD | TBD | TBD |
| Test 4 | TBD | TBD | TBD | TBD |

**Query 4: "What are the accessibility guidelines for Button?"**

| Format | Top-1 Correct | Response Tokens | Code Intact | Notes |
|--------|---------------|-----------------|-------------|-------|
| Test 1 | TBD | TBD | TBD | TBD |
| Test 2 | TBD | TBD | TBD | TBD |
| Test 3 | TBD | TBD | TBD | TBD |
| Test 4 | TBD | TBD | TBD | TBD |

**Query 5: "What are the primary color tokens?"**

| Format | Top-1 Correct | Response Tokens | Code Intact | Notes |
|--------|---------------|-----------------|-------------|-------|
| Test 1 | TBD | TBD | TBD | TBD |
| Test 2 | TBD | TBD | TBD | TBD |
| Test 3 | TBD | TBD | TBD | TBD |
| Test 4 | TBD | TBD | TBD | TBD |

#### Aggregated Metrics

| Metric | Test 1: JSON+MD (YAML) | Test 2: Toon+MD | Test 3: Pure MD | Test 4: Mono JSON |
|--------|---------------------------|----------------|---------------|------------------|
| **Top-1 Accuracy** | TBD | TBD | TBD | TBD |
| **Avg Response Tokens** | TBD | TBD | TBD | TBD |
| **Code Preservation Rate** | TBD | TBD | TBD | TBD |

**Observations:**
- TBD

---

### Phase 5: Prototyping Capabilities Results

**Date Run**: 2025-11-24
**Tools Used**: `generate_page_layout`, `generate_component_code`

#### Code Generation Quality

| Test Case | Tool Used | Success? | Code Quality Notes | Token Usage |
|-----------|-----------|----------|--------------------|-------------|
| **Dashboard Layout** | `generate_page_layout` | Yes | Correctly used `Grid`, `Card`, and `Heading` components. Responsive structure. | Low (Efficient) |
| **Landing Page Layout** | `generate_page_layout` | Yes | Good use of `Stack`, `Hero` pattern, and `Box` for spacing. | Low (Efficient) |
| **Cross-Format (Toon)** | `inspect_chunks` + manual | TBD | TBD | TBD |
| **Cross-Format (Mono)** | `inspect_chunks` + manual | TBD | TBD | TBD |
| **Token Accuracy** | `generate_component_code` | TBD | Did it use `var(--...)` correctly? | TBD |
| **FeatureCard** | `generate_component_code` | Yes | Correct prop usage, clean import, valid JSX. | Very Low |

**Key Observations:**
- The `generate_page_layout` tool effectively combines multiple components to create coherent page structures.
- The generated code imports components from `@unmessme/design-system` correctly.
- `generate_component_code` provides both the usage example and the necessary imports, making it copy-paste ready.

---

## Qualitative Analysis

### Test 1: JSON+MD (YAML) - Baseline

**Chunking Behavior:**
- TBD

**Code Example Preservation:**
- TBD

**Token Structure Quality:**
- TBD

**Overall Assessment:**
- TBD

---

### Test 2: Toon+MD

**Chunking Behavior:**
- TBD

**Code Example Preservation:**
- TBD

**Token Structure Quality:**
- TBD

**Overall Assessment:**
- TBD

---

### Test 3: Pure MD

**Chunking Behavior:**
- TBD

**Code Example Preservation:**
- TBD

**Token Structure Quality:**
- TBD

**Overall Assessment:**
- TBD

---

### Test 4: Monolithic JSON

**Chunking Behavior:**
- TBD

**Code Example Preservation:**
- TBD

**Token Structure Quality:**
- TBD

**Overall Assessment:**
- TBD

---

## Final Comparison

### Overall Results Table

| Metric | Test 1: JSON+MD (YAML) | Test 2: Toon+MD | Test 3: Pure MD | Test 4: Mono JSON | Winner |
|--------|---------------------------|----------------|---------------|------------------|--------|
| **Token Efficiency** | BASELINE | TBD | TBD | TBD | TBD |
| **Chunk Count** | TBD | TBD | TBD | TBD | TBD |
| **Avg Chunk Size** | TBD | TBD | TBD | TBD | TBD |
| **Top-1 Accuracy** | TBD | TBD | TBD | TBD | TBD |
| **Code Preservation** | TBD | TBD | TBD | TBD | TBD |

### Ranking by Metric

**Token Efficiency:**
1. TBD
2. TBD
3. TBD
4. TBD

**Chunk Quality:**
1. TBD
2. TBD
3. TBD
4. TBD

**Retrieval Precision:**
1. TBD
2. TBD
3. TBD
4. TBD

**Overall Winner:**
- TBD

---

## Conclusions

### Key Findings

1. **Token Efficiency**: TBD
2. **Chunk Quality**: TBD
3. **Retrieval Precision**: TBD
4. **Code Preservation**: TBD

### Hypothesis Validation

**Original Hypothesis:**
> Different input formats (pure Markdown, hybrid metadata wrappers, and structured JSON) will have measurable differences in token efficiency, chunking effectiveness, and retrieval precision. We hypothesize that simpler formats may perform better, but we will let the data decide.

**Result:**
- TBD

### Recommendations

**For UnmessMe:**
- TBD

**For Enterprise Design Systems:**
- TBD

**For MCP Implementations:**
- TBD

---

## Conference Narrative

*To be written after results are finalized.*

### The Story

**Act 1: The Problem**
- TBD

**Act 2: The Experiment**
- TBD

**Act 3: The Results**
- TBD

**Act 4: The Lesson**
- TBD

### Key Talking Points

1. **"The Problem Statement"**: TBD
2. **"The Four Approaches"**: TBD
3. **"Token Efficiency Results"**: TBD
4. **"Chunk Quality Analysis"**: TBD
5. **"Retrieval Precision"**: TBD
6. **"The Winner & Why"**: TBD
7. **"Lessons Learned"**: TBD

### Visualizations Needed

- [ ] Bar chart: Token count by format
- [ ] Bar chart: Chunk count by format
- [ ] Table: Retrieval precision by query
- [ ] Side-by-side: Chunk comparison for Button component
- [ ] Code example: JSON escaped vs. Markdown native

---

## Lessons Learned

### What Worked
- TBD

### What Didn't Work
- TBD

### Surprises
- TBD

### Future Research
- TBD

---

**Owner**: Diana Wolosin
**Reviewer**: TBD  
**Presentation Date**: Into Design System - March 29-20 2026

