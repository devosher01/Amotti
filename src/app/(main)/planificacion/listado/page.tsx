"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  alpha,
  useTheme,
  Stack,
  Divider,
  Pagination,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconEdit,
  IconClock,
  IconCheck,
  IconSend,
  IconDots,
  IconPlayerPlay,
  
} from "@tabler/icons-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import PageContainer from "@/features/shared/components/container/PageContainer";
import { ListHeader } from "@/features/planning/ui/components/ListHeader";
import { PostCreationDialog } from "@/features/planning/ui/components/PostCreationDialog/PostCreationDialog";
import { SocialMediaPostType } from '@/features/shared/components/calendar_social_media/types';
import { useListPublications } from '@/features/planning/ui/hooks/useListPublications';
import { Publication } from '@/features/planning/domain/entities/publication';
import { MediaViewer } from '@/features/media-viewer/components/MediaViewer';
import { MediaItem } from '@/features/media-viewer/types/media';
import { getVideoThumbnail, generateVideoPlaceholder } from '@/features/media-viewer/utils/videoThumbnail';


// Styled Components usando MUI List
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`,
  overflow: 'hidden',
}));

const ListItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  display: 'flex',
  alignItems: 'center',
  minHeight: '80px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const ListHeaderRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  display: 'flex',
  alignItems: 'center',
  minHeight: '56px',
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'published':
        return { 
          bg: alpha(theme.palette.success.main, 0.1), 
          color: theme.palette.success.main,
          border: alpha(theme.palette.success.main, 0.2)
        };
      case 'scheduled':
        return { 
          bg: alpha(theme.palette.primary.main, 0.1), 
          color: theme.palette.primary.main,
          border: alpha(theme.palette.primary.main, 0.2)
        };
      case 'draft':
        return { 
          bg: alpha(theme.palette.warning.main, 0.1), 
          color: theme.palette.warning.main,
          border: alpha(theme.palette.warning.main, 0.2)
        };
      default:
        return { 
          bg: alpha(theme.palette.grey[500], 0.1), 
          color: theme.palette.grey[600],
          border: alpha(theme.palette.grey[500], 0.2)
        };
    }
  };
  
  const colors = getStatusColor();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    border: `1px solid ${colors.border}`,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: 24,
    borderRadius: '12px',
  };
});


const getPlatformIcon = (platform: string, size = 14) => {
  const iconProps = { size, style: { color: '#fff' } };
  switch (platform.toLowerCase()) {
    case 'twitter':
      return <IconBrandTwitter {...iconProps} />;
    case 'facebook':
      return <IconBrandFacebook {...iconProps} />;
    case 'instagram':
      return <IconBrandInstagram {...iconProps} />;
    case 'linkedin':
      return <IconBrandLinkedin {...iconProps} />;
    case 'tiktok':
      return <IconBrandTiktok {...iconProps} />;
    default:
      return null;
  }
};

const getPlatformColor = (platform: string, theme: any) => {
  switch (platform.toLowerCase()) {
    case 'twitter':
      return theme.palette.info.main;
    case 'facebook':
      return theme.palette.primary.main;
    case 'instagram':
      return theme.palette.secondary.main;
    case 'linkedin':
      return theme.palette.info.dark;
    case 'tiktok':
      return theme.palette.grey[800];
    default:
      return theme.palette.grey[500];
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'published':
      return <IconCheck size={12} />;
    case 'scheduled':
      return <IconClock size={12} />;
    case 'draft':
      return <IconEdit size={12} />;
    default:
      return <IconSend size={12} />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'published':
      return 'Publicado';
    case 'scheduled':
      return 'Programado';
    case 'draft':
      return 'Borrador';
    default:
      return 'Desconocido';
  }
};

// Helper para obtener la fecha de una publicación
const getPublicationDate = (post: Publication): Date => {
  return post.scheduledAt || post.createdAt;
};

export default function ListadoPage() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Estados para modal de creación
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialMediaPostType | null>(null);

  // Estados para MediaViewer
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [videoThumbnails, setVideoThumbnails] = useState<Record<string, string>>({});

  // Hook para cargar publicaciones reales
  const {
    publications: realPublications,
    total,
    isLoading,
    error,
    fetchPublications,
    refetch,
    clearError
  } = useListPublications({
    autoFetch: true,
    limit: 100 // Cargar más para filtrado local
  });

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset página al cambiar filtro
    handleFilterClose();
  };

  // Handlers para ListHeader
  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset página al buscar
  };

  const handleCreatePost = useCallback(() => {
    console.log('🎨 Opening creation dialog...');
    setSelectedPost({
      id: '',
      title: '',
      content: '',
      scheduledTime: new Date(),
      platforms: [],
      status: 'draft',
      mediaUrls: [],
      hashtags: [],
      mentions: [],
    });
    setIsCreationDialogOpen(true);
  }, []);

  const handleImportCSV = () => {
    console.log('Importar CSV');
  };

  const handleExportCSV = () => {
    console.log('Exportar CSV');
  };

  const handlePreviewFeed = () => {
    console.log('Previsualizar feed');
  };

  const handleNotifications = () => {
    console.log('Notificaciones');
  };

  const handleFilterClickWrapper = () => {
    // Crear un evento simulado para el menú
    const buttonElement = document.querySelector('#filter-button');
    if (buttonElement) {
      handleFilterClick({ currentTarget: buttonElement } as React.MouseEvent<HTMLElement>);
    }
  };

  // Funciones para el modal de creación
  const handleCloseCreationDialog = useCallback(() => {
    console.log('🎨 Closing creation dialog...');
    setIsCreationDialogOpen(false);
    setSelectedPost(null);
  }, []);

  const handleSavePost = useCallback(async (postData: SocialMediaPostType) => {
    console.log('💾 Saving post:', postData);
    // TODO: Aquí integrar con el hook de creación de publicaciones
    setIsCreationDialogOpen(false);
    setSelectedPost(null);
    // Recargar publicaciones después de guardar
    await refetch();
  }, [refetch]);

  const handleEditPost = useCallback((post: any) => {
    console.log('✏️ Editing post:', post);
    setSelectedPost({
      id: post.id,
      title: post.title || '',
      content: post.content,
      scheduledTime: post.scheduledTime,
      platforms: post.platforms,
      status: post.status,
      mediaUrls: [],
      hashtags: [],
      mentions: [],
    });
    setIsCreationDialogOpen(true);
  }, []);

  const handleDeletePost = useCallback((postId: string) => {
    console.log('🗑️ Deleting post:', postId);
    // TODO: Aquí integrar con el hook de publicaciones real
  }, []);

  // Función para cargar thumbnail de video
  const loadVideoThumbnail = useCallback(async (videoUrl: string, mediaId: string) => {
    if (videoThumbnails[mediaId]) return;
    
    try {
      const thumbnail = await getVideoThumbnail(videoUrl);
      if (thumbnail) {
        setVideoThumbnails(prev => ({ ...prev, [mediaId]: thumbnail }));
      } else {
        // Generar placeholder si falla la extracción
        const placeholder = generateVideoPlaceholder(300, 200);
        setVideoThumbnails(prev => ({ ...prev, [mediaId]: placeholder }));
      }
    } catch (error) {
      console.warn('Error loading video thumbnail:', error);
      const placeholder = generateVideoPlaceholder(300, 200);
      setVideoThumbnails(prev => ({ ...prev, [mediaId]: placeholder }));
    }
  }, [videoThumbnails]);

  // Función para abrir el MediaViewer
  const handleMediaClick = useCallback((post: Publication, mediaIndex: number = 0) => {
    if (!post.content.media || post.content.media.length === 0) return;

    const mediaItems: MediaItem[] = post.content.media.map((media, index) => ({
      id: `${post.id}-media-${index}`,
      type: media.type as 'image' | 'video',
      url: media.url,
      thumbnail: media.type === 'video' ? videoThumbnails[`${post.id}-media-${index}`] : undefined,
      alt: `Media ${index + 1} de ${post.content.media?.length}`,
      title: post.content.text ? post.content.text.substring(0, 50) + '...' : `Publicación ${post.id}`,
    }));

    setMediaItems(mediaItems);
    setSelectedMediaIndex(mediaIndex);
    setIsMediaViewerOpen(true);
  }, [videoThumbnails]);

  const handleCloseMediaViewer = useCallback(() => {
    setIsMediaViewerOpen(false);
    setMediaItems([]);
    setSelectedMediaIndex(0);
  }, []);

  // Cargar thumbnails para videos cuando cambien las publicaciones
  useEffect(() => {
    realPublications.forEach((post) => {
      if (post.content.media) {
        post.content.media.forEach((media: { type: string; url: string; }, index: any) => {
          if (media.type === 'video') {
            const mediaId = `${post.id}-media-${index}`;
            loadVideoThumbnail(media.url, mediaId);
          }
        });
      }
    });
  }, [realPublications, loadVideoThumbnail]);

  const filteredPosts = realPublications.filter((post: Publication) => {
    const content = post.content.text || '';
    const matchesSearch = content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Cálculos para paginación
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <PageContainer title="Listado de Contenido" description="Gestiona todas tus publicaciones">
      <Box>
        {/* Nuevo ListHeader */}
        <ListHeader
          searchQuery={searchTerm}
          onSearchChange={handleSearchChange}
          onFilterClick={handleFilterClickWrapper}
          onCreatePost={handleCreatePost}
          onImportCSV={handleImportCSV}
          onExportCSV={handleExportCSV}
          onPreviewFeed={handlePreviewFeed}
          onNotifications={handleNotifications}
          dateRange={{
            start: new Date('2025-08-21'),
            end: new Date('2025-09-19'),
          }}
        />

        {/* Menu de filtros (mantener para el estado) */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => handleFilterSelect('all')}>Todos</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('published')}>Publicados</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('scheduled')}>Programados</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('draft')}>Borradores</MenuItem>
        </Menu>

        {/* Información de resultados */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} de {filteredPosts.length} publicaciones
          </Typography>
          {filteredPosts.length > itemsPerPage && (
            <Typography variant="body2" color="text.secondary">
              Página {currentPage} de {totalPages}
            </Typography>
          )}
        </Box>

        {/* Lista de publicaciones usando MUI List */}
        <StyledPaper>
          {/* Header de la lista */}
          <ListHeaderRow>
            <Box sx={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
              <Checkbox sx={{ color: theme.palette.primary.main, '&.Mui-checked': { color: theme.palette.primary.dark } }} />
            </Box>
            <Box sx={{ width: '120px', ml: 2 }}>
              <Typography variant="body2" fontWeight={700} color={theme.palette.text.primary} sx={{ fontSize: '0.8rem' }}>
                Fecha
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <Typography variant="body2" fontWeight={700} color={theme.palette.text.primary} sx={{ fontSize: '0.8rem' }}>
                Contenido de la publicación
              </Typography>
            </Box>
            <Box sx={{ width: '100px', ml: 2 }}>
              <Typography variant="body2" fontWeight={700} color={theme.palette.text.primary} sx={{ fontSize: '0.8rem' }}>
                Redes
              </Typography>
            </Box>
            <Box sx={{ width: '120px', ml: 2 }}>
              <Typography variant="body2" fontWeight={700} color={theme.palette.text.primary} sx={{ fontSize: '0.9rem' }}>
                Estado
              </Typography>
            </Box>
            <Box sx={{ width: '80px', ml: 2 }}>
            </Box>
          </ListHeaderRow>

          {/* Items de la lista - Volviendo al layout original que funcionaba */}
          {currentPosts.map((post) => (
            <ListItem key={post.id}>
              {/* Checkbox */}
              <Box sx={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
                <Checkbox />
              </Box>

              {/* Fecha */}
              <Box sx={{ width: '120px', ml: 2 }}>
                <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: '0.875rem' }}>
                  {format(getPublicationDate(post), "d MMM yyyy", { locale: es })}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: '0.875rem' }}>
                  {format(getPublicationDate(post), "HH:mm", { locale: es })}
                </Typography>
              </Box>

              {/* Contenido */}
              <Box sx={{ flexGrow: 1, ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Thumbnail o icono de video - Clickeable */}
                {post.content.media && post.content.media.length > 0 ? (
                  <Avatar
                    src={post.content.media[0].type === 'video' 
                      ? videoThumbnails[`${post.id}-media-0`] || generateVideoPlaceholder(40, 40)
                      : post.content.media[0].url
                    }
                    onClick={() => handleMediaClick(post, 0)}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      },
                      '& .MuiAvatar-img': {
                        objectFit: 'cover'
                      },
                      position: 'relative'
                    }}
                  >
                    {post.content.media[0].type === 'video' && (
                      <IconPlayerPlay 
                        size={12} 
                        style={{ 
                          position: 'absolute',
                          color: 'white',
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                        }} 
                      />
                    )}
                  </Avatar>
                ) : null}
                
                {/* Texto del contenido */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    lineHeight: 1.5,
                    color: theme.palette.text.primary,
                    maxWidth: '500px'
                  }}
                >
                  {post.content.text}
                </Typography>
              </Box>

              {/* Redes sociales */}
              <Box sx={{ width: '100px', ml: 2, display: 'flex', gap: 0.5 }}>
                {post.platforms.map((platform: string) => (
                  <Avatar
                    key={platform}
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: getPlatformColor(platform, theme),
                    }}
                  >
                    {getPlatformIcon(platform, 14)}
                  </Avatar>
                ))}
              </Box>

              {/* Estado */}
              <Box sx={{ width: '120px', ml: 2 }}>
                <StatusChip
                  icon={getStatusIcon(post.status)}
                  label={getStatusText(post.status)}
                  size="small"
                  status={post.status}
                />
              </Box>

              {/* Acciones */}
              <Box sx={{ width: '80px', ml: 2, display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                <IconButton 
                  size="small" 
                  onClick={() => handleEditPost(post)}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    borderRadius: '8px',
                    '&:hover': { 
                      color: 'white',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    }
                  }}
                >
                  <IconEdit size={16} />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleDeletePost(post.id)}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    borderRadius: '8px',
                    '&:hover': { 
                      color: 'white',
                      background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                    }
                  }}
                >
                  <IconDots size={16} />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </StyledPaper>

        {/* Paginación */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="medium"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    },
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                },
              }}
            />
          </Box>
        )}

        {filteredPosts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron publicaciones
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {searchTerm || filterStatus !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Crea tu primera publicación para comenzar'
              }
            </Typography>
          </Box>
        )}

        {/* Modal de creación/edición de publicaciones */}
        <PostCreationDialog
          open={isCreationDialogOpen}
          onClose={handleCloseCreationDialog}
          post={selectedPost}
          onSave={handleSavePost}
        />

        {/* MediaViewer para fotos y videos */}
        <MediaViewer
          isOpen={isMediaViewerOpen}
          onClose={handleCloseMediaViewer}
          media={mediaItems}
          initialIndex={selectedMediaIndex}
        />
      </Box>
    </PageContainer>
  );
} 