'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';

interface Guardian {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  isVerified: boolean;
  addedDate: string;
  lastAccess: string | null;
}

export default function GuardiansPage() {
  const [guardians, setGuardians] = useState<Guardian[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Spouse',
      email: 'sarah.johnson@email.com',
      phone: '+91-9876543210',
      isVerified: true,
      addedDate: '2025-10-15',
      lastAccess: '2025-11-20'
    },
    {
      id: '2',
      name: 'Michael Johnson',
      relationship: 'Adult Child',
      email: 'michael.j@email.com',
      phone: '+91-8765432109',
      isVerified: true,
      addedDate: '2025-11-01',
      lastAccess: null
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    relationship: '',
    email: '',
    phone: ''
  });

  const relationshipOptions = [
    'Spouse',
    'Adult Child',
    'Parent',
    'Sibling',
    'Close Friend',
    'Caregiver',
    'Other Family Member'
  ];

  const handleAddGuardian = () => {
    if (guardians.length >= 3) {
      alert('Maximum 3 guardians allowed');
      return;
    }

    const guardian: Guardian = {
      id: Date.now().toString(),
      ...newGuardian,
      isVerified: false,
      addedDate: new Date().toISOString().split('T')[0],
      lastAccess: null
    };

    setGuardians([...guardians, guardian]);
    setNewGuardian({ name: '', relationship: '', email: '', phone: '' });
    setIsAddDialogOpen(false);
  };

  const handleRemoveGuardian = (id: string) => {
    setGuardians(guardians.filter(g => g.id !== id));
  };

  const getRelationshipColor = (relationship: string) => {
    const colors: { [key: string]: any } = {
      'Spouse': 'primary',
      'Adult Child': 'secondary',
      'Parent': 'success',
      'Sibling': 'info',
      'Close Friend': 'warning',
      'Caregiver': 'error',
      'Other Family Member': 'default'
    };
    return colors[relationship] || 'default';
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #4facfe 75%, #00f2fe 100%)',
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <FamilyRestroomIcon sx={{ fontSize: '3rem' }} />
          Guardian Care Management
        </Typography>

        {/* Guardian Care Info */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            👨‍👩‍👧‍👦 What is Guardian Care?
          </Typography>
          <Typography variant="body2">
            Guardian Care allows you to designate up to <strong>3 trusted individuals</strong> who can access and manage your 
            MagicMeds account when you're too sick or unable to manage your healthcare yourself. Guardians can view your 
            medical information, schedule appointments, and communicate with healthcare providers on your behalf.
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          {/* Current Guardians */}
          <Card>
            <CardHeader 
              title={`Your Guardians (${guardians.length}/3)`}
              action={
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={() => setIsAddDialogOpen(true)}
                  disabled={guardians.length >= 3}
                  sx={{ 
                    background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #38f9d7, #43e97b)',
                    }
                  }}
                >
                  Add Guardian
                </Button>
              }
            />
            <CardContent>
              {guardians.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <FamilyRestroomIcon sx={{ fontSize: '4rem', color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No guardians added yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add trusted family members or friends to help manage your healthcare
                  </Typography>
                </Box>
              ) : (
                <List>
                  {guardians.map((guardian) => (
                    <Card key={guardian.id} sx={{ mb: 2, backgroundColor: '#f8f9fa' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {guardian.name}
                              {guardian.isVerified && <VerifiedIcon color="success" fontSize="small" />}
                            </Typography>
                            <Chip 
                              label={guardian.relationship} 
                              color={getRelationshipColor(guardian.relationship)}
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveGuardian(guardian.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon fontSize="small" color="action" />
                            <Typography variant="body2">{guardian.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" color="action" />
                            <Typography variant="body2">{guardian.phone}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                          <Typography variant="caption" color="text.secondary">
                            Added: {new Date(guardian.addedDate).toLocaleDateString()}
                            {guardian.lastAccess && (
                              <> • Last access: {new Date(guardian.lastAccess).toLocaleDateString()}</>
                            )}
                          </Typography>
                          <br />
                          <Chip 
                            label={guardian.isVerified ? 'Verified' : 'Pending Verification'} 
                            color={guardian.isVerified ? 'success' : 'warning'}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Guardian Permissions & Info */}
          <Card>
            <CardHeader title="Guardian Permissions" />
            <CardContent>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  ⚠️ Important Security Notice
                </Typography>
                <Typography variant="body2">
                  Guardians will have full access to your medical information. Only add people you completely trust.
                </Typography>
              </Alert>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                What guardians can do:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="View medical records"
                    secondary="Access your health history and test results"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Schedule appointments"
                    secondary="Book and manage healthcare appointments"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Communicate with doctors"
                    secondary="Chat and video call with healthcare providers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Manage prescriptions"
                    secondary="View and refill medication orders"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="error" /></ListItemIcon>
                  <ListItemText 
                    primary="Emergency access"
                    secondary="Access emergency protocols and contact information"
                  />
                </ListItem>
              </List>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                All guardian activities are logged for security and can be reviewed by you at any time.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Add Guardian Dialog */}
        <Dialog 
          open={isAddDialogOpen} 
          onClose={() => setIsAddDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Guardian</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={newGuardian.name}
                onChange={(e) => setNewGuardian({ ...newGuardian, name: e.target.value })}
                required
              />
              
              <FormControl fullWidth required>
                <InputLabel>Relationship</InputLabel>
                <Select
                  value={newGuardian.relationship}
                  onChange={(e) => setNewGuardian({ ...newGuardian, relationship: e.target.value })}
                  label="Relationship"
                >
                  {relationshipOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={newGuardian.email}
                onChange={(e) => setNewGuardian({ ...newGuardian, email: e.target.value })}
                required
                helperText="Guardian will receive verification email"
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={newGuardian.phone}
                onChange={(e) => setNewGuardian({ ...newGuardian, phone: e.target.value })}
                required
                helperText="Include country code (e.g., +91-9876543210)"
              />
            </Box>

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                The person you're adding will receive an email invitation to become your guardian. 
                They must verify their email and agree to the terms before gaining access.
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddGuardian}
              variant="contained"
              disabled={!newGuardian.name || !newGuardian.relationship || !newGuardian.email || !newGuardian.phone}
            >
              Add Guardian
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}