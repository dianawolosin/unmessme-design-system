---
id: tooltip
type: component
platform: web
framework: react
base: mui
category: data-display
status: implemented
---

# Tooltip

Micro-context provider.

## Purpose

To explain UI elements on hover.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `bg` | `semantic.bg.surface` |
| `border` | `semantic.border.subtle` |
| `font` | `typography.primitive.fontFamily.mono` |

## API

```tsx
interface TooltipProps extends MuiTooltipProps {
  title: React.ReactNode;
}
```

## Usage

```tsx
<Tooltip title="Help text">
  <Button>Hover me</Button>
</Tooltip>
```

