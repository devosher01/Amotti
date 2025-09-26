"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Alert,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Fab,
  Menu,
  Tab,
  Tabs,
  Badge,
} from "@mui/material";
import {
  IconArrowLeft,
  IconPlayerPlay,
  IconPlayerPause,
  IconSettings,
  IconTrash,
  IconCopy,
  IconEdit,
  IconPlus,
  IconDragDrop,
  IconEye,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCalendarTime,
  IconUsers,
  IconFileImport,
  IconRss,
  IconUpload,
  IconSparkles,
  IconChartBar,
  IconRefresh,
  IconBulb,
  IconRobot,
  IconFilter,
  IconSortAscending,
  IconDotsVertical,
  IconShare,
  IconDownload,
  IconClock,
  IconCheck,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";

// Styled Components con branding púrpura
const PurpleGradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)} 0%, 
    ${alpha('#4057d9', 0.05)} 100%
  )`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  borderRadius: 16,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    #5b24b7 0%, 
    #4057d9 50%, 
    #3b68df 100%
  )`,
  color: 'white',
  borderRadius: 16,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(255,255,255,0.1) 0%, 
      transparent 50%, 
      rgba(255,255,255,0.05) 100%
    )`,
    pointerEvents: 'none',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)`,
  color: 'white',
  borderRadius: 12,
  padding: '12px 24px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: `0 4px 16px ${alpha('#5b24b7', 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: `linear-gradient(135deg, #4a1f9e 0%, #3649c7 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha('#5b24b7', 0.4)}`,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: alpha('#5b24b7', 0.1),
  color: '#5b24b7',
  border: `1px solid ${alpha('#5b24b7', 0.2)}`,
  borderRadius: 12,
  padding: '8px 16px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: alpha('#5b24b7', 0.15),
    border: `1px solid ${alpha('#5b24b7', 0.3)}`,
    transform: 'translateY(-1px)',
  },
}));

const PostCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'grab',
  '&:hover': {
    border: `1px solid ${alpha('#5b24b7', 0.3)}`,
    boxShadow: `0 4px 16px ${alpha('#5b24b7', 0.1)}`,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    cursor: 'grabbing',
  },
}));

// Componente para iconos de plataformas
const PlatformIcon = ({ platform, size = 20 }: { platform: string; size?: number }) => {
  const iconProps = { size: size * 0.7, style: { color: 'white' } };
  
  const platformIcons = {
    twitter: <IconBrandTwitter {...iconProps} />,
    facebook: <IconBrandFacebook {...iconProps} />,
    instagram: <IconBrandInstagram {...iconProps} />,
    linkedin: <IconBrandLinkedin {...iconProps} />,
    tiktok: <IconBrandTiktok {...iconProps} />,
    youtube: <IconBrandYoutube {...iconProps} />,
  };

  const platformColors = {
    twitter: '#1DA1F2',
    facebook: '#1877F2', 
    instagram: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    linkedin: '#0A66C2',
    tiktok: '#000000',
    youtube: '#FF0000',
  };

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        background: platformColors[platform as keyof typeof platformColors] || '#666',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      {platformIcons[platform as keyof typeof platformIcons]}
    </Avatar>
  );
};

// Componente para Chip de estado
const StatusChip = ({ status }: { status: string }) => {
  const statusConfig = {
    pending: { label: 'Pendiente', color: '#F59E0B', bgColor: alpha('#F59E0B', 0.1), icon: <IconClock size={12} /> },
    published: { label: 'Publicado', color: '#10B981', bgColor: alpha('#10B981', 0.1), icon: <IconCheck size={12} /> },
    failed: { label: 'Error', color: '#EF4444', bgColor: alpha('#EF4444', 0.1), icon: <IconX size={12} /> },
    paused: { label: 'Pausado', color: '#6B7280', bgColor: alpha('#6B7280', 0.1), icon: <IconPlayerPause size={12} /> },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <Chip
      label={config.label}
      size="small"
      icon={config.icon}
      sx={{
        background: config.bgColor,
        color: config.color,
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 28,
        '& .MuiChip-label': {
          px: 1,
        },
        '& .MuiChip-icon': {
          color: config.color,
        },
      }}
    />
  );
};

