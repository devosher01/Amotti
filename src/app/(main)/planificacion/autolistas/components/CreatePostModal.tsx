// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Chip,
//   Stack,
//   Avatar,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Switch,
//   Divider,
//   Alert,
//   LinearProgress,
//   useTheme,
//   alpha,
//   Grid,
//   Card,
//   CardContent,
//   Autocomplete,
//   InputAdornment,
// } from "@mui/material";
// import {
//   IconX,
//   IconPhoto,
//   IconVideo,
//   IconLink,
//   IconBrandTwitter,
//   IconBrandFacebook,
//   IconBrandInstagram,
//   IconBrandLinkedin,
//   IconBrandTiktok,
//   IconBrandYoutube,
//   IconCalendarTime,
//   IconRobot,
//   IconSparkles,
//   IconEye,
//   IconSend,
//   IconHash,
//   IconAt,
//   IconUpload,
//   IconTrash,
// } from "@tabler/icons-react";
// import { styled } from "@mui/material/styles";

// // Styled Components
// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     borderRadius: 16,
//     maxWidth: 800,
//     width: '100%',
//     margin: 16,
//   },
// }));

// const PurpleButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)`,
//   color: 'white',
//   borderRadius: 12,
//   fontWeight: 600,
//   textTransform: 'none',
//   boxShadow: `0 4px 16px ${alpha('#5b24b7', 0.3)}`,
//   '&:hover': {
//     background: `linear-gradient(135deg, #4a1f9e 0%, #3649c7 100%)`,
//     boxShadow: `0 6px 20px ${alpha('#5b24b7', 0.4)}`,
//   },
// }));

// const SecondaryButton = styled(Button)(({ theme }) => ({
//   background: alpha('#5b24b7', 0.1),
//   color: '#5b24b7',
//   border: `1px solid ${alpha('#5b24b7', 0.2)}`,
//   borderRadius: 12,
//   fontWeight: 600,
//   textTransform: 'none',
//   '&:hover': {
//     background: alpha('#5b24b7', 0.15),
//     border: `1px solid ${alpha('#5b24b7', 0.3)}`,
//   },
// }));

// const MediaCard = styled(Card)(({ theme }) => ({
//   position: 'relative',
//   borderRadius: 8,
//   overflow: 'hidden',
//   border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
//   '&:hover': {
//     border: `1px solid ${alpha('#5b24b7', 0.3)}`,
//   },
// }));

// // Componente para iconos de plataformas
// const PlatformIcon = ({ platform, selected = false }: { platform: string; selected?: boolean }) => {
//   const iconProps = { size: 16, style: { color: 'white' } };
  
//   const platformIcons = {
//     twitter: <IconBrandTwitter {...iconProps} />,
//     facebook: <IconBrandFacebook {...iconProps} />,
//     instagram: <IconBrandInstagram {...iconProps} />,
//     linkedin: <IconBrandLinkedin {...iconProps} />,
//     tiktok: <IconBrandTiktok {...iconProps} />,
//     youtube: <IconBrandYoutube {...iconProps} />,
//   };

//   const platformColors = {
//     twitter: '#1DA1F2',
//     facebook: '#1877F2', 
//     instagram: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
//     linkedin: '#0A66C2',
//     tiktok: '#000000',
//     youtube: '#FF0000',
//   };

//   const platformNames = {
//     twitter: 'Twitter',
//     facebook: 'Facebook',
//     instagram: 'Instagram',
//     linkedin: 'LinkedIn',
//     tiktok: 'TikTok',
//     youtube: 'YouTube',
//   };

//   return (
//     <Chip
//       icon={
//         <Avatar
//           sx={{
//             width: 20,
//             height: 20,
//             background: platformColors[platform as keyof typeof platformColors] || '#666',
//           }}
//         >
//           {platformIcons[platform as keyof typeof platformIcons]}
//         </Avatar>
//       }
//       label={platformNames[platform as keyof typeof platformNames]}
//       variant={selected ? "filled" : "outlined"}
//       sx={{
//         borderColor: selected ? '#5b24b7' : alpha('#5b24b7', 0.3),
//         backgroundColor: selected ? alpha('#5b24b7', 0.1) : 'transparent',
//         color: selected ? '#5b24b7' : 'text.primary',
//         fontWeight: selected ? 600 : 400,
//         '&:hover': {
//           backgroundColor: alpha('#5b24b7', 0.1),
//           borderColor: '#5b24b7',
//         },
//       }}
//     />
//   );
// };

