---
id: problem-card
type: component
platform: web
framework: react
base: mui
category: surface
status: draft
---

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
- **Elevation:** Soft shadows create hierarchy on dark backgrounds
- **Interaction:** Touch targets meet 48px minimum (WCAG 2.2 AA)
- **States:** Hover, focus, pressed states are accessible and visible

### UnmessMe Customizations

From `/Context Eng/unmess_me_ui_blueprint.md`:
- **Bento-style:** Rounded corners (16px), generous padding, modular feel
- **Dark mode first:** Charcoal surfaces with bright accent highlights
- **Playful accents:** Each card gets a unique accent color (coral, sky, mint, lilac, citrus)
- **Tag-based model:** No categories—problems use flexible, combinable tags
- **Emotional safety:** Visual design supports warm, non-clinical tone

---

## React Component API

### TypeScript Interface

```tsx
interface ProblemCardProps {
  /**
   * Problem title - max 60 characters for readability
   * Generated from user's conversational input
   * @example "Behind on bills and feeling overwhelmed"
   */
  title: string;

  /**
   * Tag array - 1-5 tags for multi-dimensional categorization
   * Uses tag-based model (not rigid categories)
   * @example ["money", "stress", "avoidance"]
   */
  tags: string[];

  /**
   * Stress score - 1-10 scale, optional
   * Visual indicator of emotional weight
   */
  stressScore?: number;

  /**
   * Accent color variant for card styling
   * Rotates through: coral, sky, mint, lilac, citrus
   * @default "coral"
   */
  accent?: 'coral' | 'sky' | 'mint' | 'lilac' | 'citrus';

  /**
   * Primary action handler - triggers "Unmess Me" flow
   * Generates structured breakdown and actionable steps
   */
  onUnmess?: () => void;

  /**
   * Optional secondary action for viewing existing plan
   */
  onViewPlan?: () => void;

  /**
   * Card click handler for navigation to problem detail
   */
  onClick?: () => void;

  /**
   * Accessibility label override
   * Auto-generated if not provided
   */
  ariaLabel?: string;
}

export function ProblemCard({
  title,
  tags,
  stressScore,
  accent = 'coral',
  onUnmess,
  onViewPlan,
  onClick,
  ariaLabel,
}: ProblemCardProps): JSX.Element;
```

---

## MUI Components Used

Built by extending and composing MUI Material 3 components:

