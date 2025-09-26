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
  useTheme,
  alpha,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconX,
  IconCalendar,
  IconClock,
  IconSettings,
  IconSparkles,
  IconEdit,
} from "@tabler/icons-react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

import { SocialMediaPostType } from "./types";
import { usePostForm } from "./hooks/usePostForm";
import { usePlatformConfig } from "./hooks/usePlatformConfig";
import { usePostValidation } from "./hooks/usePostValidation";
import { PlatformSelector } from "./components/PlatformSelector";
import { ContentEditor } from "./components/ContentEditor";
import { SocialPreview } from "./components/SocialPreview";
import { ScheduleActionButton } from "./components/ScheduleActionButton";
import ConfigurationSection from "./ConfigurationSection";
import LogsSection from "./LogsSection";

// Styled Components con el mismo branding de la aplicación
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    border: `1px solid ${alpha('#5b24b7', 0.08)}`,
    boxShadow: `0 24px 80px ${alpha('#5b24b7', 0.12)}`,
    backdropFilter: 'blur(20px)',
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(91,36,183,0.08) 0%, rgba(79,70,229,0.12) 100%)'
    : 'linear-gradient(135deg, rgba(91,36,183,0.04) 0%, rgba(79,70,229,0.08) 100%)',
  borderBottom: `1px solid ${alpha('#5b24b7', 0.08)}`,
  padding: theme.spacing(3),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #5b24b7 0%, #4f46e5 50%, #6366f1 100%)',
    opacity: 0.8,
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.mode === 'dark'
    ? 'rgba(30,41,59,0.3)'
    : 'rgba(248,250,252,0.5)',
}));

const PreviewSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.90) 100%)'
    : 'linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(241,245,249,0.90) 100%)',
  borderLeft: `1px solid ${alpha('#5b24b7', 0.08)}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '3px',
    background: 'linear-gradient(180deg, #5b24b7 0%, #4f46e5 50%, #6366f1 100%)',
    opacity: 0.6,
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

interface PostCreationDialogProps {
  open: boolean;
  post: SocialMediaPostType | null;
  onClose: () => void;
  onSave: (postData: SocialMediaPostType) => void;
}

export const PostCreationDialog: React.FC<PostCreationDialogProps> = ({
  open,
  post,
  onClose,
  onSave,
}) => {
  const theme = useTheme();

  const {
    formData,
    hasImage,
    setHasImage,
    selectedContentTypes,
    handleInputChange,
    handleDateTimeChange,
    togglePlatform,
    handleContentTypeChange,
  } = usePostForm({ initialPost: post, isOpen: open });

  const {
    globalConfig,
    instagramConfig,
    updateGlobalConfig,
    updateInstagramConfig,
  } = usePlatformConfig();

  const { logs, isValid } = usePostValidation({ formData });

  const handleAction = (action: string) => {
    if (!isValid && action !== 'draft') return;
    
    switch (action) {
      case 'schedule':
        onSave({ ...formData, status: 'scheduled' });
        break;
      case 'draft':
        onSave({ ...formData, status: 'draft' });
        break;
      case 'library':
        onSave({ ...formData, status: 'library' });
        break;
      case 'review':
        onSave({ ...formData, status: 'review' });
        break;
      case 'publish':
        onSave({ ...formData, status: 'published', scheduledTime: new Date() });
        break;
      default:
        onSave(formData);
    }
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={() => {}}
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
      <DialogContent sx={{ p: 0, height: '100%' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header con branding */}
            <HeaderSection>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
                    boxShadow: `0 8px 24px ${alpha('#5b24b7', 0.2)}`,
                  }}
                >
                  <IconEdit size={24} color="white" />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h4" 
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
                    Crear Publicación
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    fontWeight={400}
                  >
                    Diseña y programa tu contenido para redes sociales
                  </Typography>
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
              </Stack>
            </HeaderSection>

            <ContentSection sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

              <PlatformSelector
                selectedPlatforms={formData.platforms}
                selectedContentTypes={selectedContentTypes}
                onTogglePlatform={togglePlatform}
                onContentTypeChange={handleContentTypeChange}
              />

              <ContentEditor
                content={formData.content}
                onContentChange={(content) => handleInputChange('content', content)}
                hasImage={hasImage}
                onToggleImage={() => setHasImage(!hasImage)}
              />

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
                        {
                          label: 'Acortador de URLs',
                          value: globalConfig.urlShortener,
                          onChange: (value) => updateGlobalConfig('urlShortener', value),
                          description: 'Acortar automáticamente las URLs en el contenido'
                        },
                        {
                          label: 'Optimización de hashtags',
                          value: globalConfig.hashtagOptimization,
                          onChange: (value) => updateGlobalConfig('hashtagOptimization', value),
                          description: 'Optimizar automáticamente los hashtags para mejor alcance'
                        }
                      ]
                    },
                    ...(formData.platforms.includes('instagram') ? [{
                      id: 'instagram',
                      title: 'Configuración de Instagram',
                      icon: <IconSettings size={16} />,
                      color: '#E4405F',
                      settings: [
                        {
                          label: 'Agregar hashtags automáticamente',
                          value: instagramConfig.autoAddHashtags,
                          onChange: (value: boolean) => updateInstagramConfig('autoAddHashtags', value),
                          description: 'Agregar hashtags relevantes automáticamente'
                        },
                        {
                          label: 'Destacar en historias',
                          value: instagramConfig.storyHighlights,
                          onChange: (value: boolean) => updateInstagramConfig('storyHighlights', value),
                          description: 'Guardar automáticamente en destacados'
                        },
                        {
                          label: 'Etiquetado de ubicación',
                          value: instagramConfig.locationTagging,
                          onChange: (value: boolean) => updateInstagramConfig('locationTagging', value),
                          description: 'Permitir etiquetado de ubicaciones'
                        }
                      ]
                    }] : [])
                  ]}
                />
                
                <LogsSection logs={logs} />
              </Stack>

              <Box sx={{ 
                pt: 3,
                borderTop: `2px solid ${alpha('#5b24b7', 0.08)}`,
                mt: 'auto',
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha('#5b24b7', 0.05)} 0%, ${alpha('#4f46e5', 0.08)} 100%)`
                  : `linear-gradient(135deg, ${alpha('#5b24b7', 0.02)} 0%, ${alpha('#4f46e5', 0.04)} 100%)`,
                borderRadius: theme.spacing(2),
                p: 3,
                mx: -3,
                mb: -3
              }}>
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
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: '#5b24b7' }}>
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
                    disabled={false}
                    formData={formData}
                  />
                </Box>
              </Box>
              </Stack>
            </ContentSection>
          </Grid>

          <Grid item xs={12} md={5}>
            <PreviewSection sx={{ height: '100%' }}>
              <SocialPreview 
                formData={formData}
                hasImage={hasImage}
              />
            </PreviewSection>
          </Grid>
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
};