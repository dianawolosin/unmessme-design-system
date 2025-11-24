import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';
import { tokens } from '../tokens';

export interface AvatarProps extends MuiAvatarProps {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Fallback text (initials)
   */
  children?: React.ReactNode;

  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Active status border
   * @default false
   */
  active?: boolean;
}

/**
 * Avatar Component (Atom)
 * 
 * User identity representation.
 * Geometric container (squircle or circle) with optional status border.
 */
export function Avatar({
  src,
  children,
  size = 'md',
  active = false,
  sx,
  ...props
}: AvatarProps) {
  
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  return (
    <MuiAvatar
      src={src}
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        fontSize: size === 'sm' ? '0.75rem' : '1rem',
        fontFamily: tokens.typography.primitive.fontFamily.mono,
        backgroundColor: tokens.color.semantic.bg.surface,
        color: tokens.color.semantic.text.primary,
        border: active 
          ? `${tokens.border.width.thick} ${tokens.border.style.solid} ${tokens.color.semantic.action.primary}` 
          : `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.highlight}`,
        // Squircle shape for V3
        borderRadius: '25%', 
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiAvatar>
  );
}

