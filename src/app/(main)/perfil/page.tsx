'use client';

import React from 'react';
import { Box, Container, Typography, Paper, Avatar, Chip, Alert, CircularProgress } from '@mui/material';
import { useUser, useUserDisplayName, useUserInitials } from '@/features/auth/presentation/contexts/UserContext';

export default function PerfilPage() {
  const { user: currentUser, isLoading } = useUser();
  const displayName = useUserDisplayName();
  const userInitials = useUserInitials();

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }


  if (!currentUser) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="warning">
            No se pudo cargar la información del usuario
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi Perfil
        </Typography>
        
        <Paper sx={{ p: 4, mt: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={currentUser.profilePicture}
              sx={{ width: 80, height: 80, mr: 3 }}
            >
              {userInitials}
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                {displayName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentUser.email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Rol
              </Typography>
              <Chip 
                label={currentUser.role === 'admin' ? 'Administrador' : 'Usuario'} 
                color={currentUser.role === 'admin' ? 'primary' : 'default'}
                sx={{ mt: 1 }}
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Estado
              </Typography>
              <Chip 
                label={currentUser.status} 
                color={
                  currentUser.status === 'active' ? 'success' : 
                  currentUser.status === 'inactive' ? 'warning' : 'error'
                }
                sx={{ mt: 1 }}
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Creación
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'No disponible'}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Última Actualización
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {currentUser.updatedAt ? new Date(currentUser.updatedAt).toLocaleDateString() : 'No disponible'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 