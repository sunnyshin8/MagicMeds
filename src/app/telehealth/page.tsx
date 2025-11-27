'use client';

import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Autocomplete,
  Card,
  CardContent,
  Divider,
  Chip,
  Paper,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import patientsData from '@/data/patients-database.json';

// Enhanced Telehealth MVP with vibrant gradients and modern UI

export default function TelehealthPage() {
  const [room, setRoom] = useState('');
  const [scheduled, setScheduled] = useState<Array<{ id: string; room: string; datetime: string }>>([]);
  const [datetime, setDatetime] = useState('');
  const [joinRoom, setJoinRoom] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [meetingPopup, setMeetingPopup] = useState<Window | null>(null);

  // Function to open meeting in popup window
  const openMeetingPopup = (roomName: string) => {
    const meetingUrl = `https://meet.jit.si/${encodeURIComponent(roomName)}#userInfo.displayName="Patient%20User"`;
    
    // Calculate optimal dimensions for landscape video meeting
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const popupWidth = Math.min(1280, screenWidth * 0.9); // 90% of screen width, max 1280px
    const popupHeight = Math.min(720, screenHeight * 0.8); // 80% of screen height, max 720px
    
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;
    
    const popup = window.open(
      meetingUrl,
      'telehealth_meeting',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
    );
    
    if (popup) {
      setMeetingPopup(popup);
      popup.focus();
      
      // Monitor popup close
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          setMeetingPopup(null);
          setJoinRoom('');
          clearInterval(checkClosed);
        }
      }, 1000);
    } else {
      alert('Please allow popups for this site to open the video meeting window.');
    }
  };

  const createRandomRoom = () => {
    const r = `magicmeds-${Math.random().toString(36).slice(2, 9)}`;
    setRoom(r);
  };

  const scheduleMeeting = () => {
    if (!room || !datetime) return;
    setScheduled((s) => [...s, { id: String(s.length + 1), room, datetime }]);
    setRoom('');
    setDatetime('');
  };

  // Filter patients based on search term
  const filteredPatients = patientsData.patients.filter((patient: any) => 
    `${patient.personalInfo.firstName} ${patient.personalInfo.lastName}`.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'moderate': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #134e5e 0%, #71b280 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)',
        py: 4
      }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fff 30%, #f0f8ff 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          🎥 Telehealth Platform
        </Typography>

        {/* Navigation Tabs */}
        <Box sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          mb: 3,
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
        }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 'bold',
                py: 2,
                '&.Mui-selected': {
                  color: '#fff',
                  background: 'linear-gradient(45deg, rgba(76, 172, 254, 0.2), rgba(67, 233, 123, 0.2))',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#00f2fe',
                height: 3
              }
            }}
          >
            <Tab label="Video Consultation" icon={<VideocamIcon />} />
            <Tab label="Patient History" icon={<HistoryIcon />} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
            <Box sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            p: 3,
            flex: 1,
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <VideocamIcon sx={{ 
                fontSize: 28, 
                color: '#fff', 
                background: 'linear-gradient(45deg, #00f2fe, #43e97b)',
                borderRadius: '8px',
                p: 0.5,
                mr: 2
              }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                Quick Meeting
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                label="Room Name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.8)'
                  }
                }}
              />
              <Button 
                variant="outlined" 
                onClick={createRandomRoom}
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  borderRadius: '12px',
                  '&:hover': {
                    borderColor: '#fff',
                    background: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Generate
              </Button>
              <Button
                variant="contained"
                onClick={() => openMeetingPopup(room)}
                disabled={!room}
                startIcon={<PlayArrowIcon />}
                sx={{
                  background: 'linear-gradient(45ff, #43e97b, #38f9d7)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(67, 233, 123, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #38f9d7, #43e97b)',
                  }
                }}
              >
                Join
              </Button>
            </Box>

            <Box sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              p: 2,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon sx={{ color: '#fff', mr: 1 }} />
                <Typography variant="subtitle1" sx={{ color: '#fff' }}>Schedule a meeting</Typography>
              </Box>
              <TextField
                label="Date & Time"
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                fullWidth
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.8)'
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button 
                variant="contained" 
                onClick={scheduleMeeting} 
                disabled={!datetime || !room}
                startIcon={<ScheduleIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2c5364, #4facfe)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                }}
              >
                Schedule
              </Button>
            </Box>
          </Box>

          <Box sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            p: 3,
            width: { md: 320 },
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ color: '#fff', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                Upcoming Meetings
              </Typography>
            </Box>
            {scheduled.length === 0 ? (
              <Box sx={{
                textAlign: 'center',
                py: 3,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  No scheduled meetings yet.
                </Typography>
              </Box>
            ) : (
              <List>
                {scheduled.map((m) => (
                  <ListItem key={m.id} sx={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    mb: 1,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <ListItemText 
                      primary={m.room} 
                      secondary={new Date(m.datetime).toLocaleString()}
                      primaryTypographyProps={{ sx: { color: '#fff' } }}
                      secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                    />
                    <Button 
                      onClick={() => openMeetingPopup(m.room)}
                      size="small"
                      sx={{
                        background: 'linear-gradient(45deg, #00f2fe, #43e97b)',
                        color: '#fff',
                        borderRadius: '8px',
                        minWidth: '60px'
                      }}
                    >
                      Join
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

            <Box sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 15px 35px rgba(31, 38, 135, 0.2)',
          overflow: 'hidden',
          height: '70vh'
        }}>
          {meetingPopup && !meetingPopup.closed ? (
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(45deg, rgba(67, 233, 123, 0.2), rgba(76, 172, 254, 0.2))',
              border: '2px solid rgba(67, 233, 123, 0.5)',
              borderRadius: '15px'
            }}>
              <VideocamIcon sx={{ 
                fontSize: 80, 
                color: '#43e97b', 
                mb: 2,
                animation: 'pulse 2s infinite'
              }} />
              <Typography variant="h5" sx={{ 
                color: '#43e97b',
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 1
              }}>
                Meeting in Progress
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                mb: 2
              }}>
                Your video meeting is now open in a separate window
              </Typography>
              <Button
                variant="outlined"
                onClick={() => meetingPopup.focus()}
                sx={{
                  color: '#43e97b',
                  borderColor: '#43e97b',
                  '&:hover': {
                    backgroundColor: 'rgba(67, 233, 123, 0.1)',
                    borderColor: '#43e97b'
                  }
                }}
              >
                Focus Meeting Window
              </Button>
            </Box>
          ) : (
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(45deg, rgba(76, 172, 254, 0.1), rgba(67, 233, 123, 0.1))'
            }}>
              <VideocamIcon sx={{ 
                fontSize: 80, 
                color: 'rgba(255,255,255,0.5)', 
                mb: 2 
              }} />
              <Typography variant="h6" sx={{ 
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center',
                maxWidth: '400px'
              }}>
                Join or schedule a meeting to start your video consultation
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255,255,255,0.6)',
                mt: 1,
                textAlign: 'center',
                maxWidth: '450px'
              }}>
                Secure, encrypted video calls for healthcare. Meetings open in optimized popup windows for the best experience.
              </Typography>
            </Box>
          )}
            </Box>
          </Box>
        )}

        {/* Patient History Tab */}
        {tabValue === 1 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              p: 3,
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <HistoryIcon sx={{ 
                  fontSize: 28, 
                  color: '#fff', 
                  background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                  borderRadius: '8px',
                  p: 0.5,
                  mr: 2
                }} />
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Patient Medical History
                </Typography>
              </Box>
              
              {/* Patient Search */}
              <Box sx={{ mb: 3 }}>
                <Autocomplete
                  options={filteredPatients}
                  getOptionLabel={(option: any) => 
                    `${option.personalInfo.firstName} ${option.personalInfo.lastName} (${option.patientId})`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Patient by Name or ID"
                      variant="outlined"
                      placeholder="Type patient name or ID..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.1)',
                          '& fieldset': {
                            borderColor: 'rgba(255,255,255,0.3)'
                          }
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                  onChange={(event, value) => {
                    if (value) {
                      handlePatientSelect(value);
                    }
                  }}
                  renderOption={(props, option: any) => {
                    const { key, ...otherProps } = props;
                    return (
                      <li key={key} {...otherProps}>
                        <Box>
                          <Typography variant="body1">
                            {option.personalInfo.firstName} {option.personalInfo.lastName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            ID: {option.patientId} • Age: {option.personalInfo.age} • Risk: {option.medicalHistory.riskLevel}
                          </Typography>
                        </Box>
                      </li>
                    );
                  }}
                />
              </Box>

              {/* Patient Details */}
              {selectedPatient && (
                <Box sx={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  p: 3,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {selectedPatient.personalInfo.firstName} {selectedPatient.personalInfo.lastName}
                    </Typography>
                    <Chip 
                      label={`Risk: ${selectedPatient.medicalHistory.riskLevel}`}
                      color={getRiskLevelColor(selectedPatient.medicalHistory.riskLevel) as any}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  
                  {/* Personal Information */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
                      📋 Personal Information
                    </Typography>
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: 2,
                      background: 'rgba(255,255,255,0.05)',
                      p: 2,
                      borderRadius: '12px'
                    }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Patient ID:</strong> {selectedPatient.patientId}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Age:</strong> {selectedPatient.personalInfo.age} years
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Gender:</strong> {selectedPatient.personalInfo.gender}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Blood Type:</strong> {selectedPatient.personalInfo.bloodType}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Phone:</strong> {selectedPatient.personalInfo.phone}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Location:</strong> {selectedPatient.address.city}, {selectedPatient.address.state}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Medical Conditions */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
                      🏥 Major Medical Conditions
                    </Typography>
                    {selectedPatient.medicalHistory.majorConditions.map((condition: any, index: number) => (
                      <Box key={index} sx={{ 
                        mb: 2,
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        p: 2,
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ color: '#4facfe', fontWeight: 'bold' }}>
                            {condition.condition}
                          </Typography>
                          <Chip 
                            label={condition.severity}
                            size="small"
                            color={condition.severity === 'Critical' ? 'error' : 
                                   condition.severity === 'High' || condition.severity === 'Severe' ? 'warning' : 'info'}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                          <strong>Diagnosed:</strong> {formatDate(condition.diagnosedDate)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                          <strong>Status:</strong> {condition.status}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          <strong>Notes:</strong> {condition.notes}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Current Medications */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
                      💊 Current Medications
                    </Typography>
                    <Box sx={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      p: 2,
                      maxHeight: '300px',
                      overflowY: 'auto'
                    }}>
                      {selectedPatient.medicalHistory.currentMedications.map((medication: any, index: number) => (
                        <Box key={index} sx={{ 
                          mb: 2, 
                          pb: 2, 
                          borderBottom: index < selectedPatient.medicalHistory.currentMedications.length - 1 ? 
                                       '1px solid rgba(255,255,255,0.1)' : 'none'
                        }}>
                          <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                            {medication.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            <strong>Dosage:</strong> {medication.dosage} • <strong>Frequency:</strong> {medication.frequency}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            <strong>Started:</strong> {formatDate(medication.startDate)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Allergies */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
                      ⚠️ Allergies & Contraindications
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedPatient.medicalHistory.allergies.map((allergy: string, index: number) => (
                        <Chip 
                          key={index} 
                          label={allergy} 
                          color="error" 
                          variant="outlined" 
                          size="small"
                          sx={{ 
                            fontWeight: 'bold',
                            '& .MuiChip-label': { color: '#fff' },
                            borderColor: '#ff5722'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Insurance & Last Visit */}
                  <Box sx={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    p: 2,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                      📄 Insurance: {selectedPatient.insurance.provider}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                      Policy: {selectedPatient.insurance.policyNumber} • Valid Until: {formatDate(selectedPatient.insurance.validUntil)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      <strong>Last Visit:</strong> {formatDate(selectedPatient.medicalHistory.lastVisit)}
                    </Typography>
                  </Box>
                </Box>
              )}

              {!selectedPatient && (
                <Box sx={{
                  textAlign: 'center',
                  py: 6,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <PersonIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    No Patient Selected
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    Please search and select a patient to view their complete medical history
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
    </>
  );
}
