/**
 * UnmessMe Spacing System
 * 
 * Based on design-system/tokens/spacing.json
 * V3: Digital Noir uses a 4px base scale.
 */

/**
 * Custom spacing function
 * Multiplier based on 4px base unit
 * 
 * @example
 * spacing(1) = 4px   (base)
 * spacing(4) = 16px  (md)
 */
export const spacing = (factor: number): number => factor * 4;

/**
 * Named spacing tokens for semantic usage
 * Directly mapped to tokens/spacing.json primitives
 */
export const spacingTokens = {
  base: 4,    // 0.25rem (4px)
  xxs: 4,     // primitive.scale.1
  xs: 8,      // primitive.scale.2
  sm: 12,     // primitive.scale.3
  md: 16,     // primitive.scale.4
  lg: 24,     // primitive.scale.6
  xl: 32,     // primitive.scale.8
  xxl: 48,    // primitive.scale.12
  xxxl: 64,   // primitive.scale.16
  
  // Semantic mappings
  touchTarget: 48,        // WCAG minimum
  containerMax: 1280,     // layout.max_width
  sidebarWidth: 280,      // layout.sidebar
};

/**
 * Layout spacing helpers
 */
export const layout = {
  containerMaxWidth: '1280px',
  sidebarWidth: '280px',
  gutterX: 16,  // md
  gutterY: 24,  // lg
};
