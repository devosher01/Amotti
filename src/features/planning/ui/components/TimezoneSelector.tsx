/**
 * Timezone Selector - Custom dropdown for timezone selection with improved UI
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Public as TimezoneIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useTimezoneStore, generateTimezoneOptions, TimezoneOption } from '../store/timezoneStore';

interface TimezoneSelectorProps {
  onTimezoneChange?: (timezone: string) => void;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  onTimezoneChange
}) => {
  const { currentTimezone, setTimezone, getTimezoneLabel } = useTimezoneStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Update current time every minute for better performance
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
          timeZone: currentTimezone === 'local' ? undefined : currentTimezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
        setCurrentTime(timeString);
      } catch (error) {
        setCurrentTime('--:--');
      }
    };

    // Update immediately
    updateTime();
    
    // Calculate milliseconds until next minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    
    let intervalId: NodeJS.Timeout;
    
    // Set initial timeout to sync with minute boundary
    const timeoutId = setTimeout(() => {
      updateTime();
      // Then update every minute
      intervalId = setInterval(updateTime, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentTimezone]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchQuery('');
  };

  const handleTimezoneSelect = (timezone: string) => {
    setTimezone(timezone);
    onTimezoneChange?.(timezone);
    handleClose();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter timezones based on search query
  const filteredTimezones = generateTimezoneOptions().filter((timezone: TimezoneOption) =>
    timezone.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    timezone.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current timezone for display
  const currentTimezoneOption = generateTimezoneOptions().find(
    (tz: TimezoneOption) => tz.value === currentTimezone
  );

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          height: '40px', // Same height as other buttons
          minWidth: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          border: 'none',
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiIconButton-root': {
            padding: 0,
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TimezoneIcon sx={{ fontSize: '18px', color: '#6b7280' }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              {currentTime} - {currentTimezoneOption?.label || 'Bogota'}
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
              UTC GMT{currentTimezoneOption?.offset || '-05:00'}
            </Typography>
          </Box>
        </Box>
        <ExpandMoreIcon 
          sx={{ 
            fontSize: '16px', 
            color: '#6b7280',
            transition: 'transform 0.2s',
            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)'
          }} 
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '300px',
            maxHeight: '400px'
          }
        }}
      >
        <MenuList sx={{ padding: '8px' }}>
          {/* Search Field */}
          <Box sx={{ padding: '8px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
            <TextField
              placeholder="Buscar zona horaria..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="medium"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: 'none',
                  fontSize: '14px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: '1px solid #8b5cf6',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6b7280', fontSize: '18px' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Timezone Options */}
          {filteredTimezones.length > 0 ? (
            filteredTimezones.map((timezone: TimezoneOption) => (
              <MenuItem
                key={timezone.value}
                onClick={() => handleTimezoneSelect(timezone.value)}
                selected={timezone.value === currentTimezone}
                sx={{
                  borderRadius: '8px',
                  padding: '12px 16px',
                  margin: '2px 0',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#ede9fe',
                    '&:hover': {
                      backgroundColor: '#ddd6fe',
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <TimezoneIcon sx={{ fontSize: '18px', color: '#6b7280' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                      {timezone.label}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                      GMT{timezone.offset}
                    </Typography>
                  </Box>
                  {timezone.value === currentTimezone && (
                    <Box sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#8b5cf6'
                    }} />
                  )}
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ borderRadius: '8px', padding: '12px 16px' }}>
              <Typography sx={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                No se encontraron zonas horarias
              </Typography>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
