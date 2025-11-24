# UnmessMe – MCP Tools + Technical Constraints Blueprint

## 1. Purpose

This blueprint defines the **technical structure, constraints, and expectations** for the MCP tools that power AI‑driven prototyping of UnmessMe. These tools are used *only* during design and prototyping—**not for a runtime mobile app**.

The goal is to ensure that:

- The AI can reliably produce **screen specs**, **flow specs**, **UI structures**, and **component metadata**.
- All outputs follow the BI, UX, UI, Accessibility, and Ethical Guardrail blueprints.
- Every MCP tool behaves deterministically, safely, and predictably.
- Generated specs can be rendered instantly in the **Prototype Environment** (React web app).

### System Architecture

```
Design System (MUI wrapper, Docusaurus docs, JSON+MD index)
    ↓
MCP reads indexed resources (JSON metadata + MD component docs)
    ↓
MCP generates validated specs (JSON) + React/JSX code
    ↓
Prototype Environment (React web app) runs JSX code live → desktop-first web preview
```

---

## 2. MCP Tools Overview

The following MCP tools must be available for prototyping:

### 2.1 Blueprint Access Tools

#### `get_bi_blueprint`

Returns the full Business Intelligence blueprint. Used for:

- semantic reasoning
- problem modeling
- understanding entities, relationships, tags

#### `get_ux_blueprint`

Returns the UX vision + patterns. Used for:

- conversational structure
- flow logic
- how users navigate features

#### `get_ui_blueprint`

Returns the UI design principles + component mappings. Used for:

- layout guidance
- dark mode rules
- shape language
- material-inspired patterns

#### `get_accessibility_rules`

Returns accessibility constraints. The AI must check every screen or component against these rules. Used for:

- color contrast decisions
- component spacing
- touch target size
- conversational clarity

#### `get_ethical_guardrails`

Returns legal + emotional safety rules. Used for:

- tone control
- crisis handling boundaries
- permitted action steps

### 2.2 Design System Access Tools

#### `get_design_token`

**Input:** Token category (e.g., `color`, `spacing`, `typography`)

**Output:** JSON structure with token definitions.

**CRITICAL Constraint:** All generated code must reference Semantic Tokens, NEVER Primitives or Raw Values.

```json
{
  "category": "color",
  "tokens": {
    "semantic": {
      "bg": { "canvas": "{color.primitive.slate.900}" },
      "action": { "primary": "{color.primitive.seafoam.main}" }
    }
  }
}
```

#### `get_component_spec`

**Input:** Component name (e.g., `ProblemCard`, `TagChip`)

**Output:** Markdown content with:
- React component signature (JSX/TypeScript)
- MUI components used as base
- Design tokens used (MUI theme tokens)
- Accessibility requirements
- Usage examples

**Format:** MD with optional JSON metadata in frontmatter

---

## 3. Prototype Generation Tools

These tools generate structured outputs:

### 3.1 `generate_screen_spec`

**Input:**

- screen name
- description
- any constraints or notes

**Output:** JSON structure:

```json
{
  "screen_id": "string",
  "title": "string",
  "components": [
    {
      "type": "component_name",
      "props": { "key": "value" }
    }
  ],
  "a11y": { "contrast_valid": true },
  "notes": []
}
```

The tool must:

- check output against a11y, UI, UX, BI, Ethical rules
- reject or auto-adjust any inaccessible or unsafe output

### 3.2 `generate_flow_spec`

**Input:**

- flow name
- purpose
- list of screens

**Output:** ordered list of screens, transitions, and purpose. The tool must:

- maintain conversational clarity
- ensure no inaccessible or emotionally unsafe transitions

### 3.3 `generate_component_spec`

**Input:**

- component name
- usage intent

**Output:** React/JSX code.

**CONSTRAINT:** Must use Semantic Tokens via `theme.palette.semantic.*`. No hardcoded hex values allowed.

### 3.4 `generate_react_ui_code`

Emits React/JSX code using MUI components. Must:

- match component specs
- follow UI + accessibility rules
- use MUI components + custom semantic theme tokens
- generate TypeScript-compatible code

**Output Format:**

```json
{
  "spec": {
    "screen_id": "problem_cards",
    "components": [...]
  },
  "react_code": "// JSX/React component code here",
  "preview_ready": true,
  "mui_components": ["Card", "Chip", "Box"]
}
```

The **react_code** is run directly in the Prototype Environment (React app). No simulation needed—it's the actual web app running in browser.

---

## 4. Benchmark & Optimization Tools (Experimental)

### 4.1 `benchmark_formats`

**Purpose:** A testing tool to compare the token efficiency of different Context Engine formats.

**Input:** `blueprint_name` (e.g., `unmess_me_ui_blueprint.md`)

**Output:** Comparison table of token usage.

**Format Modes Tested:**
1.  **Baseline (JSON + MD):** Current standard. Wrapping markdown in JSON.
2.  **Toon + MD:** Efficient tabular wrapper.
3.  **Pure JSON:** Fully structured (Expensive).
4.  **Raw MD:** Naked file content (Minimal).

**Goal:** Prove that "Atomic, Simple Markdown" is superior to "Giant JSON Blobs" for Enterprise Design Systems.

---

## 5. Technical Constraints the AI Must Follow

### 5.1 Semantic Token System (MANDATORY)

The Design System uses a **Reference -> Semantic** architecture. The AI must strictly adhere to this:

1.  **Primitives (Reference):** Defined in `color.primitive.*`. NEVER use these directly in components.
2.  **Semantics (System):** Defined in `color.semantic.*`. USE THESE.
3.  **Implementation:** Access via MUI Theme Augmentation: `theme.palette.semantic.action.primary`.

