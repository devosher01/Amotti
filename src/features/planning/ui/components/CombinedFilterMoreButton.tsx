/**
 * Combined Filter and More Button - Split button with filter menu and additional options
 */

'use client';

import React, { useState } from 'react';
import { 
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  CalendarViewMonth as CalendarIcon,
  Notifications as NotificationsIcon,
  FileDownload as ImportIcon,
  FileUpload as ExportIcon,
  ChevronRight as ChevronRightIcon,
  // Social Media Icons
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Pinterest as PinterestIcon,
  // Status Icons
  CheckCircle as PublishedIcon,
  Schedule as PendingIcon,
  EditNote as DraftIcon,
  Error as ErrorIcon,
  AutoAwesome as AutoListIcon,
  Close as CancelIcon,
  Sync as ProcessingIcon,
  CheckCircleOutline as PartialSuccessIcon,
  // Notes Icons
  Description as DocumentIcon,
  Visibility as ReadIcon,
  VisibilityOff as UnreadIcon,
  // View Icons
  ViewModule as MonthIcon,
  ViewWeek as WeekIcon,
  ViewDay as DayIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as ExpandIcon
} from '@mui/icons-material';
import { useCalendarFilterStore } from '../store/calendarFilterStore';

interface CombinedFilterMoreButtonProps {
  onFilterChange?: (filterId: string) => void;
  activeFilters?: string[];
  onViewChange?: (view: 'month' | 'week' | 'day') => void;
}

// Social Media Options
const SOCIAL_PLATFORMS = [
  { id: 'twitter', label: 'Twitter', icon: <TwitterIcon />, enabled: false },
  { id: 'bluesky', label: 'Bluesky', icon: <SearchIcon />, enabled: false },
  { id: 'facebook', label: 'Facebook', icon: <FacebookIcon />, enabled: true },
  { id: 'instagram', label: 'Instagram', icon: <InstagramIcon />, enabled: true },
  { id: 'threads', label: 'Threads', icon: <SearchIcon />, enabled: false },
  { id: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon />, enabled: false },
  { id: 'google-business', label: 'Google Business Profile', icon: <SearchIcon />, enabled: false },
  { id: 'pinterest', label: 'Pinterest', icon: <PinterestIcon />, enabled: false },
  { id: 'tiktok', label: 'TikTok', icon: <SearchIcon />, enabled: false },
  { id: 'youtube', label: 'YouTube', icon: <YouTubeIcon />, enabled: false }
];

// Publication Status Options
const PUBLICATION_STATUS = [
    { id: 'draft', label: 'Borrador', icon: <DraftIcon />, color: 'rgb(158, 158, 158)' },
    { id: 'scheduled', label: 'Programada', icon: <PendingIcon />, color: 'rgb(33, 150, 243)' },
    { id: 'processing', label: 'Procesando', icon: <ProcessingIcon />, color: 'rgb(255, 152, 0)' },
    { id: 'published', label: 'Publicada', icon: <PublishedIcon />, color: 'rgb(76, 175, 80)' },
    { id: 'failed', label: 'Falló', icon: <ErrorIcon />, color: 'rgb(244, 67, 54)' },
    { id: 'partial_success', label: 'Éxito parcial', icon: <PartialSuccessIcon />, color: 'rgb(255, 109, 0)' },
    { id: 'cancelled', label: 'Cancelada', icon: <CancelIcon />, color: 'rgb(117, 117, 117)' }
];

// Notes Options
const NOTES_OPTIONS = [
  { id: 'no-notes', label: 'Sin notas', enabled: true },
  { id: 'read', label: 'Leídas', enabled: true },
  { id: 'unread', label: 'Sin leer', enabled: true }
];

