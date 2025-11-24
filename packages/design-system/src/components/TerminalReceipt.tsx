import { Box, Typography, useTheme, Paper } from '@mui/material';
import { tokens } from '../tokens';

export interface TerminalReceiptProps {
  text: string;
  author: string;
  role?: string;
  timestamp?: string;
}

/**
 * TerminalReceipt Component (V3: Social Proof)
 * 
 * Testimonials presented as thermal receipts or terminal logs.
 * Aesthetic: Monospace, jagged edges (simulated), low opacity.
 */
export function TerminalReceipt({ text, author, role = 'UnmessMe User', timestamp = 'NOW' }: TerminalReceiptProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: tokens.color.semantic.bg.glass_tint,
        border: `${tokens.border.width.base} ${tokens.border.style.dashed} ${theme.palette.semantic.border.subtle}`,
        borderRadius: tokens.radius.semantic.xs, // Almost sharp
        position: 'relative',
        fontFamily: '"JetBrains Mono", monospace',
        maxWidth: tokens.spacing.semantic.layout.width.sm,
        
        // Receipt notch effect (Top)
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -4,
          left: 0,
          right: 0,
          height: 4,
          backgroundImage: `linear-gradient(45deg, transparent 33.333%, ${theme.palette.semantic.bg.canvas} 33.333%, ${theme.palette.semantic.bg.canvas} 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, ${theme.palette.semantic.bg.canvas} 33.333%, ${theme.palette.semantic.bg.canvas} 66.667%, transparent 66.667%)`,
          backgroundSize: tokens.spacing.semantic.pattern.receipt_notch,
        },
        
        // Receipt notch effect (Bottom)
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -4,
          left: 0,
          right: 0,
          height: 4,
          backgroundImage: `linear-gradient(45deg, transparent 33.333%, ${theme.palette.semantic.bg.canvas} 33.333%, ${theme.palette.semantic.bg.canvas} 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, ${theme.palette.semantic.bg.canvas} 33.333%, ${theme.palette.semantic.bg.canvas} 66.667%, transparent 66.667%)`,
          backgroundSize: tokens.spacing.semantic.pattern.receipt_notch,
          transform: 'rotate(180deg)',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, opacity: 0.5 }}>
        <Typography variant="caption" sx={{ fontFamily: 'inherit' }}>RECEIPT_ID_#{Math.floor(Math.random() * 9999)}</Typography>
        <Typography variant="caption" sx={{ fontFamily: 'inherit' }}>{timestamp}</Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontFamily: 'inherit',
          color: theme.palette.semantic.text.primary,
          mb: 3,
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}
      >
        "{text}"
      </Typography>

      <Box sx={{ borderTop: `${tokens.border.width.base} ${tokens.border.style.dashed} ${theme.palette.semantic.border.subtle}`, pt: 2 }}>
        <Typography variant="subtitle2" sx={{ fontFamily: 'inherit', color: theme.palette.semantic.text.primary }}>
          {author}
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: 'inherit', color: theme.palette.semantic.text.secondary }}>
          {role}
        </Typography>
      </Box>
    </Paper>
  );
}

