import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, alpha } from '@mui/material';
import { tokens } from '../tokens';

export interface CheckboxProps extends MuiCheckboxProps {
  /**
   * Color variant
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'default';
}

/**
 * Checkbox Component (Atom)
 * 
 * A mechanical binary choice input.
 * Uses a square look to match the "digital terminal" V3 aesthetic.
 */
export function Checkbox({
  color = 'primary',
  sx,
  ...props
}: CheckboxProps) {
  
  // Map colors to tokens
  const getColor = () => {
    switch (color) {
      case 'primary': return tokens.color.semantic.action.primary;
      case 'secondary': return tokens.color.semantic.status.urgent;
      case 'success': return tokens.color.semantic.status.success;
      case 'default': default: return tokens.color.semantic.text.secondary;
    }
  };

  const activeColor = getColor();

  return (
    <MuiCheckbox
      sx={{
        color: tokens.color.semantic.border.highlight,
        '&.Mui-checked': {
          color: activeColor,
        },
        '&:hover': {
          backgroundColor: alpha(activeColor, 0.08),
        },
        '& .MuiSvgIcon-root': {
          borderRadius: tokens.radius.semantic.xs, // Sharp corners
        },
        ...sx,
      }}
      {...props}
    />
  );
}

