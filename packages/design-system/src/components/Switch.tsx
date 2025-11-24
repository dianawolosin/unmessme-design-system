import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps, alpha } from '@mui/material';
import { tokens } from '../tokens';

export interface SwitchProps extends MuiSwitchProps {
  /**
   * Color variant
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'default';
}

/**
 * Switch Component (Atom)
 * 
 * A mechanical toggle switch.
 * Flat design, high contrast active state.
 */
export function Switch({
  color = 'primary',
  sx,
  ...props
}: SwitchProps) {
  
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
    <MuiSwitch
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: activeColor,
          '&:hover': {
            backgroundColor: alpha(activeColor, 0.08),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: activeColor,
        },
        '& .MuiSwitch-track': {
          backgroundColor: tokens.color.semantic.border.highlight,
        },
        ...sx,
      }}
      {...props}
    />
  );
}

