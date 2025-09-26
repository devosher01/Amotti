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
  Divider,
  IconButton,
} from '@mui/material';
import { IconBrandInstagram, IconBrandFacebook, IconX, IconArrowRight } from '@tabler/icons-react';

interface InstagramConnectionModalProps {
  open: boolean;
  onClose: () => void;
  onConnectViaFacebook: () => void;
  onConnectDirect: () => void;
}

export const InstagramConnectionModal: React.FC<InstagramConnectionModalProps> = ({
  open,
  onClose,
  onConnectViaFacebook,
  onConnectDirect,
}) => {
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
          maxWidth: '600px',
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 0, pb: 0 }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          sx={{ p: 3, pb: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(228, 64, 95, 0.3)',
              }}
            >
              <IconBrandInstagram size={24} color="white" />
            </Box>
            <Typography variant="h5" fontWeight={700} color="#262626">
              Conectar Instagram
            </Typography>
          </Stack>
          
          <IconButton 
            onClick={onClose} 
            sx={{ 
              color: '#8e8e8e',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: alpha('#000', 0.04),
              }
            }}
          >
            <IconX size={24} />
          </IconButton>
        </Stack>
      </DialogTitle>
      
      <Divider sx={{ borderColor: '#e1e8ed' }} />
      
      <DialogContent sx={{ p: 3, pt: 2 }}>
        <Typography 
          variant="body1" 
          color="#8e8e8e" 
          sx={{ mb: 3, fontSize: '15px', lineHeight: 1.5 }}
        >
          Elige cómo quieres conectar tu cuenta de Instagram:
        </Typography>
        
        <Stack spacing={2}>
          {/* Opción Facebook Business */}
          <Button
            variant="outlined"
            onClick={onConnectViaFacebook}
            sx={{
              p: 3,
              textAlign: 'left',
              justifyContent: 'flex-start',
              border: '2px solid #e1e8ed',
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#1877F2',
                backgroundColor: alpha('#1877F2', 0.02),
              }
            }}
            endIcon={<IconArrowRight size={20} color="#1877F2" />}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#1877F2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconBrandFacebook size={20} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={600} color="#262626">
                  Vía Facebook Business
                </Typography>
                <Typography variant="body2" color="#8e8e8e">
                  Conecta Instagram usando tu página de Facebook (Recomendado)
                </Typography>
              </Box>
            </Stack>
          </Button>

          {/* Opción Directa */}
          <Button
            variant="outlined"
            onClick={onConnectDirect}
            sx={{
              p: 3,
              textAlign: 'left',
              justifyContent: 'flex-start',
              border: '2px solid #e1e8ed',
              borderRadius: '12px',
              textTransform: 'none',
              opacity: 0.6,
              '&:hover': {
                borderColor: '#E4405F',
                backgroundColor: alpha('#E4405F', 0.02),
                opacity: 0.8,
              }
            }}
            endIcon={<IconArrowRight size={20} color="#E4405F" />}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconBrandInstagram size={20} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={600} color="#262626">
                  Conexión Directa
                </Typography>
                <Typography variant="body2" color="#8e8e8e">
                  Conecta Instagram directamente (Próximamente)
                </Typography>
              </Box>
            </Stack>
          </Button>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={onClose} 
          variant="text"
          sx={{
            color: '#8e8e8e',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: alpha('#000', 0.04),
            }
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};