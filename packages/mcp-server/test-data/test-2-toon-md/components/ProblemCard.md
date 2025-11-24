+++
id: "problem-card"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "surfaces"
status: "implemented"
+++

# ProblemCard

A bento-style card component for displaying user problems with tags, metadata, and primary actions. The cornerstone of UnmessMe's conversational problem-solving interface.

## Purpose

ProblemCard transforms chaotic emotional dumps into structured, actionable representations. Each card shows:
- Problem title (generated from user input)
- 1-5 tag chips (multi-dimensional categorization)
- Dimension scores (stress, urgency, effort indicators)
- Primary action: "Unmess Me" button

Cards appear in the dashboard's bento grid layout, each with its own accent color for visual organization and delight.

---

## Design Principles

### Material Design 3 Foundation
Based on [Material Design 3 Cards](https://m3.material.io/components/cards/overview):
- **Containment:** Clear boundaries separate content from surrounding UI
- **Interaction:** Touch targets meet 48px minimum (WCAG 2.2 AA)

### UnmessMe Customizations
From `/context-engine/unmess_me_ui_blueprint.md`:
- **Bento-style:** Rounded corners (16px), generous padding, modular feel
- **Glassmorphism:** Smoked glass surface with `backdrop-filter`
- **Playful accents:** Each card gets a unique semantic accent color
- **Physics:** Slight random rotation on mount, snaps to grid on hover

---

## React Component API

### TypeScript Interface

```tsx
interface ProblemCardProps {
  title: string;
  tags: string[];
  stressScore?: number;
  accent?: 'urgent' | 'analysis' | 'success' | 'neutral';
  onUnmess?: () => void;
  onViewPlan?: () => void;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export function ProblemCard(props: ProblemCardProps): JSX.Element;
```

---

## MUI Components Used

Built by extending and composing MUI Material 3 components:

- **[`Surface`](./Surface.md)** - Base glass container (replaces Card)
- **[`CardContent`](https://mui.com/material-ui/api/card-content/)** - Content wrapper
- **[`Typography`](https://mui.com/material-ui/react-typography/)** - Title and metadata
- **[`Tag`](./Tag.md)** - Tag chips (replaces Chip)
- **[`Button`](./Button.md)** - "Unmess Me" primary action

---

## Design Tokens Used

References tokens from `/design-system/tokens/`:

### Colors (`colors.json`)
- **Background:** `semantic.bg.surface` (glass)
- **Accent:** `semantic.status.*` (urgent, analysis, success)
- **Text:** `semantic.text.primary`, `semantic.text.secondary`
- **Border:** `semantic.border.highlight`

### Typography (`typography.json`)
- **Title:** `semantic.heading.display` (Fraunces)
- **Tags:** `semantic.label.button` (JetBrains Mono)

### Elevation (`elevation.json`)
- **Rest:** `semantic.card.rest` (Medium shadow)
- **Focused:** `semantic.card.focused` (Heavy monochromatic shadow)

---

## Accessibility Requirements

Per `/context-engine/unmess_me_accessibility_blueprint.md`:

### WCAG 2.2 AA Compliance
- ✅ **Contrast:** Title text vs background ≥ 4.5:1
- ✅ **Touch targets:** All interactive elements ≥ 48x48px
- ✅ **Focus indicators:** Visible focus ring with 3:1 contrast
- ✅ **Keyboard navigation:** Tab through card, chips, button
- ✅ **Screen readers:** Semantic HTML, ARIA labels

---

## Usage Examples

### Basic Problem Card

```tsx
import { ProblemCard } from '@unmessme/design-system';

<ProblemCard
  title="Behind on bills and feeling overwhelmed"
  tags={["money", "stress", "avoidance"]}
  accent="urgent"
  onUnmess={() => console.log('Start unmess flow')}
/>
```

### With Stress Score

```tsx
<ProblemCard
  title="Boss conflict at work"
  tags={["work", "relationships"]}
  stressScore={8}
  accent="analysis"
  onUnmess={handleUnmess}
/>
```

### Dashboard Grid Layout

```tsx
<Grid container spacing={3}>
  {problems.map((problem) => (
    <Grid item xs={12} sm={6} md={4} key={problem.id}>
      <ProblemCard
        title={problem.title}
        tags={problem.tags}
        accent={problem.accent}
        onUnmess={() => handleUnmess(problem.id)}
      />
    </Grid>
  ))}
</Grid>
```

---

## Related Components

- **Tag** - Individual tag display
- **Button** - Primary action
- **Surface** - The glass container

---

## Status

**Implemented** - V3 spec compliant.

**Maintainer:** UnmessMe Design System Team
