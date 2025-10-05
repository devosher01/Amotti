'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
  IconButton,
  Stack,
  useTheme,
  alpha,
  Paper,
  Avatar,
} from '@mui/material';
import {
  IconExternalLink,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from '@tabler/icons-react';
import { Post } from '../../core/api/types';

interface PostsTableProps {
  posts: Post[];
  isLoading?: boolean;
}

type SortField = 'createdAt' | 'likesCount' | 'commentsCount' | 'impressions' | 'engagement';
type SortDirection = 'asc' | 'desc';

export function PostsTable({ posts, isLoading = false }: PostsTableProps) {
  const theme = useTheme();
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getEngagementRate = (post: Post): number => {
    const total = post.likesCount + post.commentsCount + post.sharesCount;
    return post.impressions > 0 ? (total / post.impressions) * 100 : 0;
  };

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      photo: '#3B82F6',
      video: '#EF4444',
      text: '#6B7280',
      carousel: '#F59E0B',
      reel: '#8B5CF6',
      story: '#10B981',
    };
    return colors[type as keyof typeof colors] || theme.palette.grey[500];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      photo: '📸',
      video: '🎥',
      text: '📝',
      carousel: '🎠',
      reel: '🎬',
      story: '⚡',
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  const getTrendIcon = (engagement: number) => {
    if (engagement >= 5) return <IconTrendingUp size={16} color={theme.palette.success.main} />;
    if (engagement >= 2) return <IconMinus size={16} color={theme.palette.warning.main} />;
    return <IconTrendingDown size={16} color={theme.palette.error.main} />;
  };

  const sortedPosts = [...posts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortField) {
      case 'engagement':
        aValue = getEngagementRate(a);
        bValue = getEngagementRate(b);
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        aValue = a[sortField];
        bValue = b[sortField];
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  if (isLoading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Todas las Publicaciones
        </Typography>
        <Paper
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              sx={{
                height: 60,
                background: alpha(theme.palette.grey[100], 0.5),
                animation: 'pulse 1.5s ease-in-out infinite',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            />
          ))}
        </Paper>
      </Box>
    );
  }

  if (!posts.length) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: theme.palette.text.primary,
          letterSpacing: '-0.01em',
        }}
      >
        Todas las Publicaciones ({posts.length})
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: `0 2px 12px ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow
              sx={{
                background: alpha(theme.palette.grey[50], 0.8),
                '& th': {
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  py: 2,
                },
              }}
            >
              <TableCell sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                Contenido
              </TableCell>
              
              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={sortField === 'createdAt'}
                  direction={sortField === 'createdAt' ? sortDirection : 'desc'}
                  onClick={() => handleSort('createdAt')}
                  sx={{
                    color: theme.palette.text.primary,
                    '&.Mui-active': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Fecha
                </TableSortLabel>
              </TableCell>
              
              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={sortField === 'likesCount'}
                  direction={sortField === 'likesCount' ? sortDirection : 'desc'}
                  onClick={() => handleSort('likesCount')}
                  sx={{
                    color: theme.palette.text.primary,
                    '&.Mui-active': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Me Gusta
                </TableSortLabel>
              </TableCell>
              
              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={sortField === 'commentsCount'}
                  direction={sortField === 'commentsCount' ? sortDirection : 'desc'}
                  onClick={() => handleSort('commentsCount')}
                  sx={{
                    color: theme.palette.text.primary,
                    '&.Mui-active': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Comentarios
                </TableSortLabel>
              </TableCell>
              
              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={sortField === 'impressions'}
                  direction={sortField === 'impressions' ? sortDirection : 'desc'}
                  onClick={() => handleSort('impressions')}
                  sx={{
                    color: theme.palette.text.primary,
                    '&.Mui-active': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Impresiones
                </TableSortLabel>
              </TableCell>
              
              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={sortField === 'engagement'}
                  direction={sortField === 'engagement' ? sortDirection : 'desc'}
                  onClick={() => handleSort('engagement')}
                  sx={{
                    color: theme.palette.text.primary,
                    '&.Mui-active': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Engagement
                </TableSortLabel>
              </TableCell>
              
              <TableCell sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {sortedPosts.map((post) => {
              const engagement = getEngagementRate(post);
              
              return (
                <TableRow
                  key={post.id}
                  sx={{
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.02),
                    },
                    '& td': {
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      py: 2,
                    },
                  }}
                >
                  {/* Content */}
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background: alpha(getTypeColor(post.type), 0.1),
                          color: getTypeColor(post.type),
                          fontSize: '1.2rem',
                        }}
                      >
                        {getTypeIcon(post.type)}
                      </Avatar>
                      
                      <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={post.type}
                            size="small"
                            sx={{
                              backgroundColor: alpha(getTypeColor(post.type), 0.1),
                              color: getTypeColor(post.type),
                              border: `1px solid ${alpha(getTypeColor(post.type), 0.2)}`,
                              fontWeight: 600,
                              textTransform: 'capitalize',
                              fontSize: '0.75rem',
                            }}
                          />
                          
                          <Chip
                            label={post.platform}
                            size="small"
                            variant="outlined"
                            sx={{
                              textTransform: 'capitalize',
                              fontSize: '0.75rem',
                            }}
                          />
                        </Stack>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.4,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {post.message || 'Sin mensaje de texto'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  
                  {/* Date */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatDate(post.createdAt)}
                    </Typography>
                  </TableCell>
                  
                  {/* Likes */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {post.likesCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  
                  {/* Comments */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {post.commentsCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  
                  {/* Impressions */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {post.impressions.toLocaleString()}
                    </Typography>
                  </TableCell>
                  
                  {/* Engagement */}
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getTrendIcon(engagement)}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: engagement >= 5 
                            ? theme.palette.success.main 
                            : engagement >= 2 
                            ? theme.palette.warning.main 
                            : theme.palette.error.main,
                        }}
                      >
                        {engagement.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  {/* Actions */}
                  <TableCell>
                    <IconButton
                      size="small"
                      sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                          background: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      <IconExternalLink size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}