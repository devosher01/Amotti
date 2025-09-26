"use client";

import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import { format, isToday, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { SocialMediaPostType } from "./types";

interface MonthViewProps {
  days: Date[];
  posts: SocialMediaPostType[];
  currentDate: Date;
  onPostClick: (post: SocialMediaPostType) => void;
  onAddPost: (timeSlot?: Date) => void;
  getPostsForDay: (day: Date) => SocialMediaPostType[];
}

const MonthView: React.FC<MonthViewProps> = ({
  days,
  posts,
  currentDate,
  onPostClick,
  onAddPost,
  getPostsForDay,
}) => {
  const theme = useTheme();

  // Generar semanas para el mes
  const weeks = React.useMemo(() => {
    const firstDay = days[0];
    const lastDay = days[days.length - 1];
    
    const start = startOfWeek(firstDay, { weekStartsOn: 1 });
    const end = endOfWeek(lastDay, { weekStartsOn: 1 });
    
    const allDays = eachDayOfInterval({ start, end });
    const weeks = [];
    
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }
    
    return weeks;
  }, [days]);

  // Nombres de los días de la semana
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <>
      {/* Header con días de la semana */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.default,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        {dayNames.map((dayName, index) => (
          <Box 
            key={dayName} 
            sx={{ 
              p: 2, 
              borderRight: index < 6 ? `1px solid ${theme.palette.divider}` : 'none',
              textAlign: 'center'
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
              {dayName}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Contenido del calendario */}
      <Box sx={{ flex: 1, overflow: 'auto', height: 'calc(100vh - 200px)' }} className="scheduler-body">
        {weeks.map((week, weekIndex) => (
          <Box 
            key={weekIndex}
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              minHeight: 120,
              borderBottom: weekIndex < weeks.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
            }}
          >
            {week.map((day, dayIndex) => {
              const dayPosts = getPostsForDay(day);
              const isCurrentMonth = days.some(d => isSameDay(d, day));
              const isTodayDate = isToday(day);
              
              return (
                <Box
                  key={day.toISOString()}
                  sx={{
                    p: 1,
                    borderRight: dayIndex < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                    bgcolor: isTodayDate ? theme.palette.primary.light + '10' : 'transparent',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover
                    },
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={() => onAddPost(day)}
                >
                  {/* Número del día */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isTodayDate ? 700 : 400,
                        color: isCurrentMonth 
                          ? (isTodayDate ? theme.palette.primary.main : theme.palette.text.primary)
                          : theme.palette.text.disabled,
                        fontSize: '0.875rem'
                      }}
                    >
                      {format(day, 'd')}
                    </Typography>
                    
                    {/* Indicador de publicaciones */}
                    {dayPosts.length > 0 && (
                      <Chip
                        label={dayPosts.length}
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.6rem',
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          minWidth: 16,
                          '& .MuiChip-label': {
                            px: 0.5
                          }
                        }}
                      />
                    )}
                  </Box>

                  {/* Publicaciones del día */}
                  <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    {dayPosts.slice(0, 3).map((post) => (
                      <Box
                        key={post.id}
                        sx={{
                          mb: 0.5,
                          p: 0.5,
                          borderRadius: 1,
                          bgcolor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: theme.palette.action.hover
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPostClick(post);
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontSize: '0.6rem',
                            lineHeight: 1.2,
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {post.title || "Sin título"}
                        </Typography>
                        
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.55rem',
                            display: 'block',
                          }}
                        >
                          {format(new Date(post.scheduledTime || ''), 'HH:mm')}
                        </Typography>
                      </Box>
                    ))}
                    
                    {dayPosts.length > 3 && (
                      <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                        +{dayPosts.length - 3} más
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MonthView; 