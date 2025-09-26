"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  IconButton,
  TextField,
  useTheme,
  alpha,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconX,
  IconUpload,
  IconLink,
} from "@tabler/icons-react";

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    minWidth: 500,
    maxWidth: 600,
    minHeight: 400,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: `1px solid ${alpha('#000000', 0.08)}`,
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid ${alpha('#000000', 0.08)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
  
  '& .MuiTypography-root': {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  }
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${alpha('#000000', 0.08)}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f8f9fa',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 48,
  '& .MuiTabs-indicator': {
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTab-root': {
    minHeight: 48,
    textTransform: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    }
  }
}));

const DropZone = styled(Box)<{ isDragOver?: boolean }>(({ theme, isDragOver }) => ({
  border: `2px dashed ${isDragOver ? theme.palette.primary.main : alpha('#000000', 0.2)}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(6, 4),
  textAlign: 'center',
  backgroundColor: isDragOver 
    ? alpha(theme.palette.primary.main, 0.05)
    : alpha('#000000', 0.02),
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  margin: theme.spacing(3),
  
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
}));

const PrimaryButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: alpha('#000000', 0.8),
  },
  '&:disabled': {
    backgroundColor: alpha('#000000', 0.3),
    color: alpha('#ffffff', 0.5),
  }
}));

const SecondaryButton = styled(ActionButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: `1px solid ${alpha('#000000', 0.2)}`,
  '&:hover': {
    backgroundColor: alpha('#000000', 0.04),
  }
}));

interface MediaUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  onUrlUpload: (url: string) => void;
  mediaType: 'image' | 'video';
}

export const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({
  open,
  onClose,
  onUpload,
  onUrlUpload,
  mediaType,
}) => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlValue, setUrlValue] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
    }
  }, [onUpload]);

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      onUrlUpload(urlValue.trim());
      setUrlValue('');
    }
  };

  const getTitle = () => {
    return mediaType === 'image' ? 'Cargar imagen' : 'Cargar video';
  };

  const getDropZoneText = () => {
    return mediaType === 'image' 
      ? 'Haz clic para seleccionar o arrastra el archivo aquí.'
      : 'Haz clic para seleccionar o arrastra el archivo aquí.';
  };

  const getAcceptedTypes = () => {
    return mediaType === 'image' 
      ? 'image/*' 
      : 'video/*';
  };

  const getUrlPlaceholder = () => {
    return mediaType === 'image'
      ? 'Introduce un enlace directo a una imagen pública'
      : 'Introduce un enlace directo a un video público';
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <Typography>{getTitle()}</Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha('#000000', 0.04),
            }
          }}
        >
          <IconX size={18} />
        </IconButton>
      </StyledDialogTitle>

      <TabsContainer>
        <StyledTabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
          <Tab 
            icon={<IconUpload size={16} />} 
            label="Subir archivo" 
            iconPosition="start"
          />
          <Tab 
            icon={<IconLink size={16} />} 
            label="Desde URL" 
            iconPosition="start"
          />
        </StyledTabs>
      </TabsContainer>
      
      <DialogContent sx={{ p: 0, minHeight: 300 }}>
        {currentTab === 0 ? (
          <DropZone
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 2, fontSize: '0.95rem' }}
            >
              {getDropZoneText()}
            </Typography>
            
            <input
              id="file-input"
              type="file"
              accept={getAcceptedTypes()}
              onChange={handleFileSelect}
              multiple
              style={{ display: 'none' }}
            />
          </DropZone>
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              URL
            </Typography>
            <TextField
              fullWidth
              placeholder={getUrlPlaceholder()}
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Box>
        )}
      </DialogContent>

      <Box sx={{ 
        p: 3, 
        borderTop: `1px solid ${alpha('#000000', 0.08)}`,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2
      }}>
        <SecondaryButton onClick={onClose}>
          Cancelar
        </SecondaryButton>
        <PrimaryButton 
          onClick={currentTab === 0 ? () => document.getElementById('file-input')?.click() : handleUrlSubmit}
          disabled={currentTab === 1 && !urlValue.trim()}
        >
          {currentTab === 0 ? 'Subir archivo' : 'Aceptar'}
        </PrimaryButton>
      </Box>
    </StyledDialog>
  );
};