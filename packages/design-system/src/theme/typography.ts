import { TypographyOptions } from '@mui/material/styles/createTypography';

/**
 * UnmessMe Typography System
 * 
 * Based on design-system/tokens/typography.json
 * Material-inspired scale with friendly, approachable tone
 */
export const typography: TypographyOptions = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
  
  // Display - Hero statements (56px)
  h1: {
    fontSize: '3.5rem',     // 56px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 1 - Main section titles (40px)
  h2: {
    fontSize: '2.5rem',     // 40px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 2 - Sub-section titles (32px)
  h3: {
    fontSize: '2rem',       // 32px
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 3 - Card titles, problem titles (24px)
  h4: {
    fontSize: '1.5rem',     // 24px
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Headline 4 - Small section headers (20px)
  h5: {
    fontSize: '1.25rem',    // 20px
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Smallest heading (16px)
  h6: {
    fontSize: '1rem',       // 16px
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Body - Conversational UI, chat messages (16px)
  body1: {
    fontSize: '1rem',       // 16px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Small body - Secondary info, timestamps (14px)
  body2: {
    fontSize: '0.875rem',   // 14px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Button text
  button: {
    fontSize: '0.875rem',   // 14px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'none',  // UnmessMe uses sentence case, not uppercase
  },
  
  // Caption - Micro-copy, helper text (12px)
  caption: {
    fontSize: '0.75rem',    // 12px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Overline - Labels, chips (12px)
  overline: {
    fontSize: '0.75rem',    // 12px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  
  // Subtitle variants for additional hierarchy
  subtitle1: {
    fontSize: '1rem',       // 16px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  subtitle2: {
    fontSize: '0.875rem',   // 14px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
};

