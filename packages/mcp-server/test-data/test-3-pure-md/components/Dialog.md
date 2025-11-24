# Dialog

A modal interruption for critical decisions.

## Purpose

To focus attention on a single task or alert.

## Design Tokens

| Prop | Token Source |
| :--- | :--- |
| `paper` | `Surface` atom (Glass variant) |
| `backdrop` | `blur(4px)`, `rgba(0,0,0,0.7)` |
| `elevation` | `elevation.semantic.modal` |

## API

```tsx
interface DialogProps extends MuiDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
```

## Usage

```tsx
<Dialog 
  open={isOpen} 
  onClose={handleClose}
  title="System Alert"
  actions={<Button onClick={handleClose}>Acknowledge</Button>}
>
  <Typography>Critical failure imminent.</Typography>
</Dialog>
```