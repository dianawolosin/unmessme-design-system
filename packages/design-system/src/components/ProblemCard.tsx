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
        scale: 1.02,
        boxShadow: `0 12px 40px ${accentColor}40` // 25% opacity glow
      } : {}}
      whileTap={!disabled && onClick ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}

      sx={{
        // Glassmorphism Base
        backgroundColor: 'rgba(30, 30, 35, 0.6)', // Midnight Glass
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', // Safari support
        
        // Border & Glow
        borderRadius: 3, // 24px (3 * 8px)
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)', // Top highlight
        
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
            fontFamily: '"Space Grotesk", "Inter", sans-serif', // V2 Typography
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 2,
            color: theme.palette.text.primary,
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
                color: 'rgba(255, 255, 255, 0.7)', // Translucent white
              }}
            >
              Stress level:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1 }}
                  animate={{ 
                    opacity: i < stressScore ? 1 : 0.2,
                    scale: i < stressScore ? 1 : 0.8 
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 16,
                      borderRadius: '4px', // Pill shape
                      backgroundColor: accentColor,
                      boxShadow: i < stressScore ? `0 0 8px ${accentColor}` : 'none', // Glow active bars
                    }}
                  />
                </motion.div>
              ))}
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
                  background: `linear-gradient(135deg, ${accentColor} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: '#FFFFFF', // Always white on bright gradients
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 4, // 32px - Super rounded
                  boxShadow: `0 4px 12px ${accentColor}60`,
                  border: '1px solid rgba(255,255,255,0.2)',
                  
                  '&:hover': {
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: `0 6px 20px ${accentColor}80`,
                    transform: 'translateY(-1px)',
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
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 4, // 32px
                  
                  '&:hover': {
                    borderColor: accentColor,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    boxShadow: `0 0 12px ${accentColor}40`,
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
