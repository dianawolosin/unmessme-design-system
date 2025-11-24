---
id: app-shell
type: component
platform: web
framework: react
base: mui
category: surfaces
status: implemented
---

# AppShell

The high-end, "Digital Noir" container for the UnmessMe application. It establishes the "Midnight Terminal" visual identity with global noise textures, semantic background colors, and the application chrome.

## Purpose

AppShell is the root layout component that:
- Wraps the entire application in the `semantic.bg.canvas` color.
- Applies the cinematic film grain/noise overlay.
- Manages the global smoke/fog effects (optional).
- Provides the standard "UnmessMe" App Bar and user profile avatar.
- Constrains main content to a responsive, readable container.

---

## Design Principles

### V3: Midnight Terminal & Digital Noir

From `/context-engine/unmess_me_ui_blueprint.md`:
- **The Canvas:** Deep, warm slate (`#121619`) that feels like a control room, not a generic dark mode.
- **Analog Texture:** A mandatory film grain overlay prevents the UI from feeling "plastic."
- **Cinematic Utility:** The App Bar is minimal, using the editorial `Fraunces` font for the brand wordmark.

### Material Design 3 Foundation
- **Layout:** Uses standard `AppBar` and `Container` patterns.
- **Z-Indexing:** carefully manages layers so noise sits above background but below interaction.

---

## React Component API

### TypeScript Interface

```tsx
interface AppShellProps {
  /**
   * Main application content
   */
  children: React.ReactNode;

  /**
   * Optional user avatar URL for the top right profile menu
   * @example "https://i.pravatar.cc/150?img=11"
   */
  userAvatarUrl?: string;
}

export function AppShell({ 
  children, 
  userAvatarUrl 
}: AppShellProps): JSX.Element;
```

---

## MUI Components Used

- **[`Box`](https://mui.com/material-ui/react-box/)** - Base container and noise overlay
- **[`GlobalStyles`](https://mui.com/material-ui/react-css-baseline/)** - For keyframes animation
- **[`AppBar`](https://mui.com/material-ui/react-app-bar/)** - Top navigation bar
- **[`Toolbar`](https://mui.com/material-ui/api/toolbar/)** - Content container for App Bar
- **[`Typography`](https://mui.com/material-ui/react-typography/)** - Brand wordmark
- **[`Avatar`](https://mui.com/material-ui/react-avatar/)** - User profile image

---

## Design Tokens Used

References tokens from `/design-system/tokens/`:

### Colors (`colors.json`)
- **Canvas:** `semantic.bg.canvas` (#121619)
- **Border:** `semantic.border.subtle` (rgba(255, 255, 255, 0.08))
- **Text:** `semantic.text.primary` (#E0E1DD)
- **Highlight:** `semantic.border.highlight` (rgba(255, 255, 255, 0.15))

### Typography (`typography.json`)
- **Wordmark:** `h6` (Fraunces), Italic, 700 weight

---

## Implementation Details

### The Noise Overlay

The signature "film grain" is implemented as a fixed `Box` with an SVG filter background pattern. It is animated with CSS keyframes to simulate live static.

```tsx
<Box
  sx={{
    position: 'fixed',
    opacity: 0.03, // Subtle enough not to interfere with text
    pointerEvents: 'none', // Click-through
    zIndex: 0,
    backgroundImage: `url("data:image/svg+xml, ...")`,
    animation: 'noise 0.2s infinite',
  }}
/>
```

### Responsive Layout
- **Mobile:** Padding `p: 2` (16px)
- **Desktop:** Padding `p: 4` (32px), `maxWidth: 'lg'` (1200px)

---

## Usage Examples

### Basic Usage

```tsx
import { AppShell } from '@unmessme/design-system';

function App() {
  return (
    <AppShell userAvatarUrl="/path/to/avatar.jpg">
      <MyDashboard />
    </AppShell>
  );
}
```

---

## Behavior & Interaction

- **Scrolling:** The main content area scrolls while the App Bar remains static (or sticky, depending on configuration).
- **Noise:** The noise overlay remains fixed to the viewport, creating a "camera lens" effect rather than a textured wallpaper.

---

## Related Components

- **ConversationalInput** - Often placed at the top of the AppShell content.
- **ProblemCard** - Displayed within the AppShell's main grid.

---

## Status

**Implemented** - V3 spec compliant.

**Maintainer:** UnmessMe Design System Team

