// Componentes principales
export { default as Calendar } from './index';
export { default as SocialMediaScheduler } from './SocialMediaScheduler';

// Componentes de eventos del calendario
export { default as CalendarEvent } from './CalendarEvent';
export { default as CalendarEventDialog } from './CalendarEventDialog';
export { default as CalendarEventForm } from './CalendarEventForm';

// Componentes de posts sociales
export { default as SocialMediaPost } from './SocialMediaPost';
export { default as SocialMediaPostDialog } from './SocialMediaPostDialog';

// Modal de posts (OBSOLETO - migrar a @/post_modal)
export { default as NewPostModal } from './NewPostModal';

// Vistas del calendario
export { default as DayView } from './DayView';
export { default as WeekView } from './WeekView';
export { default as MonthView } from './MonthView';

// Tipos y datos
export type { EventType, SocialMediaPostType, CalendarView, CalendarFilters } from './types';
export { defaultEvents, defaultSocialMediaPosts } from './data'; 