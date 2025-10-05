'use client';

import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { Metric } from '../../core/api/types';

interface MetricCardProps {
  metric: Metric;
  label: string;
  priority?: 'low' | 'medium' | 'high';
  color?: string;
  format?: 'number' | 'percentage' | 'currency';
}

export function MetricCard({ 
  metric, 
  label, 
  priority = 'medium',
  color,
  format = 'number'
}: MetricCardProps) {
  const theme = useTheme();

  const formatValue = (value: number): string => {
    switch (format) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return new Intl.NumberFormat('es-ES', { 
          style: 'currency', 
          currency: 'EUR' 
        }).format(value);
      default:
        return value.toLocaleString('es-ES');
    }
  };

  const getCardStyles = () => {
    const baseColor = color || theme.palette.primary.main;
    
    const priorityConfig = {
      high: {
        padding: 3,
        transform: 'scale(1.02)',
        background: alpha(baseColor, 0.1),
        border: `2px solid ${alpha(baseColor, 0.3)}`,
        boxShadow: `0 8px 32px ${alpha(baseColor, 0.15)}`,
      },
      medium: {
        padding: 2.5,
        background: alpha(baseColor, 0.05),
        border: `1px solid ${alpha(baseColor, 0.2)}`,
        boxShadow: `0 4px 16px ${alpha(baseColor, 0.1)}`,
      },
      low: {
        padding: 2,
        background: alpha(theme.palette.grey[50], 0.8),
        border: `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
        boxShadow: `0 2px 8px ${alpha(theme.palette.grey[400], 0.1)}`,
      },
    };

    return {
      borderRadius: 3,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: priority === 'high' ? 'scale(1.03)' : 'translateY(-2px)',
        boxShadow: priority === 'high' 
          ? `0 12px 40px ${alpha(baseColor, 0.2)}`
          : `0 8px 24px ${alpha(baseColor, 0.15)}`,
      },
      ...priorityConfig[priority],
    };
  };

  const getTypographyConfig = () => {
    const configs = {
      high: { value: 'h2', label: 'body1' },
      medium: { value: 'h3', label: 'body2' },
      low: { value: 'h4', label: 'caption' },
    };
    return configs[priority];
  };

  const typography = getTypographyConfig();

  return (
    <Box sx={getCardStyles()}>
      {/* Accent line for high priority */}
      {priority === 'high' && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color || theme.palette.primary.main}, ${alpha(color || theme.palette.primary.main, 0.6)})`,
          }}
        />
      )}
      
      <Box sx={{ textAlign: 'center', pt: priority === 'high' ? 1 : 0 }}>
        <Typography
          variant={typography.value as any}
          sx={{
            fontWeight: priority === 'high' ? 800 : 700,
            color: priority === 'low' ? theme.palette.text.primary : (color || theme.palette.primary.main),
            mb: 1,
            letterSpacing: priority === 'high' ? '-0.02em' : '0',
          }}
        >
          {formatValue(metric.value)}
        </Typography>
        
        <Typography
          variant={typography.label as any}
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            textTransform: priority === 'high' ? 'uppercase' : 'none',
            letterSpacing: priority === 'high' ? '0.5px' : '0',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}