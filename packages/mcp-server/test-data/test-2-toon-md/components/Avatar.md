+++
id: "avatar"
type: "component"
platform: "web"
framework: "react"
base: "mui"
category: "data-display"
status: "implemented"
+++

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

