"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  IconEdit,
  IconTrash,
  IconClock,
  IconMapPin,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EventType } from "./types";

interface CalendarEventDialogProps {
  open: boolean;
  event: EventType | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (eventId: string) => void;
}

const CalendarEventDialog: React.FC<CalendarEventDialogProps> = ({
  open,
  event,
  onClose,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();

  if (!event) return null;

  // Colores de eventos
  const getEventColor = (color: string) => {
    switch (color) {
      case "default":
        return theme.palette.primary.main;
      case "green":
        return theme.palette.success.main;
      case "red":
        return theme.palette.error.main;
      case "azure":
        return theme.palette.info.main;
      case "warning":
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const eventColor = getEventColor(event.color || "default");

  // Formatear fecha y hora
  const formatEventDateTime = () => {
    if (!event.start) return "";
    
    const startDate = new Date(event.start);
    const endDate = event.end ? new Date(event.end) : startDate;
    
    const startFormatted = format(startDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
    const startTime = format(startDate, "HH:mm", { locale: es });
    
    if (event.allDay) {
      if (event.end && !isSameDay(startDate, endDate)) {
        const endFormatted = format(endDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
        return `${startFormatted} - ${endFormatted}`;
      }
      return startFormatted;
    }
    
    const endTime = format(endDate, "HH:mm", { locale: es });
    return `${startFormatted} • ${startTime} - ${endTime}`;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      {/* Header del diálogo */}
      <DialogTitle sx={{ 
        pb: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: eventColor,
            }}
          />
          <Typography variant="h6" fontWeight={600}>
            Detalles del Evento
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Título del evento */}
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          {event.title}
        </Typography>

        {/* Información del evento */}
        <Stack spacing={2}>
          {/* Fecha y hora */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconClock size={18} color={theme.palette.text.secondary} />
            <Typography variant="body2" color="textSecondary">
              {formatEventDateTime()}
            </Typography>
          </Box>

          {/* Ubicación */}
          {event.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconMapPin size={18} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="textSecondary">
                {event.location}
              </Typography>
            </Box>
          )}

          {/* Participantes */}
          {event.participants && event.participants.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconUser size={18} color={theme.palette.text.secondary} />
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                  Participantes:
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                  {event.participants.map((participant, index) => (
                    <Chip
                      key={index}
                      label={participant}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          )}

          {/* Descripción */}
          {event.description && (
            <>
              <Divider />
              <Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  Descripción
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
              </Box>
            </>
          )}

          {/* Color del evento */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Color del evento
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: eventColor,
                }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                {event.color || 'default'}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      {/* Acciones del diálogo */}
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button 
          onClick={onClose} 
          color="inherit"
        >
          Cerrar
        </Button>
        
        <Button
          onClick={onEdit}
          variant="outlined"
          startIcon={<IconEdit size={16} />}
        >
          Editar
        </Button>
        
        <Button
          onClick={() => event.id && onDelete(event.id)}
          variant="contained"
          color="error"
          startIcon={<IconTrash size={16} />}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarEventDialog; 