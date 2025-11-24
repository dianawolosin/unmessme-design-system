import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';
import { tokens } from '../tokens';

export interface TextProps extends Omit<MuiTypographyProps, 'variant'> {
  /**
   * Semantic variant
   * - "display": Huge editorial serif (Fraunces)
   * - "heading": Standard bold serif headers
   * - "body": Clean sans-serif for reading (Inter)
   * - "code": Monospace for data/labels (JetBrains Mono)
   * @default "body"
   */
  variant?: 'display' | 'heading' | 'body' | 'code';
  
  /**
   * Size level
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

  /**
   * Weight override
   */
  weight?: 'regular' | 'medium' | 'bold';
  
  /**
   * Color override
   */
  color?: string;
}

/**
 * Text Component (Atom)
 * 
 * The universal typography element.
 * Enforces the "Editorial vs. Terminal" font pairing of UnmessMe.
 */
export function Text({
  variant = 'body',
  size = 'md',
  weight,
  children,
  sx,
  ...props
}: TextProps) {
  
  // Map variants to font families
  const getFontFamily = () => {
    switch (variant) {
      case 'display': return tokens.typography.semantic.heading.display.font;
      case 'heading': return tokens.typography.primitive.fontFamily.serif;
      case 'code': return tokens.typography.primitive.fontFamily.mono;
      case 'body': 
      default: return tokens.typography.primitive.fontFamily.sans;
    }
  };

  // Map sizes to tokens
  const getFontSize = () => {
    return tokens.typography.primitive.fontSize[size];
  };

  // Map weights
  const getFontWeight = () => {
    if (weight) return tokens.typography.primitive.fontWeight[weight];
    if (variant === 'display' || variant === 'heading') return tokens.typography.primitive.fontWeight.bold;
    return tokens.typography.primitive.fontWeight.regular;
  };

  return (
    <MuiTypography
      sx={{
        fontFamily: getFontFamily(),
        fontSize: getFontSize(),
        fontWeight: Number(getFontWeight()),
        color: props.color || tokens.color.semantic.text.primary,
        letterSpacing: variant === 'display' ? '-0.02em' : variant === 'code' ? '0.05em' : '0',
        lineHeight: variant === 'display' ? 1.1 : 1.5,
        fontStyle: variant === 'display' ? 'italic' : 'normal',
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
}

