import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { IconBrain } from "@tabler/icons-react";

export default function GeneradorPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Generador de Contenido IA
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconBrain size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">Generación Inteligente</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Utiliza inteligencia artificial para generar contenido creativo y relevante
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 