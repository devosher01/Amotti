'use client';

import React from 'react';
import { ToggleButton, ToggleButtonGroup, alpha, useTheme } from '@mui/material';
import { TimeRange } from '../../core/api/types';

interface DateSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  size?: 'small' | 'medium' | 'large';
}

export function DateSelector({ value, onChange, size = 'medium' }: DateSelectorProps) {
  const theme = useTheme();

  const options = [
    { value: 7 as TimeRange, label: '7 días' },
    { value: 30 as TimeRange, label: '30 días' },
  ];

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: TimeRange | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size={size}
      sx={{
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2,
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        '& .MuiToggleButton-root': {
          border: 'none',
          borderRadius: '6px !important',
          mx: 0.5,
          px: 2,
          py: 1,
          fontWeight: 600,
          fontSize: '0.875rem',
          color: theme.palette.text.secondary,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            color: theme.palette.primary.main,
          },
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 700,
            boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.15),
            },
          },
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}