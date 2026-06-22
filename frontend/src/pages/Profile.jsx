import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  Button,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit,
  Settings,
  Instagram,
  Twitter,
  Link,
  LocationOn,
  CalendarToday,
  Verified,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const { user } = useAuth();

  return (
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
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Cover Photo */}
              <Box
                sx={{
                  height: 120,
                  borderRadius: 3,
                  mb: -6,
                  background:
                    'linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)',
                  opacity: 0.6,
                }}
              />

              {/* Profile Info */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    border: '3px solid #0B1020',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    fontSize: 40,
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: '#FFFFFF',
                        }}
                      >
                        {user?.username}
                      </Typography>
                      <Verified sx={{ fontSize: 22, color: '#6366f1' }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#94A3B8',
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{
                      borderRadius: 50,
                      borderColor: 'rgba(255,255,255,0.15)',
                      color: '#FFFFFF',
                      '&:hover': {
                        borderColor: 'rgba(255,255,255,0.3)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>

              {/* Bio */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#CBD5E1',
                  }}
                >
                  🚀 Passionate creator | 💻 Full Stack Developer | 📸
                  Photography enthusiast
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: '#94A3B8',
                    }}
                  >
                    <LocationOn sx={{ fontSize: 16 }} />
                    San Francisco, CA
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: '#94A3B8',
                    }}
                  >
                    <Link sx={{ fontSize: 16 }} />
                    socialhub.com/@{user?.username}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: '#94A3B8',
                    }}
                  >
                    <CalendarToday sx={{ fontSize: 16 }} />
                    Joined June 2026
                  </Typography>
                </Box>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  mt: 3,
                  pt: 3,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    12
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#94A3B8',
                    }}
                  >
                    Posts
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    243
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#94A3B8',
                    }}
                  >
                    Followers
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    189
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#94A3B8',
                    }}
                  >
                    Following
                  </Typography>
                </Box>
              </Box>

              {/* Social Links */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 2,
                }}
              >
                <IconButton
                  sx={{
                    color: '#94A3B8',
                    '&:hover': {
                      color: '#6366f1',
                      backgroundColor: 'rgba(99,102,241,0.1)',
                    },
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#94A3B8',
                    '&:hover': {
                      color: '#6366f1',
                      backgroundColor: 'rgba(99,102,241,0.1)',
                    },
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#94A3B8',
                    '&:hover': {
                      color: '#6366f1',
                      backgroundColor: 'rgba(99,102,241,0.1)',
                    },
                  }}
                >
                  <Link />
                </IconButton>
              </Box>

              {/* Posts Grid */}
              <Box
                sx={{
                  mt: 3,
                  pt: 3,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#FFFFFF',
                    mb: 2,
                  }}
                >
                  Your Posts
                </Typography>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#94A3B8',
                    }}
                  >
                    📝 No posts yet. Share your first post!
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Container>
      <BottomNav />
    </Box>
  );
};

export default Profile;