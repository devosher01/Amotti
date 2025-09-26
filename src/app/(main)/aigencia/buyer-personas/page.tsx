"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Avatar,
  alpha,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconUsers,
  IconSparkles,
  IconTarget,
  IconPlus,
  IconSearch,
  IconEye,
  IconDownload,
  IconUser,
  IconBriefcase,
  IconHeart,
} from "@tabler/icons-react";

import { BuyerPersonaModal } from './components/BuyerPersonaModal';
import PageContainer from "@/features/shared/components/container/PageContainer";
import BlankCard from "@/features/shared/components/shared/BlankCard";

// Styled Components con el mismo branding de Autolistas y Empresa
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
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

const StyledContentCard = styled(BlankCard)(({ theme }) => ({
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: `0 4px 20px ${alpha('#5b24b7', 0.06)}`,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.90) 100%)'
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
}));

// Tipos 
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

// Datos mock
const mockBuyerPersonas: BuyerPersona[] = [
  {
    id: '1',
    name: 'María Ejecutiva',
    title: 'Directora de Marketing Digital',
    demographics: {
      age: '28-35 años',
      location: 'Bogotá, Colombia',
      income: '$4.000.000 - $8.000.000 COP',
      education: 'Universitaria/Posgrado',
    },
    psychographics: {
      interests: ['Marketing Digital', 'Innovación', 'Networking', 'Tecnología'],
      values: ['Eficiencia', 'Calidad', 'Innovación', 'Resultados'],
      lifestyle: 'Profesional ocupada, valora la eficiencia y las soluciones que ahorren tiempo',
    },
    painPoints: [
      'Falta de tiempo para investigar nuevas herramientas',
      'Presión por mostrar ROI rápido',
      'Dificultad para encontrar proveedores confiables',
    ],
    goals: [
      'Aumentar la eficiencia de sus campañas',
      'Mejorar el ROI de marketing',
      'Mantenerse actualizada con las tendencias',
    ],
    preferredChannels: ['LinkedIn', 'Email', 'Webinars', 'Contenido especializado'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Carlos Emprendedor',
    title: 'Fundador de Startup Tecnológica',
    demographics: {
      age: '25-32 años',
      location: 'Medellín, Colombia',
      income: '$3.000.000 - $6.000.000 COP',
      education: 'Universitaria',
    },
    psychographics: {
      interests: ['Emprendimiento', 'Tecnología', 'Escalabilidad', 'Inversión'],
      values: ['Innovación', 'Crecimiento', 'Impacto', 'Agilidad'],
      lifestyle: 'Emprendedor ambicioso, busca soluciones escalables y rentables',
    },
    painPoints: [
      'Presupuesto limitado para marketing',
      'Necesidad de crecimiento rápido',
      'Falta de experiencia en marketing',
    ],
    goals: [
      'Escalar su negocio rápidamente',
      'Conseguir inversión',
      'Posicionar su marca en el mercado',
    ],
    preferredChannels: ['Redes sociales', 'Eventos de networking', 'Podcasts', 'Communities'],
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Ana Consultora',
    title: 'Consultora en Transformación Digital',
    demographics: {
      age: '35-42 años',
      location: 'Cali, Colombia',
      income: '$6.000.000 - $12.000.000 COP',
      education: 'Posgrado/MBA',
    },
    psychographics: {
      interests: ['Transformación Digital', 'Liderazgo', 'Estrategia', 'Formación'],
      values: ['Excelencia', 'Conocimiento', 'Impacto', 'Desarrollo'],
      lifestyle: 'Profesional senior que busca herramientas especializadas y de alta calidad',
    },
    painPoints: [
      'Necesidad de herramientas especializadas',
      'Dificultad para capacitar equipos',
      'Presión por resultados tangibles',
    ],
    goals: [
      'Liderar proyectos exitosos',
      'Desarrollar equipos de alto rendimiento',
      'Mantenerse a la vanguardia tecnológica',
    ],
    preferredChannels: ['LinkedIn', 'Conferencias', 'Webinars técnicos', 'White papers'],
    createdAt: '2024-01-05',
  },
];

// Card de Buyer Persona siguiendo el patrón
const BuyerPersonaCard: React.FC<{ 
  persona: BuyerPersona; 
  onView: (persona: BuyerPersona) => void;
  onDownload: (personaId: string) => void;
}> = ({ persona, onView, onDownload }) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: '16px',
      border: `1px solid ${alpha('#5b24b7', 0.08)}`,
      background: (theme) => theme.palette.mode === 'dark' 
        ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.90) 100%)'
        : 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
      transition: 'all 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 20px 40px ${alpha('#5b24b7', 0.15)}`,
        borderColor: alpha('#5b24b7', 0.2),
      },
    }}
  >
    <CardContent sx={{ p: 3, flexGrow: 1 }}>
      {/* Header del persona */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
            boxShadow: `0 8px 24px ${alpha('#5b24b7', 0.2)}`,
          }}
        >
          <IconUser size={28} color="white" />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {persona.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {persona.title}
          </Typography>
        </Box>
      </Stack>

      {/* Demographics */}
      <Box mb={3}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconBriefcase size={16} color="#5b24b7" />
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            Demografía
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Edad:</strong> {persona.demographics.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Ubicación:</strong> {persona.demographics.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Ingresos:</strong> {persona.demographics.income}
          </Typography>
        </Stack>
      </Box>

      {/* Pain Points */}
      <Box mb={3}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconTarget size={16} color="#5b24b7" />
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            Principales Desafíos
          </Typography>
        </Stack>
        <Stack spacing={1}>
          {persona.painPoints.slice(0, 2).map((pain, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              • {pain}
            </Typography>
          ))}
          {persona.painPoints.length > 2 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              +{persona.painPoints.length - 2} más...
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Intereses/Tags */}
      <Box mb={3}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconHeart size={16} color="#5b24b7" />
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            Intereses
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {persona.psychographics.interests.slice(0, 3).map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              size="small"
              sx={{
                backgroundColor: alpha('#5b24b7', 0.1),
                color: '#5b24b7',
                fontWeight: 500,
                fontSize: '0.75rem',
                border: `1px solid ${alpha('#5b24b7', 0.2)}`,
              }}
            />
          ))}
          {persona.psychographics.interests.length > 3 && (
            <Chip
              label={`+${persona.psychographics.interests.length - 3}`}
              size="small"
              sx={{
                backgroundColor: alpha('#6b7280', 0.1),
                color: '#6b7280',
                fontWeight: 500,
                fontSize: '0.75rem',
                border: `1px solid ${alpha('#6b7280', 0.2)}`,
              }}
            />
          )}
        </Stack>
      </Box>

      {/* Fecha de creación */}
      <Typography variant="caption" color="text.secondary">
        Creado: {new Date(persona.createdAt).toLocaleDateString('es-ES')}
      </Typography>
    </CardContent>

    <CardActions sx={{ p: 3, pt: 0 }}>
      <Stack direction="row" spacing={1} width="100%">
        <SubtleButton
          variant="outlined"
          startIcon={<IconEye size={16} />}
          size="small"
          onClick={() => onView(persona)}
          sx={{ flex: 1 }}
        >
          Ver
        </SubtleButton>
        <PremiumButton
          startIcon={<IconDownload size={16} />}
          size="small"
          onClick={() => onDownload(persona.id)}
          sx={{ flex: 1 }}
        >
          PDF
        </PremiumButton>
      </Stack>
    </CardActions>
  </Card>
);

