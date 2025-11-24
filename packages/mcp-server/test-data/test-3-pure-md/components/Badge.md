# Badge

Notification and status indicator.

## Purpose

To flag items with count or status.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `variant="dot"` | `8px` circle |
| `color="urgent"` | `semantic.status.urgent` |

## API

```tsx
interface BadgeProps extends MuiBadgeProps {
  variant?: 'dot' | 'standard';
  color?: 'primary' | 'urgent' | 'analysis' | 'success';
}
```

## Usage

```tsx
<Badge variant="dot" color="urgent">
  <Icon />
</Badge>
```