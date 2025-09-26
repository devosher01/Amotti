import React from "react";
import { Grid, Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { IconUsers, IconHeart, IconEye, IconTarget, IconTrendingUp, IconMessageCircle } from "@tabler/icons-react";

interface Network {
  id: string;
  name: string;
  icon: any;
  color: string;
  metrics: {
    followers: number;
    likes: number;
    reach: number;
    engagement: number;
    posts: number;
    growth: number;
  };
}

interface Props {
  network: Network | undefined;
}

const SocialMediaMetrics = ({ network }: Props) => {
  if (!network) return null;

  const metrics = [
    {
      title: "Seguidores",
      value: network.metrics.followers.toLocaleString(),
      icon: IconUsers,
      color: "#4057d9",
      trend: "+" + network.metrics.growth + "%",
      trendColor: "#10B981"
    },
    {
      title: "Me gusta",
      value: network.metrics.likes.toLocaleString(),
      icon: IconHeart,
      color: "#E4405F",
      trend: "+" + (network.metrics.growth * 0.8).toFixed(1) + "%",
      trendColor: "#10B981"
    },
    {
      title: "Alcance",
      value: network.metrics.reach.toLocaleString(),
      icon: IconEye,
      color: "#1DA1F2",
      trend: "+" + (network.metrics.growth * 1.2).toFixed(1) + "%",
      trendColor: "#10B981"
    },
    {
      title: "Engagement",
      value: network.metrics.engagement + "%",
      icon: IconTarget,
      color: "#5b24b7",
      trend: "+" + (network.metrics.growth * 0.3).toFixed(1) + "%",
      trendColor: "#10B981"
    },
    {
      title: "Publicaciones",
      value: network.metrics.posts.toString(),
      icon: IconMessageCircle,
      color: "#FF6B35",
      trend: "+" + (network.metrics.growth * 0.5).toFixed(1) + "%",
      trendColor: "#10B981"
    },
    {
      title: "Crecimiento",
      value: network.metrics.growth + "%",
      icon: IconTrendingUp,
      color: "#10B981",
      trend: "+" + (network.metrics.growth * 0.2).toFixed(1) + "%",
      trendColor: "#10B981"
    }
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Grid item xs={12} sm={6} lg={4} xl={2} key={index}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}80 100%)`,
                      color: "white",
                      boxShadow: `0 4px 12px ${metric.color}40`,
                    }}
                  >
                    <IconComponent size={24} />
                  </Avatar>
                  <Typography
                    variant="caption"
                    sx={{
                      color: metric.trendColor,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      backgroundColor: `${metric.trendColor}15`,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                    }}
                  >
                    {metric.trend}
                  </Typography>
                </Box>
                
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    mb: 1,
                    fontSize: "1.75rem",
                  }}
                >
                  {metric.value}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  {metric.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SocialMediaMetrics; 