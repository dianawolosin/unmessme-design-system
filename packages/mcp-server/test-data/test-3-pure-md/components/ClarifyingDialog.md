# ClarifyingDialog

A focused, glassmorphic modal ("Interrogation Modal") that interrupts the flow to ask **one critical question**. It forces the user to structure their messy thoughts into actionable categories.

## Purpose

The AI needs to clarify ambiguity without overwhelming the user. ClarifyingDialog:
- Presents a single, high-value question.
- Offers 2-3 distinct choices (no open-ended text).
- "Gamifies" the decision-making process.

---

## Design Principles

### V3: Interrogation Modal
- **Glassmorphism:** Heavy blur (`backdropFilter: 'blur(16px)'`) creates a sense of depth and focus.
- **Inescapable Focus:** The dialog is modal; the user must answer or explicitly dismiss to proceed.
- **Typography:** Uses `Fraunces` for the question, making it feel like a tarot card reading or a diagnosis.

---

## React Component API

### TypeScript Interface

```tsx
interface ClarifyingOption {
  id: string;
  label: string;
}

interface ClarifyingDialogProps {
  open: boolean;
  question: string;
  options?: ClarifyingOption[];
  onSelectOption: (optionId: string) => void;
  onClose?: () => void;
}

export function ClarifyingDialog({
  open,
  question,
  options,
  onSelectOption,
  onClose,
}: ClarifyingDialogProps): JSX.Element;
```

---

## MUI Components Used

- **[`Dialog`](https://mui.com/material-ui/react-dialog/)** - Base modal
- **[`DialogTitle`](https://mui.com/material-ui/api/dialog-title/)** - The Question
- **[`DialogContent`](https://mui.com/material-ui/api/dialog-content/)** - Option container
- **[`Button`](https://mui.com/material-ui/react-button/)** - Option selection
- **[`Grow`](https://mui.com/material-ui/api/grow/)** - Entrance animation

---

## Design Tokens Used

### Colors (`colors.json`)
- **Background:** `semantic.bg.surface` (rgba(30, 35, 39, 0.6))
- **Backdrop:** Dark opacity (80%)
- **Border:** `semantic.border.highlight`
- **Option Hover:** `semantic.action.primary` tint (Seafoam)

### Typography (`typography.json`)
- **Question:** `h5` / `Fraunces` (Serif)
- **Options:** `body1` / `JetBrains Mono` (Monospace)

---

## Implementation Details

### The Choice Buttons
Options are presented as full-width buttons with:
- **Left alignment:** Easier to read for longer text.
- **Monospace font:** Feels like selecting a path in a terminal or game.
- **Hover slide:** Slight x-axis translation on hover (`transform: translateX(4px)`).

---

## Usage Examples

### Typical Flow

```tsx
<ClarifyingDialog
  open={showQuestion}
  question="Is this stressing you because of time or people?"
  options={[
    { id: 'time', label: 'Definitely the deadline.' },
    { id: 'people', label: 'I hate letting them down.' },
  ]}
  onSelectOption={(id) => handleResponse(id)}
/>
```

---

## Status

**Implemented** - V3 spec compliant.

**Maintainer:** UnmessMe Design System Team