"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
import { PLATFORMS_CONFIG, DEFAULT_CONTENT_TYPES } from "../../../constants/platformsConfig";

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  selectedContentTypes: Record<string, string>;
  onTogglePlatform: (platform: string) => void;
  onContentTypeChange: (platform: string, contentType: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  selectedContentTypes,
  onTogglePlatform,
  onContentTypeChange,
}) => {
  const theme = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    selectedPlatforms.forEach(platform => {
      if (!selectedContentTypes[platform]) {
        const defaultType = DEFAULT_CONTENT_TYPES[platform] || "post";
        console.log(`🎯 Inicializando tipo de contenido para ${platform}: ${defaultType}`);
        onContentTypeChange(platform, defaultType);
      }
    });
  }, [selectedPlatforms]);

  const getCurrentContentType = (platform: string) => {
    return selectedContentTypes[platform] || DEFAULT_CONTENT_TYPES[platform] || "post";
  };

  const handleContentTypeClick = (platform: string, contentType: string) => {
    onContentTypeChange(platform, contentType);
    setDropdownOpen(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Editar publicación
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {PLATFORMS_CONFIG.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.value);
          const currentContentType = getCurrentContentType(platform.value);
          
          return (
            <Box key={platform.value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={isSelected ? `Deseleccionar ${platform.label}` : `Seleccionar ${platform.label}`}>
                <IconButton
                  onClick={() => onTogglePlatform(platform.value)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: isSelected ? platform.color : 'transparent',
                    color: isSelected ? 'white' : theme.palette.text.secondary,
                    border: `1px solid ${isSelected ? platform.color : theme.palette.divider}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isSelected ? platform.color : theme.palette.action.hover,
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    }
                  }}
                >
                  {platform.icon}
                </IconButton>
              </Tooltip>
              
              <Box sx={{ position: 'relative' }}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={!isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      setDropdownOpen(dropdownOpen === platform.value ? null : platform.value);
                    }
                  }}
                  sx={{
                    minWidth: 120,
                    height: 32,
                    textTransform: 'none',
                    fontSize: '12px',
                    fontWeight: 500,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    bgcolor: theme.palette.background.paper,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.text.primary
                    },
                    '&.Mui-disabled': {
                      opacity: 0.5,
                      bgcolor: theme.palette.action.disabledBackground,
                    }
                  }}
                  endIcon={<IconChevronDown size={14} />}
                >
                  {(() => {
                    const selectedType = platform.contentTypes.find(
                      (ct) => ct.value === currentContentType
                    );
                    return selectedType ? selectedType.label : 'TIPO';
                  })()}
                </Button>
                
                {dropdownOpen === platform.value && isSelected && (
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      mt: 0.5,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      boxShadow: theme.shadows[3],
                      border: `1px solid ${theme.palette.divider}`,
                      zIndex: 1000,
                      py: 0.5,
                      minWidth: 150
                    }}
                  >
                    {platform.contentTypes.map((contentType) => (
                      <Box
                        key={contentType.value}
                        onClick={() => handleContentTypeClick(platform.value, contentType.value)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2,
                          py: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: theme.palette.action.hover
                          },
                          bgcolor: currentContentType === contentType.value ? theme.palette.action.selected : 'transparent'
                        }}
                      >
                        <Box sx={{ color: theme.palette.text.secondary }}>
                          {contentType.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {contentType.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {contentType.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
