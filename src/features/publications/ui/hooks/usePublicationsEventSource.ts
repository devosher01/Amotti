import { useCallback, useMemo } from 'react';
import { EventSourceInput } from '@fullcalendar/core';
import { usePublicationsFiltersStore } from '../../../planning/ui/store/publicationsFilters.store';
import { useCalendarRefetchStore } from '../../../planning/ui/store/calendarRefetch.store';
import { mapPublicationsToEvents } from '@/features/planning/infrastructure/mappers/publication-calendar.mapper';
import { Platform } from '@/features/planning';
import { listPublicationsUseCase } from '../../../planning/application/use-cases/list-publications.use-case';
import { usePublicationDependencies } from '../../../planning/shared/hooks/usePublicationDependencies';
import { useAuth } from '@/features/authV2/presentation/hooks/useAuth';
import { ListPublicationsQuery } from '../../../planning/application/ports/publication-repository.port';

type ViewTypeMapping = {
  'dayGridMonth': 'month';
  'timeGridWeek': 'week';
  'timeGridDay': 'day';
  [key: string]: 'month' | 'week' | 'day';
};

const VIEW_MAPPING: ViewTypeMapping = {
  'dayGridMonth': 'month',
  'timeGridWeek': 'week', 
  'timeGridDay': 'day'
};

export function usePublicationsEventSource(): EventSourceInput {
  const { filters } = usePublicationsFiltersStore();
  const { refetchTrigger } = useCalendarRefetchStore();
  const { user } = useAuth();
  const dependencies = usePublicationDependencies();

  const eventSource = useMemo((): EventSourceInput => ({
    id: `publications-event-source-${user?.userId || 'anonymous'}`,
    
    events: async (fetchInfo, successCallback, failureCallback) => {
      try {
        const { start, end } = fetchInfo;
        
        if (!user?.userId) {
          failureCallback(new Error('Usuario no autenticado'));
          return;
        }
        
        console.log('📅 FullCalendar EventSource fetch:', {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          filters: filters,
          refetchTrigger
        });

        // Usar el caso de uso directamente
        const query: ListPublicationsQuery = {
          userId: user.userId,
          startDate: start,
          endDate: end,
          status: filters.status?.length ? filters.status.join(',') : undefined,
          platform: filters.platforms?.length ? filters.platforms[0] as Platform : undefined,
          limit: 100,
          offset: 0
        };

        const result = await listPublicationsUseCase(query, dependencies);
        console.log('ESTE ES UN DEBUG DE RESULTADO DE LIST PUBLICATIONS', result);

        if (result.success && result.data) {
          // Transformar publications → eventos FullCalendar

          console.log('ESTE ES UN DEBUG DE PUBLICACIONES antes de mapear a eventos', result.data.publications);
          const events = mapPublicationsToEvents(result.data.publications);

          console.log('ESTE ES UN DEBUG DE EVENTOS después de mapear a eventos', events);
          
          console.log('✅ EventSource success:', {
            publicationsCount: result.data.publications.length,
            eventsCount: events.length,
            firstEvents: events.slice(0, 3)
          });

          successCallback(events);
        } else {
          failureCallback(new Error(result.message || 'Error al cargar publicaciones'));
        }

      } catch (error) {
        console.error('❌ EventSource failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        failureCallback(new Error(`Failed to load publications: ${errorMessage}`));
      }
    },
    
    color: '#2196f3',
    textColor: '#ffffff',
    
  }), [filters, refetchTrigger, user?.userId, dependencies]);

  return eventSource;
}

/**
 * Hook para manejar cambios de vista en FullCalendar
 * Sincroniza con el store de filtros
 */
export function useCalendarViewSync() {
  const { setView, setDate } = usePublicationsFiltersStore();
  
  const handleViewDidMount = useCallback((info: any) => {
    // 🛡️ Guard clause para evitar errores cuando view es undefined
    if (!info?.view?.type) {
      console.warn('⚠️ ViewDidMount called without view info');
      return;
    }
    
    const newViewType = VIEW_MAPPING[info.view.type];
    if (newViewType) {
      setView(newViewType);
    }
    
    // Sincronizar fecha cuando cambia la vista
    const currentDate = info.view.currentStart || new Date();
    setDate(currentDate);
    
    console.log('🔄 Calendar view changed:', {
      fullCalendarView: info.view.type,
      mappedView: newViewType,
      currentDate: currentDate.toISOString()
    });
  }, [setView, setDate]);

  const handleDateChange = useCallback((info: any) => {
    const newDate = info.start || info.date || new Date();
    setDate(newDate);
    
    console.log('📅 Calendar date changed:', {
      newDate: newDate.toISOString()
    });
  }, [setDate]);

  return {
    handleViewDidMount,
    handleDateChange
  };
}