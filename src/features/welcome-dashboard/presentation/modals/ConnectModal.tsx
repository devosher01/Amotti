import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Grid,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import {
  IconX,
} from "@tabler/icons-react";
import { socialPlatforms } from "../constants/data";
import { PlatformAvatar } from "../styles/StyledComponents";

interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
  onConnectPlatform: (platform: string) => void;
  isConnecting: boolean;
  selectedPlatform: string | null;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  open,
  onClose,
  onConnectPlatform,
  isConnecting,
  selectedPlatform,
}) => {
  return (
    <Dialog open={open} onClose={() => !isConnecting && onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight={700}>Conectar Red Social</Typography>
          {!isConnecting && <Button onClick={onClose}><IconX size={20} /></Button>}
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isConnecting ? (
          <Stack alignItems="center" spacing={3} sx={{ py: 6 }}>
            <CircularProgress size={60} sx={{ color: "#5b24b7" }} />
            <Typography variant="h6">Conectando con {selectedPlatform}...</Typography>
          </Stack>
        ) : (
          <Grid container spacing={2}>
            {socialPlatforms.slice(0, 6).map((platform) => {
              const IconComponent = platform.icon;
              return (
                <Grid item xs={6} key={platform.key}>
                  <ListItemButton 
                    onClick={() => onConnectPlatform(platform.key)} 
                    sx={{ 
                      border: "1px solid rgba(91, 36, 183, 0.1)", 
                      borderRadius: 2, 
                      p: 2 
                    }}
                  >
                    <Stack alignItems="center" spacing={1}>
                      <PlatformAvatar platform={platform.key} sx={{ width: 40, height: 40 }}>
                        <IconComponent size={20} color="white" />
                      </PlatformAvatar>
                      <Typography variant="body2">{platform.name}</Typography>
                    </Stack>
                  </ListItemButton>
                </Grid>
              );
            })}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
