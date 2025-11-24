import { Box, Typography, Stack, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { tokens } from '../tokens';

export interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  onCtaClick: () => void;
}

/**
 * LandingHero Component (V3: Cinematic Entry)
 * 
 * The massive, editorial entry point for the landing page.
 * Features huge Fraunces typography and deep negative space.
 */
export function LandingHero({ headline, subheadline, ctaText, onCtaClick }: LandingHeroProps) {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack spacing={4} maxWidth={tokens.spacing.semantic.layout.width.xl}>
          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontSize: { xs: '3.5rem', sm: '4.5rem', md: '6rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: theme.palette.semantic.text.primary,
                fontStyle: 'italic',
              }}
            >
              {headline}
            </Typography>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                color: theme.palette.semantic.text.secondary,
                fontWeight: 400,
                maxWidth: tokens.spacing.semantic.layout.width.md,
                lineHeight: 1.6,
                borderLeft: `${tokens.border.width.base} ${tokens.border.style.solid} ${theme.palette.semantic.status.urgent}`,
                pl: 3,
              }}
            >
              {subheadline}
            </Typography>
          </motion.div>

           {/* Mess/Unmess Concept */}
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Typography
               variant="body2"
               sx={{
                   fontFamily: '"JetBrains Mono", monospace',
                   color: theme.palette.semantic.text.secondary,
                   opacity: 0.6,
                   mt: 2,
                   letterSpacing: '0.05em'
               }}
            >
                {`// STATUS: MESS_DETECTED -> INITIATING_UNMESS_SEQUENCE`}
            </Typography>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </motion.div>
        </Stack>
      </Box>
    </Container>
  );
}

