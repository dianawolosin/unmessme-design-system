# UnmessMe – Project North Star

## Goal
**Into Design Systems Vibe Coding Conference 2025**: "Context Engines for Design Systems"  
Show how machine-readable design system + MCP → accurate Android UI generation

---

## Four Interconnected Pieces

### 1. Design System (MUI Wrapper)
- **What**: Custom design system that wraps Material UI (MUI) for UnmessMe
- **Where**: `/design-system/packages/design-system/` (monorepo package)
- **Status**: In progress (tokens + theme + specs complete)
- **Architecture**: Monorepo with npm workspaces (Google-style approach)
- **Documentation**: Docusaurus site (MDX-based)
- **MCP Format**: JSON + MD (JSON for structured metadata, MD for component docs)
- **Platform**: React web app
- **Base Library**: MUI (Material UI for React)
- **Package**: `@unmessme/design-system` (publishable npm package)
- **Constraints**: 
  - Dark mode first
  - Must be machine-readable
  - Needs to feed MCP with precise tokens, components, patterns
  - Enterprise-scale design system for hundreds of users
  - Custom theme (dark charcoal + bright accents) extending MUI

### 2. Context Engine
- **What**: Blueprint documents that define product logic, constraints, rules
- **Where**: `/context-engine/`
- **Status**: Complete (7 blueprints)
  - BI Blueprint (master mental model)
  - UX Blueprint (flows, conversational patterns)
  - UI Blueprint (visual system, Material-inspired)
  - Content Blueprint (tone, voice, microcopy)
  - Accessibility Blueprint (WCAG, Android, dark mode)
  - Ethical Guardrails (legal, safety, crisis handling)
  - MCP Tools & Constraints (technical structure)
- **Purpose**: MCP reads these to reason about UnmessMe and enforce rules during prototyping

### 3. UnmessMe MCP
- **What**: Model Context Protocol server that generates React/MUI UI prototypes
- **Where**: TBD
- **Status**: Not started
- **Must Provide**:
  - Tools: `get_bi_blueprint`, `get_ux_blueprint`, `get_ui_blueprint`, `get_accessibility_rules`, `get_ethical_guardrails`
  - Tools: `generate_screen_spec`, `generate_flow_spec`, `generate_component_spec`, `generate_react_ui_code`
  - Validation: contrast checks, touch targets, tone filters, ethical guardrails
  - Output: Deterministic JSON specs + React/JSX code (using MUI components)

### 4. Prototype Environment
- **What**: React web app for testing/demoing MCP output (real code, not simulation)
- **Where**: `/design-system/packages/prototype/` (monorepo package)
- **Status**: Not started
- **Architecture**:
  - **React app** running the actual generated JSX/MUI code
  - **Monorepo package** that imports from `@unmessme/design-system`
  - Desktop-first responsive design (dashboard benefits from screen space)
  - Hot reload enabled: MCP generates → React rebuilds → see results instantly
  - Side-by-side view: live UI preview + generated React/JSX code
  - Runs in browser—no mobile emulator needed
- **Purpose**: Conference demo environment—prompt Cursor → MCP generates → runs live in browser
- **Tech**: React + MUI + Vite, workspace linking (no npm publish during dev)
- **Bonus**: Production-ready web app, can add mobile apps later if needed

---

## How They Connect

```
Design System (MUI base + custom theme, React components, rules)
    ↓
Context Engine (blueprints encode system as machine-readable specs)
    ↓
UnmessMe MCP (reads blueprints, generates validated React/MUI UI)
    ↓
Prototype Environment (React app runs generated JSX code live)
    ↓
Demo Output (real web app in browser + production-ready React code)
```

---

## Current State

**Done:**
- ✅ Context Engine blueprints (all 7)
- ✅ Cursor project rules
- ✅ North star doc (this)

**To Build:**
- ✅ Design tokens (W3C JSON format: colors, typography, spacing, radius, elevation)
- ✅ MUI custom theme (TypeScript: palette, typography, spacing, components)
- ✅ React component specifications (MD format with JSX code: ProblemCard, TagChip, UnmessButton)
- ⬜ Monorepo structure (npm workspaces)
- ⬜ Design system package setup (`@unmessme/design-system`)
- ⬜ React component implementations (TSX files)
- ⬜ Prototype environment package (Vite + React)
- ⬜ Demo app (shows components working)
- ⬜ MCP metadata index (JSON + MD)
- ⬜ Docusaurus documentation site
- ⬜ MCP server implementation
- ⬜ MCP tool implementations (React/JSX code generation)
- ⬜ Validation logic
- ⬜ Demo examples/flows

---

## Key Constraints

### From Cursor Rules
- No file creation without explicit request
- Keep reasoning in chat
- Don't assume architecture
- Challenge bad decisions
- Be direct, technical, minimal

### From Blueprints
- All UI must pass: BI + UX + UI + Accessibility + Ethical validation
- Tag-based model (not categories)
- Max 2 clarifying questions
- Dark mode, WCAG 2.1/2.2 AA, 48x48dp touch targets
- Tone: playful, satirically unlicensed, emotionally safe
- Crisis detection → zero humor + resources
- No medical/legal/financial advice

### Product Scope
- Web app (React + MUI), conversational UI
- Desktop-first (dashboard benefits from screen space), responsive
- Flow: Dump → Clarify → Problem cards → Unmess Me → Steps → Play Mode → Dashboard
- Bento-style cards, tag chips, Material UI components
- Dark charcoal + bright accents (coral, blue, mint, lilac, yellow)
- Voice input via Web Speech API

---

## Next Actions
*Awaiting explicit direction from user*

