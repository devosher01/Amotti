"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Typography } from '@mui/material';
import { IconPlus, IconX } from '@tabler/icons-react';

interface EnhancedValuesListProps {
  values: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  isDark: boolean;
  placeholder?: string;
  color?: string;
}

// Component - Single Responsibility: Enhanced Values List
export const EnhancedValuesList: React.FC<EnhancedValuesListProps> = ({
  values,
  onAdd,
  onRemove,
  isDark,
  placeholder = "Ej: Innovación, Transparencia, Excelencia...",
  color = "#5b24b7"
}) => {
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    if (newValue.trim()) {
      onAdd(newValue);
      setNewValue('');
    }
  };

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          marginBottom: 3,
          padding: 2,
          background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
          borderRadius: 2,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(91, 36, 183, 0.08)'}`,
        }}
      >
        <TextField
          fullWidth
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
                <IconPlus size={16} color={color} />
              </Box>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: color,
                borderWidth: '2px',
              },
              '&.Mui-focused fieldset': {
                borderColor: color,
                borderWidth: '2px',
                boxShadow: `0 0 0 4px ${color}20`,
              }
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!newValue.trim()}
          sx={{
            minWidth: 56,
            height: 56,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            boxShadow: `0 4px 16px ${color}40`,
            '&:hover': {
              background: `linear-gradient(135deg, ${color}dd 0%, ${color}bb 100%)`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 24px ${color}50`,
            },
            '&:disabled': {
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <IconPlus size={20} />
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {values.map((value, index) => (
          <Chip
            key={index}
            label={value}
            onDelete={() => onRemove(index)}
            deleteIcon={<IconX size={16} />}
            sx={{
              background: isDark 
                ? `linear-gradient(135deg, ${color}25 0%, ${color}20 100%)`
                : `linear-gradient(135deg, ${color}15 0%, ${color}10 100%)`,
              color: isDark ? '#e2d8f3' : color,
              border: `1px solid ${isDark ? `${color}30` : `${color}25`}`,
              fontWeight: 600,
              fontSize: '0.85rem',
              padding: '8px 12px',
              height: 'auto',
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: isDark 
                  ? `linear-gradient(135deg, ${color}35 0%, ${color}30 100%)`
                  : `linear-gradient(135deg, ${color}20 0%, ${color}15 100%)`,
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: `0 6px 20px ${color}30`,
                borderColor: color,
              },
              '& .MuiChip-deleteIcon': {
                color: 'inherit',
                '&:hover': {
                  color: isDark ? '#ff6b6b' : '#e53e3e',
                }
              }
            }}
          />
        ))}
        
        {values.length === 0 && (
          <Box
            sx={{
              padding: 3,
              textAlign: 'center',
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              fontStyle: 'italic',
              width: '100%',
              border: `2px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(91, 36, 183, 0.15)'}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">
              Agrega valores corporativos usando el campo de arriba
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

