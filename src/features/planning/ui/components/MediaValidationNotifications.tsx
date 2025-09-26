"use client";

import React from "react";
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  Chip,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconInfoCircle,
  IconChevronDown,
  IconChevronUp,
  IconX,
} from "@tabler/icons-react";
import { ValidationRule } from "../types/mediaValidation";

// Styled Components con branding elegante
const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  borderRadius: theme.spacing(1.5),
  border: 'none',
  boxShadow: 'none',
  backgroundColor: 
    severity === 'error' ? alpha(theme.palette.error.main, 0.05) :
    severity === 'warning' ? alpha(theme.palette.warning.main, 0.05) :
    alpha(theme.palette.info.main, 0.05),
  
  '& .MuiAlert-icon': {
    marginRight: theme.spacing(1.5),
    fontSize: '20px',
    color: 
      severity === 'error' ? theme.palette.error.main :
      severity === 'warning' ? theme.palette.warning.main :
      theme.palette.info.main,
  },
  
  '& .MuiAlert-message': {
    padding: 0,
    width: '100%',
  },

  '& .MuiAlert-action': {
    padding: 0,
    marginLeft: theme.spacing(1),
  },

  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    backgroundColor: 
      severity === 'error' ? alpha(theme.palette.error.main, 0.08) :
      severity === 'warning' ? alpha(theme.palette.warning.main, 0.08) :
      alpha(theme.palette.info.main, 0.08),
  },
}));

const ValidationContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' 
    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.6)} 100%)`,
  backdropFilter: 'blur(10px)',
}));

const ValidationHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.12)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
}));

const ValidationContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  maxHeight: 300,
  overflow: 'auto',
  
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.primary.main, 0.05),
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.3),
    borderRadius: '2px',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.5),
    },
  },
}));

const PlatformChip = styled(Chip)(({ theme }) => ({
  fontSize: '10px',
  height: 20,
  fontWeight: 600,
  textTransform: 'uppercase',
  borderRadius: theme.spacing(0.5),
  '& .MuiChip-label': {
    paddingX: theme.spacing(1),
  },
}));

interface MediaValidationNotificationsProps {
  errors: ValidationRule[];
  warnings: ValidationRule[];
  info: ValidationRule[];
  defaultExpanded?: boolean;
  onDismiss?: (ruleId: string) => void;
  showSummary?: boolean;
  compactMode?: boolean;
}

export const MediaValidationNotifications: React.FC<MediaValidationNotificationsProps> = ({
  errors,
  warnings,
  info,
  defaultExpanded = true,
  onDismiss,
  showSummary = true,
  compactMode = false,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const totalIssues = errors.length + warnings.length + info.length;
  
  if (totalIssues === 0) return null;

  const getAlertIcon = (type: ValidationRule['type']) => {
    switch (type) {
      case 'error':
        return <IconAlertCircle size={20} />;
      case 'warning':
        return <IconAlertTriangle size={20} />;
      case 'info':
        return <IconInfoCircle size={20} />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return theme.palette.primary.main;
      case 'instagram':
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const renderValidationRule = (rule: ValidationRule, index: number) => (
    <StyledAlert
      key={`${rule.id}-${index}`}
      severity={rule.type}
      icon={getAlertIcon(rule.type)}
      action={onDismiss && (
        <IconButton
          size="small"
          onClick={() => onDismiss(rule.id)}
          sx={{ 
            color: 'inherit',
            opacity: 0.7,
            '&:hover': { opacity: 1 }
          }}
        >
          <IconX size={16} />
        </IconButton>
      )}
      sx={{ mb: 1.5 }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          {rule.platform && (
            <PlatformChip
              label={`${rule.platform} ${rule.contentType || ''}`.trim()}
              size="small"
              sx={{
                backgroundColor: alpha(getPlatformColor(rule.platform), 0.1),
                color: getPlatformColor(rule.platform),
                border: `1px solid ${alpha(getPlatformColor(rule.platform), 0.2)}`,
              }}
            />
          )}
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {rule.message}
        </Typography>
      </Box>
    </StyledAlert>
  );

  const getSummaryText = () => {
    const parts: string[] = [];
    if (errors.length > 0) parts.push(`${errors.length} error${errors.length > 1 ? 'es' : ''}`);
    if (warnings.length > 0) parts.push(`${warnings.length} advertencia${warnings.length > 1 ? 's' : ''}`);
    if (info.length > 0) parts.push(`${info.length} sugerencia${info.length > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  if (compactMode) {
    return (
      <Box sx={{ mb: 2 }}>
        <Stack spacing={1}>
          {[...errors, ...warnings, ...info].map(renderValidationRule)}
        </Stack>
      </Box>
    );
  }

  return (
    <ValidationContainer sx={{ mb: 2 }}>
      <ValidationHeader onClick={() => setExpanded(!expanded)}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {errors.length > 0 && (
                <IconAlertCircle size={18} style={{ color: theme.palette.error.main }} />
              )}
              {warnings.length > 0 && (
                <IconAlertTriangle size={18} style={{ color: theme.palette.warning.main }} />
              )}
              {info.length > 0 && errors.length === 0 && warnings.length === 0 && (
                <IconInfoCircle size={18} style={{ color: theme.palette.info.main }} />
              )}
            </Box>
            <Typography variant="subtitle2" fontWeight={600}>
              Validación de contenido
            </Typography>
            {showSummary && (
              <Typography variant="caption" color="text.secondary">
                {getSummaryText()}
              </Typography>
            )}
          </Box>
          
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            {expanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </IconButton>
        </Box>
      </ValidationHeader>

      <Collapse in={expanded} timeout={300}>
        <ValidationContent>
          <Stack spacing={0}>
            {/* Errores primero */}
            {errors.map(renderValidationRule)}
            
            {/* Luego advertencias */}
            {warnings.map(renderValidationRule)}
            
            {/* Finalmente información */}
            {info.map(renderValidationRule)}
          </Stack>
        </ValidationContent>
      </Collapse>
    </ValidationContainer>
  );
};