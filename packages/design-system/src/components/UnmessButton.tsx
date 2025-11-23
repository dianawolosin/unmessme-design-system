import React from 'react';
import { Fab, CircularProgress, Box, useTheme, SxProps, Theme } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

/**
 * Props for UnmessButton component
 */
export interface UnmessButtonProps {
  /**
   * Button variant
   * - "regular": Icon-only FAB (56x56px)
   * - "extended": Icon + text FAB (auto width)
   * @default "extended"
   */
  variant?: 'regular' | 'extended';

  /**
   * Button label text (for extended variant)
   * @default "Unmess Me"
   */
  label?: string;

  /**
   * Icon override (optional)
   * Default: AutoAwesome icon (✨ sparkles - represents "make order from chaos")
   */
  icon?: React.ReactElement;

  /**
   * Click handler - triggers unmess flow
   * Required - must have action
   */
  onClick: () => void;

  /**
   * Loading state - shows during async unmess operation
   * Displays spinner, disables interaction
   */
  loading?: boolean;

  /**
   * Disabled state
   * Prevents interaction, reduces opacity
   */
  disabled?: boolean;

  /**
   * Size variant
   * - "small": 40px diameter (compact layouts)
   * - "medium": 56px diameter (standard, default)
   * - "large": 64px diameter (hero placement)
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Color variant
   * @default "primary" (sky blue)
   */
  color?: 'primary' | 'secondary';

  /**
   * Position variant
   * Controls fixed positioning behavior
   * @default "fixed"
   */
  position?: 'fixed' | 'static';

  /**
   * Accessibility label override
   * Auto-generated if not provided
   */
  ariaLabel?: string;

  /**
   * Custom sx prop for additional styling
   */
  sx?: SxProps<Theme>;
}

/**
 * UnmessButton Component
 * 
 * A prominent Floating Action Button (FAB) that triggers UnmessMe's core action:
 * breaking down chaotic problems into structured, actionable steps.
 */
export function UnmessButton({
  variant = 'extended',
  label = 'Unmess Me',
  icon,
  onClick,
  loading = false,
  disabled = false,
  size = 'medium',
  color = 'primary',
  position = 'fixed',
  ariaLabel,
  sx,
}: UnmessButtonProps) {
  const theme = useTheme();

  // Compute size dimensions
  const sizeMap = {
    small: { height: 40, iconSize: 20 },
    medium: { height: 56, iconSize: 24 },
    large: { height: 64, iconSize: 28 },
  };
  const dimensions = sizeMap[size];

  // Build ARIA label
  const computedAriaLabel = ariaLabel ||
    (loading
      ? 'Processing your problem, please wait'
      : 'Start unmess process - break down problem into actionable steps');

  // Base FAB styles
  const fabStyles: SxProps<Theme> = {
    // Size
    minHeight: dimensions.height,
    minWidth: dimensions.height,
    height: dimensions.height,
    ...(variant === 'extended' && {
      minWidth: 80,
      px: 2,
    }),

    // Shape
    borderRadius: variant === 'extended' ? '9999px' : '50%',

    // Typography (extended variant)
    ...(variant === 'extended' && {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'none',
      gap: 1,
    }),

    // Elevation
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.8)',

    // Hover state (desktop only)
    '&:hover:not(:disabled)': {
      boxShadow: [
        '0 8px 24px 0 rgba(0, 0, 0, 0.8)',
        '0 0 20px 0 rgba(77, 163, 255, 0.4)',
      ].join(', '),
      transform: 'scale(1.05)',

      // Disable hover effects on touch devices
      '@media (hover: none)': {
        transform: 'none',
        boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.8)',
      },
    },

    // Focus state (keyboard navigation)
    '&:focus-visible': {
      outline: '3px solid rgba(77, 163, 255, 0.6)',
      outlineOffset: '4px',
    },

    // Active/pressed state - micro-bounce
    '&:active:not(:disabled)': {
      transform: 'scale(0.95)',
      boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.7)',
    },

    // Smooth transitions
    transition: theme.transitions.create(
      ['transform', 'box-shadow', 'background-color'],
      {
        duration: '0.2s',
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
    ),

    // Disabled state
    ...(disabled && {
      opacity: 0.5,
      pointerEvents: 'none',
    }),

    // Loading state
    ...(loading && {
      opacity: 0.7,
      pointerEvents: 'none',
    }),

    // Custom sx prop (merge)
    ...sx,
  };

  // Wrapper styles for fixed positioning
  const wrapperStyles: SxProps<Theme> | undefined = position === 'fixed'
    ? {
        position: 'fixed',
        bottom: { xs: 24, sm: 32 },
        right: { xs: 'auto', sm: 32 },
        left: { xs: '50%', sm: 'auto' },
        transform: { xs: 'translateX(-50%)', sm: 'none' },
        zIndex: theme.zIndex.fab,
      }
    : undefined;

  // Handle loading state content
  if (loading) {
    const fab = (
      <Fab
        variant={variant}
        color={color}
        disabled
        aria-label={computedAriaLabel}
        aria-busy={true}
        sx={fabStyles}
      >
        <CircularProgress
          size={dimensions.iconSize}
          sx={{ color: '#FFFFFF' }}
        />
      </Fab>
    );

    return position === 'fixed' ? <Box sx={wrapperStyles}>{fab}</Box> : fab;
  }

  // Determine the icon to render
  // const IconComponent = AutoAwesomeIcon;

  // Handle standard content
  const fab = (
    <Fab
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      aria-label={computedAriaLabel}
      sx={fabStyles}
    >
      {icon || <AutoAwesome sx={{ fontSize: dimensions.iconSize }} />}
      {variant === 'extended' && label}
    </Fab>
  );

  return position === 'fixed' ? <Box sx={wrapperStyles}>{fab}</Box> : fab;
}
