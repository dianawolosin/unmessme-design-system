import { createTheme, ThemeOptions } from '@mui/material/styles';
import { palette, customAccents } from './palette';
import { typography } from './typography';
import { spacing, spacingTokens, layout } from './spacing';
import { components } from './components';

/**
 * UnmessMe Design System Theme
 * 
 * MUI theme configured with design tokens from:
 * - design-system/tokens/colors.json
 * - design-system/tokens/typography.json
 * - design-system/tokens/spacing.json
 * - design-system/tokens/radius.json
 * - design-system/tokens/elevation.json
 * 
 * Dark mode first, Material-inspired, playful & geometric
 * 
 * @example
 * import { theme } from '@unmessme/design-system/theme';
 * 
 * <ThemeProvider theme={theme}>
 *   <App />
 * </ThemeProvider>
 */

const themeOptions: ThemeOptions = {
  palette,
  typography,
  spacing,
  components,
  
  // Shape - border radius tokens
  shape: {
    borderRadius: 8,  // md radius default
  },
  
  // Breakpoints - desktop-first responsive
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,  // containerMaxWidth
      xl: 1920,
    },
  },
  
  // Transitions - calm, purposeful motion
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  
  // Z-index layering
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

/**
 * Main theme export
 * Use this in your React app's ThemeProvider
 */
export const theme = createTheme(themeOptions);

/**
 * Named exports for direct access
 */
export { customAccents, spacingTokens, layout };

/**
 * TypeScript module augmentation for custom palette colors
 * Adds IntelliSense support for theme.palette.surface
 */
declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      card: string;
      elevated: string;
    };
  }
  interface PaletteOptions {
    surface?: {
      card?: string;
      elevated?: string;
    };
  }
}

/**
 * Default export for convenience
 */
export default theme;

