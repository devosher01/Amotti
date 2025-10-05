'use client';

import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function AnalyticsLayout({ children, maxWidth = '100%' }: AnalyticsLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        maxWidth,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: 3,
        // CSS Grid layout - flat structure
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 3,
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
        
        // ANTI-OVERFLOW MÁXIMA SEGURIDAD
        overflow: 'hidden',
        minWidth: 0, // Permite flex shrinking
        boxSizing: 'border-box',
        
        // Responsive grid adjustments
        [theme.breakpoints.up('lg')]: {
          gap: 4,
          px: 5,
        },
        
        // Smooth animations for layout changes
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        
        // Custom scrollbar for webkit browsers
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.grey[200], 0.5),
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: 4,
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}
    >
      {children}
    </Box>
  );
}

// Specialized grid containers for different sections
export function MetricsGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: { xs: 2, sm: 3 },
        alignItems: 'stretch',
      }}
    >
      {children}
    </Box>
  );
}

export function ChartsGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'repeat(2, 1fr)',
        },
        gap: 3,
        alignItems: 'start',
      }}
    >
      {children}
    </Box>
  );
}

export function PostsGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: 3,
        alignItems: 'start',
      }}
    >
      {children}
    </Box>
  );
}