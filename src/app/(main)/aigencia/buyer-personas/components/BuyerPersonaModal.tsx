"use client";

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Grid,
  Divider,
  Chip,
  Avatar,
  alpha,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  IconX,
  IconDownload,
  IconUser,
  IconMapPin,
  IconCoin,
  IconSchool,
  IconTarget,
  IconBulb,
  IconHeart,
  IconTrendingUp,
  IconWorld,
  IconBriefcase,
} from '@tabler/icons-react';

// Styled Components siguiendo el patrón establecido
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha('#5b24b7', 0.08)}`,
    boxShadow: `0 20px 60px ${alpha('#5b24b7', 0.15)}`,
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
  color: 'white',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    borderRadius: '50% 0 0 50%',
  },
}));

const InfoCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '12px',
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  background: theme.palette.mode === 'dark' 
    ? alpha('#334155', 0.3)
    : alpha('#f8fafc', 0.8),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${alpha('#5b24b7', 0.1)}`,
    borderColor: alpha('#5b24b7', 0.15),
  },
}));

const PremiumButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
  color: 'white',
  fontWeight: 600,
  borderRadius: '12px',
  textTransform: 'none',
  padding: '12px 24px',
  boxShadow: `0 8px 25px ${alpha('#5b24b7', 0.2)}`,
  '&:hover': {
    background: 'linear-gradient(135deg, #4c1d9a 0%, #3d1677 100%)',
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 35px ${alpha('#5b24b7', 0.3)}`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const SubtleButton = styled(Button)(() => ({
  borderColor: alpha('#5b24b7', 0.2),
  color: '#5b24b7',
  fontWeight: 500,
  borderRadius: '12px',
  textTransform: 'none',
  padding: '8px 20px',
  '&:hover': {
    borderColor: '#5b24b7',
    backgroundColor: alpha('#5b24b7', 0.04),
    transform: 'translateY(-1px)',
  },
}));

interface BuyerPersona {
  id: string;
  name: string;
  title: string;
  demographics: {
    age: string;
    location: string;
    income: string;
    education: string;
  };
  psychographics: {
    interests: string[];
    values: string[];
    lifestyle: string;
  };
  painPoints: string[];
  goals: string[];
  preferredChannels: string[];
  avatar?: string;
  pdfUrl?: string;
  createdAt: string;
}

interface BuyerPersonaModalProps {
  open: boolean;
  onClose: () => void;
  persona: BuyerPersona | null;
  onDownload: (personaId: string) => void;
}

export const BuyerPersonaModal: React.FC<BuyerPersonaModalProps> = ({
  open,
  onClose,
  persona,
  onDownload,
}) => {
  if (!persona) return null;

  const handleDownload = () => {
    onDownload(persona.id);
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
    >
      <HeaderSection>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: alpha('#ffffff', 0.2),
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 24px ${alpha('#000000', 0.2)}`,
              }}
            >
              <IconUser size={32} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {persona.name}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {persona.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                Creado: {new Date(persona.createdAt).toLocaleDateString('es-ES')}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <IconX size={24} />
          </IconButton>
        </Stack>
      </HeaderSection>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Información Demográfica */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom sx={{ mb: 3 }}>
                📊 Información Demográfica
              </Typography>
              
              <Stack spacing={3}>
                <InfoCard>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '8px',
                        backgroundColor: alpha('#5b24b7', 0.1),
                        color: '#5b24b7',
                      }}
                    >
                      <IconUser size={20} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        RANGO DE EDAD
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="text.primary">
                        {persona.demographics.age}
                      </Typography>
                    </Box>
                  </Stack>
                </InfoCard>

                <InfoCard>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '8px',
                        backgroundColor: alpha('#10b981', 0.1),
                        color: '#10b981',
                      }}
                    >
                      <IconMapPin size={20} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        UBICACIÓN
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="text.primary">
                        {persona.demographics.location}
                      </Typography>
                    </Box>
                  </Stack>
                </InfoCard>

                <InfoCard>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '8px',
                        backgroundColor: alpha('#f59e0b', 0.1),
                        color: '#f59e0b',
                      }}
                    >
                      <IconCoin size={20} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        INGRESOS
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="text.primary">
                        {persona.demographics.income}
                      </Typography>
                    </Box>
                  </Stack>
                </InfoCard>

                <InfoCard>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '8px',
                        backgroundColor: alpha('#8b5cf6', 0.1),
                        color: '#8b5cf6',
                      }}
                    >
                      <IconSchool size={20} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        EDUCACIÓN
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="text.primary">
                        {persona.demographics.education}
                      </Typography>
                    </Box>
                  </Stack>
                </InfoCard>
              </Stack>
            </Grid>

            {/* Información Psicográfica */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom sx={{ mb: 3 }}>
                🧠 Perfil Psicográfico
              </Typography>
              
              {/* Intereses */}
              <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <IconHeart size={18} color="#5b24b7" />
                  <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    Intereses Principales
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {persona.psychographics.interests.map((interest, index) => (
                    <Chip
                      key={index}
                      label={interest}
                      sx={{
                        backgroundColor: alpha('#5b24b7', 0.1),
                        color: '#5b24b7',
                        fontWeight: 600,
                        border: `1px solid ${alpha('#5b24b7', 0.2)}`,
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Valores */}
              <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <IconBulb size={18} color="#10b981" />
                  <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    Valores Centrales
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {persona.psychographics.values.map((value, index) => (
                    <Chip
                      key={index}
                      label={value}
                      sx={{
                        backgroundColor: alpha('#10b981', 0.1),
                        color: '#10b981',
                        fontWeight: 600,
                        border: `1px solid ${alpha('#10b981', 0.2)}`,
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Estilo de vida */}
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <IconWorld size={18} color="#f59e0b" />
                  <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    Estilo de Vida
                  </Typography>
                </Stack>
                <InfoCard>
                  <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7 }}>
                    {persona.psychographics.lifestyle}
                  </Typography>
                </InfoCard>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4}>
            {/* Pain Points */}
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <IconTarget size={20} color="#ef4444" />
                <Typography variant="h5" fontWeight={600} color="text.primary">
                  Puntos de Dolor
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {persona.painPoints.map((pain, index) => (
                  <InfoCard key={index} sx={{ borderColor: alpha('#ef4444', 0.2) }}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        sx={{
                          width: 6,
                          minHeight: '100%',
                          backgroundColor: '#ef4444',
                          borderRadius: '3px',
                        }}
                      />
                      <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6 }}>
                        {pain}
                      </Typography>
                    </Stack>
                  </InfoCard>
                ))}
              </Stack>
            </Grid>

            {/* Objetivos */}
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <IconTrendingUp size={20} color="#10b981" />
                <Typography variant="h5" fontWeight={600} color="text.primary">
                  Objetivos y Metas
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {persona.goals.map((goal, index) => (
                  <InfoCard key={index} sx={{ borderColor: alpha('#10b981', 0.2) }}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        sx={{
                          width: 6,
                          minHeight: '100%',
                          backgroundColor: '#10b981',
                          borderRadius: '3px',
                        }}
                      />
                      <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6 }}>
                        {goal}
                      </Typography>
                    </Stack>
                  </InfoCard>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Canales Preferidos */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
              <IconBriefcase size={20} color="#5b24b7" />
              <Typography variant="h5" fontWeight={600} color="text.primary">
                Canales de Comunicación Preferidos
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {persona.preferredChannels.map((channel, index) => (
                <Chip
                  key={index}
                  label={channel}
                  sx={{
                    backgroundColor: alpha('#5b24b7', 0.1),
                    color: '#5b24b7',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    py: 1,
                    px: 2,
                    border: `1px solid ${alpha('#5b24b7', 0.2)}`,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 0 }}>
        <Stack direction="row" spacing={2} width="100%">
          <SubtleButton
            onClick={onClose}
            variant="outlined"
            sx={{ flex: 1 }}
          >
            Cerrar
          </SubtleButton>
          <PremiumButton
            onClick={handleDownload}
            startIcon={<IconDownload size={18} />}
            sx={{ flex: 1 }}
          >
            Descargar PDF
          </PremiumButton>
        </Stack>
      </DialogActions>
    </StyledDialog>
  );
};