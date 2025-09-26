import React from "react";
import {
  Grid,
  CardContent,
  Button,
  Stack,
  Avatar,
  alpha,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {
  IconPlus,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { ConnectCard, PlatformAvatar } from "../../../welcome-dashboard/presentation/styles/StyledComponents";
import { PlatformConnection } from "../../domain/entities";

interface Platform {
  key: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
}

interface SocialPlatformCardProps {
  platform: Platform;
  connection?: PlatformConnection;
  isLoading?: boolean;
  onConnect: (platformKey: string) => void;
  onDisconnect: (connectionId: string, platformName: string) => void;
}

export const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  platform,
  connection,
  isLoading = false,
  onConnect,
  onDisconnect,
}) => {
  const theme = useTheme();
  const IconComponent = platform.icon;
  const isConnected = Boolean(connection);
  const isEnabled = platform.enabled;

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <ConnectCard
        onClick={!isConnected && isEnabled && !isLoading ? () => onConnect(platform.key) : undefined}
        sx={{
          opacity: isEnabled ? 1 : 0.5,
          cursor: isConnected ? "default" : (isEnabled ? "pointer" : "not-allowed"),
          border: isConnected 
            ? `2px solid ${alpha(theme.palette.success.main, 0.2)}` 
            : isEnabled 
              ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
              : `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
          backgroundColor: isConnected 
            ? alpha(theme.palette.success.main, 0.02) 
            : isEnabled 
              ? "background.paper"
              : alpha(theme.palette.grey[100], 0.5),
          "&:hover": {
            transform: isConnected ? "none" : (isEnabled ? "translateY(-4px)" : "none"),
            borderColor: isConnected 
              ? alpha(theme.palette.success.main, 0.3) 
              : isEnabled 
                ? alpha(theme.palette.primary.main, 0.4)
                : alpha(theme.palette.grey[300], 0.3),
            boxShadow: isConnected 
              ? `0 8px 25px ${alpha(theme.palette.success.main, 0.15)}` 
              : isEnabled 
                ? `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`
                : "none",
          },
        }}
      >
        <CardContent sx={{ p: 3, textAlign: "center", position: "relative" }}>
          {isConnected && connection && (
            <Box sx={{ position: "absolute", top: 12, right: 12 }}>
              <Stack direction="row" spacing={0.5}>
                <Tooltip title="Desconectar">
                  <IconButton
                    size="small"
                    onClick={() => onDisconnect(connection.id, platform.name)}
                    disabled={isLoading}
                    sx={{ 
                      width: 28,
                      height: 28,
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      "&:hover": { backgroundColor: alpha(theme.palette.error.main, 0.2) }
                    }}
                  >
                    <IconX size={14} color={theme.palette.error.main} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          )}

          <Stack alignItems="center" spacing={2}>
            <Box sx={{ position: "relative" }}>
              <PlatformAvatar 
                platform={platform.key}
                sx={{
                  width: 64,
                  height: 64,
                  boxShadow: isEnabled ? `0 4px 12px ${alpha("#000", 0.1)}` : "none",
                  opacity: isEnabled ? 1 : 0.6,
                  filter: isEnabled ? "none" : "grayscale(50%)",
                }}
              >
                <IconComponent size={28} color="white" />
              </PlatformAvatar>
              {isConnected && (
                <Avatar
                  sx={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    backgroundColor: theme.palette.success.main,
                    border: "2px solid white",
                    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.15)}`,
                  }}
                >
                  <IconCheck size={10} />
                </Avatar>
              )}
              {!isEnabled && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: alpha("#000", 0.7),
                    borderRadius: "50%",
                    width: 64,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography 
                    variant="caption" 
                    color="white" 
                    fontWeight={600}
                    sx={{ fontSize: "0.6rem" }}
                  >
                    Próximamente
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Stack alignItems="center" spacing={1} sx={{ minHeight: 80 }}>
              <Typography 
                variant="h6" 
                fontWeight={700}
                sx={{ 
                  color: isConnected ? theme.palette.success.dark : (isEnabled ? "text.primary" : "text.disabled"),
                  fontSize: "1.1rem"
                }}
              >
                {platform.name}
              </Typography>
              
              {isConnected && connection ? (
                <Stack alignItems="center" spacing={0.5}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      fontWeight: 500,
                      fontSize: "0.875rem"
                    }}
                  >
                    {connection.pageInfo.name}
                  </Typography>
                  {connection.pageInfo.category && (
                    <Chip
                      label={connection.pageInfo.category}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.75rem",
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.dark,
                        fontWeight: 500,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                        "& .MuiChip-label": {
                          px: 1
                        }
                      }}
                    />
                  )}
                </Stack>
              ) : (
                <Typography
                  variant="body2"
                  color={isEnabled ? "text.secondary" : "text.disabled"}
                  sx={{ 
                    fontStyle: "italic",
                    fontSize: "0.875rem"
                  }}
                >
                  {isEnabled ? "Listo para conectar" : "Próximamente disponible"}
                </Typography>
              )}
            </Stack>
            {isConnected ? (
              <Stack alignItems="center" spacing={1}>
                <Chip
                  icon={<IconCheck size={14} />}
                  label="Conectado"
                  sx={{
                    height: 28,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.dark,
                    fontWeight: 600,
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    fontSize: "0.75rem"
                  }}
                />
                {connection && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    {new Date(connection.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </Typography>
                )}
              </Stack>
            ) : (
              <Button
                variant="outlined"
                startIcon={<IconPlus size={16} />}
                disabled={!isEnabled || isLoading}
                sx={{
                  borderColor: isEnabled ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.grey[400], 0.3),
                  color: isEnabled ? theme.palette.primary.main : theme.palette.grey[400],
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  py: 1,
                  px: 2,
                  "&:hover": {
                    borderColor: isEnabled ? theme.palette.primary.main : alpha(theme.palette.grey[400], 0.3),
                    backgroundColor: isEnabled ? alpha(theme.palette.primary.main, 0.04) : "transparent",
                  },
                  "&:disabled": {
                    borderColor: alpha(theme.palette.grey[400], 0.3),
                    color: theme.palette.grey[400],
                  }
                }}
              >
                {isLoading ? "Conectando..." : isEnabled ? "Conectar" : "Próximamente"}
              </Button>
            )}
          </Stack>
        </CardContent>
      </ConnectCard>
    </Grid>
  );
};