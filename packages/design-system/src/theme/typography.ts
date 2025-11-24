import { TypographyOptions } from '@mui/material/styles/createTypography';
import { tokens } from '../tokens';

/**
 * UnmessMe Typography System (V3: Digital Noir)
 * 
 * Automatically generated from design tokens.
 */
export const typography: TypographyOptions = {
  fontFamily: tokens.typography.primitive.fontFamily.sans,
  
  // Display - Hero statements
  h1: {
    fontFamily: tokens.typography.semantic.heading.display.font,
    fontSize: tokens.typography.semantic.heading.display.size,
    fontWeight: Number(tokens.typography.semantic.heading.display.weight),
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 1
  h2: {
    fontFamily: tokens.typography.primitive.fontFamily.serif,
    fontSize: tokens.typography.primitive.fontSize['2xl'],
    fontWeight: Number(tokens.typography.primitive.fontWeight.bold),
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 2
  h3: {
    fontFamily: tokens.typography.primitive.fontFamily.serif,
    fontSize: '2rem', // Missing in tokens? Using hardcoded fallback or need to add 2rem to tokens
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  
  // Headline 3 - Card titles
  h4: {
    fontFamily: tokens.typography.semantic.heading.card.font,
    fontSize: tokens.typography.semantic.heading.card.size,
    fontWeight: Number(tokens.typography.semantic.heading.card.weight),
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Headline 4
  h5: {
    fontFamily: tokens.typography.primitive.fontFamily.serif,
    fontSize: tokens.typography.primitive.fontSize.lg,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Smallest heading
  h6: {
    fontFamily: tokens.typography.primitive.fontFamily.serif,
    fontSize: tokens.typography.primitive.fontSize.md,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  
  // Body - Main content
  body1: {
    fontFamily: tokens.typography.semantic.body.main.font,
    fontSize: tokens.typography.semantic.body.main.size,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Small body - Secondary info
  body2: {
    fontFamily: tokens.typography.semantic.body.small.font,
    fontSize: tokens.typography.semantic.body.small.size,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Button text
  button: {
    fontFamily: tokens.typography.semantic.label.button.font,
    fontSize: tokens.typography.semantic.label.button.size,
    fontWeight: Number(tokens.typography.semantic.label.button.weight),
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'none',
  },
  
  // Caption - Micro-copy
  caption: {
    fontFamily: tokens.typography.primitive.fontFamily.mono,
    fontSize: tokens.typography.primitive.fontSize.xs,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  
  // Overline - Labels, chips
  overline: {
    fontFamily: tokens.typography.primitive.fontFamily.mono,
    fontSize: tokens.typography.primitive.fontSize.xs,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
};
