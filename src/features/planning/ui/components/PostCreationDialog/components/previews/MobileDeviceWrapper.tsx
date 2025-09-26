"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";

interface MobileDeviceWrapperProps {
  children: React.ReactNode;
}

export const MobileDeviceWrapper: React.FC<MobileDeviceWrapperProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
      borderRadius: '20px',
      p: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: '4px solid',
      borderColor: theme.palette.mode === 'dark' ? '#333' : '#ddd'
    }}>
      <Box sx={{
        width: '120px',
        height: '20px',
        bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
        borderRadius: '0 0 15px 15px',
        mx: 'auto',
        mb: '8px',
        position: 'relative'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '8px',
          bgcolor: theme.palette.mode === 'dark' ? '#333' : '#999',
          borderRadius: '4px'
        }} />
      </Box>
      
      <Box sx={{
        width: '375px',
        height: '667px',
        bgcolor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {children}
      </Box>
    </Box>
  );
};
