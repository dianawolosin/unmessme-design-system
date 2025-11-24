+++
id: "icon"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "data-display"
status: "implemented"
+++

# Icon

Wrapper for SVG icons.

## Purpose

To enforce sizing and semantic coloring for icons.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `size="md"` | `24px` |
| `color` | Inherits or accepts semantic token |

## API

```tsx
interface IconProps extends SvgIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}
```

## Usage

```tsx
<Icon size="lg" color={tokens.color.semantic.status.urgent}>
  <WarningIcon />
</Icon>
```

