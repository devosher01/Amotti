"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconCalendar,
  IconDragDrop,
  IconCalendarMonth,
  IconCalendarWeek,
  IconCalendarTime,
} from "@tabler/icons-react";
import { 
  format, 
  addDays, 
  subDays, 
  startOfDay, 
  endOfDay, 
  addMinutes, 
  isSameDay, 
  isToday, 
  isSameMinute,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { professionalBranding } from "@/utils/theme/ProfessionalBranding";

import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import { SocialMediaPostType } from "./types";
import { defaultSocialMediaPosts } from "./data";
import "./SocialMediaScheduler.css";
import { SocialMediaPostDialog, NewPostModal } from "./CalendarIndex";
import { PostCreationDialog } from "./PostCreationDialog";

// ✅ Importar hooks para obtener datos reales
import { 
  usePublicationsForDate, 
  usePublicationsForWeek, 
  usePublicationsForMonth 
} from "@/features/social-media-publications/application/hooks/use-get-publications";

const SocialMediaScheduler = () => {
  const theme = useTheme();
  const customizer = useSelector((state: AppState) => state.customizer);
  const isDark = customizer.activeMode === 'dark';
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('week'); // Vista semanal por defecto
  const [selectedPost, setSelectedPost] = useState<SocialMediaPostType | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [draggedPost, setDraggedPost] = useState<SocialMediaPostType | null>(null);
  const [dragTargetTime, setDragTargetTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ✅ Calcular parámetros de filtros según la vista y fecha actual
  const dateFilters = useMemo(() => {
    switch (view) {
      case 'day':
        return {
          type: 'day' as const,
          date: format(currentDate, 'yyyy-MM-dd')
        };
      case 'week':
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        return {
          type: 'week' as const,
          weekStart: format(weekStart, 'yyyy-MM-dd')
        };
      case 'month':
        return {
          type: 'month' as const,
          month: format(currentDate, 'yyyy-MM')
        };
      default:
        return {
          type: 'week' as const,
          weekStart: format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd')
        };
    }
  }, [currentDate, view]);

  // ✅ Usar los hooks apropiados según la vista
  const dayQuery = usePublicationsForDate(dateFilters.type === 'day' ? dateFilters.date : '');
  const weekQuery = usePublicationsForWeek(dateFilters.type === 'week' ? dateFilters.weekStart : '');
  const monthQuery = usePublicationsForMonth(dateFilters.type === 'month' ? dateFilters.month : '');

  // ✅ Seleccionar los datos y estado de loading según la vista actual
  const { data: publicationsData, isLoading, error, refetch } = useMemo(() => {
    switch (view) {
      case 'day':
        return dayQuery;
      case 'week':
        return weekQuery;
      case 'month':
        return monthQuery;
      default:
        return weekQuery;
    }
  }, [view, dayQuery, weekQuery, monthQuery]);

  // ✅ Convertir las publicaciones del backend al formato del calendario
  const posts = useMemo(() => {
    if (!publicationsData?.publications) {
      return defaultSocialMediaPosts; // Fallback a datos de ejemplo
    }

    return publicationsData.publications.map(pub => ({
      id: pub.id,
      title: pub.content.text.substring(0, 50) + (pub.content.text.length > 50 ? '...' : ''),
      content: pub.content.text,
      platforms: pub.platforms.map(p => p.toLowerCase()),
      scheduledTime: pub.scheduledAt ? new Date(pub.scheduledAt) : undefined,
      status: pub.status,
      mediaUrls: pub.content.media.map(m => m.url),
      hashtags: pub.content.hashtags,
      mentions: pub.content.mentions
    })) as SocialMediaPostType[];
  }, [publicationsData]);

  const [localPosts, setLocalPosts] = useState<SocialMediaPostType[]>(posts);

  // ✅ Sincronizar posts locales con los del servidor
  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  // ✅ Refetch automático cuando cambia la vista o fecha
  useEffect(() => {
    console.log('🔄 Vista o fecha cambiada, refetching data...', {
      view,
      currentDate: currentDate.toISOString(),
      dateFilters
    });
    refetch();
  }, [currentDate, view, refetch, dateFilters]);

  // Actualizar la hora actual cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  // Generar intervalos de media hora para el día
  const generateTimeSlots = (date: Date) => {
    const start = startOfDay(date);
    const end = endOfDay(date);
    const slots: Date[] = [];
    
    let currentSlot = start;
    while (currentSlot <= end) {
      slots.push(currentSlot);
      currentSlot = addMinutes(currentSlot, 30);
    }
    
    return slots;
  };

  // Generar días de la semana
  const generateWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Lunes como inicio
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  // Generar días del mes
  const generateMonthDays = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  // Generar datos según la vista
  const calendarData = useMemo(() => {
    const timeSlots = generateTimeSlots(currentDate);
    
    switch (view) {
      case 'day':
        return {
          timeSlots,
          days: [currentDate],
          type: 'day'
        };
      case 'week':
        return {
          timeSlots,
          days: generateWeekDays(currentDate),
          type: 'week'
        };
      case 'month':
        return {
          timeSlots,
          days: generateMonthDays(currentDate),
          type: 'month'
        };
      default:
        return {
          timeSlots,
          days: generateWeekDays(currentDate),
          type: 'week'
        };
    }
  }, [currentDate, view]);

  // Navegación del calendario
  const goToPrevious = () => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => subDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => subWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
    }
  };

  const goToNext = () => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtener posts para un intervalo de tiempo específico
  const getPostsForTimeSlot = (timeSlot: Date, day?: Date) => {
    const filteredPosts = localPosts.filter(post => {
      if (!post.scheduledTime) return false;
      const postTime = new Date(post.scheduledTime);
      
      // Si se especifica un día, verificar que el post sea de ese día
      if (day && !isSameDay(postTime, day)) return false;
      
      // Verificar que la hora y minutos coincidan
      const sameTime = postTime.getHours() === timeSlot.getHours() && 
                      postTime.getMinutes() === timeSlot.getMinutes();
      
      return sameTime;
    });
    
    // Log ocasional para debug
    if (filteredPosts.length > 0 && Math.random() < 0.1) {
      console.log('📋 Posts encontrados para slot:', {
        timeSlot: timeSlot.toISOString(),
        day: day?.toISOString(),
        postsFound: filteredPosts.length,
        posts: filteredPosts.map(p => ({ id: p.id, title: p.title, time: p.scheduledTime }))
      });
    }
    
    return filteredPosts;
  };

  // Obtener posts para un día específico
  const getPostsForDay = (day: Date) => {
    return localPosts.filter(post => {
      if (!post.scheduledTime) return false;
      const postTime = new Date(post.scheduledTime);
      return (
        postTime.getFullYear() === day.getFullYear() &&
        postTime.getMonth() === day.getMonth() &&
        postTime.getDate() === day.getDate()
      );
    });
  };

  // Obtener posts para una hora específica
  const getPostsForHour = (hour: number) => {
    return localPosts.filter(post => {
      if (!post.scheduledTime) return false;
      const postTime = new Date(post.scheduledTime);
      return postTime.getHours() === hour;
    });
  };

  // Manejadores de eventos
  const handlePostClick = (post: SocialMediaPostType) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };

  const handleAddPost = (timeSlot?: Date) => {
    if (timeSlot) {
      setSelectedPost({
        id: '',
        title: '',
        content: '',
        platforms: ['facebook'],
        scheduledTime: timeSlot,
        status: 'draft',
        mediaUrls: [],
        hashtags: [],
        mentions: []
      });
    }
    setIsFormDialogOpen(true);
  };

  const handleSavePost = (postData: SocialMediaPostType) => {
    if (postData.id) {
      // Actualizar post existente
      setLocalPosts(prev => prev.map(post => 
        post.id === postData.id ? postData : post
      ));
    } else {
      // Crear nuevo post
      const newPost = {
        ...postData,
        id: Date.now().toString()
      };
      setLocalPosts(prev => [...prev, newPost]);
    }
    setIsFormDialogOpen(false);
    setSelectedPost(null);
    
    // ✅ Refetch data después de cambios
    setTimeout(() => refetch(), 500);
  };

  const handleDeletePost = (postId: string) => {
    setLocalPosts(prev => prev.filter(post => post.id !== postId));
    setIsPostDialogOpen(false);
    setSelectedPost(null);
    
    // ✅ Refetch data después de cambios
    setTimeout(() => refetch(), 500);
  };

  const handleEditPost = () => {
    setIsPostDialogOpen(false);
    setIsFormDialogOpen(true);
  };

  // Funciones de drag & drop con validación de fecha/hora
  const handleDragStart = (post: SocialMediaPostType) => {
    console.log('🚀 Iniciando drag:', {
      postId: post.id,
      title: post.title,
      originalTime: post.scheduledTime
    });
    setDraggedPost(post);
  };

  const handleDragOver = (timeSlot: Date, day?: Date) => {
    // Crear la fecha/hora objetivo combinando el día y el slot de tiempo
    let targetDateTime = timeSlot;
    if (day) {
      targetDateTime = new Date(day);
      targetDateTime.setHours(timeSlot.getHours(), timeSlot.getMinutes(), 0, 0);
    }
    
    setDragTargetTime(targetDateTime);
  };

  const handleDrop = (targetTime: Date, day?: Date) => {
    console.log('🎯 DROP EVENT EJECUTADO');
    
    if (!draggedPost) {
      console.log('🚫 No hay post siendo arrastrado en drop');
      return;
    }
    
    console.log('📅 Iniciando drop:', {
      draggedPost: draggedPost.id,
      targetTime: targetTime.toISOString(),
      day: day?.toISOString(),
      originalTime: draggedPost.scheduledTime
    });
    
    // Crear la fecha/hora objetivo combinando el día y el slot de tiempo
    let finalTargetTime = targetTime;
    if (day) {
      finalTargetTime = new Date(day);
      finalTargetTime.setHours(targetTime.getHours(), targetTime.getMinutes(), 0, 0);
    } else {
      // Normalizar segundos y milisegundos aunque no haya day
      finalTargetTime = new Date(targetTime);
      finalTargetTime.setSeconds(0, 0);
    }
    
    console.log('🎯 Tiempo final calculado:', finalTargetTime.toISOString());
    
    // Validar que la fecha/hora objetivo no sea anterior a la actual (más permisivo)
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    if (finalTargetTime < fiveMinutesAgo) {
      console.warn('⚠️ No se puede mover la publicación a una fecha/hora muy anterior a la actual');
      setDraggedPost(null);
      setDragTargetTime(null);
      return;
    }
    
    const updatedPost = {
      ...draggedPost,
      scheduledTime: finalTargetTime
    };
    
    console.log('✅ Actualizando post:', updatedPost);
    
    // Actualizar inmediatamente para evitar race conditions
    setLocalPosts(prev => {
      const newPosts = prev.map(post => 
        post.id === draggedPost.id ? updatedPost : post
      );
      console.log('📝 Posts actualizados:', newPosts.length, 'posts totales');
      console.log('📝 Post actualizado encontrado:', newPosts.find(p => p.id === draggedPost.id));
      return newPosts;
    });
    
    // Limpiar estado inmediatamente después de la actualización exitosa
    console.log('🧹 Limpiando estado después de drop exitoso');
    
    // Si estamos en vista semanal y el post se movió a una semana diferente, navegar allí
    if (view === 'week') {
      const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
      
      if (finalTargetTime < currentWeekStart || finalTargetTime > currentWeekEnd) {
        console.log('📅 Post movido fuera de la semana actual, navegando a la nueva semana');
        setCurrentDate(finalTargetTime);
      }
    }
    
    setDraggedPost(null);
    setDragTargetTime(null);
  };

  const handleDragEnd = () => {
    console.log('🏁 Finalizando drag (dragEnd) - NO limpiamos el estado aquí');
    // NO limpiar el estado aquí porque puede interferir con onDrop
    // El estado se limpia en handleDrop o después de un timeout
    setTimeout(() => {
      if (draggedPost) {
        console.log('⏰ Timeout: Limpiando estado de drag después de dragEnd');
        setDraggedPost(null);
        setDragTargetTime(null);
      }
    }, 100);
  };

  // Función para verificar si un slot de tiempo es válido para drop
  const isValidDropTarget = (timeSlot: Date, day?: Date) => {
    let targetDateTime = timeSlot;
    if (day) {
      targetDateTime = new Date(day);
      targetDateTime.setHours(timeSlot.getHours(), timeSlot.getMinutes(), 0, 0);
    }
    
    const now = new Date();
    // Ser más permisivo - permitir hasta 5 minutos en el pasado para evitar problemas de sincronización
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const isValid = targetDateTime >= fiveMinutesAgo;
    
    console.log('🔍 Validando drop target:', {
      targetDateTime: targetDateTime.toISOString(),
      now: now.toISOString(),
      fiveMinutesAgo: fiveMinutesAgo.toISOString(),
      isValid
    });
    
    return isValid;
  };

  // Obtener posición de la hora actual
  const getCurrentTimePosition = () => {
    const now = new Date();
    const startOfToday = startOfDay(now);
    const minutesSinceStart = (now.getTime() - startOfToday.getTime()) / (1000 * 60);
    return (minutesSinceStart / 1440) * 100; // 1440 minutos en un día
  };

  // Debug function para ver el estado de los posts
  const debugPosts = () => {
    console.log('🐛 DEBUG - Estado actual de posts:', {
      totalPosts: localPosts.length,
      isLoading,
      error: error?.message,
      posts: localPosts.map(p => ({
        id: p.id,
        title: p.title,
        scheduledTime: p.scheduledTime,
        status: p.status
      })),
      draggedPost: draggedPost ? {
        id: draggedPost.id,
        title: draggedPost.title,
        scheduledTime: draggedPost.scheduledTime
      } : null,
      dragTargetTime: dragTargetTime?.toISOString(),
      currentView: view,
      currentDate: currentDate.toISOString()
    });
  };

  // Función para forzar re-render
  const forceReRender = () => {
    console.log('🔄 Forzando re-render del calendario');
    setLocalPosts(prev => [...prev]); // Fuerza re-render sin cambiar datos
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Debug buttons - temporal */}
      <Box sx={{ position: 'fixed', top: 10, right: 10, zIndex: 1000, display: 'flex', gap: 1 }}>
        <button 
          onClick={debugPosts}
          style={{
            background: '#5b24b7',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🐛 Debug Posts
        </button>
        <button 
          onClick={forceReRender}
          style={{
            background: '#4057d9',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🔄 Re-render
        </button>
      </Box>
      
      {/* Header del calendario */}
      <Box
        className="scheduler-header"
        sx={{
          background: professionalBranding.getCalendarHeaderBackground(isDark),
          borderBottom: `1px solid ${professionalBranding.getCalendarHeaderBorder(isDark)}`,
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // 🎨 Gradiente sutil púrpura en el header
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px', // Más grueso
            background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 25%, #3b68df 50%, #4f46e5 75%, #6366f1 100%)', // Degradado púrpura-azul
            opacity: 0.9, // Más visible
          },
          position: 'relative',
        }}
      >
        {/* Navegación y controles */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={goToPrevious}
            className="scheduler-nav-button"
            sx={{
              color: '#5b24b7',
              '&:hover': {
                background: 'rgba(91, 36, 183, 0.1)',
                color: '#5b24b7',
                transform: 'translateX(-2px)',
                transition: 'all 0.2s ease',
              }
            }}
          >
            <IconChevronLeft />
          </IconButton>
          
          <IconButton
            onClick={goToNext}
            className="scheduler-nav-button"
            sx={{
              color: '#5b24b7',
              '&:hover': {
                background: 'rgba(91, 36, 183, 0.1)',
                color: '#5b24b7',
                transform: 'translateX(2px)',
                transition: 'all 0.2s ease',
              }
            }}
          >
            <IconChevronRight />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              color: professionalBranding.getTextPrimary(isDark),
              fontWeight: 600,
              minWidth: 200,
              textAlign: 'center',
              // 🎨 Título con acento púrpura sutil
              background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </Typography>

          <Tooltip title="Ir a hoy">
            <IconButton
              onClick={goToToday}
              className="scheduler-nav-button"
              sx={{
                color: '#5b24b7',
                '&:hover': {
                  background: 'rgba(91, 36, 183, 0.1)',
                  color: '#5b24b7',
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s ease',
                }
              }}
            >
              <IconCalendar />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Controles de vista */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => newView && setView(newView)}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: professionalBranding.getCalendarToggleButtonText(isDark),
                borderColor: professionalBranding.getCalendarCellBorder(isDark),
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
                  color: 'white',
                  borderColor: '#5b24b7',
                  boxShadow: '0 2px 8px rgba(91, 36, 183, 0.3)',
                },
                '&:hover': {
                  background: 'rgba(91, 36, 183, 0.1)',
                  color: '#5b24b7',
                  borderColor: '#5b24b7',
                }
              }
            }}
          >
            <ToggleButton value="day" className="scheduler-nav-button">
              <IconCalendarTime size={16} />
            </ToggleButton>
            <ToggleButton value="week" className="scheduler-nav-button">
              <IconCalendarWeek size={16} />
            </ToggleButton>
            <ToggleButton value="month" className="scheduler-nav-button">
              <IconCalendarMonth size={16} />
            </ToggleButton>
          </ToggleButtonGroup>

          <Tooltip title="Agregar post">
            <IconButton
              onClick={() => handleAddPost()}
              className="add-post-button"
              sx={{
                background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4a1e9a 0%, #3a4bc7 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(91, 36, 183, 0.4)',
                  transition: 'all 0.3s ease',
                }
              }}
            >
              <IconPlus />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Contenido del calendario */}
      <Box className="scheduler-body" sx={{ flex: 1, overflow: 'hidden' }}>
        {/* ✅ Loading state */}
        {isLoading && (
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(2px)'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #5b24b7',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Cargando publicaciones...
              </Typography>
            </Box>
          </Box>
        )}

        {view === 'day' && (
          <DayView
            timeSlots={calendarData.timeSlots}
            posts={localPosts}
            currentTime={currentTime}
            currentDate={currentDate}
            onPostClick={handlePostClick}
            onAddPost={handleAddPost}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={(timeSlot) => handleDragOver(timeSlot)}
            onDrop={(timeSlot) => handleDrop(timeSlot)}
            draggedPost={draggedPost}
            dragTargetTime={dragTargetTime}
            getPostsForTimeSlot={getPostsForTimeSlot}
            isValidDropTarget={isValidDropTarget}
          />
        )}
        {view === 'week' && (
          <WeekView
            timeSlots={calendarData.timeSlots}
            days={calendarData.days}
            posts={localPosts}
            currentTime={currentTime}
            currentDate={currentDate}
            onPostClick={handlePostClick}
            onAddPost={handleAddPost}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={(timeSlot, day) => handleDragOver(timeSlot, day)}
            onDrop={(timeSlot, day) => handleDrop(timeSlot, day)}
            draggedPost={draggedPost}
            dragTargetTime={dragTargetTime}
            getPostsForTimeSlot={getPostsForTimeSlot}
            isValidDropTarget={isValidDropTarget}
          />
        )}
        {view === 'month' && (
          <MonthView
            days={calendarData.days}
            posts={localPosts}
            currentDate={currentDate}
            onPostClick={handlePostClick}
            onAddPost={handleAddPost}
            getPostsForDay={getPostsForDay}
          />
        )}
      </Box>

      {/* Diálogos */}
      {selectedPost && (
        <SocialMediaPostDialog
          open={isPostDialogOpen}
          post={selectedPost}
          onClose={() => setIsPostDialogOpen(false)}
          onEdit={handleEditPost}
          onDelete={() => selectedPost && handleDeletePost(selectedPost.id)}
        />
      )}

      {/* <NewPostModal
        open={isFormDialogOpen}
        post={selectedPost}
        onClose={() => {
          setIsFormDialogOpen(false);
          setSelectedPost(null);
        }}
        onSave={handleSavePost}
      /> */}

      <PostCreationDialog
        open={isFormDialogOpen}
        post={selectedPost}
        onClose={() => {
          setIsFormDialogOpen(false);
          setSelectedPost(null);
        }}
        onSave={handleSavePost}
      />
    </Box>
  );
};

export default SocialMediaScheduler; 