"use client"
import { Box, Container, Typography, Button, ThemeProvider, CssBaseline } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const NotFoundContent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Image
          src={"/images/backgrounds/errorimg.svg"}
          alt="404" 
          width={500} 
          height={500}
          style={{ width: "100%", maxWidth: "500px", maxHeight: '500px' }}
        />
        <Typography align="center" variant="h1" mb={4}>
          Opps!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          This page you are looking for could not be found.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          href="/"
          disableElevation
        >
          Go Back to Home
        </Button>
      </Container>
    </Box>
  );
};

const NotFound = () => {
  const theme = ThemeSettings();

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotFoundContent />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default NotFound;
