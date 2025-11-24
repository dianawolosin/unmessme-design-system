import { Button as MuiButton, ButtonProps as MuiButtonProps, alpha } from '@mui/material';
import { tokens } from '../tokens';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  /**
   * The variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * If true, the button will take up the full width of its container.
   * @default false
   */
  isFullWidth?: boolean;
}

/**
 * Button Component (Atom)
 * 
 * The fundamental interaction element of the UnmessMe design system.
 * Directly implements semantic action tokens.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  sx,
  ...props
}: ButtonProps) {
  // Map variants to token values
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: tokens.color.semantic.action.primary,
          color: tokens.color.semantic.text.inverse,
          boxShadow: tokens.elevation.semantic.button.primary,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} transparent`,
          '&:hover': {
            backgroundColor: tokens.color.semantic.action.hover,
            boxShadow: tokens.elevation.semantic.button.hover,
          },
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: tokens.color.semantic.text.primary,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.highlight}`,
          '&:hover': {
            borderColor: tokens.color.semantic.action.primary,
            color: tokens.color.semantic.action.primary,
            backgroundColor: alpha(tokens.color.semantic.action.primary, 0.05),
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: tokens.color.semantic.text.secondary,
          border: 'none',
          '&:hover': {
            color: tokens.color.semantic.text.primary,
            backgroundColor: alpha(tokens.color.semantic.bg.surface, 0.5),
          },
        };
      case 'danger':
        return {
          backgroundColor: 'transparent',
          color: tokens.color.semantic.status.urgent,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.status.urgent}`,
          '&:hover': {
            backgroundColor: alpha(tokens.color.semantic.status.urgent, 0.1),
          },
        };
      default:
        return {};
    }
  };

  // Map sizes
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: tokens.spacing.semantic.layout.height.md,
          padding: `0 ${tokens.spacing.primitive.scale['3']}`, // 12px
          fontSize: tokens.typography.semantic.label.button.size,
        };
      case 'lg':
        return {
          height: tokens.spacing.semantic.layout.height.xl,
          padding: `0 ${tokens.spacing.primitive.scale['8']}`, // 32px
          fontSize: '1rem',
        };
      case 'md':
      default:
        return {
          height: tokens.spacing.semantic.layout.height.lg, // Standard touch target
          padding: `0 ${tokens.spacing.primitive.scale['6']}`, // 24px
          fontSize: tokens.typography.semantic.label.button.size,
        };
    }
  };

  return (
    <MuiButton
      disableElevation
      fullWidth={isFullWidth}
      sx={{
        // Base styles from tokens
        fontFamily: tokens.typography.semantic.label.button.font,
        fontWeight: Number(tokens.typography.semantic.label.button.weight),
        borderRadius: tokens.radius.semantic.md,
        textTransform: 'none', // Use Title Case in content
        letterSpacing: '0.02em',
        transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)', // Mechanical snap
        
        // Dynamic styles
        ...getVariantStyles(),
        ...getSizeStyles(),
        
        // Disabled state
        '&.Mui-disabled': {
          opacity: 0.5,
          color: tokens.color.semantic.text.disabled,
          backgroundColor: alpha(tokens.color.semantic.bg.surface, 0.5),
          border: 'none',
        },

        // Custom overrides
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
