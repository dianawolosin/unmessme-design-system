/**
 * @unmessme/design-system
 * 
 * UnmessMe Design System - MUI wrapper with custom dark-mode-first theme
 * 
 * @packageDocumentation
 */

// Theme exports
export { theme as unmessTheme, theme, customAccents, spacingTokens, layout } from './theme';

// Component exports
export * from './components';

// Re-export commonly used MUI components for convenience
export {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Stack,
  Grid,
} from '@mui/material';

// Additional MUI re-exports for convenience
export type { Theme } from '@mui/material/styles';
