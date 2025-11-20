import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Define colors
const colors = {
  primary: {
    main: '#0070F3',
    light: '#3291FF',
    dark: '#0761D1',
  },
  secondary: {
    main: '#7928CA',
    light: '#8A63D2',
    dark: '#4C2889',
  },
  success: {
    main: '#0070F3',
    light: '#3291FF',
    dark: '#0761D1',
  },
  error: {
    main: '#E00',
    light: '#FF1A1A',
    dark: '#C00',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
  }
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...colors,
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }
      }
    }
  }
};

export const theme = responsiveFontSizes(createTheme(themeOptions));