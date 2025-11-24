+++
id: "divider"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "layout"
status: "implemented"
+++

# Divider

Visual separation element.

## Purpose

To visually separate content sections, especially in "receipt" style layouts.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="dashed"` | `border-bottom: 1px dashed` |
| `intensity="subtle"` | `semantic.border.subtle` |

## API

```tsx
interface DividerProps extends MuiDividerProps {
  variant?: 'solid' | 'dashed';
  intensity?: 'subtle' | 'highlight' | 'bold';
}
```

## Usage

```tsx
<Divider variant="dashed" />
```

