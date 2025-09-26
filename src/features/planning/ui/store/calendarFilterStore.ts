/**
 * Calendar Filter Store - Global state management for calendar filters and configurations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types for calendar filters and configurations
export type CalendarView = 'month' | 'week' | 'day';
export type ZoomLevel = 'condensada' | 'normal' | 'expandida';

export interface CalendarFilterState {
  // View Configuration
  currentView: CalendarView;
  zoomLevel: ZoomLevel;
  
  // Active Filters
  activeFilters: string[];
  
  // Social Media Filters
  socialPlatforms: {
    facebook: boolean;
    instagram: boolean;
    twitter: boolean;
    bluesky: boolean;
    threads: boolean;
    linkedin: boolean;
    googleBusiness: boolean;
    pinterest: boolean;
    tiktok: boolean;
    youtube: boolean;
  };
  
  // Publication Status Filters
  publicationStatus: {
    published: boolean;
    pending: boolean;
    draft: boolean;
    error: boolean;
    autolist: boolean;
  };
  
  // Notes Filters
  notesFilter: {
    noNotes: boolean;
    read: boolean;
    unread: boolean;
  };
  
  // Actions
  setCurrentView: (view: CalendarView) => void;
  setZoomLevel: (zoom: ZoomLevel) => void;
  toggleFilter: (filterId: string) => void;
  toggleSocialPlatform: (platform: keyof CalendarFilterState['socialPlatforms']) => void;
  togglePublicationStatus: (status: keyof CalendarFilterState['publicationStatus']) => void;
  toggleNotesFilter: (filter: keyof CalendarFilterState['notesFilter']) => void;
  resetFilters: () => void;
  
  // Computed
  getActiveFiltersCount: () => number;
  hasActiveFilters: () => boolean;
}

// Initial state
const initialState = {
  currentView: 'week' as CalendarView,
  zoomLevel: 'normal' as ZoomLevel,
  activeFilters: ['all'],
  
  socialPlatforms: {
    facebook: true,
    instagram: true,
    twitter: false,
    bluesky: false,
    threads: false,
    linkedin: false,
    googleBusiness: false,
    pinterest: false,
    tiktok: false,
    youtube: false,
  },
  
  publicationStatus: {
    published: true,
    pending: true,
    draft: true,
    error: true,
    autolist: true,
  },
  
  notesFilter: {
    noNotes: true,
    read: true,
    unread: true,
  },
};

export const useCalendarFilterStore = create<CalendarFilterState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // View Actions
      setCurrentView: (view: CalendarView) => {
        console.log('Calendar view changed to:', view);
        set({ currentView: view });
      },
      
      setZoomLevel: (zoom: ZoomLevel) => {
        console.log('Zoom level changed to:', zoom);
        set({ zoomLevel: zoom });
      },
      
      // Filter Actions
      toggleFilter: (filterId: string) => {
        const { activeFilters } = get();
        const newFilters = activeFilters.includes(filterId)
          ? activeFilters.filter(id => id !== filterId)
          : [...activeFilters, filterId];
        
        console.log('Active filters updated:', newFilters);
        set({ activeFilters: newFilters });
      },
      
      toggleSocialPlatform: (platform) => {
        set((state) => ({
          socialPlatforms: {
            ...state.socialPlatforms,
            [platform]: !state.socialPlatforms[platform],
          },
        }));
      },
      
      togglePublicationStatus: (status) => {
        set((state) => ({
          publicationStatus: {
            ...state.publicationStatus,
            [status]: !state.publicationStatus[status],
          },
        }));
      },
      
      toggleNotesFilter: (filter) => {
        set((state) => ({
          notesFilter: {
            ...state.notesFilter,
            [filter]: !state.notesFilter[filter],
          },
        }));
      },
      
      resetFilters: () => {
        console.log('Resetting all filters to default');
        set({
          ...initialState,
        });
      },
      
      // Computed functions
      getActiveFiltersCount: () => {
        const state = get();
        const socialCount = Object.values(state.socialPlatforms).filter(Boolean).length;
        const statusCount = Object.values(state.publicationStatus).filter(Boolean).length;
        const notesCount = Object.values(state.notesFilter).filter(Boolean).length;
        return socialCount + statusCount + notesCount;
      },
      
      hasActiveFilters: () => {
        const { activeFilters } = get();
        return activeFilters.length > 1 || !activeFilters.includes('all');
      },
    }),
    {
      name: 'calendar-filter-storage',
      version: 1,
    }
  )
);
