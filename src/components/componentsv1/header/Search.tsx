import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  Stack,
  Divider,
  Box,
  List,
  ListItemText,
  Typography,
  TextField,
  ListItemButton,
  alpha,
  useTheme,
} from '@mui/material';
import { IconSearch, IconX } from '@tabler/icons-react';
import Menuitems from '../sidebar/MenuItems';
import Link from 'next/link';
import { useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';

interface menuType {
  title: string;
  id: string;
  subheader: string;
  children: menuType[];
  href: string;
}

const Search = () => {
  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [search, setSerach] = useState('');
  const customizer = useSelector((state: AppState) => state.customizer);
  const isDark = customizer.activeMode === 'dark';
  const theme = useTheme();

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  const filterRoutes = (rotr: any, cSearch: string): any[] => {
    if (!cSearch) return rotr;
    
    const filtered: any[] = [];
    
    rotr.forEach((item: any) => {
      // Skip navlabels
      if (item.navlabel) return;
      
      // If item has children, search within children
      if (item.children && item.children.length > 0) {
        const matchingChildren = item.children.filter((child: any) =>
          child.title && child.href && 
          (child.title.toLowerCase().includes(cSearch.toLowerCase()) ||
           child.href.toLowerCase().includes(cSearch.toLowerCase()))
        );
        
        // If any children match, include the parent with matching children
        if (matchingChildren.length > 0) {
          filtered.push({
            ...item,
            children: matchingChildren
          });
        }
      } 
      // If item has href (leaf node), check if it matches
      else if (item.href && item.title) {
        if (item.title.toLowerCase().includes(cSearch.toLowerCase()) ||
            item.href.toLowerCase().includes(cSearch.toLowerCase())) {
          filtered.push(item);
        }
      }
    });
    
    return filtered;
  };
  const searchData = filterRoutes(Menuitems, search);

  return (
    <>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer2(true)}
        size="large"
        sx={{
          color: theme.palette.primary.main,
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            transform: 'scale(1.05)',
            transition: 'all 0.2s ease',
          }
        }}
      >
        <IconSearch size="16" />
      </IconButton>
      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ 
          sx: { 
            position: 'fixed', 
            top: 30, 
            m: 0,
            // 🎨 Estilo con tema para el diálogo
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1),
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
              borderRadius: '4px 4px 0 0',
            },
          } 
        }}
      >
        <DialogContent className="testdialog">
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              id="tb-search"
              placeholder="Buscar aquí..."
              fullWidth
              onChange={(e) => setSerach(e.target.value)}
              inputProps={{ 'aria-label': 'Search here' }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: alpha(theme.palette.primary.main, isDark ? 0.3 : 0.2),
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputBase-input': {
                  color: theme.palette.text.primary,
                  '&::placeholder': {
                    color: alpha(theme.palette.text.secondary, 0.6),
                  },
                },
              }}
            />
            <IconButton 
              size="small" 
              onClick={handleDrawerClose2}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s ease',
                }
              }}
            >
              <IconX size="18" />
            </IconButton>
          </Stack>
        </DialogContent>
        <Divider sx={{ borderColor: alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1) }} />
        <Box p={2} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
          <Typography 
            variant="h5" 
            p={1}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&::after': {
                content: '""',
                display: 'block',
                width: '40px',
                height: '2px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                borderRadius: '1px',
                marginTop: '4px',
              }
            }}
          >
            Enlaces Rápidos
          </Typography>
          <Box>
            <List component="nav">
              {searchData.map((menu: menuType) => {
                return (
                  <Box key={menu.title ? menu.id : menu.subheader}>
                    {menu.title && !menu.children && menu.href ? (
                      <ListItemButton 
                        sx={{ 
                          py: 0.5, 
                          px: 1,
                          '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.05),
                            '& .MuiListItemText-primary': {
                              color: theme.palette.primary.main,
                            }
                          }
                        }} 
                        href={menu.href} 
                        component={Link}
                        onClick={handleDrawerClose2}
                      >
                        <ListItemText
                          primary={menu.title}
                          secondary={menu.href}
                          sx={{ 
                            my: 0, 
                            py: 0.5,
                            '& .MuiListItemText-primary': {
                              fontWeight: 500,
                            },
                            '& .MuiListItemText-secondary': {
                              fontSize: '0.75rem',
                              opacity: 0.7,
                            }
                          }}
                        />
                      </ListItemButton>
                    ) : null}
                    
                    {menu.children ? (
                      <>
                        {/* Parent header (non-clickable) */}
                        <Typography
                          variant="subtitle2"
                          sx={{
                            px: 1,
                            py: 0.5,
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            fontSize: '0.875rem',
                            borderBottom: '1px solid',
                            borderColor: alpha(theme.palette.primary.main, 0.1),
                            mb: 0.5
                          }}
                        >
                          {menu.title}
                        </Typography>
                        
                        {/* Children with indentation */}
                        {menu.children.map((child: menuType) => {
                          return (
                            <ListItemButton
                              sx={{ 
                                py: 0.5, 
                                px: 1,
                                pl: 3, // Indentación para sub-items
                                '&:hover': {
                                  background: alpha(theme.palette.primary.main, 0.05),
                                  '& .MuiListItemText-primary': {
                                    color: theme.palette.primary.main,
                                  }
                                }
                              }}
                              href={child.href}
                              component={Link}
                              key={child.title ? child.id : menu.subheader}
                              onClick={handleDrawerClose2}
                            >
                              <Box
                                sx={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: '50%',
                                  backgroundColor: alpha(theme.palette.primary.main, 0.4),
                                  mr: 1,
                                  flexShrink: 0
                                }}
                              />
                              <ListItemText
                                primary={child.title}
                                secondary={child.href}
                                sx={{ 
                                  my: 0, 
                                  py: 0.5,
                                  '& .MuiListItemText-primary': {
                                    fontWeight: 400, // Menos peso para sub-items
                                    fontSize: '0.875rem',
                                  },
                                  '& .MuiListItemText-secondary': {
                                    fontSize: '0.75rem',
                                    opacity: 0.6,
                                  }
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </>
                    ) : null}
                  </Box>
                );
              })}
            </List>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
