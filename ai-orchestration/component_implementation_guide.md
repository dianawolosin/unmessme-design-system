# Component Implementation Guide

> **STOP:** Before implementing anything, have you followed the **[Component Request Workflow](./component_request_workflow.md)**?
> Ensure you have gathered the *Experience*, *Interaction*, and *Purpose* context first.

This guide instructs AI agents and developers on how to extend the UnmessMe Design System. We use the **Industry Standard** model (Foundations → Components → Patterns), similar to Google's Material Design 3 and IBM's Carbon Design System.

## 1. Core Philosophy

We avoid "Atomic Design" metaphors (Atoms/Molecules) in favor of a flat, engineering-driven taxonomy.

*   **Foundations**: The mathematical truths. Colors, Typography, Spacing, Radius. (Implemented as Tokens).
*   **Components**: The building blocks. Generic, reusable UI elements (`Button`, `Tag`, `Surface`).
*   **Patterns**: The specific recipes. Compositions of components designed for a specific job (`ProblemCard`, `ChatInput`).

**Why this way?**
This is how modern engineering teams (Google, Uber, Meta) structure their code. It prevents "classification paralysis" (e.g., "Is a Search Bar a Molecule?"). Everything that is a UI element lives in `src/components/`.

---

## 2. Implementation Rules for AI

When asked to create a new UI element, follow this decision tree:

### Step 1: Check for Existing Components
Before writing new CSS or creating a new file, check `packages/design-system/src/components/`:
*   Need a container? Use **`Surface`**.
*   Need an interactive element? Use **`Button`**.
*   Need a label? Use **`Tag`**.

### Step 2: Use Foundations (Tokens)
If you must style a custom element, **ALWAYS** import `tokens` from `../tokens`.

**❌ BAD (Hardcoded):**
```tsx
<Box sx={{ backgroundColor: '#121619' }}>
```

**✅ GOOD (Foundation-driven):**
```tsx
import { tokens } from '../tokens';

<Box sx={{ 
  backgroundColor: tokens.color.semantic.bg.canvas 
}}>
```

### Step 3: Define the API
*   Extend standard MUI props where possible.
*   Use semantic prop names (`variant="primary"`, not `color="blue"`).

---

## 3. Example: Creating a New Pattern

If creating a "UserCard" (Pattern):
1.  **Container**: `<Surface variant="glass">`
2.  **Content**: Layout using standard MUI `Stack`.
3.  **Actions**: Use `<Button>` components.

```tsx
export function UserCard({ name, role }) {
  return (
    <Surface sx={{ p: 3 }}>
      <Typography variant="h6">{name}</Typography>
      <Tag label={role} color="analysis" />
      <Button variant="ghost" size="sm">View Profile</Button>
    </Surface>
  );
}
```

---

## 4. Directory Structure

We keep a flat structure for simplicity.

```
packages/design-system/
├── src/
│   ├── tokens/       # Foundations (JSON + Resolver)
│   ├── theme/        # MUI Theme Mapping
│   ├── components/   
│   │   ├── Button.tsx    # Component
│   │   ├── Surface.tsx   # Component
│   │   ├── Tag.tsx       # Component
│   │   └── ProblemCard.tsx # Pattern (Composed of Components)
```
