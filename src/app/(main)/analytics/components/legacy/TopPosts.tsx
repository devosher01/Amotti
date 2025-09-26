import React from "react";
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip } from "@mui/material";
import { IconHeart, IconEye, IconMessageCircle, IconShare, IconTrendingUp } from "@tabler/icons-react";

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

const TopPosts = ({ network }: Props) => {
  if (!network) return null;

  // Datos simulados de posts top
  const topPosts = [
    {
      id: 1,
      title: "Nuevo producto lanzado 🚀",
      content: "Estamos emocionados de presentar nuestro último lanzamiento...",
      likes: Math.round(network.metrics.likes * 0.15),
      comments: Math.round(network.metrics.likes * 0.05),
      shares: Math.round(network.metrics.likes * 0.03),
      reach: Math.round(network.metrics.reach * 0.12),
      engagement: 8.5,
      date: "2024-01-15",
      type: "Imagen",
    },
    {
      id: 2,
      title: "Consejos de marketing digital 💡",
      content: "Compartimos algunos consejos valiosos para mejorar tu presencia...",
      likes: Math.round(network.metrics.likes * 0.12),
      comments: Math.round(network.metrics.likes * 0.04),
      shares: Math.round(network.metrics.likes * 0.06),
      reach: Math.round(network.metrics.reach * 0.10),
      engagement: 7.2,
      date: "2024-01-12",
      type: "Video",
    },
    {
      id: 3,
      title: "Resultados del mes 📊",
      content: "Mira los increíbles resultados que hemos logrado este mes...",
      likes: Math.round(network.metrics.likes * 0.10),
      comments: Math.round(network.metrics.likes * 0.03),
      shares: Math.round(network.metrics.likes * 0.02),
      reach: Math.round(network.metrics.reach * 0.08),
      engagement: 6.8,
      date: "2024-01-10",
      type: "Carousel",
    },
    {
      id: 4,
      title: "Behind the scenes 🎬",
      content: "Un vistazo detrás de cámaras de nuestro equipo trabajando...",
      likes: Math.round(network.metrics.likes * 0.08),
      comments: Math.round(network.metrics.likes * 0.02),
      shares: Math.round(network.metrics.likes * 0.01),
      reach: Math.round(network.metrics.reach * 0.06),
      engagement: 5.4,
      date: "2024-01-08",
      type: "Video",
    },
    {
      id: 5,
      title: "Testimonio de cliente ⭐",
      content: "Escucha lo que nuestros clientes tienen que decir sobre nosotros...",
      likes: Math.round(network.metrics.likes * 0.06),
      comments: Math.round(network.metrics.likes * 0.01),
      shares: Math.round(network.metrics.likes * 0.01),
      reach: Math.round(network.metrics.reach * 0.05),
      engagement: 4.2,
      date: "2024-01-05",
      type: "Imagen",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video":
        return "#E4405F";
      case "Carousel":
        return "#4057d9";
      case "Imagen":
        return "#10B981";
      default:
        return "#64748b";
    }
  };

  return (
    <Card
      sx={{
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
            Posts Más Populares
          </Typography>
          <Chip
            icon={<IconTrendingUp size={16} />}
            label="Top 5"
            sx={{
              backgroundColor: `${network.color}15`,
              color: network.color,
              fontWeight: 600,
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Post</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Me gusta</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Comentarios</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Compartidos</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Alcance</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Engagement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topPosts.map((post, index) => (
                <TableRow
                  key={post.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(64, 87, 217, 0.05)",
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: `${network.color}15`,
                          color: network.color,
                          fontWeight: 600,
                        }}
                      >
                        #{index + 1}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#1e293b",
                            mb: 0.5,
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            display: "block",
                          }}
                        >
                          {post.content.substring(0, 50)}...
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={post.type}
                      size="small"
                      sx={{
                        backgroundColor: `${getTypeColor(post.type)}15`,
                        color: getTypeColor(post.type),
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconHeart size={16} color="#E4405F" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.likes.toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconMessageCircle size={16} color="#4057d9" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.comments.toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconShare size={16} color="#10B981" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.shares.toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconEye size={16} color="#1DA1F2" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.reach.toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${post.engagement}%`}
                      size="small"
                      sx={{
                        backgroundColor: `${network.color}15`,
                        color: network.color,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TopPosts; 