import { Components, Theme } from '@mui/material/styles';

/**
 * UnmessMe MUI Component Overrides
 * 
 * Applies design tokens (radius, elevation, spacing) to MUI components
 * Creates the signature UnmessMe look: bento cards, pill chips, soft shadows
 */
export const components: Components<Theme> = {
  // Card - Bento-style problem cards
  MuiCard: {
    defaultProps: {
      elevation: 0,  // We control shadows manually
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,  // lg radius from tokens
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.6)',  // md elevation
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  
  // Button - Conversational actions, CTAs
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 8,  // md radius
        textTransform: 'none',  // Sentence case, not uppercase
        fontWeight: 500,
        padding: '10px 20px',
        minHeight: 48,  // Touch target minimum
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 0 20px 0 rgba(77, 163, 255, 0.2)',  // Subtle glow
        },
      },
      outlined: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  
  // Fab - Unmess Me button, circular actions
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.8)',  // xl elevation
        '&:hover': {
          boxShadow: '0 8px 24px 0 rgba(77, 163, 255, 0.4)',  // Sky blue glow
        },
      },
    },
  },
  
  // Chip - Tag chips, filter chips (pill-shaped)
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 9999,  // pill shape
        height: 32,
        minHeight: 48,  // Touch target (with padding/margin)
        fontWeight: 500,
        fontSize: '0.875rem',
      },
      filled: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',  // sm elevation
      },
    },
  },
  
  // Paper - Surfaces, elevated containers
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'none',  // Remove MUI default gradient
        backgroundColor: theme.palette.background.paper,
      }),
      rounded: {
        borderRadius: 16,  // lg radius
      },
      elevation1: {
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.6)',  // md elevation
      },
      elevation2: {
        boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.7)',  // lg elevation
      },
      elevation3: {
        boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.8)',  // xl elevation
      },
    },
  },
  
  // Dialog - Modals, clarifying questions
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 16,  // lg radius
        boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.8)',  // xl elevation
      },
    },
  },
  
  // TextField - Input fields, chat input
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,  // md radius
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
          boxShadow: '0 0 0 3px rgba(77, 163, 255, 0.4)',  // Focus glow
        },
      }),
      input: {
        minHeight: 48,  // Touch target
      },
    },
  },
  
  // IconButton - Circular action buttons
  MuiIconButton: {
    styleOverrides: {
      root: {
        minWidth: 48,  // Touch target
        minHeight: 48,
      },
    },
  },
  
  // AppBar - Top navigation
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  
  // Tooltip - Helper text
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 8,  // md radius
        fontSize: '0.875rem',
        padding: '8px 12px',
      },
    },
  },
};

