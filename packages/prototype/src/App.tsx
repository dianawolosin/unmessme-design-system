import { useState } from 'react';
import { Box, Container, Typography, Stack, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import {
  ProblemCard,
  TagChip,
  UnmessButton,
  getRotatedAccentColor,
} from '@unmessme/design-system';

// Fog Animation Components (V3: Smoke)
const Smoke = ({ delay }: { delay: number }) => (
  <motion.div
    style={{
      position: 'fixed',
      top: '-50%',
      left: '-50%',
      right: '-50%',
      bottom: '-50%',
      background: 'radial-gradient(circle at 50% 50%, rgba(129, 135, 220, 0.03), transparent 70%)',
      filter: 'blur(100px)',
      zIndex: -1,
      pointerEvents: 'none',
    }}
    animate={{
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

// Grain Overlay
const GrainOverlay = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,
      pointerEvents: 'none',
      opacity: 0.03,
      background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

/**
 * UnmessMe Prototype Environment (V3: The War Room)
 */
function App() {
  const [loading, setLoading] = useState(false);

  // Sample problems data
  const problems = [
    {
      id: 1,
      title: 'Behind on bills & spiraling',
      tags: ['money', 'stress', 'avoidance'],
      stressScore: 8,
      accent: 'terracotta' as const,
    },
    {
      id: 2,
      title: 'Sleep schedule non-existent',
      tags: ['health', 'habits'],
      stressScore: 6,
      accent: 'seafoam' as const,
    },
    {
      id: 3,
      title: 'Avoiding The Conversation™',
      tags: ['relationships', 'avoidance', 'anxiety'],
      stressScore: 7,
      accent: 'iris' as const,
    },
  ];

  // Handle unmess action
  const handleUnmess = async (problemId?: number) => {
    console.log('Initiating protocol...', problemId);
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setLoading(false);
      console.log('Protocol complete.');
    }, 2000);
  };

  return (
    <>
      <GrainOverlay />
      <Smoke delay={0} />
      <Smoke delay={10} />

      <Container maxWidth="lg" sx={{ py: 8, pb: 12, position: 'relative', zIndex: 1 }}>
        <Stack spacing={10}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontSize: { xs: '3.5rem', md: '5.5rem' },
                fontWeight: 400,
                fontStyle: 'normal',
                mb: 2,
                color: '#E0E1DD',
                letterSpacing: '-0.03em',
              }}
            >
              UnmessMe
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '1rem',
                color: 'rgba(224, 225, 221, 0.6)',
                maxWidth: '500px',
                lineHeight: 1.6,
                borderLeft: '1px solid rgba(224, 225, 221, 0.2)',
                pl: 3,
              }}
            >
              The War Room for your existential dread.
              <br />
              Organizing chaos with cold, hard data.
            </Typography>
          </Box>

          {/* Component Showcase: Problem Cards */}
          <Box>
            <Grid container spacing={4}>
              {problems.map((problem, index) => (
                <Grid item xs={12} sm={6} md={4} key={problem.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <ProblemCard
                      title={problem.title}
                      tags={problem.tags}
                      stressScore={problem.stressScore}
                      accent={problem.accent}
                      onUnmess={() => handleUnmess(problem.id)}
                      onClick={() => console.log(`Analyzing case ${problem.id}`)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Component Showcase: Tag Chips (Debris) */}
          <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500, 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(224, 225, 221, 0.4)',
                mb: 4
              }}
            >
              SYSTEM_TAGS_INDEX
            </Typography>
            
            {/* Floating debris effect */}
            <Box sx={{ position: 'absolute', top: '40px', left: '10%' }}>
              <TagChip label="WORK" color="terracotta" variant="display" />
            </Box>
            <Box sx={{ position: 'absolute', top: '80px', left: '40%' }}>
              <TagChip label="EXISTENTIAL" color="iris" variant="display" />
            </Box>
            <Box sx={{ position: 'absolute', top: '50px', left: '70%' }}>
              <TagChip label="AVOIDANCE" color="seafoam" variant="display" />
            </Box>
            <Box sx={{ position: 'absolute', top: '120px', left: '20%' }}>
              <TagChip label="DREAD" color="charcoal" variant="display" />
            </Box>
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
