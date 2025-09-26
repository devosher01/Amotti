"use client";

import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Stack, 
  Avatar, 
  alpha, 
  Chip, 
  Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconBuildingBank, 
  IconSparkles, 
  IconTarget, 
  IconUsers, 
  IconDeviceFloppy 
} from '@tabler/icons-react';
import { useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';


// Components - Following Clean Architecture
import { BasicInfoSection } from './components/sections/BasicInfoSection';
import { StorytellingSection } from './components/sections/StorytellingSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { AudienceSection } from './components/sections/AudienceSection';
import { CompetitionSection } from './components/sections/CompetitionSection';
import { BrandingSection } from './components/sections/BrandingSection';
import { ChannelsSection } from './components/sections/ChannelsSection';

// Hooks - Business Logic Separation
import { useCompanyProfile } from './hooks/useCompanyProfile';
import PageContainer from '@/features/shared/components/container/PageContainer';
import BlankCard from '@/features/shared/components/shared/BlankCard';

// Styled Components con el mismo branding de Autolistas
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


// Main Page Component - Single Responsibility: Layout and Orchestration
export default function EmpresaPage() {
  const customizer = useSelector((state: AppState) => state.customizer);
  const isDark = customizer.activeMode === 'dark';
  
  const {
    profile,
    setProfile,
    activeSection,
    setActiveSection,
    completionPercentage,
    getSectionCompletionStatus,
    addArrayItem,
    removeArrayItem,
    handleSave,
  } = useCompanyProfile();

  return (
    <PageContainer title="Perfil de Empresa" description="Configura el perfil completo de tu empresa">
      <Box>
        {/* Header con el mismo diseño de Autolistas */}
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
                  <IconBuildingBank size={32} color="white" />
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
                    Perfil de Empresa
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    fontWeight={400}
                  >
                    Define la identidad y estrategia de tu marca
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<IconSparkles size={16} />}
                  label={`${Math.round(completionPercentage)}% Completado`}
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#5b24b7', 0.3),
                    color: '#5b24b7',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<IconTarget size={16} />}
                  label="Perfil Estratégico"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#10B981', 0.3),
                    color: '#059669',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<IconUsers size={16} />}
                  label="Análisis de Audiencia"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#F59E0B', 0.3),
                    color: '#D97706',
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
                <PremiumButton
                  startIcon={<IconDeviceFloppy />}
                  fullWidth
                  onClick={handleSave}
                >
                  Guardar Perfil
                </PremiumButton>
                <SubtleButton
                  variant="outlined"
                  startIcon={<IconSparkles />}
                  fullWidth
                >
                  Vista Previa
                </SubtleButton>
              </Stack>
            </Grid>
          </Grid>
        </HeaderCard>

        {/* Navegación simple como Autolistas */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Configuración del perfil
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {[
              { id: 'basic', label: 'Información Básica', icon: IconBuildingBank },
              { id: 'storytelling', label: 'Historia de la Empresa', icon: IconSparkles },
              { id: 'products', label: 'Productos', icon: IconTarget },
              { id: 'audience', label: 'Audiencia', icon: IconUsers },
              { id: 'competition', label: 'Competencia', icon: IconTarget },
              { id: 'branding', label: 'Branding', icon: IconSparkles },
              { id: 'channels', label: 'Canales', icon: IconTarget },
            ].map((section) => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.id;
              const isCompleted = getSectionCompletionStatus(section.id as any);
              
              return (
                <Button
                  key={section.id}
                  variant={isActive ? "contained" : "outlined"}
                  onClick={() => setActiveSection(section.id as any)}
                  startIcon={<IconComponent size={18} />}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                    backgroundColor: isActive ? '#5b24b7' : 'transparent',
                    borderColor: isCompleted ? '#10B981' : alpha('#5b24b7', 0.2),
                    color: isActive 
                      ? 'white' 
                      : isCompleted 
                        ? '#10B981' 
                        : '#5b24b7',
                    '&:hover': {
                      backgroundColor: isActive 
                        ? '#4c1d9a' 
                        : alpha('#5b24b7', 0.04),
                      borderColor: isActive ? '#4c1d9a' : '#5b24b7',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {section.label}
                </Button>
              );
            })}
          </Stack>
        </Box>

        {/* Contenido principal simplificado */}
        <StyledContentCard>
          <Box sx={{ padding: 3 }}>
            {activeSection === 'basic' && (
              <BasicInfoSection 
                              profile={profile}
                              setProfile={setProfile} isDark={false}              />
            )}

            {activeSection === 'storytelling' && (
              <StorytellingSection 
                profile={profile}
                setProfile={setProfile}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
                isDark={isDark}
              />
            )}

            {activeSection === 'products' && (
              <ProductsSection 
                profile={profile}
                setProfile={setProfile}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}

            {activeSection === 'audience' && (
              <AudienceSection 
                profile={profile}
                setProfile={setProfile}
              />
            )}

            {activeSection === 'competition' && (
              <CompetitionSection 
                profile={profile}
                setProfile={setProfile}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}

            {activeSection === 'branding' && (
              <BrandingSection 
                profile={profile}
                setProfile={setProfile}
              />
            )}

            {activeSection === 'channels' && (
              <ChannelsSection 
                profile={profile}
                setProfile={setProfile}
              />
            )}
          </Box>
        </StyledContentCard>
      </Box>
    </PageContainer>
  );
}




