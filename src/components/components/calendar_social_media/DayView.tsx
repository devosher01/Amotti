"use client";

import React from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { format, isToday, isSameMinute, addMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { SocialMediaPostType } from "@/features/shared/components/calendar_social_media/types";
import SocialMediaPost from "@/features/shared/components/calendar_social_media/SocialMediaPost";


interface DayViewProps {
  timeSlots: Date[];
  posts: SocialMediaPostType[];
  currentTime: Date;
  currentDate: Date;
  onPostClick: (post: SocialMediaPostType) => void;
  onAddPost: (timeSlot?: Date) => void;
  onDragStart: (post: SocialMediaPostType) => void;
  onDragEnd: () => void;
  onDragOver: (timeSlot: Date) => void;
  onDrop: (timeSlot: Date) => void;
  draggedPost: SocialMediaPostType | null;
  dragTargetTime: Date | null;
  getPostsForTimeSlot: (timeSlot: Date, day?: Date) => SocialMediaPostType[];
  isValidDropTarget: (timeSlot: Date, day?: Date) => boolean;
}

const DayView: React.FC<DayViewProps> = ({
  timeSlots,
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
    if (!isToday(currentDate)) return null;
    
    // Encontrar el slot de tiempo correspondiente a la hora actual
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    const timeSlotIndex = timeSlots.findIndex(slot => {
      const slotHour = slot.getHours();
      const slotMinute = slot.getMinutes();
      
      // Determinar si la hora actual está en este slot
      const currentMinutes = currentHour * 60 + currentMinute;
      const slotMinutes = slotHour * 60 + slotMinute;
      const nextSlotMinutes = slotMinutes + 30;
      
      return currentMinutes >= slotMinutes && currentMinutes < nextSlotMinutes;
    });
    
    if (timeSlotIndex === -1) return null;
    
    // Calcular posición dentro del slot (0-60px)
    const slotHeight = 60;
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
      width: 96 + 1 + 64, // 96px hora + 1px borde + 64px columna (igual que WeekView)
      maxWidth: 96 + 1 + 64,
      minWidth: 96 + 1 + 64,
      mx: 'auto',
      background: theme.palette.background.paper,
      borderRadius: 0,
      boxShadow: '0 2px 8px rgba(91,36,183,0.04)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Header con horas */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '96px 64px', // 96px hora, 64px columna igual que WeekView
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.default,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderRadius: 0, // Sin redondeo
      }}>
        <Box sx={{ 
          p: 2, 
          borderRight: `1px solid ${theme.palette.divider}`,
          borderRadius: 0, // Sin redondeo
        }}>
          <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
            Hora
          </Typography>
        </Box>
        <Box sx={{ 
          p: 2,
          borderRadius: 0, // Sin redondeo
        }}>
          <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
            Publicaciones
          </Typography>
        </Box>
      </Box>

      {/* Contenido del scheduler */}
      <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }} className="scheduler-body">
        {/* Línea de tiempo actual */}
        {currentTimePosition !== null && (
          <Box
            sx={{
              position: 'absolute',
              left: '96px',
              width: '64px',
              right: 'unset',
              top: `${currentTimePosition}px`,
              height: '2px',
              background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 30%, #3b68df 70%, #4f46e5 100%)',
              zIndex: 5,
              pointerEvents: 'none',
              boxShadow: '0 0 8px rgba(91, 36, 183, 0.3), 0 1px 4px rgba(91, 36, 183, 0.15)',
              borderRadius: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '-4px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderRight: '4px solid #5b24b7',
                filter: 'drop-shadow(0 1px 2px rgba(91, 36, 183, 0.2))',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                right: '-2px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                background: '#5b24b7',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(91, 36, 183, 0.4)',
              }
            }}
          />
        )}

        {/* Slots de tiempo */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '96px 64px', // 96px hora, 64px columna igual que WeekView
          minHeight: '100%',
          borderRadius: 0, // Sin redondeo
        }}>
          {/* Columna de horas */}
          <Box sx={{ 
            borderRight: `1px solid ${theme.palette.divider}`,
            borderRadius: 0, // Sin redondeo
          }}>
            {timeSlots.map((timeSlot, index) => {
              // Determinar si esta casilla contiene la hora actual
              const isCurrentSlot = isToday(currentDate) && (() => {
                const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
                const slotMinutes = timeSlot.getHours() * 60 + timeSlot.getMinutes();
                const nextSlotMinutes = slotMinutes + 30;
                return currentMinutes >= slotMinutes && currentMinutes < nextSlotMinutes;
              })();
              
              return (
                <Box
                  key={timeSlot.toISOString()}
                  sx={{
                    height: 60,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isCurrentSlot ? theme.palette.primary.light + '20' : 'transparent',
                    position: 'relative',
                    borderRadius: 0, // Sin redondeo
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: isCurrentSlot ? 700 : 400,
                      color: isCurrentSlot ? theme.palette.primary.main : theme.palette.text.secondary,
                      fontSize: '0.75rem'
                    }}
                  >
                    {format(timeSlot, 'HH:mm')}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Columna de publicaciones */}
          <Box sx={{ borderRadius: 0 }}> {/* Sin redondeo */}
            {timeSlots.map((timeSlot, index) => {
              const slotPosts = getPostsForTimeSlot(timeSlot, currentDate);
              const isDragTarget = dragTargetTime && isSameMinute(timeSlot, dragTargetTime);
              // Determinar si esta casilla contiene la hora actual
              const isCurrentSlot = isToday(currentDate) && (() => {
                const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
                const slotMinutes = timeSlot.getHours() * 60 + timeSlot.getMinutes();
                const nextSlotMinutes = slotMinutes + 30;
                return currentMinutes >= slotMinutes && currentMinutes < nextSlotMinutes;
              })();

              return (
                <Box
                  key={timeSlot.toISOString()}
                  sx={{
                    height: 60,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: isDragTarget 
                      ? (isValidDropTarget && isValidDropTarget(timeSlot) 
                          ? theme.palette.primary.light + '20' 
                          : theme.palette.error.light + '20')
                      : isCurrentSlot 
                        ? theme.palette.primary.light + '10'
                        : 'transparent',
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: 0, // Sin redondeo
                    border: isDragTarget 
                      ? (isValidDropTarget && isValidDropTarget(timeSlot) 
                          ? `2px dashed ${theme.palette.primary.main}` 
                          : `2px dashed ${theme.palette.error.main}`)
                      : 'none',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover
                    }
                  }}
                  onClick={() => onAddPost(timeSlot)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    onDragOver(timeSlot);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    onDrop(timeSlot);
                  }}
                >
                  {/* Publicaciones del slot */}
                  <Box sx={{ p: 0.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {slotPosts.slice(0, 2).map((post) => (
                      <SocialMediaPost
                        key={post.id}
                        post={post}
                        onClick={() => onPostClick(post)}
                        onDragStart={() => onDragStart(post)}
                        onDragEnd={onDragEnd}
                      />
                    ))}
                    
                    {slotPosts.length > 2 && (
                      <Typography variant="caption" color="textSecondary" sx={{ px: 1 }}>
                        +{slotPosts.length - 2} más
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DayView; 