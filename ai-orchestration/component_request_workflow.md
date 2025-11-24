# Component Request Workflow

## Purpose
This document defines the protocol for AI agents when a user requests a new component. The goal is to ensure **semantic meaningfulness** and proper **abstraction** within the UnmessMe Design System.

We do not simply "build what is asked." We first **validate the intent** to determine if a new component is truly needed, or if an existing one (or a specific pattern) covers the use case.

---

## Phase 1: The Interrogation (Architect Mode)

When the user says *"Build an X component"* or *"I need a component for Y"*, **do not immediately generate code.**

Instead, pause and ask clarifying questions to establish the **Experience**, **Interaction**, and **Purpose**.

### Key Context Questions
Ask 2-3 of these questions to triangulate the need:

1.  **The Experience Context**
    *   "Where does this live in the user journey?"
    *   "Is this for the Landing Page, the Dashboard, or a specific flow like 'Unmessing'?"
    *   "What happens immediately before and after the user sees this?"

2.  **The Interaction Model**
    *   "Is this purely informational (read-only)?"
    *   "Does it trigger an action (navigational vs. state change)?"
    *   "Does it require user input?"

3.  **The Semantic Purpose**
    *   "Is this a generic container (like a Card) or a specific domain object (like a 'Problem')?"
    *   "Why can't we use `Surface`, `Button`, or `Text` for this?" (Mental check for existing components)

---

## Phase 2: The Decision Matrix

Once context is gathered, classify the request into one of three categories:

### 1. The Wrapper (MUI Extension)
*   **Scenario**: User needs a standard UI element (Checkbox, Switch, Modal) but with our specific styling.
*   **Action**: Create a component that wraps the Material UI equivalent.
*   **Rule**: Expose standard MUI props, override styles via `theme` or `sx` using Tokens.

### 2. The Composition (Pattern)
*   **Scenario**: User needs a "User Card" or "Chat Bubble".
*   **Action**: This is **not** a base component. This is a **Pattern**.
*   **Rule**: Build it by composing existing base components (`Surface`, `Avatar`, `Text`, `Button`).

### 3. The Foundation (New Primitive)
*   **Scenario**: User needs something MUI doesn't provide (e.g., a specialized timeline visualization).
*   **Action**: Build from scratch using low-level HTML/SVG and Tokens.
*   **Rule**: High scrutiny required. Must be generic enough to be reused.

---

## Phase 3: The Proposal

Before writing the implementation code, present a semantic summary back to the user:

> "I understand. You need a **StatusIndicator** for the **Dashboard**.
>
> *   **Role**: Visual feedback of system state.
> *   **Interaction**: Read-only.
> *   **Base**: Wraps MUI `Chip` but enforces our status colors.
>
> Shall I proceed with this specification?"

---

## Checklist for Semantic Quality

*   [ ] Does the name describe *what it is*, not *what it looks like*? (e.g., `DestructiveButton` vs `RedButton`)
*   [ ] Does it use standard Tokens for all values?
*   [ ] Is it accessible? (Semantically correct HTML tags)

