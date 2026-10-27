import React, { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { Sidebar, DRAWER_WIDTH } from './Sidebar';
import { TopNav } from './TopNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        activeItem="dashboard"
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
        }}
      >
        <TopNav onDrawerToggle={handleDrawerToggle} />
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2.5, md: 3.5 },
            px: { xs: 2, sm: 3, md: 4 },
            flexGrow: 1,
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
