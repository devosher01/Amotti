import React from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { socialPlatforms } from "../constants/data";
import { FacebookDisconnectWarningModal } from "../../../oauth/presentation/components/FacebookDisconnectWarningModal";
import { SocialPlatformCard } from "../../../oauth/presentation/components/SocialPlatformCard";
import { PlatformConnection } from "../../../oauth/domain/entities";

interface SocialConnectionsProps {
  onConnectPlatform: (platform: string) => void;
  connections: PlatformConnection[];
  isLoading: boolean;
  onDeleteConnection: (connectionId: string) => Promise<any>;
}

export const SocialConnections: React.FC<SocialConnectionsProps> = ({
  onConnectPlatform,
  connections = [],
  isLoading = false,
  onDeleteConnection,
}) => {
  const theme = useTheme();
  const hasInstagramConnection = connections?.some(conn => conn.platform === 'instagram' && conn.status === 'active') || false;


  const [disconnectModal, setDisconnectModal] = React.useState<{
    open: boolean;
    connectionId: string;
    platformName: string;
    platform: string;
  }>({
    open: false,
    connectionId: '',
    platformName: '',
    platform: ''
  });


  const handleDisconnect = (connectionId: string, platformName: string, platform: string) => {
    if (platform === 'facebook' || platform === 'instagram') {
      setDisconnectModal({
        open: true,
        connectionId,
        platformName,
        platform
      });
    } else {
      if (window.confirm(`¿Estás seguro de que quieres desconectar ${platformName}?`)) {
        performDisconnect(connectionId);
      }
    }
  };

  const performDisconnect = async (connectionId: string) => {
    try {
      await onDeleteConnection(connectionId);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const handleConfirmDisconnect = async () => {
    await performDisconnect(disconnectModal.connectionId);
    setDisconnectModal({ open: false, connectionId: '', platformName: '', platform: '' });
  };

  const handleCancelDisconnect = () => {
    setDisconnectModal({ open: false, connectionId: '', platformName: '', platform: '' });
  };



  const handleConnectPlatformLocal = async (platformKey: string) => {
    console.log('🚀 [SocialConnections] Delegating to parent:', platformKey);
    onConnectPlatform(platformKey);
  };


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Stack spacing={4} alignItems="center" sx={{ mb: 5 }}>
        <Stack alignItems="center" spacing={2}>
          <Typography
            variant="h3"
            component="h2"
            fontWeight={700}
            sx={{
              background: theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`
                : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textAlign: "center",
            }}
          >
            {connections.length > 0 ? 'Tus Redes Sociales' : 'Conecta tus Redes Sociales'}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: "600px" }}
          >
            {connections.length > 0 
              ? `Tienes ${connections.length} ${connections.length === 1 ? 'red social conectada' : 'redes sociales conectadas'}. ¡Sigue conectando más para ampliar tu alcance!`
              : '🚀 Haz clic en cualquier plataforma para conectar y comenzar a gestionar tu presencia digital desde un solo lugar.'
            }
          </Typography>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {socialPlatforms
          .filter((platform) => platform.enabled) // Solo mostrar plataformas habilitadas
          .map((platform) => {
            const platformConnection = connections?.find(conn => conn.platform === platform.key);
            
            return (
              <SocialPlatformCard
                key={platform.key}
                platform={platform}
                connection={platformConnection}
                isLoading={false}
                onConnect={handleConnectPlatformLocal}
                onDisconnect={(connectionId, platformName) => handleDisconnect(connectionId, platformName, platform.key)}
              />
            );
          })}
      </Grid>

      <FacebookDisconnectWarningModal
        open={disconnectModal.open}
        onClose={handleCancelDisconnect}
        onConfirm={handleConfirmDisconnect}
        hasInstagram={hasInstagramConnection}
        platformName={disconnectModal.platformName}
      />

    </Box>
  );
};