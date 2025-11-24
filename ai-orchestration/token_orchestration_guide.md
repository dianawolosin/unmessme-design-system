# UnmessMe – Token & Component Orchestration Guide

## 1. Purpose & Distinction

This document belongs to the **AI Orchestration** layer. It defines *how* the AI and MCP should implement, enforce, and generate code using the design system.

*   **Context Engine (`/context-engine`)**: Defines the *why* (Visual North Star, Semantic Token values, Design Intent).
*   **AI Orchestration (`/ai`)**: Defines the *how* (Architecture, TypeScript patterns, Generation rules, Component construction).

---

## 2. Semantic Token Architecture

We utilize a strictly typed, **2-Layer Token System** to ensure maintainability and "theme switching" capabilities (e.g., V2 vs. V3).

### 2.1 The Layers
1.  **Primitives (`color.primitive.*`)**: Raw values (Hex codes).
    *   *Example:* `color.primitive.seafoam.main` = `#2A9D8F`
    *   *Rule:* NEVER use these directly in components.
2.  **Semantics (`semantic.*`)**: Intent-based aliases.
    *   *Example:* `semantic.action.primary` = `{color.primitive.seafoam.main}`
    *   *Rule:* ALWAYS use these in components.

### 2.2 TypeScript Implementation (Module Augmentation)
To force compliance, we extend Material UI's default theme types. The MCP must generate code that adheres to this structure.

**File Pattern:** `packages/design-system/src/theme/palette.ts`
```typescript
declare module '@mui/material/styles' {
  interface Palette {
    semantic: {
      bg: { 
        canvas: string; 
        surface: string; 
        backdrop: string; 
        overlay: string; 
        glass_tint: string;
      };
      text: { primary: string; secondary: string; ... };
      action: { primary: string; hover: string; ... };
      status: { urgent: string; analysis: string; ... };
      border: { subtle: string; highlight: string; ... };
    };
  }
  // ... repeat for PaletteOptions
}
```

---

## 3. MCP Generation Rules

When the MCP generates React code (prototypes or components), it must strictly follow these constraints:

### 3.1 No Hardcoded Values
*   ❌ **Bad:** `backgroundColor: '#121619'`
*   ❌ **Bad:** `borderRadius: '16px'`
*   ✅ **Good:** `backgroundColor: theme.palette.semantic.bg.canvas`
*   ✅ **Good:** `borderRadius: theme.shape.borderRadius * 2`

### 3.2 Component Overrides (The "Terminal" Aesthetic)
The MCP should generate components that override MUI defaults to match the V3 "Midnight Terminal" aesthetic defined in the UI Blueprint.

*   **Cards:**
    *   Must use `semantic.bg.surface` (Glass).
    *   Must use `backdropFilter: 'blur(...)'`.
    *   Must have `border: 1px solid semantic.border.subtle`.
*   **Buttons:**
    *   Primary actions use `semantic.action.primary` (Seafoam).
    *   Text is `semantic.text.inverse` (Dark Gunmetal).
    *   Shape is `theme.shape.borderRadius` (8px).
    *   **No Shadow/Glow** (Flat mechanical feel).
*   **Typography:**
    *   Headings: `Fraunces` (via `typography.h*`).
    *   Data/Controls: `JetBrains Mono` (via `typography.body*` or `fontFamily` overrides).

---

## 4. Component Strategy

We are transitioning from specialized "Unmess" patterns to generic **Components**.

### 4.1 Core Components Plan
The MCP should prioritize generating/using these components over ad-hoc JSX.

1.  **`Button` Component**
    *   **Role:** Replaces generic MUI Buttons and custom `UnmessButton`.
    *   **Props:** `variant` (primary/secondary/ghost), `tone` (urgent/analysis/success).
    *   **Logic:** Encapsulates the "flat mechanical" interaction states.

2.  **`Tag` Component**
    *   **Role:** Replaces `TagChip`.
    *   **Visual:** "Masking Tape" look (2px radius, rect).
    *   **Logic:** Handles the random rotation (scattering) internally.

3.  **`Surface` Component**
    *   **Role:** Replaces `Card` and `Paper`.
    *   **Visual:** "Smoked Glass" (blur + noise + border).
    *   **Logic:** Standardizes the background texture and film grain.

---

## 5. Implementation & Migration Plan (Execution)

*From `semantic_tokens_plan.md`*

1.  **Token Infrastructure**: 
    *   Aggregator in `packages/design-system/src/tokens/index.ts`.
    *   Flattening logic for Style Dictionary.
2.  **Theme Refactor**: 
    *   Update `src/theme/*` to consume `semantic.*` tokens.
    *   Ensure `components.ts` (MUI overrides) uses semantic tokens.
3.  **Documentation**:
    *   Write generic specs (`Button.md`, `Tag.md`) in `component-specs/`.

---

## 6. Summary for AI Agents

*   **Read** `context-engine/unmess_me_ui_blueprint.md` for visual definitions (Colors, Fonts, Vibe).
*   **Follow** this guide (`ai-orchestration/token_orchestration_guide.md`) for implementation rules (TypeScript, styling patterns, structure).
*   **Never** mix the two. Design is static; Implementation is tactical.
