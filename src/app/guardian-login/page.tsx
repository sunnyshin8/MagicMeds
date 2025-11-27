'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Avatar,
} from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';

interface PatientAccount {
  id: string;
  name: string;
  relationship: string;
  lastActive: string;
  riskLevel: string;
  profileImage?: string;
}

export default function GuardianLoginPage() {
  const [step, setStep] = useState(0);
  const [guardianEmail, setGuardianEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Mock data - In real implementation, this would come from API
  const patientAccounts: PatientAccount[] = [
    {
      id: '1',
      name: 'John Smith',
      relationship: 'Father',
      lastActive: '2025-11-22',
      riskLevel: 'HIGH'
    },
    {
      id: '2',
      name: 'Mary Smith',
      relationship: 'Mother',
      lastActive: '2025-11-20',
      riskLevel: 'NORMAL'
    }
  ];

  const steps = ['Guardian Verification', 'Select Patient', 'Access Granted'];

  const handleSendCode = () => {
    if (guardianEmail) {
      setStep(1);
      // In real implementation, send verification code to email
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') { // Mock verification
      setStep(2);
    } else {
      alert('Invalid verification code');
    }
  };

  const handlePatientSelection = (patientId: string) => {
    setSelectedPatient(patientId);
    setStep(3);
    // In real implementation, redirect to patient dashboard
    setTimeout(() => {
      window.location.href = '/clinician'; // Redirect to patient's dashboard
    }, 2000);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'NORMAL': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #4facfe 75%, #00f2fe 100%)',
      py: 4
    }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <FamilyRestroomIcon sx={{ fontSize: '4rem', color: '#ff6b6b', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Guardian Access Portal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Secure access to manage your loved one's healthcare
            </Typography>
          </Box>

          <Stepper activeStep={step} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {step === 0 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SecurityIcon sx={{ fontSize: '2rem', color: '#2196f3', mr: 2 }} />
                  <Typography variant="h6">Guardian Verification</Typography>
                </Box>
                
                <Alert severity="info" sx={{ mb: 3 }}>
                  Enter the email address you used when you were added as a guardian. 
                  We'll send you a verification code for secure access.
                </Alert>

                <TextField
                  fullWidth
                  label="Guardian Email Address"
                  type="email"
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  sx={{ mb: 3 }}
                  placeholder="guardian@email.com"
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSendCode}
                  disabled={!guardianEmail}
                  sx={{
                    background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Send Verification Code
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 1 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <VerifiedUserIcon sx={{ fontSize: '2rem', color: '#4caf50', mr: 2 }} />
                  <Typography variant="h6">Enter Verification Code</Typography>
                </Box>

                <Alert severity="success" sx={{ mb: 3 }}>
                  Verification code sent to <strong>{guardianEmail}</strong>. 
                  Please check your email and enter the 6-digit code below.
                </Alert>

                <TextField
                  fullWidth
                  label="6-Digit Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  sx={{ mb: 3 }}
                  placeholder="123456"
                  inputProps={{ maxLength: 6 }}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setStep(0)}
                    sx={{ flex: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6}
                    sx={{
                      flex: 2,
                      background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                      py: 1.5
                    }}
                  >
                    Verify & Continue
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PersonIcon sx={{ fontSize: '2rem', color: '#ff6b6b', mr: 2 }} />
                  <Typography variant="h6">Select Patient Account</Typography>
                </Box>

                <Alert severity="info" sx={{ mb: 3 }}>
                  You are authorized to access the following patient accounts. 
                  Select the person you want to help manage.
                </Alert>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {patientAccounts.map((patient) => (
                    <Card
                      key={patient.id}
                      sx={{
                        cursor: 'pointer',
                        border: selectedPatient === patient.id ? '2px solid #2196f3' : '1px solid #e0e0e0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      onClick={() => handlePatientSelection(patient.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: '#ff6b6b', 
                              width: 56, 
                              height: 56,
                              fontSize: '1.5rem'
                            }}>
                              {patient.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {patient.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Your {patient.relationship}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Last active: {new Date(patient.lastActive).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Chip 
                              label={`${patient.riskLevel} Risk`}
                              color={getRiskLevelColor(patient.riskLevel)}
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="caption" display="block" color="text.secondary">
                              Click to access
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <VerifiedUserIcon sx={{ fontSize: '4rem', color: '#4caf50', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Access Granted Successfully!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  You now have guardian access to manage the selected patient's healthcare. 
                  Redirecting to their dashboard...
                </Typography>
                
                <Alert severity="warning">
                  <Typography variant="body2">
                    <strong>Remember:</strong> You are accessing someone else's medical information. 
                    Please use this access responsibly and only for their healthcare benefit.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          )}

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact our support team at support@magicmeds.com
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}