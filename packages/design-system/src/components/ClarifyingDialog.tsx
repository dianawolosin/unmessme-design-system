import React from 'react';
import { 
  Typography, 
  Grow
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { tokens } from '../tokens';

export interface ClarifyingOption {
  id: string;
  label: string;
}

export interface ClarifyingDialogProps {
  open: boolean;
  question: string;
  options?: ClarifyingOption[];
  onSelectOption: (optionId: string) => void;
  onClose?: () => void; // Optional, as user usually *must* answer or dismiss
}

// Transition for the dialog (Grow from center)
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow ref={ref} {...props} />;
});

/**
 * ClarifyingDialog Component (V3: Interrogation Modal)
 * 
 * A focused modal that asks clarifying questions to structure the problem.
 * Glassmorphic, centered, inescapable until answered.
 */
export function ClarifyingDialog({
  open,
  question,
  options = [],
  onSelectOption,
  onClose,
}: ClarifyingDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      title={
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 600,
            color: tokens.color.semantic.text.primary,
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {question}
        </Typography>
      }
      actions={onClose ? (
        <Button 
          variant="ghost"
          size="sm"
          onClick={onClose}
          sx={{ 
            fontFamily: '"JetBrains Mono", monospace',
            textTransform: 'none'
          }}
        >
          Skip
        </Button>
      ) : undefined}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {options.map((option) => (
          <Button
            key={option.id}
            variant="secondary"
            isFullWidth
            onClick={() => onSelectOption(option.id)}
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              py: 1.5,
              px: tokens.spacing.primitive.scale['2'],
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.9rem',
              borderRadius: tokens.radius.semantic.md,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              
              '&:hover': {
                transform: `translateX(${tokens.spacing.semantic.transform.hover_nudge})`,
              },
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Dialog>
  );
}

