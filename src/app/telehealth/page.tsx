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
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Enhanced Telehealth MVP with vibrant gradients and modern UI

export default function TelehealthPage() {
  const [room, setRoom] = useState('');
  const [scheduled, setScheduled] = useState<Array<{ id: string; room: string; datetime: string }>>([]);
  const [datetime, setDatetime] = useState('');
  const [joinRoom, setJoinRoom] = useState('');

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

  return (
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
          🎥 Telehealth Video Consultations
        </Typography>

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
                onClick={() => setJoinRoom(room)}
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
                      onClick={() => setJoinRoom(m.room)}
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
          {joinRoom ? (
            <iframe
              src={`https://meet.jit.si/${encodeURIComponent(joinRoom)}#userInfo.displayName="Patient%20User"`}
              style={{ width: '100%', height: '100%', border: 0 }}
              allow="camera; microphone; fullscreen; display-capture"
              title="Telehealth Meeting"
            />
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
                textAlign: 'center'
              }}>
                Secure, encrypted video calls for healthcare
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
