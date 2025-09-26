import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { IconUser } from "@tabler/icons-react";

export default function PerfilPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Perfil de Usuario
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconUser size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">Gestión de Perfil</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Actualiza tu información personal y configuración de cuenta
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 