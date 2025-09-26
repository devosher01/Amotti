"use client";

import React from "react";
import {
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { ModalFooterProps } from "./types";

const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onSave,
  scheduledTime,
  onDateTimeChange,
  isValid,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      borderTop: `1px solid ${theme.palette.divider}`,
      p: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2
    }}>
      {/* Botón cancelar */}
      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{ minWidth: 100 }}
      >
        Cancelar
      </Button>

      {/* Selector de fecha y hora */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DateTimePicker
          value={scheduledTime}
          onChange={(newValue) => {
            if (newValue instanceof Date) {
              onDateTimeChange(newValue);
            }
          }}
          slotProps={{
            textField: {
              size: "small",
              sx: { minWidth: 200 }
            }
          }}
        />
      </LocalizationProvider>

      {/* Botón programar */}
      <Button
        variant="contained"
        onClick={onSave}
        disabled={!isValid}
        sx={{ minWidth: 120 }}
      >
        Programar
      </Button>
    </Box>
  );
};

export default ModalFooter; 