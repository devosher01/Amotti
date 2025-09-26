"use client";

import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  IconPhoto,
  IconMoodSmile,
  IconHash,
  IconMapPin,
  IconLink,
  IconVideo,
  IconX,
} from "@tabler/icons-react";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  hasImage: boolean;
  onToggleImage: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onContentChange,
  hasImage,
  onToggleImage,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <TextField
        multiline
        rows={6}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="¿Qué quieres compartir?"
        variant="outlined"
        fullWidth
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            fontSize: '1rem',
            lineHeight: 1.5,
            height: '100%',
            '& textarea': {
              height: '100% !important',
              resize: 'none'
            }
          }
        }}
      />
    
      {hasImage && (
        <Box sx={{ 
          width: 80, 
          height: 80, 
          bgcolor: theme.palette.grey[200], 
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          mt: 2
        }}>
          <IconPhoto size={24} color={theme.palette.grey[400]} />
          <IconButton 
            size="small" 
            onClick={onToggleImage}
            sx={{ 
              position: 'absolute', 
              top: -8, 
              right: -8,
              bgcolor: 'white',
              boxShadow: 1
            }}
          >
            <IconX size={12} />
          </IconButton>
        </Box>
      )}

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        pt: 1,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Tooltip title="Agregar imagen">
          <IconButton size="small" onClick={onToggleImage}>
            <IconPhoto size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar emoji">
          <IconButton size="small">
            <IconMoodSmile size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar hashtag">
          <IconButton size="small">
            <IconHash size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar ubicación">
          <IconButton size="small">
            <IconMapPin size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar enlace">
          <IconButton size="small">
            <IconLink size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar video">
          <IconButton size="small">
            <IconVideo size={20} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};