// Mock data (esto vendría del store/API)
const mockAutolista = {
  id: '1',
  name: 'Contenido Motivacional',
  description: 'Posts inspiracionales para aumentar engagement en redes sociales',
  status: 'active',
  isCircular: true,
  useUrlShortener: true,
  platforms: ['twitter', 'linkedin', 'instagram'],
  schedule: {
    type: 'daily',
    times: ['09:00', '15:00', '19:00'],
    timezone: 'America/Lima',
  },
  nextExecutionAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // En 2 horas
  totalPosts: 45,
  activePosts: 42,
  publishedPosts: 120,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-25'),
};

const mockPosts = [
  {
    id: '1',
    position: 1,
    content: '🌟 "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." - Albert Schweitzer',
    platforms: ['twitter', 'linkedin'],
    status: 'pending',
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    hashtags: ['motivacion', 'exito', 'felicidad'],
    mentions: [],
    media: [],
    isActive: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    position: 2,
    content: '💪 Cada desafío es una oportunidad disfrazada. No tengas miedo de enfrentar lo desconocido, porque ahí es donde encuentras tu verdadero potencial.',
    platforms: ['instagram', 'twitter'],
    status: 'published',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    hashtags: ['desafios', 'oportunidades', 'potencial'],
    mentions: [],
    media: [
      {
        id: '1',
        type: 'image',
        url: '/images/motivation-1.jpg',
        alt: 'Imagen motivacional',
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '3',
    position: 3,
    content: '🚀 "No esperes el momento perfecto. Toma el momento y hazlo perfecto." El tiempo perfecto nunca llega, pero el momento correcto es ahora.',
    platforms: ['linkedin', 'twitter', 'instagram'],
    status: 'failed',
    scheduledAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    hashtags: ['accion', 'momento', 'perfecto'],
    mentions: [],
    media: [],
    isActive: false,
    createdAt: new Date('2024-01-18'),
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AutolistaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, postId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header con información de la autolista */}
      <HeaderCard sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <IconButton 
                  onClick={() => router.back()}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <IconArrowLeft size={20} />
                </IconButton>
                
                <Typography variant="h4" fontWeight={700}>
                  {mockAutolista.name}
                </Typography>
                
                <Chip
                  label={mockAutolista.status === 'active' ? 'Activa' : 'Pausada'}
                  size="small"
                  sx={{
                    bgcolor: mockAutolista.status === 'active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                    color: mockAutolista.status === 'active' ? '#10B981' : '#F59E0B',
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                {mockAutolista.description}
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                      Posts Totales
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {mockAutolista.totalPosts}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                      Posts Activos
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {mockAutolista.activePosts}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                      Publicados
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {mockAutolista.publishedPosts}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                      Plataformas
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {mockAutolista.platforms.map((platform) => (
                        <PlatformIcon key={platform} platform={platform} size={24} />
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<IconSettings />}
                onClick={() => setOpenSettingsDialog(true)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                }}
              >
                Configurar
              </Button>
              
              <Button
                variant="contained"
                startIcon={mockAutolista.status === 'active' ? <IconPlayerPause /> : <IconPlayerPlay />}
                sx={{
                  bgcolor: mockAutolista.status === 'active' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                  color: mockAutolista.status === 'active' ? '#F59E0B' : '#10B981',
                  '&:hover': { 
                    bgcolor: mockAutolista.status === 'active' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)',
                  },
                }}
              >
                {mockAutolista.status === 'active' ? 'Pausar' : 'Activar'}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </HeaderCard>

      {/* Próxima ejecución */}
      {mockAutolista.nextExecutionAt && (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            bgcolor: alpha('#5b24b7', 0.08),
            color: '#5b24b7',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: '#5b24b7',
            },
          }}
        >
          <Typography variant="body2">
            <strong>Próxima publicación:</strong> {format(mockAutolista.nextExecutionAt, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}
          </Typography>
        </Alert>
      )}

      {/* Tabs para Posts y Configuración */}
      <PurpleGradientCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              px: 3,
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&.Mui-selected': {
                  color: '#5b24b7',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#5b24b7',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab 
              label={
                <Badge badgeContent={mockPosts.length} color="primary">
                  Posts
                </Badge>
              } 
            />
            <Tab label="Configuración" />
            <Tab label="Estadísticas" />
          </Tabs>
        </Box>

        {/* Tab 1: Posts */}
        <CustomTabPanel value={tabValue} index={0}>
          <CardContent sx={{ p: 3 }}>
            {/* Header de posts con acciones */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Posts de la Autolista
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mockPosts.filter(p => p.isActive).length} activos de {mockPosts.length} totales
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <SecondaryButton startIcon={<IconFilter />}>
                  Filtrar
                </SecondaryButton>
                <SecondaryButton startIcon={<IconSortAscending />}>
                  Ordenar
                </SecondaryButton>
                <ActionButton startIcon={<IconPlus />} onClick={() => setOpenCreateDialog(true)}>
                  Nuevo Post
                </ActionButton>
              </Stack>
            </Stack>

            {/* Lista de posts */}
            <Stack spacing={2}>
              {mockPosts.map((post, index) => (
                <PostCard key={post.id}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      {/* Número de posición */}
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: alpha('#5b24b7', 0.1),
                          color: '#5b24b7',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                        }}
                      >
                        {post.position}
                      </Avatar>

                      {/* Contenido del post */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.5 }}>
                          {post.content}
                        </Typography>

                        {/* Hashtags */}
                        {post.hashtags.length > 0 && (
                          <Stack direction="row" spacing={0.5} sx={{ mb: 1, flexWrap: 'wrap' }}>
                            {post.hashtags.map((tag) => (
                              <Chip
                                key={tag}
                                label={`#${tag}`}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.75rem',
                                  height: 24,
                                  borderColor: alpha('#5b24b7', 0.3),
                                  color: '#5b24b7',
                                }}
                              />
                            ))}
                          </Stack>
                        )}

                        {/* Información adicional */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Stack direction="row" spacing={0.5}>
                            {post.platforms.map((platform) => (
                              <PlatformIcon key={platform} platform={platform} size={16} />
                            ))}
                          </Stack>

                          <StatusChip status={post.status} />

                          {post.media.length > 0 && (
                            <Chip
                              label={`${post.media.length} media`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', height: 24 }}
                            />
                          )}

                          <Typography variant="caption" color="text.secondary">
                            {post.status === 'published' && post.publishedAt 
                              ? `Publicado ${format(post.publishedAt, "d/MM 'a las' HH:mm", { locale: es })}`
                              : post.scheduledAt 
                                ? `Programado ${format(post.scheduledAt, "d/MM 'a las' HH:mm", { locale: es })}`
                                : 'Sin programar'
                            }
                          </Typography>
                        </Stack>
                      </Box>

                      {/* Acciones */}
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Editar post">
                          <IconButton size="small" sx={{ color: '#5b24b7' }}>
                            <IconEdit size={16} />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Más opciones">
                          <IconButton 
                            size="small" 
                            sx={{ color: '#5b24b7' }}
                            onClick={(e) => handleMenuOpen(e, post.id)}
                          >
                            <IconDotsVertical size={16} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Arrastrar para reordenar">
                          <IconButton size="small" sx={{ color: 'text.secondary', cursor: 'grab' }}>
                            <IconDragDrop size={16} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </CardContent>
                </PostCard>
              ))}
            </Stack>

            {/* Botón flotante para agregar post */}
            <Fab
              color="primary"
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4a1f9e 0%, #3649c7 100%)',
                },
              }}
              onClick={() => setOpenCreateDialog(true)}
            >
              <IconPlus />
            </Fab>
          </CardContent>
        </CustomTabPanel>

        {/* Tab 2: Configuración */}
        <CustomTabPanel value={tabValue} index={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Configuración de la Autolista
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Próximamente: Panel de configuración completo...
            </Typography>
          </CardContent>
        </CustomTabPanel>

        {/* Tab 3: Estadísticas */}
        <CustomTabPanel value={tabValue} index={2}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Estadísticas y Métricas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Próximamente: Dashboard de analytics completo...
            </Typography>
          </CardContent>
        </CustomTabPanel>
      </PurpleGradientCard>

      {/* Menu contextual para posts */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <IconEye size={16} style={{ marginRight: 8 }} />
          Vista previa
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <IconCopy size={16} style={{ marginRight: 8 }} />
          Duplicar
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <IconShare size={16} style={{ marginRight: 8 }} />
          Compartir
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <IconTrash size={16} style={{ marginRight: 8 }} />
          Eliminar
        </MenuItem>
      </Menu>

      {/* Dialogs aquí... */}
    </Box>
  );
} 