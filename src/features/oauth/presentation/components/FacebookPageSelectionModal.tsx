import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Avatar,
  ListItemAvatar,
  Chip,
} from '@mui/material';
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

// Pure UI component - no business logic
interface Account {
  id: string;
  name: string;
  category?: string;
  profilePictureUrl?: string;
  hasLinkedAccounts?: boolean;
  metadata?: Record<string, any>;
}

interface AccountSelectionModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
  onSelectAccount: (accountId: string) => void;
  isSelecting?: boolean;
  showLinkedIndicator?: boolean;
}

export const AccountSelectionModal: React.FC<AccountSelectionModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  accounts,
  isLoading,
  error,
  onSelectAccount,
  isSelecting = false,
  showLinkedIndicator = false,
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleConnect = () => {
    if (!selectedAccountId) return;
    onSelectAccount(selectedAccountId);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {!accounts || accounts.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                No se encontraron cuentas disponibles para conectar.
              </Typography>
            ) : (
              accounts.map((account) => (
                <ListItem key={account.id} disablePadding>
                  <ListItemButton
                    selected={selectedAccountId === account.id}
                    onClick={() => handleSelectAccount(account.id)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    {account.profilePictureUrl && (
                      <ListItemAvatar>
                        <Avatar src={account.profilePictureUrl} />
                      </ListItemAvatar>
                    )}
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {account.name}
                          {showLinkedIndicator && account.hasLinkedAccounts && (
                            <Chip
                              icon={<IconBrandInstagram size={14} />}
                              label="Con Instagram"
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={account.category || account.id}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: selectedAccountId === account.id ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isSelecting}>
          Cancelar
        </Button>
        <Button
          onClick={handleConnect}
          variant="contained"
          disabled={!selectedAccountId || isSelecting || isLoading || !accounts || accounts.length === 0}
        >
          {isSelecting ? 'Conectando...' : 'Conectar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};