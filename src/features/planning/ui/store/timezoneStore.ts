/**
 * Timezone Store - Global timezone management con TODAS las zonas IANA
 * Usando luxon para soporte completo de zonas horarias
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Función para obtener TODAS las zonas horarias IANA soportadas
export const getAllTimezones = (): string[] => {
  if (typeof Intl.supportedValuesOf === 'function') {
    return Intl.supportedValuesOf('timeZone');
  }
  
  // Fallback para navegadores que no soportan supportedValuesOf
  return [
    'local',
    'UTC',
    'America/New_York',
    'America/Los_Angeles', 
    'America/Chicago',
    'America/Mexico_City',
    'America/Bogota',
    'America/Caracas',
    'America/Lima',
    'America/Santiago',
    'America/Argentina/Buenos_Aires',
    'America/Sao_Paulo',
    'Europe/London',
    'Europe/Paris',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Berlin',
    'Europe/Moscow',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Kolkata',
    'Asia/Dubai',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];
};

// Zonas horarias populares para mostrar primero
export const POPULAR_TIMEZONES = [
  'local',
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago', 
  'America/Mexico_City',
  'America/Bogota',
  'Europe/London',
  'Europe/Paris',
  'Europe/Madrid',
  'Asia/Tokyo',
  'Australia/Sydney'
];

// Función para formatear nombre de zona horaria
export const formatTimezoneLabel = (timezone: string): string => {
  if (timezone === 'local') return 'Hora Local';
  if (timezone === 'UTC') return 'UTC';
  
  // Formatear zonas IANA de forma legible
  return timezone
    .replace(/_/g, ' ')
    .replace('America/', '')
    .replace('Europe/', '')
    .replace('Asia/', '')
    .replace('Australia/', '')
    .replace('Pacific/', '')
    .replace('Africa/', '');
};

// Función para obtener offset de timezone
export const getTimezoneOffset = (timezone: string): string => {
  try {
    const now = new Date();
    if (timezone === 'local') {
      const offset = -now.getTimezoneOffset();
      const hours = Math.floor(Math.abs(offset) / 60);
      const minutes = Math.abs(offset) % 60;
      const sign = offset >= 0 ? '+' : '-';
      return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch (error) {
    return '+00:00';
  }
};

// Interfaz para opciones de timezone
export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

// Función para generar opciones de timezone con offsets
export const generateTimezoneOptions = (): TimezoneOption[] => {
  const allTimezones = getAllTimezones();
  const popularSet = new Set(POPULAR_TIMEZONES);
  
  // Separar populares de otras
  const popular = allTimezones
    .filter(tz => popularSet.has(tz))
    .map(tz => ({
      value: tz,
      label: formatTimezoneLabel(tz),
      offset: getTimezoneOffset(tz)
    }));
    
  const others = allTimezones
    .filter(tz => !popularSet.has(tz))
    .map(tz => ({
      value: tz,
      label: formatTimezoneLabel(tz),
      offset: getTimezoneOffset(tz)
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
    
  return [...popular, ...others];
};

interface TimezoneStore {
  currentTimezone: string;
  setTimezone: (timezone: string) => void;
  formatTimeInTimezone: (date: Date, timezone?: string) => string;
  getTimezoneLabel: (timezone?: string) => string;
  // ✅ NEW: Método para obtener el valor correcto para FullCalendar
  getFullCalendarTimezone: (timezone?: string) => string;
  // ✅ NEW: Detectar la timezone actual del navegador
  getBrowserTimezone: () => string;
  // ✅ NEW: Para actualizar el calendario dinámicamente
  calendarRef?: any;
  setCalendarRef: (calendar: any) => void;
  // ✅ NEW: Obtener todas las opciones de timezone
  getAllTimezoneOptions: () => TimezoneOption[];
  // ✅ NEW: Obtener opciones populares
  getPopularTimezones: () => TimezoneOption[];
}

export const useTimezoneStore = create<TimezoneStore>()(
  persist(
    (set, get) => ({
      // ✅ FIXED: Usar timezone local real del navegador por defecto
      currentTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'local',
      calendarRef: null,
      
      setTimezone: (timezone: string) => {
        console.log('Setting timezone to:', timezone);
        
        // ✅ Actualizar el calendario dinámicamente como en la documentación
        const { calendarRef } = get();
        if (calendarRef) {
          const fullCalendarTz = get().getFullCalendarTimezone(timezone);
          console.log('🔄 Updating FullCalendar timezone to:', fullCalendarTz);
          calendarRef.setOption('timeZone', fullCalendarTz);
        }
        
        set({ currentTimezone: timezone });
      },
      
      setCalendarRef: (calendar: any) => {
        console.log('📅 Calendar ref set for dynamic timezone updates');
        set({ calendarRef: calendar });
      },
      
      // ✅ FIXED: Obtener timezone para FullCalendar
      getFullCalendarTimezone: (timezone?: string): string => {
        const tz = timezone || get().currentTimezone;
        
        // Si es 'local', devolver 'local' (FullCalendar lo entiende)
        if (tz === 'local') {
          return 'local';
        }
        
        // Si es UTC, devolver 'UTC'
        if (tz === 'UTC') {
          return 'UTC';
        }
        
        // Para zonas IANA, devolver tal como están (FullCalendar las soporta directamente)
        return tz;
      },
      
      // ✅ NEW: Detectar timezone del navegador
      getBrowserTimezone: (): string => {
        try {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (error) {
          console.warn('❌ No se pudo detectar timezone del navegador:', error);
          return 'UTC';
        }
      },
      
      formatTimeInTimezone: (date: Date, timezone?: string): string => {
        const tz = timezone || get().currentTimezone;
        
        try {
          if (tz === 'local') {
            // ✅ FIXED: Usar timezone detectada del navegador
            const browserTz = get().getBrowserTimezone();
            return date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: browserTz
            });
          } else if (tz === 'UTC') {
            return date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'UTC'
            });
          } else {
            // Usar timezone con nombre
            return date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: tz
            });
          }
        } catch (error) {
          console.warn('❌ Error formateando hora en timezone:', error);
          // Fallback a hora local
          return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit'
          });
        }
      },
      
      getTimezoneLabel: (timezone?: string): string => {
        const tz = timezone || get().currentTimezone;
        
        if (tz === 'local') {
          const browserTz = get().getBrowserTimezone();
          return `Hora Local (${browserTz})`;
        }
        
        // Usar la función de formateo para obtener el label
        return formatTimezoneLabel(tz);
      },

      // ✅ NEW: Obtener todas las opciones de timezone
      getAllTimezoneOptions: (): TimezoneOption[] => {
        return generateTimezoneOptions();
      },

      // ✅ NEW: Obtener opciones populares
      getPopularTimezones: (): TimezoneOption[] => {
        return POPULAR_TIMEZONES.map(tz => ({
          value: tz,
          label: formatTimezoneLabel(tz),
          offset: getTimezoneOffset(tz)
        }));
      }
    }),
    {
      name: 'calendar-timezone',
      partialize: (state) => ({ currentTimezone: state.currentTimezone })
    }
  )
);