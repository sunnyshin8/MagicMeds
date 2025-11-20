'use client';

import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }
      
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - accept any email/password combination
      localStorage.setItem('user', JSON.stringify({ email: formData.email, loggedIn: true }));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 50%, #4facfe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #43e97b, #00f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mb: 4,
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            Sign in to access your healthcare dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#43e97b',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#43e97b',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#43e97b',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#43e97b',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ mt: 1, mb: 3 }}>
              <Link href="/forgot-password" passHref>
                <MuiLink variant="body2">Forgot password?</MuiLink>
              </Link>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ 
                mb: 2,
                background: 'linear-gradient(45deg, #43e97b, #00f2fe)',
                color: '#fff',
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00f2fe, #43e97b)',
                  boxShadow: '0 12px 30px rgba(67, 233, 123, 0.5)'
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link href="/signup" passHref>
                <MuiLink>Sign up</MuiLink>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
    </Box>
  );
}