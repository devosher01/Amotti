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
} from '@mui/material';
import { InstagramPost } from '../../domain/types';

interface InstagramPostsTableProps {
  posts: InstagramPost[];
  loading: boolean;
  error: string | null;
}

const InstagramPostsTable: React.FC<InstagramPostsTableProps> = ({ posts, loading, error }) => {
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
      case 'carousel':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
          Publicaciones Recientes
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Últimas publicaciones y su rendimiento
        </Typography>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Contenido</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Likes</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Comentarios</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Impresiones</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Clics</TableCell>
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
                      {post.impressions.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {post.clicks.toLocaleString()}
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

export default InstagramPostsTable;
