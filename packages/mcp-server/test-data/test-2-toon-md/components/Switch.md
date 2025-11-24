+++
id: "switch"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "inputs"
status: "implemented"
+++

# Switch

A toggle for activating or deactivating a state.

## Purpose

To switch between two mutually exclusive states (On/Off).

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `color="primary"` | `semantic.action.primary` |
| `track` | `semantic.border.highlight` |

## API

```tsx
interface SwitchProps extends MuiSwitchProps {
  color?: 'primary' | 'secondary' | 'success' | 'default';
}
```

## Usage

```tsx
<Switch checked={isDark} onChange={toggleTheme} />
```

