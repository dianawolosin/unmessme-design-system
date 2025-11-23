import { PaletteOptions, Palette, PaletteColor } from '@mui/material/styles';

// Extend MUI Palette types to include our Semantic System
declare module '@mui/material/styles' {
  interface Palette {
    semantic: {
      bg: {
        canvas: string;
        surface: string;
      };
      text: {
        primary: string;   // Added
        secondary: string; // Added
        disabled: string;  // Added
        inverse: string;
      };
      action: {
        primary: string;
        hover: string;
      };
      status: {
        urgent: string;
        analysis: string;
        success: string;
      };
      border: {
        subtle: string;
        highlight: string;
      };
    };
  }

  interface PaletteOptions {
    semantic?: {
      bg: {
        canvas: string;
        surface: string;
      };
      text: {
        primary: string;   // Added
        secondary: string; // Added
        disabled: string;  // Added
        inverse: string;
      };
      action: {
        primary: string;
        hover: string;
      };
      status: {
        urgent: string;
        analysis: string;
        success: string;
      };
      border: {
        subtle: string;
        highlight: string;
      };
    };
  }
}

/**
 * UnmessMe Dark Mode Palette (V3: Digital Noir)
 * 
 * Now using Semantic Token Reference (from colors.json)
 */
export const palette: PaletteOptions = {
  mode: 'dark',
  
  // Map Standard MUI Slots to Semantic Tokens
  primary: {
    main: '#2A9D8F', // semantic.action.primary
    light: '#4DC0B2', // primitive.seafoam.light
    dark: '#1F7A70', // semantic.action.hover
    contrastText: '#121619', // semantic.text.inverse
  },
  
  secondary: {
    main: '#E07A5F', // semantic.status.urgent
    contrastText: '#121619',
  },
  
  info: {
    main: '#8187DC', // semantic.status.analysis
    contrastText: '#121619',
  },
  
  background: {
    default: '#121619', // semantic.bg.canvas
    paper: 'rgba(30, 35, 39, 0.6)', // semantic.bg.surface
  },
  
  text: {
    primary: '#E0E1DD', // semantic.text.primary
    secondary: 'rgba(224, 225, 221, 0.6)', // semantic.text.secondary
    disabled: 'rgba(224, 225, 221, 0.3)', // semantic.text.disabled
  },

  divider: 'rgba(255, 255, 255, 0.08)', // semantic.border.subtle

  // The Semantic System (New)
  semantic: {
    bg: {
      canvas: '#121619',
      surface: 'rgba(30, 35, 39, 0.6)',
    },
    text: {
      primary: '#E0E1DD',
      secondary: 'rgba(224, 225, 221, 0.6)',
      disabled: 'rgba(224, 225, 221, 0.3)',
      inverse: '#121619',
    },
    action: {
      primary: '#2A9D8F',
      hover: '#1F7A70',
    },
    status: {
      urgent: '#E07A5F',
      analysis: '#8187DC',
      success: '#2A9D8F',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      highlight: 'rgba(255, 255, 255, 0.15)',
    },
  },
};

// Keep for backward compatibility until full migration
export const customAccents = {
  terracotta: '#E07A5F',
  iris: '#8187DC',
  seafoam: '#2A9D8F',
  bone: '#E0E1DD',
  charcoal: '#3D405B',
};
