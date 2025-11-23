# UnmessMe – UI Blueprint (V2: Frosted Chaos & Playful Physics)

## 1. Visual North Star

**"The Magical Messy Desk."**

UnmessMe is not a productivity tool; it is a **sentient, playful void**. The visual identity transforms "chaos" (floating, tilted, slightly messy elements) into "clarity" (snapping into grids, glowing with progress) through user interaction.

The vibe is:
* **Ethereal Dark Mode:** Deep void backgrounds with slow-moving, multi-colored "aurora" blobs.
* **Frosted Glass (Glassmorphism):** UI elements are translucent panes that float above the void.
* **Tactile Physics:** Buttons squish, cards tilt, and tags feel like stickers.
* **Optimistic Energy:** High-saturation glows against deep charcoal.

---

## 2. Color System (Deep Void & Neon Glows)

We do not use flat colors. We use **light sources**.

### 2.1 The Void (Backgrounds)
Instead of solid grey, we use deep, rich darks to make the "glass" pop.
* **Deep Space:** `#0F0F11` (Main Background)
* **Midnight Glass:** `rgba(30, 30, 35, 0.6)` (Card Surface)
* **Scrim:** `rgba(0,0,0,0.4)` (Text protection layers)

### 2.2 The Energy (Gradients & Glows)
Accent colors are rarely used as solid fills. They are used as **mesh gradients** or **drop shadows**.
* **Coral Glow:** `#FF6B6B` → Used for "Urgency" and warm emotions.
* **Electric Mint:** `#4ECDC4` → Used for "Unmessing" and success states.
* **Hype Lilac:** `#A663CC` → Used for "Deep Thoughts" and introspection.
* **Sunshine:** `#FFD93D` → Highlights and sparks.

**Rule:** Every card has a subtle colored `box-shadow` matching its primary tag color to create a "bioluminescent" effect.

---

## 3. Shape & Geometry

### 3.1 "The Stack" Aesthetic
* **Tilted Interaction:** Elements shouldn't always be perfectly straight.
    * **Rest State:** Subtle random rotation (`-1deg` to `1deg`).
    * **Hover State:** Snaps to `0deg` and scales up (`1.02x`).
    * **Metaphor:** It feels like sorting through a pile of papers.
* **Super-Rounded Corners:** `borderRadius: 24px` (Cards) to `32px` (Buttons). No sharp edges anywhere. The UI should feel safe to touch.

### 3.2 "Sticker" Tags
Tags are not corporate chips. They look like stickers stuck onto the glass.
* White/Light border (`1px solid rgba(255,255,255,0.2)`).
* Slight drop shadow (`0 2px 4px rgba(0,0,0,0.2)`).
* Vibrant gradient backgrounds.

---

## 4. Material UI Component Mappings (The "Vibe" Overrides)

The MCP must generate React code that heavily overrides standard MUI styles.

### 4.1 Glass Card (`ProblemCard`)
Replaces the standard MUI Card.
* **Prop:** `backdropFilter: 'blur(16px)'`
* **Prop:** `background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)'`
* **Border:** `1px solid rgba(255, 255, 255, 0.08)`
* **Shadow:** `0 8px 32px 0 rgba(0, 0, 0, 0.3)`
* **Action:** Uses Framer Motion for the "tilt-to-straight" hover effect.

### 4.2 Living FAB (`UnmessButton`)
Replaces the standard CTA.
* **Animation:** Uses a "breathing" shadow effect (glow expands and contracts).
* **Press State:** "Squishes" down (`scale: 0.9`) on click (Spring physics).
* **Gradient:** Horizontal gradient (Mint → Blue).

### 4.3 Chat Bubbles
* **User:** Translucent white glass (`rgba(255,255,255,0.1)`).
* **UnmessMe:** Gradient glass (Lilac tint).
* **Shape:** `borderRadius: 20px`, but `4px` on the corner originating the text.

---

## 5. Typography

We mix functional clarity with editorial personality.

* **Headlines (H1, H2):** **Fraunces** (Soft Serif) or **Space Grotesk**. Gives it that "zine" or "editorial" feel.
* **Body / UI:** **Inter** or **DM Sans**. Clean, legible, high x-height.
* **Tone:** Large, confident text. Don't hide the mess in small print.

---

## 6. Motion & Physics Principles

Motion is the primary way we communicate "Unmessing."

### 6.1 The "Pop"
When a task is completed or a problem is categorized:
* **Effect:** Confetti explosion of tiny geometric shapes (triangles, circles).
* **Physics:** Spring-based, bouncy. No linear ease-in-out.

### 6.2 Drifting
Background elements (the "Aurora Blobs") must slowly drift and morph.
* **Speed:** Very slow (20s duration loops).
* **Effect:** Creates a feeling of a "living" background.

### 6.3 Reduced Motion (Accessibility)
* If `prefers-reduced-motion` is true:
    * Disable card tilts.
    * Stop background drifting.
    * Change "squish" buttons to simple opacity changes.

---

## 7. Layout Strategy

### 7.1 The "Floating" Dashboard
Instead of a rigid grid:
* Use a **Masonry** layout where cards interlock.
* Ample negative space (The Void).
* Content stays centered; background provides the atmosphere.

### 7.2 Z-Index Layering
1.  **Deep Space (Layer 0):** The dark background.
2.  **Aurora (Layer 1):** Blurry colored blobs.
3.  **Glass (Layer 2):** Cards and Interface.
4.  **Light (Layer 3):** Text and Buttons.

---

## 8. Guardrails for "Vibe" Generation

The MCP must ensure:
1.  **Legibility:** Glassmorphism can kill contrast. Always verify text contrast against the *darkest possible* value of the blur.
2.  **Performance:** Do not over-use `backdrop-filter` on mobile views. Fall back to solid semi-transparent colors if needed.
3.  **No "Jiggle" Overload:** Only interactive elements (cards, buttons) should move on hover. Text should remain stable.

---

## 9. Summary for MCP

When generating UI code, the MCP acts as a **Creative Coder**.
* **Don't use:** `Paper`, `elevation={1}`, gray backgrounds.
* **Do use:** `backdropFilter`, `linear-gradient`, `framer-motion`, `borderRadius: 24px`.
* **Goal:** Make it look like a sci-fi magical girl's inventory screen.