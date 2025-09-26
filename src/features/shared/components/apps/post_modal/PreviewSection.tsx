"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  IconDeviceMobile,
  IconEye,
} from "@tabler/icons-react";
import { PreviewSectionProps } from "./types";
import FacebookPreview from "./previews/FacebookPreview";
import InstagramPreview from "./previews/InstagramPreview";

const PreviewSection: React.FC<PreviewSectionProps> = ({
  viewMode,
  onViewModeChange,
  selectedPlatforms,
  content,
  scheduledTime,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header de previsualización */}
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" fontWeight={600}>
          Previsualización
        </Typography>
        
        {/* Selector de vista */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant={viewMode === 'desktop' ? 'contained' : 'outlined'}
            onClick={() => onViewModeChange('desktop')}
            startIcon={<IconEye size={16} />}
            sx={{ 
              minWidth: 'auto',
              px: 2,
              fontSize: '12px'
            }}
          >
            Escritorio
          </Button>
          <Button
            size="small"
            variant={viewMode === 'mobile' ? 'contained' : 'outlined'}
            onClick={() => onViewModeChange('mobile')}
            startIcon={<IconDeviceMobile size={16} />}
            sx={{ 
              minWidth: 'auto',
              px: 2,
              fontSize: '12px'
            }}
          >
            Móvil
          </Button>
        </Box>
      </Box>

      {/* Contenido de previsualización */}
      <Box sx={{ 
        flex: 1, 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2,
        overflow: 'auto'
      }}>
        {selectedPlatforms.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: theme.palette.text.secondary
          }}>
            <IconEye size={48} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selecciona una red social para ver la previsualización
            </Typography>
          </Box>
        ) : (
          <>
            {selectedPlatforms.includes('facebook') && (
              <FacebookPreview 
                content={content}
                scheduledTime={scheduledTime}
                viewMode={viewMode}
              />
            )}
            
            {selectedPlatforms.includes('instagram') && (
              <InstagramPreview 
                content={content}
                scheduledTime={scheduledTime}
                viewMode={viewMode}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default PreviewSection; 