import { useState } from 'react';
import { Box, Typography, Grid, Stack, Collapse, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppShell,
  ChatInput,
  ProblemCard,
  Tag,
  Button,
  ClarifyingDialog,
  PlanStepList,
  PlanStep,
  tokens
} from '@unmessme/design-system';
import { LandingPage } from './LandingPage';

/**
 * UnmessMe Prototype Environment (V3: The Dashboard)
 */
function App() {
  // App State
  const [view, setView] = useState<'landing' | 'app'>('landing');
  
  // Dashboard State
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  // Sample problems data
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: 'Behind on bills & spiraling',
      tags: ['money', 'stress', 'avoidance'],
      stressScore: 8,
      accent: 'urgent' as const,
    },
    {
      id: 2,
      title: 'Sleep schedule non-existent',
      tags: ['health', 'habits'],
      stressScore: 6,
      accent: 'success' as const,
    },
    {
      id: 3,
      title: 'Avoiding The Conversation™',
      tags: ['relationships', 'avoidance', 'anxiety'],
      stressScore: 7,
      accent: 'analysis' as const,
    },
  ]);

  // Mock Plan Data
  const mockPlan: PlanStep[] = [
    { id: '1', text: 'Open the banking app (don\'t look at the balance yet).', isCompleted: false },
    { id: '2', text: 'Write down the 3 scariest numbers on a post-it.', isCompleted: false },
    { id: '3', text: 'Drink a glass of water.', isCompleted: false },
    { id: '4', text: 'Call the electric company (script provided below).', isCompleted: false },
  ];

  const handleInputSubmit = (text: string) => {
    console.log('User input:', text);
    // In a real app, this would trigger AI processing
    // For prototype, we simulate "listening" then asking a clarifying question
    setTimeout(() => {
        setDialogOpen(true);
    }, 800);
  };

  const handleDialogSelect = (optionId: string) => {
    console.log('Selected option:', optionId);
    setDialogOpen(false);
    
    // Simulate adding a new problem after clarification
    const newProblem = {
      id: Date.now(),
      title: 'Feeling overwhelmed by everything', // In real app, derived from input
      tags: ['overwhelm', 'life', 'chaos'],
      stressScore: 9,
      accent: 'urgent' as const,
    };
    
    setProblems(prev => [newProblem, ...prev]);
  };

  const handleUnmess = async (problemId?: number) => {
    console.log('Initiating protocol...', problemId);
    setActiveProblemId(problemId || null);
    setLoading(true);
    
    // Simulate async operation
    setTimeout(() => {
      setLoading(false);
      setPlanOpen(true);
      console.log('Analysis complete.');
    }, 1500);
  };

  // Render Landing Page
  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('app')} />;
  }

  // Render Main App
  return (
    <AppShell userAvatarUrl="https://i.pravatar.cc/150?img=11">
      <Stack spacing={8}>
        {/* Section 1: Conversational Intake */}
        <Box sx={{ pt: 4, pb: 2 }}>
          <ChatInput
            onSubmit={handleInputSubmit}
            placeholder="What's weighing on you right now?"
          />
        </Box>

        {/* Section 2: The Dashboard (Problem Cards) */}
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: '"Fraunces", serif',
                        color: tokens.color.semantic.text.primary,
                    }}
                >
                    Active Cases
                </Typography>
                
                <Stack direction="row" spacing={1}>
                    <Tag label="URGENT" color="urgent" variant="outline" />
                    <Tag label="MONEY" color="success" variant="outline" />
                    <Tag label="WORK" color="analysis" variant="outline" />
                </Stack>
            </Box>

          <Grid container spacing={4}>
            <AnimatePresence mode='popLayout'>
            {problems.map((problem, index) => (
              <Grid item xs={12} sm={6} md={4} key={problem.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <ProblemCard
                    title={problem.title}
                    tags={problem.tags}
                    stressScore={problem.stressScore}
                    accent={problem.accent}
                    onUnmess={() => handleUnmess(problem.id)}
                    onClick={() => console.log(`Analyzing case ${problem.id}`)}
                    disabled={activeProblemId !== null && activeProblemId !== problem.id}
                  />
                </motion.div>
              </Grid>
            ))}
            </AnimatePresence>
          </Grid>
        </Box>

        {/* Section 3: The Plan (Result) - Shown when active */}
        <Collapse in={planOpen}>
            <Box 
                sx={{ 
                    mt: 4, 
                    p: 4, 
                    backgroundColor: alpha(tokens.color.semantic.action.primary, 0.05), 
                    border: `1px solid ${alpha(tokens.color.semantic.action.primary, 0.2)}`,
                    borderRadius: tokens.radius.semantic.lg 
                }}
            >
                <PlanStepList 
                    intro="We're going to tackle the bills first. Small moves only."
                    steps={mockPlan}
                    onToggleStep={(id: string) => console.log('Toggle', id)}
                />
                
                 <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="secondary"
                        onClick={() => setPlanOpen(false)} 
                        size="sm"
                    >
                        Close Plan
                    </Button>
                 </Box>
            </Box>
        </Collapse>
      </Stack>

      {/* Clarifying Dialog */}
      <ClarifyingDialog
        open={dialogOpen}
        question="Is this mostly stressing you because of time pressure or emotional weight?"
        options={[
            { id: 'time', label: 'It\'s the deadline. I have no time.' },
            { id: 'emotion', label: 'It\'s the guilt. I\'ve been avoiding it.' },
            { id: 'both', label: 'Both. It\'s a mess.' },
        ]}
        onSelectOption={handleDialogSelect}
        onClose={() => setDialogOpen(false)}
      />
      
      {/* Global FAB (using fixed positioning hack on Button if needed, or just a Box wrapper) */}
      {!planOpen && (
          <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100 }}>
            <Button
                variant="primary"
                size="lg"
                onClick={() => handleUnmess()}
                sx={{ 
                    borderRadius: 999,
                    minWidth: 'auto',
                    width: 64,
                    height: 64,
                    p: 0,
                    boxShadow: tokens.elevation.semantic.button.primary
                }}
            >
                {loading ? '...' : '+'}
            </Button>
          </Box>
      )}
    </AppShell>
  );
}

export default App;
