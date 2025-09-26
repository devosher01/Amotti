// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   IconButton,
//   Tooltip,
//   Stack,
//   Divider,
//   useTheme,
//   ToggleButtonGroup,
//   ToggleButton,
// } from "@mui/material";
// import {
//   IconChevronLeft,
//   IconChevronRight,
//   IconPlus,
//   IconCalendar,
//   IconDragDrop,
//   IconCalendarMonth,
//   IconCalendarWeek,
//   IconCalendarTime,
// } from "@tabler/icons-react";
// import { 
//   format, 
//   addDays, 
//   subDays, 
//   startOfDay, 
//   endOfDay, 
//   addMinutes, 
//   isSameDay, 
//   isToday, 
//   isSameMinute,
//   startOfWeek,
//   endOfWeek,
//   eachDayOfInterval,
//   addWeeks,
//   subWeeks,
//   startOfMonth,
//   endOfMonth,
//   addMonths,
//   subMonths,
// } from "date-fns";
// import { es } from "date-fns/locale";
// import { useSelector } from "@/store/hooks";
// import { AppState } from "@/store/store";
// import { professionalBranding } from "@/utils/theme/ProfessionalBranding";

// import DayView from "./DayView";
// import WeekView from "./WeekView";

// import "./SocialMediaScheduler.css";
// import { SocialMediaPostType } from "@/features/shared/components/calendar_social_media/types";
// import { defaultSocialMediaPosts } from "@/features/shared/components/calendar_social_media/data";
// import MonthView from "@/features/shared/components/calendar_social_media/MonthView";
// import NewPostModal from "@/features/shared/components/calendar_social_media/NewPostModal";
// import SocialMediaPostDialog from "@/features/shared/components/calendar_social_media/SocialMediaPostDialog";

// const SocialMediaScheduler = () => {
//   const theme = useTheme();
//   const customizer = useSelector((state: AppState) => state.customizer);
//   const isDark = customizer.activeMode === 'dark';
  
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [view, setView] = useState<'month' | 'week' | 'day'>('week'); // Vista semanal por defecto
//   const [posts, setPosts] = useState<SocialMediaPostType[]>(defaultSocialMediaPosts);
//   const [selectedPost, setSelectedPost] = useState<SocialMediaPostType | null>(null);
//   const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
//   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
//   const [draggedPost, setDraggedPost] = useState<SocialMediaPostType | null>(null);
//   const [dragTargetTime, setDragTargetTime] = useState<Date | null>(null);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Actualizar la hora actual cada minuto
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Actualizar cada minuto

//     return () => clearInterval(interval);
//   }, []);

//   // Generar intervalos de media hora para el día
//   const generateTimeSlots = (date: Date) => {
//     const start = startOfDay(date);
//     const end = endOfDay(date);
//     const slots: Date[] = [];
    
//     let currentSlot = start;
//     while (currentSlot <= end) {
//       slots.push(currentSlot);
//       currentSlot = addMinutes(currentSlot, 30);
//     }
    
//     return slots;
//   };

//   // Generar días de la semana
//   const generateWeekDays = (date: Date) => {
//     const start = startOfWeek(date, { weekStartsOn: 1 }); // Lunes como inicio
//     const end = endOfWeek(date, { weekStartsOn: 1 });
//     return eachDayOfInterval({ start, end });
//   };

//   // Generar días del mes
//   const generateMonthDays = (date: Date) => {
//     const start = startOfMonth(date);
//     const end = endOfMonth(date);
//     return eachDayOfInterval({ start, end });
//   };

//   // Generar datos según la vista
//   const calendarData = useMemo(() => {
//     const timeSlots = generateTimeSlots(currentDate);
    
//     switch (view) {
//       case 'day':
//         return {
//           timeSlots,
//           days: [currentDate],
//           type: 'day'
//         };
//       case 'week':
//         return {
//           timeSlots,
//           days: generateWeekDays(currentDate),
//           type: 'week'
//         };
//       case 'month':
//         return {
//           timeSlots,
//           days: generateMonthDays(currentDate),
//           type: 'month'
//         };
//       default:
//         return {
//           timeSlots,
//           days: generateWeekDays(currentDate),
//           type: 'week'
//         };
//     }
//   }, [currentDate, view]);

