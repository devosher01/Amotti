/**
 * Calendar Filter Menu - Advanced dropdown for calendar filters
 */

'use client';

import React, { useState } from 'react';
import { 
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Chip
} from '@mui/material';
import {
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  EditNote as DraftIcon,
  CheckCircle as PublishedIcon,
  Error as ErrorIcon,
  AutoAwesome as AutoListIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  count?: number;
  active?: boolean;
}

interface CalendarFilterMenuProps {
  onFilterChange?: (filterId: string) => void;
  activeFilters?: string[];
}

const FILTER_OPTIONS: FilterOption[] = [
  {
    id: 'all',
    label: 'Todos los eventos',
    icon: <CalendarIcon sx={{ fontSize: '18px' }} />,
    description: 'Ver todas las publicaciones',
    count: 156
  },
  {
    id: 'scheduled',
    label: 'Solo programados',
    icon: <ScheduleIcon sx={{ fontSize: '18px' }} />,
    description: 'Publicaciones pendientes',
    count: 23
  },
  {
    id: 'published',
    label: 'Publicados',
    icon: <PublishedIcon sx={{ fontSize: '18px' }} />,
    description: 'Publicaciones completadas',
    count: 89
  },
  {
    id: 'draft',
    label: 'Borradores',
    icon: <DraftIcon sx={{ fontSize: '18px' }} />,
    description: 'Publicaciones sin programar',
    count: 12
  },
  {
    id: 'autolist',
    label: 'Autolistas',
    icon: <AutoListIcon sx={{ fontSize: '18px' }} />,
    description: 'Contenido automático',
    count: 32
  },
  {
    id: 'errors',
    label: 'Con errores',
    icon: <ErrorIcon sx={{ fontSize: '18px' }} />,
    description: 'Publicaciones fallidas',
    count: 3
  }
];

export const CalendarFilterMenu: React.FC<CalendarFilterMenuProps> = ({
  onFilterChange,
  activeFilters = ['all']
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filterId: string) => {
    onFilterChange?.(filterId);
    handleClose();
  };

  const getActiveFilterLabel = () => {
    if (activeFilters.length === 0 || activeFilters.includes('all')) {
      return 'Todos los eventos';
    }
    if (activeFilters.length === 1) {
      const filter = FILTER_OPTIONS.find(f => f.id === activeFilters[0]);
      return filter?.label || 'Filtros';
    }
    return `${activeFilters.length} filtros`;
  };

  const hasActiveFilters = activeFilters.length > 0 && !activeFilters.includes('all');

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: hasActiveFilters ? '#3b82f6' : '#6b7280',
          backgroundColor: hasActiveFilters ? '#eff6ff' : 'transparent',
          border: hasActiveFilters ? '1px solid #bfdbfe' : 'none',
          '&:hover': {
            backgroundColor: hasActiveFilters ? '#dbeafe' : '#f3f4f6',
          },
          position: 'relative'
        }}
      >
        <FilterIcon />
        {hasActiveFilters && (
          <Box sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            border: '2px solid white'
          }} />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
            minWidth: '280px',
            maxWidth: '320px'
          }
        }}
      >
        <MenuList sx={{ padding: '12px' }}>
          {/* Header */}
          <Box sx={{ 
            padding: '8px 16px 16px 16px', 
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '8px'
          }}>
            <Typography sx={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '4px'
            }}>
              Filtrar calendario
            </Typography>
            <Typography sx={{ 
              fontSize: '12px', 
              color: '#6b7280' 
            }}>
              Personaliza la vista de tus publicaciones
            </Typography>
          </Box>

          {/* Filter Options */}
          {FILTER_OPTIONS.map((option, index) => {
            const isActive = activeFilters.includes(option.id);
            
            return (
              <MenuItem
                key={option.id}
                onClick={() => handleFilterSelect(option.id)}
                sx={{
                  borderRadius: '8px',
                  margin: '2px 0',
                  padding: '12px 16px',
                  backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                  border: isActive ? '1px solid #bfdbfe' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive ? '#e0f2fe' : '#f8fafc',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  {/* Icon */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: isActive ? '#3b82f6' : '#f3f4f6',
                    color: isActive ? 'white' : '#6b7280',
                    transition: 'all 0.2s ease-in-out'
                  }}>
                    {React.cloneElement(option.icon as React.ReactElement, {
                      sx: { 
                        fontSize: '16px', 
                        color: isActive ? 'white' : '#6b7280'
                      }
                    })}
                  </Box>
                  
                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '2px' }}>
                      <Typography sx={{ 
                        fontSize: '14px', 
                        fontWeight: '600',
                        color: isActive ? '#1e40af' : '#374151'
                      }}>
                        {option.label}
                      </Typography>
                      {option.count !== undefined && (
                        <Chip
                          label={option.count}
                          size="small"
                          sx={{
                            height: '18px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: isActive ? '#1e40af' : '#f3f4f6',
                            color: isActive ? 'white' : '#6b7280',
                            '& .MuiChip-label': {
                              padding: '0 6px'
                            }
                          }}
                        />
                      )}
                    </Box>
                    <Typography sx={{ 
                      fontSize: '12px', 
                      color: '#6b7280',
                      lineHeight: 1.3
                    }}>
                      {option.description}
                    </Typography>
                  </Box>

                  {/* Active indicator */}
                  {isActive && (
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
            );
          })}

          {/* Clear filters */}
          {hasActiveFilters && (
            <>
              <Divider sx={{ margin: '8px 0' }} />
              <MenuItem
                onClick={() => handleFilterSelect('all')}
                sx={{
                  borderRadius: '8px',
                  margin: '2px 0',
                  padding: '8px 16px',
                  color: '#ef4444',
                  '&:hover': {
                    backgroundColor: '#fef2f2',
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#ef4444', minWidth: '36px' }}>
                  <ClearIcon sx={{ fontSize: '16px' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Limpiar filtros"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '14px',
                      fontWeight: '500'
                    }
                  }}
                />
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
