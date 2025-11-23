---
id: unmess-button
type: component
platform: web
framework: react
base: mui
category: action
status: draft
---

# UnmessButton

A prominent Floating Action Button (FAB) that triggers UnmessMe's core action: breaking down chaotic problems into structured, actionable steps. The signature interaction of the app - playful, prominent, and purposeful.

## Purpose

UnmessButton represents the heart of UnmessMe's value proposition: transforming overwhelm into clarity. When clicked:
1. Takes user's messy problem dump
2. Asks max 2 clarifying questions
3. Generates realistic, small action steps
4. Creates a "Play Mode" actionable plan

The button's prominent placement and playful interaction communicate: "This mess? We've got you."

---

## Design Principles

### Material Design 3 Foundation

Based on [Material Design 3 FABs](https://m3.material.io/components/floating-action-button/overview):
- **Types:** Regular FAB (icon-only), Extended FAB (icon + text)
- **Prominence:** Highest elevation in UI hierarchy
- **Placement:** Fixed position (bottom-right on desktop, bottom-center on mobile)
- **Motion:** Micro-bounce on tap, smooth transitions
- **Purpose:** Single primary action per screen

### UnmessMe Customizations

From `/Context Eng/unmess_me_ui_blueprint.md`:
- **Sky blue accent:** Primary CTA color (#4DA3FF) - conversational, approachable
- **Friendly micro-bounce:** Subtle spring animation on tap (playful, not gimmicky)
- **"Unmess Me" label:** Sentence case, conversational tone
- **High elevation:** Maximum shadow (xl) for prominence on dark backgrounds
- **Glow effect:** Sky blue glow on hover (desktop only)

---

## React Component API

### TypeScript Interface

```tsx
interface UnmessButtonProps {
  /**
   * Button variant
   * - "regular": Icon-only FAB (56x56px)
   * - "extended": Icon + text FAB (auto width)
   * @default "extended"
   */
  variant?: 'regular' | 'extended';

  /**
   * Button label text (for extended variant)
   * @default "Unmess Me"
   */
  label?: string;

  /**
   * Icon override (optional)
   * Default: Sparkles icon (✨ represents "make order from chaos")
   */
  icon?: React.ReactElement;

  /**
   * Click handler - triggers unmess flow
   * Required - must have action
   */
  onClick: () => void;

  /**
   * Loading state - shows during async unmess operation
   * Displays spinner, disables interaction
   */
  loading?: boolean;

  /**
   * Disabled state
   * Prevents interaction, reduces opacity
   */
  disabled?: boolean;

  /**
   * Size variant
   * - "small": 40px diameter (compact layouts)
   * - "medium": 56px diameter (standard, default)
   * - "large": 64px diameter (hero placement)
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Color variant
   * @default "primary" (sky blue)
   */
  color?: 'primary' | 'secondary';

  /**
   * Position variant
   * Controls fixed positioning behavior
   * @default "fixed"
   */
  position?: 'fixed' | 'static';

  /**
   * Accessibility label override
   * Auto-generated if not provided
   */
  ariaLabel?: string;

  /**
   * Custom sx prop for additional styling
   */
  sx?: MuiSxProp;
}

export function UnmessButton({
  variant = 'extended',
  label = 'Unmess Me',
  icon,
  onClick,
  loading = false,
  disabled = false,
  size = 'medium',
  color = 'primary',
  position = 'fixed',
  ariaLabel,
  sx,
}: UnmessButtonProps): JSX.Element;
```

---

## MUI Components Used

Built by extending MUI FAB:

- **[`Fab`](https://mui.com/material-ui/react-floating-action-button/)** - Base floating action button
- **[`CircularProgress`](https://mui.com/material-ui/react-progress/)** - Loading spinner
- **[`Box`](https://mui.com/material-ui/react-box/)** - Wrapper for fixed positioning

Primary component is MUI's `Fab` with custom theming and animations.

---

## Design Tokens Used

References tokens from `/design-system/tokens/`:

### Colors (`colors.json`)
- **Primary (sky blue):** `color.accent.sky` (#4DA3FF) - main button background
- **Secondary (coral):** `color.accent.coral` (#FF6B6B) - alternate variant
- **Text:** `color.text.on-accent` (#FFFFFF) - label text
- **Focus glow:** `elevation.glow.focus` - sky blue aura

### Typography (`typography.json`)
- **Label (extended):** `typography.fontSize.button` (0.875rem / 14px)
- **Font weight:** `typography.fontWeight.medium` (500)
- **Letter spacing:** `typography.letterSpacing.wide` (0.05em)
- **Text transform:** None (sentence case per theme)

### Spacing (`spacing.json`)
- **Size (small):** 40px diameter
- **Size (medium):** 56px diameter (default)
- **Size (large):** 64px diameter
- **Extended padding:** `spacing.md` (16px horizontal)
- **Icon spacing:** `spacing.xs` (8px from text)
- **Bottom offset (fixed):** `spacing.xl` (32px from bottom)
- **Right offset (fixed):** `spacing.xl` (32px from right, desktop)

### Radius (`radius.json`)
- **Shape (regular):** `radius.circle` (50%) - perfect circle
- **Shape (extended):** `radius.pill` (9999px) - fully rounded ends

### Elevation (`elevation.json`)
- **Default:** `elevation.xl` (0 8px 24px 0 rgba(0, 0, 0, 0.8))
- **Hover:** `elevation.xl` + `elevation.glow.accent` (sky blue aura)
- **Active:** `elevation.lg` (reduced during press)

---

## Accessibility Requirements

Per `/Context Eng/unmess_me_accessibility_blueprint.md`:

### WCAG 2.2 AA Compliance
- ✅ **Touch targets:** 56px minimum (medium FAB meets requirement)
- ✅ **Contrast:** Label text vs sky blue background ≥ 4.5:1
- ✅ **Keyboard navigation:** Tab to focus, Enter/Space to activate
- ✅ **Screen readers:** Clear aria-label describes action
- ✅ **Focus indicators:** Visible focus ring with 3:1 contrast

### Implementation Details

```tsx
// Extended FAB (icon + text)
<Fab
  variant="extended"
  color="primary"
  onClick={handleUnmess}
  aria-label="Start unmess process - break down problem into steps"
  sx={{
    minHeight: 56,
    minWidth: 56,
    '&:focus-visible': {
      outline: '3px solid rgba(77, 163, 255, 0.6)',
      outlineOffset: 4,
    }
  }}
>
  <SparklesIcon sx={{ mr: 1 }} />
  Unmess Me
</Fab>

// Regular FAB (icon-only)
<Fab
  color="primary"
  onClick={handleUnmess}
  aria-label="Start unmess process"
  size="medium"
>
  <SparklesIcon />
</Fab>

// Loading state
<Fab
  disabled={loading}
  aria-busy={loading}
  aria-label={loading ? 'Processing, please wait' : 'Start unmess process'}
>
  {loading ? <CircularProgress size={24} /> : <SparklesIcon />}
  {!loading && 'Unmess Me'}
</Fab>
```

### States
- **Default:** Sky blue, elevated shadow, resting
- **Hover:** Elevated shadow + sky blue glow, subtle scale (1.05)
- **Focus:** Sky blue focus ring (4px offset, 3:1 contrast)
- **Pressed:** Reduced shadow, micro-bounce spring animation
- **Loading:** Spinner replaces icon, disabled interaction, "aria-busy"
- **Disabled:** Reduced opacity (0.5), gray background, no interaction

---

## Usage Examples

### Primary Action (Fixed Position)

```tsx
import { UnmessButton } from '@unmessme/design-system';

// Default extended FAB, fixed bottom-right
<UnmessButton
  onClick={() => {
    console.log('Starting unmess flow...');
    // Navigate to unmess flow or trigger modal
  }}
/>
```

### With Loading State

```tsx
const [loading, setLoading] = useState(false);

const handleUnmess = async () => {
  setLoading(true);
  try {
    await generateUnmessPlan(problemId);
    navigate('/plan');
  } finally {
    setLoading(false);
  }
};

<UnmessButton
  onClick={handleUnmess}
  loading={loading}
/>
```

### Regular FAB (Icon-Only)

```tsx
// Compact spaces, icon-only FAB
<UnmessButton
  variant="regular"
  size="medium"
  onClick={handleUnmess}
  ariaLabel="Break down this problem"
/>
```

### Static Positioning (In-Flow)

```tsx
// Inside a card or inline with content (not fixed)
<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
  <UnmessButton
    position="static"
    onClick={handleUnmess}
  />
</Box>
```

### Small Size Variant

```tsx
// For compact layouts or secondary placements
<UnmessButton
  size="small"
  variant="regular"
  onClick={handleUnmess}
/>
```

### Secondary Color (Coral)

```tsx
// Alternate accent color (less common)
<UnmessButton
  color="secondary"
  onClick={handleUnmess}
/>
```

### Custom Label

```tsx
// Different context-specific labels
<UnmessButton
  label="Break It Down"
  onClick={handleUnmess}
/>

<UnmessButton
  label="Get Steps"
  onClick={handleUnmess}
/>
```

---

## Behavior & Interaction

### Click/Tap Behavior
- **Single click:** Triggers unmess flow immediately
- **During loading:** Button disabled, shows spinner
- **After completion:** Navigates to plan view or shows inline results

### Animation Details

#### Micro-Bounce on Tap
```tsx
// Spring animation using MUI sx or framer-motion
sx={{
  transition: 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  '&:active': {
    transform: 'scale(0.95)',
  },
  '&:active:not(:disabled)': {
    animation: 'bounce 0.3s ease-in-out',
  },
  '@keyframes bounce': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.95)' },
  },
}}
```

#### Hover Glow (Desktop Only)
```tsx
sx={{
  '&:hover:not(:disabled)': {
    boxShadow: [
      '0 8px 24px 0 rgba(0, 0, 0, 0.8)',
      '0 0 20px 0 rgba(77, 163, 255, 0.4)',
    ].join(', '),
    transform: 'scale(1.05)',
  },
  // Disable hover on touch devices
  '@media (hover: none)': {
    '&:hover': {
      transform: 'none',
    },
  },
}}
```

### Fixed Positioning

```tsx
// Desktop: Bottom-right corner
sx={{
  position: 'fixed',
  bottom: 32,
  right: 32,
  zIndex: theme.zIndex.fab,
  // Mobile: Bottom-center
  [theme.breakpoints.down('sm')]: {
    bottom: 24,
    right: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}}
```

---

## Visual Specifications

### Dimensions (Regular FAB)
- **Small:** 40x40px
- **Medium:** 56x56px (default)
- **Large:** 64x64px
- **Icon size:** 24px (medium), 20px (small), 28px (large)

### Dimensions (Extended FAB)
- **Height:** 56px (medium), 48px (small)
- **Width:** Auto (content-based, min 80px)
- **Padding:** 16px horizontal, 12px vertical
- **Icon spacing:** 8px margin-right

### Typography (Extended Variant)
- **Font size:** 14px (0.875rem)
- **Font weight:** 500 (medium)
- **Letter spacing:** 0.05em
- **Text transform:** None (sentence case)

### Colors (Dark Mode)

#### Primary (Sky Blue)
- **Background:** #4DA3FF
- **Text:** #FFFFFF
- **Shadow:** 0 8px 24px 0 rgba(0, 0, 0, 0.8)
- **Hover glow:** 0 0 20px 0 rgba(77, 163, 255, 0.4)

#### Secondary (Coral)
- **Background:** #FF6B6B
- **Text:** #FFFFFF
- **Hover glow:** 0 0 20px 0 rgba(255, 107, 107, 0.3)

#### Loading State
- **Background:** #4DA3FF (dimmed to 0.7 opacity)
- **Spinner:** #FFFFFF

#### Disabled State
- **Background:** #6B6B6B (gray)
- **Text:** #B3B3B3
- **Opacity:** 0.5

---

## Content Guidelines

From `/Context Eng/unmess_me_content_blueprint.md`:

### Button Label
- **Primary:** "Unmess Me" (signature phrase, playful, action-oriented)
- **Tone:** Conversational, encouraging, slightly humorous
- **Alternatives (context-specific):**
  - "Break It Down" (more literal)
  - "Get Steps" (functional)
  - "Let's Go" (enthusiastic)
- **Avoid:**
  - "Analyze" (too clinical)
  - "Process Problem" (too technical)
  - "Fix This" (implies guarantee)

### Accessibility Labels
```tsx
// Clear, descriptive for screen readers
aria-label="Start unmess process - break down problem into actionable steps"

// During loading
aria-label="Processing your problem, please wait"

// After error
aria-label="Try unmess again"
```

### Icon Choice
- **Default:** Sparkles (✨) - represents transformation, clarity, magic
- **Alternatives:**
  - Lightbulb (💡) - insight
  - Compass (🧭) - direction
  - Play (▶️) - start action

---

## Ethical & Safety Considerations

Per `/Context Eng/unmess_me_ethical_guardrails_blueprint.md`:

### Crisis Detection
If problem suggests self-harm/severe distress:
- **Change label:** "Unmess Me" → "Get Support"
- **Change color:** Sky blue → neutral gray
- **Change action:** Redirects to crisis resources instead of unmess flow
- **No humor:** Remove playful bounce animation

### Disclaimers
Before unmess flow begins (after button click):
- Show disclaimer: "UnmessMe is not professional advice. Steps are organizational only."
- User must acknowledge before proceeding
- Button triggers disclaimer modal, not direct unmess

### Action Safety
Generated steps must be:
- Small, reversible, non-invasive
- No medical/legal/financial advice
- User-controlled, not prescriptive

---

## Implementation Notes

### Theme Integration

```tsx
import { useTheme } from '@mui/material/styles';

const theme = useTheme();

<Fab
  color="primary" // Uses theme.palette.primary (sky blue)
  sx={{
    '&.MuiFab-primary': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }}
>
  Unmess Me
</Fab>
```

### Animation Library (Optional)

For enhanced micro-interactions, consider framer-motion:

```tsx
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  <Fab>Unmess Me</Fab>
</motion.div>
```

### Responsive Behavior

```tsx
// Desktop: Bottom-right, extended variant
// Mobile: Bottom-center, regular variant (icon-only to save space)

const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

<UnmessButton
  variant={isMobile ? 'regular' : 'extended'}
  position="fixed"
  sx={{
    [theme.breakpoints.up('md')]: {
      bottom: 32,
      right: 32,
    },
    [theme.breakpoints.down('sm')]: {
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
    },
  }}
/>
```

### Performance Considerations
- **Animation:** Use CSS transforms (GPU-accelerated)
- **Event throttling:** Debounce click if async operation takes >100ms
- **Loading state:** Always provide visual feedback for async actions

---

## Related Components

- **ProblemCard** - Primary placement for UnmessButton (in-card variant)
- **ChatBubble** - Conversational flow leading to unmess action
- **Button** (MUI) - Standard buttons for secondary actions
- **IconButton** - Smaller action buttons

---

## References

- [Material Design 3 - FABs](https://m3.material.io/components/floating-action-button/overview)
- [MUI Floating Action Button](https://mui.com/material-ui/react-floating-action-button/)
- [WCAG 2.2 - Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Material Design - Motion Principles](https://m3.material.io/styles/motion/overview)
- UnmessMe UI Blueprint: `/Context Eng/unmess_me_ui_blueprint.md`
- UnmessMe Content Blueprint: `/Context Eng/unmess_me_content_blueprint.md`
- UnmessMe Ethical Guardrails: `/Context Eng/unmess_me_ethical_guardrails_blueprint.md`

---

## Status

**Draft** - Component spec defined, implementation pending.

**Next Steps:**
1. Create `UnmessButton.tsx` implementation
2. Build Storybook stories (all variants, states, animations)
3. Add unit tests + interaction tests
4. Test animations across devices (mobile, desktop)
5. Validate with screen readers

---

**Last Updated:** 2025-01-23  
**Version:** 1.0.0 (draft)  
**Maintainer:** UnmessMe Design System Team