//   // Navegación del calendario
//   const goToPrevious = () => {
//     switch (view) {
//       case 'day':
//         setCurrentDate(prev => subDays(prev, 1));
//         break;
//       case 'week':
//         setCurrentDate(prev => subWeeks(prev, 1));
//         break;
//       case 'month':
//         setCurrentDate(prev => subMonths(prev, 1));
//         break;
//     }
//   };

//   const goToNext = () => {
//     switch (view) {
//       case 'day':
//         setCurrentDate(prev => addDays(prev, 1));
//         break;
//       case 'week':
//         setCurrentDate(prev => addWeeks(prev, 1));
//         break;
//       case 'month':
//         setCurrentDate(prev => addMonths(prev, 1));
//         break;
//     }
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   // Obtener posts para un intervalo de tiempo específico
//   const getPostsForTimeSlot = (timeSlot: Date, day?: Date) => {
//     return posts.filter(post => {
//       if (!post.scheduledTime) return false;
//       const postTime = new Date(post.scheduledTime);
//       if (day && !isSameDay(postTime, day)) return false;
//       return isSameMinute(postTime, timeSlot);
//     });
//   };

//   // Obtener posts para un día específico
//   const getPostsForDay = (day: Date) => {
//     return posts.filter(post => {
//       if (!post.scheduledTime) return false;
//       const postTime = new Date(post.scheduledTime);
//       return (
//         postTime.getFullYear() === day.getFullYear() &&
//         postTime.getMonth() === day.getMonth() &&
//         postTime.getDate() === day.getDate()
//       );
//     });
//   };

//   // Obtener posts para una hora específica
//   const getPostsForHour = (hour: number) => {
//     return posts.filter(post => {
//       if (!post.scheduledTime) return false;
//       const postTime = new Date(post.scheduledTime);
//       return postTime.getHours() === hour;
//     });
//   };

//   // Manejadores de eventos
//   const handlePostClick = (post: SocialMediaPostType) => {
//     setSelectedPost(post);
//     setIsPostDialogOpen(true);
//   };

//   const handleAddPost = (timeSlot?: Date) => {
//     if (timeSlot) {
//       setSelectedPost({
//         id: '',
//         title: '',
//         content: '',
//         platforms: ['facebook'],
//         scheduledTime: timeSlot,
//         status: 'draft',
//         mediaUrls: [],
//         hashtags: [],
//         mentions: []
//       });
//     }
//     setIsFormDialogOpen(true);
//   };

//   const handleSavePost = (postData: SocialMediaPostType) => {
//     if (postData.id) {
//       // Actualizar post existente
//       setPosts(prev => prev.map(post => 
//         post.id === postData.id ? postData : post
//       ));
//     } else {
//       // Crear nuevo post
//       const newPost = {
//         ...postData,
//         id: Date.now().toString()
//       };
//       setPosts(prev => [...prev, newPost]);
//     }
//     setIsFormDialogOpen(false);
//     setSelectedPost(null);
//   };

//   const handleDeletePost = (postId: string) => {
//     setPosts(prev => prev.filter(post => post.id !== postId));
//     setIsPostDialogOpen(false);
//     setSelectedPost(null);
//   };

//   const handleEditPost = () => {
//     setIsPostDialogOpen(false);
//     setIsFormDialogOpen(true);
//   };

//   // Funciones de drag & drop con validación de fecha/hora
//   const handleDragStart = (post: SocialMediaPostType) => {
//     setDraggedPost(post);
//   };

//   const handleDragOver = (timeSlot: Date, day?: Date) => {
//     // Crear la fecha/hora objetivo combinando el día y el slot de tiempo
//     let targetDateTime = timeSlot;
//     if (day) {
//       targetDateTime = new Date(day);
//       targetDateTime.setHours(timeSlot.getHours(), timeSlot.getMinutes(), 0, 0);
//     }
    
//     setDragTargetTime(targetDateTime);
//   };

//   const handleDrop = (targetTime: Date, day?: Date) => {
//     if (!draggedPost) return;
    
