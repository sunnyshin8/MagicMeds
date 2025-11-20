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
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps = ['Account Details', 'Personal Information', 'Medical History'];

export default function SignUpPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    emergencyContact: '',
    allergies: '',
    medications: '',
    conditions: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return formData.email && formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword;
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.phone;
      case 2:
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      setError('Please fill in all required fields correctly');
      return;
    }

    if (activeStep < steps.length - 1) {
      setError('');
      handleNext();
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Simulate signup API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - save user data
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        name: `${formData.firstName} ${formData.lastName}`,
        loggedIn: true 
      }));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
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
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField
              fullWidth
              label="Emergency Contact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Current Medications"
              name="medications"
              value={formData.medications}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Medical Conditions"
              name="conditions"
              value={formData.conditions}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={2}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
              }
              label="I agree to the terms and conditions"
              sx={{ mt: 2 }}
            />
          </Box>
        );
      default:
        return null;
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
            Create Account
          </Typography>
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mb: 4,
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            Join MagicMeds for personalized healthcare assistance
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 
                  activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
              </Button>
            </Box>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link href="/login" passHref>
                <MuiLink>Sign in</MuiLink>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
    </Box>
  );
}