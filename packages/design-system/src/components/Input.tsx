import { TextField, TextFieldProps, alpha } from '@mui/material';
import { tokens } from '../tokens';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * Visual style of the input
   * @default 'outlined'
   */
  variant?: 'outlined' | 'standard' | 'filled';
  
  /**
   * Force monospace font for "code/terminal" feel
   * @default false
   */
  monospace?: boolean;
}

/**
 * Input Component (Atom)
 * 
 * The standard data entry element.
 * Implements the "Terminal Input" aesthetic with focus rings and monospace options.
 */
export function Input({
  variant = 'outlined',
  monospace = false,
  sx,
  ...props
}: InputProps) {
  
  return (
    <TextField
      variant={variant}
      sx={{
        '& .MuiInputBase-root': {
          fontFamily: monospace 
            ? tokens.typography.primitive.fontFamily.mono 
            : tokens.typography.primitive.fontFamily.sans,
          backgroundColor: alpha(tokens.color.semantic.bg.surface, 0.5),
          borderRadius: tokens.radius.semantic.md,
          transition: 'all 0.2s ease',
          
          '&.Mui-focused': {
            backgroundColor: tokens.color.semantic.bg.surface,
            boxShadow: tokens.elevation.semantic.focus_ring,
          }
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.color.semantic.border.subtle,
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.color.semantic.border.highlight,
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.color.semantic.action.primary,
          borderWidth: tokens.border.width.base,
        },
        '& .MuiInputBase-input': {
          color: tokens.color.semantic.text.primary,
          padding: `${tokens.spacing.primitive.scale['3']} ${tokens.spacing.primitive.scale['4']}`, // 12px 16px
        },
        '& .MuiInputLabel-root': {
          color: tokens.color.semantic.text.secondary,
          fontFamily: tokens.typography.primitive.fontFamily.mono,
          fontSize: '0.875rem',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: tokens.color.semantic.action.primary,
        },
        ...sx,
      }}
      {...props}
    />
  );
}

