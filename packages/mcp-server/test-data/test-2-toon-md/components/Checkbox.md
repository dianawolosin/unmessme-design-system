+++
id: "checkbox"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "inputs"
status: "implemented"
+++

# Checkbox

A binary selection control.

## Purpose

To select one or multiple items from a set.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `color="primary"` | `semantic.action.primary` |
| `unchecked` | `semantic.border.highlight` |
| `shape` | `radius.semantic.xs` (Sharp/Mechanical) |

## API

```tsx
interface CheckboxProps extends MuiCheckboxProps {
  color?: 'primary' | 'secondary' | 'success' | 'default';
}
```

## Usage

```tsx
<Checkbox checked={checked} onChange={handleChange} />
```