// interface CreatePostModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (postData: any) => void;
//   availablePlatforms?: string[];
//   editingPost?: any;
// }

// const availableHashtags = [
//   'motivacion', 'exito', 'felicidad', 'desafios', 'oportunidades', 'potencial',
//   'accion', 'momento', 'perfecto', 'marketing', 'social', 'contenido',
//   'estrategia', 'branding', 'engagement', 'creatividad', 'inspiracion'
// ];

// const availableMentions = [
//   '@empresa', '@cliente1', '@influencer', '@socio', '@experto'
// ];

// export default function CreatePostModal({ 
//   open, 
//   onClose, 
//   onSave, 
//   availablePlatforms = ['twitter', 'facebook', 'instagram', 'linkedin'],
//   editingPost 
// }: CreatePostModalProps) {
//   const theme = useTheme();
  
//   // Estados del formulario
//   const [content, setContent] = useState(editingPost?.content || '');
//   const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
//     editingPost?.platforms || availablePlatforms
//   );
//   const [hashtags, setHashtags] = useState<string[]>(editingPost?.hashtags || []);
//   const [mentions, setMentions] = useState<string[]>(editingPost?.mentions || []);
//   const [media, setMedia] = useState<any[]>(editingPost?.media || []);
//   const [schedulePost, setSchedulePost] = useState(false);
//   const [scheduledDate, setScheduledDate] = useState('');
//   const [scheduledTime, setScheduledTime] = useState('');
//   const [useAI, setUseAI] = useState(false);
//   const [aiPrompt, setAiPrompt] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Cálculo de caracteres
//   const maxChars = 280; // Twitter limit
//   const currentChars = content.length + hashtags.join(' ').length + mentions.join(' ').length;

//   const handlePlatformToggle = (platform: string) => {
//     setSelectedPlatforms(prev => 
//       prev.includes(platform) 
//         ? prev.filter(p => p !== platform)
//         : [...prev, platform]
//     );
//   };

//   const handleAddMedia = (type: 'image' | 'video' | 'link') => {
//     // Simulación de upload
//     const newMedia = {
//       id: Date.now().toString(),
//       type,
//       url: type === 'link' ? 'https://example.com' : '/placeholder-media.jpg',
//       thumbnail: type === 'video' ? '/placeholder-thumbnail.jpg' : undefined,
//       alt: type === 'image' ? 'Imagen del post' : undefined,
//     };
//     setMedia(prev => [...prev, newMedia]);
//   };

//   const handleRemoveMedia = (mediaId: string) => {
//     setMedia(prev => prev.filter(m => m.id !== mediaId));
//   };

//   const handleGenerateWithAI = async () => {
//     if (!aiPrompt.trim()) return;
    
//     setLoading(true);
//     // Simulación de llamada a API de IA
//     setTimeout(() => {
//       setContent(`🌟 ${aiPrompt} - Contenido generado con IA para maximizar el engagement en redes sociales. ¡Comparte tu experiencia en los comentarios!`);
//       setHashtags(['IA', 'contenido', 'marketing']);
//       setLoading(false);
//     }, 2000);
//   };

//   const handleSave = () => {
//     const postData = {
//       content,
//       platforms: selectedPlatforms,
//       hashtags,
//       mentions,
//       media,
//       scheduledAt: schedulePost ? new Date(`${scheduledDate}T${scheduledTime}`) : undefined,
//     };
    
//     onSave(postData);
//     onClose();
//   };

//   const handleClose = () => {
//     // Reset form
//     setContent('');
//     setSelectedPlatforms(availablePlatforms);
//     setHashtags([]);
//     setMentions([]);
//     setMedia([]);
//     setSchedulePost(false);
//     setScheduledDate('');
//     setScheduledTime('');
//     setUseAI(false);
//     setAiPrompt('');
//     onClose();
//   };

