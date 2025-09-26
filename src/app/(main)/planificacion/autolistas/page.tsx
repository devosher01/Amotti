"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Switch,
  Stack,
  IconButton,
  InputAdornment,
  Chip,
  Tooltip,
  Avatar,
  alpha,
  Grid,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconMenu2,
  IconCalendar,
  IconList,
  IconSparkles,
} from "@tabler/icons-react";

import Link from "next/link";
import BlankCard from "@/features/shared/components/shared/BlankCard";
import PageContainer from "@/features/shared/components/container/PageContainer";

// Styled Components con el branding de la aplicación
const HeaderCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.98) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.06)}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const PremiumButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  fontWeight: 600,
  borderRadius: '12px',
  textTransform: 'none',
  padding: '12px 24px',
  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const SubtleButton = styled(Button)(({ theme }) => ({
  borderColor: alpha(theme.palette.primary.main, 0.2),
  color: theme.palette.primary.main,
  fontWeight: 500,
  borderRadius: '12px',
  textTransform: 'none',
  padding: '8px 20px',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    transform: 'translateY(-1px)',
  },
}));

const StyledTableCard = styled(BlankCard)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`,
  '& .MuiTableContainer-root': {
    borderRadius: 'inherit',
  },
}));

// Mock data basado en las imágenes
const mockAutolistas = [
  {
    id: '1',
    name: 'Nueva autolista 1',
    nextPublication: '11 ago 2025 8:36',
    socialNetworks: [],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '2',
    name: 'Nueva autolista 2',
    nextPublication: '11 ago 2025 8:36',
    socialNetworks: ['tiktok'],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '3',
    name: 'Nueva autolista 3',
    nextPublication: '',
    socialNetworks: [],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '4',
    name: 'Nueva autolista 4',
    nextPublication: '',
    socialNetworks: [],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '5',
    name: 'Nueva autolista 5',
    nextPublication: '',
    socialNetworks: [],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '6',
    name: 'Nueva autolista 6',
    nextPublication: '',
    socialNetworks: ['facebook', 'instagram'],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '7',
    name: 'Nueva autolista 7',
    nextPublication: '7 ago 2025 2:07',
    socialNetworks: ['facebook', 'instagram'],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '8',
    name: 'Nueva autolista 8',
    nextPublication: '',
    socialNetworks: [],
    pendingPublications: 0,
    isActive: true,
  },
  {
    id: '9',
    name: 'Nueva autolista 9',
    nextPublication: '',
    socialNetworks: [],
    pendingPublications: 0,
    isActive: true,
  },
];

// Componente para iconos de redes sociales
const SocialIcon = ({ platform }: { platform: string }) => {
  const iconProps = { size: 16 };
  
  const platformIcons = {
    twitter: <IconBrandTwitter {...iconProps} style={{ color: '#1DA1F2' }} />,
    facebook: <IconBrandFacebook {...iconProps} style={{ color: '#1877F2' }} />,
    instagram: <IconBrandInstagram {...iconProps} style={{ color: '#E4405F' }} />,
    linkedin: <IconBrandLinkedin {...iconProps} style={{ color: '#0A66C2' }} />,
    tiktok: <IconBrandTiktok {...iconProps} style={{ color: '#000000' }} />,
  };

  return platformIcons[platform as keyof typeof platformIcons] || null;
};

export default function AutolistasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("Autolistas");
  const theme = useTheme();
  
  const filteredAutolistas = mockAutolistas.filter(autolista =>
    autolista.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleToggleActive = (id: string) => {
    // Aquí iría la lógica para activar/desactivar autolista
    console.log(`Toggle autolista ${id}`);
  };

  const handleDelete = (id: string) => {
    // Aquí iría la lógica para eliminar autolista
    console.log(`Delete autolista ${id}`);
  };

  return (
    <PageContainer title="Autolistas" description="Gestión de autolistas para redes sociales">
      <Box>
        {/* Header con branding profesional */}
        <HeaderCard>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <IconList size={32} color="white" />
                </Avatar>
                <Box>
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
                      mb: 1,
                    }}
                  >
                    Autolistas
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    fontWeight={400}
                  >
                    Gestiona y automatiza tus publicaciones en redes sociales
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<IconSparkles size={16} />}
                  label="IA Integrada"
                  variant="outlined"
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<IconCalendar size={16} />}
                  label="Programación Automática"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#10B981', 0.3),
                    color: '#059669',
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
                <Link href="/planificacion/autolistas/crear" passHref>
                  <PremiumButton
                    startIcon={<IconPlus />}
                    fullWidth
                  >
                    Nueva autolista
                  </PremiumButton>
                </Link>
                <SubtleButton
                  variant="outlined"
                  startIcon={<IconMenu2 />}
                  fullWidth
                >
                  Gestionar plantillas
                </SubtleButton>
              </Stack>
            </Grid>
          </Grid>
        </HeaderCard>

        {/* Contenido principal */}
        <StyledTableCard>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                Mis autolistas
              </Typography>
              <TextField
                size="small"
                placeholder="Buscar autolistas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} color="gray" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: alpha('#f8fafc', 0.8),
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Nombre
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Próxima publicación
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Redes sociales
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Publicaciones pendientes
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Estado
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Acciones
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAutolistas.map((autolista) => (
                    <TableRow 
                      key={autolista.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="text.primary">
                          {autolista.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {autolista.nextPublication || 'Sin programar'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {autolista.socialNetworks.map((platform) => (
                            <Tooltip key={platform} title={platform}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SocialIcon platform={platform} />
                              </Box>
                            </Tooltip>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2">
                            {autolista.pendingPublications}
                          </Typography>
                          <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <IconMenu2 size={16} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                          <Switch
                            checked={autolista.isActive}
                            onChange={() => handleToggleActive(autolista.id)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: theme.palette.primary.main,
                                '& + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              },
                            }}
                          />
                          <Chip
                            label={autolista.isActive ? "Activa" : "Inactiva"}
                            size="small"
                            sx={{
                              bgcolor: autolista.isActive 
                                ? alpha('#10B981', 0.1)
                                : alpha('#64748b', 0.1),
                              color: autolista.isActive 
                                ? '#059669'
                                : '#475569',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              border: `1px solid ${autolista.isActive 
                                ? alpha('#10B981', 0.2)
                                : alpha('#64748b', 0.2)}`,
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            onClick={() => handleDelete(autolista.id)}
                            size="small"
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                backgroundColor: alpha('#ef4444', 0.1),
                              },
                            }}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredAutolistas.length === 0 && (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No se encontraron autolistas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Crea tu primera autolista para comenzar a automatizar tus publicaciones
                </Typography>
                <Link href="/new/planificacion/autolistas/crear" passHref>
                  <PremiumButton
                    startIcon={<IconPlus />}
                  >
                    Crear primera autolista
                  </PremiumButton>
                </Link>
              </Box>
            )}
          </Box>
        </StyledTableCard>
      </Box>
    </PageContainer>
  );
} 