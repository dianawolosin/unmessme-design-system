import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';
import { tokens } from '../tokens';

export interface BadgeProps extends Omit<MuiBadgeProps, 'color'> {
  /**
   * Variant type
   * - "dot": Small status indicator
   * - "standard": Number count
   * @default "standard"
   */
  variant?: 'dot' | 'standard';

  /**
   * Semantic color
   * @default "primary"
   */
  color?: 'primary' | 'urgent' | 'analysis' | 'success';
}

/**
 * Badge Component (Atom)
 * 
 * Notification and status indicator.
 * Sharp, high-contrast markers attached to other atoms.
 */
export function Badge({
  variant = 'standard',
  color = 'primary',
  children,
  sx,
  ...props
}: BadgeProps) {
  
  const getColor = () => {
    switch (color) {
      case 'urgent': return tokens.color.semantic.status.urgent;
      case 'analysis': return tokens.color.semantic.status.analysis;
      case 'success': return tokens.color.semantic.status.success;
      case 'primary':
      default: return tokens.color.semantic.action.primary;
    }
  };

  return (
    <MuiBadge
      variant={variant}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: getColor(),
          color: tokens.color.semantic.text.inverse,
          fontFamily: tokens.typography.primitive.fontFamily.mono,
          fontWeight: 'bold',
          borderRadius: variant === 'dot' ? tokens.radius.semantic.circle : tokens.radius.semantic.sm, // Square badge for numbers
          fontSize: '0.7rem',
          height: variant === 'dot' ? 8 : 18,
          minWidth: variant === 'dot' ? 8 : 18,
          padding: variant === 'dot' ? 0 : `0 ${tokens.spacing.primitive.scale['1']}`,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiBadge>
  );
}

