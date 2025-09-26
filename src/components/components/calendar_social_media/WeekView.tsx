"use client";

import React from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { format, isToday, isSameMinute, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { SocialMediaPostType } from "@/features/shared/components/calendar_social_media/types";
import SocialMediaPost from "@/features/shared/components/calendar_social_media/SocialMediaPost";


interface WeekViewProps {
  timeSlots: Date[];
  days: Date[];
  posts: SocialMediaPostType[];
  currentTime: Date;
  currentDate: Date;
  onPostClick: (post: SocialMediaPostType) => void;
  onAddPost: (timeSlot?: Date) => void;
  onDragStart: (post: SocialMediaPostType) => void;
  onDragEnd: () => void;
  onDragOver: (timeSlot: Date, day?: Date) => void;
  onDrop: (timeSlot: Date, day?: Date) => void;
  draggedPost: SocialMediaPostType | null;
  dragTargetTime: Date | null;
  getPostsForTimeSlot: (timeSlot: Date, day?: Date) => SocialMediaPostType[];
  isValidDropTarget: (timeSlot: Date, day?: Date) => boolean;
}

const WeekView: React.FC<WeekViewProps> = ({
  timeSlots,
  days,
  posts,
  currentTime,
  currentDate,
  onPostClick,
  onAddPost,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  draggedPost,
  dragTargetTime,
  getPostsForTimeSlot,
  isValidDropTarget,
}) => {
  const theme = useTheme();

  // Calcular posición de la línea de tiempo actual
  const getCurrentTimePosition = () => {
    const today = days.find(day => isToday(day));
    if (!today) return null;
    
    // Calcular la posición basada en los slots de tiempo disponibles
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    // Encontrar el índice del slot de tiempo más cercano
    const timeSlotIndex = timeSlots.findIndex(slot => {
      const slotHour = slot.getHours();
      const slotMinute = slot.getMinutes();
      
      // Si es exactamente la hora del slot, o está dentro del rango de 30 minutos
      if (slotHour === currentHour) {
        if (slotMinute === 0 && currentMinute < 30) return true;
        if (slotMinute === 30 && currentMinute >= 30) return true;
      }
      
      return false;
    });
    
    if (timeSlotIndex === -1) return null;
    
    // Calcular posición dentro del slot (0-64px)
    const slotHeight = 64;
    let positionInSlot = 0;
    
    const currentSlot = timeSlots[timeSlotIndex];
    const slotMinute = currentSlot.getMinutes();
    
    if (slotMinute === 0) {
      // Slot de hora completa (XX:00), calcular posición basada en minutos (0-29)
      positionInSlot = Math.min(currentMinute, 29) / 30 * slotHeight;
    } else {
      // Slot de media hora (XX:30), calcular posición basada en minutos (30-59)
      positionInSlot = Math.max(0, currentMinute - 30) / 30 * slotHeight;
    }
    
    return timeSlotIndex * slotHeight + positionInSlot;
  };

  const currentTimePosition = getCurrentTimePosition();

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(91, 36, 183, 0.01) 0%, rgba(64, 87, 217, 0.01) 100%)',
    }}>
      {/* Header con días - Sistema de grid consistente pero más compacto */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: '96px repeat(7, 1fr)', // 96px para alineación perfecta con 8px sistema
          borderBottom: `2px solid rgba(91, 36, 183, 0.15)`,
          bgcolor: 'rgba(91, 36, 183, 0.02)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          height: 64, // Reducido de 88 a 64px
          flexShrink: 0,
          // Gradiente sutil de conexión
          background: `
            linear-gradient(135deg, rgba(91, 36, 183, 0.03) 0%, rgba(64, 87, 217, 0.02) 100%),
            linear-gradient(90deg, transparent 0%, rgba(91, 36, 183, 0.05) 96px, transparent 96px)
          `,
          // Sombra sutil para profundidad
          boxShadow: '0 2px 8px rgba(91, 36, 183, 0.08)',
        }}
      >
        {/* Columna de "Hora" - Centrado y con jerarquía clara */}
        <Box 
          sx={{ 
            padding: '12px 8px', // Reducido de 16px a 12px
            borderRight: `1px solid rgba(91, 36, 183, 0.2)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(91, 36, 183, 0.08) 0%, rgba(64, 87, 217, 0.06) 100%)',
            position: 'relative',
            // Indicador visual sutil
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '24px', // Reducido de 32px a 24px
              background: 'linear-gradient(180deg, #5b24b7 0%, #4057d9 100%)',
              borderRadius: 0, // Sin redondeo
            }
          }}
        >
          <Typography 
            variant="overline"
            sx={{ 
              color: '#5b24b7', 
              fontSize: '0.65rem', // Reducido de 0.7rem
              fontWeight: 700,
              letterSpacing: '0.5px',
              lineHeight: 1,
              mb: 0.25, // Reducido de 0.5
            }}
          >
            HORA
          </Typography>
          <Typography 
            variant="caption"
            sx={{ 
              color: 'rgba(91, 36, 183, 0.7)', 
              fontSize: '0.6rem', // Reducido de 0.65rem
              fontWeight: 500,
            }}
          >
            GMT-5
          </Typography>
        </Box>
        
        {/* Columnas de días - Jerarquía visual clara */}
        {days.map((day, index) => {
          const isCurrentDay = isToday(day);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6; // Domingo o Sábado
          
          return (
            <Box 
              key={day.toISOString()} 
              sx={{ 
                padding: '12px 8px', // Reducido de 16px a 12px para coincidir con header
                borderRight: index < days.length - 1 ? `1px solid rgba(91, 36, 183, 0.1)` : 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px', // Reducido de 8px a 6px
                position: 'relative',
                // Background adaptativo según estado
                background: isCurrentDay 
                  ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.15) 0%, rgba(64, 87, 217, 0.12) 100%)'
                  : isWeekend
                    ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.04) 0%, rgba(64, 87, 217, 0.03) 100%)'
                    : 'linear-gradient(135deg, rgba(91, 36, 183, 0.02) 0%, rgba(64, 87, 217, 0.02) 100%)',
                // Indicador para día actual
                ...(isCurrentDay && {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '24px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 100%)',
                    borderRadius: 0, // Sin redondeo
                  }
                }),
                // Hover effect sutil
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: isCurrentDay 
                    ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.18) 0%, rgba(64, 87, 217, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(91, 36, 183, 0.06) 0%, rgba(64, 87, 217, 0.05) 100%)',
                }
              }}
            >
              {/* Día de la semana */}
              <Typography 
                variant="overline"
                sx={{ 
                  color: isCurrentDay ? '#5b24b7' : isWeekend ? 'rgba(91, 36, 183, 0.6)' : theme.palette.text.secondary,
                  fontSize: '0.65rem', // Reducido de 0.7rem
                  fontWeight: isCurrentDay ? 700 : 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {format(day, 'EEE', { locale: es })}
              </Typography>
              
              {/* Número del día */}
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: isCurrentDay ? 800 : isWeekend ? 400 : 600,
                  color: isCurrentDay ? '#5b24b7' : isWeekend ? 'rgba(91, 36, 183, 0.6)' : theme.palette.text.primary,
                  fontSize: isCurrentDay ? '1.25rem' : '1.1rem', // Reducido de 1.5rem y 1.25rem
                  lineHeight: 1,
                  // Sombra sutil para el día actual
                  ...(isCurrentDay && {
                    textShadow: '0 2px 4px rgba(91, 36, 183, 0.2)',
                  }),
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {format(day, 'd')}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Contenido principal del calendario */}
      <Box 
        sx={{ 
          flex: 1, 
          overflow: 'auto', 
          position: 'relative',
          // Scroll suave y estilizado
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(91, 36, 183, 0.05)',
            borderRadius: 0, // Sin redondeo
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
            borderRadius: 0, // Sin redondeo
            '&:hover': {
              background: 'linear-gradient(135deg, #4a1f9e 0%, #3649c7 100%)',
            }
          },
        }}
      >
        {/* Grid principal con alineación perfecta */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '96px repeat(7, minmax(0, 1fr))', // Forzar ancho igual
          minHeight: '100%',
        }}>
          
          {/* Columna de tiempo - Alineación perfecta */}
          <Box sx={{ 
            borderRight: `1px solid rgba(91, 36, 183, 0.2)`,
            background: 'linear-gradient(135deg, rgba(91, 36, 183, 0.03) 0%, rgba(64, 87, 217, 0.02) 100%)',
          }}>
            {timeSlots.map((timeSlot, index) => {
              // Determinar si esta casilla contiene la hora actual para cualquier día de la semana que sea hoy
              const isCurrentSlot = days.some(day => isToday(day)) && (() => {
                const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
                const slotMinutes = timeSlot.getHours() * 60 + timeSlot.getMinutes();
                const nextSlotMinutes = slotMinutes + 30;
                return currentMinutes >= slotMinutes && currentMinutes < nextSlotMinutes;
              })();
              const isMainHour = timeSlot.getMinutes() === 0; // Horas principales (sin :30)
              
              return (
                <Box
                  key={timeSlot.toISOString()}
                  sx={{
                    height: '64px', // Múltiplo de 8px (8 * 8)
                    borderBottom: `1px solid rgba(91, 36, 183, ${isMainHour ? '0.15' : '0.08'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    // Background diferenciado para hora actual
                    background: isCurrentSlot 
                      ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.12) 0%, rgba(64, 87, 217, 0.10) 100%)'
                      : 'transparent',
                    // Indicador lateral para hora actual
                    borderLeft: isCurrentSlot ? '4px solid #5b24b7' : 'none',
                    paddingLeft: isCurrentSlot ? '4px' : '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    // Hover effect
                    '&:hover': {
                      background: isCurrentSlot 
                        ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.15) 0%, rgba(64, 87, 217, 0.12) 100%)'
                        : 'rgba(91, 36, 183, 0.04)',
                      borderLeft: '2px solid rgba(91, 36, 183, 0.4)',
                      paddingLeft: '6px',
                    }
                  }}
                >
                  <Typography
                    variant={isMainHour ? "subtitle2" : "caption"}
                    sx={{
                      fontWeight: isCurrentSlot ? 700 : isMainHour ? 600 : 500,
                      color: isCurrentSlot ? '#5b24b7' : isMainHour ? theme.palette.text.primary : theme.palette.text.secondary,
                      fontSize: isMainHour ? '0.8rem' : '0.7rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: isMainHour ? '0.25px' : '0px',
                      // Sombra sutil para hora actual
                      ...(isCurrentSlot && {
                        textShadow: '0 1px 2px rgba(91, 36, 183, 0.2)',
                      }),
                    }}
                  >
                    {format(timeSlot, 'HH:mm')}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Columnas de días - Grid perfecto */}
          {days.map((day, dayIndex) => (
            <Box 
              key={day.toISOString()} 
              sx={{ 
                borderRight: dayIndex < days.length - 1 ? `1px solid rgba(91, 36, 183, 0.1)` : 'none',
                background: isToday(day) ? 'rgba(91, 36, 183, 0.02)' : 'transparent',
                minWidth: 0,
                overflow: 'hidden',
              }}
            >
              {timeSlots.map((timeSlot, timeIndex) => {
                const slotPosts = getPostsForTimeSlot(timeSlot, day);
                // El target visual debe mostrarse si el dragTargetTime coincide exactamente con este slot y día
                const isDragTarget = dragTargetTime &&
                  dragTargetTime.getFullYear() === day.getFullYear() &&
                  dragTargetTime.getMonth() === day.getMonth() &&
                  dragTargetTime.getDate() === day.getDate() &&
                  dragTargetTime.getHours() === timeSlot.getHours() &&
                  dragTargetTime.getMinutes() === timeSlot.getMinutes();
                // Determinar si esta casilla contiene la hora actual
                const isCurrentSlot = isToday(day) && (() => {
                  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
                  const slotMinutes = timeSlot.getHours() * 60 + timeSlot.getMinutes();
                  const nextSlotMinutes = slotMinutes + 30;
                  return currentMinutes >= slotMinutes && currentMinutes < nextSlotMinutes;
                })();
                const isMainHour = timeSlot.getMinutes() === 0;

                return (
                  <Box
                    key={`${day.toISOString()}-${timeSlot.toISOString()}`}
                    sx={{
                      height: '64px',
                      borderBottom: `1px solid rgba(91, 36, 183, ${isMainHour ? '0.15' : '0.08'})`,
                      position: 'relative',
                      cursor: draggedPost ? (isValidDropTarget(timeSlot, day) ? 'grab' : 'not-allowed') : 'pointer',
                      opacity: draggedPost && !isValidDropTarget(timeSlot, day) ? 0.5 : 1,
                      background: isDragTarget
                        ? (isValidDropTarget(timeSlot, day)
                            ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.22) 0%, rgba(64, 87, 217, 0.18) 100%)'
                            : 'rgba(244, 67, 54, 0.12)')
                        : isCurrentSlot
                          ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.08) 0%, rgba(64, 87, 217, 0.06) 100%)'
                          : 'transparent',
                      borderLeft: isCurrentSlot ? '3px solid rgba(91, 36, 183, 0.5)' : 'none',
                      border: isDragTarget
                        ? (isValidDropTarget(timeSlot, day)
                            ? '2px dashed #5b24b7'
                            : '2px dashed #f44336')
                        : 'none',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: draggedPost && !isValidDropTarget(timeSlot, day)
                          ? 'rgba(244, 67, 54, 0.1)'
                          : isDragTarget
                            ? 'linear-gradient(135deg, rgba(91, 36, 183, 0.25) 0%, rgba(64, 87, 217, 0.22) 100%)'
                            : 'linear-gradient(135deg, rgba(91, 36, 183, 0.06) 0%, rgba(64, 87, 217, 0.04) 100%)',
                        borderLeft: draggedPost && !isValidDropTarget(timeSlot, day)
                          ? '2px solid rgba(244, 67, 54, 0.5)'
                          : '2px solid rgba(91, 36, 183, 0.3)',
                        transform: draggedPost && !isValidDropTarget(timeSlot, day)
                          ? 'none'
                          : 'translateX(1px)',
                      },
                    }}
                    onClick={() => onAddPost(timeSlot)}
                    onDragOver={e => {
                      e.preventDefault();
                      if (draggedPost) onDragOver(timeSlot, day);
                    }}
                    onDrop={e => {
                      e.preventDefault();
                      if (draggedPost && isValidDropTarget(timeSlot, day)) {
                        onDrop(timeSlot, day);
                      }
                    }}
                  >
                    {/* Container de posts con espaciado perfecto */}
                    <Box sx={{ 
                      padding: '8px', // Sistema 8px
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      gap: '4px', // Sistema 8px / 2
                      minWidth: 0,
                    }}>
                      {slotPosts.slice(0, 1).map((post) => (
                        <SocialMediaPost
                          key={post.id}
                          post={post}
                          onClick={() => onPostClick(post)}
                          onDragStart={() => onDragStart(post)}
                          onDragEnd={onDragEnd}
                        />
                      ))}
                      
                      {/* Indicador "más posts" refinado */}
                      {slotPosts.length > 1 && (
                        <Box 
                          sx={{
                            background: 'linear-gradient(135deg, rgba(91, 36, 183, 0.12) 0%, rgba(64, 87, 217, 0.10) 100%)',
                            color: '#5b24b7',
                            border: '1px solid rgba(91, 36, 183, 0.2)',
                            fontSize: '0.65rem',
                            padding: '4px 8px', // Sistema 8px
                            borderRadius: 0, // Sin redondeo
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontWeight: 600,
                            fontFamily: 'Inter, system-ui, sans-serif',
                            letterSpacing: '0.25px',
                            backdropFilter: 'blur(4px)',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, rgba(91, 36, 183, 0.18) 0%, rgba(64, 87, 217, 0.15) 100%)',
                              borderColor: '#5b24b7',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 8px rgba(91, 36, 183, 0.2)',
                            }
                          }}
                        >
                          +{slotPosts.length - 1} más
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Línea de tiempo actual - Integrada naturalmente */}
        {currentTimePosition !== null && (
          <Box
            sx={{
              position: 'absolute',
              left: '96px', // Alineado con grid
              right: 0,
              top: `${currentTimePosition}px`,
              height: '2px', // Reducido de 3px a 2px
              background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 30%, #3b68df 70%, #4f46e5 100%)',
              zIndex: 15,
              pointerEvents: 'none',
              boxShadow: '0 0 8px rgba(91, 36, 183, 0.3), 0 1px 4px rgba(91, 36, 183, 0.15)', // Sombra más sutil
              borderRadius: 0, // Sin redondeo
              // Sin animación - línea fija
              // Indicador de flecha refinado
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '-4px', // Reducido de -6px a -4px
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '4px solid transparent', // Reducido de 6px a 4px
                borderBottom: '4px solid transparent',
                borderRight: '4px solid #5b24b7', // Reducido de 6px a 4px
                filter: 'drop-shadow(0 1px 2px rgba(91, 36, 183, 0.2))', // Sombra más sutil
              },
              // Punto final más sutil
              '&::after': {
                content: '""',
                position: 'absolute',
                right: '-2px', // Reducido de -3px a -2px
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px', // Reducido de 6px a 4px
                height: '4px',
                background: '#5b24b7',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(91, 36, 183, 0.4)', // Sombra más sutil
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default WeekView; 