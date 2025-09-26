import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  toggleSidebar,
  toggleMobileSidebar, setDarkMode
} from "@/store/customizer/CustomizerSlice";
import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import Notifications from "./Notification";
import Profile from "./Profile";
import Search from "./Search";
import Language from "./Language";
import { AppState } from "@/store/store";
import Navigation from "./Navigation";
import MobileRightSidebar from "./MobileRightSidebar";

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
    // 🎨 Borde inferior usando colores del tema
    borderBottom: '1px solid',
    borderColor: theme.palette.mode === 'dark' 
      ? `${theme.palette.primary.main}33` // 20% opacity
      : `${theme.palette.primary.main}1A`, // 10% opacity
    position: 'relative',
    // 🎨 Gradiente dinámico usando colores del tema
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.primary.dark} 25%, 
        ${theme.palette.secondary.main} 50%, 
        ${theme.palette.primary.main} 75%, 
        ${theme.palette.secondary.dark} 100%)`,
      opacity: 0.8,
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    padding: '0 16px',
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={
            lgUp
              ? () => dispatch(toggleSidebar())
              : () => dispatch(toggleMobileSidebar())
          }
          sx={{
            color: (theme) => theme.palette.primary.main,
            '&:hover': {
              background: (theme) => `${theme.palette.primary.main}1A`, // 10% opacity
              color: (theme) => theme.palette.primary.main,
              transform: 'scale(1.05)',
              transition: 'all 0.2s ease',
            }
          }}
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />

        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}

        <Box flexGrow={1} />
        
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          
          {/* ------------------------------------------- */}
          {/* Dark/Light Mode Toggle */}
          {/* ------------------------------------------- */}
          <IconButton 
            size="large" 
            color="inherit"
            sx={{
              color: (theme) => theme.palette.primary.main,
              '&:hover': {
                background: (theme) => `${theme.palette.primary.main}1A`, // 10% opacity
                color: (theme) => theme.palette.primary.main,
                transform: 'rotate(15deg)',
                transition: 'all 0.3s ease',
              }
            }}
          >
            {customizer.activeMode === "light" ? (
              <IconMoon
                size="21"
                stroke="1.5"
                onClick={() => dispatch(setDarkMode("dark"))}
              />
            ) : (
              <IconSun
                size="21"
                stroke="1.5"
                onClick={() => dispatch(setDarkMode("light"))}
              />
            )}
          </IconButton>

          <Notifications />
          
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {lgDown ? <MobileRightSidebar /> : null}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
