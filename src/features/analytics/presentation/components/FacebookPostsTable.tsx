import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import { FacebookPost } from '../../domain/types';

interface FacebookPostsTableProps {
  posts: FacebookPost[];
  loading: boolean;
  error: string | null;
}

const FacebookPostsTable: React.FC<FacebookPostsTableProps> = ({ posts, loading, error }) => {
  const theme = useTheme();
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'photo':
        return 'primary';
      case 'video':
        return 'secondary';
      case 'link':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          Publicaciones Recientes
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
          Últimas publicaciones y su rendimiento
        </Typography>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(theme.palette.background.default, 0.8) }}>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Contenido</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Likes</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Comentarios</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Compartidos</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Impresiones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay publicaciones disponibles
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} hover>
                  <TableCell>
                    <Chip
                      label={post.type}
                      color={getTypeColor(post.type) as any}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.message || 'Sin mensaje'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(post.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {post.likesCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {post.commentsCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {post.sharesCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {post.impressions.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FacebookPostsTable;
