import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { FloatingTabs } from '../Navigation/FloatingTabs';

export const MainLayout: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { lg: '269px' },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopBar onMenuClick={() => setIsMobileNavOpen(true)} />
        
        <Box sx={{ p: 3, flex: 1 }}>
          <Container maxWidth="lg" sx={{ height: '100%' }}>
            <Outlet />
          </Container>
        </Box>

        <FloatingTabs />
      </Box>
    </Box>
  );
};