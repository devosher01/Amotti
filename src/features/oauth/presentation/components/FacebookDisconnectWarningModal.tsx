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
  alpha,
  Alert,
  AlertTitle,
} from '@mui/material';
import { IconBrandFacebook, IconBrandInstagram, IconAlertTriangle } from '@tabler/icons-react';

interface FacebookDisconnectWarningModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasInstagram: boolean;
  platformName: string;
}

export function FacebookDisconnectWarningModal({
  open,
  onClose,
  onConfirm,
  hasInstagram,
  platformName
}: FacebookDisconnectWarningModalProps) {
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
        {hasInstagram ? (
          <>
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3,
                backgroundColor: alpha('#ff6b35', 0.1),
                border: `1px solid ${alpha('#ff6b35', 0.2)}`,
                '& .MuiAlert-icon': {
                  color: '#ff6b35'
                }
              }}
            >
              <AlertTitle sx={{ fontWeight: 700, color: '#262626' }}>
                Instagram vinculado será desconectado
              </AlertTitle>
              Tu conexión de Instagram está vinculada con Facebook. Al desconectar Facebook 
              desconectaremos automáticamente Instagram en esta marca.
            </Alert>

            <Box sx={{ p: 3, backgroundColor: alpha('#f7f7f7', 0.5), borderRadius: '12px', mb: 2 }}>
              <Typography variant="body1" fontWeight={600} color="#262626" sx={{ mb: 2 }}>
                Cuentas que se desconectarán:
              </Typography>
              
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#1877F2',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconBrandFacebook size={18} color="white" />
                  </Box>
                  <Typography variant="body1" color="#262626">
                    {platformName}
                  </Typography>
                </Stack>
                
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconBrandInstagram size={18} color="white" />
                  </Box>
                  <Typography variant="body1" color="#262626">
                    Instagram (vinculado)
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="#666666" sx={{ mb: 2 }}>
            ¿Estás seguro de que quieres desconectar {platformName}? 
            Perderás acceso a todas las funcionalidades relacionadas con esta plataforma.
          </Typography>
        )}
        
        <Typography variant="body2" color="#8e8e8e" sx={{ mt: 2 }}>
          Puedes volver a conectar estas cuentas en cualquier momento.
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
          {hasInstagram ? 'Sí, desconectar ambas' : 'Sí, desconectar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}