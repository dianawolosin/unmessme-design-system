import { TypographyOptions } from '@mui/material/styles/createTypography';

/**
 * UnmessMe Typography System (V3: Digital Noir)
 * 
 * Based on design-system/tokens/typography.json
 * Editorial (Fraunces) + Technical (JetBrains Mono)
 */
export const typography: TypographyOptions = {
  fontFamily: "'Inter', sans-serif", // Fallback global font (primitive.fontFamily.sans)
  
  // Display - Hero statements
  h1: {
    fontFamily: "'Fraunces', serif", // semantic.heading.display.font
    fontSize: '3.5rem',     // semantic.heading.display.size
    fontWeight: 700,        // semantic.heading.display.weight
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 1 - Main section titles
  h2: {
    fontFamily: "'Fraunces', serif",
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 2 - Sub-section titles
  h3: {
    fontFamily: "'Fraunces', serif",
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 3 - Card titles
  h4: {
    fontFamily: "'Fraunces', serif", // semantic.heading.card.font
    fontSize: '1.5rem',     // semantic.heading.card.size
    fontWeight: 600,        // semantic.heading.card.weight
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Headline 4 - Small section headers
  h5: {
    fontFamily: "'Fraunces', serif",
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Smallest heading
  h6: {
    fontFamily: "'Fraunces', serif",
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Body - Main content
  body1: {
    fontFamily: "'JetBrains Mono', monospace", // semantic.body.main.font
    fontSize: '1rem',       // semantic.body.main.size
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Small body - Secondary info
  body2: {
    fontFamily: "'JetBrains Mono', monospace", // semantic.body.small.font
    fontSize: '0.875rem',   // semantic.body.small.size
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Button text
  button: {
    fontFamily: "'JetBrains Mono', monospace", // semantic.label.button.font
    fontSize: '0.875rem',   // semantic.label.button.size
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'none',  // V3: No uppercase
  },
  
  // Caption - Micro-copy
  caption: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Overline - Labels, chips
  overline: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  
  // Subtitle variants
  subtitle1: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  subtitle2: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
};
