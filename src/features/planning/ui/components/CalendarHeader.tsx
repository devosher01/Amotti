/**
 * Calendar Header - Custom toolbar with search, filters and actions
 */

'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { CombinedFilterMoreButton } from './CombinedFilterMoreButton';
import { TimezoneSelector } from './TimezoneSelector';
import { BestHoursSelector } from './BestHoursSelector';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  currentView: string;
  onSearchChange: (query: string) => void;
  onCreatePost: () => void;
  onFilterChange?: (filterId: string) => void;
  activeFilters?: string[];
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onNavigate,
  onViewChange,
  currentView,
  onSearchChange,
  onCreatePost,
  onFilterChange,
  activeFilters = ['all']
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');


  // Dynamic time range based on current view
  const getTimeRangeLabel = () => {
    switch (currentView) {
      case 'month':
        return 'Este mes';
      case 'week':
        return 'Esta semana';
      case 'day':
        return 'Hoy';
      default:
        return 'Esta semana';
    }
  };

  const handleTimeRangeClick = () => {
    // Navigate to current time period based on view
    onNavigate('today');
  };

  const formatDateRange = () => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (currentView === 'week') {
      // Get start of week (Monday)
      const day = start.getDay();
      const diff = start.getDate() - day + (day === 0 ? -6 : 1);
      start.setDate(diff);

      // Get end of week (Sunday)
      end.setDate(start.getDate() + 6);

      return `${start.getDate()} ${start.toLocaleDateString('es-ES', { month: 'short' })} ${start.getFullYear()} - ${end.getDate()} ${end.toLocaleDateString('es-ES', { month: 'short' })} ${end.getFullYear()}`;
    } else if (currentView === 'month') {
      return currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    } else {
      return currentDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        gap: 2,
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      {/* Left Section - Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <TextField
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{
            minWidth: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: alpha(theme.palette.background.default, 0.8),
              border: 'none',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: `1px solid ${theme.palette.primary.main}`,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: '20px' }} />
              </InputAdornment>
            ),
          }}
        />

        <Chip
          label={getTimeRangeLabel()}
          onClick={handleTimeRangeClick}
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: '500',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            }
          }}
        />
      </Box>

      {/* Center Section - Date Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={() => onNavigate('prev')}
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: '600',
            minWidth: '200px',
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          {formatDateRange()}
        </Typography>

        <IconButton
          onClick={() => onNavigate('next')}
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Right Section - View Controls and Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Combined Filter and More Button */}
        <CombinedFilterMoreButton
          onFilterChange={onFilterChange}
          activeFilters={activeFilters}
          onViewChange={onViewChange}
        />

        {/* Timezone Selector */}
        <TimezoneSelector
          onTimezoneChange={(timezone) => {
            // Additional logic if needed when timezone changes
            console.log('Timezone changed to:', timezone);
          }}
        />

        {/* Best Hours Selector */}
        <BestHoursSelector
          onSelectionChange={(selection) => {
            // Additional logic if needed when best hours selection changes
            console.log('Best hours changed to:', selection);
          }}
        />

        {/* Create Post Button */}
        <Button
          onClick={onCreatePost}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: '8px',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            }
          }}
        >
          Crear publicación
        </Button>
      </Box>
    </Box>
  );
};
