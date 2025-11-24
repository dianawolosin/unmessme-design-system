import React from 'react';
import { Box, GlobalStyles, AppBar, Toolbar, Typography, Avatar, Stack } from '@mui/material';
import { tokens } from '../tokens';

export interface AppShellProps {
  children: React.ReactNode;
  /**
   * Optional user avatar URL
   */
  userAvatarUrl?: string;
  /**
   * Optional custom header actions (replaces avatar)
   */
  headerActions?: React.ReactNode;
}

/**
 * AppShell Component (V3: Digital Noir Container)
 * 
 * Provides the main layout structure with:
 * - Midnight Terminal background color
 * - Film grain/noise overlay
 * - Subtle scanline effect (optional)
 * - App Bar
 */
export function AppShell({ children, userAvatarUrl, headerActions }: AppShellProps) {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: tokens.color.semantic.bg.canvas,
        position: 'relative',
        overflow: 'hidden', // Ensure noise doesn't scroll independently if we positioned it absolutely
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Global Styles for Film Grain Animation */}
      <GlobalStyles
        styles={{
          '@keyframes noise': {
            '0%': { transform: 'translate(0, 0)' },
            '10%': { transform: 'translate(-5%, -5%)' },
            '20%': { transform: 'translate(-10%, 5%)' },
            '30%': { transform: 'translate(5%, -10%)' },
            '40%': { transform: 'translate(-5%, 15%)' },
            '50%': { transform: 'translate(-10%, 5%)' },
            '60%': { transform: 'translate(15%, 0)' },
            '70%': { transform: 'translate(0, 10%)' },
            '80%': { transform: 'translate(-15%, 0)' },
            '90%': { transform: 'translate(10%, 5%)' },
            '100%': { transform: 'translate(5%, 0)' },
          },
        }}
      />

      {/* Noise Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          width: '200%',
          height: '200vh',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'noise 0.2s infinite',
        }}
      />

      {/* App Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          borderBottom: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
          zIndex: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontStyle: 'italic',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: tokens.color.semantic.text.primary,
              }}
            >
              UnmessMe
            </Typography>
          </Stack>

          {headerActions ? (
            <Box>{headerActions}</Box>
          ) : (
            <Avatar
              src={userAvatarUrl}
              sx={{
                width: 32,
                height: 32,
                border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.highlight}`,
                backgroundColor: tokens.color.semantic.bg.surface,
              }}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 4 },
          maxWidth: 'lg',
          width: '100%',
          mx: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
