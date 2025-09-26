"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Stack,
  IconButton,
  TextField,
  Button,
  Grid,
  alpha,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconX,
  IconCalendar,
  IconClock,
  IconSettings,
} from "@tabler/icons-react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { PlatformSelector } from "./components/PlatformSelector";
import ConfigurationSection from "./ConfigurationSection";
import { ContentEditor } from "./components/ContentEditor";
import LogsSection from "@/features/shared/components/calendar_social_media/LogsSection";
import { ScheduleActionButton } from "./components/ScheduleActionButton";
import { SocialPreview } from "@/features/shared/components/calendar_social_media/components/SocialPreview";
import { usePlatformConfig } from "../../hooks/usePlatformConfig";
import { SocialMediaPostType } from "../../../../publications/domain/types";
import { PublishProgressDialog } from "./components/PublishProgressDialog";
import { usePostCreationDialog } from "@/features/planning/ui/hooks/usePostCreationDialog";


// Styled Components con el mismo branding de la aplicación
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    boxShadow: `0 24px 80px ${alpha(theme.palette.primary.main, 0.12)}`,
    backdropFilter: 'blur(20px)',
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
      : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  }
}));


const ContentSection = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Evita scroll externo
  minHeight: 0, // Permite que flex shrink funcione
}));

const ScrollableContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(3),
  minHeight: 0, // Permite que flex shrink funcione
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.primary.main, 0.05),
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.3),
    borderRadius: '3px',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.5),
    },
  },
}));

const DynamicContentContainer = styled(Stack)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0, // Permite que flex shrink funcione
  '& > *': {
    flexShrink: 0, // Los elementos fijos no se encogen
  },
  '& > *:nth-of-type(2)': { // ContentEditor (campo de texto)
    flexGrow: 1,
    minHeight: 0, // Permite que se haga pequeño cuando se despliegan otros
  },
}));

const FixedFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
  flexShrink: 0, // No se comprime
}));

const PreviewSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.6)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.7)} 100%)`,
  borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  padding: theme.spacing(3),
  overflow: 'auto',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '3px',
    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
    opacity: 0.6,
  },
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.primary.main, 0.05),
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.3),
    borderRadius: '3px',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.5),
    },
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

interface PostCreationDialogProps {
  open: boolean;
  post: SocialMediaPostType | null;
  onClose: () => void;
  onSave: (postData: SocialMediaPostType) => void;
  isEditMode?: boolean;
  publicationId?: string;
}

export const PostCreationDialog: React.FC<PostCreationDialogProps> = ({
  open,
  post,
  onClose,
  isEditMode = false,
  publicationId,
}) => {
  const theme = useTheme();
  
  // Hook LIMPIO para el diálogo
  const {
    formData,
    mediaFiles,
    isProcessing,
    error,
    updateContent,
    togglePlatform,
    setContentType,
    handleMediaUpload,
    removeMediaFile,
    handleDateTimeChange,
    resetForm,
    handleCreateOrUpdate,
  } = usePostCreationDialog();

  // Estados derivados simples
  const hasImage = mediaFiles.length > 0;
  const isFormValid = formData.platforms.length > 0 && (formData.content.trim().length > 0 || hasImage);

  const {
    globalConfig,
    updateGlobalConfig,
  } = usePlatformConfig();

  // Estado simple para mostrar resultado
  const [showResult, setShowResult] = React.useState(false);
  const [lastResponse, setLastResponse] = React.useState<any>(null);



  // Resetear formulario cuando se abra/cierre
  React.useEffect(() => {
    if (open && post) {
      // Si hay un post para editar, cargarlo
      // updateFormData(post); // TODO: Implementar si es necesario
    } else if (!open) {
      // Al cerrar, resetear
      resetForm();
    }
  }, [open, post, resetForm]);

  const handleAction = async (action: string) => {
    // Mapear acciones a tipos de API
    let apiAction: 'draft' | 'publish_now' | 'schedule';
    
    switch (action) {
      case 'schedule':
        apiAction = 'schedule';
        break;
      case 'draft':
      case 'library':
      case 'review':
        apiAction = 'draft';
        break;
      case 'publish':
        apiAction = 'publish_now';
        break;
      default:
        apiAction = 'publish_now';
    }

    // Validar formulario (excepto para borradores)
    if (!isFormValid && apiAction !== 'draft') {
      return;
    }

    try {
      const response = await handleCreateOrUpdate(apiAction, isEditMode, publicationId);
      setLastResponse(response);
      
      // Si fue exitosa, cerrar el modal
      if (response.success) {
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1000);
      } else {
        // Mostrar error brevemente
        setShowResult(true);
        setTimeout(() => setShowResult(false), 3000);
      }
    } catch (error) {
      console.error('Error during publication:', error);
    }
  };


  return (
    <StyledDialog
      open={open}
      onClose={() => { }}
      maxWidth="xl"
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh',
          width: '95vw',
          maxWidth: '95vw',
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Lado izquierdo - Formulario */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header fijo con botón cerrar */}
            {/* <HeaderSection sx={{ flexShrink: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    background: 'linear-gradient(135deg, #5b24b7 0%, #4f46e5 100%)',
                    width: 40,
                    height: 40
                  }}>
                    <IconEdit size={20} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#5b24b7' }}>
                      Crear Publicación
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Diseña y programa tu contenido para redes sociales
                    </Typography>
                  </Box>
                </Box>
                <IconButton 
                  onClick={onClose} 
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: alpha('#5b24b7', 0.08),
                      color: '#5b24b7',
                    }
                  }}
                >
                  <IconX size={20} />
                </IconButton>
              </Box>
            </HeaderSection> */}

            {/* Contenido principal - Flexible */}
            <ContentSection>
              <ScrollableContentArea>
                <DynamicContentContainer spacing={2}>
                  {/* 1. Platform Selector - Fijo */}
                  <Box sx={{ flexShrink: 0 }}>
                    <PlatformSelector
                      selectedPlatforms={formData.platforms}
                      selectedContentTypes={formData.platformContentTypes || {}}
                      onTogglePlatform={togglePlatform}
                      onContentTypeChange={setContentType}
                    />
                  </Box>

                  {/* 2. Content Editor - Flexible y con scroll interno */}
                  <Box sx={{
                    flexGrow: 1,
                    minHeight: 200, // Altura mínima
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <ContentEditor
                      content={formData.content}
                      onContentChange={updateContent}
                      hasImage={hasImage}
                      onToggleImage={() => {}} // No necesario con la nueva lógica
                      onMediaUpload={handleMediaUpload}
                      mediaFiles={mediaFiles}
                      onRemoveMediaFile={removeMediaFile}
                    />
                  </Box>

                  {/* 3. Configuration, Media Validation y Logs - Se expanden según necesidad */}
                  <Box sx={{ flexShrink: 0 }}>
                    <Stack spacing={1}>
                      <ConfigurationSection
                        items={[
                          {
                            id: 'global',
                            title: 'Configuración global',
                            icon: <IconSettings size={16} />,
                            color: theme.palette.primary.main,
                            settings: [
                              {
                                label: 'Auto publicar',
                                value: globalConfig.autoPublish,
                                onChange: (value) => updateGlobalConfig('autoPublish', value),
                                description: 'Publicar automáticamente en la fecha programada'
                              },
                              // {
                              //   label: 'Acortador de URLs',
                              //   value: globalConfig.urlShortener,
                              //   onChange: (value) => updateGlobalConfig('urlShortener', value),
                              //   description: 'Acortar automáticamente las URLs en el contenido'
                              // },
                              // {
                              //   label: 'Optimización de hashtags',
                              //   value: globalConfig.hashtagOptimization,
                              //   onChange: (value) => updateGlobalConfig('hashtagOptimization', value),
                              //   description: 'Optimizar automáticamente los hashtags para mejor alcance'
                              // }
                            ]
                          },
                          ...(formData.platforms.includes('instagram') ? [{
                            id: 'instagram',
                            title: 'Configuración de Instagram',
                            icon: <IconSettings size={16} />,
                            color: theme.palette.secondary.main,
                            settings: [
                              {
                                label: 'Colaboradores',
                                value: false,
                                onChange: () => { },
                                description: 'Colaboradores',
                                isSpecial: true,
                                specialType: 'collaborator' as const
                              }
                            ]
                          }] : [])
                        ]}
                      />

                      {/* LogsSection removido - validaciones simplificadas */}
                    </Stack>
                  </Box>
                </DynamicContentContainer>
              </ScrollableContentArea>
            </ContentSection>

            {/* Footer fijo con acciones */}
            <FixedFooter>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <SubtleButton
                  variant="outlined"
                  onClick={onClose}
                  startIcon={<IconX size={16} />}
                >
                  Cancelar
                </SubtleButton>

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DateTimePicker
                    value={formData.scheduledTime}
                    onChange={handleDateTimeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        sx={{
                          minWidth: 200,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            '&:hover': {
                              backgroundColor: theme.palette.background.default,
                            },
                            '&.Mui-focused': {
                              backgroundColor: theme.palette.background.paper,
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: theme.palette.primary.main }}>
                              <IconCalendar size={16} style={{ marginRight: 4 }} />
                              <IconClock size={16} />
                            </Box>
                          )
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>

                <ScheduleActionButton
                  onAction={handleAction}
                  disabled={!isFormValid || isProcessing}
                  formData={formData}
                  isEditMode={isEditMode}
                  isProcessing={isProcessing}
                />
              </Box>
            </FixedFooter>
          </Grid>

          {/* Lado derecho - Preview */}
          <Grid item xs={12} md={5}>
            <PreviewSection sx={{ height: '100%' }}>
              <SocialPreview
                formData={formData as any} // Cast para compatibilidad temporal
                hasImage={hasImage}
                selectedContentTypes={formData.platformContentTypes || {}}
                mediaFiles={mediaFiles}
              />
            </PreviewSection>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Mostrar error si hay */}
      {showResult && lastResponse && !lastResponse.success && (
        <Box sx={{ 
          position: 'absolute', 
          top: 20, 
          right: 20, 
          background: 'error.main', 
          color: 'white', 
          p: 2, 
          borderRadius: 2 
        }}>
          {lastResponse.message}
        </Box>
      )}
    </StyledDialog>
  );
};