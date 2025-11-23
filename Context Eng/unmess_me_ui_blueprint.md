# UnmessMe – UI Blueprint (V3: Midnight Terminal & Digital Noir)

## 1. Visual North Star

**"The Midnight Terminal."**

UnmessMe is not a toy; it is a **chic, high-end control room** for life’s chaos. The visual identity shifts from "magical playground" to "cinematic utility." It feels like a late-night coding session, an A24 movie title sequence, or a receipt from a very expensive therapist.

The vibe is:
* **Adult Satire:** Clinical, precise, and slightly detached.
* **Digital Noir:** Deep, moody backgrounds with synthesized, "expensive" colors.
* **Analog Texture:** Film grain and noise prevent the UI from feeling like "plastic app design."
* **Organized Chaos:** Elements are scattered like receipts on a desk, but snap to a rigid grid when analyzed.

---

## 2. Semantic Token System (Triadic Harmony)

We strictly avoid hardcoded hex values. We use a **Semantic Token System** to ensure consistency and flexibility.

### 2.1 The Canvas (Digital Noir)
* **`semantic.bg.canvas`** (Base): Main app background. Deep, warm slate.
* **`semantic.bg.surface`** (Layer 1): Smoked Glass card surface. Dark, moody transparency.
* **`semantic.text.primary`** (Content): Bone White. Never pure white.
* **`semantic.text.inverse`** (Contrast): Dark Gunmetal (for text on bright buttons).

### 2.2 The Triadic Accents (Status & Action)
Used for tags, glows, and highlights. Never use "Red" or "Green" directly.

* **`semantic.status.urgent`** (Terracotta): Alert / Urgency. Earthy, grounded.
* **`semantic.status.analysis`** (Iris): Analysis / Depth. Introspective, electric purple-blue.
* **`semantic.action.primary`** (Seafoam): Action / Go. Rich, calming, sophisticated.
* **`semantic.action.hover`** (Seafoam Dark): Interactive state.

**Rule:** Gradients are subtle "fog" effects, never harsh linear shifts.

---

## 3. Typography (Clinical vs. Editorial)

Typography is the primary driver of the "Adult Satire" tone. We use contrast to tell the story.

### 3.1 The Voice (Headlines)
* **Token:** `semantic.heading.display`
* **Font:** **Fraunces** (Italic/Display) or **Space Grotesk**.
* **Vibe:** Editorial, confident, slightly sarcastic.
* **Usage:** Big problem titles, "Unmess Me" prompts.

### 3.2 The System (Data & Controls)
* **Token:** `semantic.body.main` / `semantic.label.button`
* **Font:** **JetBrains Mono**, **Space Mono**, or **IBM Plex Mono**.
* **Vibe:** Technical, receipt-like, diagnostic, utilitarian.
* **Usage:** Tags, stress levels, button labels, dashboard stats.
* **Effect:** Makes the user's emotional breakdown look like a debug log.

---

## 4. Shape & Texture

### 4.1 "Masking Tape" Tags
Tags are no longer pill-shaped bubbles.
* **Token:** `semantic.radius.xs` (2px)
* **Shape:** Rectangular with very slight radius.
* **Visual:** Looks like a piece of masking tape or a file folder label stuck to the screen.
* **Style:** `text-transform: lowercase` (Monospace font).

### 4.2 Smoked Glass Cards
* **Token:** `semantic.radius.lg` (16px)
* **Visual:** Tightened radius. No more "balloon" corners.
* **Texture:** Must include a **Noise / Film Grain** overlay (CSS `background-image` or pseudo-element) to kill the digital sheen.
* **Border:** `semantic.border.subtle` (1px solid faint white).

### 4.3 The Scatter (Layout)
* **Rest State:** Cards have slight, random rotations (`-1.5deg` to `1.5deg`). They look like a messy stack of Polaroids.
* **Hover State:** Snaps to grid (`0deg`), **NO scale**, border brightens.
* **Metaphor:** Sorting through the pile.

---

## 5. Material UI Component Mappings (The "Terminal" Overrides)

The MCP must generate React code that overrides standard MUI defaults with this specific aesthetic using **Semantic Tokens**.

### 5.1 Card Component (`ProblemCard`)
* **Base:** MUI `Card`
* **Overrides:**
    * `backdropFilter: 'blur(20px)'`
    * `backgroundColor: theme.palette.semantic.bg.surface`
    * `border: 1px solid theme.palette.semantic.border.subtle`
    * `borderRadius: theme.palette.semantic.radius.lg` (16px)
    * `boxShadow`: **None** (Flat by default, per V3 Flat UI rule).

### 5.2 Button Component (`UnmessButton`)
* **Base:** MUI `Button` (Variant: Contained)
* **Overrides:**
    * **Shape:** `theme.palette.semantic.radius.md` (8px).
    * **Font:** Monospace, Normal Case (No Uppercase).
    * **Background:** `theme.palette.semantic.action.primary`.
    * **Hover:** Standard Material Darken (No Scale, No Shadow).
    * **Shadow:** **None** (Flat mechanical feel).

### 5.3 Tags (`TagChip`)
* **Base:** MUI `Chip`
* **Overrides:**
    * **Shape:** `theme.palette.semantic.radius.xs` (2px) - Tape style.
    * **Font:** Monospace.
    * **Height:** Compact (`20px` small / `24px` medium).
    * **Background:** `theme.palette.semantic.bg.surface` with colored border.

---

## 6. Motion & Physics

### 6.1 Mechanical Snapping
Motion should feel **precise and mechanical**, not "bouncy."
* **Ease:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (Snappy).
* **Duration:** Fast (`0.2s`).
* **Interactions:** Hover states should feel like a switch flipping or a lens focusing.

### 6.2 Drifting Smoke
Background elements (fog/glows) move very slowly, creating a "breathing" atmosphere behind the crisp UI.

---

## 7. Guardrails for "Noir" Generation

The MCP must ensure:
1.  **Contrast Safety:** Monospace fonts can be thin. Ensure weight is at least `500` or `600` for legibility on dark backgrounds.
2.  **Noise Management:** The film grain texture should be subtle (`opacity: 0.03`), not distracting.
3.  **Color discipline:** NEVER use pure Red, Blue, or Yellow. Always map to `semantic.status.*` tokens.

---

## 8. Summary for MCP

When generating UI code:
* **Think:** "High-End Control Terminal."
* **Fonts:** Headings = Editorial; Data = Monospace.
* **Colors:** Use `semantic.*` tokens exclusively.
* **Physics:** Smoked glass, masking tape, mechanical snapping.
