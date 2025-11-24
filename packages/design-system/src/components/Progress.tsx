import { LinearProgress, CircularProgress, Box } from '@mui/material';
import { tokens } from '../tokens';

export interface ProgressProps {
  /**
   * Type of progress indicator
   * @default "linear"
   */
  type?: 'linear' | 'circular';

  /**
   * Value (0-100). If undefined, indeterminate (loading)
   */
  value?: number;

  /**
   * Semantic color
   * @default "primary"
   */
  color?: 'primary' | 'urgent' | 'analysis';

  /**
   * Size (only for circular)
   * @default 24
   */
  size?: number;
}

/**
 * Progress Component (Atom)
 * 
 * Feedback for system status and loading.
 * - Linear: Sharp, terminal-style loading bar.
 * - Circular: Mechanical spinner.
 */
export function Progress({
  type = 'linear',
  value,
  color = 'primary',
  size = 24,
}: ProgressProps) {
  
  const getColor = () => {
    switch (color) {
      case 'urgent': return tokens.color.semantic.status.urgent;
      case 'analysis': return tokens.color.semantic.status.analysis;
      case 'primary':
      default: return tokens.color.semantic.action.primary;
    }
  };

  const activeColor = getColor();

  if (type === 'circular') {
    return (
      <CircularProgress 
        variant={value !== undefined ? 'determinate' : 'indeterminate'}
        value={value}
        size={size}
        sx={{ color: activeColor }}
      />
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress 
        variant={value !== undefined ? 'determinate' : 'indeterminate'}
        value={value}
        sx={{
          backgroundColor: tokens.color.semantic.border.subtle,
          '& .MuiLinearProgress-bar': {
            backgroundColor: activeColor,
          },
          height: 2, // Very thin/sharp
          borderRadius: 0, // No rounding
        }}
      />
    </Box>
  );
}

