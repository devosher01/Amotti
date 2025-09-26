"use client";

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stack,
  alpha,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Button,
} from '@mui/material';
import {
  IconWorld,
  IconDeviceDesktop,
  IconTarget,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandTiktok,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';

interface ChannelsSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
}

// Component - Single Responsibility: Channels Form
export const ChannelsSection: React.FC<ChannelsSectionProps> = ({
  profile,
  setProfile,
}) => {
  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: IconBrandFacebook },
    { id: 'instagram', name: 'Instagram', icon: IconBrandInstagram },
    { id: 'linkedin', name: 'LinkedIn', icon: IconBrandLinkedin },
    { id: 'twitter', name: 'Twitter/X', icon: IconBrandTwitter },
    { id: 'tiktok', name: 'TikTok', icon: IconBrandTiktok },
    { id: 'youtube', name: 'YouTube', icon: IconBrandYoutube },
  ];

  const handleSocialPlatformToggle = (platformId: string) => {
    const currentPlatforms = profile.socialPlatforms || [];
    const updatedPlatforms = currentPlatforms.includes(platformId)
      ? currentPlatforms.filter((p: string) => p !== platformId)
      : [...currentPlatforms, platformId];
    
    setProfile(prev => ({ ...prev, socialPlatforms: updatedPlatforms }));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Canales y Estrategia de Contenido
      </Typography>

      <Grid container spacing={4}>
        {/* Objetivo de marketing */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconTarget size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Objetivo Principal de Marketing
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.marketingGoal || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, marketingGoal: e.target.value }))}
                displayEmpty
                sx={{
                  borderRadius: '12px',
                  backgroundColor: alpha('#f8fafc', 0.8),
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#5b24b7',
                  },
                }}
              >
                <MenuItem value="" disabled>Selecciona el objetivo</MenuItem>
                <MenuItem value="awareness">Generar conocimiento de marca</MenuItem>
                <MenuItem value="leads">Generar leads y conversiones</MenuItem>
                <MenuItem value="sales">Incrementar ventas directas</MenuItem>
                <MenuItem value="engagement">Aumentar engagement y comunidad</MenuItem>
                <MenuItem value="education">Educar al mercado</MenuItem>
                <MenuItem value="retention">Retener clientes existentes</MenuItem>
                <MenuItem value="recruitment">Atraer talento</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Presupuesto aproximado */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconDeviceDesktop size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Presupuesto Mensual Aproximado
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.marketingBudget || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, marketingBudget: e.target.value }))}
                displayEmpty
                sx={{
                  borderRadius: '12px',
                  backgroundColor: alpha('#f8fafc', 0.8),
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#5b24b7',
                  },
                }}
              >
                <MenuItem value="" disabled>Selecciona el presupuesto</MenuItem>
                <MenuItem value="bajo">Menos de $500.000</MenuItem>
                <MenuItem value="medio-bajo">$500.000 - $1.500.000</MenuItem>
                <MenuItem value="medio">$1.500.000 - $5.000.000</MenuItem>
                <MenuItem value="medio-alto">$5.000.000 - $15.000.000</MenuItem>
                <MenuItem value="alto">Más de $15.000.000</MenuItem>
                <MenuItem value="flexible">Flexible según resultados</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Plataformas sociales */}
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconWorld size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Plataformas de Redes Sociales Preferidas
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                const isSelected = profile.socialPlatforms?.includes(platform.id);
                
                return (
                  <Button
                    key={platform.id}
                    variant={isSelected ? "contained" : "outlined"}
                    startIcon={<IconComponent size={16} />}
                    onClick={() => handleSocialPlatformToggle(platform.id)}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      backgroundColor: isSelected ? '#5b24b7' : 'transparent',
                      borderColor: alpha('#5b24b7', 0.2),
                      color: isSelected ? 'white' : '#5b24b7',
                      '&:hover': {
                        backgroundColor: isSelected ? '#4c1d9a' : alpha('#5b24b7', 0.04),
                        borderColor: '#5b24b7',
                      },
                    }}
                  >
                    {platform.name}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        </Grid>

        {/* Estrategia de contenido */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconDeviceDesktop size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Estrategia de Contenido
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.contentStrategy || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, contentStrategy: e.target.value }))}
              multiline
              rows={4}
              placeholder="Describe tu estrategia de contenido: ¿qué tipo de contenido quieres crear? ¿Con qué frecuencia? ¿Qué temas son importantes para tu audiencia?"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: alpha('#f8fafc', 0.8),
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#5b24b7',
                  },
                },
              }}
            />
          </Stack>
        </Grid>

        {/* Canales preferidos */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconWorld size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Otros Canales de Marketing
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.otherChannels || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, otherChannels: e.target.value }))}
              multiline
              rows={3}
              placeholder="¿Utilizas otros canales? Email marketing, eventos, PR, partnerships, contenido SEO, publicidad online, etc."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: alpha('#f8fafc', 0.8),
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#5b24b7',
                  },
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};