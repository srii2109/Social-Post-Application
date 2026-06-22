import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#ec4899', light: '#f472b6', dark: '#db2777' },
    background: { default: '#0B1020', paper: '#111827' },
    text: {
      primary: '#FFFFFF',
      secondary: '#CBD5E1',
      muted: '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' },
    h4: { fontWeight: 700, color: '#FFFFFF' },
    h6: { fontWeight: 600, color: '#FFFFFF' },
    body1: { color: '#FFFFFF' },
    body2: { color: '#CBD5E1' },
    button: { textTransform: 'none', fontWeight: 600, color: '#FFFFFF' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 28px',
          color: '#FFFFFF',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(99,102,241,0.3)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#FFFFFF',
          '&:hover': { background: 'linear-gradient(135deg, #818cf8, #a78bfa)' },
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.1)',
          color: '#FFFFFF',
          '&:hover': { borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { color: '#FFFFFF' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#111827',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255,255,255,0.02)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' },
          },
          '& .MuiInputLabel-root': { color: '#94A3B8' },
          '& .MuiInputBase-input': { color: '#FFFFFF' },
        },
      },
    },
  },
});

export default theme;