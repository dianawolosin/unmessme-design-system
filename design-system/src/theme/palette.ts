import { PaletteOptions } from '@mui/material/styles';

/**
 * UnmessMe Dark Mode Palette
 * 
 * Based on design-system/tokens/colors.json
 * Dark charcoal base + bright playful accents
 */
export const palette: PaletteOptions = {
  mode: 'dark',
  
  // Primary: Sky Blue for CTAs, conversational elements
  primary: {
    main: '#4DA3FF',
    light: '#7DBFFF',
    dark: '#2B7FCC',
    contrastText: '#FFFFFF',
  },
  
  // Secondary: Coral for emotional highlights, problem cards
  secondary: {
    main: '#FF6B6B',
    light: '#FF9494',
    dark: '#CC4545',
    contrastText: '#FFFFFF',
  },
  
  // Success: Mint/Teal for positive actions, progress
  success: {
    main: '#4ECDC4',
    light: '#7EDDD6',
    dark: '#3BA49D',
    contrastText: '#FFFFFF',
  },
  
  // Warning: Citrus Yellow for highlights, energy
  warning: {
    main: '#FCD34D',
    light: '#FDDF7A',
    dark: '#CAA93E',
    contrastText: '#000000',
  },
  
  // Info: Lilac for reflective, introspective moments
  info: {
    main: '#A78BFA',
    light: '#C3AEFB',
    dark: '#8567D8',
    contrastText: '#FFFFFF',
  },
  
  // Background colors
  background: {
    default: '#121212',      // Deep charcoal - app background
    paper: '#1E1E20',        // Midnight slate - surfaces, cards base
  },
  
  // Custom surface colors (extends MUI)
  // @ts-ignore - Custom palette extension
  surface: {
    card: '#2C2C2E',         // Bento card surface
    elevated: '#383838',     // Modals, dialogs, hover states
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    disabled: '#6B6B6B',
  },
  
  // Divider and borders
  divider: '#3A3A3C',
  
  // Action states
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: '#6B6B6B',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(77, 163, 255, 0.4)',  // Sky blue focus
  },
};

/**
 * Custom accent colors for UnmessMe components
 * Use these for problem cards, tags, special UI elements
 */
export const customAccents = {
  coral: '#FF6B6B',
  sky: '#4DA3FF',
  mint: '#4ECDC4',
  lilac: '#A78BFA',
  citrus: '#FCD34D',
};

