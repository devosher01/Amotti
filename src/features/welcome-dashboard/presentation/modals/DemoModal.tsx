import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Paper,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  IconX,
  IconVideo,
} from "@tabler/icons-react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ backgroundColor: "#5b24b7" }}>
              <IconVideo size={20} color="white" />
            </Avatar>
            <Typography variant="h4" fontWeight={700}>Demo Interactivo</Typography>
          </Stack>
          <Button onClick={onClose}><IconX size={20} /></Button>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Paper sx={{ 
          height: 300, 
          borderRadius: 3, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          border: "2px dashed rgba(91, 36, 183, 0.2)", 
          mb: 3 
        }}>
          <Stack alignItems="center" spacing={2}>
            <Avatar sx={{ width: 80, height: 80, backgroundColor: "#5b24b7" }}>
              <IconVideo size={40} color="white" />
            </Avatar>
            <Typography variant="h6">Video Demo Próximamente</Typography>
            <LinearProgress variant="determinate" value={75} sx={{ width: 200 }} />
          </Stack>
        </Paper>
        <Alert severity="info">
          Características: Programación automática, Analíticas en tiempo real, IA para contenido
        </Alert>
      </DialogContent>
    </Dialog>
  );
};
