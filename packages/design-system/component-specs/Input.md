---
id: input
type: component
platform: web
framework: react
base: mui
category: inputs
status: implemented
---

# Input

The primary way to enter data in the Midnight Terminal.

## Purpose

To collect user input with a "command line" aesthetic.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="outlined"` | `semantic.border.subtle` (border), `semantic.bg.surface` (bg) |
| `radius` | `radius.semantic.md` (8px) |
| `font` | `typography.primitive.fontFamily.sans` (Default) or `mono` (Monospace) |
| `focus` | `semantic.action.primary` (Ring) |

## API

```tsx
interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'standard' | 'filled';
  monospace?: boolean;
}
```

## Usage

```tsx
<Input placeholder="Enter your problem..." fullWidth />
<Input monospace placeholder="API_KEY" />
```

