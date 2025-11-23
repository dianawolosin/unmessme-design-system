# @unmessme/prototype

> UnmessMe Prototype Environment - Live demo app for design system testing and MCP output

## Overview

This is the prototype environment for UnmessMe—a React web app that:
1. **Imports** components from `@unmessme/design-system`
2. **Renders** MCP-generated UI code
3. **Demos** the design system at conferences
4. **Validates** design decisions with real, working code

## Quick Start

From the workspace root:

```bash
# Install dependencies
npm install

# Start dev server (this prototype)
npm run dev

# Or from this package directory
cd packages/prototype
npm run dev
```

Server runs at: http://localhost:3000

## Architecture

**Monorepo Setup:**
```
/packages/
  design-system/     ← The library (@unmessme/design-system)
  prototype/         ← This app (imports from design-system)
```

**How It Works:**
- npm workspaces automatically link the packages
- Changes to design-system hot-reload in the prototype
- No npm publish needed during development

## MCP Integration

This app serves as the **rendering environment** for MCP-generated code:

1. **User prompts Cursor AI:** "Create a problem card screen"
2. **MCP generates React/JSX code:** Uses design system components
3. **Code gets dropped here:** Live hot reload
4. **Result:** Instant visual feedback

## Conference Demo

**Goal:** Show AI-powered UI generation from design system blueprints

**Demo Flow:**
1. Open this prototype (live in browser)
2. Prompt Cursor with user story
3. MCP generates validated React code
4. Code appears instantly in the app
5. 🎉 Mind = blown

## Scripts

- `npm run dev` - Start dev server (hot reload enabled)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Lint TypeScript/React code
- `npm run typecheck` - Type checking only

## Tech Stack

- **Vite** - Lightning-fast dev server + HMR
- **React 18** - Latest features
- **TypeScript** - Type safety
- **MUI** - Via @unmessme/design-system
- **npm workspaces** - Monorepo linking

## Status

✅ Monorepo structure complete
✅ Theme integration working
⬜ Component implementations coming
⬜ MCP integration pending
⬜ Demo flows to be created

## License

MIT © UnmessMe

