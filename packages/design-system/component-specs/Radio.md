---
id: radio
type: component
platform: web
framework: react
base: mui
category: inputs
status: implemented
---

# Radio

Exclusive selection control.

## Purpose

To select exactly one option from a list.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `color="primary"` | `semantic.action.primary` |
| `unchecked` | `semantic.border.highlight` |

## API

```tsx
interface RadioProps extends MuiRadioProps {
  color?: 'primary' | 'secondary' | 'success' | 'default';
}
```

## Usage

```tsx
<Radio checked={selected} onChange={handleChange} />
```

