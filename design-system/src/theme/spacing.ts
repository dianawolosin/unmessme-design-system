/**
 * UnmessMe Spacing System
 * 
 * Based on design-system/tokens/spacing.json
 * MUI uses an 8px base unit by default (spacing(1) = 8px)
 * We're using a 4px base for more granular control
 */

/**
 * Custom spacing function
 * Multiplier based on 4px base unit
 * 
 * @example
 * spacing(1) = 4px   (xxs)
 * spacing(2) = 8px   (xs)
 * spacing(3) = 12px  (sm)
 * spacing(4) = 16px  (md) - default
 * spacing(6) = 24px  (lg)
 * spacing(8) = 32px  (xl)
 * spacing(12) = 48px (xxl) - touch target minimum
 */
export const spacing = (factor: number): number => factor * 4;

/**
 * Named spacing tokens for semantic usage
 * Use these in components for clarity
 */
export const spacingTokens = {
  xxs: 4,    // 0.25rem - micro adjustments
  xs: 8,     // 0.5rem  - chip padding, tight spacing
  sm: 12,    // 0.75rem - small gaps
  md: 16,    // 1rem    - default spacing, card padding
  lg: 24,    // 1.5rem  - section spacing, bento card internal
  xl: 32,    // 2rem    - major section breaks
  xxl: 48,   // 3rem    - hero spacing
  xxxl: 64,  // 4rem    - maximum spacing
  
  // Special tokens
  touchTarget: 48,        // Minimum touch/click target (WCAG)
  containerMax: 1280,     // Maximum container width
  sidebarWidth: 280,      // Standard sidebar width
};

/**
 * Layout spacing helpers
 */
export const layout = {
  containerMaxWidth: '1280px',
  sidebarWidth: '280px',
  gutterX: 16,  // Horizontal gutter (md)
  gutterY: 24,  // Vertical gutter (lg)
};

