import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons-react';

interface SimpleDisconnectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  platformName: string;
}

export function SimpleDisconnectModal({
  open,
  onClose,
  onConfirm,
  platformName
}: SimpleDisconnectModalProps) {
  return (
    <Dialog 
      open={open}
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#ff6b35',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconAlertTriangle size={24} color="white" />
          </Box>
          <Typography variant="h5" fontWeight={700} color="#262626">
            ¿Desconectar {platformName}?
          </Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" color="#666666" sx={{ mb: 2 }}>
          ¿Estás seguro de que quieres desconectar {platformName}? 
          Perderás acceso a todas las funcionalidades relacionadas con esta plataforma.
        </Typography>
        
        <Typography variant="body2" color="#8e8e8e" sx={{ mt: 2 }}>
          Puedes volver a conectar esta cuenta en cualquier momento.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#e1e8ed',
            color: '#262626',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            '&:hover': {
              borderColor: '#262626',
              backgroundColor: 'transparent',
            }
          }}
        >
          Cancelar
        </Button>
        
        <Button 
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#ff6b35',
            color: 'white',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#e55a2b',
              boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
            },
          }}
        >
          Sí, desconectar
        </Button>
      </DialogActions>
    </Dialog>
  );
}