export const CombinedFilterMoreButton: React.FC<CombinedFilterMoreButtonProps> = ({
  onFilterChange,
  activeFilters = [],
  onViewChange
}) => {
  const { 
    currentView, 
    zoomLevel, 
    setCurrentView, 
    setZoomLevel,
    toggleFilter,
    hasActiveFilters: storeHasActiveFilters
  } = useCalendarFilterStore();
  
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);
  const [zoomAnchor, setZoomAnchor] = useState<null | HTMLElement>(null);
  const [viewAnchor, setViewAnchor] = useState<null | HTMLElement>(null);
  const [socialAnchor, setSocialAnchor] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleMoreClose = () => {
    setMoreAnchor(null);
  };

  const handleZoomClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setZoomAnchor(event.currentTarget);
  };

  const handleViewClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setViewAnchor(event.currentTarget);
  };

  const handleSocialClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSocialAnchor(event.currentTarget);
  };

  const handleZoomClose = () => {
    setZoomAnchor(null);
  };

  const handleViewClose = () => {
    setViewAnchor(null);
  };

  const handleSocialClose = () => {
    setSocialAnchor(null);
  };

  // Use store's hasActiveFilters or fallback to local logic
  const hasFilters = storeHasActiveFilters() || activeFilters.length > 0;

  return (
    <>
      {/* Combined Button */}
      <Box sx={{ 
        display: 'flex', 
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {/* Filter Button (Left Side) */}
        <IconButton
          onClick={handleFilterClick}
          size="small"
          sx={{
            borderRadius: '0',
            borderRight: '1px solid #e5e7eb',
            color: hasFilters ? '#1f2937' : '#6b7280',
            backgroundColor: hasFilters ? '#f3f4f6' : 'transparent',
            '&:hover': {
              backgroundColor: '#f3f4f6',
            },
            position: 'relative',
            paddingX: '10px'
          }}
        >
          <FilterIcon sx={{ fontSize: '18px' }} />
          {hasFilters && (
            <Box sx={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#ef4444'
            }} />
          )}
        </IconButton>

        {/* More Button (Right Side) */}
        <IconButton
          onClick={handleMoreClick}
          size="small"
          sx={{
            borderRadius: '0',
            color: '#6b7280',
            '&:hover': {
              backgroundColor: '#f3f4f6',
            },
            paddingX: '10px'
          }}
        >
          <MoreIcon sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '720px',
            maxHeight: '600px',
            width: '720px'
          }
        }}
      >
        <MenuList sx={{ padding: '16px' }}>
          {/* FILA 1: Action Buttons - Arriba */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            marginBottom: '20px',
            justifyContent: 'flex-end'
          }}>
            <Box sx={{ 
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              '&:hover': { backgroundColor: '#f9fafb', borderColor: '#d1d5db' }
            }}>
              Limpiar
            </Box>
            <Box sx={{ 
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#1f2937',
              color: 'white',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              '&:hover': { backgroundColor: '#111827' }
            }}>
              Aplicar
            </Box>
          </Box>

          {/* FILA 2: 3 Columnas - Abajo */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 3,
            alignItems: 'start'
          }}>
            
            {/* COLUMNA 1: RR.SS. */}
            <Box>
              <Typography sx={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                RR.SS.
              </Typography>
              
              {SOCIAL_PLATFORMS.map((platform) => (
                <Box key={platform.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  opacity: platform.enabled ? 1 : 0.5
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {React.cloneElement(platform.icon, { 
                      sx: { fontSize: '16px', color: '#6b7280' } 
                    })}
                    <Typography sx={{ fontSize: '12px', color: '#374151' }}>
                      {platform.label}
                    </Typography>
                  </Box>
                  <Switch 
                    size="small" 
                    checked={true}
                    disabled={!platform.enabled}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: platform.enabled ? '#1f2937' : '#d1d5db',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: platform.enabled ? '#1f2937' : '#d1d5db',
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* COLUMNA 2: Estado de publicación */}
            <Box>
              <Typography sx={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                Estado de publicación
              </Typography>
              
              {PUBLICATION_STATUS.map((status) => (
                <Box key={status.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '4px 0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: status.color
                    }} />
                    <Typography sx={{ fontSize: '12px', color: '#374151' }}>
                      {status.label}
                    </Typography>
                  </Box>
                  <Switch 
                    size="small" 
                    checked={true}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1f2937',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#1f2937',
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* COLUMNA 3: Notas */}
            <Box>
              <Typography sx={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                Notas
              </Typography>
              
              {NOTES_OPTIONS.map((note) => (
                <Box key={note.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '4px 0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280'
                    }}>
                      {note.id === 'no-notes' && <DocumentIcon sx={{ fontSize: '16px' }} />}
                      {note.id === 'read' && <ReadIcon sx={{ fontSize: '16px' }} />}
                      {note.id === 'unread' && <UnreadIcon sx={{ fontSize: '16px' }} />}
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: '#374151' }}>
                      {note.label}
                    </Typography>
                  </Box>
                  <Switch 
                    size="small" 
                    checked={true}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1f2937',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#1f2937',
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>

          </Box>
        </MenuList>
      </Menu>

      {/* More Options Menu */}
      <Menu
        anchorEl={moreAnchor}
        open={Boolean(moreAnchor)}
        onClose={handleMoreClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '220px'
          }
        }}
      >
        <MenuList sx={{ padding: '8px' }}>
          {/* Zoom del calendario - HABILITADO con submenú */}
          <MenuItem 
            onClick={handleZoomClick} 
            sx={{ 
              borderRadius: '8px', 
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon sx={{ color: '#6b7280', minWidth: '36px' }}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Zoom del calendario"
                sx={{ '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: '500' } }}
              />
            </Box>
            <ChevronRightIcon sx={{ color: '#6b7280', fontSize: '16px' }} />
          </MenuItem>

          {/* Vista del calendario - HABILITADO con submenú */}
          <MenuItem 
            onClick={handleViewClick} 
            sx={{ 
              borderRadius: '8px', 
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon sx={{ color: '#6b7280', minWidth: '36px' }}>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Vista del calendario"
                sx={{ '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: '500' } }}
              />
            </Box>
            <ChevronRightIcon sx={{ color: '#6b7280', fontSize: '16px' }} />
          </MenuItem>

          {/* Calendarios sociales - DESHABILITADO pero con flecha */}
          <MenuItem 
            sx={{ 
              borderRadius: '8px', 
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 0.5,
              cursor: 'not-allowed'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon sx={{ color: '#6b7280', minWidth: '36px' }}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Calendarios sociales"
                sx={{ '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: '500' } }}
              />
            </Box>
            <ChevronRightIcon sx={{ color: '#6b7280', fontSize: '16px' }} />
          </MenuItem>

          <Divider sx={{ margin: '8px 0' }} />

          {/* Importar CSV - DESHABILITADO */}
          <MenuItem 
            sx={{ 
              borderRadius: '8px', 
              padding: '12px 16px',
              opacity: 0.5,
              cursor: 'not-allowed'
            }}
          >
            <ListItemIcon sx={{ color: '#6b7280', minWidth: '36px' }}>
              <ImportIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Importar CSV"
              sx={{ '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: '500' } }}
            />
          </MenuItem>

          {/* Exportar CSV - DESHABILITADO */}
          <MenuItem 
            sx={{ 
              borderRadius: '8px', 
              padding: '12px 16px',
              opacity: 0.5,
              cursor: 'not-allowed'
            }}
          >
            <ListItemIcon sx={{ color: '#f59e0b', minWidth: '36px' }}>
              <ExportIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Exportar CSV"
              sx={{ '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: '500', color: '#f59e0b' } }}
            />
          </MenuItem>

          <Divider sx={{ margin: '8px 0' }} />

          {/* Notificaciones - DESHABILITADO */}
          <MenuItem 
            sx={{ 
              borderRadius: '8px', 
              padding: '12px 16px',
              opacity: 0.5,
              cursor: 'not-allowed'
            }}
          >
            <ListItemIcon sx={{ color: '#6b7280', minWidth: '36px' }}>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Notificaciones"
              sx={{ '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: '500' } }}
            />
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Zoom Submenu */}
      <Menu
        anchorEl={zoomAnchor}
        open={Boolean(zoomAnchor)}
        onClose={handleZoomClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
            minWidth: '160px'
          }
        }}
      >
        <MenuList sx={{ padding: '8px' }}>
          <MenuItem 
            onClick={() => {
              setZoomLevel('condensada');
              handleZoomClose();
            }} 
            sx={{ 
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: zoomLevel === 'condensada' ? '#f3f4f6' : 'transparent',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <ZoomOutIcon sx={{ fontSize: '16px', marginRight: '8px', color: '#6b7280' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Condensada</Typography>
          </MenuItem>
          <MenuItem 
            onClick={() => {
              setZoomLevel('normal');
              handleZoomClose();
            }} 
            sx={{ 
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: zoomLevel === 'normal' ? '#f3f4f6' : 'transparent',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <Box sx={{ width: '16px', height: '16px', marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%' }} />
            </Box>
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Normal</Typography>
          </MenuItem>
          <MenuItem 
            onClick={() => {
              setZoomLevel('expandida');
              handleZoomClose();
            }} 
            sx={{ 
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: zoomLevel === 'expandida' ? '#f3f4f6' : 'transparent',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <ZoomInIcon sx={{ fontSize: '16px', marginRight: '8px', color: '#6b7280' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Expandida</Typography>
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Vista del calendario Submenu */}
      <Menu
        anchorEl={viewAnchor}
        open={Boolean(viewAnchor)}
        onClose={handleViewClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
            minWidth: '160px'
          }
        }}
      >
        <MenuList sx={{ padding: '8px' }}>
          <MenuItem 
            onClick={() => {
              console.log('🔄 Changing view to day');
              setCurrentView('day');
              onViewChange?.('day');
              handleViewClose();
            }} 
            sx={{ 
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: currentView === 'day' ? '#f3f4f6' : 'transparent',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <DayIcon sx={{ fontSize: '16px', marginRight: '8px', color: '#6b7280' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Día</Typography>
          </MenuItem>
          <MenuItem 
            onClick={() => {
              console.log('🔄 Changing view to week');
              setCurrentView('week');
              onViewChange?.('week');
              handleViewClose();
            }} 
            sx={{ 
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: currentView === 'week' ? '#f3f4f6' : 'transparent',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <WeekIcon sx={{ fontSize: '16px', marginRight: '8px', color: '#6b7280' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Semana</Typography>
          </MenuItem>
          <MenuItem 
            onClick={() => {
              console.log('🔄 Changing view to month');
              setCurrentView('month');
              onViewChange?.('month');
              handleViewClose();
            }} 
            sx={{ 
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: currentView === 'month' ? '#f3f4f6' : 'transparent',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <MonthIcon sx={{ fontSize: '16px', marginRight: '8px', color: '#6b7280' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Mes</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
