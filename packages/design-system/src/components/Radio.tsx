import { Radio as MuiRadio, RadioProps as MuiRadioProps, alpha } from '@mui/material';
import { tokens } from '../tokens';

export interface RadioProps extends MuiRadioProps {
  /**
   * Color variant
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'default';
}

/**
 * Radio Component (Atom)
 * 
 * Exclusive selection control.
 * Mechanical, filled circle design.
 */
export function Radio({
  color = 'primary',
  sx,
  ...props
}: RadioProps) {
  
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
    <MuiRadio
      sx={{
        color: tokens.color.semantic.border.highlight,
        '&.Mui-checked': {
          color: activeColor,
        },
        '&:hover': {
          backgroundColor: alpha(activeColor, 0.08),
        },
        ...sx,
      }}
      {...props}
    />
  );
}

