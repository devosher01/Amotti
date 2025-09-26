"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Alert,
  FormControl,
  Select,
  MenuItem,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  alpha,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconArrowLeft,
  IconSettings,
  IconPlus,
  IconTrash,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconFileImport,
  IconRss,
  IconDownload,
  IconList,
  IconSparkles,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";

import Link from "next/link";
import PageContainer from "@/features/shared/components/container/PageContainer";
import BlankCard from "@/features/shared/components/shared/BlankCard";

// Styled Components con branding profesional
const HeaderCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.98) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  boxShadow: `0 8px 32px ${alpha('#5b24b7', 0.06)}`,
}));

const PremiumButton = styled(Button)(({ theme }) => ({
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

const SubtleButton = styled(Button)(({ theme }) => ({
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

const StyledCard = styled(BlankCard)(({ theme }) => ({
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: `0 4px 20px ${alpha('#5b24b7', 0.06)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 8px 30px ${alpha('#5b24b7', 0.1)}`,
  },
}));

const PlatformCard = styled(Button)<{ selected: boolean }>(({ theme, selected }) => ({
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  border: '1px solid',
  borderColor: selected ? '#5b24b7' : alpha('#5b24b7', 0.1),
  borderRadius: '12px',
  backgroundColor: selected ? alpha('#5b24b7', 0.08) : 'transparent',
  color: 'inherit',
  textTransform: 'none',
  width: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: selected ? alpha('#5b24b7', 0.12) : alpha('#5b24b7', 0.04),
    borderColor: '#5b24b7',
    transform: 'translateY(-1px)',
  },
}));

const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

export default function CrearAutolistaPage() {
  const [name, setName] = useState("Nueva autolista 10");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("23");
  const [selectedMinute, setSelectedMinute] = useState("37");
  const [repeatMode, setRepeatMode] = useState("Repetir");

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: <IconBrandFacebook size={20} />, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: <IconBrandInstagram size={20} />, color: '#E4405F' },
    { id: 'tiktok', name: 'TikTok', icon: <IconBrandTiktok size={20} />, color: '#000000' },
    { id: 'youtube', name: 'YouTube', icon: <IconBrandYoutube size={20} />, color: '#FF0000' },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <PageContainer title="Editar autolista" description="Crear nueva autolista">
      <Box>
        {/* Header con branding profesional */}
        <HeaderCard>
          <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
            <Link href="/new/planificacion/autolistas" passHref>
              <IconButton 
                sx={{ 
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: alpha('#5b24b7', 0.2),
                  boxShadow: `0 4px 12px ${alpha('#5b24b7', 0.1)}`,
                  '&:hover': { 
                    bgcolor: alpha('#5b24b7', 0.04),
                    borderColor: '#5b24b7',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                <IconArrowLeft size={20} color="#5b24b7" />
              </IconButton>
            </Link>

            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
                boxShadow: `0 8px 24px ${alpha('#5b24b7', 0.2)}`,
              }}
            >
              <IconList size={28} color="white" />
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h3" 
                fontWeight={700} 
                sx={{ 
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 0.5,
                }}
              >
                Editar autolista
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                fontWeight={400}
              >
                Configura tu nueva lista automatizada de contenido
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Chip
                icon={<IconSparkles size={16} />}
                label="IA Disponible"
                variant="outlined"
                sx={{
                  borderColor: alpha('#5b24b7', 0.3),
                  color: '#5b24b7',
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Stack>

          {/* Alert */}
          <Alert 
            severity="warning" 
            sx={{ 
              bgcolor: alpha('#F59E0B', 0.1),
              color: '#D97706',
              border: `1px solid ${alpha('#F59E0B', 0.2)}`,
              borderRadius: '12px',
              '& .MuiAlert-icon': {
                color: '#D97706',
              }
            }}
          >
            Debes seleccionar al menos una red para publicar.
          </Alert>
        </HeaderCard>

        <Grid container spacing={3}>
          {/* Columna izquierda */}
          <Grid item xs={12} md={6}>
            {/* Nombre */}
            <StyledCard sx={{ mb: 3 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
                  Nombre
                </Typography>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre de la autolista"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover': {
                        '& fieldset': {
                          borderColor: '#5b24b7',
                        },
                      },
                      '&.Mui-focused': {
                        '& fieldset': {
                          borderColor: '#5b24b7',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </StyledCard>

            {/* Configuración */}
            <StyledCard sx={{ mb: 3 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
                  Configuración
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconSettings size={20} color="#64748b" />
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    Configuración global
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={repeatMode}
                      onChange={(e) => setRepeatMode(e.target.value)}
                      displayEmpty
                      sx={{
                        borderRadius: '8px',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5b24b7',
                          },
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5b24b7',
                          },
                        },
                      }}
                    >
                      <MenuItem value="Repetir">Repetir</MenuItem>
                      <MenuItem value="No repetir">No repetir</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
            </StyledCard>

            {/* Programación */}
            <StyledCard>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 1 }}>
                  Programación
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  America/Bogota
                </Typography>

                {/* Selectores de tiempo */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      sx={{ borderRadius: '8px' }}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <MenuItem key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography>:</Typography>
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select
                      value={selectedMinute}
                      onChange={(e) => setSelectedMinute(e.target.value)}
                      sx={{ borderRadius: '8px' }}
                    >
                      {Array.from({ length: 60 }, (_, i) => (
                        <MenuItem key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                {/* Días de la semana */}
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      variant={selectedDays.includes(day) ? "contained" : "outlined"}
                      onClick={() => handleDayToggle(day)}
                      size="small"
                      sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: '8px',
                        bgcolor: selectedDays.includes(day) ? '#5b24b7' : 'transparent',
                        color: selectedDays.includes(day) ? 'white' : 'text.primary',
                        borderColor: selectedDays.includes(day) ? '#5b24b7' : alpha('#5b24b7', 0.3),
                        '&:hover': {
                          bgcolor: selectedDays.includes(day) ? '#4c1d9a' : alpha('#5b24b7', 0.04),
                          borderColor: '#5b24b7',
                        }
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: '#ef4444',
                      color: 'white',
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#dc2626' }
                    }}
                  >
                    <IconTrash size={16} />
                  </IconButton>
                </Stack>

                <SubtleButton
                  startIcon={<IconPlus />}
                  variant="outlined"
                  size="small"
                >
                  Añadir horario
                </SubtleButton>
              </Box>
            </StyledCard>
          </Grid>

          {/* Columna derecha */}
          <Grid item xs={12} md={6}>
            {/* Redes para publicar */}
            <StyledCard>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
                  Redes para publicar
                </Typography>
                <Stack spacing={2}>
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={platform.id}
                      selected={selectedPlatforms.includes(platform.id)}
                      onClick={() => handlePlatformToggle(platform.id)}
                    >
                      <Box sx={{ color: platform.color, mr: 2 }}>
                        {platform.icon}
                      </Box>
                      <Typography variant="body2" fontWeight={500}>
                        {platform.name}
                      </Typography>
                    </PlatformCard>
                  ))}
                </Stack>
              </Box>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Contenido de la lista - En formato horizontal como herramientas */}
        <StyledCard sx={{ mt: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
              Contenido de la lista
            </Typography>
            
            {/* Herramientas en formato horizontal */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <SubtleButton
                  startIcon={<IconPlus />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ py: 1 }}
                >
                  Añadir al principio
                </SubtleButton>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <SubtleButton
                  startIcon={<IconSparkles />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ py: 1 }}
                >
                  Posts con IA
                </SubtleButton>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <SubtleButton
                  startIcon={<IconFileImport />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ py: 1 }}
                >
                  Desde CSV
                </SubtleButton>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Button
                  startIcon={<IconDownload />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '12px',
                    py: 1,
                    color: '#D97706',
                    borderColor: alpha('#F59E0B', 0.3),
                    '&:hover': {
                      bgcolor: alpha('#F59E0B', 0.04),
                      borderColor: '#F59E0B',
                    }
                  }}
                >
                  Descargar CSV
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <SubtleButton
                  startIcon={<IconRss />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ py: 1 }}
                >
                  Feed RSS
                </SubtleButton>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '12px',
                    py: 1,
                    color: 'text.disabled',
                  }}
                >
                  Borrar todos
                </Button>
              </Grid>
            </Grid>
          </Box>
        </StyledCard>

        {/* Botones de acción */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Link href="/new/planificacion/autolistas" passHref>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: 3,
                py: 1.5,
              }}
            >
              Cancelar
            </Button>
          </Link>
          <PremiumButton>
            Guardar autolista
          </PremiumButton>
        </Box>
      </Box>
    </PageContainer>
  );
}
