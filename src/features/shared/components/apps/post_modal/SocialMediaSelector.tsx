"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhoto,
  IconVideo,
  IconPlus,
  IconChevronDown,
} from "@tabler/icons-react";
import { SocialMediaSelectorProps, PlatformType } from "./types";

const SocialMediaSelector: React.FC<SocialMediaSelectorProps> = ({
  platforms,
  selectedPlatforms,
  selectedContentTypes,
  onPlatformToggle,
  onContentTypeChange,
  dropdownOpen,
  setDropdownOpen,
}) => {
  const theme = useTheme();

  const getCurrentContentType = (platform: string) => {
    return selectedContentTypes[platform] || "post";
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Redes sociales
        </Typography>
      </Box>
      
      {/* Fila de pares: icono + botón dropdown para cada red social */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.value);
          const currentContentType = getCurrentContentType(platform.value);
          
          return (
            <Box key={platform.value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Icono clickeable de la red social */}
              <Tooltip title={isSelected ? `Deseleccionar ${platform.label}` : `Seleccionar ${platform.label}`}>
                <IconButton
                  onClick={() => onPlatformToggle(platform.value)}
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
              
              {/* Botón dropdown para tipo de contenido */}
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
                  {/* Mostrar el label del tipo de contenido seleccionado */}
                  {(() => {
                    const selectedType = platform.contentTypes.find(
                      (ct) => ct.value === currentContentType
                    );
                    return selectedType ? selectedType.label : 'TIPO';
                  })()}
                </Button>
                
                {/* Dropdown de tipos de contenido */}
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
                        onClick={() => onContentTypeChange(platform.value, contentType.value)}
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

export default SocialMediaSelector; 