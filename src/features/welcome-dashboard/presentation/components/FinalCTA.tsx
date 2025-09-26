import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  alpha,
} from "@mui/material";
import {
  IconUsers,
  IconRocket,
} from "@tabler/icons-react";
import { GradientButton } from "../styles/StyledComponents";

interface FinalCTAProps {
  onStartOnboarding: () => void;
  onShowDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onStartOnboarding,
  onShowDemo,
}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        px: 4,
        background: `linear-gradient(135deg, ${alpha("#5b24b7", 0.05)} 0%, ${alpha("#5b24b7", 0.02)} 100%)`,
        borderRadius: 4,
        border: `1px solid ${alpha("#5b24b7", 0.1)}`,
      }}
    >
      <Stack alignItems="center" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconUsers size={32} color="#5b24b7" />
          <Typography variant="h4" fontWeight={700} color="#1e293b">
            Únete a +10,000 usuarios
          </Typography>
        </Stack>
        
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "600px" }}>
          Que ya están maximizando su alcance en redes sociales con Tactiko 360.
          Comienza conectando tu primera red social ahora.
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
          <GradientButton
            size="large"
            startIcon={<IconRocket size={20} />}
            onClick={onStartOnboarding}
          >
            Comenzar Ahora
          </GradientButton>
          
          <Button
            variant="outlined"
            size="large"
            onClick={onShowDemo}
            sx={{
              borderColor: alpha("#5b24b7", 0.3),
              color: "#5b24b7",
              fontWeight: 600,
              borderRadius: "16px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#5b24b7",
                backgroundColor: alpha("#5b24b7", 0.04),
              },
            }}
          >
            Ver Demo
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
