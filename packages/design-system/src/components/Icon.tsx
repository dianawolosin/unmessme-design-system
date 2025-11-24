import { Box, SvgIconProps } from '@mui/material';

export interface IconProps extends Omit<SvgIconProps, 'color'> {
  /**
   * Semantic Size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Semantic Color
   */
  color?: string; // Accepts semantic token string
}

/**
 * Icon Component (Atom)
 * 
 * Wrapper for SVG icons to enforce sizing and color tokens.
 * Note: This component wraps children (the actual SVG).
 */
export function Icon({
  size = 'md',
  color,
  children,
  sx,
  ...props
}: IconProps) {
  
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeMap[size],
        height: sizeMap[size],
        color: color || 'inherit',
        
        '& svg': {
          width: '100%',
          height: '100%',
        },
        ...sx,
      }}
      {...props as any}
    >
      {children}
    </Box>
  );
}

