'use client';

import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { IconChartLine, IconAlertCircle, IconWifi } from '@tabler/icons-react';

interface EmptyStateProps {
  type: 'no-data' | 'error' | 'no-connection';
  title: string;
  description?: string;
  height?: number;
}

export function EmptyState({ 
  type, 
  title, 
  description,
  height = 200 
}: EmptyStateProps) {
  const theme = useTheme();

  const getIcon = () => {
    const iconProps = { size: 48, color: theme.palette.text.secondary };
    
    switch (type) {
      case 'error':
        return <IconAlertCircle {...iconProps} color={theme.palette.error.main} />;
      case 'no-connection':
        return <IconWifi {...iconProps} color={theme.palette.warning.main} />;
      default:
        return <IconChartLine {...iconProps} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'error':
        return {
          background: alpha(theme.palette.error.main, 0.05),
          border: alpha(theme.palette.error.main, 0.1),
          titleColor: theme.palette.error.dark,
        };
      case 'no-connection':
        return {
          background: alpha(theme.palette.warning.main, 0.05),
          border: alpha(theme.palette.warning.main, 0.1),
          titleColor: theme.palette.warning.dark,
        };
      default:
        return {
          background: alpha(theme.palette.grey[100], 0.5),
          border: alpha(theme.palette.grey[300], 0.3),
          titleColor: theme.palette.text.primary,
        };
    }
  };

  const colors = getColors();

  return (
    <Box
      sx={{
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        borderRadius: 3,
        background: colors.background,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ mb: 2, opacity: 0.8 }}>
        {getIcon()}
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: colors.titleColor,
          mb: description ? 1 : 0,
        }}
      >
        {title}
      </Typography>
      
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 300,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}