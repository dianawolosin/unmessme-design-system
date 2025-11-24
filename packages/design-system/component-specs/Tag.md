---
id: tag
type: component
platform: web
framework: react
base: mui
category: data-display
status: implemented
---

# Tag

A strict implementation of the "Masking Tape" aesthetic for labeling and categorization.

## Purpose

To categorize data (problems, status) without feeling clinical.

---

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="solid"` | `semantic.bg.surface` or 20% opacity accent |
| `radius` | `radius.semantic.xs` (2px - sharp) |
| `font` | `typography.semantic.label.tag` (Monospace, Lowercase) |

---

## API

```tsx
interface TagProps {
  label: string;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'neutral' | 'brand' | 'urgent' | 'analysis' | 'success';
  size?: 'sm' | 'md';
}
```

---

## Usage

```tsx
<Tag label="urgent" color="urgent" />
<Tag label="money" color="neutral" variant="outline" />
```

