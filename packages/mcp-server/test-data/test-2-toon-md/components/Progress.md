+++
id: "progress"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "feedback"
status: "implemented"
+++

# Progress

Feedback for system status and loading.

## Purpose

To indicate active processing or current stress levels.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `color="analysis"` | `semantic.status.analysis` (Iris) |
| `type="linear"` | Sharp, 2px height (Terminal style) |

## API

```tsx
interface ProgressProps {
  type?: 'linear' | 'circular';
  value?: number;
  color?: 'primary' | 'urgent' | 'analysis';
  size?: number;
}
```

## Usage

```tsx
<Progress type="linear" value={75} color="urgent" />
```

