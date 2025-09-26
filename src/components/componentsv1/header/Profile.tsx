import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import * as dropdownData from './data';

import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import Image from 'next/image';
import { useAuth, useLogout } from '@/features/authV2/presentation/hooks/useAuth';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [showLogoutError, setShowLogoutError] = useState(false);

  const { user: currentUser } = useAuth();
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

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutSuccess(true);
      handleClose2();
    } catch (error) {
      console.error('Error during logout:', error);
      setShowLogoutError(true);
    }
  };

  const getRoleDisplay = (role: string) => {
    return role === 'admin' ? 'Administrador' : 'Usuario';
  };

  return (
    <Box>
      <IconButton
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={currentUser?.profilePicture || "/images/profile/user-1.jpg"}
          alt={displayName}
          sx={{
            width: 35,
            height: 35,
          }}
        >
          {userInitials}
        </Avatar>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Perfil de Usuario</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={currentUser?.profilePicture || "/images/profile/user-1.jpg"}
            alt={displayName}
            sx={{ width: 95, height: 95 }}
          >
            {userInitials}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
              {displayName}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {currentUser ? getRoleDisplay(currentUser.role) : 'Cargando...'}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {currentUser ? currentUser.email : 'cargando@email.com'}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center" flexShrink="0"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  Acceso <br />
                  Ilimitado
                </Typography>
                <Button variant="contained" color="primary">
                  Actualizar
                </Button>
              </Box>
              <Image src={"/images/backgrounds/unlimited-bg.png"} width={150} height={183} style={{ height: 'auto', width: 'auto' }} alt="unlimited" className="signup-bg" />
            </Box>
          </Box>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="primary"
            fullWidth
            disabled={isLoggingOut}
            startIcon={isLoggingOut ? <CircularProgress size={16} /> : null}
          >
            {isLoggingOut ? 'Cerrando Sesión...' : 'Cerrar Sesión'}
          </Button>
        </Box>
      </Menu>

      {/* Snackbar para éxito de logout */}
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

      {/* Snackbar para error de logout */}
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

export default Profile;
