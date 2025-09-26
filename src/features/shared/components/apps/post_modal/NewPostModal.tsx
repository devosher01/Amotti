"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { SocialMediaPostType } from "./types";
import { platforms } from "./data";
import { useNewPostModal } from "./hooks/useNewPostModal";
import SocialMediaSelector from "./SocialMediaSelector";
import PostEditor from "./PostEditor";
import PreviewSection from "./PreviewSection";

import ModalFooter from "./ModalFooter";
import { ConfigurationSection, LogsSection } from ".";

interface NewPostModalProps {
  open: boolean;
  post: SocialMediaPostType | null;
  onClose: () => void;
  onSave: (postData: SocialMediaPostType) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  open,
  post,
  onClose,
  onSave,
}) => {
  const {
    formData,
    selectedContentTypes,
    dropdownOpen,
    viewMode,
    hasImage,
    logs,
    globalConfig,
    facebookConfig,
    instagramConfig,
    handleInputChange,
    handleDateTimeChange,
    togglePlatform,
    handleContentTypeChange,
    handleSave,
    setDropdownOpen,
    setViewMode,
    setHasImage,
    setGlobalConfig,
    setFacebookConfig,
    setInstagramConfig,
    isValid,
  } = useNewPostModal({ post, onSave });

  const handleConfigChange = (section: string, config: any) => {
    switch (section) {
      case 'global':
        setGlobalConfig(config);
        break;
      case 'facebook':
        setFacebookConfig(config);
        break;
      case 'instagram':
        setInstagramConfig(config);
        break;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => {}} // Deshabilitar cierre con Escape o clic fuera
      maxWidth="xl" 
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: 1,
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
          {/* COLUMNA IZQUIERDA - ÁREA DE EDICIÓN */}
          <Grid item xs={12} md={7} sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 1. Encabezado superior */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight={600}>
                  Crear nueva publicación
                </Typography>
                <IconButton onClick={onClose} size="small">
                  <IconX size={20} />
                </IconButton>
              </Box>
                
              {/* 2. Selector de redes sociales */}
              <SocialMediaSelector
                platforms={platforms}
                selectedPlatforms={formData.platforms}
                selectedContentTypes={selectedContentTypes}
                onPlatformToggle={togglePlatform}
                onContentTypeChange={handleContentTypeChange}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />

              {/* 3. Editor de post */}
              <PostEditor
                content={formData.content}
                onContentChange={(content) => handleInputChange('content', content)}
                hasImage={hasImage}
                onImageToggle={setHasImage}
              />

              {/* 4. Configuraciones */}
              <ConfigurationSection
                globalConfig={globalConfig}
                facebookConfig={facebookConfig}
                instagramConfig={instagramConfig}
                onConfigChange={handleConfigChange}
                selectedPlatforms={formData.platforms}
              />

              {/* 5. Logs */}
              <LogsSection logs={logs} />

              {/* 6. Footer con botones */}
              <ModalFooter
                onCancel={onClose}
                onSave={handleSave}
                scheduledTime={formData.scheduledTime}
                onDateTimeChange={handleDateTimeChange}
                isValid={!!isValid}
              />
            </Stack>
          </Grid>

          {/* COLUMNA DERECHA - PREVISUALIZACIÓN */}
          <Grid item xs={12} md={5} sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <PreviewSection
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              selectedPlatforms={formData.platforms}
              content={formData.content}
              scheduledTime={formData.scheduledTime}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal; 