# Avatar

User identity representation.

## Purpose

To display user profile images or initials.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `shape` | `border-radius: 25%` (Squircle) |
| `active` | `border: 2px solid semantic.action.primary` |

## API

```tsx
interface AvatarProps extends MuiAvatarProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
}
```

## Usage

```tsx
<Avatar src="/user.jpg" active />
```