import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import BottomNav from '../components/BottomNav';

const Explore = () => (
  <Box
    sx={{
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1,
    }}
  >
    <Navbar />
    <Container maxWidth="xl" sx={{ pt: 2, pb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2.5} lg={2.5} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={6.5} lg={6.5}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#FFFFFF',
              mb: 1,
            }}
          >
            Explore
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#94A3B8',
              mb: 3,
            }}
          >
            Discover trending posts and people
          </Typography>
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#94A3B8',
              }}
            >
              🔍 Explore content coming soon
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <RightSidebar />
        </Grid>
      </Grid>
    </Container>
    <BottomNav />
  </Box>
);

export default Explore;