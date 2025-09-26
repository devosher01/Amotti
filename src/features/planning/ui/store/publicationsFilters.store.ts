import { create } from 'zustand';

export type PublicationsFilters = {
  view: 'month' | 'week' | 'day';
  date: Date; // current anchor date
  status?: ('draft'|'scheduled'|'published'|'cancelled'|'failed')[];
  platforms?: string[];
  contentType?: 'post'|'reel'|'story';
};

export const usePublicationsFiltersStore = create<{
  filters: PublicationsFilters;
  setView: (view: PublicationsFilters['view']) => void;
  setDate: (date: Date) => void;
  setStatus: (status: PublicationsFilters['status']) => void;
  setPlatforms: (platforms: string[]) => void;
  setContentType: (type: PublicationsFilters['contentType']) => void;
}>(set => ({
  filters: { view: 'month', date: new Date() },
  setView: (view) => set(state => ({ filters: { ...state.filters, view } })),
  setDate: (date) => set(state => ({ filters: { ...state.filters, date } })),
  setStatus: (status) => set(state => ({ filters: { ...state.filters, status } })),
  setPlatforms: (platforms) => set(state => ({ filters: { ...state.filters, platforms } })),
  setContentType: (contentType) => set(state => ({ filters: { ...state.filters, contentType } })),
}));
