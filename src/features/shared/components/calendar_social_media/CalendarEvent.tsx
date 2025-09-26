"use client";

import React from "react";
import {
  Box,
  Typography,
  Chip,
  useTheme,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EventType } from "./types";

interface CalendarEventProps {
  event: EventType;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
  onClick,
  onDragStart,
  onDragEnd,
}) => {
  const theme = useTheme();

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

  // Formatear hora del evento
  const formatEventTime = () => {
    if (!event.start) return "";
    
    if (event.allDay) {
      return "Todo el día";
    }
    
    const startTime = format(new Date(event.start), "HH:mm", { locale: es });
    
    if (event.end) {
      const endTime = format(new Date(event.end), "HH:mm", { locale: es });
      return `${startTime} - ${endTime}`;
    }
    
    return startTime;
  };

  // Formatear duración del evento
  const formatEventDuration = () => {
    if (!event.start || event.allDay) return "";
    
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : start;
    const durationMs = end.getTime() - start.getTime();
    const durationHours = Math.round(durationMs / (1000 * 60 * 60));
    
    if (durationHours < 1) {
      const durationMinutes = Math.round(durationMs / (1000 * 60));
      return `${durationMinutes} min`;
    }
    
    return `${durationHours}h`;
  };

  return (
    <Tooltip 
      title={
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {event.title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatEventTime()}
          </Typography>
          {event.description && (
            <Typography variant="caption" display="block" color="textSecondary">
              {event.description}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <Box
        sx={{
          p: 0.5,
          mb: 0.5,
          borderRadius: 1,
          bgcolor: eventColor + '15',
          border: `1px solid ${eventColor}30`,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: eventColor + '25',
            borderColor: eventColor + '50',
            transform: 'translateY(-1px)',
            boxShadow: `0 2px 8px ${eventColor}20`,
          },
          '&:active': {
            transform: 'translateY(0)',
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          onDragStart();
          // Establecer datos de arrastre
          e.dataTransfer.setData('text/plain', event.id || '');
          e.dataTransfer.effectAllowed = 'move';
        }}
        onDragEnd={(e) => {
          e.stopPropagation();
          onDragEnd();
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Indicador de color */}
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              bgcolor: eventColor,
              flexShrink: 0,
            }}
          />
          
          {/* Contenido del evento */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: eventColor,
                fontSize: '0.7rem',
                lineHeight: 1.2,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.title}
            </Typography>
            
            {!event.allDay && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.65rem',
                  display: 'block',
                }}
              >
                {formatEventTime()}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default CalendarEvent; 