import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
      <Button
        variant="text"
        color="inherit"
        onClick={() => router.push("/")}
      >
        Dashboard
      </Button>
      <Button
        variant="text"
        color="inherit"
        onClick={() => router.push("/planificacion/calendario")}
      >
        Planificación
      </Button>
      <Button
        variant="text"
        color="inherit"
        onClick={() => router.push("/analitica/metricas")}
      >
        Analítica
      </Button>
      <Button
        variant="text"
        color="inherit"
        onClick={() => router.push("/aigencia/generador")}
      >
        AIgencia
      </Button>
    </Box>
  );
};

export default Navigation; 