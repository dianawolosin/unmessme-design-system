import { PaletteOptions } from '@mui/material/styles';
import { tokens } from '../tokens';

// Extend MUI Palette types to include our Semantic System
declare module '@mui/material/styles' {
  interface Palette {
    semantic: typeof tokens.color.semantic;
  }

  interface PaletteOptions {
    semantic?: typeof tokens.color.semantic;
  }
}

/**
 * UnmessMe Dark Mode Palette (V3: Digital Noir)
 * 
 * Automatically generated from design tokens.
 */
export const palette: PaletteOptions = {
  mode: 'dark',
  
  // Map Standard MUI Slots to Semantic Tokens
  primary: {
    main: tokens.color.semantic.action.primary,
    light: tokens.color.primitive.seafoam.light,
    dark: tokens.color.semantic.action.hover,
    contrastText: tokens.color.semantic.text.inverse,
  },
  
  secondary: {
    main: tokens.color.semantic.status.urgent,
    contrastText: tokens.color.semantic.text.inverse,
  },
  
  info: {
    main: tokens.color.semantic.status.analysis,
    contrastText: tokens.color.semantic.text.inverse,
  },
  
  background: {
    default: tokens.color.semantic.bg.canvas,
    paper: tokens.color.semantic.bg.surface,
  },
  
  text: {
    primary: tokens.color.semantic.text.primary,
    secondary: tokens.color.semantic.text.secondary,
    disabled: tokens.color.semantic.text.disabled,
  },

  divider: tokens.color.semantic.border.subtle,

  // The Semantic System
  semantic: tokens.color.semantic,
};

// Keep for backward compatibility until full migration
export const customAccents = {
  terracotta: tokens.color.primitive.terracotta.main,
  iris: tokens.color.primitive.iris.main,
  seafoam: tokens.color.primitive.seafoam.main,
  bone: tokens.color.primitive.bone[100],
  charcoal: tokens.color.primitive.charcoal.main,
};
