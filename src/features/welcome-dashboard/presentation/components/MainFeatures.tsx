import React from "react";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Button,
  Stack,
  Avatar,
  alpha,
} from "@mui/material";
import {
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { features } from "../constants/data";
import { FeatureCard } from "../styles/StyledComponents";

export const MainFeatures: React.FC = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Stack alignItems="center" spacing={2} sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          component="h2"
          fontWeight={700}
          sx={{
            background: "linear-gradient(135deg, #1e293b 0%, #5b24b7 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text", 
            color: "transparent",
            textAlign: "center",
          }}
        >
          Herramientas Principales
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: "500px" }}
        >
          Todo lo que necesitas para dominar el marketing en redes sociales
        </Typography>
      </Stack>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          const colors = ["#5b24b7", "#10B981", "#F59E0B"];
          const color = colors[index % colors.length];
          
          return (
            <Grid item xs={12} md={4} key={index}>
              <Link href={feature.link} style={{ textDecoration: "none" }}>
                <FeatureCard>
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Stack alignItems="center" spacing={3}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: alpha(color, 0.1),
                          border: `2px solid ${alpha(color, 0.2)}`,
                        }}
                      >
                        <IconComponent size={40} color={color} />
                      </Avatar>
                      
                      <Stack alignItems="center" spacing={1.5}>
                        <Typography variant="h5" fontWeight={700}>
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          textAlign="center"
                          sx={{ minHeight: 48 }}
                        >
                          {feature.description}
                        </Typography>
                      </Stack>

                      <Button
                        endIcon={<IconArrowRight size={16} />}
                        sx={{
                          color: color,
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: alpha(color, 0.04),
                          },
                        }}
                      >
                        Explorar
                      </Button>
                    </Stack>
                  </CardContent>
                </FeatureCard>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
