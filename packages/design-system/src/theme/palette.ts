import { PaletteOptions } from '@mui/material/styles';

/**
 * UnmessMe Dark Mode Palette (V2: The Void)
 * 
 * Based on design-system/tokens/colors.json
 * Deep space background + glass surfaces + neon glows
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
    main: '#A663CC',
    light: '#C3AEFB',
    dark: '#8567D8',
    contrastText: '#FFFFFF',
  },
  
  // Background colors
  background: {
    default: '#0F0F11',      // Deep Space Void
    paper: 'rgba(30, 30, 35, 0.6)', // Midnight Glass (needs blur)
  },
  
  // Custom surface colors (extends MUI)
  // @ts-ignore - Custom palette extension
  surface: {
    card: 'rgba(255, 255, 255, 0.03)',         // Glass Card Surface
    elevated: 'rgba(255, 255, 255, 0.08)',     // Elevated Glass
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Divider and borders
  divider: 'rgba(255, 255, 255, 0.08)',
  
  // Action states
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.05)',
    focus: 'rgba(77, 163, 255, 0.6)',  // Brighter focus for void
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
  lilac: '#A663CC',
  citrus: '#FCD34D',
};
