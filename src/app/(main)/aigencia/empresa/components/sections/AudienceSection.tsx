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
} from '@mui/material';
import {
  IconUsers,
  IconTarget,
  IconHeart,
  IconBrain,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';

interface AudienceSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
}

// Component - Single Responsibility: Audience Form
export const AudienceSection: React.FC<AudienceSectionProps> = ({
  profile,
  setProfile,
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Audiencia Objetivo
      </Typography>

      <Grid container spacing={4}>
        {/* Demografía básica */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconUsers size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Grupo de Edad Principal
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.targetAgeGroup || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, targetAgeGroup: e.target.value }))}
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
                <MenuItem value="" disabled>Selecciona el grupo de edad</MenuItem>
                <MenuItem value="18-24">18-24 años (Gen Z)</MenuItem>
                <MenuItem value="25-34">25-34 años (Millennials jóvenes)</MenuItem>
                <MenuItem value="35-44">35-44 años (Millennials mayores)</MenuItem>
                <MenuItem value="45-54">45-54 años (Gen X)</MenuItem>
                <MenuItem value="55-64">55-64 años (Baby Boomers jóvenes)</MenuItem>
                <MenuItem value="65+">65+ años (Baby Boomers)</MenuItem>
                <MenuItem value="mixed">Audiencia mixta</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Nivel socioeconómico */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconTarget size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Nivel Socioeconómico
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.targetSocioeconomic || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, targetSocioeconomic: e.target.value }))}
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
                <MenuItem value="" disabled>Selecciona el nivel</MenuItem>
                <MenuItem value="alto">Alto (Ingresos altos)</MenuItem>
                <MenuItem value="medio-alto">Medio-Alto</MenuItem>
                <MenuItem value="medio">Medio</MenuItem>
                <MenuItem value="medio-bajo">Medio-Bajo</MenuItem>
                <MenuItem value="bajo">Bajo</MenuItem>
                <MenuItem value="varied">Variado</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Descripción de la audiencia */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconHeart size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Descripción Detallada de tu Audiencia
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.targetAudience?.description || ''}
              onChange={(e) => setProfile(prev => ({ 
                ...prev, 
                targetAudience: {
                  ...prev.targetAudience,
                  description: e.target.value
                }
              }))}
              multiline
              rows={4}
              placeholder="Describe a tu cliente ideal: ¿quiénes son? ¿qué problemas tienen? ¿qué los motiva? ¿dónde los encuentras?"
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

        {/* Comportamiento y preferencias */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBrain size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Comportamiento y Preferencias
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.audienceBehavior || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, audienceBehavior: e.target.value }))}
              multiline
              rows={4}
              placeholder="¿Cómo se comporta tu audiencia? ¿Qué canales prefieren? ¿Cómo toman decisiones de compra? ¿Qué contenido consumen?"
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