**FORBIDDEN:**
- `backgroundColor: '#2A9D8F'` (Raw Hex)
- `backgroundColor: theme.palette.primary.main` (MUI Standard - okay if mapped, but prefer semantic)

**REQUIRED:**
- `backgroundColor: theme.palette.semantic.action.primary` (Semantic Token)

### 5.2 Determinism and Structure

The AI must:

- always return valid JSON
- use known component types only
- follow naming conventions
- output predictable screen structures

### 5.3 A11y Enforcement

Before finalizing any screen or flow, the MCP must:

- validate color contrast
- check touch target sizes
- avoid overly dense layouts
- ensure text is scalable
- avoid fast animations

If violations occur, MCP must:

- adjust the output automatically OR
- return an error message

### 5.4 Ethical Enforcement

All steps, tasks, and flows must:

- avoid medical/legal advice
- avoid sarcasm when emotional tone is high
- include disclaimers where required

### 5.5 UI Consistency

All components must follow:

- Material-inspired geometry
- dark mode color rules
- layout spacing rules

---

## 6. Prototype Environment Integration

### 6.1 Architecture

The **Prototype Environment** is a React web application that:

- Runs the actual generated React/JSX code (not a simulation)
- Hot reloads when MCP generates new code (Vite HMR)
- Displays React code side-by-side with live preview
- Desktop-first responsive design (benefits dashboard/organizational UI)
- Uses MUI components + custom UnmessMe theme
- Production-ready web app architecture

### 6.2 File Structure (Monorepo)

```
/design-system/
  packages/
    design-system/                    # Library package (@unmessme/design-system)
      package.json                    # Publishable npm package
      components/
        ProblemCard.md                # Component docs (MD with React/JSX code)
        ProblemCard.json              # Metadata for MCP indexing
        TagChip.md
        UnmessButton.md
      tokens/
        colors.json                   # W3C Design tokens (Primitive + Semantic)
        spacing.json
        typography.json
        elevation.json
        radius.json
      src/
        components/                   # React component implementations (TSX)
          ProblemCard.tsx
          TagChip.tsx
          UnmessButton.tsx
        theme/                        # MUI custom theme configuration
          index.ts
          palette.ts                  # Palette Augmentation (Semantic Types)
          typography.ts
          spacing.ts
          components.ts               # Global Component Overrides (Semantic)
        index.ts                      # Main export (exports theme + components)
    
    prototype/                        # Demo/Prototype environment
      package.json                    # Depends on @unmessme/design-system
      src/
        App.tsx                       # Demo app (shows components)
        main.tsx                      # Entry point
      index.html
      vite.config.ts
  
  package.json                        # Root (npm workspaces config)
  tsconfig.json                       # Shared TypeScript config
```

### 6.3 MCP Indexation Format

**JSON Metadata (for fast filtering):**
```json
{
  "id": "problem-card",
  "type": "component",
  "platform": "web",
  "framework": "react",
  "base": "mui",
  "category": "surface",
  "doc_path": "components/ProblemCard.md"
}
```

**MD Documentation (for AI consumption):**
```markdown
---
id: problem-card
type: component
platform: web
framework: react
base: mui
---

# Problem Card

## React Component API
```tsx
interface ProblemCardProps {
  title: string;        // Max 60 chars
  tags: string[];       // 1-5 tags
  onUnmess?: () => void;
}

export function ProblemCard({ title, tags, onUnmess }: ProblemCardProps) {
  // Uses MUI Card as base
}
```

## MUI Components Used
- `Card` (base)
- `CardContent`
- `Chip` (for tags)

## Constraints
- Touch target: 48px minimum (WCAG)
- Extends MUI theme tokens
[etc.]
```

## 7. Suggested MCP Tool Behavior Model

1. User (designer) prompts AI: "Prototype the onboarding flow."
2. LLM reads all blueprints through MCP tools.
3. LLM calls `get_component_spec` for needed React components.
4. LLM calls `generate_flow_spec` → defines flow.
5. LLM calls `generate_screen_spec` for each screen.
6. MCP runs internal validation via accessibility + ethics.
7. MCP returns validated JSON spec + React/JSX code.
8. React prototype hot reloads → runs code live in browser (desktop-first responsive design).

---

## 8. Error Handling Rules

If the AI tries to:

- violate accessibility contrast
- propose unsafe humor
- ignore dark mode rules
- output unsupported components

The MCP must:

- block the output
- return precise error messages
- suggest fixes

Example:

```json
{
  "error": "accent_color_fails_contrast_on_dark_surface",
  "suggest": "Use teal or lilac instead of coral for this component."
}
```

---

## 9. Future Tools Worth Adding

- `generate_figma_blueprint` (for future DS automation)
- `generate_interaction_prototype`
- `test_accessibility_on_screen_spec`
- `export_to_react_project` (package specs as full React project)
- `generate_storybook_stories` (create Storybook stories from components)

---

## 10. Summary

This blueprint ensures the MCP acts as a **structured, rule-bound design engine**:

- The AI reasons using BI + UX + UI + Content + Ethics + Accessibility.
- MCP tools shape the prototype outputs.
- All prototypes are safe, accessible, coherent, and aligned with UnmessMe's identity.
- The **Prototype Environment** (React web app) runs generated code live—no simulation, production-ready web app.
- **Enterprise-scale**: Design system built for hundreds of designers/engineers using React + MUI.
- **JSON + MD format** enables both machine consumption (JSON metadata) and AI reasoning (Markdown docs).
- **Token Architecture**: Reference (Primitive) -> System (Semantic) -> Component tokens.
