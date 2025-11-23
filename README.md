# UnmessMe Design System

> **Google-style monorepo** for the UnmessMe design system, MCP integration, and prototype environment

## 🎯 Project Goal

Build a machine-readable design system for **Into Design Systems Vibe Coding Conference 2025 demo** showcasing AI-powered UI generation through Model Context Protocol (MCP).

## 📦 Monorepo Structure

```
UnmessMe Design System/
├── packages/
│   ├── design-system/          @unmessme/design-system
│   │   ├── tokens/              W3C Design Tokens (JSON)
│   │   ├── src/
│   │   │   ├── theme/          MUI custom theme
│   │   │   ├── components/     React components (TSX)
│   │   │   └── index.ts        Main exports
│   │   ├── components/         Component specs (MD)
│   │   └── package.json
│   │
│   └── prototype/              @unmessme/prototype
│       ├── src/                Demo app
│       └── package.json
│
├── Context Eng/                7 Blueprints (Product logic)
├── ai/                         AI instructions & roadmap
├── package.json               Workspace config
└── tsconfig.json              Shared TypeScript config
```

## 🏗️ Architecture (4 Pillars)

### 1. Design System (`packages/design-system/`)
- **MUI wrapper** with custom dark-mode-first theme
- **W3C Design Tokens** (JSON format)
- **Publishable npm package** (`@unmessme/design-system`)
- Built with: React, TypeScript, Vite, Material UI

### 2. Context Engine (`Context Eng/`)
- **7 Blueprints** defining product logic, constraints, and rules:
  - Business Intelligence
  - UX Blueprint
  - UI Blueprint
  - Content Blueprint
  - Accessibility Blueprint
  - Ethical Guardrails
  - MCP Tools & Constraints

### 3. UnmessMe MCP (To Build)
- **Reads:** Design system + Context Engine
- **Generates:** Validated React/JSX code
- **Output:** Uses `@unmessme/design-system` components

### 4. Prototype Environment (`packages/prototype/`)
- **React web app** for live demos
- **Imports** from design system package
- **Renders** MCP-generated code
- **Desktop-first** responsive design

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

This installs all packages and automatically links the workspace packages.

### Development

```bash
# Start prototype app (includes design system via workspace link)
npm run dev

# Or run from specific package
npm run dev --workspace=@unmessme/prototype
```

### Build

```bash
# Build everything
npm run build

# Build design system only
npm run build:ds

# Build prototype only
npm run build:prototype
```

## 📚 Current Status

**✅ Complete:**
- Monorepo structure (npm workspaces)
- Design tokens (5 files: colors, typography, spacing, radius, elevation)
- MUI custom theme (TypeScript configuration)
- Component specs (3 files: ProblemCard, TagChip, UnmessButton)
- Prototype app scaffolding

**⬜ To Build:**
- Component implementations (TSX files)
- MCP metadata index (JSON + MD)
- Docusaurus documentation site
- MCP server implementation
- Demo flows

## 🎨 Design System Features

- 🌙 **Dark mode first** - Deep charcoal + bright accents
- 📐 **W3C Design Tokens** - Machine-readable JSON
- ♿ **WCAG 2.2 AA** - Full accessibility compliance
- 🤖 **AI-ready** - Structured for MCP consumption
- 📦 **Enterprise-scale** - Built for hundreds of users
- 🎯 **Material Design 3** - Following MD3 principles

## 🛠️ Tech Stack

**Design System:**
- React 18
- TypeScript
- Material UI (MUI) 5
- Vite (build tool)
- W3C Design Token spec

**Prototype:**
- React 18
- TypeScript
- Vite (dev server)
- Hot module replacement

**Monorepo:**
- npm workspaces (native, no extra tools)
- Shared TypeScript config
- Workspace linking (no npm publish needed during dev)

## 📖 Documentation

- **Project Roadmap:** `ai/project_north_star.md`
- **AI Instructions:** `ai/.cursorrules`
- **Blueprints:** `Context Eng/` (7 files)
- **Component Specs:** `packages/design-system/components/` (MD format)
- **Design Tokens:** `packages/design-system/tokens/` (JSON format)

## 🎤 Conference Demo Flow

1. Open prototype environment (live in browser)
2. Prompt Cursor AI: *"Create a problem card screen with tags"*
3. MCP reads design system + blueprints
4. MCP generates validated React/JSX code
5. Code renders instantly in prototype
6. 🎉 **Result:** AI-generated, design-system-compliant UI

## 🧠 Why Monorepo?

**Google uses this approach** for all their code (Gmail, YouTube, Chrome—one repo).

**Benefits for UnmessMe:**
- **Workspace linking:** Prototype imports design system locally
- **No npm publish during dev:** Fast iteration
- **Proper separation:** Clear package boundaries
- **Enterprise-ready:** Scalable for hundreds of users
- **Conference-worthy:** Professional architecture to demo

## 📦 Package Exports

### `@unmessme/design-system`

```typescript
import { 
  unmessTheme,           // Main MUI theme
  ThemeProvider,         // MUI exports
  CssBaseline,
  // Components (coming soon):
  // ProblemCard,
  // TagChip,
  // UnmessButton,
} from '@unmessme/design-system';
```

### Design Tokens

```typescript
import colors from '@unmessme/design-system/tokens/colors.json';
import spacing from '@unmessme/design-system/tokens/spacing.json';
```

## 🤝 Contributing

This is currently a solo project for the Into Design Systems Vibe Coding Conference 2025 demo. Once published, it will support hundreds of product designers and engineers.

## 📄 License

MIT © UnmessMe

---

**Built with Google-style monorepo architecture** 🚀

