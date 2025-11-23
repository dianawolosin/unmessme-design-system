import { useState } from 'react';
import { Box, Container, Typography, Stack, Grid, Divider } from '@mui/material';
import {
  ProblemCard,
  TagChip,
  UnmessButton,
  getRotatedAccentColor,
} from '@unmessme/design-system';

/**
 * UnmessMe Prototype Environment
 * 
 * Live demo environment showcasing:
 * 1. UnmessMe design system components
 * 2. Dark mode first theme
 * 3. Conference-ready prototype
 * 4. MCP integration testing ground
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
      <Container maxWidth="lg" sx={{ py: 8, pb: 12 }}>
        <Stack spacing={8}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              UnmessMe Design System
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                maxWidth: '600px',
              }}
            >
              Live prototype environment for the Into Design Systems Vibe Coding Conference 2025.
              Showcasing React + MUI components with dark-mode-first design.
            </Typography>
          </Box>

          <Divider />

          {/* Component Showcase: Problem Cards */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Problem Cards
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Bento-style cards for displaying user problems with tags and actions.
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

          <Divider />

          {/* Component Showcase: Tag Chips */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Tag Chips
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Pill-shaped chips for displaying and interacting with tags. Three variants: display, filter, input.
            </Typography>

            <Stack spacing={3}>
              {/* Display Chips */}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  Display Chips (Read-Only)
                </Typography>
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
              </Box>

              {/* Filter Chips */}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  Filter Chips (Interactive)
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {['money', 'work', 'stress', 'avoidance'].map((tag, index) => (
                    <TagChip
                      key={tag}
                      label={tag}
                      variant="filter"
                      color={getRotatedAccentColor(index)}
                      selected={index === 0}
                      onClick={() => console.log(`Filter by ${tag}`)}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Input Chips */}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  Input Chips (Removable)
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {['anxiety', 'time pressure', 'overwhelm'].map((tag, index) => (
                    <TagChip
                      key={tag}
                      label={tag}
                      variant="input"
                      color={getRotatedAccentColor(index + 2)}
                      onDelete={() => console.log(`Remove ${tag}`)}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Status Section */}
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'surface.card',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              ✅ Implementation Complete
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              All core components are now implemented and working:
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                '& li': {
                  mb: 1,
                  color: 'text.secondary',
                },
              }}
            >
              <li>
                <strong>ProblemCard</strong> - Bento-style cards with tags and stress indicators
              </li>
              <li>
                <strong>TagChip</strong> - Display, filter, and input variants
              </li>
              <li>
                <strong>UnmessButton</strong> - FAB with micro-interactions (see bottom-right!)
              </li>
              <li>
                <strong>MUI Theme</strong> - Dark mode first with custom accents
              </li>
              <li>
                <strong>Design Tokens</strong> - W3C JSON format
              </li>
            </Box>
          </Box>

          {/* Next Steps */}
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              🎯 Next Steps
            </Typography>
            <Box
              component="ol"
              sx={{
                pl: 3,
                '& li': {
                  mb: 1,
                  color: 'text.secondary',
                },
              }}
            >
              <li>Create MCP metadata files (JSON + MD)</li>
              <li>Build MCP server implementation</li>
              <li>Set up Docusaurus documentation site</li>
              <li>Add more components (ChatBubble, FilterChipBar, etc.)</li>
              <li>Conference demo flows</li>
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

