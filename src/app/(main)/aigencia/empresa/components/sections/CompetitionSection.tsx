"use client";

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stack,
  alpha,
  Button,
  IconButton,
} from '@mui/material';
import {
  IconTrendingUp,
  IconPlus,
  IconTrash,
  IconTarget,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';

interface CompetitionSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  addArrayItem: (key: keyof CompanyProfile, value: string) => void;
  removeArrayItem: (key: keyof CompanyProfile, index: number) => void;
}

// Component - Single Responsibility: Competition Form
export const CompetitionSection: React.FC<CompetitionSectionProps> = ({
  profile,
  setProfile,
  addArrayItem,
  removeArrayItem,
}) => {
  const [newCompetitor, setNewCompetitor] = React.useState('');

  const handleAddCompetitor = () => {
    if (newCompetitor.trim()) {
      addArrayItem('competitors', newCompetitor.trim());
      setNewCompetitor('');
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Análisis de Competencia
      </Typography>

      <Grid container spacing={4}>
        {/* Análisis competitivo general */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconTrendingUp size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Análisis del Mercado y Competencia
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.competitiveAnalysis || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, competitiveAnalysis: e.target.value }))}
              multiline
              rows={4}
              placeholder="Describe el panorama competitivo: ¿quiénes son tus principales competidores? ¿Cómo se posiciona tu empresa frente a ellos?"
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

        {/* Ventaja competitiva */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconTarget size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Ventaja Competitiva
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.competitiveAdvantage || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, competitiveAdvantage: e.target.value }))}
              multiline
              rows={4}
              placeholder="¿Qué te hace único? ¿Cuál es tu principal ventaja competitiva? ¿Por qué los clientes te elegirían a ti en lugar de a la competencia?"
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

        {/* Lista de competidores */}
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconTrendingUp size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Principales Competidores
              </Typography>
            </Stack>
            
            {/* Añadir competidor */}
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <TextField
                fullWidth
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                placeholder="Ej: Empresa ABC, Startup XYZ"
                variant="outlined"
                size="small"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCompetitor()}
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
              <Button
                variant="contained"
                startIcon={<IconPlus size={16} />}
                onClick={handleAddCompetitor}
                disabled={!newCompetitor.trim()}
                sx={{
                  backgroundColor: '#5b24b7',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#4c1d9a',
                  },
                }}
              >
                Añadir
              </Button>
            </Stack>

            {/* Lista de competidores existentes */}
            {profile.competitors && profile.competitors.length > 0 && (
              <Stack spacing={1}>
                {profile.competitors.map((competitor, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 2,
                      backgroundColor: alpha('#5b24b7', 0.05),
                      border: `1px solid ${alpha('#5b24b7', 0.1)}`,
                      borderRadius: '12px',
                    }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {competitor}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeArrayItem('competitors', index)}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: alpha('#ef4444', 0.1),
                        },
                      }}
                    >
                      <IconTrash size={16} />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}

            {(!profile.competitors || profile.competitors.length === 0) && (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No hay competidores añadidos aún. Usa el campo de arriba para añadir competidores.
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};