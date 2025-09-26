"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  useTheme,
  Popover,
  Typography,
  Button,
  Divider,
  alpha,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconPhoto,
  IconMoodSmile,
  IconHash,
  IconMapPin,
  IconLink,
  IconVideo,
  IconX,
  IconUpload,
  IconCloudUpload,
  IconDeviceDesktop,
  IconRobot,
  IconSparkles,
  IconFileText,
} from "@tabler/icons-react";
import { MediaFile } from "../../../types/mediaValidation";
import { AiAssistantModal } from "./AiAssistantModal";
import { CampaignGeneratorModal, useCampaignGenerator } from "../../CampaignGenerator";

// Styled Components simples para el popover
const SimplePopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[8],
    minWidth: 180,
    maxWidth: 320, // Aspect ratio 1.76 aprox (180 * 1.76 = 317)
    padding: theme.spacing(0.5, 0),
  },
}));

const SimpleMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  fontSize: '0.875rem',
  minHeight: 40,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-disabled': {
    opacity: 0.4,
    color: theme.palette.text.disabled,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 32,
  },
}));

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  hasImage: boolean;
  onToggleImage: () => void;
  onMediaUpload?: (files: FileList | File[]) => void;
  mediaFiles?: MediaFile[];
  onRemoveMediaFile?: (fileId: string) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onContentChange,
  hasImage,
  onToggleImage,
  onMediaUpload,
  mediaFiles = [],
  onRemoveMediaFile,
}) => {
  const theme = useTheme();
  const [mediaMenuAnchor, setMediaMenuAnchor] = useState<HTMLElement | null>(null);
  const [aiMenuAnchor, setAiMenuAnchor] = useState<HTMLElement | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Campaign generator hook
  const { isModalOpen, openCampaignGenerator, closeCampaignGenerator } = useCampaignGenerator();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && onMediaUpload) {
      onMediaUpload(files);
    }
    // Reset input para permitir seleccionar el mismo archivo de nuevo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setMediaMenuAnchor(null);
  };

  const openFileDialog = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  };

  // Handlers para el menú de IA
  const handleAiMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAiMenuAnchor(event.currentTarget);
  };

  const handleAiMenuClose = () => {
    setAiMenuAnchor(null);
  };

  const handleAiOptionSelect = (option: string) => {
    console.log('AI Option selected:', option);
    setAiMenuAnchor(null);
    
    if (option === 'generador') {
      setAiAssistantOpen(true);
    } else if (option === 'campana') {
      openCampaignGenerator();
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <TextField
        multiline
        rows={6}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="¿Qué quieres compartir?"
        variant="outlined"
        fullWidth
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            fontSize: '1rem',
            lineHeight: 1.5,
            height: '100%',
            '& textarea': {
              height: '100% !important',
              resize: 'none'
            }
          }
        }}
      />
    
      {/* Mostrar archivos multimedia en el área del skeleton */}
      {(hasImage || mediaFiles.length > 0) && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2, mb: 2 }}>
          {mediaFiles.map((file) => (
            <Box
              key={file.id}
              sx={{
                position: 'relative',
                width: 80,
                height: 80,
                borderRadius: 1,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.grey[100]
              }}
            >
              {file.url ? (
                file.type === 'video' ? (
                  <video
                    src={file.url}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                ) : (
                  <img
                    src={file.url}
                    alt="Uploaded media"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                )
              ) : (
                <IconPhoto size={24} color={theme.palette.grey[400]} />
              )}

              {onRemoveMediaFile && (
                <IconButton
                  size="small"
                  onClick={() => onRemoveMediaFile(file.id)}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 18,
                    height: 18,
                    bgcolor: alpha('#ef4444', 0.9),
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#ef4444',
                      transform: 'scale(1.05)',
                    },
                    boxShadow: 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <IconX size={8} />
                </IconButton>
              )}
            </Box>
          ))}

          {/* Skeleton solo cuando hasImage pero no hay archivos reales */}
          {hasImage && mediaFiles.length === 0 && (
            <Box sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: theme.palette.grey[200], 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <IconPhoto size={24} color={theme.palette.grey[400]} />
              <IconButton 
                size="small" 
                onClick={onToggleImage}
                sx={{ 
                  position: 'absolute', 
                  top: 2, 
                  right: 2,
                  width: 18,
                  height: 18,
                  bgcolor: alpha('#ef4444', 0.9),
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#ef4444',
                  },
                  boxShadow: 1
                }}
              >
                <IconX size={8} />
              </IconButton>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        pt: 1,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Tooltip title="Multimedia">
          <IconButton 
            size="small" 
            onClick={(event) => setMediaMenuAnchor(event.currentTarget)}
          >
            <IconPhoto size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar emoji">
          <IconButton size="small">
            <IconMoodSmile size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar hashtag">
          <IconButton size="small">
            <IconHash size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar ubicación">
          <IconButton size="small">
            <IconMapPin size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar enlace">
          <IconButton size="small">
            <IconLink size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Asistente de IA">
          <IconButton size="small" onClick={handleAiMenuClick}>
            <IconRobot size={20} />
          </IconButton>
        </Tooltip>
        
      </Box>

      {/* Menu del Asistente de IA */}
      <Menu
        anchorEl={aiMenuAnchor}
        open={Boolean(aiMenuAnchor)}
        onClose={handleAiMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            minWidth: 200,
          }
        }}
      >
        <MenuItem onClick={() => handleAiOptionSelect('campana')}>
          <ListItemIcon>
            <IconSparkles size={18} />
          </ListItemIcon>
          <ListItemText primary="Generar Campaña" />
        </MenuItem>
        <MenuItem onClick={() => handleAiOptionSelect('generador')}>
          <ListItemIcon>
            <IconFileText size={18} />
          </ListItemIcon>
          <ListItemText primary="Generador de textos con IA" />
        </MenuItem>
      </Menu>

      {/* Input oculto para files */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        multiple
        onChange={handleFileUpload}
      />

      {/* Popover simple como la imagen */}
      <SimplePopover
        open={Boolean(mediaMenuAnchor)}
        anchorEl={mediaMenuAnchor}
        onClose={() => setMediaMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <SimpleMenuItem onClick={() => openFileDialog('image/*')}>
          <ListItemIcon>
            <IconPhoto size={18} />
          </ListItemIcon>
          <ListItemText primary="Añadir imagen" />
        </SimpleMenuItem>
        
        <SimpleMenuItem onClick={() => openFileDialog('video/*')}>
          <ListItemIcon>
            <IconVideo size={18} />
          </ListItemIcon>
          <ListItemText primary="Añadir vídeo" />
        </SimpleMenuItem>

        <Divider sx={{ my: 0.25 }} />
        
        <SimpleMenuItem disabled>
          <ListItemIcon>
            <Box sx={{ 
              width: 18, 
              height: 18, 
              borderRadius: 0.5, 
              bgcolor: '#1976D2', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '10px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              A
            </Box>
          </ListItemIcon>
          <ListItemText primary="Adobe Express" />
        </SimpleMenuItem>
        
        <SimpleMenuItem disabled>
          <ListItemIcon>
            <Box sx={{ 
              width: 18, 
              height: 18, 
              borderRadius: 0.5, 
              bgcolor: '#4285F4', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '8px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              ▲
            </Box>
          </ListItemIcon>
          <ListItemText primary="Google Drive" />
        </SimpleMenuItem>
        
        <SimpleMenuItem disabled>
          <ListItemIcon>
            <Box sx={{ 
              width: 18, 
              height: 18, 
              borderRadius: '50%', 
              bgcolor: '#00D4FF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '10px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              C
            </Box>
          </ListItemIcon>
          <ListItemText primary="Canva" />
        </SimpleMenuItem>

        <Divider sx={{ my: 0.25 }} />
        
        <SimpleMenuItem disabled sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconPhoto size={20} />
          </ListItemIcon>
          <ListItemText primary="Banco de imágenes" />
          <Box component="span" sx={{ ml: 'auto', color: 'text.secondary', fontSize: 18 }}>›</Box>
        </SimpleMenuItem>
        
        <SimpleMenuItem disabled sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconVideo size={20} />
          </ListItemIcon>
          <ListItemText primary="Banco de vídeos" />
          <Box component="span" sx={{ ml: 'auto', color: 'text.secondary', fontSize: 18 }}>›</Box>
        </SimpleMenuItem>

        <SimpleMenuItem disabled sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>📝</Box>
          </ListItemIcon>
          <ListItemText primary="Plantillas de historias" />
          <Box component="span" sx={{ ml: 'auto', color: 'text.secondary', fontSize: 18 }}>›</Box>
        </SimpleMenuItem>

        <SimpleMenuItem disabled sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>🎬</Box>
          </ListItemIcon>
          <ListItemText primary="Galería de GIFs" />
          <Box component="span" sx={{ ml: 'auto', color: 'text.secondary', fontSize: 18 }}>›</Box>
        </SimpleMenuItem>
      </SimplePopover>

      {/* Modal del Asistente de IA */}
      <AiAssistantModal
        open={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        currentText={content}
        onTextGenerated={onContentChange}
      />

      {/* Modal del Generador de Campañas */}
      <CampaignGeneratorModal
        open={isModalOpen}
        onClose={closeCampaignGenerator}
      />
    </Box>
  );
};