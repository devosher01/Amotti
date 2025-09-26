"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Divider,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import {
  IconChevronDown,
  IconSettings,
  IconBrandFacebook,
  IconBrandInstagram,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import CustomSwitch from "@/features/shared/components/forms/theme-elements/CustomSwitch";

interface ConfigurationSetting {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  isSpecial?: boolean;
  specialType?: 'collaborator' | 'button';
  specialAction?: () => void;
}

interface ConfigurationItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
  settings?: ConfigurationSetting[];
}

interface ConfigurationSectionProps {
  items: ConfigurationItem[];
}

const ConfigurationSection: React.FC<ConfigurationSectionProps> = ({ items }) => {
  const theme = useTheme();
  const [collaboratorDialogOpen, setCollaboratorDialogOpen] = useState(false);
  const [collaboratorName, setCollaboratorName] = useState("");

  const handleAddCollaborator = () => {
    setCollaboratorDialogOpen(true);
  };

  const handleCollaboratorSubmit = () => {
    // Aquí puedes manejar la lógica para añadir el colaborador
    console.log("Añadir colaborador:", collaboratorName);
    setCollaboratorName("");
    setCollaboratorDialogOpen(false);
  };

  const renderSetting = (setting: ConfigurationSetting, settingIndex: number, totalSettings: number) => {
    if (setting.isSpecial && setting.specialType === 'collaborator') {
      return (
        <Box key={settingIndex}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 0.5,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                {setting.label}
              </Typography>
              {setting.description && (
                <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  {setting.description}
                </Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconPlus size={14} />}
              onClick={handleAddCollaborator}
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                minWidth: 'auto',
                px: 1.5,
                py: 0.5,
                borderRadius: '6px',
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderColor: '#E4405F',
                  color: '#E4405F',
                  backgroundColor: 'rgba(228, 64, 95, 0.04)',
                }
              }}
            >
              Añadir colaborador
            </Button>
          </Box>
          {settingIndex < totalSettings - 1 && (
            <Divider sx={{ mt: 1 }} />
          )}
        </Box>
      );
    }

    // Configuración normal con switch
    return (
      <Box key={settingIndex}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 0.5,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
              {setting.label}
            </Typography>
            {setting.description && (
              <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                {setting.description}
              </Typography>
            )}
          </Box>
          <CustomSwitch
            checked={setting.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setting.onChange(e.target.checked)}
          />
        </Box>
        {settingIndex < totalSettings - 1 && (
          <Divider sx={{ mt: 1 }} />
        )}
      </Box>
    );
  };

  return (
    <>
      <Stack spacing={0}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <Accordion
              sx={{
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '6px',
                mb: 0.5,
              }}
            >
              <AccordionSummary
                expandIcon={<IconChevronDown size={16} />}
                sx={{
                  minHeight: '40px',
                  '& .MuiAccordionSummary-content': {
                    margin: '4px 0',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      bgcolor: item.color || theme.palette.primary.main,
                      color: 'white',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                    {item.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                <Stack spacing={1}>
                  {item.settings?.map((setting, settingIndex) => 
                    renderSetting(setting, settingIndex, item.settings?.length || 0)
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </React.Fragment>
        ))}
      </Stack>

      {/* Modal para añadir colaborador */}
      <Dialog 
        open={collaboratorDialogOpen} 
        onClose={() => setCollaboratorDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 400,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: '#E4405F',
              color: 'white',
            }}
          >
            <IconBrandInstagram size={20} />
          </Box>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Añadir colaborador
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => setCollaboratorDialogOpen(false)}
            sx={{ color: 'text.secondary' }}
          >
            <IconX size={20} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Los usuarios que no existan o que no hayan permitido ser etiquetados serán ignorados al publicar este post.
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Nombre de usuario"
            value={collaboratorName}
            onChange={(e) => setCollaboratorName(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
          pt: 2
        }}>
          <Button 
            onClick={() => setCollaboratorDialogOpen(false)}
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleCollaboratorSubmit}
            variant="contained"
            disabled={!collaboratorName.trim()}
            sx={{ 
              textTransform: 'none',
              bgcolor: '#E4405F',
              '&:hover': {
                bgcolor: '#d63384',
              }
            }}
          >
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfigurationSection;
