import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  LinearProgress,
  IconButton,
  Divider,
  Stack,
  Paper,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  Schedule,
  AutoAwesome,
  Favorite,
  Comment,
  Visibility
} from '@mui/icons-material';
import { generateMockCampaign, MockCampaign } from './mockCampaignData';

interface CampaignGeneratorModalProps {
  open: boolean;
  onClose: () => void;
}

const CampaignGeneratorModal: React.FC<CampaignGeneratorModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const [campaign, setCampaign] = useState<MockCampaign | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const generationSteps = [
    'Analizando audiencia objetivo...',
    'Generando contenido creativo...',
    'Optimizando horarios de publicación...',
    'Preparando parrilla de contenido...',
    'Finalizando campaña...'
  ];

  useEffect(() => {
    if (open && !campaign) {
      startGeneration();
    }
  }, [open]);

  const startGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(0);

    // Simular proceso de generación
    for (let step = 0; step < generationSteps.length; step++) {
      setCurrentStep(step);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Generar campaña mock
    const newCampaign = generateMockCampaign('Aumentar Engagement', 30);
    setCampaign(newCampaign);
    setIsGenerating(false);
  };

  const handleClose = () => {
    setCampaign(null);
    setIsGenerating(false);
    setCurrentStep(0);
    onClose();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return '📘';
      case 'instagram':
        return '📷';
      default:
        return '📱';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return '📝';
      case 'reel':
        return '🎥';
      case 'story':
        return '📖';
      default:
        return '📱';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      promocional: theme.palette.error.main,
      educativo: theme.palette.info.main,
      entretenimiento: theme.palette.success.main,
      testimonial: theme.palette.warning.main,
      behind_scenes: theme.palette.secondary.main,
      user_generated: theme.palette.primary.main
    };
    return colors[category as keyof typeof colors] || theme.palette.grey[500];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          minHeight: '85vh',
          maxHeight: '85vh',
          bgcolor: theme.palette.background.default
        }
      }}
    >
      <DialogTitle sx={{
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography variant="h6" fontWeight="600" color="text.primary">
              Generador de Campañas IA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crea campañas publicitarias completas
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              bgcolor: theme.palette.action.hover
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, height: 'calc(85vh - 80px)', overflow: 'hidden' }}>
        {isGenerating ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            sx={{
              bgcolor: theme.palette.background.default,
              p: 4
            }}
          >
            <Box textAlign="center" mb={4}>
              <AutoAwesome sx={{
                fontSize: 48,
                color: theme.palette.primary.main,
                mb: 2,
                animation: 'pulse 2s infinite'
              }} />
              <Typography variant="h5" fontWeight="600" color="text.primary" gutterBottom>
                Generando tu campaña
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Creando contenido personalizado y optimizado
              </Typography>
            </Box>

            <Box width="100%" maxWidth={500} mb={3}>
              <LinearProgress
                variant="determinate"
                value={(currentStep / (generationSteps.length - 1)) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: theme.palette.action.hover,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            <Typography variant="body1" color="text.primary" textAlign="center">
              {generationSteps[currentStep]}
            </Typography>
          </Box>
        ) : campaign ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Content */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 3, bgcolor: theme.palette.background.default }}>
              <Grid container spacing={3}>
                {campaign.posts.map((post, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={post.id}>
                    <Card
                      elevation={1}
                      sx={{
                        height: '100%',
                        transition: 'all 0.2s ease',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4]
                        }
                      }}
                    >
                      <Box position="relative">
                        <CardMedia
                          component="img"
                          height="180"
                          image={post.content.imageUrl}
                          alt="Post preview"
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          position="absolute"
                          top={8}
                          left={8}
                          display="flex"
                          gap={1}
                        >
                          <Chip
                            size="small"
                            label={`${getPlatformIcon(post.platform)} ${post.platform}`}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.95)',
                              backdropFilter: 'blur(8px)',
                              fontSize: '0.7rem',
                              height: 24
                            }}
                          />
                          <Chip
                            size="small"
                            label={`${getTypeIcon(post.type)}`}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.95)',
                              backdropFilter: 'blur(8px)',
                              fontSize: '0.7rem',
                              height: 24
                            }}
                          />
                        </Box>
                        <Box
                          position="absolute"
                          top={8}
                          right={8}
                        >
                          <Chip
                            size="small"
                            label={post.scheduledTime}
                            icon={<Schedule sx={{ fontSize: 14 }} />}
                            sx={{
                              bgcolor: 'rgba(0,0,0,0.8)',
                              color: 'white',
                              fontSize: '0.7rem',
                              height: 24,
                              '& .MuiChip-icon': {
                                color: 'white',
                                fontSize: 14
                              }
                            }}
                          />
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 2 }}>
                        <Box mb={2}>
                          <Chip
                            size="small"
                            label={post.category}
                            sx={{
                              bgcolor: getCategoryColor(post.category),
                              color: 'white',
                              mb: 1.5,
                              fontSize: '0.7rem',
                              height: 22
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{
                              lineHeight: 1.4,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {post.content.text}
                          </Typography>
                        </Box>

                        <Box mb={2}>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                            {post.content.hashtags.slice(0, 3).map((hashtag, idx) => (
                              <Typography
                                key={idx}
                                variant="caption"
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 500,
                                  fontSize: '0.7rem'
                                }}
                              >
                                {hashtag}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" gap={2}>
                            <Tooltip title="Likes esperados">
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Favorite sx={{ fontSize: 14, color: theme.palette.error.main }} />
                                <Typography variant="caption" color="text.secondary">
                                  {formatNumber(post.engagement.likes)}
                                </Typography>
                              </Box>
                            </Tooltip>
                            <Tooltip title="Comentarios esperados">
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Comment sx={{ fontSize: 14, color: theme.palette.info.main }} />
                                <Typography variant="caption" color="text.secondary">
                                  {formatNumber(post.engagement.comments)}
                                </Typography>
                              </Box>
                            </Tooltip>
                            <Tooltip title="Alcance esperado">
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Visibility sx={{ fontSize: 14, color: theme.palette.warning.main }} />
                                <Typography variant="caption" color="text.secondary">
                                  {formatNumber(post.engagement.reach)}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Día {Math.ceil((index + 1) / 3)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Footer Actions */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mt: 'auto',
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Campaña generada con IA • {campaign.posts.length} publicaciones
                </Typography>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={startGeneration}
                    sx={{ textTransform: 'none' }}
                  >
                    Regenerar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      px: 3
                    }}
                  >
                    Implementar Campaña
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        ) : null}
      </DialogContent>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </Dialog>
  );
};

export default CampaignGeneratorModal;