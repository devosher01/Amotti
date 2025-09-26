import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  hoverSidebar,
  toggleMobileSidebar,
} from "@/store/customizer/CustomizerSlice";
import { Profile } from "./SidebarProfile/Profile";
import { AppState } from "@/store/store";
import Logo from "../shared/logo/Logo";
import Scrollbar from "@/features/shared/components/custom-scroll/Scrollbar";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  return (
    <>
      {!lgUp ? (
        <Box
          sx={{
            zIndex: 100,
            width: toggleWidth,
            flexShrink: 0,
            ...(customizer.isCollapse && {
              position: "absolute",
            }),
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar for desktop */}
          {/* ------------------------------------------- */}
          <Drawer
            anchor="left"
            open
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            variant="permanent"
            PaperProps={{
              sx: {
                transition: theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: "border-box",
                position: "fixed", // Fijar la sidebar completamente
                height: "100vh", // Altura completa de la ventana
                // 🎨 Gradiente usando los colores del tema activo
                background: theme.palette.mode === 'dark' 
                  ? `linear-gradient(135deg, 
                      ${theme.palette.primary.dark} 0%,
                      ${theme.palette.primary.main} 25%,
                      ${theme.palette.secondary.dark} 50%,
                      ${theme.palette.primary.main} 75%,
                      ${theme.palette.primary.dark} 100%
                    )`
                  : `linear-gradient(135deg, 
                      ${theme.palette.secondary.main} 0%,
                      ${theme.palette.primary.main} 20%,
                      ${theme.palette.primary.dark} 40%,
                      ${theme.palette.primary.main} 60%,
                      ${theme.palette.secondary.dark} 80%,
                      ${theme.palette.primary.dark} 100%
                    )`,
                borderRight: theme.palette.mode === 'dark' 
                  ? `1px solid ${theme.palette.primary.main}33`  // 20% opacity
                  : `1px solid ${theme.palette.primary.dark}33`, // 20% opacity
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  // 🎨 Efectos de Overlay según el tema
                  background: theme.palette.mode === 'dark'
                    ? `
                      radial-gradient(circle at 20% 20%, rgba(91, 36, 183, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(91, 36, 183, 0.1) 0%, transparent 50%),
                      linear-gradient(135deg, rgba(91, 36, 183, 0.15) 0%, transparent 100%)
                    `
                    : `
                      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)
                    `,
                },
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Sidebar Box */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* ------------------------------------------- */}
              {/* Logo - Completamente fijo */}
              {/* ------------------------------------------- */}
              <Box px={3} sx={{ flexShrink: 0, pt: 2, pb: 2 }}>
                <Logo />
              </Box>
              
              {/* ------------------------------------------- */}
              {/* Contenido scrollable - Solo los items */}
              {/* ------------------------------------------- */}
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Scrollbar 
                  sx={{ 
                    height: "100%",
                    // Ocultar completamente la barra de scroll
                    '& .simplebar-scrollbar': {
                      display: 'none !important',
                    },
                    '& .simplebar-track': {
                      display: 'none !important',
                    },
                    '& .simplebar-track.simplebar-vertical': {
                      display: 'none !important',
                    },
                    '& .simplebar-track.simplebar-horizontal': {
                      display: 'none !important',
                    },
                  }}
                >
                  {/* ------------------------------------------- */}
                  {/* Sidebar Items */}
                  {/* ------------------------------------------- */}
                  <SidebarItems />
                </Scrollbar>
              </Box>
              
              {/* ------------------------------------------- */}
              {/* Profile - Completamente fijo */}
              {/* ------------------------------------------- */}
              <Box sx={{ flexShrink: 0 }}>
                <Profile />
              </Box>
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={customizer.isMobileSidebar}
          onClose={() => dispatch(toggleMobileSidebar())}
          variant="temporary"
          PaperProps={{
            sx: {
              width: customizer.SidebarWidth,
              border: "0 !important",
              boxShadow: (theme) => theme.shadows[8],
              // 🎨 Gradiente usando los colores del tema activo (Mobile)
              background: theme.palette.mode === 'dark' 
                ? `linear-gradient(135deg, 
                    ${theme.palette.primary.dark} 0%,
                    ${theme.palette.primary.main} 25%,
                    ${theme.palette.secondary.dark} 50%,
                    ${theme.palette.primary.main} 75%,
                    ${theme.palette.primary.dark} 100%
                  )`
                : `linear-gradient(135deg, 
                    ${theme.palette.secondary.main} 0%,
                    ${theme.palette.primary.main} 20%,
                    ${theme.palette.primary.dark} 40%,
                    ${theme.palette.primary.main} 60%,
                    ${theme.palette.secondary.dark} 80%,
                    ${theme.palette.primary.dark} 100%
                  )`,
              borderRight: theme.palette.mode === 'dark' 
                ? `1px solid ${theme.palette.primary.main}33`
                : `1px solid ${theme.palette.primary.dark}33`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                // 🎨 Efectos de luz usando colores del tema
                background: theme.palette.mode === 'dark'
                  ? `
                    radial-gradient(circle at 30% 10%, ${theme.palette.secondary.main}66 0%, transparent 50%),
                    radial-gradient(circle at 70% 90%, rgba(255, 255, 255, 0.1) 0%, transparent 60%),
                    radial-gradient(circle at 20% 70%, ${theme.palette.primary.main}4D 0%, transparent 70%)
                  `
                  : `
                    radial-gradient(circle at 30% 10%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 70% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
                    radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)
                  `,
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box px={2}>
            <Logo />
          </Box>
          {/* ------------------------------------------- */}
          {/* Sidebar For Mobile */}
          {/* ------------------------------------------- */}
          <SidebarItems />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
