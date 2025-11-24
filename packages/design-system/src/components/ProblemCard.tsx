import {
  CardContent,
  CardActions,
  Typography,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Tag, TagProps } from './Tag';
import { Surface } from './Surface';
import { Button } from './Button';
import { tokens } from '../tokens';

/**
 * Helper function to rotate through accent colors
 */
export function getRotatedAccentColor(index: number): TagProps['color'] {
  const colors: TagProps['color'][] = ['urgent', 'analysis', 'success', 'neutral'];
  return colors[index % colors.length];
}

/**
 * Props for ProblemCard component
 */
export interface ProblemCardProps {
  /**
   * Problem title - max 60 characters for readability
   * Generated from user's conversational input
   * @example "Behind on bills and feeling overwhelmed"
   */
  title: string;

  /**
   * Tag array - 1-5 tags for multi-dimensional categorization
   * Uses tag-based model (not rigid categories)
   * @example ["money", "stress", "avoidance"]
   */
  tags: string[];

  /**
   * Stress score - 1-10 scale, optional
   * Visual indicator of emotional weight
   */
  stressScore?: number;

  /**
   * Accent color variant for card styling
   * @default "urgent"
   */
  accent?: 'urgent' | 'analysis' | 'success' | 'neutral';

  /**
   * Primary action handler - triggers "Unmess Me" flow
   * Generates structured breakdown and actionable steps
   */
  onUnmess?: () => void;

  /**
   * Optional secondary action for viewing existing plan
   */
  onViewPlan?: () => void;

  /**
   * Card click handler for navigation to problem detail
   */
  onClick?: () => void;

  /**
   * Accessibility label override
   * Auto-generated if not provided
   */
  ariaLabel?: string;

  /**
   * Disabled state (during async operations)
   */
  disabled?: boolean;
}

/**
 * ProblemCard Component (V2: Glassmorphism & Tilt)
 * 
 * A floating glass card for displaying user problems.
 * Transforms chaos into clarity with physics-based interaction.
 * 
 * Features:
 * - Glassmorphism (backdrop-filter)
 * - Physics-based tilt on hover (framer-motion)
 * - Neon glow borders
 * - "Bioluminescent" shadows
 */
export function ProblemCard({
  title,
  tags,
  stressScore,
  accent = 'urgent',
  onUnmess,
  onViewPlan,
  onClick,
  ariaLabel,
  disabled = false,
}: ProblemCardProps) {
  const theme = useTheme();
  
  // Get accent color from tokens directly
  const accentColor = tokens.color.semantic.status[accent === 'neutral' ? 'analysis' : accent];

  // Build ARIA label
  const computedAriaLabel = ariaLabel ||
    `Problem: ${title}. ${tags.length > 0 ? `Tags: ${tags.join(', ')}.` : ''}${
      stressScore ? ` Stress level: ${stressScore} out of 10.` : ''
    }`;

  // Random initial tilt for "messy desk" feel (-1deg to 1deg)
  // We use a deterministic random based on title length to keep it stable during renders
  const seed = title.length;
  const initialRotate = disabled ? 0 : (seed % 3) - 1;

  // Framer Motion wrapper for the Surface (replacing Card)
  const MotionSurface = motion(Surface);

  return (
    <MotionSurface
      role="article"
      aria-label={computedAriaLabel}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={!disabled && onClick ? onClick : undefined}
      
      // Animation Props
      initial={{ rotate: initialRotate, scale: 1 }}
      whileHover={!disabled && onClick ? { 
        rotate: 0, 
        scale: 1.005, // Very subtle scale
        boxShadow: tokens.elevation.semantic.card.focused // Monochromatic dark shadow, no color glow
      } : {}}
      whileTap={!disabled && onClick ? { scale: 0.99 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      
      variant="glass"
      sx={{
        // Border & Glow
        borderRadius: tokens.radius.semantic.lg,
        borderTop: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.highlight}`,
        
        // Dimensions
        minWidth: { xs: tokens.spacing.semantic.layout.width.xs, sm: 'auto' },
        maxWidth: tokens.spacing.semantic.layout.width.sm,
        height: 'auto',
        
        // Default Shadow (Void bioluminescence)
        boxShadow: `${tokens.elevation.semantic.card.rest}, 0 0 0 ${tokens.border.width.base} ${accentColor}20`, // Subtle colored outline
        
        // Interactive cursor
        cursor: onClick && !disabled ? 'pointer' : 'default',
        
        // Disabled state
        ...(disabled && {
          opacity: 0.6,
          filter: 'grayscale(0.8)',
          pointerEvents: 'none',
        }),
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        {/* Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontFamily: '"Fraunces", serif', // V3 Typography
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 2,
            color: theme.palette.semantic.text.primary, // Semantic Text
            textShadow: tokens.elevation.semantic.text.legibility, // Text legibility on glass
          }}
        >
          {title}
        </Typography>

        {/* Tags */}
        {tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 2 }}
          >
            {tags.slice(0, 5).map((tag, index) => (
              <Tag
                key={tag}
                label={tag}
                variant="solid"
                color={getRotatedAccentColor(index)}
                size="md"
                tape
              />
            ))}
          </Stack>
        )}

        {/* Stress Score (optional) */}
        {stressScore !== undefined && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.semantic.text.secondary, // Semantic Secondary
              }}
            >
              Stress level:
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                height: 6,
                backgroundColor: theme.palette.semantic.border.subtle, // Use border color for track
                borderRadius: tokens.radius.semantic.pill,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${(stressScore / 10) * 100}%`,
                  backgroundColor: accentColor,
                  borderRadius: tokens.radius.semantic.pill,
                }}
              />
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      {(onUnmess || onViewPlan) && (
        <CardActions sx={{ padding: 3, pt: 0 }}>
          <Stack direction="row" spacing={1} width="100%">
            {/* Primary action */}
            {onUnmess && (
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onUnmess();
                }}
                // Manually pass disabled if Button supports it (our Atom does via props spread)
                disabled={disabled}
                aria-label="Start unmess process"
                sx={{ flex: 1 }}
              >
                Unmess Me
              </Button>
            )}

            {/* Secondary action */}
            {onViewPlan && (
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPlan();
                }}
                disabled={disabled}
                aria-label="View existing plan"
                sx={{
                  flex: onUnmess ? undefined : 1,
                  minWidth: onUnmess ? 48 : undefined,
                }}
              >
                {onUnmess ? '...' : 'View Plan'}
              </Button>
            )}
          </Stack>
        </CardActions>
      )}
    </MotionSurface>
  );
}

/**
 * Helper function to rotate through accent colors for card grids
 * Use this to automatically assign colors to multiple cards
 * 
 * @example
 * {problems.map((problem, index) => (
 *   <ProblemCard
 *     key={problem.id}
 *     title={problem.title}
 *     tags={problem.tags}
 *     accent="urgent"
 *   />
 * ))}
 */
export function getCardAccentColor(
  index: number
): 'urgent' | 'analysis' | 'success' | 'neutral' {
  const colors: ('urgent' | 'analysis' | 'success' | 'neutral')[] = [
    'urgent',
    'analysis',
    'success',
    'neutral',
  ];
  return colors[index % colors.length];
}
