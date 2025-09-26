"use client";

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stack,
  alpha,
} from '@mui/material';
import {
  IconTarget,
  IconEye,
  IconBulb,
  IconStar,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';
import { EnhancedValuesList } from '../shared/EnhancedValuesList';

interface StorytellingsSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  addArrayItem: (key: keyof CompanyProfile, value: string) => void;
  removeArrayItem: (key: keyof CompanyProfile, index: number) => void;
  isDark: boolean;
}

// Component - Single Responsibility: Storytelling Form
export const StorytellingSection: React.FC<StorytellingsSectionProps> = ({
  profile,
  setProfile,
  addArrayItem,
  removeArrayItem,
  isDark,
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Historia y Propósito de la Empresa
      </Typography>

      <Grid container spacing={4}>
        {/* Misión */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconTarget size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Misión
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.mission}
              onChange={(e) => setProfile(prev => ({ ...prev, mission: e.target.value }))}
              multiline
              rows={4}
              placeholder="¿Cuál es el propósito principal de tu empresa? ¿Qué problema resuelves?"
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

        {/* Visión */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconEye size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Visión
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.vision}
              onChange={(e) => setProfile(prev => ({ ...prev, vision: e.target.value }))}
              multiline
              rows={4}
              placeholder="¿Hacia dónde se dirige tu empresa? ¿Qué impacto quieres lograr?"
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

        {/* Historia de la marca */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBulb size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Historia de la Marca
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.brandStory}
              onChange={(e) => setProfile(prev => ({ ...prev, brandStory: e.target.value }))}
              multiline
              rows={5}
              placeholder="Cuenta la historia de tu empresa: ¿cómo nació? ¿qué te motivó a crearla? ¿cuáles han sido los momentos clave?"
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

        {/* Valores corporativos */}
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconStar size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Valores Corporativos
              </Typography>
            </Stack>
            <Box>
              <EnhancedValuesList
                values={profile.values}
                onAdd={(value) => addArrayItem('values', value)}
                onRemove={(index) => removeArrayItem('values', index)}
                isDark={isDark}
                placeholder="Ej: Innovación, Transparencia, Excelencia, Compromiso"
                color="#5b24b7"
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};




