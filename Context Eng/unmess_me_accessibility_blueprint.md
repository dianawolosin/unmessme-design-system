# UnmessMe – Accessibility Blueprint (Web App with React + MUI, Dark Mode, Conversational UI)

## 1. Purpose
This blueprint defines **accessibility requirements and constraints** specifically for AI + MCP-driven prototyping. It ensures that whenever the MCP or the AI generates screens, flows, UI structures, component specs, or layout suggestions for UnmessMe, those outputs:
- follow accessibility best practices
- meet WCAG 2.2 AA (minimum) + web accessibility expectations
- respect dark‑mode contrast rules
- adhere to conversational accessibility constraints
- avoid generating inaccessible component combinations

This blueprint is a **design‑time specification** the MCP must consult during prototyping. It is NOT for runtime QA—it is a contract for the model on how to create accessible prototypes.

MCP tools MUST read and honor this blueprint when generating:
- `screen_spec`
- `component_spec`
- `flow_spec`
- layout suggestions
- UI code (React/JSX)
- accessibility flags in metadata

The MCP should block or adjust any UI proposal that violates these rules.
This blueprint defines **accessibility requirements and constraints** for UnmessMe as a web application (React + MUI), dark-mode, conversational app. It extends Material UI accessibility guidance and WCAG 2.2 AA (at minimum) with product-specific rules for:
- dark backgrounds + bright accents
- conversational UI
- emotional / satirical content
- voice input (Web Speech API)
- desktop-first responsive design
- keyboard navigation and screen reader support

---

## 2. Standards & References
- **WCAG 2.1/2.2 AA** as baseline (targeting AAA where feasible)
- **Material UI Accessibility** guidelines
- **React accessibility** best practices
- **Web accessibility** patterns:
  - Screen reader support (NVDA, JAWS, VoiceOver, TalkBack on mobile)
  - Keyboard navigation (tab order, focus management)
  - ARIA labels and roles
  - Semantic HTML
  - Minimum touch/click targets (48 x 48 px)
  - Browser font scaling / zoom support
  - System dark mode (prefers-color-scheme)
  - Reduced motion (prefers-reduced-motion)

UnmessMe must respect **browser and system accessibility settings** wherever possible. MUI provides robust accessibility support out of the box.

---

## 3. Color & Contrast (Dark Mode)
### 3.1 Contrast Ratios
- Text on background: **≥ 4.5:1** for body text, **3:1** for large text.
- Icon-only controls: **≥ 3:1** against background.
- Disabled states: visually distinct but still legible where critical.

### 3.2 Dark Background + Bright Accents
- Ensure each accent color (coral, blue, mint, lilac, yellow) passes contrast requirements when used for:
  - text on dark surface
  - icon on dark surface
  - chip background with dark or light label text
- Provide **accessible variants** of accent colors if contrast fails.

### 3.3 Bento Cards
- Card background vs text must meet contrast ratios.
- Tag chips on cards must meet contrast both vs card and vs label text.

### 3.4 States & Focus
- Hover/focus/pressed states must remain clearly visible on dark backgrounds.
- Focus indicators must meet **3:1** contrast vs adjacent colors.

---

## 4. Typography & Layout
### 4.1 Text Scaling
- Support **browser zoom** and **font scaling** up to at least 200% without:
  - clipping
  - truncating important content
  - making controls unreachable
  - horizontal scrolling (within reason)
- Chat bubbles and cards must wrap text gracefully.
- Use relative units (rem, em) instead of fixed px for typography where appropriate.

### 4.2 Line Length & Spacing
- Conversational text should maintain comfortable line lengths.
- Provide adequate line height for readability, especially at larger text sizes.

### 4.3 Touch/Click Targets
- All clickable/tappable elements must be **≥ 48 x 48 px** (desktop + mobile):
  - Buttons
  - FABs
  - Chips
  - Card actions (Start, View plan)
  - Mic button
  - Unmess Me button
- Ensure adequate spacing between interactive elements

---

## 5. Motion & Animation
### 5.1 Respect System Settings
- If user has **Reduce Motion** or similar accessibility setting enabled:
  - disable non-essential floating shapes
  - simplify transitions
  - remove parallax / complex movement

### 5.2 Motion Guidelines
- Keep animations:
  - short (150–250 ms)
  - predictable
  - purpose-driven (feedback, context, hierarchy)
- No sudden flashes, rapid blinking, or high-frequency motion.

---

