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
   * @default "ACTIVATE UNMESS PROTOCOL"
   */
  label?: string;

  /**
   * Icon override (optional)
   * Default: AutoAwesome icon
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
   * @default "primary" (seafoam)
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
 * UnmessButton Component (V3: The Launch Switch)
 * 
 * A mechanical, glowing pill button that triggers the Unmess Protocol.
 * Features monospace type, tracking, and a hard shadow glow.
 */
export function UnmessButton({
  variant = 'extended',
  label = 'ACTIVATE UNMESS PROTOCOL',
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
    small: { height: 32, iconSize: 16 },
    medium: { height: 48, iconSize: 20 },
    large: { height: 56, iconSize: 24 },
  };
  const dimensions = sizeMap[size];

  // Build ARIA label
  const computedAriaLabel = ariaLabel ||
    (loading
      ? 'Processing protocol, please wait'
      : 'Activate Unmess Protocol');

  // Determine accent color
  const accentColor = color === 'primary' 
    ? theme.palette.primary.main 
    : theme.palette.secondary.main;

  // Base FAB styles (V3: Mechanical Pill)
  const fabStyles: SxProps<Theme> = {
    // Size
    minHeight: dimensions.height,
    minWidth: dimensions.height,
    height: dimensions.height,
    ...(variant === 'extended' && {
      minWidth: 120,
      px: 3,
    }),

    // Shape (Pill -> Rounded Square for V3 consistency)
    borderRadius: '12px',

    // Colors
    backgroundColor: accentColor,
    color: '#121619', // Always dark text on bright pill

    // Typography (V3: Monospace, Uppercase, Tracking)
    fontFamily: '"JetBrains Mono", monospace',
    ...(variant === 'extended' && {
      fontSize: '0.85rem', // Slightly larger for readability
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'none', // Normal case
      gap: 1.5,
    }),

    // Elevation (Glow) - REMOVED for flat material feel
    boxShadow: 'none',

    // Hover state (desktop only)
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.augmentColor({ color: { main: accentColor } }).dark, // Standard Material darkening
      boxShadow: 'none', 
      transform: 'none', // Remove scale effect

      // Disable hover effects on touch devices
      '@media (hover: none)': {
        transform: 'none',
        boxShadow: `0 0 20px ${accentColor}66`,
      },
    },

    // Focus state (keyboard navigation)
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.common.white}`,
      outlineOffset: '4px',
    },

    // Active/pressed state - mechanical click
    '&:active:not(:disabled)': {
      transform: 'scale(0.98)',
      boxShadow: `0 0 10px ${accentColor}40`,
    },

    // Smooth transitions
    transition: theme.transitions.create(
      ['transform', 'box-shadow', 'background-color'],
      {
        duration: '0.1s', // Snappy
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    ),

    // Disabled state
    ...(disabled && {
      opacity: 0.5,
      pointerEvents: 'none',
      backgroundColor: theme.palette.action.disabledBackground,
    }),

    // Loading state
    ...(loading && {
      opacity: 0.8,
      pointerEvents: 'none',
    }),

    // Custom sx prop (merge)
    ...sx,
  };

  // Wrapper styles for fixed positioning
  const wrapperStyles: SxProps<Theme> | undefined = position === 'fixed'
    ? {
        position: 'fixed',
        bottom: { xs: 24, sm: 40 },
        right: { xs: '50%', sm: 40 },
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
        disabled
        aria-label={computedAriaLabel}
        aria-busy={true}
        sx={fabStyles}
      >
        <CircularProgress
          size={dimensions.iconSize}
          sx={{ color: '#121619' }}
        />
      </Fab>
    );

    return position === 'fixed' ? <Box sx={wrapperStyles}>{fab}</Box> : fab;
  }

  // Handle standard content
  const fab = (
    <Fab
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      aria-label={computedAriaLabel}
      sx={fabStyles}
    >
      {/* No icon by default in V3, relying on text power. But keeping support if passed. */}
      {icon} 
      {variant === 'extended' && label}
    </Fab>
  );

  return position === 'fixed' ? <Box sx={wrapperStyles}>{fab}</Box> : fab;
}
