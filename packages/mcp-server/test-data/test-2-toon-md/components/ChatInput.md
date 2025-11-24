+++
id: "chat-input"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "inputs"
status: "implemented"
+++

# ChatInput

A conversational input field.

## Purpose

To collect user input in a "chat with a friend" format.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `font` | `semantic.heading.display` (Fraunces) |
| `placeholder` | `semantic.text.secondary` (Italic) |

## API

```tsx
interface ChatInputProps {
  placeholder?: string;
  onSubmit: (text: string) => void;
  isThinking?: boolean;
  disabled?: boolean;
}
```

## Usage

```tsx
<ChatInput onSubmit={handleSend} />
```

