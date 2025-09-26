
import { useCallback } from 'react';
import { EventDropArg } from '@fullcalendar/core';
import { useUpdatePublication } from './useUpdatePublication';

export interface UseCalendarEventHandlersReturn {
  handleEventDrop: (info: EventDropArg) => Promise<void>;
  isUpdating: boolean;
  error: string | null;
}

export function useCalendarEventHandlers(): UseCalendarEventHandlersReturn {
  const updateHook = useUpdatePublication();

  const handleEventDrop = useCallback(async (info: EventDropArg) => {
    const { event, revert } = info;
    
    try {
      console.log('📅 Event dropped - updating publication:', {
        id: event.id,
        title: event.title,
        newStart: event.start?.toISOString()
      });

      const updateCommand = {
        id: event.id,
        scheduledAt: event.start as Date 
      };
      
      console.log('🔄 Update command being sent:', updateCommand);

      const result = await updateHook.updatePublication(updateCommand);

      if (!result.success) {
        console.error('❌ Failed to update publication on drop:', result);
        revert();
      } else {
        console.log('✅ Publication updated successfully on drop');
      }
    } catch (error) {
      console.error('❌ Error handling event drop:', error);
      revert();
    }
  }, [updateHook]);

  return {
    handleEventDrop,
    isUpdating: updateHook.isUpdating,
    error: updateHook.error
  };
}