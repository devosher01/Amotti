import React from "react";
import {
  Grid,
  Typography,
  Stack,
  Avatar,
  Box,
  Chip,
  alpha,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {
  IconRocket,
  IconBrain,
  IconSparkles,
  IconTarget,
  IconBulb,
} from "@tabler/icons-react";
import { HeaderCard, PremiumButton, SubtleButton } from "../styles/StyledComponents";

interface WelcomeHeaderProps {
  onStartOnboarding: () => void;
  onShowDemo: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  onStartOnboarding,
  onShowDemo,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Avatar
              sx={{
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <IconRocket size={28} color="white" />
            </Avatar>
            <Box>
              <Typography 
                variant="h3" 
                fontWeight={700} 
                sx={{ 
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 1,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  lineHeight: 1.2,
                  paddingBottom: '2px',
                }}
              >
                Amotii
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                fontWeight={400}
                sx={{ 
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.4,
                }}
              >
                La plataforma definitiva para centralizar tu marketing en redes sociales.
                Conecta, programa, analiza y optimiza todo desde un solo lugar.
              </Typography>
            </Box>
          </Stack>
          
          <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ mb: 2 }}>
            <Chip
              icon={<IconBrain size={14} />}
              label="IA Integrada"
              variant="outlined"
              size="small"
              sx={{
                borderColor: alpha(theme.palette.info.main, 0.3),
                color: theme.palette.info.main,
                fontWeight: 600,
                fontSize: '0.8rem',
                height: 28,
              }}
            />
            <Chip
              icon={<IconSparkles size={14} />}
              label="Marketing Orgánico & ADS"
              variant="outlined"
              size="small"
              sx={{
                borderColor: alpha(theme.palette.success.main, 0.3),
                color: theme.palette.success.main,
                fontWeight: 600,
                fontSize: '0.8rem',
                height: 28,
              }}
            />
            <Chip
              icon={<IconTarget size={14} />}
              label="Gestión Centralizada"
              variant="outlined"
              size="small"
              sx={{
                borderColor: alpha(theme.palette.warning.main, 0.3),
                color: theme.palette.warning.main,
                fontWeight: 600,
                fontSize: '0.8rem',
                height: 28,
              }}
            />
          </Stack>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Stack spacing={2} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
            <PremiumButton
              startIcon={<IconSparkles size={18} />}
              fullWidth
              onClick={onStartOnboarding}
              sx={{
                fontSize: '1rem',
                fontWeight: 700,
                py: 1.5,
                px: 3,
              }}
            >
              Comenzar Ahora
            </PremiumButton>
            <SubtleButton
              variant="outlined"
              startIcon={<IconBulb size={18} />}
              fullWidth
              onClick={onShowDemo}
              sx={{
                fontSize: '0.9rem',
                fontWeight: 600,
                py: 1.2,
                px: 2.5,
              }}
            >
              Ver Demo
            </SubtleButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
