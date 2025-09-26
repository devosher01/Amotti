import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface PasswordStrengthIndicatorProps {
  password: string;
  show?: boolean;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  password, 
  show = false 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!show || !password) return null;

  const checks = [
    { label: 'Mayúscula', regex: /[A-Z]/, met: /[A-Z]/.test(password) },
    { label: 'Minúscula', regex: /[a-z]/, met: /[a-z]/.test(password) },
    { label: 'Número', regex: /[0-9]/, met: /[0-9]/.test(password) },
    { label: 'Símbolo', regex: /[^A-Za-z0-9]/, met: /[^A-Za-z0-9]/.test(password) },
    { label: '8+ chars', regex: /.{8,}/, met: password.length >= 8 }
  ];

  return (
    <Box sx={{ mt: 1, p: 1.5, borderRadius: 1, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
      <Typography variant="caption" sx={{ fontSize: '11px', fontWeight: 600, mb: 1, display: 'block' }}>
        Requisitos de contraseña:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {checks.map((check) => (
          <Chip
            key={check.label}
            label={check.label}
            size="small"
            color={check.met ? 'success' : 'default'}
            variant={check.met ? 'filled' : 'outlined'}
            sx={{
              fontSize: '10px',
              height: 20,
              '& .MuiChip-label': { px: 1 }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};