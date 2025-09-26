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
  IconPalette,
  IconMoodSmile,
  IconSpeakerphone,
  IconBrush,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';

interface BrandingSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
}

// Component - Single Responsibility: Branding Form
export const BrandingSection: React.FC<BrandingSectionProps> = ({
  profile,
  setProfile,
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Branding y Tono de Comunicación
      </Typography>

      <Grid container spacing={4}>
        {/* Personalidad de marca */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconMoodSmile size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Personalidad de Marca
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.brandPersonality?.[0] || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, brandPersonality: [e.target.value] }))}
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
                <MenuItem value="" disabled>Selecciona la personalidad</MenuItem>
                <MenuItem value="profesional">Profesional y confiable</MenuItem>
                <MenuItem value="innovadora">Innovadora y vanguardista</MenuItem>
                <MenuItem value="cercana">Cercana y amigable</MenuItem>
                <MenuItem value="premium">Premium y exclusiva</MenuItem>
                <MenuItem value="juvenil">Juvenil y energética</MenuItem>
                <MenuItem value="tradicional">Tradicional y establecida</MenuItem>
                <MenuItem value="disruptiva">Disruptiva y audaz</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Tono de comunicación */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconSpeakerphone size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Tono de Comunicación
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.communicationTone || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, communicationTone: e.target.value }))}
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
                <MenuItem value="" disabled>Selecciona el tono</MenuItem>
                <MenuItem value="formal">Formal y corporativo</MenuItem>
                <MenuItem value="casual">Casual y relajado</MenuItem>
                <MenuItem value="tecnico">Técnico y especializado</MenuItem>
                <MenuItem value="inspiracional">Inspiracional y motivador</MenuItem>
                <MenuItem value="educativo">Educativo y didáctico</MenuItem>
                <MenuItem value="conversacional">Conversacional y directo</MenuItem>
                <MenuItem value="emocional">Emocional y empático</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Descripción de la marca */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconPalette size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Descripción de la Identidad de Marca
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.brandDescription || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, brandDescription: e.target.value }))}
              multiline
              rows={4}
              placeholder="Describe cómo quieres que tu marca sea percibida. ¿Qué emociones debe evocar? ¿Qué asociaciones positivas buscas crear?"
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

        {/* Estilo visual preferido */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBrush size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Estilo Visual y Preferencias
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.visualStyle || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, visualStyle: e.target.value }))}
              multiline
              rows={4}
              placeholder="Describe tu estilo visual preferido: colores, tipografías, estilo de imágenes, etc. ¿Prefieres algo minimalista, colorido, elegante, moderno?"
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