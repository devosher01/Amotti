/**
 * Best Hours Selector - Simple selector based on connected social media platforms
 */

'use client';

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Typography,
  Switch
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Block as NoneIcon
} from '@mui/icons-material';

interface BestHoursSelectorProps {
  onSelectionChange?: (selection: string) => void;
}

// Connected social media platforms (matching your image)
const CONNECTED_PLATFORMS = [
    {
        id: 'none',
        name: 'Ninguna',
        icon: <NoneIcon />,
        color: '#6b7280',
        enabled: false
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: <FacebookIcon />,
        color: '#1877f3',
        enabled: true
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: <InstagramIcon />,
        color: '#e1306c',
        enabled: true
    }
];

export const BestHoursSelector: React.FC<BestHoursSelectorProps> = ({
  onSelectionChange
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [showAsPercentage, setShowAsPercentage] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    onSelectionChange?.(platformId);
    handleClose();
  };

  // Get current platform for display
  const currentPlatform = CONNECTED_PLATFORMS.find(p => p.id === selectedPlatform) || CONNECTED_PLATFORMS[1];

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          height: '40px',
          minWidth: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          border: 'none',
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiIconButton-root': {
            padding: 0,
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ color: currentPlatform.color, fontSize: '18px' }}>
            {currentPlatform.icon}
          </Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            Mejores horas
          </Typography>
        </Box>
        <ExpandMoreIcon 
          sx={{ 
            fontSize: '16px', 
            color: '#6b7280',
            transition: 'transform 0.2s',
            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)'
          }} 
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '240px'
          }
        }}
      >
        <MenuList sx={{ padding: '8px' }}>
          {/* Platform Options */}
          {CONNECTED_PLATFORMS.map((platform) => (
            <MenuItem
              key={platform.id}
              onClick={() => handlePlatformSelect(platform.id)}
              selected={platform.id === selectedPlatform}
              sx={{
                borderRadius: '8px',
                padding: '12px 16px',
                margin: '2px 0',
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
                '&.Mui-selected': {
                  backgroundColor: '#ede9fe',
                  '&:hover': {
                    backgroundColor: '#ddd6fe',
                  }
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Box sx={{ color: platform.color, fontSize: '18px' }}>
                  {platform.icon}
                </Box>
                <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#374151', flex: 1 }}>
                  {platform.name}
                </Typography>
                {platform.id === selectedPlatform && (
                  <Box sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#8b5cf6'
                  }} />
                )}
              </Box>
            </MenuItem>
          ))}

          {/* Show as Percentage Toggle */}
          <Box sx={{ 
            padding: '12px 16px', 
            borderTop: '1px solid #f1f5f9', 
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>
              Mostrar como porcentaje
            </Typography>
            <Switch 
              checked={showAsPercentage}
              onChange={(e) => setShowAsPercentage(e.target.checked)}
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#10b981',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#10b981',
                }
              }}
            />
          </Box>
        </MenuList>
      </Menu>
    </>
  );
};
