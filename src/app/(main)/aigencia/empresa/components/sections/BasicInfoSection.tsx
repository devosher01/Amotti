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
  IconBuildingBank,
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconCategory,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';

interface BasicInfoSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  isDark: boolean;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  profile,
  setProfile,
  isDark,
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Información Básica
      </Typography>

      <Grid container spacing={4}>
        {/* Nombre de la empresa */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBuildingBank size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Nombre de la Empresa
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.name || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre completo de tu empresa"
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

        {/* Industria */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconCategory size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Industria
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.industry || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, industry: e.target.value }))}
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
                <MenuItem value="" disabled>Selecciona tu industria</MenuItem>
                <MenuItem value="tecnologia">Tecnología</MenuItem>
                <MenuItem value="salud">Salud y Bienestar</MenuItem>
                <MenuItem value="educacion">Educación</MenuItem>
                <MenuItem value="finanzas">Finanzas</MenuItem>
                <MenuItem value="retail">Retail y E-commerce</MenuItem>
                <MenuItem value="servicios">Servicios Profesionales</MenuItem>
                <MenuItem value="manufactura">Manufactura</MenuItem>
                <MenuItem value="turismo">Turismo y Hospitalidad</MenuItem>
                <MenuItem value="inmobiliaria">Bienes Raíces</MenuItem>
                <MenuItem value="otros">Otros</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Tamaño de la empresa */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBuildingBank size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Tamaño de la Empresa
              </Typography>
            </Stack>
            <FormControl fullWidth>
              <Select
                value={profile.size || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, size: e.target.value }))}
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
                <MenuItem value="" disabled>Selecciona el tamaño</MenuItem>
                <MenuItem value="1-10">1-10 empleados</MenuItem>
                <MenuItem value="11-50">11-50 empleados</MenuItem>
                <MenuItem value="51-200">51-200 empleados</MenuItem>
                <MenuItem value="201-500">201-500 empleados</MenuItem>
                <MenuItem value="500+">500+ empleados</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Año de fundación */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBuildingBank size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Año de Fundación
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.founded || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, founded: e.target.value }))}
              placeholder="2020"
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

        {/* Sitio web */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconWorld size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Sitio Web
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.website || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://www.empresa.com"
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


        {/* Descripción corta */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBuildingBank size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Descripción de la Empresa
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.description || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={4}
              placeholder="Describe brevemente qué hace tu empresa, su misión y qué la hace única..."
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