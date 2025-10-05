import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Platform, TimeRange } from '../api/types';

interface FiltersState {
  // Current filters
  platform: Platform;
  timeRange: TimeRange;
  postsLimit: number;
  
  // Actions
  setPlatform: (platform: Platform) => void;
  setTimeRange: (timeRange: TimeRange) => void;
  setPostsLimit: (limit: number) => void;
  
  // Computed
  getDateRange: () => { startDate: string; endDate: string };
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      // Initial state
      platform: 'facebook',
      timeRange: 30,
      postsLimit: 10,
      
      // Actions
      setPlatform: (platform) => set({ platform }),
      setTimeRange: (timeRange) => set({ timeRange }),
      setPostsLimit: (postsLimit) => set({ postsLimit }),
      
      // Computed date range based on timeRange
      getDateRange: () => {
        const { timeRange } = get();
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - timeRange);
        
        return {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        };
      },
    }),
    {
      name: 'analytics-v2-filters', // localStorage key
      partialize: (state) => ({
        timeRange: state.timeRange,
        postsLimit: state.postsLimit,
      }),
    }
  )
);