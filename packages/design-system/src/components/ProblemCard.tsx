import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { TagChip, TAG_ACCENT_COLORS, getRotatedAccentColor } from './TagChip';

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
   * Rotates through: coral, sky, mint, lilac, citrus
   * @default "coral"
   */
  accent?: keyof typeof TAG_ACCENT_COLORS;

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
  accent = 'coral',
  onUnmess,
  onViewPlan,
  onClick,
  ariaLabel,
  disabled = false,
}: ProblemCardProps) {
  const theme = useTheme();
  
  // Get accent color from theme
  const accentColor = TAG_ACCENT_COLORS[accent];

  // Build ARIA label
  const computedAriaLabel = ariaLabel ||
    `Problem: ${title}. ${tags.length > 0 ? `Tags: ${tags.join(', ')}.` : ''}${
      stressScore ? ` Stress level: ${stressScore} out of 10.` : ''
    }`;

  // Random initial tilt for "messy desk" feel (-1deg to 1deg)
  // We use a deterministic random based on title length to keep it stable during renders
  const seed = title.length;
  const initialRotate = disabled ? 0 : (seed % 3) - 1;

  // Framer Motion wrapper for the Card
  const MotionCard = motion(Card);

  return (
    <MotionCard
      role="article"
      aria-label={computedAriaLabel}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={!disabled && onClick ? onClick : undefined}
      
      // Animation Props
      initial={{ rotate: initialRotate, scale: 1 }}
      whileHover={!disabled && onClick ? { 
        rotate: 0, 
        scale: 1.005, // Very subtle scale
        boxShadow: `0 12px 40px rgba(0,0,0,0.6)` // Monochromatic dark shadow, no color glow
      } : {}}
      whileTap={!disabled && onClick ? { scale: 0.99 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}

      sx={{
        // Glassmorphism Base
        backgroundColor: theme.palette.semantic.bg.surface, // Semantic Surface
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', // Safari support
        
        // Border & Glow
        borderRadius: 2, // 16px - tighter than before (was 24px)
        border: `1px solid ${theme.palette.semantic.border.subtle}`, // Semantic Border
        borderTop: `1px solid ${theme.palette.semantic.border.highlight}`, // Semantic Highlight
        
        // Dimensions
        minWidth: { xs: '280px', sm: 'auto' },
        maxWidth: '400px',
        height: 'auto',
        overflow: 'hidden', // Clip children to rounded corners
        
        // Default Shadow (Void bioluminescence)
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px ${accentColor}20`, // Subtle colored outline
        
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
            textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Text legibility on glass
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
              <TagChip
                key={tag}
                label={tag}
                variant="display"
                color={getRotatedAccentColor(index)}
                size="medium"
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
                borderRadius: '999px',
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
                  borderRadius: '999px',
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
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  onUnmess();
                }}
                disabled={disabled}
                aria-label="Start unmess process"
                sx={{
                  flex: 1,
                  minHeight: 48,
                  // Match UnmessButton (FAB) style
                  backgroundColor: theme.palette.semantic.action.primary, // Semantic Action
                  color: theme.palette.semantic.text.inverse, // Semantic Inverse Text
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 700,
                  textTransform: 'none', // Normal case
                  letterSpacing: '0.05em',
                  fontSize: '0.9rem',
                  borderRadius: '8px', // Square-ish
                  boxShadow: 'none', // No default shadow/glow
                  border: `1px solid ${theme.palette.semantic.action.primary}40`,
                  
                  '&:hover': {
                    backgroundColor: theme.palette.semantic.action.hover, // Semantic Hover
                    boxShadow: 'none',
                    transform: 'none', // Remove scale effect
                  },
                }}
              >
                Unmess Me
              </Button>
            )}

            {/* Secondary action */}
            {onViewPlan && (
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPlan();
                }}
                disabled={disabled}
                aria-label="View existing plan"
                sx={{
                  flex: onUnmess ? undefined : 1,
                  minHeight: 48,
                  minWidth: onUnmess ? 48 : undefined,
                  borderColor: theme.palette.semantic.border.highlight, // Semantic highlight
                  color: theme.palette.semantic.text.secondary, // Semantic Secondary text
                  fontFamily: '"JetBrains Mono", monospace',
                  textTransform: 'none', // Normal case
                  letterSpacing: '0.05em',
                  fontSize: '0.85rem',
                  borderRadius: '8px', // Square-ish
                  
                  '&:hover': {
                    borderColor: theme.palette.semantic.action.primary, // Hover becomes primary
                    color: theme.palette.semantic.action.primary,
                    backgroundColor: 'rgba(42, 157, 143, 0.05)', // Keep very subtle tint manually or create token
                    boxShadow: 'none', // No shadow for secondary
                  },
                }}
              >
                {onUnmess ? '...' : 'View Plan'}
              </Button>
            )}
          </Stack>
        </CardActions>
      )}
    </MotionCard>
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
 *     accent={getCardAccentColor(index)}
 *   />
 * ))}
 */
export function getCardAccentColor(
  index: number
): keyof typeof TAG_ACCENT_COLORS {
  return getRotatedAccentColor(index);
}
