import { Box, BoxProps } from '@mui/material';
import { tokens } from '../tokens';

export interface SurfaceProps extends BoxProps {
  /**
   * Visual style of the surface
   * @default 'glass'
   */
  variant?: 'glass' | 'solid' | 'subtle';

  /**
   * Elevation level
   * @default 'flat'
   */
  elevation?: 'flat' | 'raised' | 'floating';
}

/**
 * Surface Component (Atom)
 * 
 * The foundation for cards, panels, and containers.
 * Implements glassmorphism and depth tokens.
 */
export function Surface({
  children,
  variant = 'glass',
  elevation = 'flat',
  sx,
  ...props
}: SurfaceProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          backgroundColor: tokens.color.semantic.bg.surface,
          backdropFilter: `blur(${tokens.effect.blur.md})`,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
        };
      case 'solid':
        return {
          backgroundColor: tokens.color.semantic.bg.canvas, // or a solid surface color if we had one
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
        };
      case 'subtle':
        return {
          backgroundColor: tokens.color.semantic.bg.glass_tint,
          border: 'none',
        };
      default:
        return {};
    }
  };

  const getElevationStyles = () => {
    switch (elevation) {
      case 'raised':
        return { boxShadow: tokens.elevation.semantic.card.rest };
      case 'floating':
        return { boxShadow: tokens.elevation.semantic.modal };
      case 'flat':
      default:
        return { boxShadow: 'none' };
    }
  };

  return (
    <Box
      sx={{
        borderRadius: tokens.radius.semantic.lg,
        overflow: 'hidden',
        position: 'relative',
        ...getVariantStyles(),
        ...getElevationStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
