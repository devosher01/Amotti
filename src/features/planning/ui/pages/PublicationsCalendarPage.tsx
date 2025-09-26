/**
 * PublicationsCalendarPage (Feature-local) - Composes CalendarHeader + PublicationCalendar
 */

'use client';

import React, { useRef, useCallback, useState } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import FullCalendar from '@fullcalendar/react';

import { CalendarHeader } from '../components/CalendarHeader';
import { PublicationCalendar } from '../components/PublicationCalendar/PublicationCalendar';
import { PostCreationDialog } from '../components/PostCreationDialog/PostCreationDialog';
import { usePublicationsFiltersStore } from '../store/publicationsFilters.store';
import { SocialMediaPostType } from '@/features/shared/components/calendar_social_media/types';

export const PublicationsCalendarPage: React.FC = () => {
  const theme = useTheme();
  const calendarRef = useRef<FullCalendar | null>(null);
  const { filters, setView, setDate } = usePublicationsFiltersStore();
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleNavigate = useCallback((direction: 'prev' | 'next' | 'today') => {
    if (!calendarRef.current) return;
    const api = calendarRef.current.getApi();
    if (direction === 'prev') api.prev();
    else if (direction === 'next') api.next();
    else api.today();
    setDate(api.getDate());
  }, [setDate]);

  const handleViewChange = useCallback((view: 'month' | 'week' | 'day') => {
    setView(view);
    if (!calendarRef.current) return;
    const api = calendarRef.current.getApi();
    const viewMap = { month: 'dayGridMonth', week: 'timeGridWeek', day: 'timeGridDay' } as const;
    api.changeView(viewMap[view]);
  }, [setView]);

  const handleSearchChange = () => {};
  const handleCreatePost = useCallback(() => {
    console.log('🎨 Opening creation dialog...');
    setSelectedDate(new Date());
    setIsCreationDialogOpen(true);
  }, []);

  const handleDateClick = useCallback((info: any) => {
    console.log('📅 Date clicked:', info.date);
    setSelectedDate(info.date);
    setIsCreationDialogOpen(true);
  }, []);

  const handleCloseCreationDialog = useCallback(() => {
    console.log('🎨 Closing creation dialog...');
    setIsCreationDialogOpen(false);
    setSelectedDate(null);
  }, []);

  const handleSavePost = useCallback((postData: SocialMediaPostType) => {
    console.log('💾 Saving post:', postData);
    // Aquí puedes agregar la lógica para guardar el post
    setIsCreationDialogOpen(false);
  }, []);

  // Crear un objeto post con la fecha seleccionada
  const postWithSelectedDate = React.useMemo(() => {
    if (!selectedDate) return null;
    
    return {
      id: '',
      title: '',
      content: '',
      scheduledTime: selectedDate,
      platforms: [],
      status: 'draft' as const,
      mediaUrls: [],
      hashtags: [],
      mentions: [],
    };
  }, [selectedDate]);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <CalendarHeader
        currentDate={filters.date}
        currentView={filters.view}
        onNavigate={handleNavigate}
        onViewChange={handleViewChange}
        onSearchChange={handleSearchChange}
        onCreatePost={handleCreatePost}
      />

      <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <PublicationCalendar
          ref={calendarRef}
          onDateSelect={handleDateClick}
          onLoading={(isLoading) => console.log('📅 Calendar loading:', isLoading)}
          height="100%"
        />
      </Box>

      {/* 🎨 Post Creation Dialog */}
      <PostCreationDialog
        open={isCreationDialogOpen}
        onClose={handleCloseCreationDialog}
        post={postWithSelectedDate}
        onSave={handleSavePost}
      />
    </Box>
  );
};
