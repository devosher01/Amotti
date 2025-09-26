import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { IconSettings } from "@tabler/icons-react";

export default function SettingsPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Configuración
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconSettings size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">Configuración General</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Personaliza la configuración de tu aplicación y preferencias
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 