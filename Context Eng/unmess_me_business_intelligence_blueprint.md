# UnmessMe – Business Intelligence Blueprint (V2, Integrated System)

## 1. Purpose

This blueprint defines the **strategic intelligence layer** for UnmessMe. It unifies and connects:

- **UX Blueprint**
- **UI Blueprint**
- **Accessibility Blueprint**
- **Ethical Guardrails Blueprint**
- **Content Blueprint**
- **MCP Tools & Constraints Blueprint**

This serves as the MCP’s master mental model of UnmessMe — the blueprint it uses to:

- reason about the product
- generate prototypes
- enforce guardrails
- maintain consistency across screens, flows, and copy

This is NOT user-facing. It is purely the **internal intelligence model** the LLM needs.

---

## 2. Product Overview

**UnmessMe** is a playful, satirically self‑aware B2C AI web app (built with React + MUI) that organizes a user's life chaos into clear, actionable, emotionally safe steps.

It transforms:

- loose emotional dumps → structured problems
- problems → tags + dimension scores
- chaos → small, realistic action steps
- uncertainty → dashboard clarity

Tone:

- playful coaching
- lightly comedic therapy parody
- warm, supportive, non‑clinical
- explicitly NON‑PROFESSIONAL ("I am extremely unlicensed")

Platform:

- Web application (React + Material UI)
- Desktop-first responsive design (benefits dashboard/organizational UI)
- Dark mode first
- Voice input via Web Speech API
- Enterprise-scale design system

Tagline: **"Your life. But organized. Finally."**

---

## 3. Core Business Intelligence (What the MCP Must Understand)

### 3.1 User Intent Model

Users come to UnmessMe because they:

- feel overwhelmed
- want clarity
- want steps they can actually do
- want their chaos broken into manageable pieces
- want emotional support that is playful, not clinical

### 3.2 Product Value Model

UnmessMe provides value by:

- organizing worries into tagged problems
- analyzing emotional + practical weight
- generating realistic, small action plans
- showing progress clearly
- using humor + warmth to reduce anxiety

### 3.3 System Pillars

1. **Dump** – User unloads problems via text or voice.
2. **Breakdown** – AI extracts problems, tags, and dimension scores.
3. **Analyze** – Emotional + urgency scoring.
4. **Plan** – Generates small, actionable steps.
5. **Play** – User activates a plan.
6. **Reflect** – Progress + dashboard clarity.

---

## 4. Problem Modeling Logic (Tags, Not Categories)

### 4.1 Tag-Based Model

UnmessMe does NOT use rigid categories.
Problems are described using **flexible, multi‑tag descriptors** such as:

- money
- work
- relationships
- stress
- avoidance
- motivation
- health
- habits
- time pressure
- confidence
- overwhelm
- emotional load
- admin

Tags are:

- non‑hierarchical
- combinable
- expressive & human
- perfect for filtering in dashboards

### 4.2 Dimensions

Each problem receives quantitative + qualitative dimension scores:

- Urgency
- Stress Impact
- Difficulty
- Dependencies
- Emotional Weight
- Time Required
- Avoidance Level

### 4.3 Output Types

- Problem Cards (bento‑style UI)
- Tag Chips
- Analysis Summaries
- Action Steps
- Task Lists (Play mode)
- Dashboard Modules

---

## 5. Entity Model

### 5.1 Primary Entities

- **Problem** (id, title, tags, dimension scores)
- **Tag** (string)
- **DimensionScore** (numeric + description)
- **Step** (short action item)
- **Task** (group of steps)
- **DashboardView** (clustered problems + insights)

### 5.2 Relationships

- A Problem → contains many Tags
- A Problem → contains many DimensionScores
- A Problem → generates multiple Steps
- Steps → grouped into Tasks
- Tasks → appear in DashboardViews

---

## 6. Business Rules (MCP Must Enforce)

- Steps must be **small, safe, and doable**.
- Tone must follow **Content Blueprint**.
- Humor must stay **kind and emotionally safe**.
- Never provide medical, legal, or therapeutic advice.
- Clarifying questions capped at **2**.
- Use tag model, not categories.
- All prototypes must follow **UI** and **Accessibility** rules.
- Contrasts, touch targets, and layout spacing must be valid.
- Ethical fallback tone must trigger during sensitive input.

---

## 7. Integrated Scenarios (Cross‑Blueprint Logic)

### Scenario A: User dumps chaotic input

MCP must:

- extract problems
- generate titles
- assign tags
- assign dimension scores
- follow Content Blueprint tone
- follow Ethical Guardrails
- prepare UX‑ready Problem Cards

### Scenario B: Designer wants to prototype a screen

MCP must:

- consult UI Blueprint (dark mode, bento, shapes)
- enforce Accessibility Blueprint
- use Content Blueprint tone for microcopy
- generate `screen_spec` via MCP tools
- validate with constraints

### Scenario C: Designer requests a flow

MCP must:

- use UX Blueprint to structure flow steps
- generate screens in order
- maintain content tone consistency
- output clean JSON

---

## 8. Outputs for AI Prototyping

MCP must expose to the LLM:

- **Problem objects** (tags, scores, summaries)
- **Screen specs** (JSON describing UI components)
- **Flow specs** (ordered screen sequences)
- **Component specs** (metadata for UI elements)
- **Action steps** (microcopy + structure)
- **Dashboard schemas** (bento + filters)

All outputs must:

- follow UI/UX/Content/Accessibility/Ethical rules
- be deterministic, safe, orderly
- be optimized for prototyping, not runtime

---

## 9. Blueprint Interdependencies

This Business Intelligence Blueprint integrates:

- **From UX:** flows, conversational logic, tag system
- **From UI:** dark mode, shapes, components
- **From Content:** tone, microcopy rules, disclaimers
- **From Accessibility:** contrast rules, touch targets
- **From Ethical Guardrails:** crisis handling, non‑licensed tone
- **From MCP Tools & Constraints:** tool behaviors + validation

MCP must consider ALL of these when generating prototypes.

---

## 10. Summary

This BI blueprint is the core of UnmessMe’s intelligence model. It allows the MCP + LLM to:

- understand the product purpose
- reason about user input
- generate safe, accessible, playful UI
- produce consistent screen + flow prototypes
- maintain tone, visual identity, and brand personality

This blueprint is the **foundation** for all UnmessMe prototyping tasks.

