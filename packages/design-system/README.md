# @unmessme/design-system

> UnmessMe Design System - MUI wrapper with custom dark-mode-first theme

## Overview

This is the UnmessMe design system, a custom Material UI (MUI) wrapper designed for the UnmessMe conversational problem-solving app. Built with React, TypeScript, and following Material Design 3 principles.

## Key Features

- 🌙 **Dark mode first** - Optimized for extended use
- 🎨 **Custom MUI theme** - Deep charcoal base + bright accent colors
- 📐 **W3C Design Tokens** - Machine-readable JSON format
- ♿ **WCAG 2.2 AA** - Full accessibility compliance
- 🤖 **AI-ready** - Structured for MCP consumption
- 📦 **Enterprise-scale** - Built for hundreds of designers/engineers

## Installation

```bash
npm install @unmessme/design-system
```

**Peer dependencies:**
```bash
npm install @mui/material @emotion/react @emotion/styled react react-dom
```

## Quick Start

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { unmessTheme, ProblemCard, TagChip, UnmessButton } from '@unmessme/design-system';

function App() {
  return (
    <ThemeProvider theme={unmessTheme}>
      <CssBaseline />
      <ProblemCard
        title="Organize project files"
        tags={['work', 'deadline', 'tech']}
        timestamp={new Date()}
      />
      <UnmessButton onClick={() => console.log('Unmessing...')} />
    </ThemeProvider>
  );
}
```

## Components

### Core Components (In Progress)
- **ProblemCard** - Bento-style problem representation
- **TagChip** - Tag system (display/filter/input variants)
- **UnmessButton** - Primary action FAB with micro-interactions
- **ChatBubble** - Coming soon
- **FilterChipBar** - Coming soon

## Design Tokens

Access design tokens directly:

```tsx
import colors from '@unmessme/design-system/tokens/colors.json';
import spacing from '@unmessme/design-system/tokens/spacing.json';
```

## Architecture

This package is part of a monorepo workspace using npm workspaces:
- Built with Vite + TypeScript
- Extends MUI's component library
- Follows W3C Design Token spec
- Machine-readable for AI/MCP consumption

## Documentation

Full documentation available at: [Coming soon - Docusaurus site]

## License

MIT © UnmessMe

