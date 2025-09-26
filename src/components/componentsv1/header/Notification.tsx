import React, { useState } from 'react';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as dropdownData from './data';

import { IconBellRinging } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import Link from 'next/link';
import { useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';
import Scrollbar from '@/features/shared/components/custom-scroll/Scrollbar';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const isDark = customizer.activeMode === 'dark';

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: theme.palette.primary.main,
          '&:hover': {
            background: `${theme.palette.primary.main}1A`, // 10% opacity
            color: theme.palette.primary.main,
            transform: 'scale(1.05)',
            transition: 'all 0.2s ease',
          }
        }}
        onClick={handleClick2}
      >
        <Badge 
          variant="dot" 
          sx={{
            '& .MuiBadge-dot': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            }
          }}
        >
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            sx: {
              width: '360px',
              // 🎨 Borde dinámico usando colores del tema
              border: '1px solid',
              borderColor: isDark ? `${theme.palette.primary.main}33` : `${theme.palette.primary.main}1A`, // 20%/10% opacity
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.primary.dark} 50%, 
                  ${theme.palette.secondary.main} 100%)`,
                borderRadius: '4px 4px 0 0',
              },
            }
          }
        }}
      >
        <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
          <Typography 
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&::after': {
                content: '""',
                display: 'block',
                width: '50px',
                height: '2px',
                background: `linear-gradient(90deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.primary.dark} 100%)`,
                borderRadius: '1px',
                marginTop: '4px',
              }
            }}
          >
            Notificaciones
          </Typography>
          <Chip 
            label="5 nuevas" 
            size="small"
            sx={{
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.dark} 0%, 
                  ${theme.palette.secondary.dark} 100%)`,
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease',
              }
            }}
          />
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {dropdownData.notifications.map((notification, index) => (
            <Box key={index}>
              <MenuItem 
                sx={{ 
                  py: 2, 
                  px: 4,
                  '&:hover': {
                    background: `${theme.palette.primary.main}0D`, // 5% opacity
                    '& .MuiTypography-subtitle2': {
                      color: theme.palette.primary.main,
                    }
                  }
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar
                    src={notification.avatar}
                    alt={notification.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      border: '2px solid',
                      borderColor: isDark ? `${theme.palette.primary.main}4D` : `${theme.palette.primary.main}33`, // 30%/20% opacity
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '240px',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button 
            href="/apps/email" 
            variant="outlined" 
            component={Link} 
            fullWidth
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&:hover': {
                background: `${theme.palette.primary.main}1A`, // 10% opacity
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease',
              }
            }}
          >
            Ver todas las notificaciones
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
