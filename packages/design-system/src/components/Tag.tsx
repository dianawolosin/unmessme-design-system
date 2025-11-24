import { Chip, ChipProps } from '@mui/material';
import { tokens } from '../tokens';

export interface TagProps extends Omit<ChipProps, 'variant' | 'color' | 'size'> {
  /**
   * Tag label
   */
  label: string;

  /**
   * Visual style of the tag
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost';

  /**
   * Semantic color
   * @default 'neutral'
   */
  color?: 'neutral' | 'brand' | 'urgent' | 'analysis' | 'success';

  /**
   * If true, the tag is rotated slightly to look like tape
   * @default true
   */
  tape?: boolean;

  /**
   * Selected state (for filter usage)
   * @default false
   */
  selected?: boolean;

  /**
   * Size (strictly mapped to tokens)
   * @default 'md'
   */
  size?: 'sm' | 'md';
}

/**
 * Tag Component (Atom)
 * 
 * Represents a single data point, category, or filter.
 * Implements the V3 "Masking Tape" aesthetic.
 */
export function Tag({
  label,
  variant = 'solid',
  color = 'neutral',
  size = 'md',
  tape = true,
  selected = false,
  sx,
  ...props
}: TagProps) {
  // Helper to rotate accent colors for lists if needed
  // Not strictly part of the atom, but useful utility
  
  // Map semantic colors
  const getColor = () => {
    switch (color) {
      case 'brand': return tokens.color.semantic.action.primary;
      case 'urgent': return tokens.color.semantic.status.urgent;
      case 'analysis': return tokens.color.semantic.status.analysis;
      case 'success': return tokens.color.semantic.status.success;
      case 'neutral':
      default: return tokens.color.semantic.text.secondary;
    }
  };

  const accentColor = getColor();

  // Map variant styles
  const getVariantStyles = () => {
    const baseStyles = {
      fontFamily: tokens.typography.semantic.label.tag.font,
      fontWeight: Number(tokens.typography.semantic.label.tag.weight),
      borderRadius: tokens.radius.semantic.xs, // Sharp/Tape
      fontSize: tokens.typography.semantic.label.tag.size,
      textTransform: 'lowercase', // V3 spec
    } as const;

    switch (variant) {
      case 'solid':
        return {
          ...baseStyles,
          backgroundColor: selected 
            ? `${accentColor}33` // Selected filter
            : color === 'neutral' 
              ? tokens.color.semantic.bg.surface 
              : `${accentColor}33`, // Low opacity
          color: tokens.color.semantic.text.primary,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${selected || color !== 'neutral' ? accentColor : 'transparent'}`,
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: color === 'neutral' ? tokens.color.semantic.text.primary : accentColor,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${color === 'neutral' ? tokens.color.semantic.border.subtle : accentColor}`,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: accentColor,
          border: 'none',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <Chip
      label={label}
      sx={{
        ...getVariantStyles(),
        height: size === 'sm' ? tokens.spacing.semantic.layout.height.xs : tokens.spacing.semantic.layout.height.sm,
        '& .MuiChip-label': {
          padding: size === 'sm' ? `0 ${tokens.spacing.primitive.scale['1']}` : `0 ${tokens.spacing.primitive.scale['2']}`,
        },
        // Rotation physics simulation (subtle random tilt)
        transform: tape && variant === 'solid' && !selected ? 'rotate(-0.5deg)' : 'none',
        ...sx,
      }}
      {...props}
    />
  );
}
