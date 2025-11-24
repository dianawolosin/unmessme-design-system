---
id: feature-card
type: component
platform: web
framework: react
base: mui
category: surfaces
status: implemented
---

# FeatureCard

A marketing-focused variant of the Surface component, used for Bento Grids and feature showcases.

## Purpose

To display product features in a visually rich, "smoked glass" container with neon accents.

## Design Principles

### UnmessMe Customizations
- **Smoked Glass:** Uses `Surface` with `variant="glass"`.
- **Neon Borders:** Top border gradient that glows on hover.
- **Hover Lift:** Physical lift + shadow intensification on hover.

---

## React Component API

```tsx
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  accent?: 'terracotta' | 'iris' | 'seafoam';
  delay?: number;
}

export function FeatureCard(props: FeatureCardProps): JSX.Element;
```

---

## Design Tokens Used

### Colors
- **Background:** `semantic.bg.surface`
- **Text:** `semantic.text.primary` (Title), `semantic.text.secondary` (Body)
- **Accents:** `semantic.status.*` (mapped from props)

### Elevation
- **Hover:** `semantic.card.focused` + colored glow

---

## Usage

```tsx
<FeatureCard
  title="Context Engines"
  description="AI that understands your design system."
  icon={<AutoAwesome />}
  accent="seafoam"
/>
```

