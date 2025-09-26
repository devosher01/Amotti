'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  alpha,
  useTheme,
  Popover,
  Stack,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  IconSearch,
  IconFilter,
  IconDots,
  IconCalendar,
  IconFileImport,
  IconFileExport,
  IconEye,
  IconBell,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ListHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
  onCreatePost: () => void;
  onImportCSV?: () => void;
  onExportCSV?: () => void;
  onPreviewFeed?: () => void;
  onNotifications?: () => void;
  dateRange?: {
    start: Date;
    end: Date;
  };
  onDateRangeChange?: (start: Date, end: Date) => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
  onCreatePost,
  onImportCSV,
  onExportCSV,
  onPreviewFeed,
  onNotifications,
  dateRange,
  onDateRangeChange,
}) => {
  const theme = useTheme();
  const [actionsAnchor, setActionsAnchor] = useState<null | HTMLElement>(null);
  const [dateAnchor, setDateAnchor] = useState<null | HTMLElement>(null);

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionsAnchor(event.currentTarget);
  };

  const handleActionsClose = () => {
    setActionsAnchor(null);
  };

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchor(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateAnchor(null);
  };

  const formatDateRange = () => {
    if (!dateRange) return 'Seleccionar fechas';
    
    const startFormatted = format(dateRange.start, 'd MMM yyyy', { locale: es });
    const endFormatted = format(dateRange.end, 'd MMM yyyy', { locale: es });
    
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`,
        mb: 3,
      }}
    >
      {/* Búsqueda */}
      <TextField
        size="small"
        placeholder="Buscar"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size={18} />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: 300,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            '&:hover': {
              backgroundColor: theme.palette.background.default,
            },
            '&.Mui-focused': {
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />

      {/* Selector de fechas */}
      <Button
        variant="outlined"
        size="small"
        startIcon={<IconCalendar size={16} />}
        endIcon={<IconChevronDown size={16} />}
        onClick={handleDateClick}
        sx={{
          borderColor: alpha(theme.palette.primary.main, 0.2),
          color: theme.palette.primary.main,
          fontWeight: 500,
          borderRadius: '8px',
          textTransform: 'none',
          minWidth: 200,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
        }}
      >
        {formatDateRange()}
      </Button>

      {/* Filtros */}
      <IconButton
        size="small"
        onClick={onFilterClick}
        sx={{
          borderRadius: '8px',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <IconFilter size={18} />
      </IconButton>

      {/* Espaciador */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Acciones en bloque */}
      <Button
        variant="outlined"
        size="small"
        disabled
        sx={{
          borderColor: alpha(theme.palette.text.secondary, 0.2),
          color: theme.palette.text.secondary,
          textTransform: 'none',
          borderRadius: '8px',
        }}
      >
        Acciones en bloque
      </Button>

      {/* Menú de acciones */}
      <IconButton
        size="small"
        onClick={handleActionsClick}
        sx={{
          borderRadius: '8px',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <IconDots size={18} />
      </IconButton>

      {/* Crear publicación */}
      <Button
        variant="contained"
        size="small"
        startIcon={<IconPlus size={16} />}
        onClick={onCreatePost}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          fontWeight: 600,
          borderRadius: '8px',
          textTransform: 'none',
          px: 3,
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          },
        }}
      >
        Crear publicación
      </Button>

      {/* Popover de fechas */}
      <Popover
        open={Boolean(dateAnchor)}
        anchorEl={dateAnchor}
        onClose={handleDateClose}
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
            mt: 1,
            p: 2,
            minWidth: 250,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            Filtrar por fecha
          </Typography>
          <MenuItem onClick={() => handleDateClose()}>Última semana</MenuItem>
          <MenuItem onClick={() => handleDateClose()}>Mes actual</MenuItem>
          <MenuItem onClick={() => handleDateClose()}>Últimos 30 días</MenuItem>
          <MenuItem onClick={() => handleDateClose()}>Mes pasado</MenuItem>
          <MenuItem onClick={() => handleDateClose()}>Últimos 3 meses</MenuItem>
        </Stack>
      </Popover>

      {/* Menú de acciones */}
      <Menu
        anchorEl={actionsAnchor}
        open={Boolean(actionsAnchor)}
        onClose={handleActionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
        }}
      >
        <MenuItem onClick={() => { onImportCSV?.(); handleActionsClose(); }}>
          <ListItemIcon>
            <IconFileImport size={16} />
          </ListItemIcon>
          <ListItemText>Importar CSV</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => { onExportCSV?.(); handleActionsClose(); }}>
          <ListItemIcon>
            <IconFileExport size={16} color={theme.palette.warning.main} />
          </ListItemIcon>
          <ListItemText>Exportar CSV</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => { onPreviewFeed?.(); handleActionsClose(); }}>
          <ListItemIcon>
            <IconEye size={16} />
          </ListItemIcon>
          <ListItemText>Previsualizar feed</ListItemText>
        </MenuItem>
        
        <Divider sx={{ my: 0.5 }} />
        
        <MenuItem onClick={() => { onNotifications?.(); handleActionsClose(); }}>
          <ListItemIcon>
            <IconBell size={16} />
          </ListItemIcon>
          <ListItemText>Notificaciones</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};