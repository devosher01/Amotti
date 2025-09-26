import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { IconPower } from '@tabler/icons-react';
import { AppState } from '@/store/store';
import { useAuth, useLogout } from '@/features/authV2/presentation/hooks/useAuth';
import { useState } from 'react';

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [showLogoutError, setShowLogoutError] = useState(false);

  const { user: currentUser, isLoading } = useAuth();
  const { logout, isLoading: isLoggingOut } = useLogout();

  const getUserInitials = () => {
    if (!currentUser?.firstName && !currentUser?.lastName) return 'U';
    const first = currentUser?.firstName?.charAt(0)?.toUpperCase() || '';
    const last = currentUser?.lastName?.charAt(0)?.toUpperCase() || '';
    return `${first}${last}` || 'U';
  };

  const getUserDisplayName = () => {
    if (currentUser?.firstName && currentUser?.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return currentUser?.email?.split('@')[0] || 'Usuario';
  };

  const userInitials = getUserInitials();
  const displayName = getUserDisplayName();

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutSuccess(true);
    } catch (error) {
      console.error('Error during logout:', error);
      setShowLogoutError(true);
    }
  };

  const getRoleDisplay = (role: string) => {
    return role === 'admin' ? 'Administrador' : 'Usuario';
  };

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt={displayName}
            src={currentUser?.profilePicture || "/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          >
            {userInitials}
          </Avatar>

          <Box>
            <Typography variant="h6">
              {displayName || 'Usuario'}
            </Typography>
            <Typography variant="caption">
              {currentUser ? getRoleDisplay(currentUser.role) : 'Cargando...'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title={isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"} placement="top">
              <IconButton
                color="primary"
                onClick={handleLogout}
                aria-label="logout"
                size="small"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <IconPower size="20" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}

      <Snackbar
        open={showLogoutSuccess}
        autoHideDuration={3000}
        onClose={() => setShowLogoutSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowLogoutSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Sesión cerrada exitosamente
        </Alert>
      </Snackbar>

      <Snackbar
        open={showLogoutError}
        autoHideDuration={5000}
        onClose={() => setShowLogoutError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowLogoutError(false)} severity="error" sx={{ width: '100%' }}>
          Error al cerrar sesión. Inténtalo de nuevo.
        </Alert>
      </Snackbar>
    </Box>
  );
};
