"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconCalendar,
  IconDragDrop,
} from "@tabler/icons-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachWeekOfInterval, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import "./Calendar.css";
import { CalendarEvent, CalendarEventDialog, CalendarEventForm, defaultEvents, EventType } from "./CalendarIndex";

const Calendar = () => {
  const theme = useTheme();
  const customizer = useSelector((state: AppState) => state.customizer);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventType[]>(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<EventType | null>(null);
  const [dragTargetDate, setDragTargetDate] = useState<Date | null>(null);

  // Calcular fechas del calendario
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Agrupar días por semanas
  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
  }, [currentDate]);

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtener eventos para un día específico
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      if (!event.start) return false;
      const eventStart = new Date(event.start);
      const eventEnd = event.end ? new Date(event.end) : eventStart;
      
      return eventStart <= date && eventEnd >= date;
    });
  };

  // Manejo de eventos
  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleAddEvent = (date?: Date) => {
    setSelectedEvent({
      title: "",
      start: date || new Date(),
      end: date ? addDays(date, 1) : addDays(new Date(), 1),
      color: "default",
      allDay: false,
    });
    setIsFormDialogOpen(true);
  };

  const handleSaveEvent = (eventData: EventType) => {
    if (selectedEvent && selectedEvent.id) {
      // Actualizar evento existente
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id ? { ...eventData, id: event.id } : event
      ));
    } else {
      // Crear nuevo evento
      const newEvent = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsFormDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = () => {
    setIsEventDialogOpen(false);
    setIsFormDialogOpen(true);
  };

  // Funcionalidad de arrastrar para reprogramar
  const handleDragStart = (event: EventType) => {
    setDraggedEvent(event);
  };

  const handleDragOver = (date: Date) => {
    setDragTargetDate(date);
  };

  const handleDrop = (targetDate: Date) => {
    if (draggedEvent) {
      const eventStart = new Date(draggedEvent.start!);
      const eventEnd = draggedEvent.end ? new Date(draggedEvent.end) : eventStart;
      const duration = eventEnd.getTime() - eventStart.getTime();
      
      const newStart = new Date(targetDate);
      const newEnd = new Date(newStart.getTime() + duration);
      
      setEvents(prev => prev.map(event => 
        event.id === draggedEvent.id 
          ? { ...event, start: newStart, end: newEnd }
          : event
      ));
    }
    setDraggedEvent(null);
    setDragTargetDate(null);
  };

  const handleDragEnd = () => {
    setDraggedEvent(null);
    setDragTargetDate(null);
  };

  // Nombres de los días de la semana
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <Card
      sx={{ 
        padding: 0, 
        border: !customizer.isCardShadow ? `1px solid ${theme.palette.divider}` : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {/* Header del calendario */}
      <CardContent sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconCalendar size={24} color={theme.palette.primary.main} />
            <Typography variant="h5" fontWeight={600}>
              Calendario
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Mes anterior">
              <IconButton onClick={goToPreviousMonth} size="small">
                <IconChevronLeft size={20} />
              </IconButton>
            </Tooltip>
            
            <Typography variant="h6" sx={{ minWidth: 150, textAlign: 'center' }}>
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </Typography>
            
            <Tooltip title="Mes siguiente">
              <IconButton onClick={goToNextMonth} size="small">
                <IconChevronRight size={20} />
              </IconButton>
            </Tooltip>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <Tooltip title="Ir a hoy">
              <IconButton onClick={goToToday} size="small">
                <Typography variant="body2" fontWeight={600}>
                  Hoy
                </Typography>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Agregar evento">
              <IconButton 
                onClick={() => handleAddEvent()} 
                size="small"
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white',
                  '&:hover': { bgcolor: theme.palette.primary.dark }
                }}
              >
                <IconPlus size={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Indicador de funcionalidad de arrastrar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <IconDragDrop size={16} color={theme.palette.info.main} />
          <Typography variant="caption" color="textSecondary">
            Arrastra los eventos para reprogramarlos
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      {/* Calendario */}
      <CardContent sx={{ p: 0, flex: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Encabezados de días */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.default
          }}>
            {dayNames.map((day, index) => (
              <Box
                key={day}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRight: index < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                  bgcolor: theme.palette.background.paper
                }}
              >
                <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
                  {day}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Días del calendario */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              minHeight: '100%'
            }}>
              {calendarDays.map((day, index) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date());
                const dayEvents = getEventsForDay(day);
                const isDragTarget = dragTargetDate && isSameDay(day, dragTargetDate);

                return (
                  <Box
                    key={day.toISOString()}
                    sx={{
                      minHeight: 120,
                      borderRight: index % 7 < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      bgcolor: isDragTarget 
                        ? theme.palette.action.hover 
                        : isToday 
                          ? theme.palette.primary.light + '20'
                          : isCurrentMonth 
                            ? theme.palette.background.paper 
                            : theme.palette.action.disabledBackground,
                      position: 'relative',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: theme.palette.action.hover
                      }
                    }}
                    onClick={() => handleAddEvent(day)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      handleDragOver(day);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleDrop(day);
                    }}
                  >
                    {/* Número del día */}
                    <Box sx={{ p: 1, textAlign: 'right' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: isToday ? 700 : 400,
                          color: isToday 
                            ? theme.palette.primary.main 
                            : isCurrentMonth 
                              ? theme.palette.text.primary 
                              : theme.palette.text.disabled,
                          fontSize: '0.875rem'
                        }}
                      >
                        {format(day, 'd')}
                      </Typography>
                    </Box>

                    {/* Eventos del día */}
                    <Box sx={{ px: 0.5, pb: 0.5 }}>
                      {dayEvents.slice(0, 3).map((event) => (
                        <CalendarEvent
                          key={event.id}
                          event={event}
                          onClick={() => handleEventClick(event)}
                          onDragStart={() => handleDragStart(event)}
                          onDragEnd={handleDragEnd}
                        />
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <Typography variant="caption" color="textSecondary" sx={{ px: 1 }}>
                          +{dayEvents.length - 3} más
                        </Typography>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Diálogos */}
      <CalendarEventDialog
        open={isEventDialogOpen}
        event={selectedEvent}
        onClose={() => setIsEventDialogOpen(false)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <CalendarEventForm
        open={isFormDialogOpen}
        event={selectedEvent}
        onClose={() => {
          setIsFormDialogOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleSaveEvent}
      />
    </Card>
  );
};

export default Calendar; 