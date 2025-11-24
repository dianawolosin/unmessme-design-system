import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps, Zoom } from '@mui/material';
import { tokens } from '../tokens';

export interface TooltipProps extends MuiTooltipProps {
  /**
   * Text content
   */
  title: React.ReactNode;
}

/**
 * Tooltip Component (Atom)
 * 
 * Micro-context provider.
 * Appears on hover to explain UI elements.
 */
export function Tooltip({
  title,
  children,
  componentsProps,
  ...props
}: TooltipProps) {
  
  return (
    <MuiTooltip
      title={title}
      TransitionComponent={Zoom}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: tokens.color.semantic.bg.surface,
            color: tokens.color.semantic.text.primary,
            border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
            fontFamily: tokens.typography.primitive.fontFamily.mono,
            fontSize: '0.75rem',
            padding: `${tokens.spacing.primitive.scale['2']} ${tokens.spacing.primitive.scale['3']}`, // 8px 12px
            boxShadow: tokens.elevation.semantic.card.rest,
            ...componentsProps?.tooltip?.sx,
          },
        },
        arrow: componentsProps?.arrow,
      }}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
}