//   return (
//     <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={{ p: 3, pb: 1 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="h5" fontWeight={700}>
//             {editingPost ? 'Editar Post' : 'Crear Nuevo Post'}
//           </Typography>
//           <IconButton onClick={handleClose} sx={{ color: 'text.secondary' }}>
//             <IconX size={20} />
//           </IconButton>
//         </Stack>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         <Stack spacing={3}>
//           {/* Generador con IA */}
//           <Card 
//             sx={{ 
//               border: `1px solid ${alpha('#5b24b7', 0.2)}`,
//               bgcolor: alpha('#5b24b7', 0.02),
//             }}
//           >
//             <CardContent sx={{ p: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
//                 <Avatar sx={{ bgcolor: alpha('#5b24b7', 0.1), color: '#5b24b7' }}>
//                   <IconRobot size={20} />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Generar con IA
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Deja que la IA te ayude a crear contenido atractivo
//                   </Typography>
//                 </Box>
//                 <FormControlLabel
//                   control={
//                     <Switch 
//                       checked={useAI} 
//                       onChange={(e) => setUseAI(e.target.checked)}
//                       sx={{
//                         '& .MuiSwitch-thumb': {
//                           backgroundColor: '#5b24b7',
//                         },
//                         '& .MuiSwitch-track': {
//                           backgroundColor: alpha('#5b24b7', 0.3),
//                         },
//                       }}
//                     />
//                   }
//                   label=""
//                 />
//               </Stack>

//               {useAI && (
//                 <Stack spacing={2}>
//                   <TextField
//                     fullWidth
//                     placeholder="Describe el tipo de contenido que quieres generar..."
//                     value={aiPrompt}
//                     onChange={(e) => setAiPrompt(e.target.value)}
//                     multiline
//                     rows={2}
//                     variant="outlined"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         '&.Mui-focused fieldset': {
//                           borderColor: '#5b24b7',
//                         },
//                       },
//                     }}
//                   />
//                   <SecondaryButton 
//                     startIcon={<IconSparkles />}
//                     onClick={handleGenerateWithAI}
//                     disabled={!aiPrompt.trim() || loading}
//                     fullWidth
//                   >
//                     {loading ? 'Generando...' : 'Generar Contenido'}
//                   </SecondaryButton>
//                   {loading && <LinearProgress sx={{ borderRadius: 1 }} />}
//                 </Stack>
//               )}
//             </CardContent>
//           </Card>

//           {/* Contenido del post */}
//           <Box>
//             <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
//               Contenido del Post
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               placeholder="Escribe tu contenido aquí..."
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               variant="outlined"
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#5b24b7',
//                   },
//                 },
//               }}
//             />
            
//             {/* Contador de caracteres */}
//             <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
//               <Typography variant="caption" color="text.secondary">
//                 {currentChars}/{maxChars} caracteres
//               </Typography>
//               <LinearProgress 
//                 variant="determinate" 
//                 value={(currentChars / maxChars) * 100}
//                 sx={{ 
//                   width: 100, 
//                   height: 4,
//                   borderRadius: 2,
//                   backgroundColor: alpha('#5b24b7', 0.1),
//                   '& .MuiLinearProgress-bar': {
//                     backgroundColor: currentChars > maxChars ? '#EF4444' : '#5b24b7',
//                   },
//                 }}
//               />
//             </Stack>
//           </Box>

//           {/* Hashtags y Menciones */}
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
//                 Hashtags
//               </Typography>
//               <Autocomplete
//                 multiple
//                 options={availableHashtags}
//                 value={hashtags}
//                 onChange={(event, newValue) => setHashtags(newValue)}
//                 freeSolo
//                 renderTags={(value, getTagProps) =>
//                   value.map((option, index) => (
//                     <Chip
//                       key={index}
//                       variant="outlined"
//                       label={`#${option}`}
//                       {...getTagProps({ index })}
//                       sx={{
//                         borderColor: alpha('#5b24b7', 0.3),
//                         color: '#5b24b7',
//                       }}
//                     />
//                   ))
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     placeholder="Agregar hashtags..."
//                     InputProps={{
//                       ...params.InputProps,
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <IconHash size={16} color="#5b24b7" />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
//                 Menciones
//               </Typography>
//               <Autocomplete
//                 multiple
//                 options={availableMentions}
//                 value={mentions}
//                 onChange={(event, newValue) => setMentions(newValue)}
//                 freeSolo
//                 renderTags={(value, getTagProps) =>
//                   value.map((option, index) => (
//                     <Chip
//                       key={index}
//                       variant="outlined"
//                       label={option}
//                       {...getTagProps({ index })}
//                       sx={{
//                         borderColor: alpha('#5b24b7', 0.3),
//                         color: '#5b24b7',
//                       }}
//                     />
//                   ))
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     placeholder="Agregar menciones..."
//                     InputProps={{
//                       ...params.InputProps,
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <IconAt size={16} color="#5b24b7" />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>

