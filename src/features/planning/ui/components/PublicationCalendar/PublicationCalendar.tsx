
'use client';

import React, { useMemo, forwardRef, useCallback, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import luxonPlugin from '@fullcalendar/luxon3';
import { getCalendarThemeStyles } from '../../styles/CalendarTheme';
import { useTimezoneStore } from '../../store/timezoneStore';
import { useCalendarFilterStore } from '../../store/calendarFilterStore';
import { CalendarEventRenderer } from '../CalendarEventRenderer';
import { CalendarTooltip } from '../CalendarTooltip';
import { CalendarLoadingOverlay } from '../CalendarLoadingOverlay';
import { usePublicationsEventSource, useCalendarViewSync } from '../../../../publications/ui/hooks/usePublicationsEventSource';
import { usePublicationsFiltersStore } from '../../store/publicationsFilters.store';
import { useCalendarEventHandlers } from '../../hooks/useCalendarEventHandlers';


interface PublicationCalendarProps {
  onEventClick?: (info: any) => void;
  onDateSelect?: (info: any) => void;
  onEventDrop?: (info: any) => void;
  onEventResize?: (info: any) => void;
  onLoading?: (isLoading: boolean) => void;
  height?: string | number;
  isDark?: boolean;
  className?: string;
}

export const PublicationCalendar = forwardRef<FullCalendar, PublicationCalendarProps>(({
  onEventClick,
  onDateSelect,
  onEventDrop,
  onEventResize,
  onLoading,
  height = 'auto',
  isDark = false,
  className,
}, ref) => {
  const theme = useTheme();
  const fullCalendarRef = useRef<FullCalendar | null>(null);
  const calendarRefSet = useRef<boolean>(false);
  const [isLoadingPublications, setIsLoadingPublications] = useState(false);
  
  const { currentTimezone, getFullCalendarTimezone, setCalendarRef } = useTimezoneStore();
  const { zoomLevel } = useCalendarFilterStore();
  const { filters } = usePublicationsFiltersStore();
  const themeStyles = useMemo(() => getCalendarThemeStyles(theme), [theme]);
  
  const eventSource = usePublicationsEventSource();
  const { handleViewDidMount, handleDateChange } = useCalendarViewSync();
  
  const { handleEventDrop: internalHandleEventDrop, isUpdating, error } = useCalendarEventHandlers();

  const zoomConfig = useMemo(() => {
    const fixedCalendarHeight = typeof window !== 'undefined' 
      ? Math.min(window.innerHeight * 0.8, 900) 
      : 900;
    
    switch (zoomLevel) {
      case 'condensada':
        return {
          slotDuration: "01:00:00",
          slotLabelInterval: "01:00:00",
          snapDuration: "01:00:00",
          containerHeight: `${fixedCalendarHeight}px`,
          scrollTime: "08:00:00",
          description: "Solo horas (0:00, 1:00, 2:00...)"
        };
      case 'normal':
        return {
          slotDuration: "00:30:00",
          slotLabelInterval: "01:00:00",
          snapDuration: "00:15:00",
          containerHeight: `${fixedCalendarHeight}px`,
          scrollTime: "06:00:00",
          description: "Media hora (0:00, 0:30, 1:00, 1:30...)"
        };
      case 'expandida':
        return {
          slotDuration: "00:20:00",
          slotLabelInterval: "01:00:00",
          snapDuration: "00:10:00",
          containerHeight: `${fixedCalendarHeight}px`,
          scrollTime: "04:00:00",
          description: "20 minutos (0:00, 0:20, 0:40, 1:00...)"
        };
      default:
        return {
          slotDuration: "00:30:00",
          slotLabelInterval: "01:00:00",
          snapDuration: "00:15:00",
          containerHeight: `${fixedCalendarHeight}px`, 
          scrollTime: "06:00:00",
          description: "Normal"
        };
    }
  }, [zoomLevel]);
  
  const fullCalendarTimezone = useMemo(() => getFullCalendarTimezone(), [currentTimezone, getFullCalendarTimezone]);

  React.useEffect(() => {
    console.log('🔍 Zoom level changed:', {
      level: zoomLevel,
      config: zoomConfig,
      description: zoomConfig.description
    });
  }, [zoomLevel, zoomConfig]);

  const handleCalendarRef = useCallback((calendar: FullCalendar | null) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(calendar);
      } else {
        ref.current = calendar;
      }
    }
    if (calendar && !calendarRefSet.current) {
      fullCalendarRef.current = calendar;
      setCalendarRef(calendar.getApi());
      calendarRefSet.current = true;
    }
  }, [ref]);

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setIsLoadingPublications(isLoading);
    onLoading?.(isLoading);
    
    console.log('📅 Publications loading state:', isLoading);
  }, [onLoading]);

  const handleEventMouseEnter = useCallback((info: any) => {
    CalendarTooltip.showTooltip(info);
  }, []);

  const handleEventMouseLeave = useCallback((info: any) => {
    CalendarTooltip.hideTooltip(info);
  }, []);

  const handleEventDidMount = useCallback((info: any) => {
    const { event } = info;
    info.el.setAttribute('aria-label', `${event.title} - ${event.start?.toDateString()}`);
    info.el.setAttribute('role', 'button');
    info.el.setAttribute('tabindex', '0');
  }, []);

  // 🎯 Handler combinado: usa nuestro hook interno + callback externo opcional
  const handleCombinedEventDrop = useCallback(async (info: any) => {
    console.log('🎯 handleCombinedEventDrop called!', info);
    
    // Primero ejecutar nuestro handler interno (update + refetch)
    await internalHandleEventDrop(info);
    
    // Luego ejecutar callback externo si existe
    if (onEventDrop) {
      console.log('🎯 Calling external onEventDrop');
      onEventDrop(info);
    }
  }, [internalHandleEventDrop, onEventDrop]);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        position: 'relative',
        height: zoomConfig.containerHeight,
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        '& .fc': { 
          height: '100%',
        },
        '& .fc .fc-scroller': {
          overflow: 'auto !important',
          maxHeight: '100%',
        },
        '& .fc .fc-view-harness': {
          height: '100% !important',
        },
        ...themeStyles,
      }}
      className={className}
    >
      <CalendarLoadingOverlay 
        show={isLoadingPublications}
        message="Cargando publicaciones..."
        subMessage={`Obteniendo datos del ${filters.view === 'month' ? 'mes' : filters.view === 'week' ? 'semana' : 'día'}`}
      />
      
      <FullCalendar
        key={`calendar-${zoomLevel}`}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, luxonPlugin]}
        headerToolbar={false}
        initialView='timeGridWeek'
        timeZone={fullCalendarTimezone}
        locale="es"
        firstDay={1}
        lazyFetching={true}
        nowIndicator={true}
        now={new Date()}
        editable={true}
        weekends={true}
        selectable={false}
        selectMirror={false}
        navLinks={true}
        buttonText={{ today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día' }}
        eventStartEditable={true}
        eventDurationEditable={false}
        eventResizableFromStart={false}
        eventOverlap={true}
        eventDragMinDistance={5}
        dragRevertDuration={200}
        dragScroll={true}
        fixedMirrorParent={typeof document !== 'undefined' ? document.body : undefined}
        allDaySlot={false}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        slotDuration={zoomConfig.slotDuration}
        slotLabelInterval={zoomConfig.slotLabelInterval}
        snapDuration={zoomConfig.snapDuration}
        
        scrollTime={zoomConfig.scrollTime}
        scrollTimeReset={true}
        eventSources={[eventSource]}
        eventDisplay='block'
        displayEventTime={false}
        displayEventEnd={false}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        dayMaxEvents={false}
        moreLinkClick='popover'
        eventClick={onEventClick}
        dateClick={onDateSelect}
        eventDrop={handleCombinedEventDrop}
        eventResize={onEventResize}
        eventContent={(eventInfo) => <CalendarEventRenderer eventInfo={eventInfo} />}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventDidMount={handleEventDidMount}
        aspectRatio={1.8}
        height="100%"
        expandRows={true}
        stickyHeaderDates={false}
        handleWindowResize={true}
        views={{
          dayGridMonth: {
            dayMaxEventRows: 3,
            dayHeaderFormat: { weekday: 'long' }
          },
          timeGridWeek: {
            dayMaxEventRows: false,
            dayHeaderFormat: { weekday: 'long', day: 'numeric' },
            slotMinHeight: 30,
            expandRows: true
          },
          timeGridDay: {
            dayMaxEventRows: false,
            slotMinHeight: 30,
            expandRows: true
          }
        }}
        viewDidMount={handleViewDidMount}
        datesSet={handleDateChange}
        loading={handleLoadingChange}
        ref={handleCalendarRef}
      />
    </Box>
  );
});

PublicationCalendar.displayName = 'PublicationCalendar';
