"use client";

import React, { useState, useRef } from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  IconCheck,
  IconChevronDown,
  IconClock,
  IconEdit,
  IconBookmark,
  IconSend,
  IconEye,
} from "@tabler/icons-react";

interface ScheduleOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactElement;
  action: 'schedule' | 'draft' | 'review' | 'publish' | 'library';
}

interface ScheduleActionButtonProps {
  onAction: (action: string, data?: any) => void;
  disabled?: boolean;
  formData: any;
  isEditMode?: boolean;
  isProcessing?: boolean;
}

const CREATE_OPTIONS: ScheduleOption[] = [
  {
    id: 'schedule',
    label: 'Programar',
    description: 'Publicar en la fecha seleccionada',
    icon: <IconClock size={16} />,
    action: 'schedule'
  },
  {
    id: 'draft',
    label: 'Guardar borrador',
    description: 'Guarda y publica en otro momento',
    icon: <IconEdit size={16} />,
    action: 'draft'
  },
  {
    id: 'library',
    label: 'Guardar en la biblioteca',
    description: 'Guarda este post en la biblioteca de publicaciones',
    icon: <IconBookmark size={16} />,
    action: 'library'
  },
  {
    id: 'review',
    label: 'Enviar a revisión',
    description: 'Selecciona usuarios revisores',
    icon: <IconEye size={16} />,
    action: 'review'
  },
  {
    id: 'publish',
    label: 'Publicar ahora',
    description: 'Guarda y publica con la fecha y hora actual',
    icon: <IconSend size={16} />,
    action: 'publish'
  }
];

const EDIT_OPTIONS: ScheduleOption[] = [
  {
    id: 'schedule',
    label: 'Programar',
    description: 'Actualizar y programar para la fecha seleccionada',
    icon: <IconClock size={16} />,
    action: 'schedule'
  },
  {
    id: 'draft',
    label: 'Guardar como borrador',
    description: 'Actualizar y convertir a borrador',
    icon: <IconEdit size={16} />,
    action: 'draft'
  },
  {
    id: 'publish',
    label: 'Actualizar y publicar',
    description: 'Guardar cambios y publicar inmediatamente',
    icon: <IconSend size={16} />,
    action: 'publish'
  }
];

export const ScheduleActionButton: React.FC<ScheduleActionButtonProps> = ({
  onAction,
  disabled = false,
  formData,
  isEditMode = false,
  isProcessing = false
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const options = isEditMode ? EDIT_OPTIONS : CREATE_OPTIONS;
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMainAction = () => {
    onAction(selectedOption.action, formData);
  };

  const handleMenuItemClick = (option: ScheduleOption) => {
    setSelectedOption(option);
    setOpen(false);
    onAction(option.action, formData);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        disabled={disabled}
        sx={{
          '& .MuiButton-root': {
            textTransform: 'none',
            background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4a1e9a 0%, #3a4bc7 100%)',
            },
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            }
          }
        }}
      >
        <Button
          onClick={handleMainAction}
          startIcon={isProcessing ? null : selectedOption.icon}
          sx={{ 
            px: 3,
            py: 1,
            minWidth: 120
          }}
        >
          {isProcessing ? 'Procesando...' : selectedOption.label}
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          sx={{ 
            px: 1,
            minWidth: 'auto',
            borderLeft: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <IconChevronDown size={16} />
        </Button>
      </ButtonGroup>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="top-end"
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              sx={{
                minWidth: 280,
                maxWidth: 320,
                boxShadow: theme.shadows[8],
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList dense>
                  {options.map((option, index) => [
                      <MenuItem
                        key={option.id}
                        onClick={() => handleMenuItemClick(option)}
                        selected={selectedOption.id === option.id}
                        sx={{
                          py: 1.5,
                          px: 2,
                          '&.Mui-selected': {
                            bgcolor: 'rgba(91, 36, 183, 0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(91, 36, 183, 0.15)',
                            }
                          },
                          '&:hover': {
                            bgcolor: theme.palette.action.hover,
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                          {option.icon}
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={500}>
                            {option.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                        </ListItemText>
                        {selectedOption.id === option.id && (
                          <Box sx={{ ml: 1, color: theme.palette.primary.main }}>
                            <IconCheck size={16} />
                          </Box>
                        )}
                      </MenuItem>,
                      ...(index < options.length - 1 && index === 1 ? [
                        <Divider key={`divider-${option.id}`} sx={{ my: 0.5 }} />
                      ] : [])
                  ]).flat()}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