export default function BuyerPersonasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<BuyerPersona | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredPersonas = mockBuyerPersonas.filter(persona =>
    persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPersona = (persona: BuyerPersona) => {
    setSelectedPersona(persona);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPersona(null);
  };

  const handleDownloadPDF = async (personaId: string) => {
    try {
      console.log('Descargando PDF para persona:', personaId);
      const downloadUrl = `/api/buyer-personas/${personaId}/pdf`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `buyer-persona-${personaId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('PDF descargado exitosamente');
    } catch (error) {
      console.error('Error al descargar PDF:', error);
    }
  };

  return (
    <PageContainer title="Buyer Personas" description="Perfiles detallados de tus clientes ideales generados con IA">
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
                    background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
                    boxShadow: `0 8px 24px ${alpha('#5b24b7', 0.2)}`,
                  }}
                >
                  <IconUsers size={32} color="white" />
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
                    Buyer Personas
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    fontWeight={400}
                  >
                    Perfiles detallados de tus clientes ideales generados con IA
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<IconSparkles size={16} />}
                  label="IA Integrada"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#5b24b7', 0.3),
                    color: '#5b24b7',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<IconTarget size={16} />}
                  label="Segmentación Avanzada"
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
                <PremiumButton
                  startIcon={<IconPlus />}
                  fullWidth
                >
                  Generar Nuevos Personas
                </PremiumButton>
                <SubtleButton
                  variant="outlined"
                  startIcon={<IconTarget />}
                  fullWidth
                >
                  Analizar Audiencia
                </SubtleButton>
              </Stack>
            </Grid>
          </Grid>
        </HeaderCard>

        {/* Contenido principal */}
        <StyledContentCard>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                Mis Buyer Personas
              </Typography>
              <TextField
                size="small"
                placeholder="Buscar personas..."
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
                      borderColor: '#5b24b7',
                    },
                  },
                }}
              />
            </Stack>

            {/* Grid de Buyer Personas */}
            <Grid container spacing={3}>
              {filteredPersonas.map((persona) => (
                <Grid item xs={12} md={6} lg={4} key={persona.id}>
                  <BuyerPersonaCard 
                    persona={persona} 
                    onView={handleViewPersona}
                    onDownload={handleDownloadPDF}
                  />
                </Grid>
              ))}
            </Grid>

            {filteredPersonas.length === 0 && (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No se encontraron buyer personas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Completa tu perfil de empresa para generar buyer personas personalizados'}
                </Typography>
                <PremiumButton
                  startIcon={<IconPlus />}
                >
                  {searchTerm ? 'Limpiar búsqueda' : 'Generar Primeros Personas'}
                </PremiumButton>
              </Box>
            )}
          </Box>
        </StyledContentCard>

        {/* Modal de detalle */}
        <BuyerPersonaModal
          open={modalOpen}
          onClose={handleCloseModal}
          persona={selectedPersona}
          onDownload={handleDownloadPDF}
        />
      </Box>
    </PageContainer>
  );
}