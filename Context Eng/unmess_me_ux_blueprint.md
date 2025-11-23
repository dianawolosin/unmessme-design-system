# UnmessMe – UX Blueprint (Conversational Tag‑Based Experience)

## 1. UX Vision

UnmessMe is a **conversational, Material UI‑inspired AI companion** (web app built with React + MUI) designed to let users verbally or textually unload their problems, receive friendly clarification, and instantly get a realistic, actionable plan. The experience is warm, playful, human, and non‑clinical. Desktop-first design benefits the organizational/dashboard aspects while remaining responsive for mobile web.

**Three principles:**

1. **Conversational First** – everything happens through natural dialogue.
2. **Zero Friction** – no forms, no rigid inputs.
3. **Small, Doable Actions** – grounded steps the user can actually execute.

---

## 2. Core Experience Flow

### 2.1 Home → Conversational Dump

User arrives directly into a friendly chat interface.

- Large text input
- Voice input button
- Soft microcopy prompts (e.g., "What’s weighing on you today?")
- AI listens, parses, and acknowledges warmly

### 2.2 Two Clarifying Questions (Max)

After the user dumps their worries, the system may ask up to **2 targeted questions**:

- Clarifies nuance
- Helps structure the underlying problem
- Feels conversational, never like a survey

Examples:

- “Is this mostly stressing you because of time, people, or expectations?”
- “Do you want to focus on fixing this now or understanding it first?”

---

## 3. Problem Representation

### 3.1 Tag‑Based Model (Instead of Categories)

Problems can be multi-dimensional, so the UX uses **tags**, not categories. Examples:

- money
- relationship
- stress
- avoidance
- motivation
- work politics
- time pressure
- confidence

**Benefits:**

- flexible
- funny/human
- more true to real life
- dashboard filters become delightful

### 3.2 Problem Card

After processing, each problem becomes a clean Material‑style card:

- Title generated from user input
- Tags
- Effort indicators
- Quick summary in friendly copy

---

## 4. Actionable Plan Generation

### 4.1 “Unmess Me” Button

The user taps **Unmess Me**, triggering:

- structured breakdown
- realistic steps (never overwhelming)
- small, deterministic tasks

### 4.2 Step List Output

Tasks are:

- bite-sized
- reorderable
- editable
- adjustable after reflection

Tone example: “Let’s start with something tiny — message X to clarify next steps.”

---

## 5. “Play Mode” – Taking Action

The user can activate a plan by clicking **Play**. This creates an **active problem-solving session**:

- shows current steps
- allows pausing or tweaking
- tracks progress lightly

This keeps scope small but meaningful.

---

## 6. Dashboard Experience

### 6.1 Overview

Dashboard includes:

- Active Problems (in Play)
- All Problems
- Completed Tasks
- Tags for filtering

### 6.2 Conversational Dashboard

User can TYPE or TALK to the dashboard:

- “Show me money-related stuff.”
- “Which of my problems are easiest to fix today?”
- “Sort everything by emotional weight.”
- “What should I focus on right now?”

This keeps the whole product conversational end to end.

---

## 7. Conversational Patterns

### 7.1 Tone

- warm
- honest
- playful
- gently humorous
- zero judgement

### 7.2 Example Microcopy

- “You’re carrying a lot — let’s unpack it together.”
- “I hear you. That’s a lot for one brain.”
- “Oof, okay. We’ll break this down so it feels less wild.”
- “Small step first — we’re not climbing Everest today.”
- “Your worries called. They want a dashboard.”

---

## 8. Material UI Design Patterns (React + MUI)

- Cards (problem cards, task cards) - MUI `Card` component
- Chips (tags) - MUI `Chip`, `FilterChip`
- FAB (Unmess Me) - MUI `Fab` or prominent `Button`
- Navigation (Chat / Dashboard / Plans) - MUI `Tabs`, `Drawer`, or custom nav
- App bar with soft avatar - MUI `AppBar`
- Voice input button with microphone icon
- Dialogs for clarifying questions - MUI `Dialog`

---

## 9. UX Output Requirements for MCP

MCP must produce outputs that map cleanly into UI:

- Problem objects with tags
- Suggested clarifying questions
- Step lists (task arrays)
- Summary copy in friendly voice
- Dashboard filtering schemas

Example:

```json
{
  "type": "problem_card",
  "title": "Stressed about overdue bills",
  "tags": ["money", "stress", "avoidance"],
  "stress_score": 8,
  "summary": "This one feels heavy — let’s break it down slowly."
}
```

---

## 10. Guardrails

- Never judge the user
- Never overwhelm with too many steps
- Avoid medical/legal terminology (Refer to the Ethical blueprint doc)
- Clarifying questions capped at 2
- Humor stays kind, never sarcastic

---

## 11. Scope Boundaries

The prototype **does NOT include**:

- attachments
- notifications
- multi-user features
- deep analytics
- multi-day habit loops

We keep it minimal & powerful for the conference demo.

---

## 12. Next Steps

- Define MUI custom theme (dark mode, UnmessMe brand)
- Define metadata schema for React components
- Define conversational patterns for orchestration
- Integrate BI + UX blueprints into MCP model
- Build React prototype environment with Vite + hot reload

