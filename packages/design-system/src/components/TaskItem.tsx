import { 
  Box, 
  Checkbox, 
  Typography, 
  IconButton, 
  Paper,
  alpha
} from '@mui/material';
import { Edit, DragIndicator, DeleteOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

export interface TaskItemProps {
  id: string;
  text: string;
  isCompleted?: boolean;
  isEditable?: boolean;
  onToggle?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * TaskItem Component (V3: Action Token)
 * 
 * Represents a single, bite-sized actionable step.
 * Looks like a punch-card entry or a terminal log line.
 */
export function TaskItem({
  id,
  text,
  isCompleted = false,
  isEditable = false,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          mb: 1,
          backgroundColor: isCompleted 
            ? alpha(tokens.color.semantic.bg.surface, 0.3)
            : tokens.color.semantic.bg.surface,
          border: `${tokens.border.width.base} ${tokens.border.style.solid} ${isCompleted 
            ? 'transparent' 
            : tokens.color.semantic.border.subtle}`,
          borderRadius: tokens.radius.semantic.sm,
          transition: 'all 0.2s ease',
          opacity: isCompleted ? 0.6 : 1,
          
          '&:hover': {
            borderColor: tokens.color.semantic.border.highlight,
            backgroundColor: alpha(tokens.color.semantic.bg.surface, 0.8),
          },
        }}
      >
        {/* Drag Handle (Visual only for now) */}
        <Box sx={{ cursor: 'grab', color: tokens.color.semantic.text.disabled, mr: 1, display: 'flex' }}>
           <DragIndicator fontSize="small" />
        </Box>

        {/* Checkbox */}
        <Checkbox
          checked={isCompleted}
          onChange={() => onToggle && onToggle(id)}
          sx={{
            color: tokens.color.semantic.border.highlight,
            '&.Mui-checked': {
              color: tokens.color.semantic.status.success,
            },
          }}
        />

        {/* Text */}
        <Typography
          variant="body2"
          sx={{
            flexGrow: 1,
            fontFamily: tokens.typography.semantic.body.main.font,
            textDecoration: isCompleted ? 'line-through' : 'none',
            color: isCompleted 
              ? tokens.color.semantic.text.disabled 
              : tokens.color.semantic.text.primary,
            mx: 1,
          }}
        >
          {text}
        </Typography>

        {/* Actions */}
        {isEditable && !isCompleted && (
          <Box sx={{ display: 'flex' }}>
            <IconButton 
              size="small" 
              onClick={() => onEdit && onEdit(id, text)}
              sx={{ color: tokens.color.semantic.text.secondary }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => onDelete && onDelete(id)}
              sx={{ color: tokens.color.semantic.text.secondary, '&:hover': { color: tokens.color.semantic.status.urgent } }}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
}
