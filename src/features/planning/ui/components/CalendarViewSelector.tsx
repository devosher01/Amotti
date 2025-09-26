/**
 * Calendar View Selector - Dropdown component for switching calendar views
 */

'use client';

import React, { useState } from 'react';
import { 
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import {
  CalendarViewMonth as MonthIcon,
  CalendarViewWeek as WeekIcon,
  CalendarViewDay as DayIcon,
  ExpandMore as ExpandIcon
} from '@mui/icons-material';

type CalendarView = 'month' | 'week' | 'day';

interface ViewOption {
  value: CalendarView;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface CalendarViewSelectorProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const VIEW_OPTIONS: ViewOption[] = [
  {
    value: 'month',
    label: 'Mes',
    icon: <MonthIcon sx={{ fontSize: '18px', color: '#6b7280' }} />,
    description: 'Vista completa del mes'
  },
  {
    value: 'week',
    label: 'Semana',
    icon: <WeekIcon sx={{ fontSize: '18px', color: '#6b7280' }} />,
    description: 'Vista detallada de la semana'
  },
  {
    value: 'day',
    label: 'Día',
    icon: <DayIcon sx={{ fontSize: '18px', color: '#6b7280' }} />,
    description: 'Vista detallada del día'
  }
];

export const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  currentView,
  onViewChange
}) => {
  const getCurrentViewOption = () => {
    return VIEW_OPTIONS.find(option => option.value === currentView) || VIEW_OPTIONS[1];
  };

  const currentOption = getCurrentViewOption();

  return (
    <FormControl size="small">
      <Select
        value={currentView}
        onChange={(e) => onViewChange(e.target.value as CalendarView)}
        displayEmpty
        IconComponent={ExpandIcon}
        sx={{
          minWidth: '140px',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-select': {
            paddingY: '8px',
            paddingX: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          },
          '&:hover .MuiSelect-select': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiSelect-icon': {
            color: '#6b7280',
            right: '8px',
          }
        }}
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {currentOption.icon}
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
              {currentOption.label}
            </Typography>
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
              minWidth: '200px',
              '& .MuiList-root': {
                padding: '8px',
              }
            }
          }
        }}
      >
        {VIEW_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              borderRadius: '8px',
              margin: '2px 0',
              padding: '12px 16px',
              backgroundColor: currentView === option.value ? '#f0f9ff' : 'transparent',
              border: currentView === option.value ? '1px solid #bfdbfe' : '1px solid transparent',
              '&:hover': {
                backgroundColor: currentView === option.value ? '#e0f2fe' : '#f8fafc',
              },
              '&.Mui-selected': {
                backgroundColor: '#f0f9ff !important',
                '&:hover': {
                  backgroundColor: '#e0f2fe !important',
                }
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              {/* Icon with active state */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: currentView === option.value ? '#3b82f6' : '#f3f4f6',
                color: currentView === option.value ? 'white' : '#6b7280',
                transition: 'all 0.2s ease-in-out'
              }}>
                {React.cloneElement(option.icon as React.ReactElement, {
                  sx: { 
                    fontSize: '16px', 
                    color: currentView === option.value ? 'white' : '#6b7280'
                  }
                })}
              </Box>
              
              {/* Text content */}
              <Box sx={{ flex: 1 }}>
                <Typography 
                  sx={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: currentView === option.value ? '#1e40af' : '#374151',
                    marginBottom: '2px'
                  }}
                >
                  {option.label}
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '12px', 
                    color: '#6b7280',
                    lineHeight: 1.3
                  }}
                >
                  {option.description}
                </Typography>
              </Box>

              {/* Active indicator */}
              {currentView === option.value && (
                <Box sx={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  flexShrink: 0
                }} />
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
