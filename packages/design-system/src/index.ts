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
export { ProblemCard } from './components/ProblemCard';
export type { ProblemCardProps } from './components/ProblemCard';

export { TagChip, TAG_ACCENT_COLORS, getRotatedAccentColor } from './components/TagChip';
export type { TagChipProps } from './components/TagChip';

export { UnmessButton } from './components/UnmessButton';
export type { UnmessButtonProps } from './components/UnmessButton';

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

