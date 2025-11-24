import { Box, Typography, Stack, useTheme } from '@mui/material';
import { TaskItem } from './TaskItem';
import { AnimatePresence } from 'framer-motion';

export interface PlanStep {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface PlanStepListProps {
  /**
   * Friendly intro text
   * @example "Let's start with something tiny — message X to clarify next steps."
   */
  intro?: string;

  /**
   * List of steps
   */
  steps: PlanStep[];

  /**
   * Handlers
   */
  onToggleStep: (id: string) => void;
  onEditStep?: (id: string, newText: string) => void;
  onDeleteStep?: (id: string) => void;
}

/**
 * PlanStepList Component (V3: Execution Log)
 * 
 * Displays the generated plan as a sequence of actionable tokens.
 */
export function PlanStepList({
  intro,
  steps,
  onToggleStep,
  onEditStep,
  onDeleteStep,
}: PlanStepListProps) {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      {intro && (
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Fraunces", serif',
            fontStyle: 'italic',
            color: theme.palette.semantic.text.primary,
            mb: 3,
            lineHeight: 1.4,
          }}
        >
          {intro}
        </Typography>
      )}

      <Stack spacing={1}>
        <AnimatePresence mode='popLayout'>
          {steps.map((step) => (
            <TaskItem
              key={step.id}
              id={step.id}
              text={step.text}
              isCompleted={step.isCompleted}
              isEditable={true}
              onToggle={onToggleStep}
              onEdit={onEditStep}
              onDelete={onDeleteStep}
            />
          ))}
        </AnimatePresence>
      </Stack>
      
      {steps.length === 0 && (
        <Typography 
            variant="body2" 
            sx={{ 
                fontFamily: '"JetBrains Mono", monospace',
                color: theme.palette.semantic.text.disabled,
                textAlign: 'center',
                mt: 4
            }}
        >
            No active steps. You're free.
        </Typography>
      )}
    </Box>
  );
}

