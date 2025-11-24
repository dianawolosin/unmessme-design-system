import React from 'react';
import { Box, Container, Grid, Typography, Stack, useTheme } from '@mui/material';
import { 
  LandingHero, 
  FeatureCard, 
  TerminalReceipt, 
  Tag, 
  Button, 
  AppShell,
  tokens
} from '@unmessme/design-system';
import { AutoAwesome, Psychology, VerifiedUser, Bolt } from '@mui/icons-material';

interface LandingPageProps {
  onGetStarted: () => void;
}

/**
 * LandingPage Component (V3: Promotional Narrative)
 * 
 * The public face of UnmessMe. A single-scroll narrative that sells the "Dashboard" concept.
 */
export function LandingPage({ onGetStarted }: LandingPageProps) {
  const theme = useTheme();

  return (
    <AppShell 
      headerActions={
        <Button 
          variant="primary"
          onClick={onGetStarted} 
          size="sm" 
        >
          Open Dashboard
        </Button>
      }
    >
      <Stack spacing={16} sx={{ pb: 16 }}>
        {/* 1. Hero Section */}
        <LandingHero
          headline="Your life. But organized. Finally."
          subheadline="Your worries called. They want a dashboard."
          ctaText="View My Dashboard"
          onCtaClick={onGetStarted}
        />

        {/* 2. Problem Agitation (Wall of Worry) */}
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '"Fraunces", serif', 
                color: theme.palette.semantic.text.primary,
                mb: 2
              }}
            >
              Turn your problems into opportunities with UnmessMe
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: '"JetBrains Mono", monospace',
                color: theme.palette.semantic.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Stop spiraling. Start sorting.
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              justifyContent: 'center',
              opacity: 0.7 
            }}
          >
            {['EXISTENTIAL DREAD', 'UNPAID BILLS', 'AVOIDANCE', 'CAREER PANIC', 'SOCIAL ANXIETY', 'SLEEP DEBT', 'GUILT', 'UNKNOWN NUMBERS', 'DEADLINES', 'IMPOSTER SYNDROME'].map((tag, i) => (
               <Tag 
                 key={tag} 
                 label={tag} 
                 color={i % 2 === 0 ? 'urgent' : 'neutral'} 
                 variant="solid" 
                 size="md"
                 tape
               />
            ))}
          </Box>
        </Container>

        {/* 3. Solution (Bento Grid) */}
        <Container maxWidth="lg">
          <Typography 
             variant="h2" 
             sx={{ 
               fontFamily: '"Fraunces", serif', 
               color: theme.palette.semantic.text.primary,
               mb: 6,
               textAlign: 'center'
             }}
           >
             Where your problems become plans
           </Typography>
           
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <FeatureCard
                title="Tag-Based Trauma Sorting"
                description="We don't do rigid categories. Tag your mess with whatever feels real: 'money', 'guilt', 'spicy sadness'. We organize it all."
                icon={<AutoAwesome />}
                accent="seafoam"
                delay={0.1}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Zero Judgment"
                description="Our AI has seen worse. It's not here to judge your 3 AM panic; it's here to make a list."
                icon={<VerifiedUser />}
                accent="iris"
                delay={0.2}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Panic to Plan"
                description="Turn 'AHHHHHH' into 3 actionable steps. Instant clarity, zero fluff."
                icon={<Bolt />}
                accent="terracotta"
                delay={0.3}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <FeatureCard
                title="The Midnight Terminal"
                description="A visual environment designed for the modern anxious brain. Dark mode first, high contrast, and deeply calming."
                icon={<Psychology />}
                accent="seafoam"
                delay={0.4}
              />
            </Grid>
          </Grid>
        </Container>

        {/* 4. Social Proof (Receipts) */}
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography 
               variant="overline" 
               sx={{ 
                 fontFamily: '"JetBrains Mono", monospace', 
                 color: theme.palette.semantic.status.analysis,
                 mb: 4,
                 letterSpacing: '0.2em'
               }}
             >
               TESTIMONIAL_LOGS
             </Typography>
             
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={4} 
              sx={{ width: '100%', justifyContent: 'center' }}
            >
              <TerminalReceipt
                text="I felt like my brain was on fire. UnmessMe turned the fire into a very nice spreadsheet."
                author="Sarah J."
                role="Creative Director"
                timestamp="10:42 PM"
              />
              <TerminalReceipt
                text="Finally, an app that doesn't tell me to 'breathe' but tells me exactly which email to send first."
                author="Marcus T."
                role="Founder"
                timestamp="02:15 AM"
              />
            </Stack>
          </Box>
        </Container>

        {/* 5. Footer CTA */}
        <Box sx={{ textAlign: 'center', py: 8, borderTop: `1px solid ${theme.palette.semantic.border.subtle}` }}>
          <Typography variant="h3" sx={{ fontFamily: '"Fraunces", serif', mb: 4 }}>
            Ready to unmess yourself?
          </Typography>
          <Button 
            onClick={onGetStarted} 
            variant="primary"
            size="lg"
          >
            View My Dashboard
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 4, opacity: 0.5, fontFamily: '"JetBrains Mono", monospace' }}>
            © 2025 UnmessMe Inc. Not a licensed therapist. Just a really good dashboard.
          </Typography>
        </Box>
      </Stack>
    </AppShell>
  );
}

