"use client";

import React, { useState } from "react";
import {
  Popover,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  alpha,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconX,
  IconPhoto,
  IconVideo,
  IconFolderOpen,
  IconChevronRight,
} from "@tabler/icons-react";

// Styled Components
const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    borderRadius: theme.spacing(1.5),
    minWidth: 280,
    maxWidth: 320,
    maxHeight: 400,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: `1px solid ${alpha('#000000', 0.08)}`,
    overflow: 'hidden',
    mt: 1,
  }
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5, 1.5),
  borderBottom: `1px solid ${alpha('#000000', 0.06)}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
  
  '& .MuiTypography-root': {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.25, 2.5),
  cursor: 'pointer',
  transition: 'all 0.12s ease',
  borderRadius: 0,
  
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha('#ffffff', 0.06) 
      : alpha('#000000', 0.05),
  },
  
  '&.premium': {
    backgroundColor: alpha('#f59e0b', 0.04),
    '&:hover': {
      backgroundColor: alpha('#f59e0b', 0.08),
    }
  }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
  color: theme.palette.text.secondary,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  }
}));

interface MediaOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  isPremium?: boolean;
  onClick: () => void;
}

interface MediaSelectorPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelectImage: () => void;
  onSelectVideo: () => void;
}

export const MediaSelectorPopover: React.FC<MediaSelectorPopoverProps> = ({
  anchorEl,
  onClose,
  onSelectImage,
  onSelectVideo,
}) => {
  const theme = useTheme();

  const mediaOptions: MediaOption[] = [
    {
      id: 'image',
      label: 'Añadir imagen',
      icon: <IconPhoto size={20} />,
      onClick: onSelectImage
    },
    {
      id: 'video',
      label: 'Añadir video',
      icon: <IconVideo size={20} />,
      onClick: onSelectVideo
    },
    {
      id: 'adobe-express',
      label: 'Adobe Express',
      icon: (
        <Box sx={{ 
          width: 20, 
          height: 20, 
          borderRadius: '4px',
          backgroundColor: '#FF0000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          Ae
        </Box>
      ),
      isPremium: true,
      onClick: () => console.log('Adobe Express')
    },
    {
      id: 'google-drive',
      label: 'Google Drive',
      icon: (
        <Box sx={{
          width: 20,
          height: 20,
          background: 'linear-gradient(45deg, #4285F4, #34A853, #FBBC05)',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Box sx={{ fontSize: '8px', color: 'white', fontWeight: 'bold' }}>G</Box>
        </Box>
      ),
      isPremium: true,
      onClick: () => console.log('Google Drive')
    },
    {
      id: 'canva',
      label: 'Canva',
      icon: (
        <Box sx={{ 
          width: 20, 
          height: 20, 
          borderRadius: '50%',
          backgroundColor: '#00C4CC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          C
        </Box>
      ),
      isPremium: true,
      onClick: () => console.log('Canva')
    },
    {
      id: 'image-bank',
      label: 'Banco de imágenes',
      icon: <IconFolderOpen size={20} />,
      isPremium: true,
      onClick: () => console.log('Banco de imágenes')
    },
    {
      id: 'video-bank',
      label: 'Banco de videos',
      icon: <IconFolderOpen size={20} />,
      isPremium: true,
      onClick: () => console.log('Banco de videos')
    },
    {
      id: 'story-templates',
      label: 'Plantillas de historias',
      icon: <IconFolderOpen size={20} />,
      isPremium: true,
      onClick: () => console.log('Plantillas de historias')
    },
    {
      id: 'gif-gallery',
      label: 'Galería de GIFs',
      icon: <IconFolderOpen size={20} />,
      isPremium: true,
      onClick: () => console.log('Galería de GIFs')
    },
  ];

  const handleOptionClick = (option: MediaOption) => {
    option.onClick();
    onClose(); // Cerrar el popover después de hacer clic
  };

  return (
    <StyledPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      slotProps={{
        paper: {
          elevation: 8,
        },
      }}
    >
      <StyledHeader>
        <Typography>Multimedia</Typography>
      </StyledHeader>
      
      <List sx={{ py: 0, maxHeight: 320, overflow: 'auto' }}>
        {mediaOptions.slice(0, 2).map((option) => (
          <StyledListItem
            key={option.id}
            onClick={() => handleOptionClick(option)}
          >
            <StyledListItemIcon>
              {option.icon}
            </StyledListItemIcon>
            <StyledListItemText primary={option.label} />
          </StyledListItem>
        ))}
        
        <Divider sx={{ my: 0.5 }} />
        
        {mediaOptions.slice(2).map((option) => (
          <StyledListItem
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={option.isPremium ? 'premium' : ''}
          >
            <StyledListItemIcon>
              {option.icon}
            </StyledListItemIcon>
            <StyledListItemText primary={option.label} />
            {option.isPremium && (
              <IconChevronRight 
                size={14} 
                style={{ 
                  color: theme.palette.text.secondary,
                  marginLeft: 'auto'
                }} 
              />
            )}
          </StyledListItem>
        ))}
      </List>
    </StyledPopover>
  );
};

// Exportaciones para compatibilidad
export const MediaSelectorDialog = MediaSelectorPopover;