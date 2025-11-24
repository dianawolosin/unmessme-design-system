---
id: surface
type: component
platform: web
framework: react
base: mui
category: surfaces
status: implemented
---

# Surface

The foundational container for the "Digital Noir" glassmorphism look.

## Purpose

To provide a consistent background, border, and blur effect for cards and panels.

---

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="glass"` | `semantic.bg.surface`, `backdropFilter: blur(16px)` |
| `border` | `semantic.border.subtle` |
| `radius` | `radius.semantic.lg` (16px) |

---

## API

```tsx
interface SurfaceProps {
  variant?: 'glass' | 'solid' | 'subtle';
  elevation?: 'flat' | 'raised' | 'floating';
  children: React.ReactNode;
}
```

---

## Usage

```tsx
<Surface>
  <Typography>Content inside glass</Typography>
</Surface>
```

