import { create } from 'zustand';

export interface CalendarRefetchStore {
  // Estado
  refetchTrigger: number;
  
  // Acciones
  triggerCalendarRefetch: () => void;
  
  // Helpers para debugging
  getRefetchCount: () => number;
}

/**
 * Store centralizado para manejar refetch del calendario
 * 
 * Este store se usa para notificar al calendario que debe refrescar
 * sus datos cuando se crean, actualizan o eliminan publicaciones.
 * 
 * Arquitectura:
 * - Los hooks de CUD (Create/Update/Delete) llaman a triggerCalendarRefetch()
 * - El calendario se suscribe a refetchTrigger para refrescar automáticamente
 */
export const useCalendarRefetchStore = create<CalendarRefetchStore>((set, get) => ({
  // Estado inicial
  refetchTrigger: 0,
  
  // Acción principal: incrementar el trigger para forzar refetch
  triggerCalendarRefetch: () => {
    const newTrigger = get().refetchTrigger + 1;
    console.log('🔄 Triggering calendar refetch:', newTrigger);
    set({ refetchTrigger: newTrigger });
  },
  
  // Helper para debugging
  getRefetchCount: () => get().refetchTrigger,
}));