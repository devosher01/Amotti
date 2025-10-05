import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Stack,
} from '@mui/material';
import { IconBrandInstagram, IconBrandFacebook, IconRefresh, IconAlertTriangle } from '@tabler/icons-react';
// Removed old OAuth system imports

interface InstagramAccountSelectionModalProps {
  open: boolean;
  onClose: () => void;
  accounts: any[];
  isLoading: boolean;
  error: string | null;
  onSelectAccount: (accountId: string) => Promise<void>;
}

export const InstagramAccountSelectionModal: React.FC<InstagramAccountSelectionModalProps> = ({
  open,
  onClose,
  accounts,
  isLoading,
  error,
  onSelectAccount
}) => {

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleConnect = async () => {
    if (selectedAccountId) {
      await onSelectAccount(selectedAccountId);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 500
        }
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" component="div" fontWeight={600} sx={{ mb: 3 }}>
            Selecciona la cuenta de Instagram asociada a tu página de Facebook
          </Typography>
        </Box>

        {error && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              mb: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'error.main',
            }}
          >
            <IconAlertTriangle size={20} color="#d32f2f" />
            <Typography variant="body2" color="text.primary" sx={{ flex: 1 }}>
              {error}
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!accounts || accounts.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No se encontraron cuentas de Instagram conectadas a esta página de Facebook.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {accounts.map((account) => (
                  <Box
                    key={account.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      p: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={account.profilePictureUrl || undefined}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#E4405F',
                            border: '1px solid #ddd'
                          }}
                        >
                          {!account.profilePictureUrl && <IconBrandInstagram size={20} />}
                        </Avatar>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <IconBrandInstagram size={16} color="#E4405F" />
                          <Typography variant="body1" fontWeight={500}>
                            {account.username}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                          →
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Avatar sx={{ width: 16, height: 16, bgcolor: '#1877f2' }}>
                            <IconBrandFacebook size={10} />
                          </Avatar>
                          <Typography variant="body2" color="text.secondary">
                            {account.facebookPageName || 'Página de Facebook'}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: '#333',
                          '&:hover': { bgcolor: '#555' },
                          minWidth: 100
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAccount(account.id);
                        }}
                      >
                        Seleccionar
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'space-between' }}>
        <Button variant="outlined" size="small">
          Ayuda
        </Button>
        <Stack direction="row" spacing={2}>
          {/* <Button onClick={onClose}>
            Buscar otra cuenta
          </Button> */}
          <Button
            variant="contained"
            sx={{ bgcolor: '#333', '&:hover': { bgcolor: '#555' } }}
            startIcon={<IconRefresh size={16} />}
          >
            Refrescar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
