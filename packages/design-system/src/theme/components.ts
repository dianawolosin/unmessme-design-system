import { Components, Theme } from '@mui/material/styles';
import { spacingTokens } from './spacing';

/**
 * UnmessMe MUI Component Overrides (V3: Digital Noir)
 * 
 * Refactored to use Semantic Tokens (theme.palette.semantic.*)
 * Applies V3 physics: tight masking tape, smoked glass, mechanical buttons.
 */
export const components: Components<Theme> = {
  // Card - Smoked Glass Panels
  MuiCard: {
    defaultProps: {
      elevation: 0,  // We control shadows manually
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 2, // 16px (lg)
        backgroundColor: theme.palette.semantic.bg.surface,
        boxShadow: 'none', // Default flat, custom shadow applied in component
        border: `1px solid ${theme.palette.semantic.border.subtle}`,
      }),
    },
  },
  
  // Button - Mechanical Switches
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius, // 8px (md)
        textTransform: 'none',  // Sentence case
        fontWeight: 600,
        fontFamily: theme.typography.button.fontFamily,
        padding: '10px 20px',
        minHeight: spacingTokens.touchTarget, // 48px
        letterSpacing: '0.05em',
      }),
      contained: ({ theme }) => ({
        boxShadow: 'none', // Flat
        '&:hover': {
          backgroundColor: theme.palette.semantic.action.hover,
          boxShadow: 'none', // No hover shadow in V3
        },
      }),
      outlined: ({ theme }) => ({
        borderColor: theme.palette.semantic.border.subtle,
        color: theme.palette.semantic.text.primary,
        '&:hover': {
          borderColor: theme.palette.semantic.action.primary,
          backgroundColor: 'rgba(42, 157, 143, 0.05)', // Subtle seafoam tint
        },
      }),
    },
  },
  
  // Fab - The Launch Switch
  MuiFab: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none', // Flat V3
        backgroundColor: theme.palette.semantic.action.primary,
        color: theme.palette.semantic.text.inverse,
        '&:hover': {
          backgroundColor: theme.palette.semantic.action.hover,
          boxShadow: 'none', 
        },
      }),
    },
  },
  
  // Chip - Masking Tape Tags
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 2, // 2px (xs) - Tight masking tape
        height: 24, // Tight height
        minHeight: 'unset',
        fontWeight: 600,
        fontSize: '0.75rem', // 12px
        fontFamily: theme.typography.fontFamily, // JetBrains Mono via theme
      }),
      filled: ({ theme }) => ({
        backgroundColor: theme.palette.semantic.bg.surface,
        border: `1px solid ${theme.palette.semantic.border.subtle}`,
        boxShadow: 'none',
      }),
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
      root: ({ theme }) => ({
        backgroundImage: 'none',
        backgroundColor: theme.palette.semantic.bg.surface,
      }),
      rounded: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 2, // 16px
      }),
    },
  },
  
  // Dialog - Modals
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 2, // 16px
        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7)', // Deep shadow for modals
        border: `1px solid ${theme.palette.semantic.border.subtle}`,
      }),
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
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius, // 8px
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker input bg
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.semantic.border.subtle,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.semantic.border.highlight,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.semantic.action.primary,
          borderWidth: 1, // Thin crisp border
          boxShadow: `0 0 0 2px ${theme.palette.semantic.action.primary}33`, // Subtle focus ring
        },
      }),
      input: ({ theme }) => ({
        minHeight: 'unset',
        padding: '12px 14px',
        color: theme.palette.semantic.text.primary,
      }),
    },
  },
  
  // AppBar - Top navigation
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.semantic.bg.canvas,
        borderBottom: `1px solid ${theme.palette.semantic.border.subtle}`,
      }),
    },
  },
  
  // Tooltip
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: 4, // 4px (sm)
        fontSize: '0.75rem',
        backgroundColor: theme.palette.semantic.bg.surface,
        border: `1px solid ${theme.palette.semantic.border.subtle}`,
        color: theme.palette.semantic.text.primary,
      }),
    },
  },
};
