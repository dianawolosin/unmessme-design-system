import { Chip, ChipProps, useTheme } from '@mui/material';

/**
 * Accent colors available for TagChip
 */
export const TAG_ACCENT_COLORS = {
  coral: '#FF6B6B',
  sky: '#4DA3FF',
  mint: '#4ECDC4',
  lilac: '#A78BFA',
  citrus: '#FCD34D',
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
 * TagChip Component
 * 
 * A pill-shaped chip component for displaying and interacting with tags.
 * Core building block of UnmessMe's tag-based problem categorization system.
 * 
 * Based on Material Design 3 Chips, customized with:
 * - Pill shape (fully rounded)
 * - UnmessMe accent colors
 * - 48px touch targets (accessibility)
 * - Three variants: display, filter, input
 * 
 * @example
 * // Display chip (read-only)
 * <TagChip label="money" color="coral" />
 * 
 * @example
 * // Filter chip (toggleable)
 * <TagChip
 *   label="work"
 *   variant="filter"
 *   selected={isSelected}
 *   onClick={handleToggle}
 * />
 * 
 * @example
 * // Input chip (removable)
 * <TagChip
 *   label="stress"
 *   variant="input"
 *   onDelete={handleDelete}
 * />
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
  const backgroundColor = color === 'default'
    ? theme.palette.background.paper
    : TAG_ACCENT_COLORS[color];

  // Determine text color (citrus needs dark text for contrast)
  const textColor = color === 'citrus' ? '#000000' : '#FFFFFF';

  // Build ARIA label
  const computedAriaLabel = ariaLabel || 
    (variant === 'input' 
      ? `Tag: ${label}. Press delete to remove.`
      : variant === 'filter'
      ? `Filter by ${label}`
      : `Tag: ${label}`);

  // Determine if chip is clickable
  const clickable = variant === 'filter' || (variant === 'display' && !!onClick);

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
      // Shape - pill (fully rounded)
      borderRadius: '9999px',
      
      // Colors
      backgroundColor,
      color: textColor,
      
      // Typography
      fontSize: size === 'small' ? '11px' : '12px',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'lowercase',
      
      // Dimensions
      height: size === 'small' ? '24px' : '32px',
      minHeight: size === 'small' ? '24px' : '32px',
      padding: size === 'small' ? '2px 6px' : '4px 8px',
      
      // Touch target (48px minimum) - achieved with margin/padding
      minWidth: 'auto',
      
      // Elevation
      boxShadow: selected 
        ? '0 2px 8px 0 rgba(0, 0, 0, 0.6)'  // Elevated when selected
        : '0 1px 2px 0 rgba(0, 0, 0, 0.5)',  // Subtle default
      
      // Selected state (filter variant)
      ...(selected && variant === 'filter' && {
        border: '2px solid #4DA3FF',
        borderColor: theme.palette.info.main,
      }),
      
      // Hover state (desktop only)
      '&:hover': clickable ? {
        backgroundColor: color === 'default'
          ? theme.palette.background.default
          : backgroundColor,
        transform: 'scale(1.02)',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.6)',
        
        // Prevent sticky hover on mobile
        '@media (hover: none)': {
          transform: 'none',
        },
      } : undefined,
      
      // Focus state (keyboard navigation)
      '&:focus-visible': {
        outline: '3px solid rgba(77, 163, 255, 0.4)',
        outlineOffset: '2px',
      },
      
      // Disabled state
      ...(disabled && {
        opacity: 0.5,
        pointerEvents: 'none',
      }),
      
      // Delete icon styling (input variant)
      '& .MuiChip-deleteIcon': {
        color: textColor,
        opacity: 0.7,
        fontSize: '18px',
        
        '&:hover': {
          opacity: 1,
          color: textColor,
        },
      },
      
      // Smooth transitions
      transition: theme.transitions.create(
        ['transform', 'box-shadow', 'background-color'],
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
 * Useful for displaying multiple tags with visual variety
 * 
 * @example
 * {tags.map((tag, index) => (
 *   <TagChip
 *     key={tag}
 *     label={tag}
 *     color={getRotatedAccentColor(index)}
 *   />
 * ))}
 */
export function getRotatedAccentColor(
  index: number
): keyof typeof TAG_ACCENT_COLORS {
  const colors: (keyof typeof TAG_ACCENT_COLORS)[] = [
    'coral',
    'sky',
    'mint',
    'lilac',
    'citrus',
  ];
  return colors[index % colors.length];
}

