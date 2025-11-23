import { useState } from 'react';
import { Box, Container, Typography, Stack, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import {
  ProblemCard,
  TagChip,
  UnmessButton,
  getRotatedAccentColor,
} from '@unmessme/design-system';

// Blob Animation Components
const Blob = ({ color, top, left, size, delay }: { color: string, top: string, left: string, size: string, delay: number }) => (
  <motion.div
    style={{
      position: 'fixed',
      top,
      left,
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.4,
      zIndex: -1,
    }}
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay,
    }}
  />
);

/**
 * UnmessMe Prototype Environment (V2: The Void)
 */
function App() {
  const [loading, setLoading] = useState(false);

  // Sample problems data
  const problems = [
    {
      id: 1,
      title: 'Behind on bills and feeling overwhelmed',
      tags: ['money', 'stress', 'avoidance'],
      stressScore: 8,
      accent: 'coral' as const,
    },
    {
      id: 2,
      title: 'Sleep schedule falling apart',
      tags: ['health', 'habits'],
      stressScore: 6,
      accent: 'mint' as const,
    },
    {
      id: 3,
      title: 'Avoiding difficult conversation',
      tags: ['relationships', 'avoidance', 'anxiety'],
      stressScore: 7,
      accent: 'lilac' as const,
    },
  ];

  // Handle unmess action
  const handleUnmess = async (problemId?: number) => {
    console.log('Starting unmess flow...', problemId);
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setLoading(false);
      console.log('Unmess complete!');
    }, 2000);
  };

  return (
    <>
      {/* Aurora Background Blobs */}
      <Blob color="#4DA3FF" top="-10%" left="-10%" size="600px" delay={0} />
      <Blob color="#A663CC" top="40%" left="80%" size="500px" delay={2} />
      <Blob color="#4ECDC4" top="80%" left="-5%" size="400px" delay={4} />

      <Container maxWidth="lg" sx={{ py: 8, pb: 12, position: 'relative', zIndex: 1 }}>
        <Stack spacing={8}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: { xs: '3rem', md: '4.5rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #A663CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              UnmessMe
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                color: 'text.secondary',
                maxWidth: '600px',
                lineHeight: 1.6,
              }}
            >
              The Magical Messy Desk. Transforming chaos into clarity with glass, gravity, and light.
            </Typography>
          </Box>

          {/* Component Showcase: Problem Cards */}
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 600, 
                mb: 3 
              }}
            >
              The Void Stack
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Floating glass cards that tilt and glow.
            </Typography>

            <Grid container spacing={3}>
              {problems.map((problem) => (
                <Grid item xs={12} sm={6} md={4} key={problem.id}>
                  <ProblemCard
                    title={problem.title}
                    tags={problem.tags}
                    stressScore={problem.stressScore}
                    accent={problem.accent}
                    onUnmess={() => handleUnmess(problem.id)}
                    onClick={() => console.log(`Navigate to problem ${problem.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Component Showcase: Tag Chips */}
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 600, 
                mb: 3 
              }}
            >
              Sticker Tags
            </Typography>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {['money', 'work', 'stress', 'relationships', 'health'].map((tag, index) => (
                  <TagChip
                    key={tag}
                    label={tag}
                    variant="display"
                    color={getRotatedAccentColor(index)}
                  />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Floating Action Button (Fixed Position) */}
      <UnmessButton
        onClick={() => handleUnmess()}
        loading={loading}
      />
    </>
  );
}

export default App;
