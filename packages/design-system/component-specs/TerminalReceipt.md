---
id: terminal-receipt
type: component
platform: web
framework: react
base: mui
category: data-display
status: implemented
---

# TerminalReceipt

A testimonial component styled as a thermal receipt or terminal log output.

## Purpose

To present social proof or system logs in a way that feels raw, honest, and technical ("Digital Noir").

## Design Principles

- **Monospace:** Uses `JetBrains Mono` exclusively.
- **Jagged Edge:** CSS gradients simulate a torn paper edge.
- **Low Contrast:** Feels like a background artifact or a printed receipt.

---

## React Component API

```tsx
interface TerminalReceiptProps {
  text: string;
  author: string;
  role?: string;
  timestamp?: string;
}

export function TerminalReceipt(props: TerminalReceiptProps): JSX.Element;
```

---

## Design Tokens Used

### Colors
- **Background:** `semantic.bg.glass_tint`
- **Border:** `semantic.border.subtle` (dashed)
- **Text:** `semantic.text.primary`

---

## Usage

```tsx
<TerminalReceipt
  text="This app saved my Sunday."
  author="Sarah J."
  role="Beta User"
/>
```