//           {/* Selección de plataformas */}
//           <Box>
//             <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
//               Plataformas de Publicación
//             </Typography>
//             <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
//               {availablePlatforms.map((platform) => (
//                 <Box
//                   key={platform}
//                   onClick={() => handlePlatformToggle(platform)}
//                   sx={{ cursor: 'pointer' }}
//                 >
//                   <PlatformIcon 
//                     platform={platform} 
//                     selected={selectedPlatforms.includes(platform)} 
//                   />
//                 </Box>
//               ))}
//             </Stack>
//           </Box>

//           {/* Media */}
//           <Box>
//             <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
//               Contenido Multimedia
//             </Typography>
            
//             <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//               <SecondaryButton 
//                 startIcon={<IconPhoto />}
//                 onClick={() => handleAddMedia('image')}
//                 size="small"
//               >
//                 Imagen
//               </SecondaryButton>
//               <SecondaryButton 
//                 startIcon={<IconVideo />}
//                 onClick={() => handleAddMedia('video')}
//                 size="small"
//               >
//                 Video
//               </SecondaryButton>
//               <SecondaryButton 
//                 startIcon={<IconLink />}
//                 onClick={() => handleAddMedia('link')}
//                 size="small"
//               >
//                 Enlace
//               </SecondaryButton>
//             </Stack>

//             {media.length > 0 && (
//               <Grid container spacing={1}>
//                 {media.map((item) => (
//                   <Grid item xs={6} sm={4} key={item.id}>
//                     <MediaCard>
//                       <Box sx={{ position: 'relative', height: 80, bgcolor: 'grey.100' }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleRemoveMedia(item.id)}
//                           sx={{
//                             position: 'absolute',
//                             top: 4,
//                             right: 4,
//                             bgcolor: 'rgba(0,0,0,0.5)',
//                             color: 'white',
//                             '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                           }}
//                         >
//                           <IconTrash size={12} />
//                         </IconButton>
//                         <Box 
//                           sx={{ 
//                             height: '100%', 
//                             display: 'flex', 
//                             alignItems: 'center', 
//                             justifyContent: 'center',
//                             color: 'text.secondary'
//                           }}
//                         >
//                           {item.type === 'image' && <IconPhoto />}
//                           {item.type === 'video' && <IconVideo />}
//                           {item.type === 'link' && <IconLink />}
//                         </Box>
//                       </Box>
//                       <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
//                         {item.type}
//                       </Typography>
//                     </MediaCard>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </Box>

//           {/* Programación */}
//           <Box>
//             <FormControlLabel
//               control={
//                 <Switch 
//                   checked={schedulePost} 
//                   onChange={(e) => setSchedulePost(e.target.checked)}
//                   sx={{
//                     '& .MuiSwitch-thumb': {
//                       backgroundColor: '#5b24b7',
//                     },
//                     '& .MuiSwitch-track': {
//                       backgroundColor: alpha('#5b24b7', 0.3),
//                     },
//                   }}
//                 />
//               }
//               label={
//                 <Stack direction="row" alignItems="center" spacing={1}>
//                   <IconCalendarTime size={16} />
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Programar Publicación
//                   </Typography>
//                 </Stack>
//               }
//             />

//             {schedulePost && (
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     type="date"
//                     label="Fecha"
//                     value={scheduledDate}
//                     onChange={(e) => setScheduledDate(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     type="time"
//                     label="Hora"
//                     value={scheduledTime}
//                     onChange={(e) => setScheduledTime(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//           </Box>
//         </Stack>
//       </DialogContent>

//       <DialogActions sx={{ p: 3, pt: 1 }}>
//         <Stack direction="row" spacing={2} width="100%">
//           <SecondaryButton startIcon={<IconEye />} onClick={() => {}}>
//             Vista Previa
//           </SecondaryButton>
          
//           <Box sx={{ flex: 1 }} />
          
//           <Button onClick={handleClose} color="inherit">
//             Cancelar
//           </Button>
          
//           <PurpleButton 
//             startIcon={<IconSend />}
//             onClick={handleSave}
//             disabled={!content.trim() || selectedPlatforms.length === 0}
//           >
//             {editingPost ? 'Actualizar' : 'Crear Post'}
//           </PurpleButton>
//         </Stack>
//       </DialogActions>
//     </StyledDialog>
//   );
// } 