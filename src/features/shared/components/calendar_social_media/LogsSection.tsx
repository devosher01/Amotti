"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Stack,
  useTheme,
  Alert,
} from "@mui/material";
import {
  IconChevronDown,
  IconChevronUp,
  IconAlertTriangle,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export interface LogEntry {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  platform?: string;
  message: string;
  timestamp?: Date;
}

interface LogsSectionProps {
  logs: LogEntry[];
  title?: string;
}

const LogsSection: React.FC<LogsSectionProps> = ({ 
  logs, 
  title = "Logs y Advertencias" 
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  const getPlatformIcon = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'facebook':
        return <IconBrandFacebook size={16} />;
      case 'instagram':
        return <IconBrandInstagram size={16} />;
      case 'twitter':
        return <IconBrandTwitter size={16} />;
      case 'linkedin':
        return <IconBrandLinkedin size={16} />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'facebook':
        return '#1877F2';
      case 'instagram':
        return '#E4405F';
      case 'twitter':
        return '#1DA1F2';
      case 'linkedin':
        return '#0077B5';
      default:
        return theme.palette.primary.main;
    }
  };

  const getSeverity = (type: LogEntry['type']) => {
    switch (type) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      default:
        return 'info';
    }
  };

  const errorCount = logs.filter(log => log.type === 'error').length;
  const warningCount = logs.filter(log => log.type === 'warning').length;
  const totalIssues = errorCount + warningCount;

  if (logs.length === 0) {
    return null;
  }

  return (
    <Stack spacing={1}>
      {/* Header compacto */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          bgcolor: totalIssues > 0 
            ? (errorCount > 0 ? 'error.light' : 'warning.light')
            : 'info.light',
          borderRadius: '4px',
          border: `1px solid ${totalIssues > 0 
            ? (errorCount > 0 ? 'error.main' : 'warning.main')
            : 'info.main'}`,
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconAlertTriangle 
            size={14} 
            color={totalIssues > 0 
              ? (errorCount > 0 ? theme.palette.error.main : theme.palette.warning.main)
              : theme.palette.info.main
            } 
          />
          <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
            {totalIssues > 0 ? `${totalIssues} ${totalIssues === 1 ? 'error' : 'errores'}` : title}
          </Typography>
        </Box>
        
        <IconButton size="small" sx={{ p: 0.25 }}>
          {isExpanded ? (
            <IconChevronUp size={12} />
          ) : (
            <IconChevronDown size={12} />
          )}
        </IconButton>
      </Box>

      {/* Contenido expandible */}
      <Collapse in={isExpanded}>
        <Stack spacing={1}>
          {logs.map((log) => (
            <Alert
              key={log.id}
              severity={getSeverity(log.type)}
              variant="outlined"
              sx={{ 
                py: 0.5,
                '& .MuiAlert-message': { py: 0 },
                '& .MuiAlert-icon': { py: 0 }
              }}
              icon={
                log.platform ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 16,
                      height: 16,
                      borderRadius: '3px',
                      bgcolor: getPlatformColor(log.platform),
                      color: 'white',
                    }}
                  >
                    {getPlatformIcon(log.platform)}
                  </Box>
                ) : undefined
              }
            >
              <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                {log.message}
              </Typography>
            </Alert>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default LogsSection; 