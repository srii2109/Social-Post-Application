import React, { useState } from 'react';
import { Box, Grid, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';
import RightSidebar from '../components/RightSidebar';
import BottomNav from '../components/BottomNav';

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const handlePost = () => setRefresh((prev) => !prev);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'transparent',
      }}
    >
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: 2, pb: 10, px: { xs: 1, sm: 2 } }}>
        <Grid container spacing={3}>
          {/* Sidebar - 280px */}
          <Grid item xs={12} md={2.5} lg={2.5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Sidebar />
          </Grid>

          {/* Feed - Flexible */}
          <Grid item xs={12} md={6.5} lg={6.5}>
            <CreatePost onPostCreated={handlePost} />
            <Feed refreshTrigger={refresh} />
          </Grid>

          {/* Right Panel - 320px */}
          <Grid item xs={12} md={3} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Container>
      <BottomNav />
    </Box>
  );
};

export default Home;