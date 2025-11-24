import React, { useState, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  InputAdornment, 
  Typography
} from '@mui/material';
import { Mic, Send, Stop } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './Input';
import { tokens } from '../tokens';

export interface ChatInputProps {
  /**
   * Placeholder text / Prompt
   * @default "What's weighing on you today?"
   */
  placeholder?: string;

  /**
   * Submit handler
   */
  onSubmit: (text: string) => void;

  /**
   * Loading state (AI thinking)
   */
  isThinking?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * ChatInput Component (Molecule)
 * 
 * A large, friendly input field that feels like a chat with a friend.
 * Supports voice input toggling.
 */
export function ChatInput({
  placeholder = "What's weighing on you today?",
  onSubmit,
  isThinking = false,
  disabled = false,
}: ChatInputProps) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (text.trim() && !disabled && !isThinking) {
      onSubmit(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would hook into Web Speech API
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: tokens.spacing.semantic.layout.width.lg,
        mx: 'auto',
        position: 'relative',
      }}
    >
      <Input
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || isThinking}
        inputRef={inputRef}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontFamily: '"Fraunces", serif',
            color: tokens.color.semantic.text.primary,
            lineHeight: 1.4,
            padding: 3,
            backgroundColor: 'transparent', // No background
            
            // Placeholder styling
            '& ::placeholder': {
              color: tokens.color.semantic.text.secondary,
              opacity: 0.5,
              fontStyle: 'italic',
            },
          },
          endAdornment: (
            <InputAdornment position="end" sx={{ pb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {/* Voice Input */}
                <IconButton
                  onClick={toggleListening}
                  disabled={disabled || isThinking}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                  sx={{
                    color: isListening 
                      ? tokens.color.semantic.status.urgent 
                      : tokens.color.semantic.text.secondary,
                    '&:hover': {
                      color: isListening 
                        ? tokens.color.semantic.status.urgent 
                        : tokens.color.semantic.action.primary,
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {isListening ? <Stop /> : <Mic />}
                </IconButton>

                {/* Send Button (only shows when there is text) */}
                <AnimatePresence>
                  {text.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconButton
                        onClick={handleSubmit}
                        disabled={disabled || isThinking}
                        aria-label="Send message"
                        sx={{
                          backgroundColor: tokens.color.semantic.action.primary,
                          color: tokens.color.semantic.text.inverse,
                          '&:hover': {
                            backgroundColor: tokens.color.semantic.action.hover,
                          },
                          width: 40,
                          height: 40,
                        }}
                      >
                         <Send fontSize="small" />
                      </IconButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          // Container styling to make it feel like a distinct area but not a boxy input
          borderBottom: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
          transition: 'border-color 0.2s ease',
          '&:focus-within': {
            borderBottom: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.action.primary}`,
          },
          // Override generic Input atom styles for this specific conversational case
          '& .MuiInputBase-root': {
             backgroundColor: 'transparent !important',
             borderRadius: 0,
             boxShadow: 'none !important',
          },
          '& .MuiInputBase-root.Mui-focused': {
             boxShadow: 'none !important',
          }
        }}
      />
      
      {/* Listening Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: tokens.radius.semantic.circle,
                backgroundColor: tokens.color.semantic.status.urgent,
                animation: 'pulse 1s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                  '100%': { opacity: 1 },
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Listening...
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

