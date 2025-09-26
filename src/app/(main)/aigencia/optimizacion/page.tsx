import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { IconWand } from "@tabler/icons-react";

export default function OptimizacionPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Optimización IA
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconWand size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">Optimización Automática</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Optimiza tu contenido automáticamente con herramientas de IA avanzadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 