import React from 'react';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { tokens } from '../tokens';
import { Surface } from './Surface';

export interface DialogProps extends Omit<MuiDialogProps, 'title'> {
  /**
   * Title of the dialog
   */
  title?: React.ReactNode;
  
  /**
   * Content of the dialog
   */
  children: React.ReactNode;
  
  /**
   * Action buttons (usually Button atoms)
   */
  actions?: React.ReactNode;
}

/**
 * Dialog Component (Atom)
 * 
 * A modal window for critical information or decisions.
 * Wraps MUI Dialog but forces the "Glass" aesthetic using tokens.
 */
export function Dialog({
  title,
  children,
  actions,
  PaperProps,
  sx,
  ...props
}: DialogProps) {
  
  return (
    <MuiDialog
      PaperComponent={(props) => (
        <Surface 
          {...props}
          variant="glass" 
          elevation="floating" 
          sx={{ 
            ...props.sx,
            backgroundImage: 'none', // Ensure no MUI overlay
            maxWidth: tokens.spacing.semantic.layout.width.md,
            width: '100%',
            m: 2
          }} 
        />
      )}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: tokens.color.semantic.bg.backdrop,
          backdropFilter: `blur(${tokens.effect.blur.sm})`, // V3: Deep blur focus
        },
        ...sx,
      }}
      {...props}
    >
      {title && (
        <DialogTitle
          sx={{
            fontFamily: tokens.typography.semantic.heading.card.font,
            fontSize: tokens.typography.semantic.heading.card.size,
            color: tokens.color.semantic.text.primary,
            pb: 1,
          }}
        >
          {title}
        </DialogTitle>
      )}
      
      <DialogContent
        sx={{
          color: tokens.color.semantic.text.secondary,
          fontFamily: tokens.typography.semantic.body.main.font,
          lineHeight: 1.6,
          pb: 2,
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ p: 3, pt: 1 }}>
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
}

