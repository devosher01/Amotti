"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
  useTheme,
  Divider,
  FormHelperText,
} from "@mui/material";
import {
  IconX,
  IconClock,
  IconMapPin,
  IconUser,
  IconPlus,
  IconCheck,
} from "@tabler/icons-react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { EventType } from "./types";

interface CalendarEventFormProps {
  open: boolean;
  event: EventType | null;
  onClose: () => void;
  onSave: (eventData: EventType) => void;
}

const CalendarEventForm: React.FC<CalendarEventFormProps> = ({
  open,
  event,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<EventType>({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "default",
    allDay: false,
    description: "",
    location: "",
    participants: [],
  });
  const [newParticipant, setNewParticipant] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Colores disponibles
  const colorOptions = [
    { value: "default", label: "Azul", color: theme.palette.primary.main },
    { value: "green", label: "Verde", color: theme.palette.success.main },
    { value: "red", label: "Rojo", color: theme.palette.error.main },
    { value: "azure", label: "Cian", color: theme.palette.info.main },
    { value: "warning", label: "Amarillo", color: theme.palette.warning.main },
  ];

  // Inicializar formulario cuando se abre
  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        start: event.start ? new Date(event.start) : new Date(),
        end: event.end ? new Date(event.end) : new Date(),
      });
    } else {
      setFormData({
        title: "",
        start: new Date(),
        end: new Date(),
        color: "default",
        allDay: false,
        description: "",
        location: "",
        participants: [],
      });
    }
    setErrors({});
  }, [event, open]);

  // Validar formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (formData.start && formData.end && formData.start > formData.end) {
      newErrors.end = "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof EventType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Manejar cambio de fecha de inicio
  const handleStartChange = (newValue: unknown) => {
    if (newValue instanceof Date) {
      setFormData(prev => {
        const updatedData = { ...prev, start: newValue };
        
        // Si la fecha de fin es anterior a la nueva fecha de inicio, ajustarla
        if (prev.end && newValue > prev.end) {
          const newEnd = new Date(newValue);
          newEnd.setHours(newEnd.getHours() + 1);
          updatedData.end = newEnd;
        }
        
        return updatedData;
      });
    }
  };

  // Manejar cambio de fecha de fin
  const handleEndChange = (newValue: unknown) => {
    if (newValue instanceof Date) {
      setFormData(prev => ({ ...prev, end: newValue }));
    }
  };

  // Manejar cambio de "todo el día"
  const handleAllDayChange = (checked: boolean) => {
    setFormData(prev => {
      const newData = { ...prev, allDay: checked };
      
      if (checked) {
        // Si es todo el día, establecer horas a 00:00 y 23:59
        const start = prev.start ? new Date(prev.start) : new Date();
        start.setHours(0, 0, 0, 0);
        
        const end = prev.end ? new Date(prev.end) : new Date();
        end.setHours(23, 59, 59, 999);
        
        newData.start = start;
        newData.end = end;
      }
      
      return newData;
    });
  };

  // Agregar participante
  const handleAddParticipant = () => {
    if (newParticipant.trim() && !formData.participants?.includes(newParticipant.trim())) {
      setFormData(prev => ({
        ...prev,
        participants: [...(prev.participants || []), newParticipant.trim()]
      }));
      setNewParticipant("");
    }
  };

  // Eliminar participante
  const handleRemoveParticipant = (participant: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants?.filter(p => p !== participant) || []
    }));
  };

  // Guardar evento
  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      {/* Header del diálogo */}
      <DialogTitle sx={{ 
        pb: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <Typography variant="h6" fontWeight={600}>
          {event ? "Editar Evento" : "Crear Nuevo Evento"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          {/* Título del evento */}
          <TextField
            label="Título del evento"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
            placeholder="Ingresa el título del evento"
          />

          {/* Todo el día */}
          <FormControlLabel
            control={
              <Switch
                checked={formData.allDay}
                onChange={(e) => handleAllDayChange(e.target.checked)}
              />
            }
            label="Todo el día"
          />

          {/* Fechas y horas */}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Stack direction="row" spacing={2}>
              <DateTimePicker
                label="Fecha y hora de inicio"
                value={formData.start}
                onChange={handleStartChange}
                disabled={formData.allDay}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.start}
                    helperText={errors.start}
                  />
                )}
              />
              <DateTimePicker
                label="Fecha y hora de fin"
                value={formData.end}
                onChange={handleEndChange}
                disabled={formData.allDay}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.end}
                    helperText={errors.end}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>

          {/* Ubicación */}
          <TextField
            label="Ubicación"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            fullWidth
            placeholder="Opcional"
            InputProps={{
              startAdornment: <IconMapPin size={18} style={{ marginRight: 8, color: theme.palette.text.secondary }} />
            }}
          />

          {/* Participantes */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Participantes
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField
                size="small"
                placeholder="Agregar participante"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddParticipant}
                disabled={!newParticipant.trim()}
                startIcon={<IconPlus size={16} />}
              >
                Agregar
              </Button>
            </Stack>
            {formData.participants && formData.participants.length > 0 && (
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {formData.participants.map((participant, index) => (
                  <Chip
                    key={index}
                    label={participant}
                    onDelete={() => handleRemoveParticipant(participant)}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* Descripción */}
          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder="Opcional"
          />

          {/* Color del evento */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Color del evento
            </Typography>
            <Stack direction="row" spacing={1}>
              {colorOptions.map((option) => (
                <Box
                  key={option.value}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: option.color,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: formData.color === option.value ? `3px solid ${theme.palette.background.paper}` : 'none',
                    boxShadow: formData.color === option.value ? `0 0 0 2px ${option.color}` : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                  onClick={() => handleInputChange("color", option.value)}
                >
                  {formData.color === option.value && (
                    <IconCheck size={20} color="white" />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      {/* Acciones del diálogo */}
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!formData.title?.trim()}
        >
          {event ? "Actualizar" : "Crear"} Evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarEventForm; 