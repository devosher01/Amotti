import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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

const GrowthChart = ({ network }: Props) => {
  if (!network) return null;

  // Datos simulados para el gráfico
  const generateData = () => {
    const data = [];
    const baseValue = network.metrics.followers;
    for (let i = 0; i < 30; i++) {
      const randomGrowth = (Math.random() - 0.5) * 0.1; // ±5% variación
      const value = Math.max(0, baseValue * (1 + randomGrowth + (i * 0.01)));
      data.push(Math.round(value));
    }
    return data;
  };

  const chartData = generateData();

  const options = {
    chart: {
      type: "area" as const,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    series: [
      {
        name: "Seguidores",
        data: chartData,
      },
    ],
    colors: [network.color],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: network.color,
            opacity: 0.8,
          },
          {
            offset: 100,
            color: network.color,
            opacity: 0.1,
          },
        ],
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
      }),
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
        formatter: (value: number) => {
          if (value >= 1000) {
            return (value / 1000).toFixed(1) + "K";
          }
          return value.toString();
        },
      },
    },
    tooltip: {
      theme: "light" as const,
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "Seguidores: ",
        },
        formatter: (value: number) => value.toLocaleString(),
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            Crecimiento de Seguidores
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              backgroundColor: `${network.color}15`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: network.color,
                fontWeight: 600,
              }}
            >
              +{network.metrics.growth}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: 350 }}>
          <Chart
            options={options}
            series={options.series}
            type="area"
            height={350}
          />
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontSize: "0.875rem",
            }}
          >
            Últimos 30 días
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontSize: "0.875rem",
            }}
          >
            Total: {network.metrics.followers.toLocaleString()} seguidores
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GrowthChart; 