- **[`Card`](https://mui.com/material-ui/react-card/)** - Base container
- **[`CardContent`](https://mui.com/material-ui/api/card-content/)** - Content wrapper with padding
- **[`CardActions`](https://mui.com/material-ui/api/card-actions/)** - Action button container
- **[`Typography`](https://mui.com/material-ui/react-typography/)** - Title and metadata text
- **[`Chip`](https://mui.com/material-ui/react-chip/)** - Tag chips (pill-shaped)
- **[`Button`](https://mui.com/material-ui/react-button/)** - "Unmess Me" primary action
- **[`Box`](https://mui.com/material-ui/react-box/)** - Layout and spacing utilities
- **[`Stack`](https://mui.com/material-ui/react-stack/)** - Horizontal tag chip arrangement

---

## Design Tokens Used

References tokens from `/design-system/tokens/`:

### Colors (`colors.json`)
- **Background:** `color.surface.card` (#2C2C2E) - warm charcoal
- **Accent (coral):** `color.accent.coral` (#FF6B6B) - default accent
- **Accent (sky):** `color.accent.sky` (#4DA3FF) - alternate accent
- **Accent (mint):** `color.accent.mint` (#4ECDC4) - alternate accent
- **Accent (lilac):** `color.accent.lilac` (#A78BFA) - alternate accent
- **Accent (citrus):** `color.accent.citrus` (#FCD34D) - alternate accent
- **Text:** `color.text.primary` (#FFFFFF), `color.text.secondary` (#B3B3B3)
- **Border:** `color.border.default` (#3A3A3C)

### Typography (`typography.json`)
- **Title:** `typography.fontSize.h4` (1.5rem / 24px), `typography.fontWeight.semibold` (600)
- **Tags:** `typography.fontSize.label` (0.75rem / 12px), `typography.fontWeight.medium` (500)
- **Metadata:** `typography.fontSize.body-sm` (0.875rem / 14px)

### Spacing (`spacing.json`)
- **Card padding:** `spacing.lg` (24px)
- **Tag gaps:** `spacing.xs` (8px)
- **Title margin:** `spacing.sm` (12px)
- **Touch target:** `spacing.touchTarget.minimum` (48px) for buttons/chips

### Radius (`radius.json`)
- **Card corners:** `radius.lg` (16px) - bento-style signature
- **Tag chips:** `radius.pill` (9999px) - fully rounded

### Elevation (`elevation.json`)
- **Card shadow:** `elevation.md` (0 2px 8px 0 rgba(0, 0, 0, 0.6))
- **Hover state:** `elevation.lg` (0 4px 16px 0 rgba(0, 0, 0, 0.7))

---

## Accessibility Requirements

Per `/Context Eng/unmess_me_accessibility_blueprint.md`:

### WCAG 2.2 AA Compliance
- ✅ **Contrast:** Title text vs background ≥ 4.5:1
- ✅ **Touch targets:** All interactive elements ≥ 48x48px
- ✅ **Focus indicators:** Visible focus ring with 3:1 contrast
- ✅ **Keyboard navigation:** Tab through card, chips, button
- ✅ **Screen readers:** Semantic HTML, ARIA labels

### Implementation Details

```tsx
// Semantic structure
<Card
  role="article"
  aria-label={ariaLabel || `Problem: ${title}. Tags: ${tags.join(', ')}`}
  tabIndex={onClick ? 0 : undefined}
  onClick={onClick}
  onKeyDown={(e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  }}
>
  {/* Card content */}
</Card>

// Tag chips with proper roles
<Chip
  label={tag}
  role="button"
  tabIndex={0}
  aria-label={`Tag: ${tag}`}
/>

// Primary action button
<Button
  onClick={onUnmess}
  aria-label="Start unmess process"
  sx={{ minHeight: 48, minWidth: 48 }}
>
  Unmess Me
</Button>
```

### States
- **Default:** Card background, visible border
- **Hover:** Elevated shadow, accent border glow
- **Focus:** Sky blue focus ring (3px)
- **Pressed:** Inner shadow, accent darkens
- **Disabled:** Reduced opacity, no interaction

---

## Usage Examples

### Basic Problem Card

```tsx
import { ProblemCard } from '@unmessme/design-system';

<ProblemCard
  title="Behind on bills and feeling overwhelmed"
  tags={["money", "stress", "avoidance"]}
  accent="coral"
  onUnmess={() => console.log('Start unmess flow')}
/>
```

### With Stress Score

```tsx
<ProblemCard
  title="Boss conflict at work"
  tags={["work", "relationships", "anxiety"]}
  stressScore={8}
  accent="lilac"
  onUnmess={handleUnmess}
  onViewPlan={handleViewPlan}
/>
```

### Dashboard Grid Layout

```tsx
import { Grid } from '@mui/material';
import { ProblemCard } from '@unmessme/design-system';

const problems = [
  { id: 1, title: "Sleep schedule falling apart", tags: ["health", "habits"], accent: "mint" },
  { id: 2, title: "Avoiding difficult conversation", tags: ["relationships", "avoidance"], accent: "coral" },
  { id: 3, title: "Too many tasks piling up", tags: ["work", "overwhelm"], accent: "sky" },
];

<Grid container spacing={3}>
  {problems.map((problem, index) => (
    <Grid item xs={12} sm={6} md={4} key={problem.id}>
      <ProblemCard
        title={problem.title}
        tags={problem.tags}
        accent={problem.accent}
        onUnmess={() => handleUnmess(problem.id)}
        onClick={() => navigate(`/problem/${problem.id}`)}
      />
    </Grid>
  ))}
</Grid>
```

### Accessible Navigation

```tsx
// Screen reader announces: "Problem: Behind on bills. Tags: money, stress, avoidance"
<ProblemCard
  title="Behind on bills"
  tags={["money", "stress", "avoidance"]}
  ariaLabel="Problem: Behind on bills. Stress level high. Tags: money, stress, avoidance."
  onUnmess={handleUnmess}
/>
```

---

## Behavior & Interaction

### Click/Tap Behavior
- **Card body:** Navigates to problem detail view (optional `onClick`)
- **Tag chips:** Filter dashboard by tag (optional per-chip handlers)
- **"Unmess Me" button:** Triggers problem breakdown flow
- **"View Plan" button:** Opens existing plan (if available)

### Hover States
- **Desktop:** Elevated shadow, subtle accent glow, cursor pointer
- **Mobile:** No hover (prevents sticky hover on touch devices)

### Focus States
- **Keyboard navigation:** Tab order: Card → Chips → Buttons
- **Focus ring:** Sky blue, 3px, 3:1 contrast vs background

### Loading States
- **Skeleton:** Shows card outline while loading data
- **Disabled:** Reduced opacity, no interaction during async operations

---

## Visual Specifications

### Dimensions
- **Min width:** 280px (mobile)
- **Max width:** 400px (desktop grid)
- **Height:** Auto (content-based)
- **Aspect ratio:** None (flows with content)

### Padding & Spacing
- **Card padding:** 24px (all sides)
- **Title margin-bottom:** 12px
- **Tag gap:** 8px (horizontal)
- **Button margin-top:** 16px

### Typography
- **Title:** 24px (1.5rem), semibold (600), line-height 1.2
- **Tags:** 12px (0.75rem), medium (500), uppercase
- **Metadata:** 14px (0.875rem), regular (400)

### Colors (Dark Mode)
- **Background:** #2C2C2E (warm charcoal)
- **Text:** #FFFFFF (primary), #B3B3B3 (secondary)
- **Border:** #3A3A3C (subtle)
- **Accent overlay:** 10% opacity on card top edge

---

## Content Guidelines

From `/Context Eng/unmess_me_content_blueprint.md`:

### Problem Titles
- **Length:** 3-6 words, max 60 characters
- **Tone:** Casual, not clinical, not dramatic
- **Examples:**
  - ✅ "Behind on bills"
  - ✅ "Boss conflict stuff"
  - ✅ "Sleep falling apart"
  - ❌ "Severe Financial Crisis Situation" (too clinical/dramatic)

### Tag Labels
- **Format:** Lowercase, 1-2 words
- **Readable aloud:** Screen reader friendly
- **Common tags:** money, work, stress, avoidance, relationships, health, habits, time pressure, confidence, overwhelm

### Microcopy
- **Primary button:** "Unmess Me" (playful, action-oriented)
- **Secondary button:** "View Plan" (clear, functional)
- **Empty state:** "No problems yet — lucky you!" (warm, light)

---

## Ethical & Safety Considerations

Per `/Context Eng/unmess_me_ethical_guardrails_blueprint.md`:

### Tone Safety
- ✅ **Playful but respectful:** Never mock user's struggles
- ✅ **Non-clinical:** Avoid diagnostic language
- ✅ **Emotionally safe:** Visual design supports, doesn't overwhelm

### Crisis Detection
- If problem suggests self-harm/severe distress:
  - Card accent changes to neutral (no bright colors)
  - "Unmess Me" button replaced with "Get Support"
  - Disclaimer visible: "This needs professional help"

### Disclaimers
- Visible on cards tagged with emotional distress
- "UnmessMe is not medical or professional advice"

---

## Implementation Notes

### Theme Integration

Uses UnmessMe theme (`/design-system/src/theme/`):

```tsx
import { useTheme } from '@mui/material/styles';
import { customAccents } from '@unmessme/design-system/theme';

const theme = useTheme();
const accentColor = customAccents[accent]; // Gets coral, sky, mint, etc.
```

### Responsive Behavior

```tsx
// Mobile: Full width, stacked layout
// Tablet: 2 columns
// Desktop: 3 columns (max-width: 1280px container)

<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',              // Mobile
      sm: 'repeat(2, 1fr)',   // Tablet
      md: 'repeat(3, 1fr)',   // Desktop
    },
    gap: 3,
  }}
>
  {/* Problem cards */}
</Box>
```

### Performance Considerations
- **Virtualization:** Use `react-window` for 50+ cards
- **Lazy loading:** Load cards as user scrolls
- **Memoization:** Memoize card components to prevent re-renders

---

## Related Components

- **TagChip** - Individual tag display and filtering
- **ChatBubble** - Conversational message display
- **UnmessButton** - Primary action FAB
- **DashboardSection** - Layout container for card grids
- **FilterChipBar** - Tag filtering controls

---

## References

- [Material Design 3 - Cards](https://m3.material.io/components/cards/overview)
- [MUI Card Component](https://mui.com/material-ui/react-card/)
- [MUI Chip Component](https://mui.com/material-ui/react-chip/)
- [WCAG 2.2 AA Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- UnmessMe UI Blueprint: `/Context Eng/unmess_me_ui_blueprint.md`
- UnmessMe Accessibility Blueprint: `/Context Eng/unmess_me_accessibility_blueprint.md`
- UnmessMe Content Blueprint: `/Context Eng/unmess_me_content_blueprint.md`
- UnmessMe Ethical Guardrails: `/Context Eng/unmess_me_ethical_guardrails_blueprint.md`

---

## Status

**Draft** - Component spec defined, implementation pending.

**Next Steps:**
1. Create `ProblemCard.tsx` implementation
2. Build Storybook stories for all states/variants
3. Add unit tests (Jest + React Testing Library)
4. Validate with axe DevTools (accessibility)
5. Create MCP metadata file (`ProblemCard.json`)

---

**Last Updated:** 2025-01-23  
**Version:** 1.0.0 (draft)  
**Maintainer:** UnmessMe Design System Team

