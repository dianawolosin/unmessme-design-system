import { Chip, ChipProps, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Accent colors available for TagChip (V3: Terminal)
 */
export const TAG_ACCENT_COLORS = {
  terracotta: '#E07A5F',
  iris: '#8187DC',
  seafoam: '#2A9D8F',
  bone: '#E0E1DD',
  charcoal: '#3D405B',
} as const;

/**
 * Props for TagChip component
 */
export interface TagChipProps {
  /**
   * Tag label - 1-2 words, lowercase, screen-reader friendly
   * @example "money", "work stress", "avoidance"
   */
  label: string;

  /**
   * Variant determines behavior and styling
   * - "input": Removable chip with close icon (problem card editing)
   * - "filter": Toggleable chip for filtering (dashboard)
   * - "display": Static chip, no interaction (read-only views)
   * @default "display"
   */
  variant?: 'input' | 'filter' | 'display';

  /**
   * Color variant - uses UnmessMe accent colors
   * @default "default" (neutral gray)
   */
  color?: 'default' | keyof typeof TAG_ACCENT_COLORS;

  /**
   * Selected state - for filter chips
   * Visually indicates active filter
   */
  selected?: boolean;

  /**
   * Size variant
   * @default "medium"
   */
  size?: 'small' | 'medium';

  /**
   * Click handler - for filtering or navigation
   */
  onClick?: () => void;

  /**
   * Delete handler - for input chips (removable tags)
   */
  onDelete?: () => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Icon override (optional)
   * Default: no icon for display, close icon for input
   */
  icon?: React.ReactElement;

  /**
   * Accessibility label override
   * Auto-generated if not provided
   */
  ariaLabel?: string;
}

/**
 * TagChip Component (V3: Masking Tape)
 * 
 * A rectangular, tape-like chip component for displaying tags.
 * V3 styling: Masking tape aesthetic, monospace font, slight rotation.
 * 
 * @example
 * // Display chip (read-only)
 * <TagChip label="money" color="terracotta" />
 */
export function TagChip({
  label,
  variant = 'display',
  color = 'default',
  selected = false,
  size = 'medium',
  onClick,
  onDelete,
  disabled = false,
  icon,
  ariaLabel,
}: TagChipProps) {
  const theme = useTheme();

  // Determine background color
  const accentHex = color === 'default'
    ? theme.palette.semantic.bg.surface // Use semantic surface
    : TAG_ACCENT_COLORS[color];

  // Tape Style: Low opacity background + solid border
  const backgroundColor = color === 'default' 
    ? accentHex 
    : `${accentHex}33`; // 20% opacity

  const borderColor = color === 'default'
    ? 'transparent'
    : accentHex;

  // Determine text color
  const textColor = color === 'default' 
    ? theme.palette.semantic.text.primary // Use semantic text
    : theme.palette.semantic.text.primary; // Keep all text Bone White for consistency

  // Build ARIA label
  const computedAriaLabel = ariaLabel || 
    (variant === 'input' 
      ? `Tag: ${label}. Press delete to remove.`
      : variant === 'filter'
      ? `Filter by ${label}`
      : `Tag: ${label}`);

  // Determine if chip is clickable
  const clickable = variant === 'filter' || (variant === 'display' && !!onClick);

  // Random rotation for "tape" effect (-2deg to 2deg)
  const seed = label.length;
  const rotation = variant === 'display' ? (seed % 5) - 2 : 0;

  // Build MUI Chip props
  const chipProps: ChipProps = {
    label,
    size,
    disabled,
    icon,
    onClick: clickable ? onClick : undefined,
    onDelete: variant === 'input' ? onDelete : undefined,
    clickable,
    
    // Accessibility
    'aria-label': computedAriaLabel,
    ...(variant === 'filter' && {
      role: 'button',
      'aria-pressed': selected,
      tabIndex: disabled ? -1 : 0,
    }),

    // Keyboard navigation for filter chips
    ...(variant === 'filter' && onClick && {
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      },
    }),

    // Styling
    sx: {
      // Shape - Tape (Rectangular with slight radius)
      borderRadius: '2px',
      
      // Colors
      backgroundColor,
      color: textColor,
      border: `1px solid ${borderColor}`,
      
      // Typography (Monospace for V3)
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: size === 'small' ? '11px' : '12px', // Slightly larger text
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'lowercase', // Masking tape style (lowercase)
      
      // Dimensions
      height: size === 'small' ? '20px' : '24px', // Revert to tight height (masking tape)
      
      // Override MUI Chip label padding
      '& .MuiChip-label': {
        paddingLeft: size === 'small' ? '4px' : '6px',
        paddingRight: size === 'small' ? '4px' : '6px',
        // Ensure text is vertically centered in tighter height
        lineHeight: 1,
        display: 'block',
      },

      padding: size === 'small' ? '0px 2px' : '0px 4px', // Minimal padding
      
      // Force override potential MUI min-heights
      minHeight: 'unset',
      
      // Touch target (48px minimum) - achieved with margin/padding wrapper if needed
      minWidth: 'auto',
      
      // Physics
      transform: `rotate(${rotation}deg)`,
      
      // Hover state (desktop only)
      '&:hover': clickable ? {
        backgroundColor: color === 'default'
          ? theme.palette.background.default
          : `${accentHex}66`, // Darker on hover
        transform: 'rotate(0deg) scale(1.05)', // Snap straight
        
        // Prevent sticky hover on mobile
        '@media (hover: none)': {
          transform: `rotate(${rotation}deg)`,
        },
      } : undefined,
      
      // Focus state
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.semantic.status.success}`, // Use semantic success (Seafoam)
        outlineOffset: '2px',
        transform: 'rotate(0deg)',
      },
      
      // Disabled state
      ...(disabled && {
        opacity: 0.5,
        pointerEvents: 'none',
      }),
      
      // Delete icon styling
      '& .MuiChip-deleteIcon': {
        color: textColor,
        opacity: 0.7,
        fontSize: '14px',
        
        '&:hover': {
          opacity: 1,
          color: textColor,
        },
      },
      
      // Smooth transitions
      transition: theme.transitions.create(
        ['transform', 'box-shadow', 'background-color', 'border-color'],
        {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
    },
  };

  return <Chip {...chipProps} />;
}

/**
 * Helper function to rotate through accent colors
 */
export function getRotatedAccentColor(
  index: number
): keyof typeof TAG_ACCENT_COLORS {
  const colors: (keyof typeof TAG_ACCENT_COLORS)[] = [
    'terracotta',
    'iris',
    'seafoam',
    'charcoal',
  ];
  return colors[index % colors.length];
}
