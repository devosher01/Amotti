import React from "react";
import { Card, CardContent, Typography, Box, Avatar, LinearProgress } from "@mui/material";
import { IconHeart, IconEye, IconMessageCircle, IconShare } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

const EngagementMetrics = ({ network }: Props) => {
  if (!network) return null;

  const engagementData = [
    {
      name: "Me gusta",
      value: Math.round((network.metrics.likes / network.metrics.followers) * 100),
      icon: IconHeart,
      color: "#E4405F",
    },
    {
      name: "Comentarios",
      value: Math.round((network.metrics.likes * 0.3 / network.metrics.followers) * 100),
      icon: IconMessageCircle,
      color: "#4057d9",
    },
    {
      name: "Compartidos",
      value: Math.round((network.metrics.likes * 0.15 / network.metrics.followers) * 100),
      icon: IconShare,
      color: "#10B981",
    },
    {
      name: "Alcance",
      value: Math.round((network.metrics.reach / network.metrics.followers) * 100),
      icon: IconEye,
      color: "#1DA1F2",
    },
  ];

  const chartOptions = {
    chart: {
      type: "donut" as const,
      background: "transparent",
    },
    series: [network.metrics.engagement, 100 - network.metrics.engagement],
    colors: [network.color, "#e2e8f0"],
    labels: ["Engagement", "Resto"],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#1e293b",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: network.color,
            },
            total: {
              show: true,
              label: "Engagement",
              fontSize: "14px",
              fontWeight: 600,
              color: "#64748b",
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#1e293b",
            mb: 3,
          }}
        >
          Métricas de Engagement
        </Typography>

        {/* Gráfico circular principal */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box sx={{ width: 200, height: 200 }}>
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="donut"
              height={200}
            />
          </Box>
        </Box>

        {/* Métricas detalladas */}
        <Box sx={{ space: 2 }}>
          {engagementData.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: `${metric.color}15`,
                        color: metric.color,
                      }}
                    >
                      <IconComponent size={16} />
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                      }}
                    >
                      {metric.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: metric.color,
                    }}
                  >
                    {metric.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: `${metric.color}20`,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: metric.color,
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Resumen */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: `${network.color}10`,
            borderRadius: 2,
            border: `1px solid ${network.color}20`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            Engagement promedio: <strong style={{ color: network.color }}>{network.metrics.engagement}%</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics; 