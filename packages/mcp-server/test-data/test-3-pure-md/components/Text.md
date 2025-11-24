# Text

The universal typography element.

## Purpose

To enforce the "Editorial vs. Terminal" font pairing of UnmessMe.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="display"` | `semantic.heading.display` (Fraunces) |
| `variant="code"` | `typography.primitive.fontFamily.mono` (JetBrains Mono) |
| `variant="body"` | `typography.primitive.fontFamily.sans` (Inter) |

## API

```tsx
interface TextProps extends MuiTypographyProps {
  variant?: 'display' | 'heading' | 'body' | 'code';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'regular' | 'medium' | 'bold';
}
```

## Usage

```tsx
<Text variant="display" size="3xl">UnmessMe</Text>
<Text variant="code">SYSTEM_READY</Text>
```