## 6. Conversational UI Accessibility
### 6.1 Structure for Screen Readers
- Each message in the chat must be a distinct, accessible node.
- Use proper ARIA labels (`aria-label`, `aria-labelledby`) and roles.
- Semantic HTML structure:
  - Messages in `<ul>` / `<li>` or appropriate semantic containers
  - `role="log"` or `role="list"` for chat container
- Associate role / semantics:
  - user messages vs assistant messages
  - timestamp where relevant
- Announce new messages politely using `aria-live="polite"` without stealing focus mid-typing.
- Keyboard navigation: focus management for chat input.

### 6.2 Clarifying Questions
- Keep follow-up questions:
  - short
  - unambiguous
  - one concept at a time
- Avoid nested questions or double negatives.

### 6.3 Error & Empty States
- Provide clear, plain-language explanations (no solely visual cues).
- Example: "I didn’t catch that audio. Can you type it or try again?"

---

## 7. Voice Input & Audio
### 7.1 Voice Input
- Mic button must be:
  - clearly labeled with `aria-label` (e.g., "Start voice input")
  - accessible via keyboard (tab + Enter/Space)
  - have visible focus indicator
  - indicate state (listening/not listening) accessibly
- Provide text input alternative if microphone access is denied or unavailable.
- Use Web Speech API with graceful fallback.

### 7.2 Audio Feedback
- Avoid auto-playing sounds.
- If audio feedback is added later, it must:
  - be optional
  - respect system volume & sound settings

---

## 8. Emotional & Satirical Content Safety
### 8.1 Tone Adjustments
- Humor must never:
  - mock the user
  - diminish serious feelings
  - include sarcasm about self-harm, trauma, or marginalization

### 8.2 Plain-Language Disclaimers
- Visible, concise statements in relevant views:
  - "UnmessMe is not medical or professional advice."
  - "If you’re in immediate danger or severe distress, contact local emergency services."

### 8.3 Crisis Detection
- If user input suggests self-harm or severe crisis:
  - reduce humor to zero
  - display supportive, direct language
  - point to emergency or professional resources

---

## 9. Component-Level Accessibility Requirements
### 9.1 Chat Bubble
- Accessible labels for screen readers (who said what).
- High contrast between bubble and text.

### 9.2 Problem Card (Bento)
- Entire card or main action area must be a clear tap target.
- Tags announced as part of the card content.

### 9.3 Tag Chips
- Must be selectable via keyboard (tab navigation + Enter/Space).
- Use `role="button"` or MUI `Chip` (which handles this).
- Ensure contrast of tag background vs label and surrounding card.
- Clear focus indicators.

### 9.4 FAB / Unmess Me Button
- Large, high-contrast, clear label.
- Keyboard accessible (focusable, activatable with Enter/Space).
- Use MUI `Fab` or `Button` with proper `aria-label`.
- Clear focus indicator.

### 9.5 Dashboard Sections
- Each section should have an accessible heading.
- Cards within sections announced in order.

---

## 10. Responsive & Cross-Device Considerations
- **Desktop-first** responsive design (benefits dashboard/organizational UI).
- Support tablet and mobile viewports (responsive breakpoints).
- Test with:
  - **Desktop**: Keyboard navigation, screen readers (NVDA, JAWS, VoiceOver)
  - **Mobile web**: Touch targets, screen readers (VoiceOver on iOS, TalkBack on Android)
  - **Browser zoom**: Up to 200% without breaking layout
- MUI's responsive utilities (`useMediaQuery`, `sx` prop) ensure consistency.
- Ensure all modals/dialogs are keyboard-accessible (Esc to close, focus trap).

---

## 11. Testing Strategy
- Manual tests with screen readers: **NVDA, JAWS** (Windows), **VoiceOver** (macOS/iOS), **TalkBack** (Android mobile web)
- Contrast checks for all color combinations (WCAG 2.2 AA, targeting AAA where feasible)
- Browser zoom testing up to 200%
- Motion reduction tests (`prefers-reduced-motion`)
- Keyboard-only navigation testing (no mouse)
- Automated tools: **axe DevTools**, **Lighthouse**, **WAVE**
- MUI's built-in accessibility features validation

---

## 12. Integration with Other Blueprints
- **UI Blueprint:** color and component choices must pass this accessibility spec.
- **UX Blueprint:** conversational flows must consider cognitive load and clarity.
- **Ethical Guardrails:** crisis handling, disclaimers, and tone are aligned with accessibility needs.

This blueprint is the reference point for all future visual and interaction design decisions for UnmessMe as a React + MUI web application.

