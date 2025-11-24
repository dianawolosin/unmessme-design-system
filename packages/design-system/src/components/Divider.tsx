import { Divider as MuiDivider, DividerProps as MuiDividerProps } from '@mui/material';
import { tokens } from '../tokens';

export interface DividerProps extends Omit<MuiDividerProps, 'variant'> {
  /**
   * Visual style
   * - "solid": Standard subtle hair line
   * - "dashed": Receipt tear-off line
   * @default "solid"
   */
  variant?: 'solid' | 'dashed';
  
  /**
   * Semantic color intensity
   * @default "subtle"
   */
  intensity?: 'subtle' | 'highlight' | 'bold';
}

/**
 * Divider Component (Atom)
 * 
 * Visual separation element.
 * Crucial for the "Receipt" aesthetic (dashed lines).
 */
export function Divider({
  variant = 'solid',
  intensity = 'subtle',
  sx,
  ...props
}: DividerProps) {
  
  const getColor = () => {
    switch (intensity) {
      case 'bold': return tokens.color.semantic.text.secondary;
      case 'highlight': return tokens.color.semantic.border.highlight;
      case 'subtle':
      default: return tokens.color.semantic.border.subtle;
    }
  };

  return (
    <MuiDivider
      sx={{
        borderColor: getColor(),
        borderStyle: variant,
        borderWidth: tokens.border.width.base,
        ...(variant === 'dashed' && {
          borderWidth: `0px 0px ${tokens.border.width.base} 0px`, // Bottom border only for dashed usually
        }),
        ...sx,
      }}
      {...props}
    />
  );
}

