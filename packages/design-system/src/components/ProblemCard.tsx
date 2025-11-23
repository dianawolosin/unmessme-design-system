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
 * ProblemCard Component
 * 
 * A bento-style card component for displaying user problems with tags, metadata, and primary actions.
 * The cornerstone of UnmessMe's conversational problem-solving interface.
 * 
 * Based on Material Design 3 Cards, customized with:
 * - Bento-style rounded corners (16px)
 * - Dark mode first (charcoal surface + bright accents)
 * - Tag-based categorization (no rigid categories)
 * - Playful micro-interactions
 * - Full WCAG 2.2 AA compliance
 * 
 * @example
 * // Basic usage
 * <ProblemCard
 *   title="Behind on bills and feeling overwhelmed"
 *   tags={["money", "stress", "avoidance"]}
 *   accent="coral"
 *   onUnmess={() => console.log('Start unmess flow')}
 * />
 * 
 * @example
 * // With stress score and navigation
 * <ProblemCard
 *   title="Boss conflict at work"
 *   tags={["work", "relationships", "anxiety"]}
 *   stressScore={8}
 *   accent="lilac"
 *   onUnmess={handleUnmess}
 *   onClick={() => navigate('/problem/123')}
 * />
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

  // Handle card click
  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled || !onClick) return;
    
    // Don't trigger card click if clicking on buttons or chips
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.MuiChip-root')) {
      return;
    }
    
    onClick();
  };

  // Handle keyboard navigation for card
  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleCardClick(e);
    }
  };

  return (
    <Card
      role="article"
      aria-label={computedAriaLabel}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      sx={{
        // Base styling
        backgroundColor: theme.palette.surface.card,
        borderRadius: 2, // 16px (from theme spacing unit = 8px)
        border: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
        
        // Dimensions
        minWidth: { xs: '280px', sm: 'auto' },
        maxWidth: '400px',
        height: 'auto',
        
        // Elevation
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.6)',
        
        // Accent overlay (top edge)
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: accentColor,
          opacity: 0.8,
        },
        
        // Interactive state (if onClick is provided)
        ...(onClick && !disabled && {
          cursor: 'pointer',
          transition: theme.transitions.create(
            ['box-shadow', 'transform', 'border-color'],
            {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          
          // Hover state (desktop only)
          '&:hover': {
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.7)',
            borderColor: accentColor,
            transform: 'translateY(-2px)',
            
            '@media (hover: none)': {
              transform: 'none',
            },
          },
          
          // Focus state (keyboard navigation)
          '&:focus-visible': {
            outline: `3px solid rgba(77, 163, 255, 0.4)`,
            outlineOffset: '2px',
          },
          
          // Pressed state
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.6)',
          },
        }),
        
        // Disabled state
        ...(disabled && {
          opacity: 0.5,
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
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 1.5,
            color: theme.palette.text.primary,
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
                color: theme.palette.text.secondary,
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
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 16,
                    borderRadius: 0.5,
                    backgroundColor:
                      i < stressScore
                        ? accentColor
                        : theme.palette.action.disabled,
                  }}
                />
              ))}
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              {stressScore}/10
            </Typography>
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
                  backgroundColor: accentColor,
                  color: accent === 'citrus' ? '#000000' : '#FFFFFF',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 1.5,
                  
                  '&:hover': {
                    backgroundColor: accentColor,
                    filter: 'brightness(1.1)',
                  },
                  
                  '&:focus-visible': {
                    outline: `3px solid rgba(77, 163, 255, 0.4)`,
                    outlineOffset: '2px',
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
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 1.5,
                  
                  '&:hover': {
                    borderColor: accentColor,
                    backgroundColor: 'transparent',
                  },
                  
                  '&:focus-visible': {
                    outline: `3px solid rgba(77, 163, 255, 0.4)`,
                    outlineOffset: '2px',
                  },
                }}
              >
                {onUnmess ? '...' : 'View Plan'}
              </Button>
            )}
          </Stack>
        </CardActions>
      )}
    </Card>
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

