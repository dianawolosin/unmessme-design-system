---
id: plan-step-list
type: component
platform: web
framework: react
base: mui
category: data-display
status: implemented
---

# PlanStepList & TaskItem

The "Execution Log" of the UnmessMe system. Displays the AI-generated plan as a sequence of bite-sized, actionable tokens (TaskItems).

## Purpose

After "Unmessing" a problem, the user receives a plan. This component renders that plan:
- **Bite-sized:** Each task is a single line.
- **Actionable:** Checkboxes provide immediate dopamine.
- **Non-overwhelming:** The list is visually contained.

---

## Design Principles

### V3: Action Tokens
- **Ticket Aesthetic:** Each `TaskItem` looks like a physical punch-card or a terminal log entry.
- **Monospace:** Uses `JetBrains Mono` to imply that these are instructions to be executed.
- **Mechanical Interaction:** Clicking a checkbox feels snappy and precise.

---

## React Component API

### TypeScript Interface

```tsx
interface PlanStep {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface PlanStepListProps {
  /**
   * Friendly intro text
   * @example "Let's start with something tiny..."
   */
  intro?: string;

  /**
   * List of steps
   */
  steps: PlanStep[];

  /**
   * Handlers
   */
  onToggleStep: (id: string) => void;
  onEditStep?: (id: string, newText: string) => void;
  onDeleteStep?: (id: string) => void;
}

export function PlanStepList(props: PlanStepListProps): JSX.Element;
```

### TaskItem (Internal Sub-component)

```tsx
interface TaskItemProps {
  id: string;
  text: string;
  isCompleted?: boolean;
  isEditable?: boolean;
  onToggle?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
  onDelete?: (id: string) => void;
}
```

---

## MUI Components Used

- **[`Paper`](https://mui.com/material-ui/react-paper/)** - Base for TaskItem
- **[`Checkbox`](https://mui.com/material-ui/react-checkbox/)** - Completion toggle
- **[`Typography`](https://mui.com/material-ui/react-typography/)** - Step text
- **[`Stack`](https://mui.com/material-ui/react-stack/)** - Vertical list layout
- **[`IconButton`](https://mui.com/material-ui/react-icon-button/)** - Edit/Delete actions

---

## Design Tokens Used

### Colors (`colors.json`)
- **Task Background:** `semantic.bg.surface`
- **Completed:** 30% Opacity
- **Text:** `semantic.text.primary` (Active), `semantic.text.disabled` (Completed)
- **Checkbox Active:** `semantic.status.success` (#2A9D8F)

### Typography (`typography.json`)
- **Intro:** `h6` / `Fraunces` (Italic)
- **Task Text:** `body2` / `JetBrains Mono`

---

## Implementation Details

### Animations (`framer-motion`)
- **Entrance:** Items slide in from the left.
- **Completion:** Completed items fade out slightly but remain visible (strikethrough).
- **Exit:** Deleted items scale down and vanish.

```tsx
<motion.div
  layout
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, scale: 0.9 }}
>
  {/* Task Item Content */}
</motion.div>
```

---

## Usage Examples

### Displaying a Plan

```tsx
<PlanStepList
  intro="Here is the path forward."
  steps={[
    { id: '1', text: 'Open email.', isCompleted: true },
    { id: '2', text: 'Find the invoice.', isCompleted: false },
  ]}
  onToggleStep={toggleStep}
/>
```

---

## Status

**Implemented** - V3 spec compliant.

**Maintainer:** UnmessMe Design System Team

