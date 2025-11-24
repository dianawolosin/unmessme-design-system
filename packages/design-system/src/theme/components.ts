import { Components, Theme, alpha } from '@mui/material/styles';
import { tokens } from '../tokens';

/**
 * UnmessMe MUI Component Overrides (V3: Digital Noir)
 * 
 * Refactored to use Semantic Tokens directly.
 * Applies V3 physics: tight masking tape, smoked glass, mechanical buttons.
 */
export const components: Components<Theme> = {
  // Card - Smoked Glass Panels
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.semantic.lg,
        backgroundColor: tokens.color.semantic.bg.surface,
        boxShadow: 'none',
        border: `1px solid ${tokens.color.semantic.border.subtle}`,
      },
    },
  },
  
  // Button - Mechanical Switches
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.semantic.md,
        textTransform: 'none',
        fontWeight: Number(tokens.typography.semantic.label.button.weight),
        fontFamily: tokens.typography.semantic.label.button.font,
        fontSize: tokens.typography.semantic.label.button.size,
        letterSpacing: '0.05em',
      },
      contained: {
        boxShadow: tokens.elevation.semantic.button.primary,
        backgroundColor: tokens.color.semantic.action.primary,
        color: tokens.color.semantic.text.inverse,
        '&:hover': {
          backgroundColor: tokens.color.semantic.action.hover,
          boxShadow: tokens.elevation.semantic.button.hover,
        },
      },
      outlined: {
        borderColor: tokens.color.semantic.border.subtle,
        color: tokens.color.semantic.text.primary,
        '&:hover': {
          borderColor: tokens.color.semantic.action.primary,
          backgroundColor: alpha(tokens.color.semantic.action.primary, 0.05),
        },
      },
    },
  },
  
  // Fab - The Launch Switch
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        backgroundColor: tokens.color.semantic.action.primary,
        color: tokens.color.semantic.text.inverse,
        '&:hover': {
          backgroundColor: tokens.color.semantic.action.hover,
          boxShadow: 'none', 
        },
      },
    },
  },
  
  // Chip - Masking Tape Tags
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.semantic.xs,
        height: 24,
        minHeight: 'unset',
        fontWeight: Number(tokens.typography.semantic.label.tag.weight),
        fontSize: tokens.typography.semantic.label.tag.size,
        fontFamily: tokens.typography.semantic.label.tag.font,
      },
      filled: {
        backgroundColor: tokens.color.semantic.bg.surface,
        border: `1px solid ${tokens.color.semantic.border.subtle}`,
        boxShadow: 'none',
        color: tokens.color.semantic.text.primary,
      },
      label: {
        paddingLeft: 6,
        paddingRight: 6,
      },
    },
  },
  
  // Paper - Surfaces
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: tokens.color.semantic.bg.surface,
      },
      rounded: {
        borderRadius: tokens.radius.semantic.lg,
      },
    },
  },
  
  // Dialog - Modals
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: tokens.radius.semantic.lg,
        boxShadow: tokens.elevation.semantic.modal,
        border: `1px solid ${tokens.color.semantic.border.subtle}`,
      },
    },
  },
  
  // TextField - Input fields
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.semantic.md,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.color.semantic.border.subtle,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.color.semantic.border.highlight,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.color.semantic.action.primary,
          borderWidth: 1,
          boxShadow: `0 0 0 2px ${tokens.color.semantic.action.primary}33`,
        },
      },
      input: {
        minHeight: 'unset',
        padding: '12px 14px',
        color: tokens.color.semantic.text.primary,
      },
    },
  },
  
  // AppBar - Top navigation
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundColor: tokens.color.semantic.bg.canvas,
        borderBottom: `1px solid ${tokens.color.semantic.border.subtle}`,
      },
    },
  },
  
  // Tooltip
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: tokens.radius.semantic.sm,
        fontSize: '0.75rem',
        backgroundColor: tokens.color.semantic.bg.surface,
        border: `1px solid ${tokens.color.semantic.border.subtle}`,
        color: tokens.color.semantic.text.primary,
      },
    },
  },
};