//     // Crear la fecha/hora objetivo combinando el día y el slot de tiempo
//     let finalTargetTime = targetTime;
//     if (day) {
//       finalTargetTime = new Date(day);
//       finalTargetTime.setHours(targetTime.getHours(), targetTime.getMinutes(), 0, 0);
//     } else {
//       // Normalizar segundos y milisegundos aunque no haya day
//       finalTargetTime = new Date(targetTime);
//       finalTargetTime.setSeconds(0, 0);
//     }
    
//     // Validar que la fecha/hora objetivo no sea anterior a la actual
//     const now = new Date();
//     if (finalTargetTime < now) {
//       console.warn('No se puede mover la publicación a una fecha/hora anterior a la actual');
//       setDraggedPost(null);
//       setDragTargetTime(null);
//       return;
//     }
    
//     const updatedPost = {
//       ...draggedPost,
//       scheduledTime: finalTargetTime
//     };
    
//     setPosts(prev => prev.map(post => 
//       post.id === draggedPost.id ? updatedPost : post
//     ));
    
//     setDraggedPost(null);
//     setDragTargetTime(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedPost(null);
//     setDragTargetTime(null);
//   };

//   // Función para verificar si un slot de tiempo es válido para drop
//   const isValidDropTarget = (timeSlot: Date, day?: Date) => {
//     let targetDateTime = timeSlot;
//     if (day) {
//       targetDateTime = new Date(day);
//       targetDateTime.setHours(timeSlot.getHours(), timeSlot.getMinutes(), 0, 0);
//     }
    
//     const now = new Date();
//     return targetDateTime >= now;
//   };

//   // Obtener posición de la hora actual
//   const getCurrentTimePosition = () => {
//     const now = new Date();
//     const startOfToday = startOfDay(now);
//     const minutesSinceStart = (now.getTime() - startOfToday.getTime()) / (1000 * 60);
//     return (minutesSinceStart / 1440) * 100; // 1440 minutos en un día
//   };

//   return (
//     <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       {/* Header del calendario */}
//       <Box
//         className="scheduler-header"
//         sx={{
//           background: professionalBranding.getCalendarHeaderBackground(isDark),
//           borderBottom: `1px solid ${professionalBranding.getCalendarHeaderBorder(isDark)}`,
//           padding: 2,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           // 🎨 Gradiente sutil púrpura en el header
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '3px', // Más grueso
//             background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 25%, #3b68df 50%, #4f46e5 75%, #6366f1 100%)', // Degradado púrpura-azul
//             opacity: 0.9, // Más visible
//           },
//           position: 'relative',
//         }}
//       >
//         {/* Navegación y controles */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton
//             onClick={goToPrevious}
//             className="scheduler-nav-button"
//             sx={{
//               color: '#5b24b7',
//               '&:hover': {
//                 background: 'rgba(91, 36, 183, 0.1)',
//                 color: '#5b24b7',
//                 transform: 'translateX(-2px)',
//                 transition: 'all 0.2s ease',
//               }
//             }}
//           >
//             <IconChevronLeft />
//           </IconButton>
          
//           <IconButton
//             onClick={goToNext}
//             className="scheduler-nav-button"
//             sx={{
//               color: '#5b24b7',
//               '&:hover': {
//                 background: 'rgba(91, 36, 183, 0.1)',
//                 color: '#5b24b7',
//                 transform: 'translateX(2px)',
//                 transition: 'all 0.2s ease',
//               }
//             }}
//           >
//             <IconChevronRight />
//           </IconButton>

//           <Typography
//             variant="h6"
//             sx={{
//               color: professionalBranding.getTextPrimary(isDark),
//               fontWeight: 600,
//               minWidth: 200,
//               textAlign: 'center',
//               // 🎨 Título con acento púrpura sutil
//               background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
//               backgroundClip: 'text',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             {format(currentDate, 'MMMM yyyy', { locale: es })}
//           </Typography>

//           <Tooltip title="Ir a hoy">
//             <IconButton
//               onClick={goToToday}
//               className="scheduler-nav-button"
//               sx={{
//                 color: '#5b24b7',
//                 '&:hover': {
//                   background: 'rgba(91, 36, 183, 0.1)',
//                   color: '#5b24b7',
//                   transform: 'scale(1.1)',
//                   transition: 'all 0.2s ease',
//                 }
//               }}
//             >
//               <IconCalendar />
//             </IconButton>
//           </Tooltip>
//         </Box>

