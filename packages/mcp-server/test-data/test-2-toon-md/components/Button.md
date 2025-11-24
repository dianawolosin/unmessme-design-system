+++
id: "button"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "inputs"
status: "implemented"
+++

# Button

The fundamental interaction element of the UnmessMe design system. A token-driven wrapper around MUI Button.

## Purpose

To trigger actions. This atom replaces ad-hoc button styling and the specialized `UnmessButton` (which will be refactored to use this).

---

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="primary"` | `semantic.action.primary` |
| `variant="secondary"` | `semantic.border.highlight` (border), Transparent (bg) |
| `variant="ghost"` | Transparent (bg), `semantic.text.secondary` (text) |
| `variant="danger"` | `semantic.status.urgent` |
| `size="md"` | `typography.semantic.label.button` |
| `radius` | `radius.semantic.md` |

---

## API

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

---

## Usage

```tsx
<Button variant="primary" onClick={doSomething}>
  Initialize Protocol
</Button>

<Button variant="ghost" size="sm">
  Cancel
</Button>
```

