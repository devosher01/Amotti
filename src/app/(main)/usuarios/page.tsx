'use client';

import React from 'react';
import { Box, Container, Typography, Paper, Alert } from '@mui/material';

export default function UsuariosPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Administra los usuarios del sistema. Los usuarios se crean a través del proceso de registro.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Nota:</strong> Para crear nuevos usuarios, utiliza el proceso de registro en la sección de autenticación.
          Aquí solo puedes gestionar usuarios existentes.
        </Alert>
        
        <Paper sx={{ p: 3 }}>
        </Paper>
      </Box>
    </Container>
  );
} 