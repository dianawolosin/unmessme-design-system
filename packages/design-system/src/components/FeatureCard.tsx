import React from 'react';
import { Box, Typography, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Surface } from './Surface';
import { tokens } from '../tokens';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  accent?: 'terracotta' | 'iris' | 'seafoam';
  delay?: number;
}

/**
 * FeatureCard Component (V3: Smoked Glass Showcase)
 * 
 * Modular card for the Bento Grid layout.
 * Reuses the "Digital Noir" aesthetic with neon accent borders.
 */
export function FeatureCard({ title, description, icon, accent = 'seafoam', delay = 0 }: FeatureCardProps) {
  
  // Map accents to palette colors
  const accentColor = tokens.color.semantic.status[accent === 'terracotta' ? 'urgent' : accent === 'iris' ? 'analysis' : 'success'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Surface
        variant="glass"
        sx={{
          height: '100%',
          transition: 'all 0.3s ease',
          
          '&:hover': {
            transform: `translateY(${tokens.spacing.semantic.transform.hover_lift})`,
            borderColor: accentColor,
            boxShadow: `${tokens.elevation.semantic.card.focused}, 0 0 0 ${tokens.border.width.base} ${accentColor}20`,
            
            '&::before': {
              opacity: 1,
            }
          },

          // Top border accent glow
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: tokens.border.width.base,
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            opacity: 0.5,
            transition: 'opacity 0.3s ease',
          }
        }}
      >
        <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Icon Area */}
          {icon && (
            <Box 
              sx={{ 
                mb: 3, 
                color: accentColor,
                '& svg': { fontSize: '2rem' } 
              }}
            >
              {icon}
            </Box>
          )}

            <Typography
            variant="h4"
            component="h3"
            sx={{
              fontFamily: '"Fraunces", serif',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: tokens.color.semantic.text.primary,
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: '"JetBrains Mono", monospace',
              color: tokens.color.semantic.text.secondary,
              lineHeight: 1.6,
              fontSize: '0.9rem',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Surface>
    </motion.div>
  );
}

