---
id: tag-chip
type: component
platform: web
framework: react
base: mui
category: input
status: draft
---

# TagChip

A pill-shaped chip component for displaying and interacting with tags. Core building block of UnmessMe's tag-based problem categorization system. Used in problem cards, filter bars, and throughout the dashboard.

## Purpose

TagChip represents individual tags in UnmessMe's flexible, non-hierarchical tagging system. Unlike rigid categories, tags are:
- **Combinable** - Problems can have 1-5 tags
- **Expressive** - Human-readable, conversational labels
- **Filterable** - Click to filter dashboard by tag
- **Multi-dimensional** - Captures emotional + practical aspects

Tags transform chaos into organized, searchable, delightful structure.

---

## Design Principles

### Material Design 3 Foundation

Based on [Material Design 3 Chips](https://m3.material.io/components/chips/overview):
- **Types:** Input chip (removable), Filter chip (toggleable), Assist chip (action)
- **Shape:** Pill-shaped (fully rounded ends)
- **Interaction:** Tap/click for filtering, optional close icon for removal
- **States:** Default, hover, focus, selected, disabled

### UnmessMe Customizations

From `/Context Eng/unmess_me_ui_blueprint.md`:
- **Pill chips:** Fully rounded (9999px radius) for playful, friendly feel
- **Bright accents:** Use UnmessMe's accent colors (coral, sky, mint, lilac, citrus)
- **48px touch targets:** Accessibility first (even though chips are small visually)
- **Tag-based model:** No categories - flexible, human tags only

---

## React Component API

### TypeScript Interface

```tsx
interface TagChipProps {
  /**
   * Tag label - 1-2 words, lowercase, screen-reader friendly
   * @example "money", "work stress", "avoidance"
   */
  label: string;

  /**
   * Variant determines behavior and styling
   * - "input": Removable chip with close icon (problem card editing)
   * - "filter": Toggleable chip for filtering (dashboard)
   * - "display": Static chip, no interaction (read-only views)
   * @default "display"
   */
  variant?: 'input' | 'filter' | 'display';

  /**
   * Color variant - uses UnmessMe accent colors
   * @default "default" (neutral gray)
   */
  color?: 'default' | 'coral' | 'sky' | 'mint' | 'lilac' | 'citrus';

  /**
   * Selected state - for filter chips
   * Visually indicates active filter
   */
  selected?: boolean;

  /**
   * Size variant
   * @default "medium"
   */
  size?: 'small' | 'medium';

  /**
   * Click handler - for filtering or navigation
   */
  onClick?: () => void;

  /**
   * Delete handler - for input chips (removable tags)
   */
  onDelete?: () => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Icon override (optional)
   * Default: no icon for display, close icon for input
   */
  icon?: React.ReactElement;

  /**
   * Accessibility label override
   * Auto-generated if not provided
   */
  ariaLabel?: string;
}

export function TagChip({
  label,
  variant = 'display',
  color = 'default',
  selected = false,
  size = 'medium',
  onClick,
  onDelete,
  disabled = false,
  icon,
  ariaLabel,
}: TagChipProps): JSX.Element;
```

---

## MUI Components Used

Built by extending MUI Chip:

- **[`Chip`](https://mui.com/material-ui/react-chip/)** - Base component (all chip functionality)
- **[`Box`](https://mui.com/material-ui/react-box/)** - Wrapper for custom spacing/layout (optional)

That's it! Chip is self-contained and highly configurable through MUI's API.

---

## Design Tokens Used

References tokens from `/design-system/tokens/`:

### Colors (`colors.json`)
- **Default background:** `color.surface.elevated` (#383838) - neutral
- **Coral:** `color.accent.coral` (#FF6B6B)
- **Sky:** `color.accent.sky` (#4DA3FF)
- **Mint:** `color.accent.mint` (#4ECDC4)
- **Lilac:** `color.accent.lilac` (#A78BFA)
- **Citrus:** `color.accent.citrus` (#FCD34D)
- **Text on accent:** `color.text.on-accent` (#FFFFFF)
- **Border (selected):** `color.border.focus` (#4DA3FF)

### Typography (`typography.json`)
- **Label:** `typography.fontSize.label` (0.75rem / 12px)
- **Font weight:** `typography.fontWeight.medium` (500)
- **Letter spacing:** `typography.letterSpacing.wide` (0.05em)

### Spacing (`spacing.json`)
- **Padding (medium):** `spacing.xs` (8px horizontal), `spacing.xxs` (4px vertical)
- **Padding (small):** `spacing.xxs` (4px horizontal), `spacing.xxs` (4px vertical)
- **Touch target:** `spacing.touchTarget.minimum` (48px) - with margin/padding
- **Gap between chips:** `spacing.xs` (8px)

### Radius (`radius.json`)
- **Shape:** `radius.pill` (9999px) - fully rounded ends

### Elevation (`elevation.json`)
- **Default:** `elevation.sm` (0 1px 2px 0 rgba(0, 0, 0, 0.5))
- **Selected:** `elevation.md` (0 2px 8px 0 rgba(0, 0, 0, 0.6))

---

## Accessibility Requirements

Per `/Context Eng/unmess_me_accessibility_blueprint.md`:

### WCAG 2.2 AA Compliance
- ✅ **Touch targets:** 48x48px minimum (achieved with padding/margin)
- ✅ **Contrast:** Label vs background ≥ 4.5:1
- ✅ **Keyboard navigation:** Tab to focus, Enter/Space to activate
- ✅ **Screen readers:** ARIA role="button" for interactive chips
- ✅ **Focus indicators:** Visible focus ring

### Implementation Details

```tsx
// Display chip (read-only)
<Chip
  label="money"
  aria-label="Tag: money"
  sx={{ minHeight: 32, padding: '4px 8px' }}
/>

// Filter chip (toggleable)
<Chip
  label="work"
  role="button"
  aria-pressed={selected}
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  sx={{
    minHeight: 32,
    '&:focus-visible': {
      outline: '3px solid rgba(77, 163, 255, 0.4)', // Focus glow
      outlineOffset: 2,
    }
  }}
/>

// Input chip (removable)
<Chip
  label="stress"
  onDelete={handleDelete}
  deleteIcon={<CloseIcon aria-label="Remove stress tag" />}
  aria-label="Tag: stress. Press delete to remove."
/>
```

### States
- **Default:** Neutral background, subtle shadow
- **Hover:** Elevated shadow, slight scale (1.02)
- **Focus:** Sky blue focus ring (3px, 3:1 contrast)
- **Selected:** Border, elevated shadow, accent background
- **Disabled:** Reduced opacity (0.5), no interaction

---

## Usage Examples

### Display Chips (Read-Only)

```tsx
import { TagChip } from '@unmessme/design-system';

// In a problem card
<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
  <TagChip label="money" color="coral" />
  <TagChip label="stress" color="sky" />
  <TagChip label="avoidance" color="mint" />
</Box>
```

### Filter Chips (Interactive)

```tsx
import { Stack } from '@mui/material';
import { TagChip } from '@unmessme/design-system';

const [selectedTags, setSelectedTags] = useState<string[]>([]);

const handleToggle = (tag: string) => {
  setSelectedTags(prev =>
    prev.includes(tag)
      ? prev.filter(t => t !== tag)
      : [...prev, tag]
  );
};

<Stack direction="row" spacing={1} flexWrap="wrap">
  <TagChip
    label="money"
    variant="filter"
    selected={selectedTags.includes('money')}
    onClick={() => handleToggle('money')}
  />
  <TagChip
    label="work"
    variant="filter"
    selected={selectedTags.includes('work')}
    onClick={() => handleToggle('work')}
  />
  <TagChip
    label="relationships"
    variant="filter"
    selected={selectedTags.includes('relationships')}
    onClick={() => handleToggle('relationships')}
  />
</Stack>
```

### Input Chips (Removable)

```tsx
// Problem editing - user can remove tags
const [tags, setTags] = useState(['money', 'stress', 'avoidance']);

const handleDelete = (tagToDelete: string) => {
  setTags(tags.filter(tag => tag !== tagToDelete));
};

<Stack direction="row" spacing={1}>
  {tags.map(tag => (
    <TagChip
      key={tag}
      label={tag}
      variant="input"
      color="coral"
      onDelete={() => handleDelete(tag)}
    />
  ))}
</Stack>
```

### With Color Rotation

```tsx
// Rotate through accent colors for visual variety
const accentColors = ['coral', 'sky', 'mint', 'lilac', 'citrus'] as const;

<Box sx={{ display: 'flex', gap: 1 }}>
  {tags.map((tag, index) => (
    <TagChip
      key={tag}
      label={tag}
      color={accentColors[index % accentColors.length]}
    />
  ))}
</Box>
```

### Small Size Variant

```tsx
// For dense layouts or metadata
<TagChip
  label="urgent"
  size="small"
  color="coral"
/>
```

---

## Behavior & Interaction

### Display Variant (Read-Only)
- **Click:** No action (purely visual)
- **Keyboard:** Not focusable
- **Screen reader:** Announced as text, not interactive

### Filter Variant (Toggleable)
- **Click:** Toggles selected state, filters dashboard
- **Keyboard:** Tab to focus, Enter/Space to toggle
- **Screen reader:** Announces as button, includes pressed state
- **Visual feedback:** Border + elevated shadow when selected

### Input Variant (Removable)
- **Click chip:** Optional navigation to tag detail
- **Click X icon:** Removes tag from collection
- **Keyboard:** Tab to chip, Tab to X, Enter/Space to delete
- **Screen reader:** Announces label + "Press delete to remove"

### Hover States
- **Desktop:** Subtle scale (1.02), elevated shadow
- **Mobile:** No hover (prevents sticky states)

### Focus States
- **Keyboard navigation:** Visible sky blue focus ring
- **3:1 contrast** vs background (WCAG requirement)

---

## Visual Specifications

### Dimensions (Medium)
- **Height:** 32px (visual), 48px (touch target with margin/padding)
- **Padding:** 8px horizontal, 4px vertical
- **Min width:** Auto (content-based)
- **Border radius:** 9999px (pill shape)

### Dimensions (Small)
- **Height:** 24px (visual), 48px (touch target with margin)
- **Padding:** 6px horizontal, 2px vertical
- **Font size:** 11px (slightly smaller)

### Typography
- **Font size:** 12px (0.75rem)
- **Font weight:** 500 (medium)
- **Text transform:** Lowercase (tag model convention)
- **Letter spacing:** 0.05em (slight tracking)

### Colors (Dark Mode)

#### Default (Neutral)
- **Background:** #383838 (elevated surface)
- **Text:** #FFFFFF
- **Border:** None

#### Accent Colors
- **Coral:** #FF6B6B background, #FFFFFF text
- **Sky:** #4DA3FF background, #FFFFFF text
- **Mint:** #4ECDC4 background, #FFFFFF text
- **Lilac:** #A78BFA background, #FFFFFF text
- **Citrus:** #FCD34D background, #000000 text (dark text for contrast)

#### Selected State (Filter Variant)
- **Border:** 2px solid #4DA3FF (sky blue)
- **Shadow:** 0 2px 8px 0 rgba(0, 0, 0, 0.6)

---

## Content Guidelines

From `/Context Eng/unmess_me_content_blueprint.md`:

### Tag Labels
- **Format:** Lowercase, 1-2 words max
- **Readable aloud:** Screen reader friendly, no abbreviations
- **Plain language:** Conversational, not technical jargon
- **Examples:**
  - ✅ "money", "work stress", "avoidance", "time pressure"
  - ❌ "FIN-CRISIS", "ENG-DEBT", "PROC" (too technical/abbreviated)

### Common Tags
System-wide tag vocabulary (not exhaustive, users can create):
- **Practical:** money, work, admin, health, habits, time pressure
- **Emotional:** stress, anxiety, overwhelm, avoidance, confidence
- **Relational:** relationships, family, work politics, boundaries
- **States:** motivation, energy, focus, sleep

### Tag Creation Rules
- **Max 5 tags per problem** (enforced in ProblemCard)
- **No duplicates** (case-insensitive check)
- **Auto-lowercase** (normalize user input)
- **Trim whitespace** (before/after)

---

## Ethical & Safety Considerations

Per `/Context Eng/unmess_me_ethical_guardrails_blueprint.md`:

### Tag Content Safety
- ✅ **Allowed:** Emotional states, practical categories, life domains
- ❌ **Avoid suggesting:** Diagnostic labels, medical terms, crisis language

### Crisis-Related Tags
If user inputs crisis-related tags (e.g., "self-harm", "suicide"):
- Don't reject the tag (user needs to express)
- Trigger crisis detection flow in parent component
- Change card styling to neutral (no bright accents)

---

## Implementation Notes

### Theme Integration

Uses UnmessMe theme + custom accents:

```tsx
import { useTheme } from '@mui/material/styles';
import { customAccents } from '@unmessme/design-system/theme';

const theme = useTheme();

// Get accent color
const accentColor = color === 'default'
  ? theme.palette.background.paper
  : customAccents[color];

// Determine text color (citrus needs dark text)
const textColor = color === 'citrus' ? '#000000' : '#FFFFFF';
```

### Responsive Behavior

```tsx
// Chips wrap on small screens
<Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    // On mobile, slightly smaller gaps
    [theme.breakpoints.down('sm')]: {
      gap: 0.75,
    },
  }}
>
  {tags.map(tag => <TagChip key={tag} label={tag} />)}
</Box>
```

### Performance Considerations
- **Memoization:** Memoize chip arrays to prevent re-renders
- **Virtualization:** Not needed (max 5 tags per card, reasonable total)
- **Event delegation:** For large filter bars (50+ tags), consider delegation

---

## Related Components

- **ProblemCard** - Primary consumer (displays 1-5 tag chips)
- **FilterChipBar** - Horizontal stack of filter chips for dashboard
- **DashboardSection** - Layout container that uses FilterChipBar
- **TagAutocomplete** - Input field with tag suggestions (future)

---

## References

- [Material Design 3 - Chips](https://m3.material.io/components/chips/overview)
- [MUI Chip Component](https://mui.com/material-ui/react-chip/)
- [WCAG 2.2 AA - Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- UnmessMe UI Blueprint: `/Context Eng/unmess_me_ui_blueprint.md`
- UnmessMe Accessibility Blueprint: `/Context Eng/unmess_me_accessibility_blueprint.md`
- UnmessMe Content Blueprint: `/Context Eng/unmess_me_content_blueprint.md`

---

## Status

**Draft** - Component spec defined, implementation pending.

**Next Steps:**
1. Create `TagChip.tsx` implementation
2. Build Storybook stories for all variants/states
3. Add unit tests (Jest + React Testing Library)
4. Validate with axe DevTools (accessibility)
5. Test with actual screen readers (VoiceOver, NVDA)

---

**Last Updated:** 2025-01-23  
**Version:** 1.0.0 (draft)  
**Maintainer:** UnmessMe Design System Team