//         {/* Controles de vista */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <ToggleButtonGroup
//             value={view}
//             exclusive
//             onChange={(e, newView) => newView && setView(newView)}
//             size="small"
//             sx={{
//               '& .MuiToggleButton-root': {
//                 color: professionalBranding.getCalendarToggleButtonText(isDark),
//                 borderColor: professionalBranding.getCalendarCellBorder(isDark),
//                 '&.Mui-selected': {
//                   background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
//                   color: 'white',
//                   borderColor: '#5b24b7',
//                   boxShadow: '0 2px 8px rgba(91, 36, 183, 0.3)',
//                 },
//                 '&:hover': {
//                   background: 'rgba(91, 36, 183, 0.1)',
//                   color: '#5b24b7',
//                   borderColor: '#5b24b7',
//                 }
//               }
//             }}
//           >
//             <ToggleButton value="day" className="scheduler-nav-button">
//               <IconCalendarTime size={16} />
//             </ToggleButton>
//             <ToggleButton value="week" className="scheduler-nav-button">
//               <IconCalendarWeek size={16} />
//             </ToggleButton>
//             <ToggleButton value="month" className="scheduler-nav-button">
//               <IconCalendarMonth size={16} />
//             </ToggleButton>
//           </ToggleButtonGroup>

//           <Tooltip title="Agregar post">
//             <IconButton
//               onClick={() => handleAddPost()}
//               className="add-post-button"
//               sx={{
//                 background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
//                 color: 'white',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #4a1e9a 0%, #3a4bc7 100%)',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 6px 16px rgba(91, 36, 183, 0.4)',
//                   transition: 'all 0.3s ease',
//                 }
//               }}
//             >
//               <IconPlus />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       {/* Contenido del calendario */}
//       <Box className="scheduler-body" sx={{ flex: 1, overflow: 'hidden' }}>
//         {view === 'day' && (
//           <DayView
//             timeSlots={calendarData.timeSlots}
//             posts={posts}
//             currentTime={currentTime}
//             currentDate={currentDate}
//             onPostClick={handlePostClick}
//             onAddPost={handleAddPost}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//             onDragOver={(timeSlot) => handleDragOver(timeSlot)}
//             onDrop={(timeSlot) => handleDrop(timeSlot)}
//             draggedPost={draggedPost}
//             dragTargetTime={dragTargetTime}
//             getPostsForTimeSlot={getPostsForTimeSlot}
//             isValidDropTarget={isValidDropTarget}
//           />
//         )}
//         {view === 'week' && (
//           <WeekView
//             timeSlots={calendarData.timeSlots}
//             days={calendarData.days}
//             posts={posts}
//             currentTime={currentTime}
//             currentDate={currentDate}
//             onPostClick={handlePostClick}
//             onAddPost={handleAddPost}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//             onDragOver={(timeSlot, day) => handleDragOver(timeSlot, day)}
//             onDrop={(timeSlot, day) => handleDrop(timeSlot, day)}
//             draggedPost={draggedPost}
//             dragTargetTime={dragTargetTime}
//             getPostsForTimeSlot={getPostsForTimeSlot}
//             isValidDropTarget={isValidDropTarget}
//           />
//         )}
//         {view === 'month' && (
//           <MonthView
//             days={calendarData.days}
//             posts={posts}
//             currentDate={currentDate}
//             onPostClick={handlePostClick}
//             onAddPost={handleAddPost}
//             getPostsForDay={getPostsForDay}
//           />
//         )}
//       </Box>

//       {/* Diálogos */}
//       {selectedPost && (
//         <SocialMediaPostDialog
//           open={isPostDialogOpen}
//           post={selectedPost}
//           onClose={() => setIsPostDialogOpen(false)}
//           onEdit={handleEditPost}
//           onDelete={() => selectedPost && handleDeletePost(selectedPost.id)}
//         />
//       )}

//       <NewPostModal
//         open={isFormDialogOpen}
//         post={selectedPost}
//         onClose={() => {
//           setIsFormDialogOpen(false);
//           setSelectedPost(null);
//         }}
//         onSave={handleSavePost}
//       />
//     </Box>
//   );
// };

// export default SocialMediaScheduler; 