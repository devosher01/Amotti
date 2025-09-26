// "use client";
// import React from 'react';
// import { Box, Typography, Avatar, IconButton, CircularProgress } from '@mui/material';
// import { Logout } from '@mui/icons-material';
// import { useUser, useUserDisplayName, useUserInitials } from '../contexts/UserContext';
// import { useLogout } from '../hooks/useAuth';

// interface UserProfileHeaderProps {
//   showLogoutButton?: boolean;
// }

// export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ 
//   showLogoutButton = true 
// }) => {
//   const { user, isLoading, error } = useUser();
//   const displayName = useUserDisplayName();
//   const initials = useUserInitials();
//   const { logout, isLoading: isLoggingOut } = useLogout();

//   if (isLoading) {
//     return (
//       <Box display="flex" alignItems="center" gap={2}>
//         <CircularProgress size={24} />
//         <Typography variant="body2" color="text.secondary">
//           Cargando usuario...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" alignItems="center" gap={2}>
//         <Avatar sx={{ bgcolor: 'error.main' }}>?</Avatar>
//         <Typography variant="body2" color="error">
//           Error al cargar usuario
//         </Typography>
//       </Box>
//     );
//   }

//   if (!user) {
//     return (
//       <Box display="flex" alignItems="center" gap={2}>
//         <Avatar>G</Avatar>
//         <Typography variant="body2" color="text.secondary">
//           Usuario no autenticado
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box display="flex" alignItems="center" gap={2}>
//       <Avatar sx={{ bgcolor: 'primary.main' }}>
//         {initials}
//       </Avatar>
      
//       <Box flex={1}>
//         <Typography variant="subtitle2" fontWeight="bold">
//           {displayName}
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           {user.email}
//         </Typography>
//       </Box>

//       {showLogoutButton && (
//         <IconButton 
//           onClick={logout}
//           disabled={isLoggingOut}
//           size="small"
//           color="inherit"
//           title="Cerrar sesión"
//         >
//           {isLoggingOut ? (
//             <CircularProgress size={16} />
//           ) : (
//             <Logout fontSize="small" />
//           )}
//         </IconButton>
//       )}
//     </Box>
//   );
// };
